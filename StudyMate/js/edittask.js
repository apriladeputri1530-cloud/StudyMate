/* ==========================
   LOAD DATA TUGAS YANG MAU DIEDIT
========================== */
// 1. LANGSUNG AMBIL DATA DARI LOCALSTORAGE "editTask" (Yang dikirim oleh detailtask.js)
let currentTask = JSON.parse(localStorage.getItem('editTask'));

// 2. Ambil data master tasks untuk proses update nanti
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 3. Set taskId berdasarkan data tugas yang sedang diedit
const taskId = currentTask ? currentTask.id : null;

// Variabel internal penampung jam & menit default
let selectedHour = "08";
let selectedMinute = "00";

// 4. Masukkan data lama ke input HTML saat halaman dimuat
if (currentTask) {
    const inputs = document.querySelectorAll("input[type='text']");
    
    // Isi input nama tugas dan mata kuliah berdasarkan indeks susunan form
    if (inputs[0]) inputs[0].value = currentTask.name;
    if (inputs[1]) inputs[1].value = currentTask.subject;
    
    // Isi input deskripsi jika ada elemen textarea
    const textarea = document.querySelector("textarea");
    if (textarea && currentTask.description) {
        textarea.value = currentTask.description;
    }

    // Pecah data deadline (Contoh asal formatnya: "30 Juni 2026 • 10:00")
    if (currentTask.deadline) {
        const deadlineParts = currentTask.deadline.split(" • ");
        
        if (deadlineParts[0]) {
            const dateSpan = document.querySelector("#dateInput span");
            if (dateSpan) dateSpan.innerText = deadlineParts[0];
        }
        
        if (deadlineParts[1]) {
            const timeSpan = document.querySelector("#timeInput span");
            if (timeSpan) timeSpan.innerText = deadlineParts[1];
            
            // Sinkronkan variabel waktu internal agar tidak reset saat disimpan
            const timeParts = deadlineParts[1].split(":");
            if (timeParts.length === 2) {
                selectedHour = timeParts[0].trim();
                selectedMinute = timeParts[1].trim();
            }
        }
    }

    // Set tombol prioritas yang aktif berdasarkan data yang tersimpan sebelumnya
    const priorityButtonsInitial = document.querySelectorAll(".priority-btn");
    priorityButtonsInitial.forEach((btn) => {
        if (btn.innerText.trim() === currentTask.priority) {
            priorityButtonsInitial.forEach(item => item.classList.remove("active"));
            btn.classList.add("active");
        }
    });

    // SINKRONISASI VISUAL UNTUK TIME PICKER SAAT BARU MASUK (Solusi Masalah Gambar)
    const hourButtonsInitial = document.querySelectorAll(".picker-column:first-child .picker-list button");
    hourButtonsInitial.forEach((btn) => {
        if (btn.innerText.trim() === selectedHour) {
            hourButtonsInitial.forEach(item => item.classList.remove("active"));
            btn.classList.add("active");
            // Scroll otomatis ke tombol yang aktif agar terlihat oleh user
            btn.scrollIntoView({ block: "nearest" });
        }
    });

    const minuteButtonsInitial = document.querySelectorAll(".picker-column:last-child .picker-list button");
    minuteButtonsInitial.forEach((btn) => {
        if (btn.innerText.trim() === selectedMinute) {
            minuteButtonsInitial.forEach(item => item.classList.remove("active"));
            btn.classList.add("active");
            // Scroll otomatis ke tombol yang aktif agar terlihat oleh user
            btn.scrollIntoView({ block: "nearest" });
        }
    });

} else {
    alert("Data tugas tidak ditemukan!");
}


/* ==========================
   PRIORITAS ELEMEN INTERAKSI
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
   DATE PICKER (KALENDER REAL & DINAMIS)
========================== */
const dateInput = document.getElementById("dateInput");
const datePicker = document.getElementById("datePicker");
const daysContainer = document.querySelector(".days");

// Variabel default tahun dan bulan aktif
let currentYear = 2026; 
let currentMonth = 5; // 5 = Juni (0-indexed: 0=Jan, 1=Feb, dst.)

const namaBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const calendarTitle = document.querySelector(".calendar-header h3");
const prevMonthBtn = document.querySelector(".calendar-header button:first-child");
const nextMonthBtn = document.querySelector(".calendar-header button:last-child");

// Pastikan tombol panah tidak men-submit form
if (prevMonthBtn) prevMonthBtn.setAttribute("type", "button");
if (nextMonthBtn) nextMonthBtn.setAttribute("type", "button");

// Sinkronisasi awal dengan data deadline tugas lama (jika ada)
if (typeof currentTask !== "undefined" && currentTask && currentTask.deadline) {
    const tanggalLama = currentTask.deadline.split(" • ")[0]; 
    if (tanggalLama.includes("-")) {
        const parts = tanggalLama.split("-");
        currentYear = parseInt(parts[0]) || 2026;
        currentMonth = (parseInt(parts[1]) - 1) || 5;
    } else {
        const datePieces = tanggalLama.trim().split(" ");
        if (datePieces.length === 3) {
            currentYear = parseInt(datePieces[2]) || 2026;
            const mIndex = namaBulan.indexOf(datePieces[1]);
            if (mIndex !== -1) currentMonth = mIndex;
        }
    }
}

// FUNGSI UTAMA: Generate kalender asli berdasarkan bulan & tahun
function renderCalendar() {
    if (!daysContainer) return;
    
    daysContainer.innerHTML = ""; 

    if (calendarTitle) {
        calendarTitle.innerText = `${namaBulan[currentMonth]} ${currentYear}`;
    }

    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDiv = document.createElement("div");
        daysContainer.appendChild(emptyDiv);
    }

    for (let day = 1; day <= totalDays; day++) {
        const btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.innerText = day;

        const dateSpan = document.querySelector("#dateInput span");
        const teksInputSekarang = dateSpan ? dateSpan.innerText : "";
        if (teksInputSekarang.includes(`${day} ${namaBulan[currentMonth]} ${currentYear}`)) {
            btn.className = "active";
        }

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            
            document.querySelectorAll(".days button").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            if (dateSpan) {
                dateSpan.innerText = `${day} ${namaBulan[currentMonth]} ${currentYear}`;
            }

            if (datePicker) datePicker.classList.remove("show");
        });

        daysContainer.appendChild(btn);
    }
}

renderCalendar();

if (prevMonthBtn) {
    prevMonthBtn.addEventListener("click", (e) => {
        e.preventDefault();
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
}

if (nextMonthBtn) {
    nextMonthBtn.addEventListener("click", (e) => {
        e.preventDefault();
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
}

if (dateInput) {
    dateInput.addEventListener("click", () => {
        if (datePicker) datePicker.classList.toggle("show");
    });
}

/* ==========================
   TIME PICKER INTERACTION
========================== */
const timeInput = document.getElementById("timeInput");
const timePicker = document.getElementById("timePicker");

if (timeInput) {
    timeInput.addEventListener("click", () => {
        if (timePicker) timePicker.classList.toggle("show");
    });
}

const hourButtons = document.querySelectorAll(".picker-column:first-child .picker-list button");
hourButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        hourButtons.forEach((item) => {
            item.classList.remove("active");
        });
        btn.classList.add("active");
        selectedHour = btn.innerText.trim();
    });
});

const minuteButtons = document.querySelectorAll(".picker-column:last-child .picker-list button");
minuteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        minuteButtons.forEach((item) => {
            item.classList.remove("active");
        });
        btn.classList.add("active");
        selectedMinute = btn.innerText.trim();
    });
});


/* ==========================
   PILIH WAKTU CONFIRM
========================== */
const pickerConfirmBtn = document.querySelector(".picker-confirm");
if (pickerConfirmBtn) {
    pickerConfirmBtn.addEventListener("click", () => {
        const timeSpan = document.querySelector("#timeInput span");
        if (timeSpan) {
            timeSpan.innerText = selectedHour + ":" + selectedMinute;
        }
        if (timePicker) timePicker.classList.remove("show");
    });
}


/* ==========================
   KLIK DI LUAR UNTUK MENUTUP
========================== */
document.addEventListener("click", (e) => {
    if (datePicker && dateInput && !datePicker.contains(e.target) && !dateInput.contains(e.target)) {
        datePicker.classList.remove("show");
    }
    if (timePicker && timeInput && !timePicker.contains(e.target) && !timeInput.contains(e.target)) {
        timePicker.classList.remove("show");
    }
});


/* ==========================
   SUBMIT FORM (PROSES UPDATE DATA)
========================== */
const editTaskForm = document.getElementById("editTaskForm");
if (editTaskForm) {
    editTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputs = document.querySelectorAll("input[type='text']");
        const nama = inputs[0] ? inputs[0].value : "";
        const matkul = inputs[1] ? inputs[1].value : "";
        const deskripsi = document.querySelector("textarea") ? document.querySelector("textarea").value : "";
        
        const dateSpan = document.querySelector("#dateInput span");
        const timeSpan = document.querySelector("#timeInput span");
        const tanggal = dateSpan ? dateSpan.innerText : "";
        const jam = timeSpan ? timeSpan.innerText : "";

        const activePriorityBtn = document.querySelector(".priority-btn.active");
        const prioritas = activePriorityBtn ? activePriorityBtn.innerText.trim() : "Rendah";

        if (nama.trim() === "") {
            alert("Nama tugas wajib diisi!");
            return;
        }

        tasks = tasks.map(task => {
            if (task.id == taskId) {
                const updatedTask = {
                    ...task,
                    name: nama,
                    subject: matkul,
                    description: deskripsi,
                    priority: prioritas,
                    deadline: tanggal + " • " + jam
                };
                localStorage.setItem('selectedTask', JSON.stringify(updatedTask));
                return updatedTask;
            }
            return task;
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));

        alert("Perubahan berhasil disimpan!");
        window.location.href = "tasklist.html"; 
    });
}


/* ==========================
   TOMBOL BACK KEMBALI
========================== */
const backButton = document.querySelector(".back-btn") || document.getElementById("backBtn") || document.querySelector(".header i.fa-arrow-left");

if (backButton) {
    backButton.addEventListener("click", () => {
        window.location.href = "tasklist.html"; 
    });
}