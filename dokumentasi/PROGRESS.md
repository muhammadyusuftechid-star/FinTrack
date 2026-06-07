# 📊 PROGRESS TRACKER — FinTrack Expense Tracker (Portfolio Edition)
> Update file ini setiap langkah selesai. AI agent baca file ini dulu sebelum mulai kerja.

---

## 🎯 RINGKASAN PROYEK

- **Nama:** FinTrack — Personal Finance & Expense Tracker
- **Platform:** HTML + CSS + Vanilla JavaScript (no framework)
- **Tujuan Awal:** Submission akhir Kelas Front-End Web Pemula Dicoding ✅ SELESAI
- **Tujuan Lanjutan:** Upgrade jadi portfolio project yang layak dipamerin
- **Target Nilai Dicoding:** ⭐⭐⭐⭐⭐ (Advanced semua kriteria) ✅ ACHIEVED
- **Referensi:** https://expense-tracker-dicoding.netlify.app/

---

## 📁 STRUKTUR FILE PROYEK

```
/home/yusuf/projekan/dicoding/
├── index.html        ← Halaman utama (struktur DOM lengkap)
├── style.css         ← Semua styling (clean, human-centered)
├── main.js           ← Semua logika JavaScript
├── README.md         ← Dokumentasi project (untuk GitHub/portfolio)
├── Submission.md     ← Panduan submission (sudah dipenuhi)
├── PROGRESS.md       ← File ini (tracker aktif)
├── SKILL.md          ← Panduan agent AI + arsitektur
└── DESIGN.md         ← Design system & visual guidelines
```

---

## 🚦 STATUS LANGKAH — FASE 1: SUBMISSION DICODING

| # | Langkah | Status | Catatan |
|---|---------|--------|---------|
| 1 | Baca & analisis Submission.md | ✅ SELESAI | |
| 2 | Buat PROGRESS.md + SKILL.md | ✅ SELESAI | |
| 3 | Buat `index.html` (struktur DOM) | ✅ SELESAI | id: incomeList, expenseList, balance, totalIncome, totalExpense, transactionForm, searchInput, greeting |
| 4 | Buat `style.css` (desain premium) | ✅ SELESAI | Clean Slate theme, Plus Jakarta Sans, Material Icons |
| 5 | Buat `main.js` — Data & localStorage | ✅ SELESAI | loadFromStorage, saveToStorage, STORAGE_KEY |
| 6 | Buat `main.js` — Tambah transaksi + render DOM | ✅ SELESAI | createElement/appendChild, incomeList/expenseList |
| 7 | Buat `main.js` — Edit transaksi | ✅ SELESAI | handleEditClick, isi form otomatis, editId state |
| 8 | Buat `main.js` — Hapus transaksi | ✅ SELESAI | handleDelete, filter array |
| 9 | Buat `main.js` — Ubah Tipe (income ↔ expense) | ✅ SELESAI | handleSwitchType, toggle type |
| 10 | Buat `main.js` — Pencarian real-time | ✅ SELESAI | searchInput input event, kosong = tampil semua |
| 11 | Buat `main.js` — Custom Event (dispatchEvent) | ✅ SELESAI | dispatchTransactionUpdated + addEventListener |
| 12 | Hitung & tampilkan saldo dinamis | ✅ SELESAI | updateSummary, balance/totalIncome/totalExpense |
| 13 | Validasi form (alert jika kosong) | ✅ SELESAI | showToast error untuk judul/nominal/tanggal |
| 14 | Final review checklist | ✅ SELESAI | 10/10 test PASS — browser verified, 0 JS error |

---

## 🚀 FASE 2: PORTFOLIO UPGRADE — FITUR TAMBAHAN

> Fitur-fitur ini TIDAK mengubah data-testid/id yang sudah ada.
> Semua ditambahkan secara additive — aman untuk submission yang sudah lulus.

| # | Fitur | Status | Prioritas | File Terdampak |
|---|-------|--------|-----------|----------------|
| P1 | **Kategori Transaksi** — dropdown: Makanan, Transport, Gaji, dll | ✅ SELESAI | 🔴 Tinggi | index.html, main.js, style.css |
| P2 | **Filter & Sort** — by tanggal, jumlah, tipe, kategori | ✅ SELESAI | 🔴 Tinggi | index.html, main.js |
| P3 | **Filter by Bulan/Tahun** — tampilkan data bulan tertentu | ✅ SELESAI | 🔴 Tinggi | index.html, main.js |
| P4 | **Grafik Ringkasan** — bar/donut chart native Canvas API | ✅ SELESAI | 🔴 Tinggi | index.html, main.js, style.css |
| P5 | **Export CSV** — download semua transaksi jadi .csv | ✅ SELESAI | 🟡 Sedang | main.js |
| P6 | **Budget Limit** — set batas pengeluaran bulanan + warning | ✅ SELESAI | 🟡 Sedang | index.html, main.js, style.css |
| P7 | **Dark/Light Mode Toggle** — simpan preferensi ke localStorage | ✅ SELESAI | 🟡 Sedang | index.html, main.js, style.css |
| P8 | **Confirm Dialog Hapus** — modal konfirmasi sebelum hapus | ✅ SELESAI | 🟢 Rendah | index.html, main.js, style.css |
| P9 | **Keyboard Shortcuts** — N = baru, Esc = batal, Enter = simpan | ✅ SELESAI | 🟢 Rendah | main.js |
| P10 | **Print Summary** — window.print() dengan layout khusus | ✅ SELESAI | 🟢 Rendah | style.css (print media query) |

---

## 🐍 FASE 3: FULL-STACK INTEGRATION (Python FastAPI + MySQL)

> Mengubah aplikasi dari penyimpanan lokal (Browser) menjadi sistem berbasis Cloud.

| # | Fitur | Status | Prioritas | File Terdampak |
|---|-------|--------|-----------|----------------|
| B1 | **Setup Database & Backend** — Instalasi FastAPI, Uvicorn, & MySQL | ✅ SELESAI | 🔴 Tinggi | (Backend Repo) |
| B2 | **Database Models** — Tabel Users, Transactions (SQLAlchemy) | ✅ SELESAI | 🔴 Tinggi | (Backend Repo) |
| B3 | **REST API Endpoint (CRUD)** — API untuk Get, Post, Put, Delete | ✅ SELESAI | 🔴 Tinggi | (Backend Repo) |
| B4 | **Frontend Refactor** — Ganti `localStorage` dengan `fetch()` API | ✅ SELESAI | 🔴 Tinggi | main.js |
| B5 | **Sistem Autentikasi** — Login/Register, JWT Token (Multi-User) | ✅ SELESAI | 🟡 Sedang | index.html, main.js, Backend |

---

## 🔑 ATURAN WAJIB — JANGAN DIUBAH (Submission Constraints)

### data-testid yang TIDAK BOLEH DIUBAH:
```html
data-testid="transactionItem"
data-testid="transactionItemTitle"
data-testid="transactionItemAmount"
data-testid="transactionItemDate"
data-testid="transactionItemType"
data-testid="transactionItemEditTypeButton"
data-testid="transactionItemDeleteButton"
```

### ID HTML yang TIDAK BOLEH DIUBAH:
```
#incomeList        → container kartu pemasukan
#expenseList       → container kartu pengeluaran
#balance           → tampilan saldo
#totalIncome       → tampilan total pemasukan
#totalExpense      → tampilan total pengeluaran
#transactionForm   → form transaksi
#searchInput       → input pencarian
#greeting          → teks greeting
```

### Struktur objek transaksi (CORE — tetap sama):
```js
{
  id: +new Date(),          // number unik
  title: "string",
  amount: 10000,            // number, BUKAN string
  date: "2026-06-07",       // string format YYYY-MM-DD
  type: "income"            // "income" | "expense"
}
```

### Struktur objek transaksi (EXTENDED — untuk portfolio):
```js
{
  id: +new Date(),
  title: "string",
  amount: 10000,
  date: "2026-06-07",
  type: "income",
  category: "Gaji",         // NEW: kategori transaksi
  note: "string"            // NEW: catatan opsional
}
```

---

## 📋 CHECKLIST SUBMISSION (SEMUA ✅)
- [x] Memanipulasi DOM untuk Form dan Daftar Transaksi
- [x] Mengelola Penyimpanan Data (Web Storage API / localStorage)
- [x] Fitur Interaktif (Pindah Kategori dan Pencarian)
- [x] Greeting sudah diisi nama + username Dicoding
- [x] Tidak menggunakan `innerHTML +=` saat menambah kartu transaksi
- [x] Semua data-testid sesuai ketentuan
- [x] Tombol Hapus, Edit, Ubah Tipe berfungsi
- [x] Pencarian berfungsi dan bisa kembali ke semua data saat dikosongkan

---

## 📌 CATATAN TEKNIS

- Gunakan `+new Date()` untuk ID unik
- `amount` harus disimpan sebagai Number, bukan string
- `type`: gunakan nilai `'income'` dan `'expense'`
- Saldo = total income - total expense (tampilkan dinamis)
- Custom Event = `dispatchEvent(new CustomEvent('nama-event', { detail: data }))`
- Jangan hapus elemen HTML yang sudah ada di starter
- STORAGE_KEY = `'fintrack_transactions'`

---

## 🎯 URUTAN PENGERJAAN FASE 2 (REKOMENDASI)

Urutan optimal untuk portfolio impact tertinggi:
1. **P3** (Filter Bulan) → paling diminta, simple
2. **P4** (Grafik Chart) → paling "wow" secara visual
3. **P1** (Kategori) → tambah nilai fungsional
4. **P2** (Filter & Sort) → lengkapi dengan kategori
5. **P7** (Dark Mode) → kesan polished
6. **P5** (Export CSV) → kesan professional
7. **P6** (Budget Limit) → advanced feature
8. **P8–P10** (Polish features)

---

## 🎯 URUTAN PENGERJAAN FASE 3 (FULL-STACK PYTHON)

Fase ini mengubah status proyek dari statis (Frontend-only) menjadi aplikasi *Production-Ready*.
1. **B1 & B2**: Menyiapkan pondasi Database MySQL/SQLite dan ORM SQLAlchemy.
2. **B3**: Mengekspos API CRUD untuk data transaksi.
3. **B4**: Memotong ketergantungan *Frontend* terhadap *LocalStorage*, menggantinya dengan `fetch()` REST API.
4. **B5**: Menyuntikkan JWT Authentication, sehingga aplikasi mendukung sistem *Multi-User* yang aman.

---

## 🔑 CARA MENGUJI FITUR LOGIN (TESTING)
1. **Tidak ada akun bawaan (default)**.
2. Anda harus membuat akun baru dengan mengisi *Username* dan *Password*, lalu mengklik **Daftar**.
3. Setelah muncul pesan sukses, masukkan kembali *Username* dan *Password* tersebut lalu klik **Login**.
4. Anda akan langsung masuk ke Dashboard utama dan siap menambahkan data!

---
_Terakhir diupdate: Fase 1 (Submission), Fase 2 (Portfolio), & Fase 3 (Full-Stack) ✅ SELESAI 100%_
