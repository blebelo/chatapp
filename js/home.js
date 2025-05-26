document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('userList');
    const activeUserList = document.getElementById('activeUserList');
    
    let currentUser = sessionStorage.getItem('currentUser');
    let activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || {};
    let allUsers = JSON.parse(localStorage.getItem('userData')) || {};
    
    
    document.getElementById('logout').addEventListener('click', function (event) {
        event.preventDefault();
        logoutUser();
    });
    
    const logoutUser = () => {
        const currentUser = sessionStorage.getItem('currentUser');
    
        if (currentUser) {
            let activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || {};
            delete activeUsers[currentUser];
            localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
        }
    
        sessionStorage.clear();
        window.location.href = './index.html';
    };

    const displayActiveUsers = () => {
        activeUserList.innerHTML = '';

        Object.entries(activeUsers).forEach(([username, displayName]) => {
            const li = document.createElement('li');
            li.textContent = displayName;
            li.dataset.username = username;

            li.addEventListener('click', () => {
                currentChatPartner = username;
                sessionStorage.setItem('currentChatPartner', username);
                loadPrivateChat(currentUser, currentChatPartner);
                document.querySelector('#chats h2').textContent = activeUsers[username];               
            });

            activeUserList.appendChild(li);
        });
    };

    const displayAllUsers = () => {
        userList.innerHTML = '';

        Object.entries(allUsers).forEach(([username, user]) => {
            const li = document.createElement('li');
            li.textContent = user.name;
            li.dataset.username = username;

            li.addEventListener('click', () => {
                currentChatPartner = username;
                sessionStorage.setItem('currentChatPartner', username);
                loadPrivateChat(currentUser, currentChatPartner);
                document.querySelector('#chats h2').textContent = user.name;
            });

            userList.appendChild(li);
        });
    };

    const createGroup = (groupName, selectedMembers) => {
        const groupId = `group_${Date.now()}`;
        const newGroup = {
            name: groupName,
            members: selectedMembers,
            messages: [],
            typing: []
        };

        const existingGroups = JSON.parse(localStorage.getItem('groupChats')) || {};
        existingGroups[groupId] = newGroup;
        localStorage.setItem('groupChats', JSON.stringify(existingGroups));

        displayGroupChats();
    }

    const formattedTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}h${minutes}`;    
    }

    const loadPrivateChat = (currentUser, chatPartner) => {
        const chatBox = document.getElementById('chatBox');
        chatBox.innerHTML = '';

        const chatKey = [currentUser, chatPartner].sort().join(':');
        let chatData = JSON.parse(localStorage.getItem('chatData')) || {};
        let messages = chatData[chatKey] || [];


        messages.forEach((msg) => {
            const p = document.createElement('p');
            p.textContent = `${msg.sender}: ${msg.message} @${msg.timetamp}`;
            chatBox.appendChild(p);
        });
    };
    
    document.getElementById('sendButton').addEventListener('click', () => {
        const input = document.getElementById('messageInput');
        const messageText = input.value.trim();
        if (messageText === '') return;

        const chatKey = [currentUser, currentChatPartner].sort().join(':');

        let chatData = JSON.parse(localStorage.getItem('chatData')) || {};
        
        if (!chatData[chatKey]) chatData[chatKey] = [];

        chatData[chatKey].push({
            sender: currentUser,
            message: messageText,
            timetamp: formattedTime()
        });

        localStorage.setItem('chatData', JSON.stringify(chatData));

        input.value = '';
        loadPrivateChat(currentUser, currentChatPartner);
    });


    window.addEventListener('storage', () => {
        loadPrivateChat(currentUser, currentChatPartner)        
        displayAllUsers();
        displayActiveUsers();
    });
    displayAllUsers();
    displayActiveUsers();
})