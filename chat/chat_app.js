import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js'
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js'

const appSettings = {
    databaseURL: "https://chrixelchat-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

const sendButton = document.getElementById('send');
const messageInput = document.getElementById('messageInput');

function milliUTC() {
    return jetzt().getTime() + (jetzt().getTimezoneOffset() * 60000);
}

function jetzt() {
    return new Date()
}

sendButton.addEventListener('click', sendMessage);

function sendMessage() {

    authenticate()
        .then(user => {
            const messageData = {
                user: user,
                message: messageInput.value,
                utc: milliUTC()
            };

            const messagesRef = ref(database, 'messages');
            push(messagesRef, messageData);

            messageInput.value = '';
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
    return Ip();
}

//create a sum of the char codes
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

function milliUTCToLocal(a) {
    const milliLocal = new Date(a-(jetzt().getTimezoneOffset() * 60000));
    return milliLocal.toLocaleString();
}
onValue(ref(database, 'messages'), (snapshot) => {
    const messagesData = snapshot.val();
    if (messagesData) {
        for (const messageId in messagesData) {
            if (messagesData.hasOwnProperty(messageId)) {
                const message = messagesData[messageId];
                const user = message.user;
                const messageText = message.message;
                const utc = message.utc;
                console.log(messageText);
                const messageElement = document.createElement('div');
                messageElement.innerHTML = `<b>${user}</b>: ${messageText} <i>${milliUTCToLocal(utc)}</i>`;
                document.getElementById('messages').appendChild(messageElement);
                messageElement.scrollIntoView();
            }
        }
    }
});