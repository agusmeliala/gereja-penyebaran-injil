// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD53vxXLgwJYKgoi8bF6TMiBAxy2Pza7f0",
  authDomain: "gpi-admin.firebaseapp.com",
  projectId: "gpi-admin",
  storageBucket: "gpi-admin.firebasestorage.app",
  messagingSenderId: "963621876257",
  appId: "1:963621876257:web:faa2d9f7b8b6b8049e6960"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- Ambil data Jadwal (urut: Minggu, Selasa, Jumat) ---
const urutanHari = ["Minggu", "Selasa", "Jumat"];
const jadwalList = document.getElementById("jadwal-list");

db.collection("Jadwal").get().then(snapshot => {
  let dataJadwal = [];
  snapshot.forEach(doc => {
    dataJadwal.push(doc.data());
  });

  dataJadwal.sort((a, b) => {
    return urutanHari.indexOf(a.Hari) - urutanHari.indexOf(b.Hari);
  });

  dataJadwal.forEach(data => {
    const item = document.createElement("li");
    item.textContent = `${data.Hari} - ${data.Acara} (${data.Waktu})`;
    jadwalList.appendChild(item);
  });
});

// --- Ambil data Renungan (hanya tampil 1/hari sesuai tanggal) ---
const renunganList = document.getElementById("renungan-list");
const today = new Date();
const indexHari = today.getDay(); // 0=minggu ... 6=sabtu
const nomorRenungan = (indexHari % 7) + 1; // Rotasi 1–7

db.collection("Renungan").doc(`Renungan ${nomorRenungan}`).get().then(doc => {
  if (doc.exists) {
    const data = doc.data();
    const item = document.createElement("li");
    item.innerHTML = `<strong>${data.Judul}</strong><br>${data.Isi}`;
    renunganList.appendChild(item);
  }
});