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
        // CEK EMAIL
        // ==========================

        const savedUser = JSON.parse(

            localStorage.getItem("studymate-user")

        );


        if(savedUser){

            if(savedUser.email === email){

                alert("Email sudah terdaftar.");

                return;

            }

        }


        // ==========================
        // DATA USER
        // ==========================

        const userData = {

            name: name,

            nim: nim,

            email: email,

            password: password,

            program: "Ilmu Komputer"

        };


        // simpan akun

        localStorage.setItem(

            "studymate-user",

            JSON.stringify(userData)

        );


        // simpan user aktif

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