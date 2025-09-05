const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Ambil data Jadwal (urut Minggu -> Jumat)
const jadwalList = document.getElementById("jadwal-list");
const dayOrder = {
  "Minggu": 1,
  "Senin": 2,
  "Selasa": 3,
  "Rabu": 4,
  "Kamis": 5,
  "Jumat": 6,
  "Sabtu": 7
};

db.collection("Jadwal").get().then((snapshot) => {
  let dataArr = [];
  snapshot.forEach((doc) => dataArr.push(doc.data()));

  dataArr.sort((a, b) => dayOrder[a.Hari] - dayOrder[b.Hari]);

  dataArr.forEach((data) => {
    const item = document.createElement("li");
    item.textContent = `${data.Hari} - ${data.Acara} (${data.Waktu})`;
    jadwalList.appendChild(item);
  });
});

// Ambil 1 Renungan sesuai hari ini
const renunganList = document.getElementById("renungan-list");
const today = new Date().getDay(); // 0=Minggu, 1=Senin, dst

db.collection("Renungan").get().then((snapshot) => {
  let dataArr = [];
  snapshot.forEach((doc) => dataArr.push(doc.data()));

  const renungan = dataArr[today % dataArr.length];

  if (renungan) {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${renungan.Judul}</strong><br>${renungan.Isi}`;
    renunganList.appendChild(item);
  }
});