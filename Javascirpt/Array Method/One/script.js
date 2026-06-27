// 1. STATE (Data awal keranjang belanja kamu)
let container = [
  { id: 101, name: "Kopi Susu Gula Aren", cost: 15000 },
  { id: 102, name: "Indomie Goreng + Telur", cost: 12000 },
  { id: 103, name: "Camilan Keripik Singkong", cost: 8000 }
];

// Ambil elemen DOM yang dibutuhkan
const shoppingContainer = document.getElementById('shopping-list');
const totalPaymentText = document.getElementById('total-payment');

// 2. FUNGSI UNTUK MENAMPILKAN BARANG (Wajib pakai .map)
function renderContainer() {
  
  // TUGAS A: Gunakan .map() untuk mengubah isi array 'container' menjadi HTML.
  // Contoh output string di dalam map: 
  // `<div class="produk-item"> Nama - Rp Harga <button onclick="hapusBarang(ID)">Hapus</button></div>`
  const htmlItem = container.map(barang => {
    // TULIS CODE .MAP KAMU DI SINI
    return `<div class="product-item"> ${barang.name} - ${barang.cost} <button onclick="deleteItem(${barang.id})">Delete</button></div>`
  });

  // TUGAS B: Masukkan htmlBarang tersebut ke dalam kontainerBelanja menggunakan innerHTML
  // Petunjuk: jangan lupa di- .join('') biar koma-nya hilang.
  shoppingContainer.innerHTML = htmlItem.join('')
  
  // Jalankan fungsi hitung total setiap kali layar di-render
  calculateTotal();
}

// 3. FUNGSI UNTUK MENGHITUNG TOTAL HARGA (Wajib pakai .reduce)
function calculateTotal() {
  // TUGAS C: Gunakan .reduce() untuk menjumlahkan semua properti 'harga' yang ada di dalam array 'keranjang'.
  const total = container.reduce((accumulator, currentItem) => {
    // TULIS CODE .REDUCE KAMU DI SINI
    return accumulator + currentItem.cost
  }, 0);

  // TUGAS D: Tampilkan hasil totalnya ke dalam elemen textTotalHarga
  totalPaymentText.innerText = `Rp ${total}`;
}

// 4. FUNGSI UNTUK MENGHAPUS BARANG (Wajib pakai .filter)
function deleteItem(chosenID) {
  // TUGAS E: Gunakan .filter() untuk menyaring array 'keranjang'.
  // Buang barang yang id-nya SAMA dengan idYangDipilih.
  container = container.filter(item => {
    item.id !== chosenID
  })// TULIS CODE .FILTER KAMU DI SINI
  
  // TUGAS F: Panggil lagi fungsi renderKeranjang() supaya tampilan di layar terupdate
  // TULIS DI SINI
  renderContainer()
}

renderContainer();
// Challenge from Gemini AI