// =========================
// DASHBOARD STUDYMATE
// =========================

document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // USER LOGIN
    // =========================

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    // =========================
    // GREETING
    // =========================

    let greeting = "Halo";

    document.querySelector(".header h1").innerHTML = `

        ${greeting},

        <span id="username">

            ${currentUser?.name || "Pengguna"}

        </span>

        👋

    `;


    // =========================
    // AMBIL DATA
    // =========================

    const tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    const events =
        JSON.parse(localStorage.getItem("events")) || [];

    const schedules =
        JSON.parse(localStorage.getItem("schedules")) || [];


    // =========================
    // STATISTIK
    // =========================

    const totalTask =
        document.getElementById("totalTask");

    const todayEvent =
        document.getElementById("todayEvent");

    if (totalTask) {

        totalTask.textContent =
            tasks.length;

    }

    if (todayEvent) {

        todayEvent.textContent =
            events.length;

    }


    // =========================
    // JADWAL HARI INI
    // =========================

    const scheduleContainer =
        document.getElementById("scheduleContainer");

    if (scheduleContainer) {

        scheduleContainer.innerHTML = "";

        const data =
            schedules.slice(0, 3);

        if (data.length === 0) {

            scheduleContainer.innerHTML =
                "<p>Belum ada jadwal</p>";

        }

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


    // =========================
    // DEADLINE TERDEKAT
    // =========================

    const taskContainer =
        document.getElementById("taskContainer");

    if (taskContainer) {

        taskContainer.innerHTML = "";

        const nearestTask =

            [...tasks]

            .sort((a, b) => {

                const dateA =
                    new Date(

                        a.deadline.replace(

                            " • ",

                            "T"

                        )

                    );

                const dateB =
                    new Date(

                        b.deadline.replace(

                            " • ",

                            "T"

                        )

                    );

                return dateA - dateB;

            })

            .slice(0, 3);


        if (nearestTask.length === 0) {

            taskContainer.innerHTML =

                "<p>Belum ada tugas</p>";

        }


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


    // =========================
    // EVENT TERDEKAT
    // =========================

    const eventContainer =
        document.getElementById("eventContainer");

    if (eventContainer) {

        eventContainer.innerHTML = "";

        const nearestEvent =

            [...events]

            .sort((a, b) =>

                new Date(a.date)

                -

                new Date(b.date)

            )

            .slice(0, 3);


        if (nearestEvent.length === 0) {

            eventContainer.innerHTML =

                "<p>Belum ada event</p>";

        }


        nearestEvent.forEach(event => {

            eventContainer.innerHTML += `

                <div class="event-card">

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

            `;

        });

    }


    // =========================
    // LIHAT SEMUA
    // =========================

    document.getElementById("scheduleBtn")
    ?.addEventListener("click", () => {

        window.location.href =
            "schedule.html";

    });


    document.getElementById("taskBtn")
    ?.addEventListener("click", () => {

        window.location.href =
            "tasklist.html";

    });


    document.getElementById("eventBtn")
    ?.addEventListener("click", () => {

        window.location.href =
            "calendar.html";

    });


    // =========================
    // QUICK ACCESS
    // =========================

    const quickButtons =

        document.querySelectorAll(

            ".quick-btn"

        );

    if (quickButtons[0]) {

        quickButtons[0].onclick = () => {

            window.location.href =

                "addtask.html";

        };

    }

    if (quickButtons[1]) {

        quickButtons[1].onclick = () => {

            window.location.href =

                "calendar.html";

        };

    }

});