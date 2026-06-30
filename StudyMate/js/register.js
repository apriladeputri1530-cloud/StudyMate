document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();

        const nim = document.getElementById("nim").value.trim();

        const email = document.getElementById("email").value.trim();

        const password = document.getElementById("password").value;

        const confirmPassword = document.getElementById("confirmPassword").value;


        // ==========================
        // VALIDASI
        // ==========================

        if (

            name === "" ||

            nim === "" ||

            email === "" ||

            password === "" ||

            confirmPassword === ""

        ){

            alert("Semua data harus diisi.");

            return;

        }


        if(password !== confirmPassword){

            alert("Konfirmasi kata sandi tidak cocok.");

            return;

        }


        // ==========================
        // CEK EMAIL (Mendukung Array Banyak Akun)
        // ==========================

        // Mengambil daftar semua akun yang ada di LocalStorage
        let userList = JSON.parse(

            localStorage.getItem("studymate-users-list")

        ) || [];


        // Cek apakah email yang diinput sudah ada di dalam daftar akun
        const isEmailExist = userList.some(user => user.email === email);

        if(isEmailExist){

            alert("Email sudah terdaftar.");

            return;

        }


        // ==========================
        // DATA USER BARU
        // ==========================

        const userData = {

            name: name,

            nim: nim,

            email: email,

            password: password,

            program: "Ilmu Komputer"

        };


        // Tambahkan akun baru ke dalam daftar array
        userList.push(userData);


        // Simpan kembali daftar seluruh akun ke LocalStorage
        localStorage.setItem(

            "studymate-users-list",

            JSON.stringify(userList)

        );


        // Simpan sesi user aktif saat ini yang baru mendaftar
        localStorage.setItem(

            "currentUser",

            JSON.stringify(userData)

        );


        alert(

            "Pendaftaran berhasil!\nSilakan login."

        );


        form.reset();


        window.location.href = "login.html";

    });


    // ==========================
    // TOMBOL LOGIN
    // ==========================

    const loginBtn = document.getElementById("loginBtn");

    if(loginBtn){

        loginBtn.addEventListener("click",()=>{

            window.location.href="login.html";

        });

    }

});