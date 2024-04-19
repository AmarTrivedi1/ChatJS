//foler: views/javascript
//filename: chatbox.js
$(document).ready(function () {
    const chatWindow = $('#chatWindow');

    // Fetch messages every second
    setInterval(fetchMessages, 1000);

    // Handle form submission
    $('#chatForm').on('submit', function (e) {
        e.preventDefault();
        sendMessage();
    });

    function fetchMessages() {
        $.ajax({
            url: 'http://localhost:5001/messages',
            method: 'GET',
            success: function (messages) {
                chatWindow.empty(); // Clear the chat window
                messages.reverse().forEach(function (msg) {
                    addMessage(msg, msg.status, msg.createdAt);
                });
                // Only scroll to bottom if user is near the bottom already
                if (chatWindow.scrollTop() + chatWindow.innerHeight() >= chatWindow[0].scrollHeight - 99) {
                    chatWindow.scrollTop(chatWindow.prop("scrollHeight"));
                }
            },
            error: function () {
                console.error('Error fetching messages');
            }
        });
    }



    function sendMessage() {
        const message = {
            name: sessionStorage.getItem('userName'),
            message: $('#messageInput').val(),
            status: $('#messageStatus').val()
        };

        $.ajax({
            url: 'http://localhost:5001/messages',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(message),
            success: function () {
                $('#messageInput').val(''); // Clear the message input
                fetchMessages(); // Refresh messages
            },
            error: function () {
                console.error('Error sending message');
            }
        });
    }

    function addMessage(message, status, timestamp) {
        const date = new Date(timestamp);
        const formattedTime = date.toLocaleString();  // This will format the time based on the user's locale
        const messageBlock = $('<div>')
            .addClass('message-block')
            .attr('data-status', status)
            .html(`
                <div class="message-header">
                    <span class="message-name">${message.name}</span>
                    <span class="message-time">${formattedTime}</span>
                </div>
                <div class="message-body">${message.message}</div>
                <div class="message-footer">Status: ${status}</div>
            `);
        chatWindow.append(messageBlock);
    }

    $('#loginLogoutButton').on('click', function () {
        if (sessionStorage.getItem('accessToken')) {
            sessionStorage.removeItem('accessToken');
            sessionStorage.setItem('flash', 'You have been logged out.');
            window.location.href = 'login.html';
        } else {
            window.location.href = 'login.html';
        }
    });

    // Check login state and adjust button text
    if (sessionStorage.getItem('accessToken')) {
        $('#loginLogoutButton').text('Log Out');
    }


    window.onload = function () {
        if (sessionStorage.getItem('accessToken')) {
            document.getElementById('loginLogoutButton').textContent = 'Log Out';

            // Display username
            const userName = sessionStorage.getItem('userName');
            if (userName) {
                document.getElementById('userNameDisplay').textContent = 'Hello, ' + userName + '!';
            }

        }
        const flashMessage = sessionStorage.getItem('flash');
        if (flashMessage) {
            alert(flashMessage);
            sessionStorage.removeItem('flash');
        }
    };

});
