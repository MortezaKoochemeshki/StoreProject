let productsContainer = document.querySelector('#products'); // I have selected the products body;
let cartContainer = document.querySelector('.cart');
let cartHeader = document.querySelector('.cart .cart-header'); // this is the cart header for give a style when we clicked on it.
let cartItems = document.querySelector('.cart .cart-items'); // I chose this item to add user selections to the list
let totalItemsEl = document.querySelector('.cart .cart-footer .total-items');
let totalPriceEl = document.querySelector('.cart .cart-footer .total-price'); 

// showing the products.
function showAllProducts(){
    for(let i = 0; i < products.length; i++){
        productsContainer.innerHTML +=  
        `<div class="product-item">
            <div class="product-image">
                <img src="` + products[i].imgSrc + `" alt="` + products[i].name + `">
            </div>
            <div class="product-title">` + products[i].name + `</div>
            <div class="product-instock"> تعداد موجود : ` + products[i].instock + ` </div>
            <div class="product-data">
                <div class="product-price">` + products[i].price + `</div>
                <div class="add-to-cart" onclick="addToCart(` + products[i].id + `)"> <i class="fa-solid fa-cart-shopping"></i> </div>
            </div>
        </div>`;
    };
};
showAllProducts();

// changing the cart height;
let checker = 0;
function cartHeightChanger(){
    if(checker === 0){
        cartContainer.style.bottom = '-10px';
        checker++;
    } else{
        cartContainer.style.bottom = '-460px';
        checker = 0;
    };
};
cartHeader.addEventListener('click', cartHeightChanger);

let cart = [];
function addToCart(id){  // this id is different from the id which is in upper div.
// We Have Taken The Id From ' ---- onclick="addToCart()" ---- ' In  ' ---- products-data --> add-to-cart ---- '
    let item = products.find(function(item){
        return item.id === id; // item.id == 'id' ---> The 'id' is ' addToCart(id) ';  
    });
    
    let itemId = cart.some(function(item){ // Checking The Same Products Which Is In The List.
        return item.id === id; // Its Return true Or false
    });

    if(itemId){
        changeNumberOfUnits('plus', id);
    }else{
        item.numberOfUnits = 1; // The Reference Of item Is In Line 44.
        console.log(item);
        cart.push(item);
        renderCartItems();
        renderTotal();
    };
};

// render the cart item;
function renderCartItems(){
    cartItems.innerHTML = '';
    for(let i = 0; i < cart.length; i++){
        cartItems.innerHTML += 
       `<li class="cart-item">
            <div class="p-name" title="با کلیک کردن روش، از سبد خرید خود حذفش کنید" onclick="deleteFromCart(` + cart[i].id + `)"> ` + cart[i].name + ` </div>
            <div class="p-price"> ` + cart[i].price + ` </div>
            <div class="p-unit">
                <span class="plus" onclick="changeNumberOfUnits('plus', ` + cart[i].id + `)"> <i class="fa-solid fa-circle-plus"></i> </span>
                <span class="unit"> ` + cart[i].numberOfUnits + ` </span>
                <span class="minus" onclick="changeNumberOfUnits('minus', ` + cart[i].id + `)"> <i class="fa-solid fa-circle-minus"></i> </span>
            </div>
        </li>`;
    };
};

function changeNumberOfUnits(action, id){
    cart = cart.map(function(item){
        let oldNumberOfUnits = item.numberOfUnits;
        if(item.id === id){ // checking
            if(action === 'plus' && oldNumberOfUnits < item.instock){
                oldNumberOfUnits++;
            } else if(action === 'minus' && oldNumberOfUnits > 1){
                oldNumberOfUnits--;
            };
        }
        item.numberOfUnits = oldNumberOfUnits;
        return item;
    });

    renderCartItems();
    renderTotal();
};

function renderTotal(){
    let totalPrice = 0;
    let totalItems = 0;

    for(let i = 0; i < cart.length; i++){
        totalItems += cart[i].numberOfUnits;
        totalPrice += cart[i].price * cart[i].numberOfUnits;
    };

    totalItemsEl.innerHTML = totalItems;
    totalPriceEl.innerHTML = totalPrice;
};


function deleteFromCart(id){
    cart = cart.filter(function(item){
        return item.id != id;
    });
    renderCartItems();
    renderTotal();
};

function commafy(num) {
    let str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1.');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}
/* 
    array.filter(function(sth){
        return  something;
    });
    برای ما یک آرایه جدید میسازه و میاد اون آرایه جدید رو با توجه به شرط داخل تابعمون پرش میکنه
*/