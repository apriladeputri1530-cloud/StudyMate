// =========================
// DASHBOARD STUDYMATE
// =========================

document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // USER DATA (SINKRONISASI PROFIL AKTIF)
    // =========================
    // Mengambil data user yang sedang login aktif untuk filter konten dan nama profil
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userEmail = currentUser ? currentUser.email : "guest";

    // =========================
    // GREETING
    // =========================
    let greeting = "Halo";

    // Menampilkan nama dinamis berdasarkan data akun terupdate
    const headerTitle = document.querySelector(".header h1");
    if (headerTitle) {
        headerTitle.innerHTML = `
            ${greeting},
            <span id="username">
                ${currentUser?.name || "Mahasiswa"}
            </span>
            👋
        `;
    }

    // =========================
    // AMBIL DATA KONTEN & FILTER PER USER
    // =========================
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const allEvents = JSON.parse(localStorage.getItem("events")) || [];
    const allSchedules = JSON.parse(localStorage.getItem("schedules")) || [];

    // FILTER: Saring agar hanya data milik user aktif saat ini yang diproses
    const tasks = allTasks.filter(task => task.userOwner === userEmail);
    const events = allEvents.filter(event => event.userOwner === userEmail);
    const schedules = allSchedules.filter(schedule => schedule.userOwner === userEmail);

    // =========================
    // STATISTIK
    // =========================
    const totalTask = document.getElementById("totalTask");
    const todayEvent = document.getElementById("todayEvent");

    if (totalTask) {
        totalTask.textContent = tasks.length;
    }

    if (todayEvent) {
        todayEvent.textContent = events.length;
    }

    // =========================
    // JADWAL HARI INI
    // =========================
    const scheduleContainer = document.getElementById("scheduleContainer");

    if (scheduleContainer) {
        scheduleContainer.innerHTML = "";
        const data = schedules.slice(0, 3);

        if (data.length === 0) {
            scheduleContainer.innerHTML = "<p>Belum ada jadwal</p>";
        } else {
            data.forEach(item => {
                scheduleContainer.innerHTML += `
                    <div class="card">
                        <div class="card-icon">
                            <i class="fa-solid fa-book-open"></i>
                        </div>
                        <div class="card-content">
                            <h3>
                                ${item.course || item.subject}
                            </h3>
                            <p>
                                ${item.start || item.startTime}
                                -
                                ${item.end || item.endTime}
                                •
                                ${item.room}
                            </p>
                        </div>
                    </div>
                `;
            });
        }
    }

    // =========================
    // DEADLINE TERDEKAT
    // =========================
    const taskContainer = document.getElementById("taskContainer");

    if (taskContainer) {
        taskContainer.innerHTML = "";

        const nearestTask = [...tasks]
            .sort((a, b) => {
                const dateA = new Date(a.deadline.replace(" • ", "T"));
                const dateB = new Date(b.deadline.replace(" • ", "T"));
                return dateA - dateB;
            })
            .slice(0, 3);

        if (nearestTask.length === 0) {
            taskContainer.innerHTML = "<p>Belum ada tugas</p>";
        } else {
            nearestTask.forEach(task => {
                taskContainer.innerHTML += `
                    <div class="task-card">
                        <div class="task-left">
                            <h3>
                                ${task.name}
                            </h3>
                            <p>
                                ${task.subject}
                            </p>
                        </div>
                        <div class="task-right">
                            <span class="badge">
                                ${task.priority}
                            </span>
                            <small>
                                ${task.deadline}
                            </small>
                        </div>
                    </div>
                `;
            });
        }
    }

    // =========================
    // EVENT TERDEKAT + FITUR EDIT DARI BERANDA
    // =========================
    const eventContainer = document.getElementById("eventContainer");

    if (eventContainer) {
        eventContainer.innerHTML = "";

        const nearestEvent = [...events]
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3);

        if (nearestEvent.length === 0) {
            eventContainer.innerHTML = "<p>Belum ada event</p>";
        } else {
            nearestEvent.forEach(event => {
                eventContainer.innerHTML += `
                    <div class="event-card" style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="event-icon">
                                <i class="fa-solid fa-calendar"></i>
                            </div>
                            <div class="event-content">
                                <h3>
                                    ${event.name}
                                </h3>
                                <p>
                                    ${event.date}
                                    •
                                    ${event.time}
                                </p>
                            </div>
                        </div>
                        <button class="edit-event-btn" data-id="${event.id}" style="background: none; border: none; color: #4f46e5; cursor: pointer; padding: 8px;">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                `;
            });

            // Pasang event listener untuk tombol edit di dashboard
            document.querySelectorAll(".edit-event-btn").forEach(btn => {
                btn.addEventListener("click", function(e) {
                    e.stopPropagation(); // Mencegah bentrok klik card
                    const idToEdit = this.getAttribute("data-id");
                    localStorage.setItem("editEventId", idToEdit);
                    window.location.href = "addevent.html";
                });
            });
        }
    }

    // =========================
    // LIHAT SEMUA (NAVIGASI TOMBOL)
    // =========================
    document.getElementById("scheduleBtn")?.addEventListener("click", () => {
        window.location.href = "schedule.html";
    });

    document.getElementById("taskBtn")?.addEventListener("click", () => {
        window.location.href = "tasklist.html";
    });

    document.getElementById("eventBtn")?.addEventListener("click", () => {
        window.location.href = "calendar.html";
    });

    // =========================
    // QUICK ACCESS
    // =========================
    const quickButtons = document.querySelectorAll(".quick-btn");

    if (quickButtons[0]) {
        quickButtons[0].onclick = () => {
            window.location.href = "addtask.html";
        };
    }

    if (quickButtons[1]) {
        quickButtons[1].onclick = () => {
            window.location.href = "addevent.html";
        };
    }
});