document.addEventListener("DOMContentLoaded", function () {
    const accordionHeaders = document.querySelectorAll(".expand-header");
  
    accordionHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const content = this.nextElementSibling;
        const isOpen = content.style.display === "block";
  
        document.querySelectorAll(".expand-content").forEach((item) => {
          item.style.display = "none";
        });
  
        document.querySelectorAll(".expand-header span").forEach((icon) => {
          icon.textContent = "+";
        });
  
        if (!isOpen) {
          content.style.display = "block";
          this.querySelector("span").textContent = "âˆ’";
        }
      });
    });
  
    // Shopping Cart Functionality
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();
  
    // REMOVE THE EVENT LISTENERS FROM PRODUCT FIGURES
    // Instead, only attach event listener to the Add to Cart button on the product detail page
    const addToCartBtn = document.getElementById("add-to-cart-btn");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", function () {
        const name = document.getElementById("product-name").textContent;
        const img = document.getElementById("product-image").src;
        const price = document.getElementById("product-price").textContent;
  
        const item = {
          id: Date.now(),
          name: name,
          img: img,
          price: price,
          quantity: 1,
        };
  
        addToCart(item);
  
        // Show notification
        showNotification(`Added "${name}" to cart`);
      });
    }
  
    // Function to add item to cart
    function addToCart(item) {
      const existingItem = cart.find((cartItem) => cartItem.name === item.name);
  
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push(item);
      }
  
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    }
  
    // Function to remove item from cart
    function removeFromCart(itemId) {
      cart = cart.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCartItems();
    }
  
    // Function to update cart item quantity
    function updateQuantity(itemId, newQuantity) {
      const item = cart.find((item) => item.id === itemId);
      if (item && newQuantity > 0) {
        item.quantity = newQuantity;
      } else if (item && newQuantity <= 0) {
        removeFromCart(itemId);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCartItems();
    }
  
    // Function to update cart count in the navbar
    function updateCartCount() {
      const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
      const cartIcon = document.querySelector(
        'nav a[href="shoppingcart.html"] li span'
      );
      if (cartIcon) {
        if (cartCount > 0) {
          cartIcon.setAttribute("data-count", cartCount);
          cartIcon.classList.add("has-items");
        } else {
          cartIcon.removeAttribute("data-count");
          cartIcon.classList.remove("has-items");
        }
      }
    }
  
    // Function to render cart items on shopping cart page
    function renderCartItems() {
      if (window.location.href.includes("shoppingcart.html")) {
        if (cart.length === 0) {
          document.querySelector("main").innerHTML = `
            <h1>Your Shopping Cart</h1>
            <p>Your cart is still empty, fill it with something lovely!</p>
          `;
          return;
        }
  
        let totalPrice = 0;
        let cartHTML = `<h1>Your Shopping Cart</h1>
                        <div class="cart-items">`;
  
        cart.forEach((item) => {
          const itemTotal =
            parseFloat(item.price.replace("â‚¬", "")) * item.quantity;
          totalPrice += itemTotal;
  
          cartHTML += `
            <div class="cart-item" data-id="${item.id}">
              <div class="cart-item-image">
                <img src="${item.img}" alt="${item.name}">
              </div>
              <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">${item.price}</p>
                <div class="cart-item-quantity">
                  <button class="quantity-btn decrease">-</button>
                  <span class="quantity">${item.quantity}</span>
                  <button class="quantity-btn increase">+</button>
                </div>
              </div>
              <button class="remove-item">Ã—</button>
            </div>
          `;
        });
  
        cartHTML += `</div>
                        <div class="cart-summary">
                          <div class="cart-total">
                            <span>Total:</span>
                            <span>â‚¬${totalPrice.toFixed(2)}</span>
                          </div>
                          <button class="checkout-btn">Proceed to Checkout</button>
                        </div>`;
  
        document.querySelector("main").innerHTML = cartHTML;
  
        // Add event listeners for cart interactions
        document.querySelectorAll(".remove-item").forEach((btn) => {
          btn.addEventListener("click", function () {
            const itemId = parseInt(this.closest(".cart-item").dataset.id);
            removeFromCart(itemId);
          });
        });
  
        document.querySelectorAll(".quantity-btn.decrease").forEach((btn) => {
          btn.addEventListener("click", function () {
            const itemId = parseInt(this.closest(".cart-item").dataset.id);
            const currentQty = parseInt(this.nextElementSibling.textContent);
            updateQuantity(itemId, currentQty - 1);
          });
        });
  
        document.querySelectorAll(".quantity-btn.increase").forEach((btn) => {
          btn.addEventListener("click", function () {
            const itemId = parseInt(this.closest(".cart-item").dataset.id);
            const currentQty = parseInt(this.previousElementSibling.textContent);
            updateQuantity(itemId, currentQty + 1);
          });
        });
  
        document
          .querySelector(".checkout-btn")
          .addEventListener("click", function () {
            alert("Thank you for your order!");
            cart = [];
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCartItems();
            updateCartCount();
          });
      }
    }
  
    // Function to show notification
    function showNotification(message) {
      const notification = document.createElement("div");
      notification.className = "notification";
      notification.textContent = message;
      document.body.appendChild(notification);
  
      setTimeout(() => {
        notification.classList.add("show");
      }, 10);
  
      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    }
  
    // Process URL parameters for product detail page
    if (window.location.href.includes("detailproductpage.html")) {
      const urlParams = new URLSearchParams(window.location.search);
      const productName = urlParams.get("name");
      const productImage = urlParams.get("img");
      const productPrice = urlParams.get("price");
  
      if (productName && productImage) {
        document.getElementById("product-name").textContent =
          decodeURIComponent(productName);
        document.getElementById("product-image").src =
          decodeURIComponent(productImage);
        if (productPrice) {
          document.getElementById("product-price").textContent =
            decodeURIComponent(productPrice);
        }
      }
  
      // Make similar products clickable
      document.querySelectorAll(".similar-product").forEach((product) => {
        product.addEventListener("click", function () {
          const name = this.querySelector("h3").textContent;
          const img = this.querySelector("img").src;
          const price = this.querySelector("p").textContent;
  
          window.location.href = `detailproductpage.html?name=${encodeURIComponent(
            name
          )}&img=${encodeURIComponent(img)}&price=${encodeURIComponent(price)}`;
        });
      });
    }
  
    // Render cart items if on the shopping cart page
    if (window.location.href.includes("shoppingcart.html")) {
      renderCartItems();
    }
  });