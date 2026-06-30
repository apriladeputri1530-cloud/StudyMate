/* ===========================
   SPLASH SCREEN
=========================== */

document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.getElementById("startBtn");

    /* ===========================
       BUTTON MULAI
    =========================== */

    startBtn.addEventListener("click", () => {

        startBtn.innerHTML = "Memuat...";

        startBtn.disabled = true;

        setTimeout(() => {

            window.location.href = "login.html";

        }, 500);

    });

});