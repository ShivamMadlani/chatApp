const socket = io();
const msgForm = document.getElementById('send-container');
const msgContainer = document.querySelector('.messages');
const msgInput = document.getElementById('msg-input');
const username = document.getElementById('username').innerText;

socket.on('new_message', (data) => {
    appendMessage(data);
});

msgForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    socket.emit('chat-message', message);
    msgInput.value = '';
})

function appendMessage(msg) {
    const msgElement = document.createElement("p");
    msgElement.innerText = username+": "+msg;
    msgContainer.appendChild(msgElement);
}
