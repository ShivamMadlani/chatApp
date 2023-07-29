const socket = io();
const msgForm = document.getElementById('send-container');
const msgContainer = document.querySelector('.messages');
const msgInput = document.getElementById('msg-input');
const username = document.getElementById('username').innerText;

socket.on('new_message', (data) => {
    appendMessage(data.sender, data.text, data.time);   //calls a func to append messages
});

msgForm.addEventListener('submit', (e) => {     //emits message and its info to the server
    e.preventDefault();
    const message = msgInput.value;
    const date = new Date();
    let msgSendTime;
    if (date.getMinutes() < 10)
        msgSendTime = date.getHours() + ":0" + date.getMinutes();
    else
        msgSendTime = date.getHours() + ":" + date.getMinutes();
    socket.emit('chat-message', {
        sender: username,
        text: message,
        time: msgSendTime
    });
    msgInput.value = '';
})

function appendMessage(sender, text, time) {
    const msgElement = document.createElement("div");
    if (sender == username)     //align bubble to right
        msgElement.classList.add("chat", "chat-end");
    else                        //align bubble to left
        msgElement.classList.add("chat", "chat-start");

    //append sender avtar with initials
    const avatarDiv = document.createElement("div");
    avatarDiv.classList.add("chat-image", "avatar", "placeholder");
    const senderInitials = document.createElement("div");
    senderInitials.classList.add("bg-neutral-focus", "text-neutral-content", "rounded-full", "w-12");
    senderInitials.innerText = sender[0].toUpperCase();
    avatarDiv.appendChild(senderInitials);
    msgElement.appendChild(avatarDiv);

    //append message sender's name
    const msgSender = document.createElement("div");
    msgSender.innerText = sender;
    msgSender.classList.add("chat-header");
    msgElement.appendChild(msgSender);

    //append message text
    const msgData = document.createElement("div");
    msgData.classList.add("chat-bubble");
    msgData.innerText = text;
    msgElement.appendChild(msgData);

    //append time at which message was sent
    const timeFooter = document.createElement("div");
    timeFooter.classList.add("chat-footer", "opacity-70");
    const msgTime = document.createElement("time");
    msgTime.innerText = time;
    timeFooter.appendChild(msgTime);
    msgElement.appendChild(timeFooter);

    //append all the above to messageContainer
    msgContainer.appendChild(msgElement);

    //auto scroll when overflow
    msgContainer.scrollTop = msgContainer.scrollHeight;
}
