
// --- Firestore Functions ---
const dbRef = firebase.firestore();

// Load Header
dbRef.collection("settings").doc("header").onSnapshot(doc=>{
  if(doc.exists){
    document.getElementById("judul").innerText = doc.data().judul;
    document.getElementById("subjudul").innerText = doc.data().subjudul;
  }
});

// Load Poster sesuai hari
const hari = new Date().getDay();
dbRef.collection("poster").doc(hari.toString()).onSnapshot(doc=>{
  if(doc.exists){
    document.getElementById("poster-img").src = doc.data().url;
  }
});

// Load Jadwal
dbRef.collection("jadwal").onSnapshot(snapshot=>{
  const container = document.getElementById("jadwal-container");
  container.innerHTML = "";
  snapshot.forEach(doc=>{
    const j = doc.data();
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${j.hari}</strong><br>${j.jam}<br>${j.kegiatan}`;
    container.appendChild(div);
  });
});

// Load Galeri
dbRef.collection("galeri").onSnapshot(snapshot=>{
  const galeri = document.getElementById("galeri");
  galeri.innerHTML = "";
  snapshot.forEach(doc=>{
    const img = document.createElement("img");
    img.src = doc.data().url;
    galeri.appendChild(img);
  });
});

// Load Renungan
dbRef.collection("renungan").doc(hari.toString()).onSnapshot(doc=>{
  if(doc.exists){
    document.getElementById("renungan-box").innerText = doc.data().isi;
  } else {
    fetch("renungan.json").then(r=>r.json()).then(data=>{
      document.getElementById("renungan-box").innerText = data[hari].isi;
    });
  }
});

// Load Footer
dbRef.collection("settings").doc("footer").onSnapshot(doc=>{
  if(doc.exists){
    document.getElementById("footer-text").innerText = doc.data().copyright;
    document.getElementById("footer-fb").href = doc.data().fb;
    document.getElementById("footer-ig").href = doc.data().ig;
  }
});

// --- Admin Functions ---
function updateHeader(){
  dbRef.collection("settings").doc("header").set({
    judul: document.getElementById("judulInput").value,
    subjudul: document.getElementById("subjudulInput").value
  });
  alert("Header diperbarui");
}
function updatePoster(){
  dbRef.collection("poster").doc(document.getElementById("posterHari").value).set({
    url: document.getElementById("posterUrl").value
  });
  alert("Poster disimpan");
}
function addJadwal(){
  dbRef.collection("jadwal").add({
    hari: document.getElementById("hari").value,
    jam: document.getElementById("jam").value,
    kegiatan: document.getElementById("kegiatan").value
  });
  alert("Jadwal ditambahkan");
}
function updateRenungan(){
  dbRef.collection("renungan").doc(document.getElementById("renunganHari").value).set({
    isi: document.getElementById("renunganIsi").value
  });
  alert("Renungan disimpan");
}
function addGaleri(){
  dbRef.collection("galeri").add({
    url: document.getElementById("galeriUrl").value
  });
  alert("Foto galeri ditambahkan");
}
function updateFooter(){
  dbRef.collection("settings").doc("footer").set({
    copyright: document.getElementById("footerText").value,
    fb: document.getElementById("fbUrl").value,
    ig: document.getElementById("igUrl").value
  });
  alert("Footer diperbarui");
}
