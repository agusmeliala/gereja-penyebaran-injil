const firebaseConfig = {
  apiKey: "AIzaSyD53vxXLgwJYKgoi8bF6TMiBAxy2Pza7f0",
  authDomain: "gpi-admin.firebaseapp.com",
  projectId: "gpi-admin",
  storageBucket: "gpi-admin.firebasestorage.app",
  messagingSenderId: "963621876257",
  appId: "1:963621876257:web:faa2d9f7b8b6b8049e6960"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Update tanggal & jam aktif
function updateTime() {
  const now = new Date();
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  const tanggal = now.toLocaleDateString('id-ID', options);
  const jam = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  document.getElementById("tanggal-waktu").textContent = `${tanggal} ${jam}`;
}
setInterval(updateTime, 1000);
updateTime();

// Poster
db.collection("poster").limit(1).get().then(snapshot => {
  if (!snapshot.empty) {
    snapshot.forEach(doc => {
      document.getElementById("poster-img").src = doc.data().url;
    });
  } else {
    document.getElementById("poster-img").alt = "Belum ada poster";
  }
});

// Jadwal Ibadah
const urutanHari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const jadwalList = document.getElementById("jadwal-list");
db.collection("Jadwal").get().then(snapshot => {
  if (snapshot.empty) {
    jadwalList.innerHTML = "<li>Belum ada jadwal</li>";
  } else {
    let arr = [];
    snapshot.forEach(doc => arr.push(doc.data()));
    arr.sort((a,b)=> urutanHari.indexOf(a.Hari)-urutanHari.indexOf(b.Hari));
    arr.forEach(data => {
      const li = document.createElement("li");
      li.textContent = `${data.Hari} - ${data.Acara} (${data.Waktu})`;
      jadwalList.appendChild(li);
    });
  }
});

// Renungan Harian
const renunganList = document.getElementById("renungan-list");
const today = new Date().getDay();
const nomorRenungan = (today % 7) + 1;
db.collection("Renungan").doc(`Renungan ${nomorRenungan}`).get().then(doc => {
  if(doc.exists){
    const data = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `<strong>${data.Judul}</strong><br>${data.Isi}`;
    renunganList.appendChild(li);
  } else {
    renunganList.innerHTML = "<li>Renungan belum tersedia</li>";
  }
});

// Galeri
const galeriContainer = document.getElementById("galeri-container");
db.collection("galeri").get().then(snapshot => {
  if (snapshot.empty) {
    galeriContainer.innerHTML = "<p>Belum ada foto galeri</p>";
  } else {
    snapshot.forEach(doc => {
      const img = document.createElement("img");
      img.src = doc.data().url;
      galeriContainer.appendChild(img);
    });
  }
});