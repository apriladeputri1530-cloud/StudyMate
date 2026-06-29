// ===============================
// LOGIN STUDYMATE
// ===============================

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const savedUser = localStorage.getItem("studymate-user");

    if(!savedUser){

        alert("Akun belum terdaftar");

        return;

    }

    const user = JSON.parse(savedUser);

    if(email !== user.email ||
       password !== user.password){

        alert("Email atau password salah");

        return;

    }

    // status login

    localStorage.setItem(
        "isLoggedIn",
        "true"
    );

    // simpan user yang sedang login

    localStorage.setItem(

        "currentUser",

        JSON.stringify(user)

    );

    alert("Login berhasil!");

    window.location.href="dashboard.html";

});