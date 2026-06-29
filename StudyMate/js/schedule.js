// =========================
// STUDYMATE SCHEDULE
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const fab = document.querySelector(".fab");

    const days = document.querySelectorAll(".day");

    const count = document.getElementById(
        "scheduleCount"
    );

    const container = document.getElementById(
        "scheduleContainer"
    );


    // =====================
    // DATA
    // =====================

    let schedules = JSON.parse(

        localStorage.getItem(

            "schedules"

        )

    ) || [];


    let currentDay = "Senin";


    // =====================
    // FAB
    // =====================

    if (fab) {

        fab.addEventListener(

            "click",

            () => {

                window.location.href =

                    "addschedule.html";

            }

        );

    }


    // =====================
    // RENDER
    // =====================

    function render(day = "Senin") {

        currentDay = day;

        container.innerHTML = "";

        const filtered = schedules.filter(

            item => item.day === day

        );


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

                                <h3>

                                    ${item.subject}

                                </h3>

                                <small>

                                    ${item.day}

                                </small>

                            </div>

                        </div>


                        <div class="action">

                            <button

                                class="edit-btn"

                                onclick="editSchedule(${item.id})"

                            >

                                <i class="fa-solid fa-pen"></i>

                            </button>


                            <button

                                class="delete-btn"

                                onclick="deleteSchedule(${item.id})"

                            >

                                <i class="fa-solid fa-trash"></i>

                            </button>

                        </div>

                    </div>



                    <div class="detail">

                        <div>

                            <div class="detail-icon">

                                <i class="fa-regular fa-clock"></i>

                            </div>

                            <span>

                                ${item.startTime}

                                -

                                ${item.endTime}

                            </span>

                        </div>



                        <div>

                            <div class="detail-icon">

                                <i class="fa-solid fa-location-dot"></i>

                            </div>

                            <span>

                                ${item.room}

                            </span>

                        </div>



                        <div>

                            <div class="detail-icon">

                                <i class="fa-solid fa-user"></i>

                            </div>

                            <span>

                                ${item.lecturer}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            `;

        });

    }


    // =====================
    // FILTER HARI
    // =====================

    days.forEach(button => {

        button.addEventListener(

            "click",

            () => {

                days.forEach(btn =>

                    btn.classList.remove(

                        "active"

                    )

                );


                button.classList.add(

                    "active"

                );


                render(

                    button.textContent.trim()

                );

            }

        );

    });


    // =====================
    // EDIT
    // =====================

    window.editSchedule = function(id){

        localStorage.setItem(

            "editScheduleId",

            id

        );


        window.location.href =

            "editschedule.html";

    }


    // =====================
    // DELETE
    // =====================

    window.deleteSchedule = function(id){

        const confirmDelete = confirm(

            "Hapus jadwal ini?"

        );

        if(!confirmDelete) return;


        schedules = schedules.filter(

            item => item.id !== id

        );


        localStorage.setItem(

            "schedules",

            JSON.stringify(

                schedules

            )

        );


        render(currentDay);

    }


    // =====================
    // LOAD
    // =====================

    render("Senin");


});