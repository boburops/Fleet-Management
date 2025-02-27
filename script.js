const users = {
    "BD": { username: "baraka_drop", password: "12345" },
    "ED": { username: "effi_delivery", password: "12345" },
    "GW": { username: "good_way", password: "12345" },
    "PM": { username: "profi_monster", password: "12345" },
    "TW": { username: "two_wheels", password: "12345" }
};

let currentPark = null;

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");
    const loginUsername = document.getElementById("login-username");
    const loginPassword = document.getElementById("login-password");
    const loginSection = document.getElementById("login-section");
    const appSection = document.getElementById("app-section");
    const logoutButton = document.getElementById("logout-button");
    const courierList = document.getElementById("courier-list");
    const addCourierButton = document.getElementById("add-courier");

    if (loginButton) {
        loginButton.addEventListener("click", function () {
            const username = loginUsername.value.trim();
            const password = loginPassword.value.trim();
    
            for (let park in users) {
                if (users[park].username === username && users[park].password === password) {
                    currentPark = park;
                    localStorage.setItem("currentPark", park);
                    loginSection.style.display = "none";
                    appSection.style.display = "block";
                    return;
                }
            }
            alert("❌ Неверный логин или пароль!");
        });
    }
    
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("currentPark");
            window.location.href = "index.html";
        });
    }

    if (addCourierButton) {
        addCourierButton.addEventListener("click", function () {
            const name = document.getElementById("courier-name").value.trim();
            const email = document.getElementById("courier-email").value.trim();
            const phone = document.getElementById("courier-phone").value.trim();
            const vehicle = document.getElementById("courier-vehicle").value;
            const equipment = document.getElementById("courier-equipment").value;
            
            if (!name || !email || !phone) {
                alert("Пожалуйста, заполните все поля!");
                return;
            }
            
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${Date.now()}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td>${vehicle}</td>
                <td>${equipment}</td>
                <td><button onclick="this.parentElement.parentElement.remove()">Удалить</button></td>
            `;
            courierList.appendChild(row);
        });
    }
});
