// document.getElementById('logout').addEventListener('click', function(event) {
//     event.preventDefault();
    
//     let user = JSON.parse(sessionStorage.getItem('currentUser'));
//     let activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || {};
//     let currentUser = JSON.stringify(user);
//     // if (activeUsers['currentUser']) {
//     //     delete activeUsers['currentUser'];

//     //     localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
//     //     sessionStorage.removeItem('currentUser');
//     // }
//     alert(currentUser);
//     window.location.href = '../index.html';
// });


// function createUserElement({ userName, userLinkHref }) {
//     const userDiv = document.createElement('div');
//     userDiv.className = 'user';

//     const userImg = document.createElement('img');
//     userImg.src = '../assets/image/person.png';
//     userImg.className = 'user-avatar';

//     const userNameSpan = document.createElement('span');
//     userNameSpan.className = 'user-name';

//     const userLink = document.createElement('a');
//     userLink.href = '#'; 
//     userLink.textContent = userName;

//     userLink.addEventListener('click', function(event) {
//         event.preventDefault(); 
//         loadUserProfile(userName);
//     });



// const userData = JSON.parse(localStorage.getItem('activeUsers')) || {};
// const userContainer = document.getElementById('user-container');

// Object.entries(userData).forEach(([username, userInfo]) => {
//     const userElement = createUserElement({
//         userName: userInfo.name,
//         userLinkHref: `/profile/${username}` 
//     });
//     userContainer.appendChild(userElement);
// });

const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const userList = document.getElementById('userList');

let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
let chatData = JSON.parse(localStorage.getItem('chatData')) || [];
let activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || [];

if (!activeUsers.includes(currentUser)) {
    activeUsers.push(currentUser);
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
}

window.addEventListener('beforeunload', () => {
    activeUsers = activeUsers.filter(user => user !== currentUser);
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
});

function displayUsers() {
    userList.innerHTML = '';
    activeUsers.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user.name;
    userList.appendChild(li);
    });
}

function displayMessages() {
    chatBox.innerHTML = '';
    chatData.forEach(msg => {
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

    chatData.push(newMessage);
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
displayUsers();