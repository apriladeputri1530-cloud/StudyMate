// ==========================
// PILIH TIPE EVENT
// ==========================

const typeButtons = document.querySelectorAll(".type-btn");

typeButtons.forEach(button => {

    button.addEventListener("click", () => {

        typeButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

    });

});


// ==========================
// TOMBOL KEMBALI
// ==========================

const backButton = document.querySelector(".back-btn");

backButton.addEventListener("click", () => {

    history.back();

});


// ==========================
// MODAL HAPUS
// ==========================

const deleteButton = document.querySelector(".delete-header");
const modal = document.getElementById("deleteModal");
const cancelButton = document.querySelector(".cancel-btn");
const confirmButton = document.querySelector(".confirm-btn");

deleteButton.addEventListener("click", () => {

    modal.style.display = "flex";

});

cancelButton.addEventListener("click", () => {

    modal.style.display = "none";

});

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});

confirmButton.addEventListener("click", () => {

    alert("Event berhasil dihapus!");

    modal.style.display = "none";

    // pindah halaman
    window.location.href = "calendar.html";

});


// ==========================
// SIMPAN PERUBAHAN
// ==========================

const form = document.getElementById("eventForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("eventName").value.trim();
    const date = document.getElementById("eventDate").value;
    const time = document.getElementById("eventTime").value;
    const location = document.getElementById("eventLocation").value.trim();
    const description = document.getElementById("description").value.trim();

    if(name === ""){

        alert("Nama event belum diisi.");

        return;

    }

    if(date === ""){

        alert("Tanggal event belum dipilih.");

        return;

    }

    if(time === ""){

        alert("Waktu event belum dipilih.");

        return;

    }

    if(location === ""){

        alert("Lokasi event belum diisi.");

        return;

    }

    // mencari tipe yang aktif
    const activeType = document.querySelector(".type-btn.active").textContent;

    const eventData = {

        nama: name,
        tipe: activeType,
        tanggal: date,
        waktu: time,
        lokasi: location,
        deskripsi: description

    };

    console.log(eventData);

    alert("Perubahan berhasil disimpan!");

    // pindah halaman
    window.location.href = "calendar.html";

});