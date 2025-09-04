// Ganti dengan konfigurasi Firebase kamu
const firebaseConfig = {
  apiKey: "ISI_APIKEY",
  authDomain: "ISI_PROJECTID.firebaseapp.com",
  projectId: "ISI_PROJECTID",
  storageBucket: "ISI_PROJECTID.appspot.com",
  messagingSenderId: "ISI_SENDERID",
  appId: "ISI_APPID"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Ambil data Jadwal
const jadwalList = document.getElementById("jadwal-list");
db.collection("Jadwal").get().then((snapshot) => {
  snapshot.forEach((doc) => {
    const data = doc.data();
    const item = document.createElement("li");
    item.textContent = `${data.Hari} - ${data.Acara} (${data.Waktu})`;
    jadwalList.appendChild(item);
  });
});

// Ambil data Renungan
const renunganList = document.getElementById("renungan-list");
db.collection("Renungan").get().then((snapshot) => {
  snapshot.forEach((doc) => {
    const data = doc.data();
    const item = document.createElement("li");
    item.innerHTML = `<strong>${data.Judul}</strong><br>${data.Isi}`;
    renunganList.appendChild(item);
  });
});
