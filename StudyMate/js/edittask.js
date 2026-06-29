/* ==========================
   PRIORITAS
========================== */

const priorityButtons = document.querySelectorAll(".priority-btn");

priorityButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        priorityButtons.forEach((item) => {
            item.classList.remove("active");
        });

        btn.classList.add("active");

    });

});


/* ==========================
   DATE PICKER
========================== */

const dateInput = document.getElementById("dateInput");
const datePicker = document.getElementById("datePicker");

dateInput.addEventListener("click", () => {

    datePicker.classList.toggle("show");

});


const dayButtons = document.querySelectorAll(".days button");

dayButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        dayButtons.forEach((item) => {
            item.classList.remove("active");
        });

        btn.classList.add("active");

        const tanggal = btn.innerText;

        document.querySelector("#dateInput span").innerText =
            tanggal + " Juli 2025";

        datePicker.classList.remove("show");

    });

});


/* ==========================
   TIME PICKER
========================== */

const timeInput = document.getElementById("timeInput");
const timePicker = document.getElementById("timePicker");

timeInput.addEventListener("click", () => {

    timePicker.classList.toggle("show");

});


let selectedHour = "08";
let selectedMinute = "00";


const hourButtons =
    document.querySelectorAll(".picker-column:first-child .picker-list button");

hourButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        hourButtons.forEach((item) => {

            item.classList.remove("active");

        });

        btn.classList.add("active");

        selectedHour = btn.innerText;

    });

});


const minuteButtons =
    document.querySelectorAll(".picker-column:last-child .picker-list button");

minuteButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        minuteButtons.forEach((item) => {

            item.classList.remove("active");

        });

        btn.classList.add("active");

        selectedMinute = btn.innerText;

    });

});


/* ==========================
   PILIH WAKTU
========================== */

document
    .querySelector(".picker-confirm")
    .addEventListener("click", () => {

        document.querySelector("#timeInput span").innerText =
            selectedHour + ":" + selectedMinute;

        timePicker.classList.remove("show");

    });


/* ==========================
   KLIK DI LUAR
========================== */

document.addEventListener("click", (e) => {

    if (
        !datePicker.contains(e.target) &&
        !dateInput.contains(e.target)
    ) {

        datePicker.classList.remove("show");

    }

    if (
        !timePicker.contains(e.target) &&
        !timeInput.contains(e.target)
    ) {

        timePicker.classList.remove("show");

    }

});


/* ==========================
   SUBMIT FORM
========================== */

document
    .getElementById("editTaskForm")
    .addEventListener("submit", (e) => {

        e.preventDefault();

        const nama =
            document.querySelector("input[type='text']").value;

        if (nama.trim() === "") {

            alert("Nama tugas wajib diisi!");

            return;

        }

        alert("Perubahan berhasil disimpan!");

    });