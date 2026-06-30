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

    // Pastikan form kustom langsung tampil jika statusnya aktif saat load
    if (customSwitch.checked && customForm) {
        customForm.classList.add("show");
        customForm.style.display = "block"; // Pengaman visual tambahan
    }
}

// ===========================
// TOGGLE CUSTOM FORM
// ===========================
customSwitch.addEventListener("change", function () {
    if (this.checked) {
        customForm.classList.add("show");
        customForm.style.display = "block";
    } else {
        customForm.classList.remove("show");
        customForm.style.display = "none";
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
    
    // Otomatis kembali ke halaman profil setelah berhasil menyimpan
    window.location.href = "profil.html";
});

// ===========================
// TOMBOL KEMBALI
// ===========================
backBtn.addEventListener("click", function () {
    // Mengarahkan langsung secara aman ke halaman profil
    window.location.href = "profil.html";
});