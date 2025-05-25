const hashPassword = async password => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

const changeUsername = (oldName, newName) => {
        let activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || {};
        const userData = JSON.parse(localStorage.getItem('userData'));

        delete activeUsers[oldName];
        activeUsers[newName] = userData[oldName].name;
        userData[newName] = userData[oldName];
        delete userData[oldName];

        sessionStorage.setItem('currentUser', newName);
        localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
        localStorage.setItem('userData', JSON.stringify(userData));
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('changeUsername');
    
    const userData = JSON.parse(localStorage.getItem('userData'));
    const currentUser = sessionStorage.getItem('currentUser');
    document.getElementById('newUsername').placeholder = currentUser;
    
    document.getElementById('currentUsername')
    .textContent = userData[currentUser].name + ', ' + userData[currentUser].age;


    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const newUsername = document.getElementById('newUsername').value.trim();
        const password = document.getElementById('password').value.trim();
        const hashedPassword = await hashPassword(password);

        
        if (userData[currentUser].password !== hashedPassword) {
            alert('Incorrect password.');
            return;
        }       
        
        if (userData[newUsername]) {
            alert('Username already taken');
            return;
        }
        changeUsername(currentUser, newUsername);
        form.reset();
        window.location.href= '../home.html'
    });
});