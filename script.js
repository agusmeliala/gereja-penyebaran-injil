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

// Tanggal & Jam aktif
function updateDateTime() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString('id-ID', options);
  const timeStr = now.toLocaleTimeString('id-ID');
  document.getElementById("datetime").textContent = `${dateStr} pukul ${timeStr}`;
}
setInterval(updateDateTime, 1000);

// Ambil Jadwal
db.collection("Jadwal").get().then(snapshot => {
  const list = document.getElementById("jadwal-list");
  snapshot.forEach(doc => {
    const d = doc.data();
    const li = document.createElement("li");
    li.textContent = `${d.Hari} - ${d.Acara} (${d.Waktu})`;
    list.appendChild(li);
  });
});

// Ambil Poster
db.collection("Poster").doc("Poster1").get().then(doc => {
  if (doc.exists) {
    const url = doc.data().url;
    const img = document.getElementById("poster-img");
    img.src = url || "fallback.jpg";
    img.onerror = () => { img.src = "fallback.jpg"; };
  }
});

// Ambil Renungan
db.collection("Renungan").get().then(snapshot => {
  const list = document.getElementById("renungan-list");
  snapshot.forEach(doc => {
    const d = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `<strong>${d.Judul}</strong><br>${d.Isi}`;
    list.appendChild(li);
  });
});

// Ambil Galeri
db.collection("galeri").get().then(snapshot => {
  const container = document.getElementById("galeri-container");
  snapshot.forEach(doc => {
    const url = doc.data().url;
    const img = document.createElement("img");
    img.src = url || "fallback.jpg";
    img.onerror = () => { img.src = "fallback.jpg"; };
    container.appendChild(img);
  });
});