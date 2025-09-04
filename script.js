// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Config (isi dengan Firebase config project kamu)
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

// Fungsi ambil Jadwal
async function loadJadwal() {
  const container = document.getElementById("jadwal-list");
  container.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "Jadwal"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    container.innerHTML += `
      <div class="card">
        <h3>${data.Hari}</h3>
        <p><strong>Acara:</strong> ${data.Acara}</p>
        <p><strong>Waktu:</strong> ${data.Waktu}</p>
      </div>
    `;
  });
}

// Fungsi ambil Renungan
async function loadRenungan() {
  const container = document.getElementById("renungan-list");
  container.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "Renungan"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    container.innerHTML += `
      <div class="card">
        <h3>${data.Judul}</h3>
        <p>${data.Isi}</p>
      </div>
    `;
  });
}

// Jalankan
loadJadwal();
loadRenungan();