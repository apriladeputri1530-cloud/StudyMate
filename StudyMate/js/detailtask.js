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

const statusBadge = document.querySelector(".status-badge");
const priorityBadge = document.querySelector(".priority-badge");

const backBtn = document.querySelector(".back-btn");
const completeBtn = document.querySelector(".complete-btn");
const editBtn = document.querySelector(".edit-btn");
const deleteBtn = document.querySelector(".delete-btn");

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

taskDescription.textContent =
    task.description || "Tidak ada deskripsi.";

taskPriority.textContent = task.priority;

priorityBadge.textContent = task.priority;

statusBadge.textContent = task.status;


// ===================================
// PRIORITAS
// ===================================

priorityBadge.className = "badge priority";

taskPriority.className = "priority-box";

if (task.priority == "Tinggi") {

    priorityBadge.classList.add("high");

    taskPriority.classList.add("priority-high");

}

else if (task.priority == "Sedang") {

    priorityBadge.classList.add("medium");

    taskPriority.classList.add("priority-medium");

}

else {

    priorityBadge.classList.add("low");

    taskPriority.classList.add("priority-low");

}


// ===================================
// STATUS
// ===================================

if (task.status == "Selesai") {

    statusBadge.textContent = "Selesai";

    statusBadge.style.background = "#22C55E";

}


// ===================================
// DEADLINE
// ===================================

if (task.deadline) {

    let split = task.deadline.split("•");

    taskDate.textContent = split[0].trim();

    taskTime.textContent =
        split.length > 1
            ? split[1].trim()
            : "-";

}

else {

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

    localStorage.setItem(

        "editTask",

        JSON.stringify(task)

    );

    window.location.href = "edittask.html";

};


// ===================================
// TANDAI SELESAI
// ===================================

completeBtn.onclick = function () {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(item => {

        if (item.id == task.id) {

            item.status = "Selesai";

        }

    });

    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

    );

    task.status = "Selesai";

    localStorage.setItem(

        "selectedTask",

        JSON.stringify(task)

    );

    location.reload();

};


// ===================================
// DELETE
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

    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

    );

    localStorage.removeItem("selectedTask");

    window.location.href = "tasklist.html";

};