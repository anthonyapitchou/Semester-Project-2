// Get the listings container element
const listingsContainer = document.getElementById('home-listings');

console.log('LISTINGS CONTAINER:', listingsContainer);
console.log('HOME JS LOADED');

// Fetch listings from the API
const fetchListings = async () => {
    try {
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

            const data = await response.json();

            allListings = [...allListings, ...data.data];

            isLastPage = data.meta.isLastPage;
            page++;
        }

        console.log('ALL LISTINGS:', allListings);
        console.log('NUMBER OF ALL LISTINGS:', allListings.length);

        console.log('MY LEATHER BAG:', allListings.find(listing => listing.title === 'Leather Bag'));
        renderListings(allListings);

    } catch (error) {
        console.error('Error fetching listings:', error);
    }
};


// Function to render listings
const renderListings = (listings) => {
    listingsContainer.innerHTML = '';

    listings.forEach(listing => {
   console.log('LISTING:', listing.title);

    const listingElement = document.createElement('div');
        
        
        
        listingElement.classList.add('listing');

        listingElement.innerHTML = `
             <a href="/product.html?id=${listing.id}" class="block">
        <img
src="${listing.media?.[0]?.url || ''}"
alt="${listing.media?.[0]?.alt || ''}"

        <h3>${listing.title}</h3>
    </a>
`;
console.log('LISTING ID:', listing.id);
        listingsContainer.appendChild(listingElement);
    });
};

fetchListings();












