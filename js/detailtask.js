// ===================================
// DETAIL TUGAS STUDYMATE
// ===================================

// ELEMENT
const taskName = document.getElementById("taskName");
const taskSubject = document.getElementById("taskSubject");
const taskDescription = document.getElementById("taskDescription");
const taskPriority = document.getElementById("taskPriority");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");

// Perbaikan pemanggilan elemen badge berdasarkan ID agar sesuai HTML
const statusBadge = document.getElementById("taskStatus");
const priorityBadge = document.getElementById("taskPriorityBadge");

const backBtn = document.querySelector(".back-btn");
const completeBtn = document.getElementById("completeBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

const modal = document.getElementById("deleteModal");
const cancelBtn = document.querySelector(".cancel-btn");
const confirmDelete = document.querySelector(".confirm-delete");

// ===================================
// AMBIL DATA
// ===================================
let task = JSON.parse(localStorage.getItem("selectedTask"));

if (!task) {
    window.location.href = "tasklist.html";
}

// ===================================
// TAMPILKAN DATA
// ===================================
taskName.textContent = task.name;
taskSubject.textContent = task.subject;
taskDescription.textContent = task.description || "Tidak ada deskripsi.";
taskPriority.textContent = task.priority;
priorityBadge.textContent = task.priority;
statusBadge.textContent = task.status || "Belum Selesai";

// ===================================
// PRIORITAS (Warna Badge)
// ===================================
priorityBadge.className = "priority-badge"; // Sesuai dengan class di HTML
taskPriority.className = "priority"; // Sesuai dengan class di HTML

if (task.priority == "Tinggi") {
    priorityBadge.classList.add("high");
    taskPriority.classList.add("priority-high");
} else if (task.priority == "Sedang") {
    priorityBadge.classList.add("medium");
    taskPriority.classList.add("priority-medium");
} else {
    priorityBadge.classList.add("low");
    taskPriority.classList.add("priority-low");
}

// ===================================
// STATUS & PERUBAHAN TOMBOL DINAMIS
// ===================================
if (task.status == "Selesai") {
    statusBadge.textContent = "Selesai";
    statusBadge.style.background = "#22C55E";
    statusBadge.style.color = "#fff";
    
    // Mengubah tampilan tombol utama jika tugas sudah selesai
    completeBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Tandai Sedang Dikerjakan';
    completeBtn.style.background = "#F59E0B"; // Warna kuning/oranye tanda "Sedang"
    completeBtn.style.boxShadow = "0 10px 25px rgba(245, 158, 11, 0.25)";
} else {
    statusBadge.textContent = "Belum Selesai";
    statusBadge.style.background = "#EF4444"; // Warna merah default jika belum selesai
    statusBadge.style.color = "#fff";
    
    // Tampilan tombol default jika tugas belum selesai
    completeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Tandai Selesai';
    completeBtn.style.background = "#2563EB"; // Mengikuti style CSS awal
}

// ===================================
// DEADLINE
// ===================================
if (task.deadline) {
    let split = task.deadline.split("•");
    taskDate.textContent = split[0].trim();
    taskTime.textContent = split.length > 1 ? split[1].trim() : "-";
} else {
    taskDate.textContent = "-";
    taskTime.textContent = "-";
}

// ===================================
// BACK
// ===================================
backBtn.onclick = function () {
    history.back();
};

// ===================================
// EDIT
// ===================================
editBtn.onclick = function () {
    localStorage.setItem("editTask", JSON.stringify(task));
    window.location.href = "edittask.html";
};

// ===================================
// LOGIKA TOMBOL SINKRONISASI STATUS (TOGGLE)
// ===================================
completeBtn.onclick = function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Tentukan status baru kebalikan dari status saat ini
    let newStatus = (task.status == "Selesai") ? "Belum Selesai" : "Selesai";

    // 1. Update status pada master data daftar tugas
    tasks.forEach(item => {
        if (item.id == task.id) {
            item.status = newStatus;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // 2. Update status pada data tugas yang sedang dibuka saat ini
    task.status = newStatus;
    localStorage.setItem("selectedTask", JSON.stringify(task));

    // 3. Muat ulang halaman untuk memperbarui visual secara instan
    location.reload();
};

// ===================================
// DELETE (MODAL)
// ===================================
deleteBtn.onclick = function () {
    modal.classList.add("show");
};

cancelBtn.onclick = function () {
    modal.classList.remove("show");
};

window.onclick = function (e) {
    if (e.target == modal) {
        modal.classList.remove("show");
    }
};

confirmDelete.onclick = function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(item => item.id != task.id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.removeItem("selectedTask");
    window.location.href = "tasklist.html";
};