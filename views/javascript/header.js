//folder: views/javascript
//filename: header.js

document.addEventListener('DOMContentLoaded', function() {
    const accessToken = sessionStorage.getItem('accessToken');
    const chatLink = document.getElementById('chatPageLink');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');

    if (accessToken) {
        // User is logged in
        chatLink.style.display = '';      // Show chat link
        loginLink.style.display = 'none'; // Hide login link
        registerLink.style.display = 'none'; // Hide register link
    } 
    
    else {
        // User is not logged in
        chatLink.style.display = 'none'; // Hide chat link
        loginLink.style.display = '';    // Show login link
        registerLink.style.display = ''; // Show register link
    }
});
