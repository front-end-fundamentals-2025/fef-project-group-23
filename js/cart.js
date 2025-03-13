
if (localStorage.dressname&&localStorage.dressprice){
    const cartcontainerElement = document.getElementById ("cart-container");
    const cartElement = document.createElement ("li");
    let nameitem = localStorage.dressname;
    let priceitem = localStorage.dressprice;
    // cartElement.innerText = item; 
    // cartcontainerElement.appendChild (cartElement);
    // const cartimageElement = document.createElement ("id");
  
    const cartnameElement = document.createElement ("p");
    cartnameElement.innerText = nameitem;
    const cartpriceElement = document.createElement ("p");
    cartpriceElement.innerText = priceitem;
    const cartbuttonElement = document.createElement ("button");
    cartbuttonElement.innerText = "remove";
cartnameElement.classList.add("cart-name-style")
cartpriceElement.classList.add("cart-price-style")
cartbuttonElement.classList.add("cart-button-style")


    cartElement.appendChild (cartnameElement);
    cartElement.appendChild (cartpriceElement);
    cartElement.appendChild (cartbuttonElement);
    cartcontainerElement.appendChild (cartElement);
    
    cartbuttonElement.addEventListener ("click", function (e){
        cartElement.remove();
        localStorage.clear();
    });
}

