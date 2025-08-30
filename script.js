document.addEventListener("DOMContentLoaded", () => {
  fetch("renungan.json")
    .then(res => res.json())
    .then(data => {
      const hariList = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
      const today = new Date().getDay(); // 0=minggu
      const renungan = data.find(r => r.hari === hariList[today]);
      if (renungan) {
        document.getElementById("renungan-ayat").textContent = renungan.ayat;
        document.getElementById("renungan-isi").textContent = renungan.isi;
      }
    })
    .catch(err => console.error("Gagal memuat renungan:", err));
});
