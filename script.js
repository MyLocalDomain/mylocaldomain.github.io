const users = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
    { username: "user3", password: "password3" }
];

let currentUser = null;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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
