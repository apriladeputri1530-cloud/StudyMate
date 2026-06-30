// ===============================
// LOGIN STUDYMATE
// ===============================

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value; // Password tidak perlu di-trim agar spasi di sandi tidak hilang

    // 1. Ambil daftar seluruh akun dari database lokal
    const savedUsersList = localStorage.getItem("studymate-users-list");

    // Jika tidak ada satu pun akun yang terdaftar di sistem
    if(!savedUsersList){

        alert("Akun belum terdaftar");

        return;

    }

    // Ubah string kembali menjadi Array objek
    const userList = JSON.parse(savedUsersList);

    // 2. Cari akun yang email-nya cocok di dalam daftar array
    const matchedUser = userList.find(user => user.email === email);

    // Jika email tidak ditemukan di dalam daftar
    if (!matchedUser) {

        alert("Akun belum terdaftar");

        return;

    }

    // 3. Validasi apakah password-nya sesuai
    if(matchedUser.password !== password){

        alert("Email atau password salah");

        return;

    }

    // status login
    localStorage.setItem(
        "isLoggedIn",
        "true"
    );

    // simpan user yang sedang login aktif (untuk filter data & profil)
    localStorage.setItem(

        "currentUser",

        JSON.stringify(matchedUser)

    );

    alert("Login berhasil!");

    window.location.href="dashboard.html";

});