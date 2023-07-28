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
    const avatarDiv = document.createElement("div");
    avatarDiv.classList.add("chat-image", "avatar", "placeholder");
    const senderInitials = document.createElement("div");
    senderInitials.classList.add("bg-neutral-focus", "text-neutral-content", "rounded-full", "w-12");
    senderInitials.innerText = sender[0].toUpperCase();
    avatarDiv.appendChild(senderInitials);
    msgElement.appendChild(avatarDiv);
    const msgData = document.createElement("div");
    msgData.classList.add("chat-bubble");
    msgData.innerText = text;

    const msgSender = document.createElement("div");
    msgSender.innerText = sender;
    msgSender.classList.add("chat-header");
    msgElement.appendChild(msgSender);

    msgElement.appendChild(msgData);
    msgContainer.appendChild(msgElement);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}
