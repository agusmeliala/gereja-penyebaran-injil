// Firebase Config asli
const firebaseConfig = {
  apiKey: "AIzaSyD53vxXLgwJYkgoi8bF6TMiBAxy2Pza7f0",
  authDomain: "gpi-admin.firebaseapp.com",
  projectId: "gpi-admin",
  storageBucket: "gpi-admin.firebasestorage.app",
  messagingSenderId: "963621876257",
  appId: "1:963621876257:web:faa2d9f7b86b68049e6960"
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
  const posterImg = document.getElementById("poster-img");
  if (doc.exists) {
    posterImg.src = doc.data().url || "fallback.jpg";
  } else {
    posterImg.src = "fallback.jpg";
  }
  posterImg.onerror = () => { posterImg.src = "fallback.jpg"; };
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
