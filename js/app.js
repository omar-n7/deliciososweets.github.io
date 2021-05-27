//show cart
document.getElementById("cart-info").addEventListener("click", function() {
  const cart = document.getElementById("cart");
  cart.classList.toggle("show-cart");
  console.log(cart);
});

//adding items to cart
(function() {
  const cartBtn = document.querySelectorAll(".store-item-icon");
  //traversing DOM to access all items instead of using ID attributes in HTML elements (which would be more efficient)

  cartBtn.forEach(function(btn){
    btn.addEventListener('click', function(event){
      //console.log(event.target);

      if(event.target.parentElement.classList.contains("store-item-icon")){
        //defining path for img
        let fullPath = event.target.parentElement.previousElementSibling.src;
        //matching img source with corresponding img file in "img-cart" folder 
        let pos = fullPath.indexOf("img")+3;
        let partPath = fullPath.slice(pos);
        
        const item = {};
        item.img = `img-cart${partPath}`;
        let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
        
        item.name = name;
        let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;    
        
        let finalPrice = price.slice(1).trim();
        item.price = finalPrice;
       
        
       // console.log(item);
        const cartItem = document.createElement("div");
        cartItem.classList.add(
          'cart-item', 
          'd-flex', 
          'justify-content-between', 
          'text-capitalize', 
          'my-3');

        cartItem.innerHTML = 
       ` <div class="cart-item d-flex justify-content-between text-capitalize my-3">
          <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
          <div class="item-text">
            <p id="cart-item-title" class="font-weight-bold mb-0">
              ${item.name}
            </p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price mb-0">${item.price}</span>
          </div>
          <a href="#" id="cart-item-remove" class="cart-item-remove"><i class="fas fa-trash"></i>
          </a>
        </div>`;
        //select cart
        const cart = document.getElementById("cart");
        const total = document.querySelector(".cart-total-container");

        cart.insertBefore(cartItem, total);
        alert("item added to shopping cart");
        showTotals();
      }
    });
  });
  //show totals
  function showTotals() {
    const total = [];
    const items = document.querySelectorAll(".cart-item-price");

    items.forEach(function(item) {
      total.push(parseFloat(item.textContent));
    });
   // console.log(total);
  const totalMoney = total.reduce(function(total, item){
    total += item;
    return total;
  },0);
  const finalMoney = totalMoney.toFixed(2);
  document.getElementById("cart-total").textContent = finalMoney;
  document.querySelector(".item-total").textContent = finalMoney;
  document.getElementById("item-count").textContent = total.length;
  }
})();