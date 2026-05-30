const cartWrapper = document.querySelector('.cart-wrapper'); 
let cartLocal = [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartLocal));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
        cartLocal = JSON.parse(savedCart);
    }
}


function renderCart() {

    cartWrapper.innerHTML = '';

    cartLocal.forEach(product => {

        const cartItemHtml = `
        <div class="cart-item" data-id="${product.id}">
            <div class="cart-item__top">

                <div class="cart-item__img">
                    <img src="${product.imgSrc}" alt="">
                </div>

                <div class="cart-item__desc">

                    <div class="cart-item__title">
                        ${product.title}
                    </div>

                    <div class="cart-item__weight">
                        ${product.itemsInBox} / ${product.weight}
                    </div>

                    <div class="cart-item__details">

                        <div class="items items--small counter-wrapper">

                            <div
                                class="items__control"
                                data-action="minus">
                                -
                            </div>

                            <div
                                class="items__current"
                                data-counter>
                                ${product.counter}
                            </div>

                            <div
                                class="items__control"
                                data-action="plus">
                                +
                            </div>

                        </div>

                        <div class="price">
                            <div class="price__currency">
                                ${product.price}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        `;

        cartWrapper.insertAdjacentHTML('beforeend',cartItemHtml);
    });

    toggleCartStatus();
};

function toggleCartStatus() {
        const cartEmpty = document.querySelector('[data-cart-empty]');
        const cartTotal = document.querySelector('.cart-total');
        const orderForm = document.querySelector('#order-form');

        if (cartLocal.length > 0) {
            cartEmpty.classList.add('none');
            cartTotal.classList.remove('none');
            orderForm.classList.remove('none');
        } else {
            cartEmpty.classList.remove('none');
            cartTotal.classList.add('none');
            orderForm.classList.add('none');
        }
        
        let totalPrice = 0;

        cartLocal.forEach(item =>{
            totalPrice += parseInt(item.price) * parseInt(item.counter);

        });
        document.querySelector('.total-price').innerText = totalPrice;
};

window.addEventListener('click', function(event){
    if(event.target.hasAttribute('data-cart')){

        const cart = event.target.closest('.card');

        const productInfo = {
            id: cart.dataset.id,
            imgSrc: cart.querySelector('.product-img').getAttribute('src'),
            title: cart.querySelector('.item-title').innerText,
            itemsInBox: cart.querySelector('[data-items-in-box]').innerText,
            weight: cart.querySelector('.price__weight').innerText,
            price: cart.querySelector('.price__currency').innerText,
            counter: cart.querySelector('[data-counter]').innerText,
        };


        const itemInCart =
            cartLocal.find(item => item.id === productInfo.id);
        if(itemInCart){
            itemInCart.counter = parseInt(itemInCart.counter) + parseInt(productInfo.counter);
        } else {
            cartLocal.push(productInfo);
        }
        saveCart();
        renderCart();

        cart.querySelector('[data-counter]').innerText = '1';
    }
});


loadCart();
renderCart();
