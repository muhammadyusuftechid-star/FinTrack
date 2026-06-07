// main.js — FinTrack Expense Tracker
// Logika aplikasi: CRUD transaksi, localStorage, Custom Event, pencarian

'use strict';

/* ============================================================
   1. KONSTANTA & STATE GLOBAL
   ============================================================ */

// Gunakan REST API backend Python
const API_BASE_URL = 'http://127.0.0.1:8089/api';

const CATEGORIES = {
  income: ['Gaji', 'Freelance', 'Investasi', 'Bisnis', 'Bonus', 'Lainnya'],
  expense: ['Makanan', 'Transport', 'Belanja', 'Tagihan', 'Hiburan', 'Kesehatan', 'Pendidikan', 'Lainnya']
};

const CATEGORY_ICONS = {
  'Gaji': 'payments', 'Freelance': 'computer', 'Investasi': 'trending_up', 'Bisnis': 'store', 'Bonus': 'card_giftcard',
  'Makanan': 'restaurant', 'Transport': 'directions_car', 'Belanja': 'shopping_bag', 'Tagihan': 'receipt',
  'Hiburan': 'movie', 'Kesehatan': 'health_and_safety', 'Pendidikan': 'school', 'Lainnya': 'more_horiz'
};

/** @type {Array<{id:number, title:string, amount:number, date:string, type:string, category:string}>} */
let transactions = [];

let editId = null;
let searchQuery = '';
let filterMonth = '';
let filterCategory = '';
let sortBy = 'date-desc';

/** P6: Budget Bulanan */
let monthlyBudget = 0;
let deleteCandidateId = null;
let authToken = localStorage.getItem('fintrack_token') || null;
let loggedInUser = localStorage.getItem('fintrack_user') || null;

/* ============================================================
   2. ELEMEN DOM (cache sekali, pakai terus)
   ============================================================ */

const DOM = {
  // Form
  form:           document.getElementById('transactionForm'),
  formTitle:      document.getElementById('formTitle'),
  titleInput:     document.getElementById('transactionTitle'),
  amountInput:    document.getElementById('transactionAmount'),
  categoryInput:  document.getElementById('transactionCategory'),
  dateInput:      document.getElementById('transactionDate'),
  typeInput:      document.getElementById('transactionType'),
  submitBtn:      document.getElementById('submitBtn'),
  submitBtnText:  document.getElementById('submitBtnText'),
  cancelEditBtn:  document.getElementById('cancelEditBtn'),

  // Type toggle buttons
  btnIncome:  document.getElementById('btnIncome'),
  btnExpense: document.getElementById('btnExpense'),

  // Lists
  incomeList:  document.getElementById('incomeList'),
  expenseList: document.getElementById('expenseList'),
  incomeEmpty: document.getElementById('incomeEmpty'),
  expenseEmpty:document.getElementById('expenseEmpty'),

  // Badges
  incomeBadge: document.getElementById('incomeBadge'),
  expenseBadge:document.getElementById('expenseBadge'),

  // Summary
  balance:      document.getElementById('balance'),
  totalIncome:  document.getElementById('totalIncome'),
  totalExpense: document.getElementById('totalExpense'),

  // Search & Filters
  searchInput:    document.getElementById('searchInput'),
  searchClear:    document.getElementById('searchClear'),
  filterMonth:    document.getElementById('filterMonth'),
  filterCategory: document.getElementById('filterCategory'),
  sortBy:         document.getElementById('sortBy'),
  btnSetBudget:   document.getElementById('btnSetBudget'),
  btnExportCsv:   document.getElementById('btnExportCsv'),

  // Budget Progress
  budgetSection:  document.getElementById('budgetSection'),
  budgetStatus:   document.getElementById('budgetStatus'),
  budgetBarFill:  document.getElementById('budgetBarFill'),

  // Modal Delete
  confirmModal:     document.getElementById('confirmModal'),
  btnCancelDelete:  document.getElementById('btnCancelDelete'),
  btnConfirmDelete: document.getElementById('btnConfirmDelete'),

  // Modal Auth
  loginModal:   document.getElementById('loginModal'),
  authUsername: document.getElementById('authUsername'),
  authPassword: document.getElementById('authPassword'),
  btnLogin:     document.getElementById('btnLogin'),
  btnRegister:  document.getElementById('btnRegister'),

  // Theme
  themeToggle:    document.getElementById('themeToggle'),
  themeIcon:      document.getElementById('themeIcon'),

  // Charts
  barChart:       document.getElementById('barChart'),
  donutChart:     document.getElementById('donutChart'),

  // Misc
  formSection: document.querySelector('.form-section'),
  toast:       document.getElementById('toast'),
};

/* ============================================================
   3. LOCALSTORAGE — SIMPAN & MUAT DATA
   ============================================================ */

/** 
 * (DULU) Simpan data transaksi ke localStorage 
 * (SEKARANG) Data langsung dikirim ke backend, fungsi ini dihapus/dinonaktifkan
 */
function saveToStorage() {
  // Tidak perlu lagi karena kita langsung nge-fetch() ke API
}

/** Ambil data dari REST API Python saat app pertama dibuka */
async function loadFromStorage() {
  if (!authToken) {
    showLoginModal();
    return;
  }

  if (loggedInUser && DOM.greeting) {
    DOM.greeting.textContent = `Halo, ${loggedInUser}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    
    if (response.status === 401) {
      handleUnauthorized();
      return;
    }
    
    if (response.ok) {
      transactions = await response.json();
    } else {
      throw new Error("Gagal mengambil data dari server");
    }

    // P6 & P7: Budget dan Theme tetap di localStorage karena itu preferensi UI
    const rawBudget = localStorage.getItem('fintrack_budget');
    monthlyBudget = rawBudget ? parseFloat(rawBudget) : 0;
    
    const savedTheme = localStorage.getItem('fintrack_theme') || 'light';
    setTheme(savedTheme);
  } catch (e) {
    console.error('API Error:', e);
    showToast('Gagal terhubung ke server backend.', 'error');
    transactions = [];
  }
}

/* ============================================================
   4. CUSTOM EVENT — dispatch & listen (Advanced)
   ============================================================ */

/**
 * Kirim event 'transactionUpdated' dengan data terbaru.
 * Semua perubahan data HARUS memanggil fungsi ini,
 * sehingga UI otomatis terupdate via listener.
 */
function dispatchTransactionUpdated() {
  document.dispatchEvent(
    new CustomEvent('transactionUpdated', {
      detail: { transactions, searchQuery },
    })
  );
}

/** Listener Custom Event — render ulang seluruh UI */
document.addEventListener('transactionUpdated', () => {
  updateFilterMonthOptions();
  updateFilterCategoryOptions();
  renderAllTransactions();
  updateSummary(transactions);
  updateCharts();
  updateBudgetProgress();
});

// Update dropdown filterMonth agar dinamis
function updateFilterMonthOptions() {
  const months = [...new Set(transactions.map(t => t.date.slice(0, 7)))].sort().reverse();
  const currentVal = DOM.filterMonth.value;
  DOM.filterMonth.innerHTML = '<option value="">Semua Bulan</option>';
  months.forEach(m => {
    const d = new Date(m + '-01');
    const label = d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    const option = document.createElement('option');
    option.value = m;
    option.textContent = label;
    DOM.filterMonth.appendChild(option);
  });
  DOM.filterMonth.value = currentVal;
}

// Update dropdown filterCategory berdasarkan data transaksi
function updateFilterCategoryOptions() {
  const cats = [...new Set(transactions.map(t => t.category))].filter(Boolean).sort();
  const currentVal = DOM.filterCategory.value;
  DOM.filterCategory.innerHTML = '<option value="">Semua Kategori</option>';
  cats.forEach(c => {
    const option = document.createElement('option');
    option.value = c;
    option.textContent = c;
    DOM.filterCategory.appendChild(option);
  });
  DOM.filterCategory.value = currentVal;
}

DOM.filterMonth.addEventListener('change', (e) => { filterMonth = e.target.value; dispatchTransactionUpdated(); });
DOM.filterCategory.addEventListener('change', (e) => { filterCategory = e.target.value; dispatchTransactionUpdated(); });
DOM.sortBy.addEventListener('change', (e) => { sortBy = e.target.value; dispatchTransactionUpdated(); });

/* ============================================================
   5. RENDER — membuat elemen kartu transaksi
   ============================================================ */

/**
 * Membuat satu elemen kartu transaksi menggunakan createElement.
 * DILARANG menggunakan innerHTML += .
 * @param {object} tx - Objek transaksi
 * @returns {HTMLElement}
 */
function createTransactionCard(tx) {
  const isIncome = tx.type === 'income';

  /* ── Card wrapper ── */
  const card = document.createElement('div');
  card.setAttribute('data-testid', 'transactionItem');
  card.setAttribute('data-id', tx.id);
  card.classList.add(isIncome ? 'income-card' : 'expense-card');

  /* ── Top row: title + badge ── */
  const cardTop = document.createElement('div');
  cardTop.classList.add('card-top');

  const title = document.createElement('h3');
  title.setAttribute('data-testid', 'transactionItemTitle');
  title.textContent = tx.title;

  let categoryEl = null;
  if (tx.category) {
    categoryEl = document.createElement('span');
    categoryEl.className = 'card-category';
    const catIcon = document.createElement('span');
    catIcon.className = 'material-symbols-outlined';
    catIcon.textContent = CATEGORY_ICONS[tx.category] || 'more_horiz';
    categoryEl.appendChild(catIcon);
    categoryEl.appendChild(document.createTextNode(' ' + tx.category));
  }

  const badge = document.createElement('span');
  badge.classList.add('card-badge', isIncome ? 'card-badge--income' : 'card-badge--expense');
  badge.textContent = isIncome ? 'Pemasukan' : 'Pengeluaran';

  cardTop.appendChild(title);
  if (categoryEl) cardTop.appendChild(categoryEl);
  cardTop.appendChild(badge);

  /* ── Nominal ── */
  // Format: "Nominal: Rp10000" — sesuai spesifikasi data-testid Submission.md
  const amount = document.createElement('p');
  amount.setAttribute('data-testid', 'transactionItemAmount');
  amount.textContent = `Nominal: Rp${tx.amount}`;

  /* ── Tanggal ── */
  const date = document.createElement('p');
  date.setAttribute('data-testid', 'transactionItemDate');
  date.textContent = `Tanggal: ${tx.date}`;

  /* ── Tipe (wajib ada, disembunyikan via CSS display:none) ── */
  const type = document.createElement('p');
  type.setAttribute('data-testid', 'transactionItemType');
  type.textContent = `Tipe: ${isIncome ? 'Pemasukan' : 'Pengeluaran'}`;

  /* ── Action buttons (icon-only + tooltip) ── */
  const actions = document.createElement('div');
  actions.classList.add('card-actions');

  // Helper: buat icon button dengan teks label
  function makeIconBtn(iconName, label, cls) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.classList.add('card-icon-btn', cls);
    btn.title = label;
    btn.setAttribute('aria-label', label);
    const icon = document.createElement('span');
    icon.classList.add('material-symbols-outlined');
    icon.textContent = iconName;
    const text = document.createElement('span');
    text.classList.add('card-icon-btn-label');
    text.textContent = label;
    btn.appendChild(icon);
    btn.appendChild(text);
    return btn;
  }

  const btnSwitch = makeIconBtn('swap_horiz', 'Ubah Tipe', 'btn-icon-switch');
  btnSwitch.setAttribute('data-testid', 'transactionItemEditTypeButton');
  btnSwitch.addEventListener('click', () => toggleType(tx.id));

  const btnEdit = makeIconBtn('edit', 'Edit', 'btn-icon-edit');
  btnEdit.addEventListener('click', () => handleEditClick(tx.id));

  const btnDelete = makeIconBtn('delete', 'Hapus', 'btn-icon-delete');
  btnDelete.setAttribute('data-testid', 'transactionItemDeleteButton');
  btnDelete.addEventListener('click', () => handleDelete(tx.id));

  actions.appendChild(btnSwitch);
  actions.appendChild(btnEdit);
  actions.appendChild(btnDelete);

  /* ── Susun ke card ── */
  card.appendChild(cardTop);
  card.appendChild(amount);
  card.appendChild(date);
  card.appendChild(type);
  card.appendChild(actions);

  return card;
}

function getFilteredTransactions() {
  let result = [...transactions];
  if (filterMonth) result = result.filter(t => t.date.startsWith(filterMonth));
  if (filterCategory) result = result.filter(t => t.category === filterCategory);
  if (searchQuery) result = result.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase().trim()));
  
  result.sort((a, b) => {
    if (sortBy === 'date-desc') return b.date.localeCompare(a.date);
    if (sortBy === 'date-asc') return a.date.localeCompare(b.date);
    if (sortBy === 'amount-desc') return b.amount - a.amount;
    if (sortBy === 'amount-asc') return a.amount - b.amount;
    return 0;
  });
  return result;
}

/**
 * Render seluruh transaksi ke incomeList dan expenseList.
 */
function renderAllTransactions() {
  const filtered = getFilteredTransactions();

  const incomeItems  = filtered.filter(tx => tx.type === 'income');
  const expenseItems = filtered.filter(tx => tx.type === 'expense');

  /* Kosongkan list (kecuali empty-state element) */
  clearList(DOM.incomeList,  DOM.incomeEmpty);
  clearList(DOM.expenseList, DOM.expenseEmpty);

  /* Render income */
  if (incomeItems.length === 0) {
    DOM.incomeEmpty.style.display = 'flex';
    DOM.incomeEmpty.querySelector('p').textContent = searchQuery
      ? 'Tidak ada hasil pencarian'
      : 'Belum ada pemasukan';
  } else {
    DOM.incomeEmpty.style.display = 'none';
    incomeItems.forEach(tx => {
      DOM.incomeList.appendChild(createTransactionCard(tx));
    });
  }

  /* Render expense */
  if (expenseItems.length === 0) {
    DOM.expenseEmpty.style.display = 'flex';
    DOM.expenseEmpty.querySelector('p').textContent = searchQuery
      ? 'Tidak ada hasil pencarian'
      : 'Belum ada pengeluaran';
  } else {
    DOM.expenseEmpty.style.display = 'none';
    expenseItems.forEach(tx => {
      DOM.expenseList.appendChild(createTransactionCard(tx));
    });
  }

  /* Update badge count */
  DOM.incomeBadge.textContent  = incomeItems.length;
  DOM.expenseBadge.textContent = expenseItems.length;
}

/**
 * Kosongkan list container, sisakan elemen empty-state.
 * @param {HTMLElement} list
 * @param {HTMLElement} emptyEl
 */
function clearList(list, emptyEl) {
  Array.from(list.children).forEach(child => {
    if (child !== emptyEl) child.remove();
  });
}

/* ============================================================
   6. UPDATE SUMMARY (Saldo, Pemasukan, Pengeluaran)
   ============================================================ */

/**
 * Hitung dan tampilkan ringkasan keuangan.
 * Menggunakan SELURUH transactions (bukan filtered) agar saldo akurat.
 * @param {Array} txList
 */
function updateSummary(txList) {
  const totalInc = txList
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExp = txList
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalInc - totalExp;

  DOM.totalIncome.textContent  = formatRupiah(totalInc);
  DOM.totalExpense.textContent = formatRupiah(totalExp);
  DOM.balance.textContent      = formatRupiah(balance);

  /* Warna saldo: merah jika negatif */
  DOM.balance.classList.toggle('negative', balance < 0);
}

/* ============================================================
   7. HANDLER — FORM SUBMIT (Tambah / Edit)
   ============================================================ */

async function handleSubmit(e) {
  e.preventDefault();

  const titleVal = DOM.titleInput.value.trim();
  const amountVal = parseFloat(DOM.amountInput.value);
  const dateVal = DOM.dateInput.value;
  const typeVal = DOM.typeInput.value;
  const categoryVal = DOM.categoryInput.value;

  if (!titleVal) {
    showToast('Judul transaksi tidak boleh kosong!', 'error');
    DOM.titleInput.focus();
    return;
  }
  if (isNaN(amountVal) || amountVal <= 0) {
    showToast('Nominal harus lebih besar dari 0!', 'error');
    DOM.amountInput.focus();
    return;
  }
  
  const txData = {
    title: titleVal,
    amount: amountVal,
    date: dateVal,
    type: typeVal,
    category: categoryVal
  };

  if (editId !== null) {
    // Mode EDIT (PUT)
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${editId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(txData)
      });
      if (response.status === 401) return handleUnauthorized();
      
      const updatedTx = await response.json();
      
      const idx = transactions.findIndex(tx => tx.id === editId);
      if (idx !== -1) transactions[idx] = updatedTx;
      
      showToast('Transaksi berhasil diperbarui!', 'success');
      cancelEditMode();
    } catch (e) {
      showToast('Gagal memperbarui data di server.', 'error');
    }
  } else {
    // Mode TAMBAH (POST)
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(txData)
      });
      if (response.status === 401) return handleUnauthorized();
      
      const newTx = await response.json();
      transactions.push(newTx);
      showToast('Transaksi berhasil ditambahkan!', 'success');
    } catch (e) {
      showToast('Gagal menambahkan data ke server.', 'error');
    }
  }

  resetForm();
  dispatchTransactionUpdated();
}

DOM.form.addEventListener('submit', handleSubmit);

/* ============================================================
   8. HANDLER — EDIT
   ============================================================ */

/**
 * Isi form dengan data transaksi yang dipilih → masuk mode edit.
 * @param {number} id
 */
function handleEditClick(id) {
  const tx = transactions.find(t => t.id === id);
  if (!tx) return;

  /* Set editId */
  editId = id;

  /* Isi form */
  DOM.titleInput.value    = tx.title;
  DOM.amountInput.value   = tx.amount;
  DOM.dateInput.value     = tx.date;
  DOM.typeInput.value     = tx.type;
  setTypeToggle(tx.type);
  DOM.categoryInput.value = tx.category || '';

  DOM.formTitle.textContent       = 'Edit Transaksi';
  DOM.submitBtnText.textContent   = 'Simpan Perubahan';
  DOM.cancelEditBtn.style.display = 'inline-flex';
  DOM.formSection.classList.add('edit-mode');

  const card = document.querySelector(`[data-id="${id}"]`);
  if (card) {
    card.classList.add('editing');
    card.addEventListener('animationend', () => card.classList.remove('editing'), { once: true });
  }

  DOM.formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  DOM.titleInput.focus();
}

function cancelEditMode() {
  editId = null;
  DOM.formTitle.textContent       = 'Tambah Transaksi';
  DOM.submitBtnText.textContent   = 'Tambah';
  DOM.cancelEditBtn.style.display = 'none';
  DOM.formSection.classList.remove('edit-mode');
}

DOM.cancelEditBtn.addEventListener('click', () => {
  cancelEditMode();
  resetForm();
});

/* ============================================================
   9. HANDLER — HAPUS
   ============================================================ */

/**
 * Hapus transaksi (via Modal Konfirmasi)
 * @param {number} id
 */
function handleDelete(id) {
  deleteCandidateId = id;
  DOM.confirmModal.classList.add('show');
}

DOM.btnCancelDelete.addEventListener('click', () => {
  deleteCandidateId = null;
  DOM.confirmModal.classList.remove('show');
});

DOM.btnConfirmDelete.addEventListener('click', async () => {
  if (deleteCandidateId !== null) {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${deleteCandidateId}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (response.status === 401) return handleUnauthorized();
      
      transactions = transactions.filter(tx => tx.id !== deleteCandidateId);
      dispatchTransactionUpdated();

      /* Jika sedang edit transaksi yang dihapus, batalkan edit */
      if (editId === deleteCandidateId) {
        cancelEditMode();
        resetForm();
      }

      showToast('Transaksi dihapus.', 'info');
    } catch (e) {
      showToast('Gagal menghapus data di server.', 'error');
    }
    
    deleteCandidateId = null;
    DOM.confirmModal.classList.remove('show');
  }
});

/* ============================================================
   10. HANDLER — UBAH TIPE (income ↔ expense)
   ============================================================ */

/**
 * Pindahkan transaksi (income -> expense, atau sebaliknya)
 * @param {number} id
 */
async function toggleType(id) {
  const txIndex = transactions.findIndex(tx => tx.id === id);
  if (txIndex === -1) return;

  const currentTx = transactions[txIndex];
  const newType = currentTx.type === 'income' ? 'expense' : 'income';

  const txData = {
    title: currentTx.title,
    amount: currentTx.amount,
    date: currentTx.date,
    type: newType,
    category: currentTx.category
  };

  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(txData)
    });
    if (response.status === 401) return handleUnauthorized();
    
    const updatedTx = await response.json();
    transactions[txIndex] = updatedTx;

    dispatchTransactionUpdated();
    showToast(`Tipe transaksi diubah menjadi ${newType}.`, 'info');
  } catch (e) {
    showToast('Gagal mengubah tipe data di server.', 'error');
  }
}

/* ============================================================
   11. HANDLER — PENCARIAN REAL-TIME
   ============================================================ */

DOM.searchInput.addEventListener('input', () => {
  searchQuery = DOM.searchInput.value;

  /* Tampilkan/sembunyikan tombol clear */
  DOM.searchClear.style.display = searchQuery ? 'flex' : 'none';

  dispatchTransactionUpdated();
});

/* Tombol clear search → kembali ke semua data */
DOM.searchClear.addEventListener('click', () => {
  DOM.searchInput.value = '';
  searchQuery = '';
  DOM.searchClear.style.display = 'none';
  DOM.searchInput.focus();
  dispatchTransactionUpdated();
});

/* ============================================================
   12. TYPE TOGGLE BUTTON (income / expense)
   ============================================================ */

DOM.btnIncome.addEventListener('click', () => setTypeToggle('income'));
DOM.btnExpense.addEventListener('click', () => setTypeToggle('expense'));

/**
 * Atur state toggle tipe transaksi di form.
 * @param {'income'|'expense'} type
 */
function setTypeToggle(type) {
  DOM.typeInput.value = type;

  if (type === 'income') {
    DOM.btnIncome.classList.add('active');
    DOM.btnExpense.classList.remove('active');
  } else {
    DOM.btnExpense.classList.add('active');
    DOM.btnIncome.classList.remove('active');
  }

  // Update Category Options
  DOM.categoryInput.innerHTML = '';
  const cats = CATEGORIES[type] || [];
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    DOM.categoryInput.appendChild(opt);
  });
}

/* ============================================================
   13. UTILITAS
   ============================================================ */

/**
 * Format angka ke format Rupiah.
 * @param {number} amount
 * @returns {string} e.g. "Rp 1.500.000"
 */
function formatRupiah(amount) {
  return 'Rp ' + Math.abs(amount).toLocaleString('id-ID');
}

/** Reset semua input form ke kondisi awal */
function resetForm() {
  DOM.form.reset();
  DOM.typeInput.value = 'income';
  setTypeToggle('income');
}

/* ============================================================
   14. TOAST NOTIFICATION
   ============================================================ */

let toastTimer = null;

/**
 * Tampilkan pesan toast sementara.
 * @param {string} message
 * @param {'success'|'error'|'info'} type
 * @param {number} duration - ms
 */
function showToast(message, type = 'info', duration = 3000) {
  if (toastTimer) clearTimeout(toastTimer);

  DOM.toast.textContent = message;
  DOM.toast.className   = `toast toast--${type} show`;

  toastTimer = setTimeout(() => {
    DOM.toast.classList.remove('show');
  }, duration);
}

/* ============================================================
   CHART FUNCTIONS (Canvas API Native)
   ============================================================ */

function updateCharts() {
  drawBarChart();
  drawDonutChart();
}

function drawBarChart() {
  if (!DOM.barChart) return;
  const ctx = DOM.barChart.getContext('2d');
  const canvas = DOM.barChart;
  
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0) return; // Hidden
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  
  const width = rect.width;
  const height = rect.height;
  
  ctx.clearRect(0, 0, width, height);
  
  const monthsData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const txMonth = transactions.filter(t => t.date.startsWith(key));
    monthsData.push({
      label: d.toLocaleDateString('id-ID', { month: 'short' }),
      income: txMonth.filter(t => t.type === 'income').reduce((s,t) => s+t.amount, 0),
      expense: txMonth.filter(t => t.type === 'expense').reduce((s,t) => s+t.amount, 0)
    });
  }

  const maxVal = Math.max(...monthsData.map(m => Math.max(m.income, m.expense)), 100);
  const paddingBottom = 30;
  const paddingTop = 20;
  const chartHeight = height - paddingBottom - paddingTop;
  
  const step = width / monthsData.length;
  const barWidth = Math.min(step * 0.3, 30);
  const gap = barWidth * 0.2;

  monthsData.forEach((m, i) => {
    const x = i * step + step / 2;
    
    // Income Bar
    const incH = (m.income / maxVal) * chartHeight;
    ctx.fillStyle = '#059669';
    ctx.beginPath();
    ctx.roundRect(x - barWidth - gap, height - paddingBottom - incH, barWidth, incH, [4, 4, 0, 0]);
    ctx.fill();

    // Expense Bar
    const expH = (m.expense / maxVal) * chartHeight;
    ctx.fillStyle = '#DC2626';
    ctx.beginPath();
    ctx.roundRect(x + gap, height - paddingBottom - expH, barWidth, expH, [4, 4, 0, 0]);
    ctx.fill();

    // Label
    ctx.fillStyle = '#6B7280';
    ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(m.label, x, height - 10);
  });
}

function drawDonutChart() {
  if (!DOM.donutChart) return;
  const ctx = DOM.donutChart.getContext('2d');
  const canvas = DOM.donutChart;
  
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0) return;
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  
  const width = rect.width;
  const height = rect.height;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(cx, cy) - 10;
  
  ctx.clearRect(0, 0, width, height);
  
  const currentMonth = new Date().toISOString().slice(0, 7);
  const txMonth = transactions.filter(t => t.date.startsWith(currentMonth));
  
  const totalInc = txMonth.filter(t => t.type === 'income').reduce((s,t) => s+t.amount, 0);
  const totalExp = txMonth.filter(t => t.type === 'expense').reduce((s,t) => s+t.amount, 0);
  const total = totalInc + totalExp;

  if (total === 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#E5E7EB';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('No data', cx, cy);
    return;
  }

  const incAngle = (totalInc / total) * Math.PI * 2;
  
  // Income slice
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, radius, -Math.PI/2, -Math.PI/2 + incAngle);
  ctx.fillStyle = '#059669';
  ctx.fill();
  
  // Expense slice
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, radius, -Math.PI/2 + incAngle, Math.PI*1.5);
  ctx.fillStyle = '#DC2626';
  ctx.fill();

  // Inner circle
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.6, 0, Math.PI * 2);
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  ctx.fillStyle = isDark ? '#1E293B' : '#FFFFFF';
  ctx.fill();

  ctx.fillStyle = isDark ? '#F8FAFC' : '#111827';
  ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const pct = Math.round((totalExp / total) * 100);
  ctx.fillText(pct + '% Exp', cx, cy);
}

/* ============================================================
   16. FITUR PORTFOLIO (P5, P6, P7, P8)
   ============================================================ */

/* P5: Export CSV */
DOM.btnExportCsv.addEventListener('click', () => {
  if (transactions.length === 0) {
    showToast('Tidak ada data untuk diekspor.', 'error');
    return;
  }
  
  let csvContent = "ID,Judul,Nominal,Tanggal,Tipe,Kategori\n";
  transactions.forEach(t => {
    // Escape quotes and wrap in quotes
    const title = `"${t.title.replace(/"/g, '""')}"`;
    const category = `"${(t.category || '').replace(/"/g, '""')}"`;
    csvContent += `${t.id},${title},${t.amount},${t.date},${t.type},${category}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `FinTrack_Export_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Data berhasil diekspor ke CSV.', 'success');
});

/* P6: Budget Limit */
DOM.btnSetBudget.addEventListener('click', () => {
  const input = prompt('Masukkan batas pengeluaran bulanan Anda (Rp):', monthlyBudget || '');
  if (input === null) return; // Cancelled
  const val = parseFloat(input);
  if (isNaN(val) || val < 0) {
    showToast('Nominal budget tidak valid.', 'error');
    return;
  }
  monthlyBudget = val;
  localStorage.setItem('fintrack_budget', monthlyBudget);
  updateBudgetProgress();
  showToast('Batas pengeluaran berhasil diatur.', 'success');
});

function updateBudgetProgress() {
  if (!monthlyBudget || monthlyBudget <= 0) {
    DOM.budgetSection.style.display = 'none';
    return;
  }
  DOM.budgetSection.style.display = 'block';

  const currentMonth = new Date().toISOString().slice(0, 7);
  const expMonth = transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
    .reduce((s, t) => s + t.amount, 0);

  DOM.budgetStatus.textContent = `${formatRupiah(expMonth)} / ${formatRupiah(monthlyBudget)}`;
  
  let pct = (expMonth / monthlyBudget) * 100;
  if (pct > 100) pct = 100;
  
  DOM.budgetBarFill.style.width = pct + '%';
  
  DOM.budgetBarFill.className = 'budget-bar-fill';
  if (pct >= 90) {
    DOM.budgetBarFill.classList.add('danger');
  } else if (pct >= 75) {
    DOM.budgetBarFill.classList.add('warning');
  }
}

/* P7: Dark/Light Mode */
DOM.themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  setTheme(isDark ? 'light' : 'dark');
});

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (DOM.themeIcon) DOM.themeIcon.textContent = 'light_mode';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (DOM.themeIcon) DOM.themeIcon.textContent = 'dark_mode';
  }
  localStorage.setItem('fintrack_theme', theme);
  requestAnimationFrame(updateCharts);
}

/* ============================================================
   17. P9: KEYBOARD SHORTCUTS
   ============================================================ */

document.addEventListener('keydown', (e) => {
  const activeTag = document.activeElement.tagName.toLowerCase();
  const isInputFocused = activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select';

  // Esc: Cancel edit, close modal, or blur input
  if (e.key === 'Escape') {
    if (DOM.confirmModal && DOM.confirmModal.classList.contains('show')) {
      DOM.btnCancelDelete.click();
    } else if (editId !== null) {
      DOM.cancelEditBtn.click();
    } else if (document.activeElement) {
      document.activeElement.blur();
    }
    return;
  }

  if (isInputFocused) return;

  // Shortcut 'N': Fokus ke input judul untuk tambah baru
  if (e.key.toLowerCase() === 'n') {
    e.preventDefault();
    DOM.titleInput.focus();
    DOM.formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Shortcut '/': Fokus ke search
  if (e.key === '/') {
    e.preventDefault();
    DOM.searchInput.focus();
  }
});

/* ============================================================
   18. FASE 3: AUTHENTICATION HANDLERS
   ============================================================ */

function showLoginModal() {
  if (DOM.loginModal) DOM.loginModal.classList.add('show');
  const mainContent = document.querySelector('.app-main');
  if (mainContent) mainContent.style.display = 'none';
}

function hideLoginModal() {
  if (DOM.loginModal) DOM.loginModal.classList.remove('show');
  const mainContent = document.querySelector('.app-main');
  if (mainContent) mainContent.style.display = '';
}

function handleUnauthorized() {
  authToken = null;
  loggedInUser = null;
  localStorage.removeItem('fintrack_token');
  localStorage.removeItem('fintrack_user');
  transactions = [];
  dispatchTransactionUpdated();
  showToast('Sesi Anda berakhir. Silakan login kembali.', 'error');
  showLoginModal();
}

const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    handleUnauthorized();
    showToast('Berhasil logout!', 'success');
  });
}

if (DOM.btnLogin) {
  DOM.btnLogin.addEventListener('click', async () => {
    const username = DOM.authUsername.value.trim();
    const password = DOM.authPassword.value.trim();
    if (!username || !password) return showToast('Username & password wajib diisi!', 'error');

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
      });
      if (!res.ok) throw new Error('Username atau password salah');
      
      const data = await res.json();
      authToken = data.access_token;
      loggedInUser = data.username;
      localStorage.setItem('fintrack_token', authToken);
      localStorage.setItem('fintrack_user', loggedInUser);
      if (DOM.greeting) DOM.greeting.textContent = `Halo, ${loggedInUser}`;
      hideLoginModal();
      showToast('Login berhasil!', 'success');
      init(); // Reload data
    } catch (e) {
      showToast(e.message, 'error');
    }
  });
}

if (DOM.btnRegister) {
  DOM.btnRegister.addEventListener('click', async () => {
    const username = DOM.authUsername.value.trim();
    const password = DOM.authPassword.value.trim();
    if (!username || !password) return showToast('Username & password wajib diisi!', 'error');

    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Gagal mendaftar');
      }
      
      showToast('Registrasi berhasil! Silakan Login.', 'success');
      DOM.authPassword.value = '';
    } catch (e) {
      showToast(e.message, 'error');
    }
  });
}

/* ============================================================
   19. INISIALISASI APLIKASI
   ============================================================ */

async function init() {
  await loadFromStorage();
  
  resetForm();

  /* Set tanggal default form ke hari ini */
  const today = new Date().toISOString().split('T')[0];
  DOM.dateInput.value = today;

  /* Initial render melalui Custom Event */
  dispatchTransactionUpdated();
}

/* Jalankan saat DOM siap */
document.addEventListener('DOMContentLoaded', init);

/* Responsive charts on resize */
window.addEventListener('resize', () => {
  requestAnimationFrame(updateCharts);
});
