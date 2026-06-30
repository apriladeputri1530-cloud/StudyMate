// ==============================
// ELEMENT
// ==============================

const form =
document.getElementById("scheduleForm");

const subject =
document.getElementById("subject");

const day =
document.getElementById("day");

const startTime =
document.getElementById("startTime");

const endTime =
document.getElementById("endTime");

const room =
document.getElementById("room");

const lecturer =
document.getElementById("lecturer");


// ==============================
// PREVIEW
// ==============================

const previewSubject =
document.getElementById("previewSubject");

const previewSchedule =
document.getElementById("previewSchedule");

const previewRoom =
document.getElementById("previewRoom");

const previewLecturer =
document.getElementById("previewLecturer");


// ==============================
// UPDATE PREVIEW
// ==============================

function updatePreview(){

    previewSubject.textContent =
        subject.value ||
        "Nama Mata Kuliah";

    previewSchedule.textContent =
        `${day.value} • ${startTime.value || "00:00"} - ${endTime.value || "00:00"}`;

    previewRoom.textContent =
        room.value ||
        "Ruangan";

    previewLecturer.textContent =
        lecturer.value ||
        "Nama Dosen";

}


// ==============================
// EVENT INPUT
// ==============================

subject.addEventListener(
    "input",
    updatePreview
);

day.addEventListener(
    "change",
    updatePreview
);

startTime.addEventListener(
    "input",
    updatePreview
);

endTime.addEventListener(
    "input",
    updatePreview
);

room.addEventListener(
    "input",
    updatePreview
);

lecturer.addEventListener(
    "input",
    updatePreview
);


// ==============================
// DETEKSI MODE EDIT / DATA LAMA
// ==============================

// Ambil status login akun aktif saat ini
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userEmail = currentUser ? currentUser.email : "guest";

let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
const editId = localStorage.getItem("editScheduleId");

// Jika ada editId, berarti user sedang menekan tombol Edit (Pensil)
if (editId) {
    const dataToEdit = schedules.find(item => item.id == editId);
    
    if (dataToEdit) {
        // Isikan data lama ke dalam form input
        if (subject) subject.value = dataToEdit.subject || "";
        if (day) day.value = dataToEdit.day || "Senin";
        if (startTime) startTime.value = dataToEdit.startTime || "";
        if (endTime) endTime.value = dataToEdit.endTime || "";
        if (room) room.value = dataToEdit.room || "";
        if (lecturer) lecturer.value = dataToEdit.lecturer || "";
        
        // Perbarui teks tombol simpan jika ada di halaman HTML Anda
        const saveBtn = document.querySelector(".save-btn") || document.querySelector("button[type='submit']");
        if (saveBtn) saveBtn.textContent = "Simpan Perubahan";
    }
}


// ==============================
// SIMPAN JADWAL
// ==============================

form.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        schedules = JSON.parse(localStorage.getItem("schedules")) || [];

        if (editId) {
            // --- MODE EDIT: Perbarui data lama ---
            schedules = schedules.map(item => {
                if (item.id == editId) {
                    return {
                        ...item, // Pertahankan ID asli dan userOwner aslinya
                        subject: subject.value,
                        day: day.value,
                        startTime: startTime.value,
                        endTime: endTime.value,
                        room: room.value,
                        lecturer: lecturer.value
                    };
                }
                return item;
            });
            
            localStorage.removeItem("editScheduleId"); // Hapus tanda setelah selesai
            alert("Jadwal berhasil diperbarui!");

        } else {
            // --- MODE TAMBAH BARU: Buat objek jadwal baru ---
            const schedule = {
                id: Date.now(),
                userOwner: userEmail, // <--- AKUN ANDA MENGIKAT DI SINI SEKARANG
                subject: subject.value,
                day: day.value,
                startTime: startTime.value,
                endTime: endTime.value,
                room: room.value,
                lecturer: lecturer.value
            };

            schedules.push(schedule);
            alert("Jadwal berhasil ditambahkan!");
        }

        localStorage.setItem(
            "schedules",
            JSON.stringify(schedules)
        );

        // Hari terakhir dipilih
        localStorage.setItem(
            "selectedDay",
            day.value
        );

        window.location.href = "schedule.html";

    }
);


// ==============================
// TOMBOL KEMBALI
// ==============================

document.querySelector(
    ".back-btn"
)?.addEventListener(
    "click",
    ()=>{
        localStorage.removeItem("editScheduleId"); // Hapus sisa tanda edit jika batal
        history.back();
    }
);


// ==============================
// LOAD
// ==============================

updatePreview();