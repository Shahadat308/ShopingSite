// // SELECT ELEMENTS
// const productsEl = document.querySelector(".products");
// const cartItemsEl = document.querySelector(".cart-items");
// const subtotalEl = document.querySelector(".subtotal");
// const totalItemsInCartEl = document.querySelector(".total-items-in-cart");

// // RENDER PRODUCTS
// function renderProdcuts() {
//   products.forEach((product) => {
//     productsEl.innerHTML += `
//             <div class="item">
//                 <div class="item-container">
//                     <div class="item-img">
//                         <img src="${product.imgSrc}" alt="${product.name}">
//                     </div>
//                     <div class="desc">
//                         <h2>${product.name}</h2>
//                         <h2><small>$</small>${product.price}</h2>
//                         <p>
//                             ${product.description}
//                         </p>
//                     </div>
//                     <div class="add-to-wishlist">
//                         <img src="./icons/heart.png" alt="add to wish list">
//                     </div>
//                     <div class="add-to-cart" onclick="addToCart(${product.id})">
//                         <img src="./icons/bag-plus.png" alt="add to cart">
//                     </div>
//                 </div>
//             </div>
//         `;
//   });
// }
// renderProdcuts();

// // cart array
// let cart = JSON.parse(localStorage.getItem("CART")) || [];
// updateCart();

// // ADD TO CART
// function addToCart(id) {
//   // check if prodcut already exist in cart
//   if (cart.some((item) => item.id === id)) {
//     changeNumberOfUnits("plus", id);
//   } else {
//     const item = products.find((product) => product.id === id);

//     cart.push({
//       ...item,
//       numberOfUnits: 1,
//     });
//   }

//   updateCart();
// }

// // update cart
// function updateCart() {
//   renderCartItems();
//   renderSubtotal();

//   // save cart to local storage
//   localStorage.setItem("CART", JSON.stringify(cart));
// }

// // calculate and render subtotal
// function renderSubtotal() {
//   let totalPrice = 0,
//     totalItems = 0;

//   cart.forEach((item) => {
//     totalPrice += item.price * item.numberOfUnits;
//     totalItems += item.numberOfUnits;
//   });

//   subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
//   totalItemsInCartEl.innerHTML = totalItems;
// }

// // render cart items
// function renderCartItems() {
//   cartItemsEl.innerHTML = ""; // clear cart element
//   cart.forEach((item) => {
//     cartItemsEl.innerHTML += `
//         <div class="cart-item">
//             <div class="item-info" onclick="removeItemFromCart(${item.id})">
//                 <img src="${item.imgSrc}" alt="${item.name}">
//                 <h4>${item.name}</h4>
//             </div>
//             <div class="unit-price">
//                 <small>$</small>${item.price}
//             </div>
//             <div class="units">
//                 <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
//                 <div class="number">${item.numberOfUnits}</div>
//                 <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
//             </div>
//         </div>
//       `;
//   });
// }

// // remove item from cart
// function removeItemFromCart(id) {
//   cart = cart.filter((item) => item.id !== id);

//   updateCart();
// }

// // change number of units for an item
// function changeNumberOfUnits(action, id) {
//   cart = cart.map((item) => {
//     let numberOfUnits = item.numberOfUnits;

//     if (item.id === id) {
//       if (action === "minus" && numberOfUnits > 1) {
//         numberOfUnits--;
//       } else if (action === "plus" && numberOfUnits < item.instock) {
//         numberOfUnits++;
//       }
//     }

//     return {
//       ...item,
//       numberOfUnits,
//     };
//   });

//   updateCart();
// }

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Mens Shoes <br> White Sport Shoes',
        image: 'shows2.jpg',
        price: 120
    },
    {
        id: 2,
        name: 'Women jeans <br> silm body',
        image: 'jeans4.jpg',
        price: 140
    },
    {
        id: 3,
        name: 'Men and Women Shoes<br>white shoes',
        image: 'jeans3.jpg',
        price: 200
    },
    {
        id: 4,
        name: 'Women Shoes <br> Cremy light',
        image: 'shows3.jpg',
        price: 230
    },
    {
        id: 5,
        name: 'Red top Hill<br> Pencil Hill',
        image: 'shows5.jpg',
        price: 320
    },
    {
        id: 6,
        name: 'Red top<br>Shorts with silm',
        image: 'top.jpg',
        price: 200
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}