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
        this.querySelector("span").textContent = "−";
      }
    });
  });
});


const addtocartElement = document.getElementById ("add-to-cart5");
const shoppingcartElement = document.getElementById ("shopping-cart-icon");
addtocartElement.addEventListener ("click", function (e) {
  // const denimdressElement = document.getElementById ("denim-dress")
  const denimdressnameElement = document.getElementById ("denim-dress-name");
  const denimdresspriceElement = document.getElementById ("denim-dress-price");
  localStorage.dressname = denimdressnameElement.innerText;
  localStorage.dressprice = denimdresspriceElement.innerText;
  shoppingcartElement.style.color = "#cc99a5";
});

