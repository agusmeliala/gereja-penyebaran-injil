// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyD53vxKLgwJYkgoi8bF6TMiBAxy2Pza7f0",
  authDomain: "gpi-admin.firebaseapp.com",
  projectId: "gpi-admin",
  storageBucket: "gpi-admin.firebasestorage.app",
  messagingSenderId: "963621876257",
  appId: "1:963621876257:web:faa2d9f7b8b68049e6960"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Poster otomatis
db.collection("poster").get().then(snapshot => {
  const today = new Date().getDay();
  const data = snapshot.docs[today % snapshot.docs.length].data();
  document.getElementById("poster-img").src = data.url;
});

// Jadwal
db.collection("jadwal").get().then(snapshot => {
  let html = "<table><tr><th>Hari</th><th>Kegiatan</th></tr>";
  snapshot.forEach(doc => {
    const d = doc.data();
    html += `<tr><td>${d.hari}</td><td>${d.kegiatan}</td></tr>`;
  });
  html += "</table>";
  document.getElementById("jadwal-container").innerHTML = html;
});

// Galeri
db.collection("galeri").get().then(snapshot => {
  let galeri = "";
  snapshot.forEach(doc => {
    galeri += `<img src="${doc.data().url}" alt="foto">`;
  });
  document.getElementById("galeri-container").innerHTML = galeri;
});

// Renungan
db.collection("renungan").get().then(snapshot => {
  const today = new Date().getDay();
  const data = snapshot.docs[today % snapshot.docs.length].data();
  document.getElementById("renungan-box").innerHTML = `<h3>${data.judul}</h3><p>${data.isi}</p>`;
});
