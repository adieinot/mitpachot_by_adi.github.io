document.addEventListener("DOMContentLoaded", () => {
  let cart = []; // שמירת הפריטים בעגלה

  const buttons = document.querySelectorAll(".add-to-cart");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  // טעינת עגלה קיימת מ-LocalStorage
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }

  // הוספת מוצרים לעגלה
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const product = button.parentElement;
      const productName = product.querySelector("h3").innerText;
      const productPrice = product.querySelector("p").innerText;

      cart.push({ name: productName, price: productPrice });
      saveCart();
      alert(`${productName} נוסף לעגלה!`);
      updateCart();
    });
  });

  // עדכון תוכן העגלה
  function updateCart() {
    cartItems.innerHTML = ""; // ריקון עגלה קודמת
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerText = `${item.name} - ${item.price}`;
      const removeButton = document.createElement("button");
      removeButton.innerText = "הסר";
      removeButton.style.marginRight = "10px";
      removeButton.style.backgroundColor = "#e76f51";
      removeButton.style.color = "#fff";
      removeButton.style.border = "none";
      removeButton.style.padding = "5px";
      removeButton.style.cursor = "pointer";

      removeButton.addEventListener("click", () => {
        cart.splice(index, 1); // הסרת המוצר מהעגלה
        saveCart();
        updateCart();
      });

      li.appendChild(removeButton);
      cartItems.appendChild(li);

      // חישוב סך הכולל
      const price = parseFloat(item.price.replace("₪", ""));
      total += price;
    });

    cartTotal.innerText = `סה"כ: ₪${total.toFixed(2)}`;
  }

  // שמירת עגלה ב-LocalStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

   // שליחת הזמנה בוואטסאפ
  sendOrderButton.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("העגלה ריקה.");
      return;
    }

    const orderText = cart
      .map((item) => `${item.name} - ${item.price}`)
      .join("\n");
    const totalText = cartTotal.innerText;
    const message = `שלום! אני מעוניין להזמין את המוצרים הבאים:\n\n${orderText}\n\n${totalText}`;
    const whatsappLink = `https://wa.me/972556606160?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  });

});
