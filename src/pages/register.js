const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

       const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    console.log('Registering user:', { name, email, password });


    const response = await fetch('https://v2.api.noroff.dev/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
body: JSON.stringify({
    name: name,
    email: email,
    password: password
})
    });


    if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        // Redirect to login page or show success message
    } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        // Show error message to the user
    }
});