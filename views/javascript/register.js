//foler: views/javascript
//filename: register.js
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessages = document.getElementById('errorMessages');

    if (!username || !email || !password || !confirmPassword) {
        errorMessages.textContent = 'All fields are required.';
        errorMessages.classList.remove('d-none');
        return;
    }

    if (password !== confirmPassword) {
        errorMessages.textContent = 'Passwords do not match.';
        errorMessages.classList.remove('d-none');
        return;
    }

    fetch('http://localhost:5001/api/users/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.exists) {
            errorMessages.textContent = 'Email already exists.';
            errorMessages.classList.remove('d-none');
        } else {
            // Proceed with registering the user
            registerUser(username, email, password);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessages.textContent = 'An error occurred. Please try again.';
        errorMessages.classList.remove('d-none');
    });
});

function registerUser(username, email, password) {
    fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            errorMessages.textContent = data.error;
            errorMessages.classList.remove('d-none');
        } else {
            // Redirect with success message
            sessionStorage.setItem('flash', 'User registered successfully!');
            window.location.href = 'login.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorMessages.textContent = 'An error occurred. Please try again.';
        errorMessages.classList.remove('d-none');
    });
}

function togglePasswordsVisibility() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const showPasswords = document.getElementById('showPasswords').checked;
    passwordInput.type = showPasswords ? 'text' : 'password';
    confirmPasswordInput.type = showPasswords ? 'text' : 'password';
}
