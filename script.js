document.addEventListener("DOMContentLoaded", () => {
  let cart = [];

  const buttons = document.querySelectorAll(".add-to-cart");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const sendOrderButton = document.getElementById("sendOrderButton");

  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = button.parentElement;
      const productName = product.querySelector("h3").innerText;
      const productPrice = product.querySelector("p").innerText;

      addToCart(productName, productPrice);
      alert(`${productName} נוסף לעגלה!`);
    });
  });

  function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    updateCart();
  }

  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const li = document.createElement("li");
      li.innerText = `${item.name} - ₪${item.price} x ${item.quantity}`;
      total += parseFloat(item.price.replace("₪", "")) * item.quantity;

      const removeButton = document.createElement("button");
      removeButton.innerText = "הסר";
      removeButton.onclick = () => {
        cart.splice(cart.indexOf(item), 1);
        saveCart();
        updateCart();
      };

      li.appendChild(removeButton);
      cartItems.appendChild(li);
    });

    cartTotal.innerText = `סה"כ: ₪${total.toFixed(2)}`;
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  sendOrderButton.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("העגלה ריקה.");
      return;
    }

    const orderText = cart
      .map((item) => `${item.name} - ₪${item.price} x ${item.quantity}`)
      .join("\n");
    const totalText = cartTotal.innerText;
    const message = `שלום! אני מעוניין להזמין את המוצרים הבאים:\n\n${orderText}\n\n${totalText}`;
    const whatsappLink = `https://wa.me/972556606160?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  });
});
