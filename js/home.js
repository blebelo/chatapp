const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const userList = document.getElementById('userList');
const userActiveList = document.getElementById('activeUserList');

let currentUser = JSON.stringify(sessionStorage.currentUser);
let chatData = JSON.parse(localStorage.getItem('chatData')) || {};
let activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || {};
let allUsers = JSON.parse(localStorage.getItem('userData')) || {};

if (!activeUsers[currentUser]) {
    activeUsers[currentUser] = allUsers[currentUser];  // Add the current user to active users
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
}

window.addEventListener('beforeunload', () => {
    delete activeUsers[currentUser]; 
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
});

document.addEventListener('click', function () {
    const loginForm = document.getElementById('sendButton');
    sendMessage();
});

function displayAllUsers() {
    userList.innerHTML = '';
    Object.values(activeUsers).forEach((user) => {
        let li = document.createElement('li');
        li.textContent = user; 
        activeUserList.appendChild(li);
    });
}
function displayActiveUsers() {
    userList.innerHTML = '';
    Object.values(allUsers).forEach((user) => {
        let li = document.createElement('li');
        li.textContent = user.name; 
        userList.appendChild(li);
    });
}


function displayMessages() {
    chatBox.innerHTML = '';
    Object.keys(chatData).forEach(msg => {
    const div = document.createElement('div');
    div.className = 'message';
    div.innerHTML = `<strong>${msg.user}</strong>: ${msg.text} <br><span>${msg.time}</span>`;
    chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    const newMessage = {
    user: currentUser,
    text,
    time: new Date().toLocaleTimeString()
    };

    Object.keys(chatData).push(newMessage);
    localStorage.setItem('chatData', JSON.stringify(chatData));
    messageInput.value = '';
    displayMessages();
}

window.addEventListener('storage', () => {
    chatData = JSON.parse(localStorage.getItem('chatData')) || [];
    activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || [];
    displayMessages();
    displayUsers();
});

displayMessages();
displayAllUsers();
displayActiveUsers();