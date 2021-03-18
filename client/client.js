const socket = io();
// console.log(socket)
// socket.emit('message', 'hello')


let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
const incoming = "incoming"
const outgoing = "outgoing"

do {
    name = prompt("Input your name: ");
} while(!name)

textarea.addEventListener('keydown', event => {
    if(event.key === 'Enter') {
        sendMessage(event.target.value)
    }
})

function sendMessage(message) {
    const msg = {
        user: name,
        message
    }
    appendMessage(msg, incoming)
    textarea.value = ''
    scrollToBottom()
    
    socket.emit('message', msg) //send into a server
}

function appendMessage(message, type) {
    const mainDiv = document.createElement('div')
    mainDiv.classList.add(type, 'message')
    const child = `
        <h4>${message.user}</h4>
        <p>${message.message}</p>
    `
    mainDiv.innerHTML = child
    messageArea.appendChild(mainDiv)
}

socket.on('message', msg => {
    appendMessage(msg, outgoing) //get from server for another user
    scrollToBottom() //Скролить до самого низу повідомлень (якщо їх багато)
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}