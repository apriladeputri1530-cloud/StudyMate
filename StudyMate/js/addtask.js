// ===============================
// ELEMENT
// ===============================

const taskName = document.getElementById("taskName");
const subject = document.getElementById("subject");
const description = document.getElementById("description");
const deadlineDate = document.getElementById("deadlineDate");
const deadlineTime = document.getElementById("deadlineTime");

// Preview
const previewName = document.getElementById("previewName");
const previewSubject = document.getElementById("previewSubject");
const previewPriority = document.getElementById("previewPriority");
const previewDeadline = document.getElementById("previewDeadline");
const previewDescription = document.getElementById("previewDescription");

// ===============================
// UPDATE PREVIEW
// ===============================

function updatePreview() {

    previewName.textContent =
        taskName.value || "Nama Tugas";

    previewSubject.textContent =
        subject.value || "Mata Kuliah";

    previewDescription.textContent =
        description.value || "Deskripsi";

    if (deadlineDate.value || deadlineTime.value) {

        previewDeadline.textContent =
            deadlineDate.value + " " + deadlineTime.value;

    } else {

        previewDeadline.textContent =
            "Deadline";

    }

}

// ===============================
// EVENT INPUT
// ===============================

taskName.addEventListener("input", updatePreview);
subject.addEventListener("input", updatePreview);
description.addEventListener("input", updatePreview);
deadlineDate.addEventListener("change", updatePreview);
deadlineTime.addEventListener("change", updatePreview);

// ===============================
// PRIORITAS
// ===============================

let priority = "Sedang";

const priorityButtons =
    document.querySelectorAll(".priority-btn");

priorityButtons.forEach(button => {

    button.addEventListener("click", function () {

        priorityButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        this.classList.add("active");

        priority = this.innerText;

        previewPriority.textContent =
            "Prioritas : " + priority;

    });

});

previewPriority.textContent =
    "Prioritas : Sedang";

updatePreview();

// ===============================
// SIMPAN TUGAS
// ===============================

const form =
    document.getElementById("taskForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = {

        id: Date.now(),

        name: taskName.value,

        subject: subject.value,

        description: description.value,

        priority: priority,

        deadline: deadlineDate.value + " • " + deadlineTime.value,

        status: "Belum Selesai"

    };

    tasks.push(newTask);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    alert("Tugas berhasil ditambahkan!");

    window.location.href = "tasklist.html";

});

// ===============================
// BACK BUTTON
// ===============================

const backButton =
    document.querySelector(".back-btn");

if (backButton) {

    backButton.addEventListener("click", function () {

        window.location.href = "tasklist.html";

    });

}