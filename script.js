// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Konfigurasi Firebase (ganti dengan config milikmu)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Render Jadwal
async function loadJadwal() {
  const container = document.getElementById("jadwal");
  container.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "Jadwal"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    container.innerHTML += `
      <div class="card">
        <strong>${data.Hari || ""}</strong><br/>
        Acara: ${data.Acara || ""}<br/>
        Waktu: ${data.Waktu || ""}
      </div>`;
  });
}

// Render Renungan
async function loadRenungan() {
  const container = document.getElementById("renungan");
  container.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "Renungan"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    container.innerHTML += `
      <div class="card">
        <strong>${data.Judul || ""}</strong><br/>
        ${data.Isi || ""}
      </div>`;
  });
}

// Jalankan
loadJadwal();
loadRenungan();