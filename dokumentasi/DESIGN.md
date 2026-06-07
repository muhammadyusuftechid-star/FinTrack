# DESIGN.md — FinTrack UI/UX & Technical Specifications

---

## 🎯 FILOSOFI DESAIN

Desain **FinTrack** ini mengadaptasi gaya UI modern dan profesional, terinspirasi oleh standar aplikasi enterprise terkemuka. Tema visual ini menggabungkan warna-warna yang bersih, tipografi yang rapi (Plus Jakarta Sans), serta penggunaan icon standar Material Design. 
Tujuan utamanya adalah memberikan **Human-Centered Experience** yang profesional, bersih, serta fokus pada produktivitas pengguna.

### Prinsip Utama:
1. **Corporate & Professional Aesthetic** — Tampilan formal dengan *soft gradients* dan perpaduan warna biru korporat.
2. **Clear Information Hierarchy** — Grid-based layout dengan pemisahan fungsional yang jelas.
3. **High Accessibility** — Penggunaan font yang mudah dibaca (*Plus Jakarta Sans*) dan tingkat kontras warna yang baik.
4. **Micro-interactions** — Hover states, focus rings, dan animasi transisi ringan untuk memberikan *feedback* pengguna.

---

## 🎨 PALET WARNA (Tailwind / Custom Design System)

Aplikasi FinTrack menggunakan *Design System* warna berikut yang dikonfigurasi melalui Tailwind CSS:

- **Primary:** `#004ac6` (Biru Utama)
- **Primary Hover:** `#003ea8`
- **Surface / Background:** `#f8f9ff` (Abu-abu kebiruan terang)
- **Card Background:** `#ffffff`
- **Border Light:** `#E5E7EB`
- **Text Main (On-Surface):** `#121c2a` (Charcoal gelap)
- **Text Muted:** `#6B7280`
- **Text Tertiary:** `#9CA3AF`
- **Income (Secondary):** `#006c4a` (Emerald Solid)
- **Expense (Error/Tertiary):** `#ba1a1a` (Merah Solid)

---

## ✍️ TIPOGRAFI

```text
Font Utama : 'Plus Jakarta Sans', sans-serif (Google Fonts)
Fallback   : system-ui, -apple-system

Ukuran Font Utama:
- Display Large (Heading) : 28px, weight 700
- Display Medium          : 22px, weight 700
- Logo                    : 18px, weight 700
- Headline Small          : 15px, weight 600
- Body Medium             : 14px, weight 400
- Body Small              : 12px, weight 400
- Label Medium            : 13px, weight 500
- Label Small             : 11px, weight 600, letter-spacing 0.06em
```

---

## 🗂️ STRUKTUR HALAMAN & LAYOUT

Aplikasi FinTrack membagi interaksi dalam beberapa halaman terpisah dengan alur yang jelas.

### 1. Sistem Autentikasi (Multi-page)
Semua halaman autentikasi ditempatkan secara *centered* dengan latar belakang `bg-background` yang tenang dan menampilkan card form autentikasi di tengah layar.

**A. Halaman Login (`login.html`)**
- Logo & Judul "Welcome Back".
- Form Input: Username & Password.
- Fitur Tambahan: "Show/Hide Password" toggle dengan icon `visibility`.
- Aksi Utama: Tombol "Login" (Primary).
- Footer Link: "Lupa Password?" dan "Daftar Akun Baru".

**B. Halaman Register (`register.html`)**
- Logo & Judul "Create Account".
- Form Input: Username, Password, Confirm Password.
- Fitur Tambahan: "Show/Hide Password" toggle pada setiap field password.
- Aksi Utama: Tombol "Create Account" (Primary) dengan icon `arrow_forward`.
- Footer Link: "Log in here".

**C. Halaman Lupa Password (`forgot-password.html`)**
- Logo & Judul "Lupa Password?".
- Teks Penjelasan: "Jangan khawatir! Masukkan username Anda..."
- Form Input: Username.
- Aksi Utama: Tombol "Pulihkan Password" (Primary) dengan icon `lock_reset`.
- Footer Link: "Kembali ke halaman Login".

### 2. Halaman Dashboard Utama (`index.html`)

Dashboard mengusung **Desktop SideNavBar** di kiri dan **Workspace** 2-kolom di kanan.

```text
┌────────────────────────────────────────────────────────┐
│ ┌──────────────┐ ┌───────────────────────────────────┐ │
│ │ FinTrack     │ │ Overview (This Month ▼)           │ │
│ │              │ ├───────────────────────────────────┤ │
│ │ Welcome back │ │ [ Balance ] [ Income ] [ Expense] │ │
│ │              │ ├───────────────────────────────────┤ │
│ │ [ Dashboard] │ │ [ Cash Flow Chart ] [ Donut ]     │ │
│ │ [ Analytics] │ ├──────────────┬────────────────────┤ │
│ │ [ Transact ] │ │ Quick Entry  │ Recent Transactions│ │
│ │ [ Settings ] │ │ (Type Toggle)│ (Search, Filters)  │ │
│ │ [ Logout   ] │ │ Title        │ [ Tx Item 1 ]      │ │
│ │              │ │ Amount       │ [ Tx Item 2 ]      │ │
│ │              │ │ Category     │ [ Tx Item 3 ]      │ │
│ │              │ │ Date         │                    │ │
│ │              │ │ [ Save ]     │ [ View All ]       │ │
│ └──────────────┘ └──────────────┴────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

**Fitur UI Dashboard:**
- **Sidebar Kiri:** Navigasi menetap dengan Profile indikator dan tombol "Logout".
- **Summary Cards:** Tiga kartu berisi Saldo, Pemasukan, dan Pengeluaran dengan icon indikator tren.
- **Visualisasi Chart:** Bar chart aliran kas mingguan dan Donut chart pengeluaran berdasarkan kategori menggunakan Chart.js / Vanilla Canvas.
- **Workspace Interaktif:**
  - **Quick Entry (Kiri):** Form input vertikal untuk menambahkan transaksi (Pengeluaran/Pemasukan toggle, Nominal, Kategori, Tanggal).
  - **Daftar Transaksi (Kanan):** Unified list untuk seluruh transaksi dengan filter, search, dan sort. Transaksi ditampilkan lengkap dengan icon kategori dan badge status.

---

## 🛠️ INTERAKSI & PENGALAMAN PENGGUNA (UX)

- **Toast Notifications:** Feedback real-time diletakkan di sudut kanan bawah (hijau untuk sukses, merah untuk error) agar pengguna mendapat kepastian dari setiap aksinya.
- **Konfirmasi Hapus:** Modal sentral dengan blur overlay `bg-on-background/50` dan efek transisi skala `scale-95 to scale-100` saat merender peringatan hapus transaksi.
- **Edit Inline:** Mengklik icon pensil pada item transaksi secara otomatis akan memuat data ke "Quick Entry" form dan mengubah mode tombol submit menjadi "Simpan Perubahan".
- **Real-Time Calculation:** Saldo, total, dan daftar transaksi secara instan dirender ulang (DOM manipulation efisien melalui Custom Event Listener) setiap kali ada data baru / penghapusan.

---
