document.addEventListener("DOMContentLoaded", async () => {
  const jadwalContainer = document.getElementById("jadwal-container");
  const renunganContainer = document.getElementById("renungan-container");

  // Ambil Jadwal dari Firestore
  const snapshot = await db.collection("Jadwal").get();
  snapshot.forEach(doc => {
    const data = doc.data();
    const card = document.createElement("div");
    card.className = "jadwal-card";
    card.innerHTML = `<h3>${data.Hari}</h3><p>${data.Acara}</p><p>${data.Waktu}</p>`;
    jadwalContainer.appendChild(card);
  });

  // Ambil Renungan dari file JSON offline
  fetch("renungan.json")
    .then(res => res.json())
    .then(data => {
      const hari = new Date().getDay(); // 0 Minggu - 6 Sabtu
      const renungan = data[hari] || { judul: "Renungan", isi: "Belum ada renungan" };
      renunganContainer.innerHTML = `<h3>${renungan.judul}</h3><p>${renungan.isi}</p>`;
    });
});