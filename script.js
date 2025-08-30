fetch("renungan.json")
  .then(res => res.json())
  .then(data => {
    const hariIni = new Date().toLocaleDateString('id-ID', { weekday: 'long' });
    const renungan = data.renungan.find(r => r.hari === hariIni);
    if (renungan) {
      document.getElementById("renungan-ayat").innerText = renungan.ayat;
      document.getElementById("renungan-isi").innerText = renungan.isi;
    }
  })
  .catch(err => console.error("Gagal memuat renungan:", err));