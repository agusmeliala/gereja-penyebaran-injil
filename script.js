// 🔧 Ganti sesuai config Firebase Console (tab Config)
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-PROJECT.firebaseapp.com",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-PROJECT.appspot.com",
  messagingSenderId: "YOUR-SENDER-ID",
  appId: "YOUR-APP-ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ⏰ Tanggal & Jam Aktif
function updateDateTime() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString('id-ID', options);
  const timeStr = now.toLocaleTimeString('id-ID');
  document.getElementById("datetime").textContent = `${dateStr} ${timeStr}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// 📅 Ambil Jadwal
db.collection("Jadwal").get().then(snapshot => {
  const list = document.getElementById("jadwal-list");
  snapshot.forEach(doc => {
    const data = doc.data();
    const item = document.createElement("li");
    item.textContent = `${data.Hari} - ${data.Acara} (${data.Waktu})`;
    list.appendChild(item);
  });
});

// 📖 Ambil Renungan
db.collection("Renungan").get().then(snapshot => {
  const list = document.getElementById("renungan-list");
  snapshot.forEach(doc => {
    const data = doc.data();
    const item = document.createElement("li");
    item.innerHTML = `<strong>${data.Judul}</strong><br>${data.Isi}`;
    list.appendChild(item);
  });
});

// 🖼 Ambil Poster
db.collection("Poster").doc("Poster1").get().then(doc => {
  const poster = document.getElementById("poster-img");
  if (doc.exists && doc.data().url) {
    poster.src = doc.data().url;
  } else {
    poster.src = "images/default-poster.jpg"; // fallback
  }
}).catch(() => {
  document.getElementById("poster-img").src = "images/default-poster.jpg";
});

// 🖼 Ambil Galeri
db.collection("galeri").get().then(snapshot => {
  const galeri = document.getElementById("galeri");
  if (snapshot.empty) {
    for (let i = 1; i <= 5; i++) {
      const img = document.createElement("img");
      img.src = `images/default${i}.jpg`;
      galeri.appendChild(img);
    }
  } else {
    snapshot.forEach(doc => {
      const data = doc.data();
      const img = document.createElement("img");
      img.src = data.url || "images/default1.jpg";
      galeri.appendChild(img);
    });
  }
}).catch(() => {
  const galeri = document.getElementById("galeri");
  for (let i = 1; i <= 5; i++) {
    const img = document.createElement("img");
    img.src = `images/default${i}.jpg`;
    galeri.appendChild(img);
  }
});