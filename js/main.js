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


