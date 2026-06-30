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
// DATA & USER FILTER
// ==============================

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const userEmail = currentUser ? currentUser.email : "guest";

let allEvents = JSON.parse(localStorage.getItem("events")) || [];
let events = allEvents.filter(e => e.userOwner === userEmail);

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
// STANDARISASI FORMAT TANGGAL (YYYY-MM-DD)
// ==============================

function formatDate(date){
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

// Fungsi pembantu untuk memastikan format tanggal dari localstorage sama dengan kalender
function cleanDateFormat(dateStr) {
    if (!dateStr) return "";
    // Jika formatnya sudah YYYY-MM-DD, langsung kembalikan
    if (dateStr.includes("-")) return dateStr;
    
    // Antispasasi jika format menggunakan slash (DD/MM/YYYY atau sebaliknya)
    const parts = dateStr.split("/");
    if (parts.length === 3) {
        if (parts[0].length === 4) {
            return `${parts[0]}-${parts[1].padStart(2, "0")}-${parts[2].padStart(2, "0")}`;
        }
        return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
    }
    return dateStr;
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

    // Hari kosong di awal bulan
    for(let i=0;i<firstDay;i++){
        const div=document.createElement("div");
        div.classList.add("empty-day");
        calendarGrid.appendChild(div);
    }

    // Render tanggal-tanggal
    for(let day=1;day<=totalDays;day++){

        const div=document.createElement("div");
        div.classList.add("day");
        div.textContent=day;

        const fullDate=`${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

        // Tandai Hari Ini
        if(fullDate===formatDate(new Date())){
            div.classList.add("today");
        }

        // Tandai Tanggal Terpilih
        if(fullDate===formatDate(selectedDate)){
            div.classList.add("selected");
        }

        // Tandai jika ada event (Gunakan standarisasi format tanggal)
        const hasEventOnThisDay = events.some(e => cleanDateFormat(e.date) === fullDate);
        if(hasEventOnThisDay){
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
// RENDER LIST EVENT DI BAWAH KALENDER
// ==============================

function renderEvent(){

    eventList.innerHTML="";
    const targetDate = formatDate(selectedDate);

    // Filter event yang jatuh pada tanggal terpilih
    const todayEvents = events.filter(e => cleanDateFormat(e.date) === targetDate);

    if(todayEvents.length === 0){
        emptyState.style.display="block";
        eventList.innerHTML="";
        return;
    }

    emptyState.style.display="none";

    todayEvents.forEach(event=>{

        const type = event.type ? event.type.toLowerCase() : "event";
        let color="event";

        if(type==="tugas") color="tugas";
        if(type==="ujian") color="ujian";

        eventList.innerHTML += `
        <div class="event-card" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; margin-bottom: 10px; background: #fff; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div class="event-left">
                <div class="event-info">
                    <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">${event.name}</h3>
                    <p style="margin: 0 0 5px 0; color: #666; font-size: 13px;">${event.date} • ${event.time}</p>
                    <small style="color: #999; font-size: 12px;"><i class="fa-solid fa-location-dot"></i> ${event.location || "Tanpa Lokasi"}</small>
                </div>
            </div>
            <div class="event-action" style="display: flex; align-items: center; gap: 8px;">
                <span class="badge ${color}">
                    ${event.type}
                </span>
                <button class="edit-btn" onclick="editEvent(${event.id})" style="background: #e0e7ff; color: #4f46e5; border: none; padding: 8px; border-radius: 8px; cursor: pointer;">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="delete-btn" onclick="deleteEvent(${event.id})" style="background: #fee2e2; color: #ef4444; border: none; padding: 8px; border-radius: 8px; cursor: pointer;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
        `;
    });
}

// ==============================
// AKSIS GLOBAL (EDIT & DELETE)
// ==============================

window.deleteEvent = function(id){
    if(confirm("Hapus event ini?")){
        let currentGlobalEvents = JSON.parse(localStorage.getItem("events")) || [];
        currentGlobalEvents = currentGlobalEvents.filter(e => e.id !== id);
        
        localStorage.setItem("events", JSON.stringify(currentGlobalEvents));
        
        // Perbarui array lokal untuk user aktif
        events = currentGlobalEvents.filter(e => e.userOwner === userEmail);
        
        renderCalendar();
        renderEvent();
    }
};

window.editEvent = function(id){
    localStorage.setItem("editEventId", id);
    window.location.href="addevent.html";
};

// ==============================
// NAVIGASI PINDAH BULAN
// ==============================

prevMonth.onclick=function(){
    currentDate.setMonth(currentDate.getMonth()-1);
    renderCalendar();
    renderEvent();
};

nextMonth.onclick=function(){
    currentDate.setMonth(currentDate.getMonth()+1);
    renderCalendar();
    renderEvent();
};

// ==============================
// NAVIGASI TAMBAH EVENT
// ==============================

function openAddEvent(){
    localStorage.removeItem("editEventId");
    window.location.href="addevent.html";
}

if(floatingBtn) floatingBtn.onclick=openAddEvent;
if(addEventBtn) addEventBtn.onclick=openAddEvent;
if(emptyBtn) emptyBtn.onclick=openAddEvent;

// ==============================
// REFRESH SAAT FOKUS KEMBALI
// ==============================

window.addEventListener("focus",()=>{
    allEvents = JSON.parse(localStorage.getItem("events")) || [];
    events = allEvents.filter(e => e.userOwner === userEmail);
    renderCalendar();
    renderEvent();
});

// ==============================
// MATANGKAN RENDERING AWAL
// ==============================
renderCalendar();
renderEvent();