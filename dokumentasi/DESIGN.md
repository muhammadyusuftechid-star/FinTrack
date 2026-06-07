# DESIGN.md — FinTrack Expense Tracker (Portfolio Edition)
## Panduan Desain Visual — Human-Centered, Clean, Professional

---

## 🎯 FILOSOFI DESAIN

Desain ini terinspirasi dari aplikasi keuangan populer seperti **Wallet**, **Notion**, **Linear**, dan **Monzo** — bukan dari template AI generic.
Tujuan: terasa **dipikir oleh manusia**, bersih, profesional, dan siap dipamerin sebagai portfolio.

### Prinsip Utama:
1. **Clarity over decoration** — setiap elemen ada tujuannya
2. **Consistent spacing** — grid 8px, gaps 16px/24px
3. **Accessible colors** — contrast ratio ≥ 4.5:1 (WCAG AA)
4. **Purposeful animation** — hanya jika menambah konteks, bukan dekorasi

Ciri desain yang dihindari:
- Glassmorphism berlebihan (blur + transparan tumpuk-tumpuk)
- Warna neon yang terlalu kontras (hijau/ungu mencolok di atas hitam pekat)
- Terlalu banyak emoji di judul/tombol
- Gradient yang terlalu dramatic
- Animasi berlebihan yang tidak ada konteksnya

---

## 🎨 PALET WARNA

### Light Mode (Default) — Clean Slate Theme
Terinspirasi dari **Notion**, **Linear**, dan **Monzo**.

```
Background utama   : #F7F8FA   (abu sangat muda, bukan putih murni)
Background card    : #FFFFFF   (putih bersih)
Border             : #E5E7EB   (abu terang, subtle)
Sidebar/Header     : #1F2937   (charcoal gelap — bukan hitam pekat)

Primary            : #2563EB   (biru solid, bukan neon)
Primary hover      : #1D4ED8
Primary bg         : #EFF6FF   (biru sangat pucat untuk chip/badge)

Income/Hijau       : #059669   (emerald — earth-tone, bukan neon)
Income bg          : #ECFDF5   (hijau sangat pucat)
Expense/Merah      : #DC2626   (merah solid — bukan coral/pink)
Expense bg         : #FEF2F2   (merah sangat pucat)

Teks utama         : #111827   (hampir hitam)
Teks sekunder      : #6B7280   (abu medium)
Teks tersier       : #9CA3AF   (abu muda)
```

### Dark Mode (Portfolio Feature P7) — Slate Night Theme
```
Background utama   : #0F172A   (slate-900)
Background card    : #1E293B   (slate-800)
Border             : rgba(255,255,255,0.08)
Header             : #0F172A
Surface elevated   : #334155   (slate-700)

Primary            : #3B82F6   (biru lebih terang di dark)
Income             : #10B981   (emerald lebih cerah di dark)
Expense            : #EF4444   (merah lebih cerah di dark)

Teks utama         : #F1F5F9   (slate-100)
Teks sekunder      : #94A3B8   (slate-400)
Teks tersier       : #64748B   (slate-500)
```

### Implementasi CSS Variables:
```css
:root {
  --bg: #F7F8FA;
  --surface: #FFFFFF;
  --border: #E5E7EB;
  --primary: #2563EB;
  --primary-hover: #1D4ED8;
  --primary-bg: #EFF6FF;
  --income: #059669;
  --income-bg: #ECFDF5;
  --expense: #DC2626;
  --expense-bg: #FEF2F2;
  --text: #111827;
  --text-muted: #6B7280;
  --text-tertiary: #9CA3AF;
  --header-bg: #1F2937;
}

[data-theme="dark"] {
  --bg: #0F172A;
  --surface: #1E293B;
  --border: rgba(255, 255, 255, 0.08);
  --primary: #3B82F6;
  --primary-bg: rgba(59, 130, 246, 0.15);
  --income: #10B981;
  --income-bg: rgba(16, 185, 129, 0.1);
  --expense: #EF4444;
  --expense-bg: rgba(239, 68, 68, 0.1);
  --text: #F1F5F9;
  --text-muted: #94A3B8;
  --text-tertiary: #64748B;
  --header-bg: #0F172A;
}
```

**Tidak menggunakan:**
- Hitam pekat (#000, #080b14)
- Neon green (#00d9a3)
- Neon purple (#6c63ff)
- Background opacity blur (glassmorphism) — kecuali dark mode overlay modal

---

## ✍️ TIPOGRAFI

```
Font utama : 'Plus Jakarta Sans' (Google Fonts)
Fallback   : system-ui, -apple-system, sans-serif

Ukuran:
- App name/Logo   : 18px, weight 700
- Heading section : 15px, weight 600, color --text
- Nilai saldo     : 28px, weight 700
- Nilai summary   : 22px, weight 700
- Body normal     : 14px, weight 400
- Label form      : 13px, weight 500, uppercase, letter-spacing 0.04em
- Badge/chip      : 11px, weight 600, uppercase, letter-spacing 0.06em
- Teks kecil      : 12px, weight 400, color --text-muted

Line-height: 1.5 (standar)
Letter-spacing: normal (tidak ada tracking berlebihan)
```

---

## 📐 LAYOUT & SPACING

```
Max-width container : 920px (diperlebar dari 860px untuk fitur baru)
Gutter/padding      : 24px (desktop), 16px (mobile)
Border-radius card  : 10px (bukan 24px — lebih formal)
Border-radius input : 7px
Border-radius tombol: 7px
Border-radius badge : 5px
Border-radius pill  : 50px (untuk search bar & tag)
Gap antar elemen    : 16px

Shadow card    : 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)
Shadow hover   : 0 4px 12px rgba(0,0,0,0.1)
Shadow focus   : 0 0 0 3px rgba(37,99,235,0.15)
Shadow modal   : 0 20px 60px rgba(0,0,0,0.3)
```

---

## 🗂️ LAYOUT HALAMAN (Updated — Portfolio Edition)

```
┌─────────────────────────────────────────────────────┐
│ HEADER (sticky, charcoal, border-bottom none)        │
│ [💰 FinTrack]        [🌙] [Halo, Yusuf (yusuf123)] │
└─────────────────────────────────────────────────────┘
│
│ ┌── SUMMARY ROW (3 kartu) ──────────────────────────┐
│ │  [Saldo Total] [↑ Pemasukan]  [↓ Pengeluaran]    │
│ └───────────────────────────────────────────────────┘
│
│ ┌── CHART SECTION (Canvas API) ─────────────────────┐
│ │  Bar chart 6 bulan + Donut income vs expense      │
│ └───────────────────────────────────────────────────┘
│
│ ┌── WORKSPACE (2 kolom desktop) ────────────────────┐
│ │ LEFT: FORM CARD                                   │
│ │  [Pemasukan] [Pengeluaran]    ← toggle            │
│ │  Nama Transaksi                                   │
│ │  Jumlah (Rp)  |  Tanggal                          │
│ │  Kategori ↓                                       │
│ │  [  Tambah Transaksi  ]                           │
│ │                                                   │
│ │ RIGHT: FILTER + LISTS                             │
│ │  [🔍 Cari...] [Bulan ▼] [Kategori ▼] [Sort ▼]   │
│ │  [Export CSV] [Set Budget]                        │
│ │  ┌─ Pemasukan ─┐  ┌─ Pengeluaran ─┐             │
│ │  │ [kartu 1]   │  │ [kartu 1]     │             │
│ │  │ [kartu 2]   │  │ [kartu 2]     │             │
│ │  └─────────────┘  └───────────────┘             │
│ └───────────────────────────────────────────────────┘
│
│ ──── FOOTER ─────────────────────────────────────────
│ © 2026 FinTrack · Dibuat oleh Yusuf · Dicoding
```

---

## 🧩 KOMPONEN DETAIL

### Header
```
Background: #1F2937 (charcoal), TIDAK ada border-bottom
Sticky top: 0, z-index: 100
Padding: 14px 24px
Logo: icon 💰 + teks "FinTrack", font 700, warna #FFFFFF
Greeting: teks kecil kanan, warna rgba(255,255,255,0.7)
Dark mode toggle: icon 🌙/☀️, kanan header
TIDAK ada gradient, TIDAK ada blur
```

### Summary Cards
```
3 kartu sejajar (grid 3 kolom)
Background: --surface, border: 1px solid --border, border-radius: 10px
Padding: 20px
Label: 12px uppercase, --text-muted, margin-bottom 6px, letter-spacing 0.05em
Nilai: 22–28px bold
  - Saldo positif: --primary (#2563EB)
  - Saldo negatif: --expense (#DC2626)
  - Pemasukan: --income (#059669)
  - Pengeluaran: --expense (#DC2626)
Icon: Material Symbol di pojok kanan atas, --text-tertiary
Hover: shadow ringan saja, TIDAK ada transform naik
TIDAK ada gradient background, TIDAK ada glow effect
```

### Chart Section (Portfolio Feature P4)
```
Container: --surface, border: 1px solid --border, border-radius: 10px
Padding: 24px
2 panel:
  - Bar chart: pengeluaran 6 bulan terakhir (canvas, 100% width)
  - Donut chart: proporsi income vs expense (canvas, 200x200px)
Warna bar: --income untuk income bars, --expense untuk expense bars
Legenda: dot 8px + label 12px, flex row
TIDAK ada library external (pure Canvas API)
```

### Form Card
```
Background: --surface, border: 1px solid --border
Border-radius: 10px, padding: 24px
Judul form: "Tambah Transaksi" — 15px bold, --text

Input fields:
- Background: --surface, border: 1px solid #D1D5DB
- Border-radius: 7px, padding: 10px 14px
- Font: 14px, --text
- Focus: border-color --primary, box-shadow var(--shadow-focus)
- Dark mode: border rgba(255,255,255,0.15)

Dropdown Kategori:
- Sama styling dengan input
- Dynamic options berdasarkan tipe (income/expense) yang dipilih
- Ikon kecil di sebelah kiri option (via select custom atau native)

Type toggle (existing):
- Active Pemasukan: --income-bg, border --income, teks --income
- Active Pengeluaran: --expense-bg, border --expense, teks --expense
- TIDAK ada scale/transform saat active

Submit button:
- Background: --primary, teks putih, width 100%, height 40px
- Hover: --primary-hover
- TIDAK ada gradient, TIDAK ada glow
```

### Filter Bar (Portfolio Feature P2, P3)
```
Posisi: di atas daftar transaksi, bawah search bar
Layout: flex row, gap 8px, overflow-x: auto (mobile)
Komponen:
  - Dropdown "Bulan": <select> native, 130px lebar
  - Dropdown "Kategori": <select> native, 130px lebar
  - Dropdown "Urutkan": <select> native, 160px lebar
  - Tombol "Export CSV": secondary button, kecil
  - Tombol "Budget": secondary button, kecil

Secondary button style:
  - Background: --surface, border: 1px solid --border
  - Padding: 7px 12px, border-radius: 7px, font 13px
  - Hover: background #F3F4F6 (light) / #334155 (dark)
```

### Transaction Cards (Updated)
```
Background: --surface, border: 1px solid --border
Border-radius: 10px, padding: 16px
TIDAK ada left accent bar
Badge di pojok kanan atas

Layout kartu (updated — tambah kategori):
┌──────────────────────────────── [badge Pemasukan] ┐
│ 🍔 Makan Siang                   [chip: Makanan] │
│ Rp 45.000 (bold, --expense)                      │
│ 7 Jun 2026                                       │
│ [Ubah Tipe]  [Edit]  [Hapus]                     │
└───────────────────────────────────────────────────┘

Icon kategori: Material Symbol 16px, warna --text-muted
Chip kategori: --primary-bg, --primary teks, 10px border-radius
Tanggal: format "7 Jun 2026" (lebih readable dari YYYY-MM-DD)

Tombol aksi:
- Ubah Tipe: --primary-bg, --primary, border #BFDBFE
- Edit: #FFFBEB, #D97706, border #FDE68A
- Hapus: --expense-bg, --expense, border #FECACA
- Ukuran: padding 4px 10px, border-radius 5px, font 12px
- TIDAK ada emoji di tombol
- Hover: border lebih gelap, TIDAK ada glow
```

### Budget Progress Bar (Portfolio Feature P6)
```
Posisi: di summary section, di bawah summary cards
Visible jika: budget limit sudah di-set
Layout:
  "Pengeluaran Bulan Ini: Rp X / Rp Y (Z%)"
  [████████░░░░░░] — progress bar
Warna bar:
  - < 60%: --income (hijau)
  - 60–80%: #F59E0B (kuning/amber)
  - > 80%: --expense (merah)
Animation: bar fill transition 0.6s ease
```

### Modal Confirm Hapus (Portfolio Feature P8)
```
Overlay: rgba(0,0,0,0.5) backdrop
Modal box: --surface, border-radius 12px, padding 24px, max-width 380px
Shadow: 0 20px 60px rgba(0,0,0,0.3)
Judul: "Hapus Transaksi?" 16px bold
Body: "Tindakan ini tidak dapat dibatalkan." 14px --text-muted
Tombol:
  - Batal: secondary (--surface + border)
  - Hapus: --expense background, teks putih
Animation: scale in 0.2s ease
```

### Empty State
```
Icon Material Symbol (sederhana, tidak berlebihan)
Teks "Belum ada transaksi" — 13px --text-muted
TIDAK ada animasi bounce atau pulse
Padding vertikal 40px
```

### Toast/Alert
```
Posisi: bawah kanan, fixed
Background: #1F2937, teks putih, border-radius: 8px
Padding: 12px 16px 12px 14px, font 13px
Left border: 3px solid (hijau=success, merah=error, biru=info, kuning=warning)
Animasi: slide up + fade in (250ms ease)
Auto dismiss: 3000ms
TIDAK ada backdrop-filter/blur
```

---

## ⚡ ANIMASI — MINIMAL & PURPOSEFUL

```
Yang BOLEH ada:
- Hover card: box-shadow ringan (150ms ease) — TIDAK ada transform
- Input focus: border color + shadow ring (150ms ease)
- Toast masuk: translateY(-8px) + opacity 0→1 (250ms ease)
- Kartu baru masuk: fade in opacity 0→1 (200ms ease)
- Budget bar fill: width transition 0.6s ease
- Modal: scale(0.95)→scale(1) + opacity (200ms ease)
- Dark mode toggle: background transition 300ms ease
- Type toggle active: background transition 150ms ease

Yang TIDAK boleh ada:
- Logo bounce
- Kartu slideIn dari bawah (terlalu dramatic)
- Scale/transform naik saat hover
- Animasi background/gradient bergerak
- Pulse/glow effect
- Spinner tanpa konteks loading
```

---

## 📱 RESPONSIVE

```
Desktop (≥ 900px):
- Container max 920px, centered
- Header: 1 baris, logo kiri + greeting kanan
- Summary: 3 kolom
- Chart: 2 panel side by side
- Workspace: 2 kolom (form | search+lists)
- Transaksi: 2 kolom (income | expense)

Tablet (600–900px):
- Summary: 3 kolom (kolom lebih sempit)
- Chart: 2 panel stacked
- Workspace: 1 kolom (form di atas, lists di bawah)
- Transaksi: 2 kolom

Mobile (< 600px):
- Padding: 16px
- Summary: 3 kolom kecil atau 1 kolom stack
- Chart: 1 panel (bar chart saja, donut disembunyikan)
- Form: full width
- Filter bar: scrollable horizontal
- Transaksi: 1 kolom (income dulu, expense bawahnya)
- Tombol filter: text lebih pendek / icon only
```

---

## 🖨️ PRINT STYLES (Portfolio Feature P10)

```css
@media print {
  .app-header,
  .form-section,
  .filter-bar,
  .card-actions,
  .search-wrapper { display: none !important; }

  body { background: white; color: black; }
  .summary-section { break-inside: avoid; }
  .transaction-list { break-inside: auto; }
  .income-card, .expense-card { break-inside: avoid; border: 1px solid #ccc; }
}
```

---

## 🚫 ATURAN KERAS — Hal yang WAJIB DIHINDARI

1. **TIDAK** glassmorphism (backdrop-filter: blur) — kecuali overlay modal
2. **TIDAK** background gelap pekat (#000, #080b14) di light mode
3. **TIDAK** warna neon (neon green, neon purple, neon blue)
4. **TIDAK** gradient warna-warni di background utama
5. **TIDAK** shadow glowing (box-shadow warna neon)
6. **TIDAK** emoji di teks tombol aksi (Hapus, Edit, Ubah Tipe)
7. **TIDAK** animasi bounce/float/pulse pada elemen dekoratif
8. **TIDAK** border-radius terlalu besar (max 12px untuk kartu)
9. **TIDAK** library eksternal (jQuery, Bootstrap, Chart.js, Tailwind)
10. **TIDAK** teks label ALL-CAPS dengan letter-spacing besar di kartu transaksi

---

## ✅ REFERENSI INSPIRASI

- **Notion** — layout bersih, warna netral, tipografi jelas
- **Linear** — minimalis, spacing tepat, no gradient
- **Monzo** — warna income/expense natural, kartu sederhana
- **Splitwise** — kartu transaksi yang readable
- **Wise (TransferWise)** — tabel keuangan yang bersih dan profesional
- **YNAB (You Need A Budget)** — kategori & budget yang intuitif

---

## 📋 CHECKLIST IMPLEMENTASI

### Light Mode (Fase 1 — ✅ SELESAI):
- [x] Font 'Plus Jakarta Sans' di-import dari Google Fonts
- [x] Background halaman #F7F8FA (bukan hitam)
- [x] Header charcoal (#1F2937) dengan teks putih
- [x] Summary cards: border tipis, shadow minimal
- [x] Input fields: border solid, TIDAK ada background warna
- [x] Tombol submit: warna solid (bukan gradient)
- [x] Kartu transaksi: border tipis, tanpa accent bar, tanpa glow
- [x] Tidak ada animasi dekoratif
- [x] Semua hover effect: shadow saja, bukan transform

### Portfolio Upgrade (Fase 2 — ✅ SELESAI):
- [x] CSS Variables untuk semua warna (light + dark)
- [x] Dark mode via `[data-theme="dark"]` attribute
- [x] Chart section dengan Canvas API
- [x] Filter bar (bulan, kategori, sort)
- [x] Dropdown kategori di form
- [x] Export CSV button + logic
- [x] Budget limit bar
- [x] Modal konfirmasi hapus
- [x] Keyboard shortcuts
- [x] Print media query

### Full-Stack Architecture (Fase 3 — ✅ SELESAI):
- [x] **Authentication UI**: Modal layar penuh (`.modal-overlay.show`) menyembunyikan `<main>` agar pengguna fokus mendaftar/masuk (Mencegah Dashboard Flash).
- [x] Card-Style Form yang bersih dengan sudut membulat dan dua tombol (Primary Login, Secondary Daftar).

---
_File ini adalah panduan desain visual untuk FinTrack._
_Terakhir diupdate: Fase 3 (Full-Stack & Authentication UI)._
