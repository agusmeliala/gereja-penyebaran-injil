// Firebase init
const firebaseConfig = {
  apiKey: "AIzaSyD53vxKLgwJYkgoi8bF6TMiBAxy2Pza7f0",
  authDomain: "gpi-admin.firebaseapp.com",
  projectId: "gpi-admin",
  storageBucket: "gpi-admin.firebasestorage.app",
  messagingSenderId: "963621876257",
  appId: "1:963621876257:web:faa2d9f7b86b8049e6960"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function loadRenungan() {
  let today = new Date();
  let dayIndex = today.getDay(); // 0 = Minggu, dst.
  let renunganText = "";

  try {
    const doc = await db.collection("renungan").doc(dayIndex.toString()).get();
    if (doc.exists) {
      renunganText = doc.data().isi;
      console.log("Renungan dari Firebase");
    } else {
      throw new Error("Firebase kosong");
    }
  } catch (error) {
    console.warn("Firebase gagal, pakai backup JSON:", error);
    const res = await fetch("renungan.json");
    const data = await res.json();
    renunganText = data[dayIndex]?.isi || "Renungan belum tersedia.";
  }

  document.getElementById("renungan-hari-ini").innerText = renunganText;
}
loadRenungan();
