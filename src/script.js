let shopItems = [
    {
        id: 1,
        img: "/Products/b2 (0-00-42-24).png",
        title: "Cool Summer Tee",
        desc: "Comfortable essentials for a relaxed summer vibe.",
        price: 125
    },
    {
        id: 2,
        img: "/Products/f2new.png",
        title: "Sunny Day Tee",
        desc: "Lightweight tees for effortless summer coolness.",
        price: 75
    },
    {
        id: 3,
        img: "/Products/f3new.png",
        title: "Breezy Beach Tee",
        desc: "Breathable fabrics perfect for sunny days.",
        price: 85
    },
    {
        id: 4,
        img: "/Products/4new.png",
        title: "Bright Sun Tee",
        desc: "Vibrant designs to brighten up your summer wardrobe.",
        price: 95
    },
    {
        id: 5,
        img: "/Products/5NEw.png",
        title: "Chill Vibes Tee",
        desc: "Vibrant designs to brighten up your summer wardrobe.",
        price: 125
    },
    {
        id: 6,
        img: "/Products/6New.png",
        title: "Hot Days Tee",
        desc: "Vibrant designs to brighten up your summer wardrobe.",
        price: 105
    },
    {
        id: 7,
        img: "/Products/7New.png",
        title: "Breezy Linen Pants",
        desc: "Vibrant designs to brighten up your summer wardrobe.",
        price: 115
    },
    {
        id: 8,
        img: "/Products/8new.png",
        title: "Cool Comfort Skirt",
        desc: "Vibrant designs to brighten up your summer wardrobe.",
        price: 125
    }
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let updateLocalStorage = (basket) => {
    localStorage.setItem("data", JSON.stringify(basket));
};

let shoppingCards = document.getElementById('shopping-cards');

let itemsPerPage = 8;
let currentPage = 1;

let totalPages = Math.ceil(shopItems.length / itemsPerPage);

let generateCards = () => {
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let itemsToDisplay = shopItems.slice(startIndex, endIndex);

    shoppingCards.innerHTML = itemsToDisplay.map((x) => {
        let { id, img, title, desc, price } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
            <div class="border border-[#c9c6c6] border-opacity-50 flex flex-col rounded-2xl p-3 product-card" id="product-id-${id}">
                <img src="${img}" class="object-contain rounded-3xl cursor-pointer transform transition-transform duration-300 hover:scale-105">
                <h1 class=" text-[18px] sm:text-lg mt-4 text-opacity-50 main-title">${title}</h1>
                <p class=" hidden sm:block mt-2 text-neutral-900 text-lg mb-3">${desc}</p>
                <div class="flex justify-between items-center my-2">
                    <h2 class=" text-[18px] sm:text-xl">$ ${price}</h2>
                    <div class="flex items-center justify-center gap-6 sm:gap-10 mx-4  sm:mx-7">
                        <i onclick="decrement(${id})" class='bx bx-minus cursor-pointer text-lg sm:text-xl -mx-4 text-red-700'></i>
                        <h2 class="cursor-pointer text-lg sm:text-xl" id="${id}">${search.item === undefined ? 0 : search.item}</h2>
                        <i onclick="increment(${id})" class='bx bx-plus cursor-pointer text-lg sm:text-xl -mx-4 text-green-700'></i>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    elements = document.querySelectorAll('.product-card');
};

let elements;

generateCards();

let increment = (id) => {
    let search = basket.find((x) => x.id === id);
    if (!search) {
        basket.push({ id: id, item: 1 });
    } else {
        search.item += 1;
    }
    update(id);
    updateLocalStorage(basket);
    generateMenu(basket);
    totalAmount();
};

let decrement = (id) => {
    let search = basket.find((x) => x.id === id);
    if (!search || search.item === 0) return;
    search.item -= 1;
    if (search.item === 0) {
        basket = basket.filter((x) => x.id !== id);
    }
    update(id);
    updateLocalStorage(basket);
    generateMenu(basket);
    totalAmount();
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search ? search.item : 0;
    totalCalculation();
};

let totalCalculation = () => {
    let totalCount = document.getElementById('total-count');
    totalCount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

totalCalculation();

const searchBar = document.getElementById('search');

searchBar.addEventListener('input', e => {
    const value = e.target.value.toUpperCase();
    elements.forEach((element) => {
        const title = element.querySelector('.main-title').innerHTML.toUpperCase();
        if (title.includes(value)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
});

let pushCards = (items) => {
    shopItems.push(...items);
    totalPages = Math.ceil(shopItems.length / itemsPerPage);
    generateCards();
    generatePaginationControls();
};

let generatePaginationControls = () => {
    let paginationControls = document.getElementById('pagination-controls');
    let buttons = '';
    for (let i = 1; i <= totalPages; i++) {
        buttons += `<button onclick="changePage(${i})" class="px-4 py-2 ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}">${i}</button>`;
    }

    paginationControls.innerHTML = buttons;
};

let changePage = (page) => {
    currentPage = page;
    generateCards();
    generatePaginationControls();
};


generateCards();
generatePaginationControls();

let newItems = [
    {
        id: 9,
        img: "/Arrivals/b2 (0-00-47-00).png",
        title: "Executive Elegance Tee",
        desc: "Comfortable essentials for a relaxed summer vibe.",
        price: 65
    },
    {
        id: 10,
        img: "/Arrivals/b2 (0-00-47-00)n2.png",
        title: "Professional Polished Tee",
        desc: "Lightweight tees for effortless summer coolness.",
        price: 70
    },
    {
        id: 11,
        img: "/Arrivals/b2 (0-00-55-00).png",
        title: "Office Essential Tee",
        desc: "Breathable fabrics perfect for sunny days.",
        price: 55
    },
    {
        id: 12,
        img: "/Arrivals/b2 (0-00-47-36)n4.png",
        title: "Corporate Comfort Tee",
        desc: "Vibrant designs to brighten up your summer wardrobe.",
        price: 60
    },
    {
        id: 13,
        img: "/Arrivals/b2 (0-00-47-36)n5.png",
        title: "Business Casual Tee",
        desc: "Vibrant designs to brighten up your summer wardrobe.",
        price: 75
    },
    {
        id: 14,
        img: "/Arrivals/b2 (0-00-47-36)n6.png",
        title: "Relaxed Weekend Shorts",
        desc: "Vibrant designs to brighten up your summer wardrobe.",
        price: 85
    },
    {
        id: 15,
        img: "/Arrivals/b2 (0-00-47-36)7n.png",
        title: "Boardroom Basic Tee",
        desc: "Vibrant designs to brighten up your summer wardrobe.",
        price: 95
    },
    {
        id: 16,
        img: "/Arrivals/b2 (0-00-47-36)n8.png",
        title: "Workplace Chic Tee",
        desc: "Vibrant designs to brighten up your summer wardrobe.",
        price: 85
    }
];

pushCards(newItems);


let menuBtn = document.getElementById('link-btn');
let divLinks = document.getElementById('links');

menuBtn.addEventListener('click', function(){
    if (divLinks.classList.contains('close')) {
        divLinks.classList.remove('close');
        divLinks.classList.add('open_links');
    } else {
        divLinks.classList.remove('open_links');
        divLinks.classList.add('close');
    }
});

