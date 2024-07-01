let cartMenu = document.getElementById('cart-menu');
let overlay = document.getElementById('overlay');
let basketBtn = document.getElementById('basket-btn');
let cartMenuDiv = document.getElementById('cart-menu-div');
let totalSumElement = document.getElementById('total-sum');
let footer = document.querySelector('.cart-menu-footer')
basketBtn.addEventListener('click', () => {
    cartMenu.classList.toggle("open");
    if (cartMenu.classList.contains("open")) {
        overlay.style.display = 'block';
        document.body.classList.add("no-overflow");
    }
});

let closeMenu = () => {
    cartMenu.classList.remove("open");
    overlay.style.display = 'none';
    document.body.classList.remove("no-overflow");
    
};

document.addEventListener('click', (event) => {
    const isClickInsideCartMenu = cartMenu.contains(event.target);
    const isClickInsideBasketBtn = basketBtn.contains(event.target);
    const isClickOnControlButton = event.target.classList.contains('bx-minus') || event.target.classList.contains('bx-plus');
    if (!isClickInsideCartMenu && !isClickInsideBasketBtn && !isClickOnControlButton && cartMenu.classList.contains("open")) {
        closeMenu();
    }
});

let generateMenu = (basket) => {
    if (basket.length === 0) {
        cartMenuDiv.innerHTML = `
        <h1 class="text-lg font-medium text-black text-opacity-60 flex justify-center items-center">Your basket is empty</h1>
        <h1 class="text-2xl text-center text-black text-opacity-60"><i class='bx bxs-sad '></i></h1>
        `
        totalSumElement.innerHTML = `$0`;
        footer.style.display = 'none'
        
    } else {
        let sumItems = 0;
        let itemsHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItems.find((y) => y.id === id) || [];
            let totalPerItem = item * search.price;
            sumItems += totalPerItem;
            return `
                <div class="each-product flex px-7 py-3 items-center" id="each-cart">
                    <div>
                        <img src="${search.img}" width="100px" class="rounded-lg">
                    </div>
                    <div class="main-content flex-col px-3 gap-10">
                        <div class="flex items-center justify-between">
                            <h2 class="text-lg font-semibold">${search.title}</h2>
                            <h2 class="text-xl">$${search.price}</h2>
                        </div>
                        <div class="flex justify-between items-center gap-32 mt-5">
                            <div>
                                <h2 class="text-xl">Total: $${totalPerItem}</h2>
                            </div>
                            <div class="flex items-center justify-center gap-6">
                                <i onclick="decrement(${id})" class='bx bx-minus cursor-pointer text-lg -mx-4 text-red-700'></i>
                                <h2 class="cursor-pointer text-lg" id="${id}">${item}</h2>
                                <i onclick="increment(${id})" class='bx bx-plus cursor-pointer text-lg -mx-4 text-green-700'></i>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join("");

        cartMenuDiv.innerHTML = itemsHTML;
        totalSumElement.innerHTML = `$${sumItems}`;
        footer.style.display = 'block'
    }
};

let totalAmount = () => {
    let totalAmountElement = document.getElementById('total-amount');
    totalAmountElement.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

generateMenu(basket);
totalAmount();
