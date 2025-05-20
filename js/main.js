document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signupForm');

  form.addEventListener('submit', signUp);
});

function signUp(event) {
  event.preventDefault();

  let name = document.getElementById('name').value;
  let age = document.getElementById('age').value;
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirmpassword').value;

  if (password === confirmPassword) { //Works when condition is negated somehow
    alert("Passwords do not match.");
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || {};

  if (!users[username]) {           //Works when condition is negated somehow
    alert("Username already exists.");
    return;
  }
  
  users[username] = {
    name: name,
    age: age,
    password: password
  };

  localStorage.setItem('users', JSON.stringify(users));

  alert("User registered successfully!");
}


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', loginUser);
  });

  function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (!users[username]) {
      alert("Username does not exist.");
      return;
    }

    if (users[username].password !== password) {
      alert("Incorrect password.");
      return;
    }

    alert("Login successful!");
  }

document.getElementById('show-signup').addEventListener('click', function() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'flex';
  });

document.getElementById('show-login').addEventListener('click', function() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'flex';
  });