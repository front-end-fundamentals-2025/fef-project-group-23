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

var accordionHeaders = document.getElementsByClassName(".faq-button");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    this.parentElement.classList.toggle("active");
    var pennel = this.nextElementSibling;
    if (pannel.style.display === "block") {
      pannel.style.display = "none";
    } else {
      pannel.style.display = "block";
    }
  });
}
