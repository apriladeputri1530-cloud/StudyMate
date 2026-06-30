// =========================
// STUDYMATE SCHEDULE
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const fab = document.querySelector(".fab");
    const days = document.querySelectorAll(".day");
    const count = document.getElementById("scheduleCount");
    const container = document.getElementById("scheduleContainer");
    const backBtn = document.getElementById("backToDashboard");

    // =====================
    // USER DATA (SINKRONISASI)
    // =====================
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userEmail = currentUser ? currentUser.email : "guest";

    // =====================
    // DATA GLOBAL & LOKAL USER
    // =====================
    let allSchedules = JSON.parse(localStorage.getItem("schedules")) || [];
    // FILTER: Hanya ambil jadwal yang milik user aktif saat ini
    let schedules = allSchedules.filter(item => item.userOwner === userEmail);

    let currentDay = "Senin";

    // =====================
    // NAVIGASI KEMBALI & FAB
    // =====================
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "dashboard.html"; // Sesuaikan dengan nama file beranda utamamu
        });
    }

    if (fab) {
        fab.addEventListener("click", () => {
            window.location.href = "addschedule.html";
        });
    }

    // =====================
    // RENDER JADWAL KULIAH
    // =====================
    function render(day = "Senin") {

        currentDay = day;
        container.innerHTML = "";

        // Saring jadwal milik user berdasarkan hari yang aktif dipilih
        const filtered = schedules.filter(item => item.day === day);

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: #a0aec0;">
                    <i class="fa-solid fa-calendar-xmark" style="font-size: 48px; margin-bottom: 10px;"></i>
                    <p>Belum ada jadwal kuliah di hari ${day}</p>
                </div>
            `;
            return;
        }

        filtered.forEach(item => {

            container.innerHTML += `
            <div class="schedule-card">
                <div class="card-top"></div>
                <div class="card-content">
                    <div class="card-header">
                        <div class="subject">
                            <div class="icon-box">
                                <i class="fa-solid fa-book-open"></i>
                            </div>
                            <div>
                                <h3>${item.subject || item.course}</h3>
                                <small>${item.day}</small>
                            </div>
                        </div>

                        <div class="action">
                            <button class="edit-btn" onclick="editSchedule(${item.id})">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="delete-btn" onclick="deleteSchedule(${item.id})">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>

                    <div class="detail">
                        <div>
                            <div class="detail-icon">
                                <i class="fa-regular fa-clock"></i>
                            </div>
                            <span>${item.startTime || item.start} - ${item.endTime || item.end}</span>
                        </div>

                        <div>
                            <div class="detail-icon">
                                <i class="fa-solid fa-location-dot"></i>
                            </div>
                            <span>${item.room || "Online / Tanpa Ruangan"}</span>
                        </div>

                        <div>
                            <div class="detail-icon">
                                <i class="fa-solid fa-user"></i>
                            </div>
                            <span>${item.lecturer || "Dosen Belum Diatur"}</span>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });
    }

    // =====================
    // FILTER BERDASARKAN HARI KLIK
    // =====================
    days.forEach(button => {

        button.addEventListener("click", () => {
            days.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            render(button.textContent.trim());
        });
    });

    // =====================
    // EDIT JADWAL (GLOBAL ACTION)
    // =====================
    window.editSchedule = function(id){
        localStorage.setItem("editScheduleId", id);
        window.location.href = "addschedule.html"; // diarahkan ke form input jadwal
    };

    // =====================
    // DELETE JADWAL (GLOBAL ACTION)
    // =====================
    window.deleteSchedule = function(id){

        const confirmDelete = confirm("Hapus jadwal ini?");
        if(!confirmDelete) return;

        // 1. Ambil data database global paling baru
        let currentGlobalSchedules = JSON.parse(localStorage.getItem("schedules")) || [];

        // 2. Buang item jadwal yang dipilih dari database global
        currentGlobalSchedules = currentGlobalSchedules.filter(item => item.id !== id);

        // 3. Masukkan kembali database global yang bersih ke LocalStorage
        localStorage.setItem("schedules", JSON.stringify(currentGlobalSchedules));

        // 4. Update data array lokal milik user aktif agar tampilan sinkron saat itu juga
        schedules = currentGlobalSchedules.filter(item => item.userOwner === userEmail);

        render(currentDay);
    };

    // =====================
    // RENDERING AWAL JALAN
    // =====================
    render("Senin");
});