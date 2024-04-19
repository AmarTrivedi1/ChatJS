//foler: views/javascript
//filename: script.js
$(document).ready(function() {
    const chatWindow = $('#chatWindow');

    // Fetch messages every second
    setInterval(fetchMessages, 1000);

    // Handle form submission
    $('#chatForm').on('submit', function(e) {
        e.preventDefault();
        sendMessage();
    });

    function fetchMessages() {
        $.ajax({
            url: '/messages',
            method: 'GET',
            success: function(messages) {
                chatWindow.empty(); // Clear the chat window
                messages.forEach(function(msg) {
                    addMessage(`${msg.name}: ${msg.message}`);
                });
                chatWindow.scrollTop(chatWindow.prop("scrollHeight"));
            },
            error: function() {
                console.error('Error fetching messages');
            }
        });
    }

    function sendMessage() {
        const message = {
            name: 'User', 
            message: $('#messageInput').val(),
            status: $('#messageStatus').val()
        };
    
        $.ajax({
            url: '/messages',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(message),
            success: function() {
                $('#messageInput').val(''); // Clear the message input
                fetchMessages(); // Refresh messages
            },
            error: function() {
                console.error('Error sending message');
            }
        });
    }
    
    function addMessage(message) {
        const messageElement = $('<div>').text(message);
        chatWindow.append(messageElement);
    }
});
