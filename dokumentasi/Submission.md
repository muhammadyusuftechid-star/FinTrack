================================================================================
📘 BUKU PANDUAN SUBMISSION: MEMBANGUN EXPENSE TRACKER APP
================================================================================

Kelas Front-End Web Pemula
Topik Akhir: Personal Finance & Expense Tracker

================================================================================
📌 BAB 1: PENDAHULUAN
================================================================================

1.1 Tujuan Submission
---------------------
Submission (Proyek Akhir) ini bertujuan untuk:

  • Menguji kemampuan Anda dalam mengubah dan mengelola susunan Antarmuka 
    Pengguna (HTML) menggunakan JavaScript — yang biasa disebut Manipulasi DOM.
  
  • Menguji kemampuan Anda dalam menyimpan data aplikasi secara lokal di browser 
    menggunakan Web Storage agar data tetap ada saat halaman dimuat ulang.

1.2 Topik Submission
--------------------
Anda diminta menyusun aplikasi pencatatan keuangan pribadi bernama:

  >>> Personal Finance & Expense Tracker App <<<

Aplikasi ini berfungsi untuk:
  ✓ mencatat uang masuk maupun keluar
  ✓ melihat sisa saldo
  ✓ mencari riwayat transaksi


================================================================================
🧩 BAB 2: KETENTUAN TUGAS
================================================================================

Anda telah sampai pada tahap akhir kelas. Kami sudah menyediakan Starter Project 
(tampilan web jadi). Tugas Anda adalah menulis logika JavaScript di berkas main.js.

2.1 Struktur Data Transaksi
---------------------------
Setiap transaksi yang Anda simpan harus berupa objek dengan properti berikut:

┌─────────────────────────────────────────────────────────────────────────────┐
│  {                                                                          │
│    "id":     "string | number",   // Tips: gunakan +new Date()              │
│    "title":  "string",                                                      │
│    "amount": "number",            // Simpan sebagai angka, bukan teks       │
│    "date":   "string",                                                      │
│    "type":   "string"             // 'income' atau 'expense'                │
│  }                                                                          │
└─────────────────────────────────────────────────────────────────────────────┘

💡 TIPS PENTING:
  • Gunakan +new Date() untuk membuat ID unik secara otomatis
  • Simpan amount sebagai angka (Number), contoh: 2500 (bukan "2500")
  • Gunakan 'income' untuk pemasukan, 'expense' untuk pengeluaran

2.2 Atribut data-testid WAJIB
-----------------------------
Saat membuat elemen HTML via JavaScript, ikuti struktur templat berikut.
Nilai atribut data-testid TIDAK BOLEH DIUBAH.

┌─────────────────────────────────────────────────────────────────────────────┐
│  <div data-testid="transactionItem">                                        │
│    <h3 data-testid="transactionItemTitle">Judul Transaksi 1</h3>            │
│    <p data-testid="transactionItemAmount">Nominal: Rp10000</p>              │
│    <p data-testid="transactionItemDate">Tanggal: 2030-12-01</p>             │
│    <p data-testid="transactionItemType">Tipe: Pemasukan</p>                 │
│    <div>                                                                    │
│      <button data-testid="transactionItemEditTypeButton">Ubah Tipe</button> │
│      <button data-testid="transactionItemDeleteButton">Hapus</button>       │
│    </div>                                                                   │
│  </div>                                                                     │
└─────────────────────────────────────────────────────────────────────────────┘

⚠️ PERINGATAN PENTING:
  • Gunakan document.createElement() saat menambahkan kartu transaksi
  • HINDARI innerHTML += ... karena akan menghapus semua event listener

2.3 Larangan Library Eksternal
------------------------------
Tulis JavaScript murni TANPA library seperti:
  ✘ jQuery
  ✘ React
  ✘ Vue


================================================================================
🧭 BAB 3: TATA CARA PENGERJAAN TUGAS
================================================================================

Langkah-langkah mengerjakan submission:

  1. Unduh proyek Starter Project (file ZIP)
  
  2. Ekstrak dan pastikan ada 4 berkas:
     ├── index.html
     ├── main.js
     ├── README.md
     └── style.css
  
  3. Pada index.html, jangan ubah struktur yang sudah ada kecuali bagian greeting
  
  4. Tulis semua logika JavaScript di main.js
  
  5. Gunakan markdown viewer di VSCode (Ctrl+Shift+V) untuk membaca README.md


================================================================================
✅ BAB 4: KRITERIA PENILAIAN
================================================================================

Setiap kriteria dinilai dari 0 hingga 4 poin.
Agar LULUS, setiap kriteria harus mencapai minimal 2 poin (level Basic).

┌─────────────────────────────────────────────────────────────────────────────┐
│ KRITERIA 1: Memanipulasi DOM untuk Form dan Daftar Transaksi                │
├───────────────┬──────────┬─────────────────────────────────────────────────┤
│ Level         │ Poin     │ Deskripsi                                       │
├───────────────┼──────────┼─────────────────────────────────────────────────┤
│ Reject        │ 0        │ Aplikasi error / data-testid diubah / greeting  │
│               │          │ masih default                                   │
├───────────────┼──────────┼─────────────────────────────────────────────────┤
│ Basic         │ 2        │ Transaksi tampil, pemasukan → incomeList,       │
│               │          │ pengeluaran → expenseList                       │
├───────────────┼──────────┼─────────────────────────────────────────────────┤
│ Skilled       │ 3        │ Basic + validasi form (alert jika judul kosong  │
│               │          │ atau nominal < 1)                               │
├───────────────┼──────────┼─────────────────────────────────────────────────┤
│ Advanced      │ 4        │ Skilled + dashboard otomatis update total       │
│               │          │ saldo, pemasukan, pengeluaran                   │
└───────────────┴──────────┴─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ KRITERIA 2: Mengelola Penyimpanan Data (Web Storage API)                    │
├───────────────┬──────────┬─────────────────────────────────────────────────┤
│ Level         │ Poin     │ Deskripsi                                       │
├───────────────┼──────────┼─────────────────────────────────────────────────┤
│ Reject        │ 0        │ Data hilang saat refresh → localStorage tidak   │
│               │          │ digunakan                                       │
├───────────────┼──────────┼─────────────────────────────────────────────────┤
│ Basic         │ 2        │ Data tersimpan ke localStorage + tombol Hapus   │
│               │          │ berfungsi                                       │
├───────────────┼──────────┼─────────────────────────────────────────────────┤
│ Skilled       │ 3        │ Basic + tombol Edit berfungsi (isi form otomatis│
│               │          │ simpan perubahan)                               │
├───────────────┼──────────┼─────────────────────────────────────────────────┤
│ Advanced      │ 4        │ Skilled + pembaruan tampilan via Custom Event   │
│               │          │ (dispatchEvent)                                 │
└───────────────┴──────────┴─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ KRITERIA 3: Fitur Interaktif (Pindah Kategori dan Pencarian)                │
├───────────────┬──────────┬─────────────────────────────────────────────────┤
│ Level         │ Poin     │ Deskripsi                                       │
├───────────────┼──────────┼─────────────────────────────────────────────────┤
│ Reject        │ 0        │ Tombol "Ubah Tipe" tidak berfungsi / error saat │
│               │          │ pencarian                                       │
├───────────────┼──────────┼─────────────────────────────────────────────────┤
│ Basic         │ 2        │ Tombol "Ubah Tipe" berfungsi (pindah kategori)  │
├───────────────┼──────────┼─────────────────────────────────────────────────┤
│ Skilled       │ 3        │ Basic + kolom pencarian berfungsi               │
│               │          │ (filter transaksi)                              │
├───────────────┼──────────┼─────────────────────────────────────────────────┤
│ Advanced      │ 4        │ Skilled + saat pencarian dikosongkan, semua     │
│               │          │ transaksi muncul kembali                        │
└───────────────┴──────────┴─────────────────────────────────────────────────┘


================================================================================
🧮 BAB 5: RUMUS NILAI AKHIR & BINTANG
================================================================================

RUMUS:
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                      Nilai Akhir = Total Poin / 3                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

Contoh: Poin = 2 + 3 + 3 = 8 → Nilai Akhir = 8/3 ≈ 2.67 → Bintang 3

TABEL KONVERSI:
┌──────────────────┬────────────┬───────────────┬────────────────────────────┐
│ Nilai Akhir      │ Bintang    │ Level         │ Keterangan                  │
├──────────────────┼────────────┼───────────────┼────────────────────────────┤
│ < 1              │ Ditolak    │ -             │ Aplikasi belum memenuhi     │
│                  │            │               │ standar minimum             │
├──────────────────┼────────────┼───────────────┼────────────────────────────┤
│ 1 – < 2          │ ⭐⭐        │ Below Basic   │ Beberapa fungsi dasar       │
│                  │            │               │ belum bekerja               │
├──────────────────┼────────────┼───────────────┼────────────────────────────┤
│ 2 – < 3          │ ⭐⭐⭐       │ Basic         │ Semua fungsi dasar berjalan │
│                  │            │               │ ✅ LULUS                    │
├──────────────────┼────────────┼───────────────┼────────────────────────────┤
│ 3 – < 4          │ ⭐⭐⭐⭐      │ Skilled       │ + validasi form & pencarian │
│                  │            │               │ berjalan baik               │
├──────────────────┼────────────┼───────────────┼────────────────────────────┤
│ 4                │ ⭐⭐⭐⭐⭐     │ Advanced      │ Semua fitur termasuk        │
│                  │            │               │ Custom Event & saldo dinamis│
└──────────────────┴────────────┴───────────────┴────────────────────────────┘


================================================================================
🎨 BAB 6: TIPS & TRIK (UNTUK PORTOFOLIO)
================================================================================

Submission ini juga bagian dari PORTOFOLIO Anda.
Kami sangat mendorong Anda untuk menyesuaikan tampilan (CSS) agar berbeda.

6.1 Yang Boleh Anda Ubah
------------------------
  ✓ Warna, tipografi, ukuran teks, border, shadow, spacing
  ✓ Background, gradien, pola dekoratif
  ✓ Layout kartu dan posisi elemen visual
  ✓ Animasi hover, transisi, efek interaktif
  ✓ Teks tombol & placeholder form (contoh: "Simpan" → "Catat Sekarang")
  ✓ Menambahkan elemen HTML baru (ikon, badge, ilustrasi)

6.2 Yang TIDAK Boleh Diubah
---------------------------
  ✘ Nilai atribut data-testid
  ✘ Nilai atribut id pada elemen yang direferensikan JavaScript
  ✘ Elemen HTML yang sudah ada di starter project (boleh ditambah, jangan dihapus)


================================================================================
🔗 BAB 7: REFERENSI DESAIN MODERN & GRATIS
================================================================================

┌─────────────────────┬──────────────────────────────────┬────────────────────┐
│ Sumber              │ Fokus                            │ Tautan             │
├─────────────────────┼──────────────────────────────────┼────────────────────┤
│ UI Design Daily     │ Inspirasi desain per komponen    │ uidesigndaily.com  │
│                     │ gratis                           │                    │
├─────────────────────┼──────────────────────────────────┼────────────────────┤
│ CodePen             │ Koleksi elemen interaktif        │ codepen.io         │
│                     │ HTML/CSS                         │                    │
├─────────────────────┼──────────────────────────────────┼────────────────────┤
│ SiteInspire         │ Kurasi desain web bersih &       │ siteinspire.com    │
│                     │ realistis                        │                    │
├─────────────────────┼──────────────────────────────────┼────────────────────┤
│ Behance             │ Portofolio desain produk tanpa   │ behance.net        │
│                     │ login                            │                    │
├─────────────────────┼──────────────────────────────────┼────────────────────┤
│ Material Design 3   │ Panduan antarmuka Google +       │ m3.material.io     │
│                     │ palet warna                      │                    │
├─────────────────────┼──────────────────────────────────┼────────────────────┤
│ Ant Design          │ Komponen antarmuka untuk         │ ant.design         │
│                     │ aplikasi finansial               │                    │
├─────────────────────┼──────────────────────────────────┼────────────────────┤
│ Awwwards            │ Website terbaik dunia dengan     │ awwwards.com       │
│                     │ animasi modern                   │                    │
└─────────────────────┴──────────────────────────────────┴────────────────────┘

💡 Saran pencarian: Gunakan kata kunci "finance", "expense", atau "dashboard"
   di UI Design Daily atau CodePen.


================================================================================
🌐 BAB 8: CONTOH APLIKASI JADI
================================================================================

Anda bisa melihat referensi aplikasi yang sudah jadi di link berikut:

  >>> https://expense-tracker-dicoding.netlify.app/ <<<


================================================================================
📁 BAB 9: STRUKTUR BERKAS STARTER PROJECT
================================================================================

expense-tracker-starter-project/
│
├── index.html      ← Struktur halaman (jangan diubah, kecuali greeting)
├── style.css       ← Tampilan visual (bebas dimodifikasi)
├── main.js         ← Tempat menulis seluruh logika JavaScript
└── README.md       ← Panduan ini


================================================================================
🚀 BAB 10: CARA MENJALANKAN PROYEK
================================================================================

OPSI 1 (Disarankan) — Live Server di VS Code
--------------------------------------------
  1. Klik kanan pada index.html
  2. Pilih "Open with Live Server"
  3. Browser terbuka otomatis di http://127.0.0.1:5500

OPSI 2 — Langsung buka file
---------------------------
  Klik dua kali index.html dari File Explorer


================================================================================
✅ BAB 11: RINGKASAN CHECKLIST WAJIB (REVIEW MANDIRI)
================================================================================

Sebelum submit, pastikan semua checklist berikut terpenuhi:

  ☐ Memanipulasi DOM untuk Form dan Daftar Transaksi
  ☐ Mengelola Penyimpanan Data (Web Storage API)
  ☐ Fitur Interaktif (Pindah Kategori dan Pencarian)
  ☐ Greeting sudah diisi nama + username Dicoding (contoh: Budi (bdi002))
  ☐ Tidak menggunakan innerHTML += saat menambah kartu transaksi
  ☐ Semua data-testid sesuai dengan ketentuan
  ☐ Tombol Hapus, Edit, Ubah Tipe berfungsi
  ☐ Pencarian berfungsi dan bisa kembali ke semua data saat dikosongkan


================================================================================
📘 PENUTUP
================================================================================

Selamat mengerjakan & semoga sukses menjadi Front-End Web Developer!

"Koding bukan hanya tentang menulis kode, tetapi tentang memecahkan masalah
 dan menciptakan solusi yang bermanfaat."

================================================================================
                        # SEMANGAT! # 
================================================================================


================================================================================
🌟 BAB 12: BEYOND SUBMISSION (FASE 3 - FULL STACK)
================================================================================

Proyek ini dirancang agar mudah diskalakan (*scalable*) melebihi persyaratan
submission standar. Pada "Fase 3", aplikasi berevolusi menjadi platform
Full-Stack dengan arsitektur:

  • Frontend : HTML, CSS, Vanilla JavaScript
  • Backend  : Python (FastAPI)
  • Database : SQLite (Siap migrasi ke MySQL)
  • Security : Autentikasi JWT (JSON Web Tokens) & Password Hashing (Bcrypt)

Langkah ini menunjukkan kompetensi tingkat lanjut (Advanced), tidak hanya pada manipulasi DOM,
tetapi juga integrasi sistem melalui REST API, manajemen state dengan token, dan 
desain arsitektur aplikasi berbasis Client-Server (Multi-User) yang aman.

### 🔑 Cara Menguji Fitur Login (Jika Backend Dinyalakan)
1. Buka aplikasi di browser. Anda akan dicegat oleh **Modal Autentikasi**.
2. Karena belum ada akun *default*, masukkan sembarang *Username* dan *Password* lalu klik tombol **Daftar**.
3. Setelah muncul notifikasi sukses, gunakan data yang sama untuk klik **Login**.
4. Sistem akan menerbitkan JWT Token dan membuka antarmuka *Dashboard* utama.