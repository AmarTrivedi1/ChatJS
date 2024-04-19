//foler: views/javascript
//filename: login.js
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessages = document.getElementById('errorMessages');

    // Simple frontend validation
    if (!email || !password || !username) {
        errorMessages.textContent = 'Username, email, and password are required.';
        errorMessages.classList.remove('d-none');
        return;
    }

    // API request to your login endpoint
    fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data._id) {
                /*
                // Redirect to login page
                sessionStorage.setItem('accessToken', data.accessToken);
                sessionStorage.setItem('userName', data.userName);
                */
                window.location.href = 'login.html';
                //sessionStorage.setItem('flash', 'Welcome back!');
            } else {
                errorMessages.textContent = data.error || 'Register failed. Please try again.';
                errorMessages.classList.remove('d-none');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessages.textContent = 'An error occurred. Please try again.';
            errorMessages.classList.remove('d-none');
        });
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

