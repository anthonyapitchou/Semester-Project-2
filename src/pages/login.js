const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    console.log('Logging in:', { email, password });

    const response = await fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

if (response.ok) {
    const data = await response.json();

    console.log('Login successful:', data);

    localStorage.setItem('accessToken', data.data.accessToken);
    window.location.href = 'http://localhost:5173/home.html';



         
   } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
    }
});