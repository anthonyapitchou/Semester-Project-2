// get elements 
const searchResults = document.getElementById('search-results');
const categoryFilters = document.querySelectorAll('.category-filter');
const sortFilter = document.getElementById('sort-filter');
const searchInput = document.getElementById('search-input');
let data;


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchQuery = urlParams.get('query');

console.log('Search Query:', searchQuery);

if (searchQuery) {
    let allListings = [];
    let page = 1;
    let isLastPage = false;

    while (!isLastPage) {
        const response = await fetch(
            `https://v2.api.noroff.dev/auction/listings?page=${page}`,
            {
               method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW50aG9ueTg2IiwiZW1haWwiOiJhbnRob255LmFwaUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc4Nzc1MTk5MX0.pBk30AYhdVwQFdv5oe-FfpCRioU1E0Uad6-nYHQ1aEM',
    'X-Noroff-API-Key': 'c87c2791-c851-4066-9044-070f941de43d'
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch listings');
        }

        const pageData = await response.json();

        allListings = [...allListings, ...pageData.data];

        isLastPage = pageData.meta.isLastPage;
        page++;
    }

    data = {
        data: allListings
    };

    console.log('NUMBER OF ALL LISTINGS:', data.data.length);
    console.log(
        'HAS LEATHER BAG:',
        data.data.some(listing => listing.title === 'Leather Bag')
    );

    console.log('Listings:', data);
}

// fonction to render listings
const renderListings = (listings) => {

    console.log('RENDERING:', listings.length);

    searchResults.innerHTML = '';

    listings.forEach(listing => {
        const listingElement = document.createElement('div');

        listingElement.innerHTML = `
           <a href="/product.html?id=${listing.id}" class="block">
           
        <img
            src="${listing.media?.[0]?.url || ''}"
            alt="${listing.media?.[0]?.alt || ''}"
        >

        <h3>${listing.title}</h3>
    </a>
`;

        searchResults.appendChild(listingElement);
    });
};


// filter listings by category

const filterListingsByCategory = (category) => {

    const filteredListings = data.data.filter(
        listing => listing.category === category
    );

        console.log('Filtered listings:', filteredListings);


    renderListings(filteredListings);
};


// add event listeners to category filters
categoryFilters.forEach(filter => {
    filter.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        filterListingsByCategory(category);
        
    });
});

// filter listings by search query
const filterListingsBySearch = (searchQuery) => {

    searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        filterListingsBySearch(searchInput.value);
    }
});



    console.log('FIRST LISTING:', data.data[0]);

    console.log('TITLES:', data.data.map(listing => listing.title));
    console.log('TAGS:', data.data.map(listing => listing.tags));

    const filteredListings = data.data.filter(
        listing => listing.title.toLowerCase().includes(searchQuery.toLowerCase())

        
    );

    

    console.log('SEARCH:', searchQuery);
    console.log('RESULTS:', filteredListings.length);

    renderListings(filteredListings);
};

// call the function to filter listings by search query
if (searchQuery) {
    filterListingsBySearch(searchQuery);
}












