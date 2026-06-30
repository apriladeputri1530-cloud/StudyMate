// ===============================
// AMBIL DATA USER AKTIF
// ===============================

// Mengambil user yang sedang login aktif saat ini
let user = JSON.parse(localStorage.getItem("currentUser"));

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
// SIMPAN PERUBAHAN PROFIL
// ===============================

saveBtn.addEventListener("click", function(){

    const oldEmail = user.email; // Simpan email lama untuk acuan pencarian data

    user.name = nameInput.value.trim();
    user.email = emailInput.value.trim();
    user.program = programInput.value.trim();

    // 1. Update sesi user aktif saat ini
    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

    // 2. Update data profil di dalam daftar seluruh akun (Database lokal)
    let userList = JSON.parse(localStorage.getItem("studymate-users-list")) || [];
    
    // Cari index posisi akun user ini di dalam array daftar akun
    const userIndex = userList.findIndex(u => u.email === oldEmail);
    
    if (userIndex !== -1) {
        // Perbarui data nama, email, dan program studi di daftar utama
        userList[userIndex].name = user.name;
        userList[userIndex].email = user.email;
        userList[userIndex].program = user.program;
        
        localStorage.setItem("studymate-users-list", JSON.stringify(userList));
    }

    loadProfile();

    alert("Profil berhasil diperbarui");

    window.location.href = "dashboard.html"; 

});

// ===============================
// REMINDER
// ===============================

reminderBtn.addEventListener("click",function(){

    window.location.href="reminder-settings.html";

});

// ===============================
// LOGOUT (Hanya Hapus Sesi Login)
// ===============================

logoutBtn.addEventListener("click",function(){

    if(confirm("Apakah Anda yakin ingin keluar?")){

        // Hanya menghapus akun yang sedang login aktif, bukan menghapus data akun dari sistem!
        localStorage.removeItem("currentUser");

        alert("Berhasil keluar");

        window.location.href="login.html";

    }

});