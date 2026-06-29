// ===============================
// STUDYMATE TASK LIST
// ===============================

// ===============================
// LOAD DATA
// ===============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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

addTaskBtn.addEventListener("click", function () {

    window.location.href = "addtask.html";

});

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

    taskCount.innerHTML = filtered.length + " tugas ditemukan";

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

        let badge =
            task.status === "Selesai"
                ? `<span class="badge success">✓</span>`
                : `<span class="badge active-status">Aktif</span>`;

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

                        <span class="deadline">
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

        // Simpan task yang dipilih
        localStorage.setItem(
            "selectedTask",
            JSON.stringify(task)
        );

        // Pindah ke halaman detail
        window.location.href = "detailtask.html";

    };

        // ==========================
        // EDIT
        // ==========================

        card.querySelector(".edit-btn").onclick = function () {

            localStorage.setItem("editTask", JSON.stringify(task));

            location.href = "edittask.html";

        };

        // ==========================
        // DELETE
        // ==========================

        card.querySelector(".delete-btn").onclick = function () {

            selectedDelete = task.id;

            modal.style.display = "flex";

        };

    });

    if (filtered.length <= MAX_VISIBLE) {

        showAllButton.style.display = "none";

    }

    else {

        showAllButton.style.display = "block";

        showAllButton.innerHTML =

            `<i class="fa-solid fa-chevron-down"></i>
            Lihat Semua Tugas (${filtered.length - MAX_VISIBLE} lainnya)`;

    }

}

// ===============================
// SEARCH
// ===============================

searchInput.addEventListener("keyup", function () {

    search = this.value;

    showAll = false;

    renderTask();

});

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
// SHOW ALL
// ===============================

showAllButton.addEventListener("click", function () {

    showAll = true;

    renderTask();

    this.style.display = "none";

});

// ===============================
// TUTUP MODAL
// ===============================

cancelBtn.addEventListener("click", function () {

    modal.style.display = "none";

});

window.addEventListener("click", function (e) {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});

// ===============================
// HAPUS TUGAS
// ===============================

confirmBtn.addEventListener("click", function () {

    tasks = tasks.filter(task => task.id !== selectedDelete);

    // Simpan kembali ke Local Storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    modal.style.display = "none";

    renderTask();

    alert("Tugas berhasil dihapus");

});

// ===============================
// CEK JIKA BELUM ADA DATA
// ===============================

if (tasks.length === 0) {

    tasks = [];

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// ===============================
// REFRESH DATA DARI LOCAL STORAGE
// ===============================

window.addEventListener("focus", function () {

    tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    renderTask();

});

// ===============================
// LOAD PERTAMA
// ===============================

renderTask();