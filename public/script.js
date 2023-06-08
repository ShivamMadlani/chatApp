const socket = io();
const msgForm = document.getElementById('send-container')
const msgContainer = document.querySelector('.messages')
const msgInput = document.getElementById('msg-input')

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
    msgElement.innerText = msg;
    msgContainer.appendChild(msgElement);
}
