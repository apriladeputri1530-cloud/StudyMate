// ===============================
// AMBIL DATA USER
// ===============================

let user = JSON.parse(localStorage.getItem("studymate-user"));

if (!user) {
    user = {
        name: "Mahasiswa",
        email: "email@kampus.ac.id",
        program: "Program Studi"
    };
}

// ===============================
// ELEMENT
// ===============================

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const programInput = document.getElementById("program");

const displayName = document.getElementById("displayName");
const displayEmail = document.getElementById("displayEmail");
const displayProgram = document.getElementById("displayProgram");
const avatarInitial = document.getElementById("avatarInitial");

const saveBtn = document.getElementById("saveBtn");
const logoutBtn = document.getElementById("logoutBtn");
const reminderBtn = document.getElementById("reminderBtn");

// ===============================
// LOAD DATA
// ===============================

function loadProfile(){

    nameInput.value = user.name || "";
    emailInput.value = user.email || "";
    programInput.value = user.program || "";

    displayName.textContent = user.name || "Mahasiswa";
    displayEmail.textContent = user.email || "email@kampus.ac.id";
    displayProgram.textContent = user.program || "Program Studi";

    avatarInitial.textContent = getInitial(user.name);

}

loadProfile();

// ===============================
// INISIAL NAMA
// ===============================

function getInitial(name){

    if(!name) return "MH";

    return name
        .split(" ")
        .map(item => item.charAt(0))
        .slice(0,2)
        .join("")
        .toUpperCase();

}

// ===============================
// SIMPAN
// ===============================

saveBtn.addEventListener("click",function(){

    user.name = nameInput.value.trim();
    user.email = emailInput.value.trim();
    user.program = programInput.value.trim();

    localStorage.setItem(
        "studymate-user",
        JSON.stringify(user)
    );

    loadProfile();

    alert("Profil berhasil diperbarui");

});

// ===============================
// REMINDER
// ===============================

reminderBtn.addEventListener("click",function(){

    window.location.href="reminder-settings.html";

});

// ===============================
// LOGOUT
// ===============================

logoutBtn.addEventListener("click",function(){

    if(confirm("Apakah Anda yakin ingin keluar?")){

        localStorage.removeItem("studymate-user");

        alert("Berhasil keluar");

        window.location.href="login.html";

    }

});