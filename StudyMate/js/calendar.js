// ======================================
// STUDYMATE CALENDAR
// ======================================

// ==============================
// ELEMENT
// ==============================

const calendarGrid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");

const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

const eventList = document.getElementById("eventList");
const emptyState = document.getElementById("emptyState");

const floatingBtn = document.querySelector(".floating-btn");
const addEventBtn = document.querySelector(".add-event-text");
const emptyBtn = document.querySelector(".empty-btn");

// ==============================
// DATA
// ==============================

let events = JSON.parse(localStorage.getItem("events")) || [];

let currentDate = new Date();
let selectedDate = new Date();

// ==============================
// NAMA BULAN
// ==============================

const months = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"
];

// ==============================
// FORMAT DATE
// ==============================

function formatDate(date){

    const y = date.getFullYear();
    const m = String(date.getMonth()+1).padStart(2,"0");
    const d = String(date.getDate()).padStart(2,"0");

    return `${y}-${m}-${d}`;
}

// ==============================
// RENDER CALENDAR
// ==============================

function renderCalendar(){

    calendarGrid.innerHTML="";

    const year=currentDate.getFullYear();
    const month=currentDate.getMonth();

    monthYear.textContent=`${months[month]} ${year}`;

    const firstDay=new Date(year,month,1).getDay();
    const totalDays=new Date(year,month+1,0).getDate();

    // kosong

    for(let i=0;i<firstDay;i++){

        const div=document.createElement("div");
        div.classList.add("empty-day");

        calendarGrid.appendChild(div);

    }

    // tanggal

    for(let day=1;day<=totalDays;day++){

        const div=document.createElement("div");

        div.classList.add("day");

        div.textContent=day;

        const fullDate=`${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

        // hari ini

        if(fullDate===formatDate(new Date())){

            div.classList.add("today");

        }

        // selected

        if(fullDate===formatDate(selectedDate)){

            div.classList.add("selected");

        }

        // ada event

        if(events.some(e=>e.date===fullDate)){

            div.classList.add("has-event");

        }

        div.onclick=function(){

            selectedDate=new Date(fullDate);

            renderCalendar();

            renderEvent();

        };

        calendarGrid.appendChild(div);

    }

}

// ==============================
// RENDER EVENT
// ==============================

function renderEvent(){

    eventList.innerHTML="";

    const date = formatDate(selectedDate);

    const todayEvents = events.filter(
        e => e.date === date
    );

    console.log("Tanggal dipilih:", date);
    console.table(todayEvents);

    if(todayEvents.length === 0){

        emptyState.style.display="block";
        eventList.innerHTML="";

        return;
    }

    emptyState.style.display="none";

    todayEvents.forEach(event=>{

        const type = event.type.toLowerCase();

        let color="event";

        if(type==="tugas") color="tugas";

        if(type==="ujian") color="ujian";

        eventList.innerHTML += `

        <div class="event-card">

            <div class="event-left">

                <div class="event-info">

                    <h3>${event.name}</h3>

                    <p>${event.date} • ${event.time}</p>

                    <small>${event.location}</small>

                </div>

            </div>

            <div class="event-action">

    <span class="badge ${color}">
        ${event.type}
    </span>

    <button
        class="edit-btn"
        onclick="editEvent(${event.id})">

        <i class="fa-solid fa-pen"></i>

    </button>

    <button
        class="delete-btn"
        onclick="deleteEvent(${event.id})">

        <i class="fa-solid fa-trash"></i>

    </button>

</div>

        `;

    });

}

// ==============================
// DELETE
// ==============================

function deleteEvent(id){

    if(confirm("Hapus event ini?")){

        events=events.filter(e=>e.id!==id);

        localStorage.setItem("events",JSON.stringify(events));

        renderCalendar();

        renderEvent();

    }

}

// ==============================
// EDIT
// ==============================

function editEvent(id){

    localStorage.setItem("editEventId",id);

    window.location.href="addevent.html";

}

// ==============================
// PINDAH BULAN
// ==============================

prevMonth.onclick=function(){

    currentDate.setMonth(currentDate.getMonth()-1);

    renderCalendar();

};

nextMonth.onclick=function(){

    currentDate.setMonth(currentDate.getMonth()+1);

    renderCalendar();

};

// ==============================
// TAMBAH EVENT
// ==============================

function openAddEvent(){

    localStorage.removeItem("editEventId");

    window.location.href="addevent.html";

}

floatingBtn.onclick=openAddEvent;

if(addEventBtn){

    addEventBtn.onclick=openAddEvent;

}

if(emptyBtn){

    emptyBtn.onclick=openAddEvent;

}

// ==============================
// REFRESH
// ==============================

window.addEventListener("focus",()=>{

    events=JSON.parse(localStorage.getItem("events")) || [];

    renderCalendar();

    renderEvent();

});

// ==============================
// LOAD
// ==============================

renderCalendar();

renderEvent();