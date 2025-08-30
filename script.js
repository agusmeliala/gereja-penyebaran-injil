document.addEventListener("DOMContentLoaded", () => {
  fetch("renungan.json")
    .then(response => response.json())
    .then(data => {
      const hariList = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
      const today = new Date().getDay(); // 0 = Minggu, 1 = Senin, dst

      const renunganHari = hariList[today];
      const renungan = data.find(r => r.hari === renunganHari);

      if (renungan) {
        document.getElementById("renungan-ayat").textContent = renungan.ayat;
        document.getElementById("renungan-isi").textContent = renungan.isi;
      } else {
        document.getElementById("renungan-ayat").textContent = "Renungan tidak ditemukan.";
        document.getElementById("renungan-isi").textContent = "";
      }
    })
    .catch(error => {
      console.error("Gagal memuat renungan:", error);
    });
});
