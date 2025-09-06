// Firebase config (isi dengan data dari Firebase Console tab Config)
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

// Tanggal & jam realtime
function updateDateTime() {
  const now = new Date();
  document.getElementById("datetime").textContent =
    now.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) +
    " " + now.toLocaleTimeString("id-ID");
}
setInterval(updateDateTime, 1000);

// Ambil Jadwal
const jadwalList = document.getElementById("jadwal-list");
db.collection("Jadwal").get().then(snapshot => {
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.Hari} - ${data.Acara} (${data.Waktu})`;
    jadwalList.appendChild(li);
  });
});

// Ambil Renungan
const renunganList = document.getElementById("renungan-list");
db.collection("Renungan").get().then(snapshot => {
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `<strong>${data.Judul}</strong><br>${data.Isi}`;
    renunganList.appendChild(li);
  });
});

// Ambil Poster (dengan fallback)
const posterImg = document.getElementById("poster-img");
db.collection("Poster").doc("Poster1").get().then(doc => {
  if (doc.exists && doc.data().url) {
    posterImg.src = doc.data().url;
  }
}).catch(() => { posterImg.src = "images/default.jpg"; });

// Ambil Galeri (dengan fallback)
const galeriContainer = document.getElementById("galeri-container");
db.collection("galeri").get().then(snapshot => {
  if (!snapshot.empty) {
    snapshot.forEach(doc => {
      const data = doc.data();
      const img = document.createElement("img");
      img.src = data.url || "images/default.jpg";
      galeriContainer.appendChild(img);
    });
  } else {
    for (let i = 0; i < 5; i++) {
      const img = document.createElement("img");
      img.src = "images/default.jpg";
      galeriContainer.appendChild(img);
    }
  }
}).catch(() => {
  for (let i = 0; i < 5; i++) {
    const img = document.createElement("img");
    img.src = "images/default.jpg";
    galeriContainer.appendChild(img);
  }
});
