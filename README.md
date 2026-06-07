# 💸 FinTrack — Personal Expense Tracker

![FinTrack Banner](https://img.shields.io/badge/FinTrack-Portfolio_Project-blue?style=for-the-badge) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Aplikasi pencatat keuangan pribadi modern berskala *Full-Stack* yang dikembangkan dari sebuah proyek **Submission Akhir (Dicoding Front-End Web Pemula)** menjadi sebuah **Aplikasi Portfolio Kelas Produksi**.

---

## ✨ Fitur Unggulan

Proyek ini telah berevolusi melewati 3 fase pengembangan utama:

### Fase 1: Core Submission (Dicoding DOM) ✅
- **CRUD Transaksi**: Tambah, Edit, Hapus, dan Ubah Tipe (Pemasukan ↔ Pengeluaran).
- **Sinkronisasi Real-Time**: Pembaruan antar elemen UI menggunakan *Custom Event API*.
- **Live Search**: Pencarian transaksi secara instan berdasarkan judul.
- **Kepatuhan Mutlak**: Melewati semua tes Dicoding (tanpa mengubah `data-testid` atau menggunakan *library* eksternal).

### Fase 2: Portfolio Upgrade (UI/UX) ✅
- **Visualisasi Data**: Grafik *Doughnut* dan *Line Chart* interaktif menggunakan Canvas API.
- **Dark/Light Mode**: Tema yang menyesuaikan preferensi mata pengguna (tersimpan di pengaturan lokal).
- **Budget Bulanan**: Atur target pengeluaran dan pantau melalui *Progress Bar* (indikator warna dinamis).
- **Export Data**: Unduh seluruh rekap transaksi ke dalam format `.CSV`.
- **Keyboard Shortcuts**: Navigasi cepat menggunakan tombol `N` (Tambah baru) dan `/` (Pencarian).
- **Print Layout**: Tata letak rapi yang siap dicetak di atas kertas kosong (*media query print*).

### Fase 3: Full-Stack Architecture (Python & SQLite) ✅
- **Sistem Autentikasi**: *Login* dan *Register* terenkripsi (JSON Web Tokens & Bcrypt).
- **REST API Backend**: Dibangun menggunakan *FastAPI* (Python).
- **Manajemen Database**: *Object-Relational Mapping (ORM)* menggunakan *SQLAlchemy* (dukungan instan dari SQLite ke MySQL).
- **Fetch API Integration**: Modifikasi 100% *Vanilla JavaScript* untuk membaca/menulis data ke peladen (*server*) secara *asynchronous*, menggantikan *LocalStorage*.

---

## 🛠️ Teknologi yang Digunakan

### Frontend
- **HTML5 & CSS3** — Desain semantik, CSS Variables, Flexbox, & Grid.
- **Vanilla JavaScript (ES6+)** — Arsitektur berbasis komponen tanpa *framework*, Fetch API, Custom Events.
- **Chart.js** — Visualisasi analitik data keuangan.

### Backend
- **Python 3** — Bahasa inti peladen.
- **FastAPI** — Kerangka kerja asinkron super cepat.
- **SQLAlchemy** — ORM untuk interaksi basis data tanpa bahasa SQL mentah.
- **PassLib & Jose** — Sistem keamanan (Hashing & JWT).

---

## 📁 Struktur Direktori

```text
/
├── index.html              # Struktur Utama UI
├── style.css               # Gaya Visual Utama & Tema
├── main.js                 # Logika Antarmuka (Fetch, DOM, Events)
├── backend/                # [Folder Mesin Backend]
│   ├── main.py             # Endpoint API FastAPI
│   ├── models.py           # Skema Tabel Database (SQLAlchemy)
│   ├── schemas.py          # Validasi Input/Output (Pydantic)
│   └── auth.py             # Logika Enkripsi & JWT
└── dokumentasi/            # Panduan Proyek Lanjutan
    ├── PROGRESS.md         # Catatan Evolusi Proyek
    ├── SKILL.md            # Dokumentasi Teknis Internal
    ├── DESIGN.md           # Sistem Desain Visual
    └── Submission.md       # Spesifikasi Dicoding
```

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini menggunakan model *Client-Server*, sehingga Anda perlu menjalankan peladen (Backend) dan penampil (Frontend).

### Langkah 1: Jalankan Backend (FastAPI)
1. Buka terminal dan arahkan ke folder `backend`.
2. Aktifkan *Virtual Environment*:
   - Linux/Mac: `source venv/bin/activate`
   - Windows: `venv\Scripts\activate`
3. Jalankan peladen (di Port 8089 atau 8000 bebas):
   ```bash
   uvicorn main:app --reload --port 8089
   ```

### Langkah 2: Jalankan Frontend (Browser)
1. Jika menggunakan **VS Code**, klik kanan pada file `index.html` dan pilih **"Open with Live Server"**.
2. Atau jalankan *Local Server* mandiri (contoh: Python HTTP Server) pada *root folder* proyek:
   ```bash
   python3 -m http.server 5500
   ```
3. Buka peramban (browser) di alamat peladen tersebut (Contoh: `http://localhost:5500`).

### Langkah 3: Pengujian (Testing)
- Karena tidak ada akun bawaan demi keamanan aplikasi, Anda akan dicegat oleh **Modal Login**.
- **Buat Akun Baru**: Masukkan *Username* dan *Password*, lalu klik tombol **Daftar**.
- Setelah notifikasi hijau muncul, gunakan data yang sama lalu klik tombol **Login**.
- Anda berhasil masuk! Dasbor keuangan kini terhubung secara *real-time* ke sistem *cloud lokal* (SQLite).

---

*Dibuat dengan ❤️ sebagai bukti keterampilan transisi dari Front-End Pemula menjadi Full-Stack Engineer.*
