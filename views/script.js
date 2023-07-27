const socket = io();
const msgForm = document.getElementById('send-container');
const msgContainer = document.querySelector('.messages');
const msgInput = document.getElementById('msg-input');
const username = document.getElementById('username').innerText;

socket.on('new_message', (data) => {
    appendMessage(data.sender, data.text);
});

msgForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    socket.emit('chat-message', {
        sender: username,
        text: message
    });
    msgInput.value = '';
})

function appendMessage(sender, text) {
    const msgElement = document.createElement("div");
    if (sender == username)
        msgElement.classList.add("chat", "chat-end");
    else
        msgElement.classList.add("chat", "chat-start");
    const msgData = document.createElement("div");
    msgData.classList.add("chat-bubble");
    msgData.innerText = sender + ": " + text;
    msgElement.appendChild(msgData);
    msgContainer.appendChild(msgElement);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}
