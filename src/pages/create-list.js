// src/pages/create-list.js

const createListingForm = document.getElementById('create-listing-form');
const imageURL = document.getElementById('image-url');
const productName = document.getElementById('product-name');
const productDescription = document.getElementById('product-description');
const startingPrice = document.getElementById('starting-price');
const bidIncrement = document.getElementById('bid-increment');
const closingTime = document.getElementById('closing-time');
const category = document.getElementById('category');
const formMessage = document.getElementById('form-message');

const token = localStorage.getItem('accessToken');


// --------------------------------------------------
// PROTECTION
// --------------------------------------------------

if (!token) {
    window.location.href = '/Semester-Project-2/login.html';
}


// --------------------------------------------------
// LISTING ID
// --------------------------------------------------

const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get('id');

console.log('LISTING ID:', listingId);


// --------------------------------------------------
// API
// --------------------------------------------------


const headers = {

                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW50aG9ueTg2IiwiZW1haWwiOiJhbnRob255LmFwaUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc4Nzc1MTk5MX0.pBk30AYhdVwQFdv5oe-FfpCRioU1E0Uad6-nYHQ1aEM',
                    'X-Noroff-API-Key': 'c87c2791-c851-4066-9044-070f941de43d'
};


// --------------------------------------------------
// EDIT MODE
// --------------------------------------------------

if (listingId) {

    const response = await fetch(
        `https://v2.api.noroff.dev/auction/listings/${listingId}`,
        {
            method: 'GET',
            headers
        }
    );

    if (response.ok) {

        const data = await response.json();

        console.log('LISTING TO EDIT:', data);

        const listing = data.data;

        productName.value = listing.title || '';
        productDescription.value = listing.description || '';

        if (imageURL) {
            imageURL.value = listing.media?.[0]?.url || '';
        }

        if (closingTime) {
            closingTime.value = listing.endsAt
                ? listing.endsAt.slice(0, 16)
                : '';
        }

        if (category) {
            category.value = listing.tags?.[0] || '';
        }

        const submitButton = createListingForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {
            submitButton.textContent = 'Update Listing';
        }

    } else {

        console.error('Could not load listing.');

    }
}


// --------------------------------------------------
// FORM SUBMIT
// --------------------------------------------------

createListingForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    formMessage.textContent = '';
    formMessage.className = 'mt-2 text-sm';


    // --------------------------------------------------
    // LISTING DATA
    // --------------------------------------------------

    const listingData = {
        title: productName.value.trim(),
        description: productDescription.value.trim(),
        endsAt: closingTime.value,

        tags: category.value.trim()
            ? [category.value.trim()]
            : [],

        media: imageURL.value.trim()
            ? [
                {
                    url: imageURL.value.trim(),
                    alt: productName.value.trim() || 'Product image'
                }
            ]
            : []
    };

    console.log('LISTING DATA:', listingData);


    // --------------------------------------------------
    // CREATE OR UPDATE
    // --------------------------------------------------

    try {

        let response;


        // --------------------------------------------------
        // UPDATE EXISTING LISTING
        // --------------------------------------------------

        if (listingId) {

            response = await fetch(
                `https://v2.api.noroff.dev/auction/listings/${listingId}`,
                {
                    method: 'PUT',
                    headers,
                    body: JSON.stringify({
                        title: listingData.title,
                        description: listingData.description,
                        tags: listingData.tags,
                        media: listingData.media
                    })
                }
            );


        // --------------------------------------------------
        // CREATE NEW LISTING
        // --------------------------------------------------

        } else {

            response = await fetch(
                'https://v2.api.noroff.dev/auction/listings',
                {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(listingData)
                }
            );
        }


        // --------------------------------------------------
        // RESPONSE
        // --------------------------------------------------

        if (response.ok) {

            const data = await response.json();

            console.log('API RESPONSE:', data);

            if (listingId) {

                formMessage.textContent =
                    'Listing updated successfully.';

            } else {

                formMessage.textContent =
                    'Listing created successfully.';
            }

            formMessage.classList.add('text-green-600');

            createListingForm.reset();


            // --------------------------------------------------
            // RETURN TO PROFILE AFTER UPDATE
            // --------------------------------------------------

            if (listingId) {

                setTimeout(() => {

                    window.location.href = '/Semester-Project-2/profile.html';

                }, 1000);
            }


        } else {

            const errorData = await response.json();

            console.error('API ERROR:', errorData);

            formMessage.textContent =
                errorData.errors?.[0]?.message ||
                'Something went wrong. Please try again.';

            formMessage.classList.add('text-red-600');
        }


    } catch (error) {

        console.error('FETCH ERROR:', error);

        formMessage.textContent =
            'Something went wrong. Please try again.';

        formMessage.classList.add('text-red-600');
    }
});
