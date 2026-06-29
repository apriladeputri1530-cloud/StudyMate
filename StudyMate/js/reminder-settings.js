// ===========================
// AMBIL SEMUA ELEMENT
// ===========================

const hariH = document.getElementById("hariH");
const h1 = document.getElementById("h1");
const h3 = document.getElementById("h3");

const customSwitch = document.getElementById("customSwitch");
const customForm = document.getElementById("customForm");

const days = document.getElementById("days");
const time = document.getElementById("time");

const saveBtn = document.querySelector(".save-btn");
const backBtn = document.querySelector(".back-btn");

// ===========================
// LOAD DATA DARI LOCAL STORAGE
// ===========================

const reminder = JSON.parse(localStorage.getItem("reminder-settings"));

if (reminder) {

    hariH.checked = reminder.hariH;
    h1.checked = reminder.h1;
    h3.checked = reminder.h3;

    customSwitch.checked = reminder.customEnabled;

    days.value = reminder.customDays;
    time.value = reminder.customTime;

    if (customSwitch.checked) {
        customForm.classList.add("show");
    }

}

// ===========================
// TOGGLE CUSTOM FORM
// ===========================

customSwitch.addEventListener("change", function () {

    if (this.checked) {

        customForm.classList.add("show");

    } else {

        customForm.classList.remove("show");

    }

});

// ===========================
// SIMPAN DATA
// ===========================

saveBtn.addEventListener("click", function () {

    const data = {

        hariH: hariH.checked,
        h1: h1.checked,
        h3: h3.checked,

        customEnabled: customSwitch.checked,

        customDays: days.value,
        customTime: time.value

    };

    localStorage.setItem(
        "reminder-settings",
        JSON.stringify(data)
    );

    alert("Pengaturan pengingat berhasil disimpan!");

});

// ===========================
// TOMBOL KEMBALI
// ===========================

backBtn.addEventListener("click", function () {

    history.back();

});