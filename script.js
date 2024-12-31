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

    if (cart.length === 0) {
      cartItems.innerHTML = '<li class="empty-cart-message">העגלה ריקה</li>';
    }

    cart.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - ₪${item.price} <span class="quantity-display">כמות: ${item.quantity}</span>`;
      total += parseFloat(item.price.replace("₪", "")) * item.quantity;
      cartItems.appendChild(li);
    });

    cartTotal.innerText = `סה"כ: ₪${total}`;
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<li class="empty-cart-message">העגלה ריקה</li>';
  }

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ₪${item.price} <span class="quantity-display">כמות: ${item.quantity}</span>`;

    // כפתור הסרת מוצר
    const removeButton = document.createElement("button");
    removeButton.className = "remove-from-cart";
    removeButton.innerText = "הסר";
    removeButton.addEventListener("click", () => {
      removeFromCart(index);
    });

    li.appendChild(removeButton);
    cartItems.appendChild(li);

    total += parseFloat(item.price.replace("₪", "")) * item.quantity;
  });

  cartTotal.innerText = `סה"כ: ₪${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}


  sendOrderButton.addEventListener("click", () => {
    let orderMessage = "הזמנה מהאתר: \n";
    cart.forEach((item) => {
      orderMessage += `${item.name} - ₪${item.price}, כמות: ${item.quantity}\n`;
    });
    const encodedMessage = encodeURIComponent(orderMessage);
    const whatsappLink = `https://wa.me/972556606160?text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");
  });
});

document.getElementById("whatsapp-float-btn").addEventListener("click", () => {
  const message = "היי, הגעתי מהאתר אשמח לברר פרטים על...";
  const whatsappLink = `https://wa.me/972556606160?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, "_blank");
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.getElementById("prev-image");
  const nextBtn = document.getElementById("next-image");
  const images = document.querySelectorAll(".product img");
  let currentImageIndex = 0;

  // פתיחת חלון עם תמונה
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentImageIndex = index;
      openModal(img.src);
    });
  });

  // הצגת תמונה בחלון
  function openModal(src) {
    modalImage.src = src;
    modal.style.display = "block";
  }

  // סגירת חלון
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // גלילה בין תמונות
  prevBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    modalImage.src = images[currentImageIndex].src;
  });

  nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    modalImage.src = images[currentImageIndex].src;
  });

  // סגירה בלחיצה מחוץ לחלון
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}




