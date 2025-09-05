// Konfigurasi Firebase (ganti dengan punyamu dari Console)
const firebaseConfig = {
  apiKey: "ISI_API_KEY_KAMU",
  authDomain: "gpi-admin.firebaseapp.com",
  projectId: "gpi-admin",
  storageBucket: "gpi-admin.appspot.com",
  messagingSenderId: "963621876257",
  appId: "1:963621876257:web:faa2d9f7b8b6e696"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Tampilkan Jadwal
const jadwalList = document.getElementById("jadwal-list");
db.collection("Jadwal").get()
  .then(snapshot => {
    if (snapshot.empty) {
      jadwalList.innerHTML = "<li><i>Tidak ada data jadwal</i></li>";
    } else {
      snapshot.forEach(doc => {
        const data = doc.data();
        const item = document.createElement("li");
        item.textContent = `${data.Hari} - ${data.Acara} (${data.Waktu})`;
        jadwalList.appendChild(item);
      });
    }
  })
  .catch(err => {
    console.error("Error load Jadwal:", err);
    jadwalList.innerHTML = "<li style='color:red;'>Gagal load data!</li>";
  });

// Tampilkan Renungan
const renunganList = document.getElementById("renungan-list");
db.collection("Renungan").get()
  .then(snapshot => {
    if (snapshot.empty) {
      renunganList.innerHTML = "<li><i>Tidak ada data renungan</i></li>";
    } else {
      snapshot.forEach(doc => {
        const data = doc.data();
        const item = document.createElement("li");
        item.innerHTML = `<strong>${data.Judul}</strong><br>${data.Isi}`;
        renunganList.appendChild(item);
      });
    }
  })
  .catch(err => {
    console.error("Error load Renungan:", err);
    renunganList.innerHTML = "<li style='color:red;'>Gagal load data!</li>";
  });
