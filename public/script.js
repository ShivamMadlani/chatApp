const socket = io()
const msgForm = document.getElementById('send-container')
const msgInput = document.getElementById('msg-input')

msgForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value
    socket.emit('chat-message', message)
    msgInput.value = ''
})