// ===============================
// STUDYMATE TASK LIST
// ===============================

// ===============================
// LOAD DATA & FILTER PER USER
// ===============================
// 1. Ambil info user yang sedang login saat ini
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userEmail = currentUser ? currentUser.email : "guest";

// 2. Ambil semua tugas global yang ada di browser
let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 3. FILTER: Hanya ambil tugas yang 'userOwner'-nya cocok dengan email user aktif!
let tasks = allTasks.filter(task => task.userOwner === userEmail);

// ===============================
// ELEMENT
// ===============================
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

const taskContainer = document.getElementById("taskContainer");
const taskCount = document.querySelector(".task-count");

const showAllButton = document.querySelector(".show-all");

const modal = document.getElementById("deleteModal");
const cancelBtn = document.querySelector(".cancel-btn");
const confirmBtn = document.querySelector(".confirm-btn");

const addTaskBtn = document.getElementById("addTaskBtn");

// ===============================
// VARIABLE
// ===============================
let filter = "Semua";
let search = "";
let selectedDelete = null;

const MAX_VISIBLE = 3;
let showAll = false;

// ===============================
// BUTTON TAMBAH TUGAS
// ===============================
if (addTaskBtn) {
    addTaskBtn.addEventListener("click", function () {
        window.location.href = "addtask.html";
    });
}

// ===============================
// FUNGSI CEK DEADLINE
// ===============================
function isDeadlinePassed(deadlineString) {
    if (!deadlineString || deadlineString.trim() === "" || deadlineString === "-") return false;

    try {
        const parts = deadlineString.split(" • ");
        const datePart = parts[0];
        const timePart = parts[1] || "00:00";

        const namaBulan = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        
        const datePieces = datePart.trim().split(" ");
        if (datePieces.length === 3) {
            const day = parseInt(datePieces[0]);
            const monthStr = datePieces[1];
            const year = parseInt(datePieces[2]);
            const monthIndex = namaBulan.indexOf(monthStr);

            const timePieces = timePart.trim().split(":");
            const hour = parseInt(timePieces[0]) || 0;
            const minute = parseInt(timePieces[1]) || 0;

            if (monthIndex !== -1) {
                const deadlineDate = new Date(year, monthIndex, day, hour, minute);
                const sekarang = new Date();
                return sekarang > deadlineDate;
            }
        }
    } catch (e) {
        console.error("Gagal memproses format tanggal: ", e);
    }
    return false;
}

// ===============================
// RENDER TASK
// ===============================
function renderTask() {
    taskContainer.innerHTML = "";

    let filtered = tasks.filter(task => {
        let cocokNama =
            task.name.toLowerCase().includes(search.toLowerCase()) ||
            task.subject.toLowerCase().includes(search.toLowerCase());

        let cocokFilter = true;

        if (filter === "Belum Selesai") {
            cocokFilter = task.status === "Belum Selesai";
        }

        if (filter === "Selesai") {
            cocokFilter = task.status === "Selesai";
        }

        return cocokNama && cocokFilter;
    });

    if (taskCount) {
        taskCount.innerHTML = filtered.length + " tugas ditemukan";
    }

    let tampil = showAll
        ? filtered
        : filtered.slice(0, MAX_VISIBLE);

    tampil.forEach(task => {
        let priorityClass = "low";

        if (task.priority === "Tinggi") {
            priorityClass = "high";
        }
        if (task.priority === "Sedang") {
            priorityClass = "medium";
        }

        let statusIcon =
            task.status === "Selesai"
                ? `<i class="fa-solid fa-circle-check done"></i>`
                : `<i class="fa-regular fa-circle status"></i>`;

        let badge = "";
        let deadlineColorStyle = "";
        const apakahTerlambat = isDeadlinePassed(task.deadline);

        if (task.status === "Selesai") {
            badge = `<span class="badge success">✓</span>`;
        } else if (apakahTerlambat) {
            badge = `<span class="badge" style="background-color: #d9534f; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">Terlambat</span>`;
            deadlineColorStyle = `style="color: #d9534f; font-weight: 600;"`;
        } else {
            badge = `<span class="badge active-status">Aktif</span>`;
        }

        let title =
            task.status === "Selesai"
                ? `<h3 class="completed">${task.name}</h3>`
                : `<h3>${task.name}</h3>`;

        const card = document.createElement("div");
        card.className = "task-card";

        card.innerHTML = `
        <div class="task-top">
            <div class="task-left">
                ${statusIcon}
                <div class="task-info">
                    ${title}
                    <p>${task.subject}</p>
                    <div class="task-detail">
                        <span class="priority ${priorityClass}">
                            ${task.priority}
                        </span>
                        <span class="deadline" ${deadlineColorStyle}>
                            ${task.deadline}
                        </span>
                    </div>
                </div>
            </div>
            ${badge}
        </div>
        <div class="task-action">
            <button class="edit-btn">
                <i class="fa-solid fa-pen"></i>
                Edit
            </button>
            <button class="delete-btn">
                <i class="fa-solid fa-trash"></i>
                Hapus
            </button>
        </div>
        `;

        taskContainer.appendChild(card);

        // ==========================
        // DETAIL
        // ==========================
        card.querySelector(".task-top").onclick = function () {
            localStorage.setItem("selectedTask", JSON.stringify(task));
            window.location.href = "detailtask.html";
        };

        // ==========================
        // EDIT
        // ==========================
        card.querySelector(".edit-btn").onclick = function () {
            localStorage.setItem("editTask", JSON.stringify(task));
            location.href = `edittask.html?id=${task.id}`;
        };

        // ==========================
        // DELETE
        // ==========================
        card.querySelector(".delete-btn").onclick = function () {
            selectedDelete = task.id;
            if (modal) modal.style.display = "flex";
        };
    });

    if (showAllButton) {
        if (filtered.length <= MAX_VISIBLE) {
            showAllButton.style.display = "none";
        } else {
            showAllButton.style.display = "block";
            showAllButton.innerHTML = `
                <i class="fa-solid fa-chevron-down"></i>
                Lihat Semua Tugas (${filtered.length - MAX_VISIBLE} lainnya)
            `;
        }
    }
}

// ===============================
// SEARCH
// ===============================
if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        search = this.value;
        showAll = false;
        renderTask();
    });
}

// ===============================
// FILTER
// ===============================
filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");
        filter = this.innerText;
        showAll = false;
        renderTask();
    });
});

// ===============================
// SHOW ALL BUTTON CLICK
// ===============================
if (showAllButton) {
    showAllButton.addEventListener("click", function () {
        showAll = true;
        renderTask();
        this.style.display = "none";
    });
}

// ===============================
// TUTUP MODAL
// ===============================
if (cancelBtn) {
    cancelBtn.addEventListener("click", function () {
        if (modal) modal.style.display = "none";
    });
}

window.addEventListener("click", function (e) {
    if (e.target === modal) {
        if (modal) modal.style.display = "none";
    }
});

// ===============================
// HAPUS TUGAS ACTION CONFIRM
// ===============================
if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
        // Hapus dari data master global
        allTasks = allTasks.filter(task => task.id !== selectedDelete);
        localStorage.setItem("tasks", JSON.stringify(allTasks));

        // Update data array lokal yang tampil saat ini
        tasks = allTasks.filter(task => task.userOwner === userEmail);

        if (modal) modal.style.display = "none";
        renderTask();
        alert("Tugas berhasil dihapus");
    });
}

// ===============================
// CEK JIKA BELUM ADA DATA
// ===============================
if (allTasks.length === 0) {
    allTasks = [];
    localStorage.setItem("tasks", JSON.stringify(allTasks));
}

// ===============================
// REFRESH DATA DARI LOCAL STORAGE
// ===============================
window.addEventListener("focus", function () {
    allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = allTasks.filter(task => task.userOwner === userEmail);
    renderTask();
});

// ===============================
// LOAD PERTAMA
// ===============================
renderTask();