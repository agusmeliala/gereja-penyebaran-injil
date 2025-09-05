// Ganti dengan config Firebase kamu
const firebaseConfig = {
  apiKey: "ISI_API_KEY_MU",
  authDomain: "ISI_PROJECT_ID.firebaseapp.com",
  projectId: "ISI_PROJECT_ID",
  storageBucket: "ISI_PROJECT_ID.appspot.com",
  messagingSenderId: "ISI_SENDER_ID",
  appId: "ISI_APP_ID"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Ambil data Jadwal
const jadwalList = document.getElementById("jadwal-list");
db.collection("Jadwal").get().then(snapshot => {
  snapshot.forEach(doc => {
    const data = doc.data();
    const item = document.createElement("li");
    item.textContent = `${data.Hari} - ${data.Acara} (${data.Waktu})`;
    jadwalList.appendChild(item);
  });
});

// Ambil data Renungan
const renunganList = document.getElementById("renungan-list");
db.collection("Renungan").get().then(snapshot => {
  snapshot.forEach(doc => {
    const data = doc.data();
    const item = document.createElement("li");
    item.innerHTML = `<strong>${data.Judul}</strong><br>${data.Isi}`;
    renunganList.appendChild(item);
  });
});