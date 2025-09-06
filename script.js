// Firebase Config (isi sesuai Firebase Console)
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

// Tanggal & Waktu Aktif
function updateDateTime() {
  const now = new Date();
  document.getElementById("datetime").textContent = now.toLocaleString("id-ID", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  });
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Ambil Jadwal
db.collection("Jadwal").get().then(snapshot => {
  const jadwalList = document.getElementById("jadwal-list");
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.Hari} - ${data.Acara} (${data.Waktu})`;
    jadwalList.appendChild(li);
  });
});

// Ambil Poster
db.collection("Poster").doc("Poster1").get().then(doc => {
  if (doc.exists) {
    const data = doc.data();
    const posterImg = document.getElementById("poster-img");
    posterImg.src = data.url || "fallback.jpg";
    posterImg.onerror = () => { posterImg.src = "fallback.jpg"; };
  }
});

// Ambil Renungan
db.collection("Renungan").get().then(snapshot => {
  const renunganList = document.getElementById("renungan-list");
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `<strong>${data.Judul}</strong><br>${data.Isi}`;
    renunganList.appendChild(li);
  });
});

// Ambil Galeri
db.collection("Galeri").get().then(snapshot => {
  const galeriContainer = document.getElementById("galeri-container");
  snapshot.forEach(doc => {
    const data = doc.data();
    const img = document.createElement("img");
    img.src = data.url || "fallback.jpg";
    img.onerror = () => { img.src = "fallback.jpg"; };
    galeriContainer.appendChild(img);
  });
});
