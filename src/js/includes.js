// This function loads a component (like header or footer) into a placeholder element on the page.
async function loadComponent(placeholderId, filePath) {

    const placeholder = document.getElementById(placeholderId);

    if (!placeholder) return;

    const response = await fetch(filePath);

    const html = await response.text();

    placeholder.innerHTML = html;

// Add event listeners for user menu and search functionality
    if (placeholderId === "header-placeholder") {

        const userMenuButton = document.getElementById('user-menu-button');
        const userMenu = document.getElementById('user-menu');

        const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('header-search-input');

        console.log('BUTTON:', userMenuButton);
        console.log('MENU:', userMenu);

        console.log('SEARCH BUTTON:', searchButton);
console.log('SEARCH INPUT:', searchInput);

// Add event listeners for user menu and search functionality

        if (userMenuButton && userMenu) {

            userMenuButton.addEventListener('click', () => {

                console.log('BOUTON CLIQUÉ');

                userMenu.classList.toggle('hidden');

            });

        }

        if (searchButton && searchInput) {

    searchButton.addEventListener('click', () => {

        console.log('SEARCH CLIQUÉ');

        searchInput.classList.remove('hidden');
        searchInput.focus();

    });

}    searchInput.addEventListener('keydown', (event) => {

        if (event.key === 'Enter') {

window.location.href = `/search.html?query=${searchInput.value}`;

        }

    });

    // Highlight the current page in the navigation
const currentPage = window.location.pathname;

const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    const linkPage = new URL(link.href).pathname;

    if (linkPage === currentPage) {
        link.classList.add('text-blue-600');
    }
});


// Check if the user is logged in and update the header accordingly
        const token = localStorage.getItem('accessToken');

        const loggedOut = document.getElementById('header-logged-out');
        const loggedIn = document.getElementById('header-logged-in');
        const logoutButton = document.getElementById('logout-button');


        if (token) {

            loggedOut.classList.add('hidden');
            loggedIn.classList.remove('hidden');

            if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/home.html';
    });
}

            // Fetch user profile data to display the avatar

    const response = await fetch(
        'https://v2.api.noroff.dev/auction/profiles/anthony86',
        {
            headers: {
 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW50aG9ueTg2IiwiZW1haWwiOiJhbnRob255LmFwaUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc4Nzc1MTk5MX0.pBk30AYhdVwQFdv5oe-FfpCRioU1E0Uad6-nYHQ1aEM',
    'X-Noroff-API-Key': 'c87c2791-c851-4066-9044-070f941de43d'
   
    
            }
                }
            );

    if (response.ok) {

        const data = await response.json();

    console.log(data);

        const avatar = document.getElementById('header-profile-avatar');

        if (data.data.avatar?.url) {
            avatar.src = data.data.avatar.url;
    
            }
        }
    }
}
}


   


loadComponent("header-placeholder", "/header.html");

loadComponent("footer-placeholder", "/footer.html");
