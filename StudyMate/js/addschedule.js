// ==============================
// ELEMENT
// ==============================

const form =
document.getElementById("scheduleForm");

const subject =
document.getElementById("subject");

const day =
document.getElementById("day");

const startTime =
document.getElementById("startTime");

const endTime =
document.getElementById("endTime");

const room =
document.getElementById("room");

const lecturer =
document.getElementById("lecturer");


// ==============================
// PREVIEW
// ==============================

const previewSubject =
document.getElementById("previewSubject");

const previewSchedule =
document.getElementById("previewSchedule");

const previewRoom =
document.getElementById("previewRoom");

const previewLecturer =
document.getElementById("previewLecturer");


// ==============================
// UPDATE PREVIEW
// ==============================

function updatePreview(){

    previewSubject.textContent =

        subject.value ||

        "Nama Mata Kuliah";


    previewSchedule.textContent =

        `${day.value} • ${startTime.value} - ${endTime.value}`;


    previewRoom.textContent =

        room.value ||

        "Ruangan";


    previewLecturer.textContent =

        lecturer.value ||

        "Nama Dosen";

}


// ==============================
// EVENT INPUT
// ==============================

subject.addEventListener(

    "input",

    updatePreview

);

day.addEventListener(

    "change",

    updatePreview

);

startTime.addEventListener(

    "input",

    updatePreview

);

endTime.addEventListener(

    "input",

    updatePreview

);

room.addEventListener(

    "input",

    updatePreview

);

lecturer.addEventListener(

    "input",

    updatePreview

);


// ==============================
// SIMPAN JADWAL
// ==============================

form.addEventListener(

    "submit",

    function(e){

        e.preventDefault();


        let schedules =

        JSON.parse(

            localStorage.getItem(

                "schedules"

            )

        ) || [];


    const schedule = {

    id: Date.now(),

    subject: subject.value,

    day: day.value,

    startTime: startTime.value,

    endTime: endTime.value,

    room: room.value,

    lecturer: lecturer.value

};


        schedules.push(

            schedule

        );


        localStorage.setItem(

            "schedules",

            JSON.stringify(

                schedules

            )

        );


        // hari terakhir dipilih

        localStorage.setItem(

            "selectedDay",

            day.value

        );


        alert(

            "Jadwal berhasil ditambahkan"

        );


        window.location.href =

        "schedule.html";

    }

);


// ==============================
// TOMBOL KEMBALI
// ==============================

document.querySelector(

    ".back-btn"

)?.addEventListener(

    "click",

    ()=>{

        history.back();

    }

);


// ==============================
// LOAD
// ==============================

updatePreview();