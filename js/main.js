async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signupForm');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const age = parseInt(document.getElementById('age').value);
        const username = document.getElementById('user-name').value.trim();
        const password = document.getElementById('userpw').value;
        const confirmPassword = document.getElementById('confirmpassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        const userData = JSON.parse(localStorage.getItem('userData')) || {};

        if (userData[username]) {
            alert('Username already exists.');
            return;
        }

        const hashedPassword = await hashPassword(password);

        userData[username] = {
            name: name,
            age: age,
            password: hashedPassword
        };

        localStorage.setItem('userData', JSON.stringify(userData));

        alert('User registered sucessfully.');
        form.reset();
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        const userData = JSON.parse(localStorage.getItem('userData')) || {};

        if (!userData[username]) {
            alert('Username does not exist');
            return;
        }

        const hashedPassword = await hashPassword(password);
        
        if (userData[username].password !== hashedPassword) {
            alert('Incorrect password.');
            return;
        }
        const activeUser =  { [username]: userData[username] };
        
        const activeUsers = JSON.parse(localStorage.getItem('activeUsers')) || {};
        
        activeUsers[username] = userData[username].name;
        localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
        sessionStorage.setItem('currentUser', username);

        alert(`Login sucessful!`);
        window.location.href = "./pages/home.html";
    });
});

document.getElementById('show-signup').addEventListener('click', function() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'flex';
  });

document.getElementById('show-login').addEventListener('click', function() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'flex';
  });