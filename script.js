// Konfigurasi Firebase (isi dengan data proyekmu)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Ambil data Jadwal dan urutkan: Minggu -> Selasa -> Jumat
const orderHari = ["Minggu", "Selasa", "Jumat"];
const jadwalList = document.getElementById("jadwal-list");

db.collection("Jadwal").get().then(snapshot => {
  let items = [];
  snapshot.forEach(doc => items.push(doc.data()));
  items.sort((a, b) => orderHari.indexOf(a.Hari) - orderHari.indexOf(b.Hari));
  items.forEach(data => {
    const li = document.createElement("li");
    li.textContent = `${data.Hari} - ${data.Acara} (${data.Waktu})`;
    jadwalList.appendChild(li);
  });
});

// Ambil 1 Renungan sesuai hari ini
const renunganList = document.getElementById("renungan-list");
const hariIni = new Date().getDay(); // 0=Min,1=Sen,...

db.collection("Renungan").doc(`Renungan ${hariIni+1}`).get().then(doc => {
  if (doc.exists) {
    const data = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `<strong>${data.Judul}</strong><br>${data.Isi}`;
    renunganList.appendChild(li);
  } else {
    const li = document.createElement("li");
    li.textContent = "Renungan hari ini belum tersedia.";
    renunganList.appendChild(li);
  }
});
