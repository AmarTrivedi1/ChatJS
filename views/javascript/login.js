//foler: views/javascript
//filename: login.js
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessages = document.getElementById('errorMessages');

    // Simple frontend validation
    if (!email) {
        errorMessages.textContent = 'Email is required.';
        errorMessages.classList.remove('d-none');
        return;
    }

    if (!password) {
        errorMessages.textContent = 'Password is required.';
        errorMessages.classList.remove('d-none');
        return;
    }

    // API request to your login endpoint
    fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.accessToken) {
                // Sticky email if login is successful
                localStorage.setItem('stickyEmail', email);
                sessionStorage.setItem('accessToken', data.accessToken);
                sessionStorage.setItem('userName', data.userName);
                window.location.href = 'chatbox.html';
                sessionStorage.setItem('flash', 'Welcome back!');
            } else {
                errorMessages.textContent = data.error || 'Login failed. Please try again.';
                errorMessages.classList.remove('d-none');
                document.getElementById('email').value = localStorage.getItem('stickyEmail') || '';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessages.textContent = 'An error occurred. Please try again.';
            errorMessages.classList.remove('d-none');
        });

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('email').value = localStorage.getItem('stickyEmail') || '';
    })

    window.onload = function () {
        const flashMessage = sessionStorage.getItem('flash');
        if (flashMessage) {
            const flashDiv = document.getElementById('flashMessage');
            flashDiv.textContent = flashMessage;
            flashDiv.classList.remove('d-none');
            sessionStorage.removeItem('flash');
        }
    };
});

document.getElementById('email').addEventListener('blur', function () {
    const email = this.value;
    fetch('http://localhost:5001/api/users/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        const errorMessages = document.getElementById('errorMessages');
        if (data.exists) {
            errorMessages.textContent = '';  // Clear any error message
            errorMessages.classList.add('d-none');  // Hide the error message box
        } else {
            errorMessages.textContent = 'Email does not exist.';
            errorMessages.classList.remove('d-none');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

window.onload = function () {

    const flashMessage = sessionStorage.getItem('flash');
    if (flashMessage) {
        alert(flashMessage);
        sessionStorage.removeItem('flash');
    }
};

function togglePasswordsVisibility() {
    const passwordInput = document.getElementById('password');
    const showPassword = document.getElementById('showPassword').checked;
    passwordInput.type = showPassword ? 'text' : 'password';
}
