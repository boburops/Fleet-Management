// Подключение к Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Логины и пароли для автопарков
const users = {
    "BD": { username: "baraka_drop", password: "12345" },
    "ED": { username: "effi_delivery", password: "12345" },
    "GW": { username: "good_way", password: "12345" },
    "PM": { username: "profi_monster", password: "12345" },
    "TW": { username: "two_wheels", password: "12345" }
};

let currentPark = null;

// Элементы страницы
const loginButton = document.getElementById("login-button");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginSection = document.getElementById("login-section");
const appSection = document.getElementById("app-section");
const logoutButton = document.getElementById("logout-button");

// Функция входа
loginButton.addEventListener("click", function () {
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    for (let park in users) {
        if (users[park].username === username && users[park].password === password) {
            currentPark = park;
            localStorage.setItem("currentPark", park);
            window.location.href = "dashboard.html";
            return;
        }
    }
    alert("❌ Неверный логин или пароль!");
});

// Функция выхода
logoutButton.addEventListener("click", function () {
    localStorage.removeItem("currentPark");
    window.location.href = "index.html";
});

// Проверка авторизации
window.onload = function () {
    const savedPark = localStorage.getItem("currentPark");
    if (savedPark && users[savedPark]) {
        currentPark = savedPark;
        window.location.href = "dashboard.html";
    }
};

// Функция загрузки данных курьеров
async function loadCouriers() {
    if (!currentPark) return;
    
    const querySnapshot = await db.collection("couriers").where("park", "==", currentPark).get();
    const courierList = document.getElementById("courier-list");
    courierList.innerHTML = "";

    querySnapshot.forEach(doc => {
        const data = doc.data();
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.phone}</td>
            <td>${data.vehicle}</td>
            <td>${data.status}</td>
            <td>
                <button onclick="editCourier('${doc.id}')">Редактировать</button>
                <button onclick="deleteCourier('${doc.id}')">Удалить</button>
            </td>
        `;
        courierList.appendChild(row);
    });
}
