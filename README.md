# 💸 FinTrack — Personal Expense Tracker

![FinTrack](https://img.shields.io/badge/FinTrack-Portfolio_Project-2563EB?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![SQLite](https://img.shields.io/badge/SQLite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Aplikasi pencatat keuangan pribadi modern berskala *Full-Stack* — dikembangkan dari **Submission Akhir Dicoding Front-End Web Pemula** menjadi **Aplikasi Portfolio Kelas Produksi**.

---

## ✨ Fitur Unggulan

### 🎯 Fase 1 — Core Submission (Dicoding DOM) ✅
- **CRUD Transaksi** — Tambah, Edit, Hapus, dan Ubah Tipe (Pemasukan ↔ Pengeluaran)
- **Sinkronisasi Real-Time** — Pembaruan UI via *Custom Event API*
- **Live Search** — Pencarian transaksi instan berdasarkan judul
- **Kepatuhan Penuh** — Melewati semua tes Dicoding tanpa menggunakan library eksternal

### 🚀 Fase 2 — Portfolio Upgrade (UI/UX) ✅
- **Visualisasi Data** — Bar chart & Donut chart interaktif via Canvas API
- **Export CSV** — Unduh seluruh rekap transaksi ke file `.csv`
- **Filter & Sort** — Filter berdasarkan bulan, kategori, dan urutan nominal/tanggal
- **Keyboard Shortcuts** — Navigasi cepat `N` (tambah) dan `/` (pencarian)

### 🔐 Fase 3 — Full-Stack Architecture ✅
- **Sistem Autentikasi** — Login & Register dengan JWT + Bcrypt
- **REST API Backend** — Dibangun menggunakan *FastAPI* (Python)
- **Database ORM** — *SQLAlchemy* dengan SQLite (mudah migrasi ke MySQL/PostgreSQL)
- **Fetch API** — 100% Vanilla JS asynchronous, menggantikan LocalStorage
- **Docker Ready** — Siap dikontainerisasi dengan `docker-compose`

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | HTML5, Vanilla CSS, JavaScript (ES6+) |
| **Charts** | Canvas API (native) |
| **Backend** | Python 3, FastAPI, Uvicorn |
| **Database** | SQLite via SQLAlchemy ORM |
| **Auth** | JWT (python-jose) + Bcrypt (passlib) |
| **Container** | Docker & Docker Compose |

---

## 📁 Struktur Direktori

```text
FinTrack/
├── frontend/                   # Antarmuka pengguna
│   ├── index.html              # Dashboard utama
│   ├── login.html              # Halaman login
│   ├── register.html           # Halaman registrasi
│   ├── forgot-password.html    # Halaman lupa password
│   └── assets/
│       ├── css/style.css       # Gaya visual utama
│       └── js/
│           ├── main.js         # Logika dashboard (CRUD, Chart, Events)
│           └── auth.js         # Logika autentikasi
├── backend/                    # Mesin server
│   ├── main.py                 # Endpoint REST API (FastAPI)
│   ├── models.py               # Skema tabel database (SQLAlchemy)
│   ├── schemas.py              # Validasi data (Pydantic)
│   ├── auth.py                 # Enkripsi & JWT
│   ├── requirements.txt        # Dependensi Python
│   └── Dockerfile              # Image Docker backend
├── docker-compose.yml          # Orkestrasi container
└── README.md
```

---

## 🚀 Cara Menjalankan

### Metode 1 — Manual (Tanpa Docker)

**Step 1 — Jalankan Backend**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8089
```
Backend berjalan di → `http://localhost:8089`

**Step 2 — Jalankan Frontend**
```bash
cd frontend
python3 -m http.server 5050
```
Buka browser di → `http://localhost:5050`

### Metode 2 — Docker Compose

```bash
docker-compose up --build
```

---

## 🔑 Cara Mulai Menggunakan

1. Buka `http://localhost:5050` di browser
2. Klik **Daftar** → buat akun baru (username + password)
3. Login dengan akun yang telah dibuat
4. Mulai catat pemasukan dan pengeluaran Anda!

---

## 📸 Tampilan Aplikasi

| Halaman | Deskripsi |
|---|---|
| **Dashboard** | Top navbar, summary cards, bar chart, donut chart, form transaksi & riwayat |
| **Login** | Form autentikasi dengan JWT |
| **Register** | Pembuatan akun baru |

---

*Dibuat dengan ❤️ sebagai bukti keterampilan transisi dari Front-End Pemula menjadi Full-Stack Engineer.*
