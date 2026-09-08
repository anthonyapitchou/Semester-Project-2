// get product data
const productId = new URLSearchParams(window.location.search).get("id");

const productUrl =
    `https://v2.api.noroff.dev/auction/listings/${productId}`;

const productImage = document.getElementById('product-image');
const productTitle = document.getElementById('product-title');
const productDescription = document.getElementById('product-description');
const productPrice = document.getElementById('product-price');
const productCategory = document.getElementById('product-category');
const exploreMore = document.getElementById('explore-more');
const productEnding = document.getElementById('product-ending');

const token = localStorage.getItem('accessToken');

console.log('Token:', token);


// explore more

const exploreResponse = await fetch(
     'https://v2.api.noroff.dev/auction/listings?limit=3',
     {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW50aG9ueTg2IiwiZW1haWwiOiJhbnRob255LmFwaUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc4Nzc1MTk5MX0.pBk30AYhdVwQFdv5oe-FfpCRioU1E0Uad6-nYHQ1aEM',
        'X-Noroff-API-Key': 'c87c2791-c851-4066-9044-070f941de43d'
    }
});

if (exploreResponse.ok) {
    const exploreData = await exploreResponse.json();

    console.log('Explore more data:', exploreData);

   exploreData.data.forEach(listing => {

    exploreMore.innerHTML += `
        <a
            href="/product.html?id=${listing.id}"
            class="block"
        >

            <img
                src="${listing.media?.[0]?.url || ''}"
                alt="${listing.media?.[0]?.alt || listing.title}"
                class="w-full h-48 object-cover rounded-lg"
            >

            <h3 class="mt-3 font-semibold">
                ${listing.title}
            </h3>

        </a>
    `;
    });
}

// Fetch product data
const response = await fetch(productUrl, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW50aG9ueTg2IiwiZW1haWwiOiJhbnRob255LmFwaUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc4Nzc1MTk5MX0.pBk30AYhdVwQFdv5oe-FfpCRioU1E0Uad6-nYHQ1aEM',
    'X-Noroff-API-Key': 'c87c2791-c851-4066-9044-070f941de43d'
    },
});

if (response.ok) {
    const data = await response.json();

    console.log('Product data:', data);
console.log('Product data JSON:', JSON.stringify(data, null, 2));

    (function displayProductData() {

        // Display product data
productImage.src = data.data.media[0]?.url || '';
productImage.alt = data.data.media[0]?.alt || '';

productTitle.textContent = data.data.title || '';
productDescription.textContent = data.data.description || '';



        // Display ending date
        if (data.data.endsAt) {
            const endDate = new Date(data.data.endsAt);

            const formattedDate = endDate.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
            });

            productEnding.textContent = `Ends at: ${formattedDate}`;
        }


        // Display product category
        if (data.data.tags && data.data.tags.length > 0) {
            productCategory.textContent = `Category: ${data.data.tags.join(', ')}`;
        }

        console.log('Product Image:', productImage.src);

    })();
}


