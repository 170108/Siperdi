<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Dashboard Admin | SiPerdi</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Urbanist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{{ asset('css/app.css') }}" />
</head>
<body data-page="admin">
  <div class="ambient"></div>
  <header class="topbar">
    <div class="brand">
      <div class="brand-logos">
        <img class="logo school-logo" src="{{ asset('img/SMK.PNG') }}" alt="SMK Negeri 1 Cikarang Selatan" data-logo-view="{{ asset('img/SMK.PNG') }}" />
        <img class="logo readify-logo" src="{{ asset('img/logo%20siperdi.jpg') }}" alt="Readify Labs" data-logo-view="{{ asset('img/logo%20siperdi.jpg') }}" />
      </div>
      <div>
        <p class="brand-title">SiPerdi - Dashboard Admin</p>
        <p class="brand-subtitle">Khusus Admin Perpustakaan</p>
      </div>
    </div>
    <nav class="topnav">
      <a href="{{ url('/') }}">Beranda</a>
      <a href="{{ url('/admin') }}" class="admin-link">Admin</a>
      <div class="session" data-session>
        <span class="session-name" data-session-name>Halo, Admin</span>
        <button class="btn ghost" data-logout>Logout</button>
      </div>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-content">
        <p class="pill">Kontrol Peminjaman & Pengembalian</p>
        <h1>Dashboard Admin Perpustakaan</h1>
        <p class="lead">
          Pantau seluruh data peminjaman, status pengembalian, keterlambatan, serta denda siswa secara terpusat dan rapi.
        </p>
        <div class="hero-metrics">
          <div>
            <p class="metric-value">Audit</p>
            <p class="metric-label">Peminjaman & Pengembalian</p>
          </div>
          <div>
            <p class="metric-value">Notifikasi</p>
            <p class="metric-label">Jatuh Tempo & Denda</p>
          </div>
          <div>
            <p class="metric-value">Laporan</p>
            <p class="metric-label">CSV Siap Unduh</p>
          </div>
        </div>
      </div>
      <div class="hero-panel">
        <div class="panel-glow"></div>
        <div class="panel-card">
          <h3>Ringkasan Admin</h3>
          <p class="sub">Data diperbarui otomatis dari aktivitas siswa.</p>
          <div class="status">
            <span class="dot"></span>
            <div>
              <p class="status-title">Mode Admin Aktif</p>
              <p class="status-meta">Kelola laporan dan persetujuan pengembalian.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section admin" data-admin-only>
      <div class="section-title">
        <h2>Dashboard Admin Perpustakaan</h2>
        <p>Ringkasan data seluruh peminjaman, keterlambatan, dan denda siswa.</p>
      </div>
      <div class="admin-actions">
        <button class="btn outline" data-admin-download>Unduh Laporan CSV</button>
      </div>
      <div class="dashboard-grid">
        <div class="card">
          <h3>Total Siswa Terdaftar</h3>
          <ul class="list">
            <li><span>Jumlah siswa</span><strong data-admin-students>0</strong></li>
          </ul>
        </div>
        <div class="card">
          <h3>Statistik Peminjaman</h3>
          <ul class="list">
            <li><span>Total peminjaman</span><strong data-admin-total-loans>0</strong></li>
            <li><span>Peminjaman aktif</span><strong data-admin-active>0</strong></li>
            <li><span>Jatuh tempo dekat</span><strong data-admin-due>0</strong></li>
            <li><span>Terlambat</span><strong data-admin-overdue>0</strong></li>
          </ul>
        </div>
        <div class="card">
          <h3>Rekap Denda</h3>
          <ul class="list">
            <li><span>Total denda</span><strong data-admin-fine>Rp 0</strong></li>
          </ul>
          <p class="sub">Dihitung otomatis dari peminjaman yang terlambat.</p>
        </div>
      </div>
      <div class="card admin-returns">
        <h3>Persetujuan Pengembalian</h3>
        <div class="admin-list" data-admin-returns></div>
        <div class="empty-state show" data-admin-returns-empty>Belum ada permintaan pengembalian.</div>
      </div>
      <div class="card admin-recent">
        <h3>Pengajuan Terbaru</h3>
        <div class="admin-list" data-admin-recent></div>
        <div class="empty-state show" data-admin-empty>Belum ada pengajuan peminjaman.</div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div>
      <p class="brand-title">PT. Readify Labs</p>
      <p class="footer-text">Innovate. Educate. Elevate.</p>
      <p class="footer-text">Dashboard admin untuk pengelolaan perpustakaan SMK Negeri 1 Cikarang Selatan.</p>
    </div>
    <div class="footer-links">
      <a href="{{ url('/') }}">Beranda</a>
      <a href="{{ url('/admin') }}">Admin</a>
    </div>
  </footer>

  <div class="logo-modal" id="logo-modal" aria-hidden="true">
    <div class="logo-backdrop" data-close-logo></div>
    <div class="logo-dialog">
      <img src="" alt="Logo" data-logo-image />
    </div>
  </div>

  <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
