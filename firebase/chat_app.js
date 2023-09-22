const sendButton = document.getElementById('send');
const message = document.getElementById('message');

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
    // You can call authenticate inside sendMessage to get the user value.
    authenticate()
        .then(user => {
            const messageData = {
                user: user,
                message: message.value // You should use message.value here
            };

            const messagesRef = ref(database, 'messages');
            push(messagesRef, messageData);

            message.value = '';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function Ip() {
    return new Promise((resolve, reject) => {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                resolve(data.ip);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function getIp() {
    return Ip(); // Return the promise here
}

function ezhash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        hash += charCode;
    }
    return hash;
}

function authenticate() {
    return getIp()
        .then(ip => {
            const hash = ezhash(ip);
            return 'user' + hash;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error; // Rethrow the error to be caught by the sendMessage function
        });
}

