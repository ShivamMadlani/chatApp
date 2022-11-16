const socket = io()
const msgForm = document.getElementById('send-container')
const msgContainer = document.getElementById('container')
const msgInput = document.getElementById('msg-input')

socket.on('message', (data) => {
    appendMessage(data);
})

msgForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value
    socket.emit('chat-message', message);
    msgInput.value = '';
})

function appendMessage(msg) {
    const msgElement = document.createElement('div');
    msgElement.innerText = msg;
    msgContainer.appendChild(msgElement);
}