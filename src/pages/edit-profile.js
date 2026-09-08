const profileForm = document.getElementById('profile-form');
const avatarPreview = document.getElementById('avatar-preview');
const avatarInput = document.getElementById('avatar-input');
const uploadImageBtn = document.getElementById('upload-image-btn');
const removeImageBtn = document.getElementById('remove-image-btn');
const fullName = document.getElementById('full-name');
const address1 = document.getElementById('address-1');
const address2 = document.getElementById('address-2');
const county = document.getElementById('county');
const country = document.getElementById('country');
const city = document.getElementById('city');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const profileMessage = document.getElementById('profile-message');
const token = localStorage.getItem('accessToken');
// --------------------------------------------------
// PROTECTION
// --------------------------------------------------

if (!token) {
    window.location.href = '/login.html';
}


const avatarUrl = document.getElementById('avatar-url');

uploadImageBtn.addEventListener('click', () => {
    console.log('URL entrée:', avatarUrl.value);

    if (avatarUrl.value) {
        avatarPreview.src = avatarUrl.value;
    }
});

removeImageBtn.addEventListener('click', () => {
    avatarPreview.src = '/src/assets/profile.jpg';
    avatarInput.value = '';
});

console.log('Profile script page loaded');



console.log('Token:', token);


const response = await fetch('https://v2.api.noroff.dev/auction/profiles/anthony86', {
    method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW50aG9ueTg2IiwiZW1haWwiOiJhbnRob255LmFwaUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc4Nzc1MTk5MX0.pBk30AYhdVwQFdv5oe-FfpCRioU1E0Uad6-nYHQ1aEM',
    'X-Noroff-API-Key': 'c87c2791-c851-4066-9044-070f941de43d'
  },
});

if (response.ok) {
    const data = await response.json();

    console.log('Profile data:', data);

    fullName.value = data.data.name || '';
    email.value = data.data.email || '';

    if (data.data.avatar?.url) {
        avatarPreview.src = data.data.avatar.url;
    } else {
        avatarPreview.src = '/src/assets/profile.jpg';
    }

    console.log('Profile data populated successfully');


}

editProfileForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const updatedEditProfile = {
        avatar: {
            url: avatarPreview.src,
            alt: "Profile avatar"
        }
    };

    console.log('Updated profile data:', updatedEditProfile);

    const response = await fetch(
        'https://v2.api.noroff.dev/auction/profiles/anthony86',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
               
   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW50aG9ueTg2IiwiZW1haWwiOiJhbnRob255LmFwaUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc4Nzc1MTk5MX0.pBk30AYhdVwQFdv5oe-FfpCRioU1E0Uad6-nYHQ1aEM',
        'X-Noroff-API-Key': 'c87c2791-c851-4066-9044-070f941de43d'
            },
            body: JSON.stringify(updatedEditProfile)
        }
    );

    const data = await response.json();

    console.log('PUT status:', response.status);
    console.log('PUT response:', data);
});









