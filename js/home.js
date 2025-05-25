logoutUser = () => {
    const currentUser = sessionStorage.getItem('currentUser');

    if (currentUser) {
        let activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || {};
        delete activeUsers[currentUser];
        localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
    }

    sessionStorage.clear();
    window.location.href = './index.html';
};

document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('userList');
    const activeUserList = document.getElementById('activeUserList');

    let currentUser = JSON.stringify(sessionStorage.currentUser);
    let activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || {};
    let allUsers = JSON.parse(localStorage.getItem('userData')) || {};
    
    let chatData = JSON.parse(localStorage.getItem('chatData')) || {};
    



    displayActiveUsers = () => {
        activeUserList.innerHTML = '';
        Object.values(activeUsers).forEach((user) => {
            let li = document.createElement('li');
            li.textContent = user ; 
            activeUserList.appendChild(li);
        });
    }

    displayAllUsers = () => {
        userList.innerHTML = '';
        Object.values(allUsers).forEach((user) => {
            let li = document.createElement('li');
            li.textContent = user.name; 
            userList.appendChild(li);
        });
    }

    displayMessages = () => {
        chatBox.innerHTML = '';
        Object.keys(chatData).forEach(msg => {
            const div = document.createElement('div');
            div.className = 'message';
            div.innerHTML = `<strong>${msg.user}</strong>: ${msg.text} <br><span>${msg.time}</span>`;
            chatBox.appendChild(div);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    sendMessage = () => {
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
        // displayMessages();
        displayAllUsers();
        displayActiveUsers();
    });
    // displayMessages();
    displayAllUsers();
    displayActiveUsers();
})