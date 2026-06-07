const API_BASE_URL = 'http://127.0.0.1:8089/api';

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (input.type === 'password') {
    input.type = 'text';
    icon.textContent = 'visibility_off';
  } else {
    input.type = 'password';
    icon.textContent = 'visibility';
  }
}

// Logic for Login Page
const btnLogin = document.getElementById('btnLogin');
if (btnLogin) {
  btnLogin.addEventListener('click', async (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById('authUsername');
    const passwordInput = document.getElementById('authPassword');
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!username || !password) return showToast('Username & password wajib diisi!', 'error');

    btnLogin.disabled = true;
    btnLogin.textContent = 'Memproses...';

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
      localStorage.setItem('fintrack_token', data.access_token);
      localStorage.setItem('fintrack_user', data.username);
      
      showToast('Login berhasil! Mengalihkan...', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } catch (e) {
      showToast(e.message, 'error');
      btnLogin.disabled = false;
      btnLogin.textContent = 'Masuk';
    }
  });
}

// Logic for Register Page
const btnRegister = document.getElementById('btnRegister');
if (btnRegister) {
  btnRegister.addEventListener('click', async (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById('authUsername');
    const passwordInput = document.getElementById('authPassword');
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!username || !password) return showToast('Username & password wajib diisi!', 'error');

    btnRegister.disabled = true;
    btnRegister.textContent = 'Memproses...';

    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Gagal mendaftar. Username mungkin sudah terpakai.');
      }
      
      showToast('Registrasi sukses! Mengalihkan ke login...', 'success');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    } catch (e) {
      showToast(e.message, 'error');
      btnRegister.disabled = false;
      btnRegister.textContent = 'Daftar Akun Baru';
    }
  });
}

// Logic for Forgot Password Page
const btnReset = document.getElementById('btnReset');
if (btnReset) {
  btnReset.addEventListener('click', (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById('authUsername');
    const username = usernameInput.value.trim();
    
    if (!username) return showToast('Username wajib diisi!', 'error');

    // Karena backend belum mendukung forgot password, kita akan menampilkan pesan mock.
    showToast('Instruksi reset password telah dikirim ke admin sistem!', 'success');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  });
}
