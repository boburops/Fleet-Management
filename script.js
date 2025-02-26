// 🔑 Данные для входа (логины и пароли автопарков)
const users = {
    "park1": { username: "user1", password: "pass1" },
    "park2": { username: "user2", password: "pass2" },
    "park3": { username: "user3", password: "pass3" },
    "park4": { username: "user4", password: "pass4" },
    "park5": { username: "user5", password: "pass5" },
    "park6": { username: "user6", password: "pass6" }
};

let currentPark = null;

// Элементы страницы
const loginSection = document.getElementById("login-section");
const appSection = document.getElementById("app-section");
const loginButton = document.getElementById("login-button");
const logoutButton = document.getElementById("logout-button");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");

// 🔐 Функция входа
loginButton.addEventListener("click", function () {
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    for (let park in users) {
        if (users[park].username === username && users[park].password === password) {
            currentPark = park;
            localStorage.setItem("currentPark", park); // Сохранение авторизации
            loginSection.style.display = "none";
            appSection.style.display = "block";
            renderCouriers(); // Загрузка курьеров только для этого автопарка
            return;
        }
    }
    alert("❌ Неверный логин или пароль!");
});

// 🚪 Функция выхода
logoutButton.addEventListener("click", function () {
    localStorage.removeItem("currentPark");
    currentPark = null;
    loginSection.style.display = "block";
    appSection.style.display = "none";
});

// 📌 Проверка, есть ли пользователь в localStorage
window.onload = function () {
    const savedPark = localStorage.getItem("currentPark");
    if (savedPark && users[savedPark]) {
        currentPark = savedPark;
        loginSection.style.display = "none";
        appSection.style.display = "block";
        renderCouriers();
    }
};

// 🏢 Фильтрация курьеров по автопарку
async function renderCouriers() {
    if (!currentPark) return;

    const querySnapshot = await getDocs(collection(db, "couriers"));
    const couriers = [];

    querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data.park === currentPark) {
            couriers.push({ id: doc.id, ...data });
        }
    });

    // Отображение только курьеров текущего автопарка
    const courierList = document.getElementById("courier-list");
    courierList.innerHTML = "";
    couriers.forEach(c => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${c.name}</td>
            <td>${c.returned ? "Возвращён" : "Не возвращён"}</td>
            <td>
                <button onclick="toggleReturned('${c.id}', ${!c.returned})">
                    ${c.returned ? "Отменить" : "Подтвердить"}
                </button>
                <button onclick="deleteCourier('${c.id}')">Удалить</button>
            </td>
        `;
        courierList.appendChild(row);
    });
}
