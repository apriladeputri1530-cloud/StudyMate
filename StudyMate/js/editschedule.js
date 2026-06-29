// ==============================
// BACK BUTTON
// ==============================

const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", () => {

    history.back();

});


// ==============================
// ELEMENT
// ==============================

const startBtn = document.getElementById("startTimeBtn");
const endBtn = document.getElementById("endTimeBtn");

const startPicker = document.getElementById("startPicker");
const endPicker = document.getElementById("endPicker");

const startText = document.getElementById("startTimeText");
const endText = document.getElementById("endTimeText");


// ==============================
// GENERATE TIME PICKER
// ==============================

function createPicker(picker, textElement){

    const hourList = picker.querySelectorAll(".hour-list")[0];
    const minuteList = picker.querySelectorAll(".minute-list")[0];
    const confirm = picker.querySelector(".picker-confirm");

    let selectedHour = "08";
    let selectedMinute = "00";

    // Jam
    for(let i=0;i<24;i++){

        const btn = document.createElement("button");

        btn.textContent = String(i).padStart(2,"0");

        btn.onclick = ()=>{

            hourList.querySelectorAll("button").forEach(b=>b.classList.remove("active"));

            btn.classList.add("active");

            selectedHour = btn.textContent;

        };

        if(i===8) btn.classList.add("active");

        hourList.appendChild(btn);

    }

    // Menit
    const minutes=[0,5,10,15,20,25,30,35,40,45,50,55];

    minutes.forEach(m=>{

        const btn=document.createElement("button");

        btn.textContent=String(m).padStart(2,"0");

        btn.onclick=()=>{

            minuteList.querySelectorAll("button").forEach(b=>b.classList.remove("active"));

            btn.classList.add("active");

            selectedMinute=btn.textContent;

        };

        if(m===0) btn.classList.add("active");

        minuteList.appendChild(btn);

    });

    confirm.onclick=()=>{

        textElement.textContent=selectedHour+":"+selectedMinute;

        picker.style.display="none";

    };

}

createPicker(startPicker,startText);
createPicker(endPicker,endText);


// ==============================
// OPEN PICKER
// ==============================

startBtn.addEventListener("click",()=>{

    endPicker.style.display="none";

    if(startPicker.style.display==="block"){

        startPicker.style.display="none";

    }else{

        startPicker.style.display="block";

    }

});


endBtn.addEventListener("click",()=>{

    startPicker.style.display="none";

    if(endPicker.style.display==="block"){

        endPicker.style.display="none";

    }else{

        endPicker.style.display="block";

    }

});


// ==============================
// SAVE
// ==============================

const saveBtn=document.querySelector(".save-btn");

saveBtn.addEventListener("click",()=>{

    const subject=document.getElementById("subject").value.trim();

    const day=document.getElementById("day").value;

    const room=document.getElementById("room").value.trim();

    const lecturer=document.getElementById("lecturer").value.trim();

    if(subject===""){

        alert("Nama mata kuliah belum diisi.");

        return;

    }

    if(room===""){

        alert("Ruangan belum diisi.");

        return;

    }

    const data={

        subject,

        day,

        startTime:startText.textContent,

        endTime:endText.textContent,

        room,

        lecturer

    };

    console.log(data);

    alert("Jadwal berhasil diperbarui!");

    // pindah halaman
    window.location.href="schedule.html";

});