// Load users from localStorage or initialize an empty array if no data exists
let users = JSON.parse(localStorage.getItem('users')) || [];

let currentUser = null;

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        document.querySelector('.login-container').style.display = 'none';
        document.querySelector('.banking-container').style.display = 'block';
        
        // Play background music
        const music = document.getElementById('loginMusic');
        music.play();
    } else {
        alert('Invalid username or password.');
    }
}

function signup() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    if (username && password) {
        if (users.some(u => u.username === username)) {
            alert('Username already exists. Please choose a different one.');
        } else {
            users.push({ username, password });
            saveUsers(); // Save users to localStorage
            alert('Account created successfully. You can now log in.');
            showLogin();
        }
    } else {
        alert('Please enter username and password.');
    }
}

function transferMoney() {
    if (!currentUser) {
        alert("Please log in first.");
        return;
    }

    const recipient = document.getElementById('recipient').value;
    const amountInput = document.getElementById('amount');
    const balanceElement = document.getElementById('balance');
    const messageElement = document.getElementById('message');
    
    const amount = parseFloat(amountInput.value);
    let balance = parseFloat(balanceElement.innerText);

    if (!recipient) {
        messageElement.innerText = 'Please enter a recipient.';
        messageElement.style.color = 'red';
    } else if (isNaN(amount) || amount <= 0) {
        messageElement.innerText = 'Please enter a valid amount.';
        messageElement.style.color = 'red';
    } else if (amount > balance) {
        messageElement.innerText = 'Insufficient funds.';
        messageElement.style.color = 'red';
    } else {
        balance -= amount;
        balanceElement.innerText = balance.toFixed(2);
        messageElement.innerText = `Transfer of $${amount.toFixed(2)} to ${recipient} successful!`;
        messageElement.style.color = 'green';
    }

    amountInput.value = '';
    document.getElementById('recipient').value = '';
}

function showLogin() {
    document.querySelector('.login-container').style.display = 'block';
    document.querySelector('.signup-container').style.display = 'none';
}

function showSignup() {
    document.querySelector('.login-container').style.display = 'none';
    document.querySelector('.signup-container').style.display = 'block';
}

// Call showLogin() initially to display the login form
showLogin();
