// ======================================
// STUDYMATE - ADD EVENT
// ======================================

// ===============================
// PILIH TIPE EVENT
// ===============================

const typeButtons = document.querySelectorAll(".type-btn");
let selectedType = "Event";

typeButtons.forEach(button => {

    button.addEventListener("click", function () {

        typeButtons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        selectedType = this.dataset.type;

    });

});

// ===============================
// ELEMENT FORM
// ===============================

const form = document.getElementById("eventForm");

const eventName = document.getElementById("name");
const eventDate = document.getElementById("date");
const eventTime = document.getElementById("time");
const eventLocation = document.getElementById("location");
const eventDescription = document.getElementById("description");

// ===============================
// PREVIEW
// ===============================

const previewName = document.getElementById("previewName");
const previewDate = document.getElementById("previewDate");
const previewTime = document.getElementById("previewTime");
const previewLocation = document.getElementById("previewLocation");
const previewDescription = document.getElementById("previewDescription");

// ===============================
// UPDATE PREVIEW
// ===============================

function updatePreview(){

    previewName.textContent =
        eventName.value || "Nama Event";

    previewDate.textContent =
        eventDate.value || "Tanggal Event";

    previewTime.textContent =
        eventTime.value || "Waktu";

    previewLocation.textContent =
        eventLocation.value || "Lokasi";

    previewDescription.textContent =
        eventDescription.value || "Deskripsi Event";

}

eventName.addEventListener("input",updatePreview);
eventDate.addEventListener("change",updatePreview);
eventTime.addEventListener("change",updatePreview);
eventLocation.addEventListener("input",updatePreview);
eventDescription.addEventListener("input",updatePreview);

// ===============================
// LOAD DATA EDIT
// ===============================

const editId = localStorage.getItem("editEventId");

if(editId){

    let events = JSON.parse(localStorage.getItem("events")) || [];

    let event = events.find(item => item.id == editId);

    if(event){

        eventName.value = event.name;
        eventDate.value = event.date;
        eventTime.value = event.time;
        eventLocation.value = event.location;
        eventDescription.value = event.description;

        selectedType = event.type;

        typeButtons.forEach(btn=>{

            btn.classList.remove("active");

            if(btn.dataset.type === event.type){

                btn.classList.add("active");

            }

        });

        updatePreview();

    }

}

// ===============================
// SIMPAN EVENT (UPDATED PER USER)
// ===============================

form.addEventListener("submit",function(e){

    e.preventDefault();

    // 1. Ambil info user yang sedang login saat ini
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userEmail = currentUser ? currentUser.email : "guest";

    let events = JSON.parse(localStorage.getItem("events")) || [];

    const editId = localStorage.getItem("editEventId");

    const eventData = {

        id : editId ? Number(editId) : Date.now(),

        userOwner: userEmail, // <-- KUNCI PENTING: Menandai pemilik event berdasarkan email

        name : eventName.value,

        type : selectedType,

        date : eventDate.value,

        time : eventTime.value,

        location : eventLocation.value,

        description : eventDescription.value

    };

    if(editId){

        const index = events.findIndex(item => item.id == editId);

        if(index !== -1){

            events[index] = eventData;

        }

        localStorage.removeItem("editEventId");

    }else{

        events.push(eventData);

    }

    localStorage.setItem("events",JSON.stringify(events));

    alert("Event berhasil disimpan.");

    window.location.href="calendar.html";

});

// ===============================
// TOMBOL KEMBALI
// ===============================

const backBtn = document.querySelector(".back-btn");

if(backBtn){

    backBtn.addEventListener("click",function(){

        localStorage.removeItem("editEventId");

        window.location.href="calendar.html";

    });

}

// ===============================
// RESET PREVIEW
// ===============================

function resetPreview(){

    previewName.textContent="Nama Event";

    previewDate.textContent="Tanggal Event";

    previewTime.textContent="Waktu";

    previewLocation.textContent="Lokasi";

    previewDescription.textContent="Deskripsi Event";

}

// ===============================
// LOAD PERTAMA
// ===============================

updatePreview();