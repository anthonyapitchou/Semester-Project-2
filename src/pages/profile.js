// src/pages/profile.js

const profileAvatar = document.getElementById('profile-avatar');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profileCredits = document.getElementById('profile-credits');
const profileListings = document.getElementById('profile-listings');
const bidListings = document.getElementById('profile-bids');
const token = localStorage.getItem('accessToken');

console.log('PROFILE TOKEN:', token);



// --------------------------------------------------
// PROTECTION
// --------------------------------------------------

if (!token) {
    window.location.href = '/Semester-Project-2/login.html';
}


// --------------------------------------------------
// API
// --------------------------------------------------

const apiKey = 'https://v2.api.noroff.dev/auction/profiles/anthony86';

const headers = {
                      'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW50aG9ueTg2IiwiZW1haWwiOiJhbnRob255LmFwaUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc4Nzc1MTk5MX0.pBk30AYhdVwQFdv5oe-FfpCRioU1E0Uad6-nYHQ1aEM',
                    'X-Noroff-API-Key': 'c87c2791-c851-4066-9044-070f941de43d'

};


// --------------------------------------------------
// FETCH USER PROFILE
// --------------------------------------------------

const response = await fetch(
    'https://v2.api.noroff.dev/auction/profiles/anthony86',
    {
        method: 'GET',
        headers
    }
);

if (response.ok) {

    const data = await response.json();

    console.log('Profile data:', data);
    console.log('Profile listings count:', data.data._count?.listings);

    profileName.textContent = data.data.name || '';
    profileEmail.textContent = data.data.email || '';
    profileCredits.textContent = data.data.credits ?? '';

    if (data.data.avatar?.url) {
        profileAvatar.src = data.data.avatar.url;
    } else {
        profileAvatar.src = './src/assets/profile.jpg';
    }

} else {

    const errorData = await response.json();

    console.error('PROFILE ERROR:', errorData);
}


// --------------------------------------------------
// FETCH USER LISTINGS
// --------------------------------------------------

const listingsResponse = await fetch(
    'https://v2.api.noroff.dev/auction/profiles/anthony86/listings',
    {
        method: 'GET',
        headers

    }
);

if (listingsResponse.ok) {

    const listingsData = await listingsResponse.json();

    console.log('MY LISTINGS:', listingsData);

    listingsData.data.forEach(listing => {

        const listingElement = document.createElement('div');

        listingElement.innerHTML = `
            <a href="/product.html?id=${listing.id}" class="block">
                <img
                    src="${listing.media?.[0]?.url || ''}"
                    alt="${listing.media?.[0]?.alt || ''}"
                    class="w-full h-48 object-cover rounded-lg"
                >

                <h3 class="mt-3 text-lg font-bold">
                    ${listing.title}
                </h3>
            </a>

            <button
                data-id="${listing.id}"
                class="edit-listing-button mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
                Edit Listing
            </button>

            <button
                data-id="${listing.id}"
                class="delete-listing-button mt-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
            >
                Delete Listing
            </button>
        `;

        profileListings.appendChild(listingElement);
    });


    // --------------------------------------------------
    // EDIT LISTING
    // --------------------------------------------------

    const editButtons = profileListings.querySelectorAll(
        '.edit-listing-button'
    );

    console.log('EDIT BUTTONS FOUND:', editButtons.length);

    editButtons.forEach(button => {

        button.addEventListener('click', () => {

            const listingId = button.dataset.id;

            console.log(
                'Edit button clicked for listing ID:',
                listingId
            );

            window.location.href =
                `/Semester-Project-2/create-list.html?id=${listingId}`;
        });
    });


    // --------------------------------------------------
    // DELETE LISTING
    // --------------------------------------------------

    const deleteButtons = profileListings.querySelectorAll(
        '.delete-listing-button'
    );

    deleteButtons.forEach(button => {

        button.addEventListener('click', async () => {

            const listingId = button.dataset.id;

            const confirmed = confirm(
                'Are you sure you want to delete this listing?'
            );

            if (!confirmed) {
                return;
            }


            const deleteResponse = await fetch(
                `https://v2.api.noroff.dev/auction/listings/${listingId}`,
                {
                    method: 'DELETE',
                    headers
                }
            );


            if (deleteResponse.ok) {

                console.log(
                    'Listing deleted successfully:',
                    listingId
                );

                button.parentElement.remove();

            } else {

                const errorData = await deleteResponse.json();

                console.error(
                    'DELETE ERROR:',
                    errorData
                );
            }
        });
    });

} else {

    const errorData = await listingsResponse.json();

    console.error(
        'LISTINGS ERROR:',
        errorData
    );
}

// --------------------------------------------------
// FETCH USER BIDS
// --------------------------------------------------

const bidListingsResponse = await fetch(
    'https://v2.api.noroff.dev/auction/profiles/anthony86/bids?_listings=true',
    {
        method: 'GET',
        headers
    }
);

if (bidListingsResponse.ok) {

    const bidListingsData = await bidListingsResponse.json();

    console.log('MY BIDS:', JSON.stringify(bidListingsData, null, 2));

    bidListingsData.data.forEach(bid => {

        const bidElement = document.createElement('tr');

        bidElement.innerHTML = `
            <td class="px-4 py-3">
                ${bid.listing.title}
            </td>

            <td class="px-4 py-3 font-semibold">
                ${bid.amount} credits
            </td>

            <td class="px-4 py-3">
                ${bid.amount} credits
            </td>

            <td class="px-4 py-3">
                Active
            </td>
        `;

        bidListings.appendChild(bidElement);

    });

}