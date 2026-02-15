<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SiPerdi - Sistem Perpustakaan Digital | Readify Labs</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Urbanist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{{ asset('css/app.css') }}" />
</head>
<body>
  <div class="ambient"></div>
  <header class="topbar">
    <div class="brand">
      <div class="brand-logos">
        <img class="logo school-logo" src="{{ asset('img/SMK.PNG') }}" alt="SMK Negeri 1 Cikarang Selatan" data-logo-view="{{ asset('img/SMK.PNG') }}" />
        <img class="logo readify-logo" src="{{ asset('img/logo%20siperdi.jpg') }}" alt="Readify Labs" data-logo-view="{{ asset('img/logo%20siperdi.jpg') }}" />
      </div>
      <div>
        <a class="brand-title link-title" href="#perpustakaan">SiPerdi - SMK Negeri 1 Cikarang Selatan</a>
        <p class="brand-subtitle">Dikelola Admin Web | PT. Readify Labs</p>
      </div>
    </div>
    <nav class="topnav">
      <a href="#fitur">Fitur</a>
      <a href="#alur">Alur</a>
      <a href="#katalog">Katalog</a>
      <a href="#dashboard">Dashboard</a>
      <a href="{{ url('/admin') }}" data-admin-only-link class="admin-link hidden">Admin</a>
      <button class="btn ghost" data-open-auth="login-student" data-hide-when-auth>Login Siswa</button>
      <button class="btn outline" data-open-auth="login-admin" data-hide-when-auth>Login Admin</button>
      <button class="btn solid" data-open-auth="signup-student" data-hide-when-auth>Sign Up Siswa</button>
      <div class="session" data-session>
        <span class="session-name" data-session-name>Halo, Siswa</span>
        <button class="btn ghost" data-logout>Logout</button>
      </div>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-content">
        <p class="pill">EdTech - Administrasi Perpustakaan Sekolah</p>
        <h1>Kelola peminjaman buku lebih rapi, cepat, dan transparan.</h1>
        <p class="lead">
          SiPerdi adalah aplikasi administrasi perpustakaan fisik untuk SMK Negeri 1 Cikarang Selatan, dikelola oleh admin web
          untuk mendukung transformasi digitalisasi sistem perpustakaan sekolah. Siswa dapat meminjam dan mengembalikan buku
          secara mandiri melalui akun masing-masing sehingga proses jadi tertib, cepat, dan terdata.
        </p>
        <div class="hero-actions">
          <button class="btn solid" data-open-auth="signup-student" data-hide-when-auth>Buat Akun Siswa</button>
          <button class="btn outline" data-open-auth="login-student" data-hide-when-auth>Login Siswa</button>
        </div>
        <div class="hero-metrics">
          <div>
            <p class="metric-value">14 Hari</p>
            <p class="metric-label">Batas Peminjaman</p>
          </div>
          <div>
            <p class="metric-value">Notifikasi</p>
            <p class="metric-label">Jatuh Tempo</p>
          </div>
          <div>
            <p class="metric-value">Otomatisasi</p>
            <p class="metric-label">Denda Keterlambatan</p>
          </div>
        </div>
        <div class="session session-banner" data-session>
          <span class="session-name" data-session-name>Halo, Siswa</span>
          <button class="btn ghost" data-logout>Logout</button>
        </div>
      </div>
      <div class="hero-panel">
        <div class="panel-glow"></div>
        <div class="panel-card">
          <h3>Status Peminjaman</h3>
          <p class="sub" data-status-account>Akun: -</p>
          <div class="status" data-hero-status>
            <span class="dot"></span>
            <div>
              <p class="status-title" data-status-title>Belum Login</p>
              <p class="status-meta" data-status-meta>Silakan login untuk melihat status peminjaman.</p>
            </div>
            <button class="btn tiny" data-scroll-target="#peminjaman">Lihat</button>
          </div>
          <div class="loan-list" data-hero-loan-list></div>
          <div class="empty-state show" data-hero-empty>Belum ada data peminjaman.</div>
        </div>
      </div>
    </section>

    <section id="fitur" class="section">
      <div class="section-title">
        <h2>Fitur Utama SiPerdi</h2>
        <p>Dirancang untuk proses peminjaman buku fisik yang tertib dan terdata.</p>
      </div>
      <div class="features">
        <a class="feature feature-link" href="#auth-modal" data-open-auth="login-student">
          <h3>Login dan Manajemen Akun Siswa</h3>
          <p>Siswa membuat akun terlebih dahulu agar setiap peminjaman tercatat jelas dan aman.</p>
        </a>
        <a class="feature feature-link" href="#peminjaman">
          <h3>Peminjaman Buku Digital</h3>
          <p>Ajukan peminjaman buku fisik langsung dari dashboard siswa tanpa antre manual.</p>
        </a>
        <a class="feature feature-link" href="#pengembalian">
          <h3>Manajemen Pengembalian</h3>
          <p>Catat pengembalian, status keterlambatan, dan histori transaksi secara rapi.</p>
        </a>
        <a class="feature feature-link" href="#notifikasi">
          <h3>Notifikasi Jatuh Tempo</h3>
          <p>Ingatkan siswa tentang batas waktu pengembalian melalui notifikasi sistem.</p>
        </a>
        <a class="feature feature-link" href="#denda">
          <h3>Pencatatan Denda</h3>
          <p>Denda otomatis dihitung jika melewati 14 hari masa pinjam.</p>
        </a>
        <a class="feature feature-link" href="#laporan">
          <h3>Audit dan Laporan</h3>
          <p>Admin sekolah melihat laporan peminjaman, pengembalian, dan keterlambatan.</p>
        </a>
      </div>
    </section>

    <section id="alur" class="section flow">
      <div class="section-title">
        <h2>Alur Peminjaman dan Pengembalian</h2>
        <p>Empat langkah sederhana agar proses perpustakaan lebih efisien.</p>
      </div>
      <div class="flow-grid">
        <div class="flow-step">
          <span class="step">1</span>
          <h4>Sign Up Akun Siswa</h4>
          <p>Registrasi menggunakan NISN, kelas, dan email sekolah.</p>
        </div>
        <div class="flow-step">
          <span class="step">2</span>
          <h4>Pilih Buku</h4>
          <p>Cari buku fisik di katalog dan ajukan peminjaman.</p>
        </div>
        <div class="flow-step">
          <span class="step">3</span>
          <h4>Ambil Buku</h4>
          <p>Ambil buku di perpustakaan sesuai persetujuan admin.</p>
        </div>
        <div class="flow-step">
          <span class="step">4</span>
          <h4>Kembalikan Tepat Waktu</h4>
          <p>Sistem mengingatkan batas 14 hari dan menghitung denda jika terlambat.</p>
        </div>
      </div>
    </section>

    <section id="profile" class="section profile" data-requires-auth>
      <div class="section-title">
        <h2>Profil Siswa</h2>
        <p>Kelola data akun siswa yang sudah terdaftar dan ganti foto profil pribadi.</p>
      </div>
      <div class="lockable">
        <div class="card profile-card">
          <div class="profile-grid">
            <div class="profile-photo">
              <img src="{{ asset('img/avatar.svg') }}" alt="Foto Profil" data-profile-photo />
              <label class="btn outline small">
                Ganti Foto
                <input type="file" accept="image/*" data-profile-upload />
              </label>
              <p class="sub">Format JPG/PNG disarankan.</p>
            </div>
            <div class="profile-info">
              <div><span>Nama</span><strong data-profile="name">-</strong></div>
              <div><span>NISN</span><strong data-profile="nisn">-</strong></div>
              <div><span>Kelas</span><strong data-profile="kelas">-</strong></div>
              <div><span>Email</span><strong data-profile="email">-</strong></div>
            </div>
          </div>
          <div class="form-message" data-message="profile"></div>
        </div>
      </div>
      <div class="guard">
        <p>Silakan login atau sign up untuk melihat profil siswa.</p>
        <button class="btn solid" data-open-auth="login-student">Login</button>
      </div>
    </section>

    <section id="peminjaman" class="section loan" data-requires-auth>
      <div class="section-title">
        <h2>Peminjaman Buku Digital</h2>
        <p>Isi data peminjaman buku fisik agar tercatat otomatis oleh admin perpustakaan.</p>
      </div>
      <div class="lockable">
        <div class="loan-grid">
          <div class="card">
            <h3>Form Peminjaman</h3>
            <form class="form" data-loan-form>
              <label>Judul Buku</label>
              <input type="text" name="judul" placeholder="Contoh: Algoritma dan Pemrograman" required />
              <label>Kode Buku</label>
              <input type="text" name="kode" placeholder="BK-001" required />
              <label>Kategori</label>
              <input type="text" name="kategori" placeholder="Teknologi" required />
              <label>Tanggal Pinjam</label>
              <input type="date" name="tanggal" required />
              <label>Durasi (hari)</label>
              <input type="number" name="durasi" min="1" max="30" value="14" required />
              <label>Perkiraan Tanggal Kembali</label>
              <input type="date" name="kembali" readonly />
              <div class="form-message" data-message="loan"></div>
              <button class="btn solid full">Ajukan Peminjaman</button>
            </form>
          </div>
          <div class="card">
            <h3>Daftar Pengajuan</h3>
            <div class="table mini loan-table">
              <div class="table-head">
                <span>Judul</span>
                <span>Pinjam</span>
                <span>Jatuh Tempo</span>
                <span>Status</span>
                <span>Aksi</span>
              </div>
              <div class="table-body" data-loan-list></div>
            </div>
            <div class="empty-state" data-loan-empty>Belum ada pengajuan peminjaman.</div>
          </div>
        </div>
      </div>
      <div class="guard">
        <p>Silakan login terlebih dahulu untuk mengajukan peminjaman buku.</p>
        <button class="btn solid" data-open-auth="login-student">Login</button>
      </div>
    </section>

    <section class="section operational">
      <div class="section-title">
        <h2>Operasional Pengembalian dan Laporan</h2>
        <p>Ringkasan pengembalian, notifikasi jatuh tempo, denda, dan laporan admin.</p>
      </div>
      <div class="dashboard-grid">
        <div class="card" id="pengembalian">
          <h3>Manajemen Pengembalian</h3>
          <p class="sub">Pantau status buku yang masih dipinjam.</p>
          <ul class="list">
            <li><span>Buku aktif</span><strong data-loan-active>0</strong></li>
            <li><span>Jatuh tempo dekat</span><strong data-loan-due>0</strong></li>
          </ul>
        </div>
        <div class="card" id="notifikasi">
          <h3>Notifikasi Jatuh Tempo</h3>
          <div class="notice" data-next-due>Belum ada peminjaman aktif.</div>
        </div>
        <div class="card" id="denda">
          <h3>Pencatatan Denda</h3>
          <p class="sub">Denda dihitung otomatis jika melewati 14 hari.</p>
          <ul class="list">
            <li><span>Total denda</span><strong data-total-fine>Rp 0</strong></li>
          </ul>
        </div>
        <div class="card" id="laporan">
          <h3>Audit dan Laporan</h3>
          <p class="sub">Admin dapat mengekspor laporan peminjaman dan keterlambatan.</p>
          <button class="btn outline" type="button" data-open-auth="login-admin">Unduh Laporan</button>
        </div>
      </div>
    </section>

    <section id="katalog" class="section catalog">
      <div class="section-title">
        <h2>Katalog Buku Fisik</h2>
        <p>Daftar buku pelajaran per jurusan dan koleksi buku umum untuk siswa.</p>
      </div>
      <div class="catalog-block">
        <div class="catalog-header">
          <h3>Buku Pelajaran per Jurusan</h3>
          <p class="sub">Koleksi utama sesuai kompetensi keahlian.</p>
        </div>
        <div class="catalog-grid">
          <div class="card catalog-card">
            <span class="catalog-tag">RPL</span>
            <h4>Rekayasa Perangkat Lunak</h4>
            <ul class="catalog-list">
              <li>Algoritma dan Pemrograman</li>
              <li>Basis Data Dasar</li>
              <li>UI/UX Design</li>
            </ul>
          </div>
          <div class="card catalog-card">
            <span class="catalog-tag">TKJ</span>
            <h4>Teknik Komputer &amp; Jaringan</h4>
            <ul class="catalog-list">
              <li>Jaringan Komputer Dasar</li>
              <li>Administrasi Server</li>
              <li>Keamanan Jaringan</li>
            </ul>
          </div>
          <div class="card catalog-card">
            <span class="catalog-tag">AKL</span>
            <h4>Akuntansi dan Keuangan</h4>
            <ul class="catalog-list">
              <li>Akuntansi Dasar</li>
              <li>Spreadsheet Bisnis</li>
              <li>Perpajakan</li>
            </ul>
          </div>
          <div class="card catalog-card">
            <span class="catalog-tag">DKV</span>
            <h4>Desain Komunikasi Visual</h4>
            <ul class="catalog-list">
              <li>Desain Grafis</li>
              <li>Fotografi Dasar</li>
              <li>Animasi 2D</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="catalog-block">
        <div class="catalog-header">
          <h3>Buku Umum</h3>
          <p class="sub">Literasi, wawasan, dan pengembangan diri.</p>
        </div>
        <div class="table">
          <div class="table-head">
            <span>Judul</span>
            <span>Kategori</span>
            <span>Stok</span>
            <span>Status</span>
          </div>
          <div class="table-row">
            <span>Laskar Pelangi</span>
            <span>Literasi</span>
            <span>6</span>
            <span class="badge success">Tersedia</span>
          </div>
          <div class="table-row">
            <span>Sejarah Indonesia</span>
            <span>Sosial</span>
            <span>3</span>
            <span class="badge warn">Terbatas</span>
          </div>
          <div class="table-row">
            <span>Sains Populer</span>
            <span>Sains</span>
            <span>5</span>
            <span class="badge success">Tersedia</span>
          </div>
          <div class="table-row">
            <span>Kewirausahaan Muda</span>
            <span>Bisnis</span>
            <span>2</span>
            <span class="badge warn">Terbatas</span>
          </div>
          <div class="table-row">
            <span>Komunikasi Efektif</span>
            <span>Pengembangan Diri</span>
            <span>4</span>
            <span class="badge success">Tersedia</span>
          </div>
        </div>
      </div>
    </section>

    <section id="dashboard" class="section dashboard">
      <div class="section-title">
        <h2>Dashboard Siswa</h2>
        <p>Ringkasan peminjaman, notifikasi jatuh tempo, dan histori transaksi.</p>
      </div>
      <div class="dashboard-grid">
        <div class="card">
          <h3>Ringkasan</h3>
          <ul class="list">
            <li><span>Total buku dipinjam</span><strong data-student-total>0</strong></li>
            <li><span>Jatuh tempo minggu ini</span><strong data-student-due>0</strong></li>
            <li><span>Denda berjalan</span><strong data-student-fine>Rp 0</strong></li>
          </ul>
        </div>
        <div class="card">
          <h3>Notifikasi</h3>
          <div class="notice-stack" data-student-notices></div>
          <div class="empty-state show" data-student-empty>Belum ada notifikasi.</div>
        </div>
        <div class="card">
          <h3>Riwayat Peminjaman dan Pengembalian</h3>
          <div class="history-list" data-history-list></div>
          <div class="empty-state show" data-history-empty>Belum ada riwayat peminjaman.</div>
        </div>
      </div>
    </section>

    <section class="section library-insight" id="perpustakaan">
      <div class="section-title">
        <h2>Dunia Perpustakaan Sekolah Modern</h2>
        <p>Perpustakaan bukan sekadar ruang buku, tapi pusat literasi, riset, dan kreativitas siswa.</p>
      </div>
      <div class="insight-grid">
        <div class="card">
          <h3>Gerbang Literasi</h3>
          <p>Perpustakaan membangun budaya membaca yang konsisten, memperkuat kemampuan memahami informasi, dan menambah wawasan.</p>
        </div>
        <div class="card">
          <h3>Sirkulasi yang Tertib</h3>
          <p>Dengan sistem digital, peminjaman dan pengembalian tercatat rapi sehingga siswa dan admin mudah melacak status buku.</p>
        </div>
        <div class="card">
          <h3>Ruang Riset Siswa</h3>
          <p>Siswa dapat mengakses referensi untuk tugas, proyek, dan pengembangan keterampilan berpikir kritis secara mandiri.</p>
        </div>
        <div class="card">
          <h3>Kolaborasi & Kreativitas</h3>
          <p>Perpustakaan menjadi ruang kolaborasi, diskusi, dan lahirnya ide kreatif melalui kegiatan literasi sekolah.</p>
        </div>
      </div>
    </section>

    <section class="section library-history" id="sejarah">
      <div class="section-title">
        <h2>Sejarah Perpustakaan Umum</h2>
        <p>Perpustakaan umum berkembang sebagai ruang berbagi ilmu yang terbuka untuk semua kalangan.</p>
      </div>
      <div class="insight-grid">
        <div class="card">
          <h3>Akses Pengetahuan untuk Semua</h3>
          <p>Sejak awal, perpustakaan umum hadir sebagai tempat belajar gratis agar masyarakat dapat meningkatkan literasi dan wawasan.</p>
        </div>
        <div class="card">
          <h3>Transformasi Digital</h3>
          <p>Perpustakaan modern memadukan koleksi fisik dengan layanan digital untuk memperluas akses informasi.</p>
        </div>
        <div class="card">
          <h3>Ruang Komunitas</h3>
          <p>Perpustakaan umum menjadi pusat aktivitas edukatif seperti diskusi buku, pelatihan, dan kegiatan literasi.</p>
        </div>
        <div class="card">
          <h3>Warisan Pengetahuan</h3>
          <p>Perpustakaan menyimpan arsip penting, sejarah lokal, serta dokumentasi budaya yang terus dijaga.</p>
        </div>
      </div>
    </section>

    <section id="pembayaran" class="section payment" data-requires-auth>
      <div class="section-title">
        <h2>Pembayaran Denda via QRIS</h2>
        <p>Bayar denda keterlambatan secara cepat dan aman menggunakan QRIS SiPerdi.</p>
      </div>
      <div class="lockable">
        <div class="payment-grid">
          <div class="card">
            <h3>QRIS SiPerdi</h3>
            <p>Scan QRIS berikut menggunakan aplikasi e-wallet atau mobile banking.</p>
            <img class="qris-img" src="{{ asset('img/gopay.png') }}" alt="QRIS SiPerdi" />
          </div>
          <div class="card">
            <h3>Langkah Pembayaran</h3>
            <ol class="steps">
              <li>Buka aplikasi pembayaran favorit.</li>
              <li>Scan QRIS SiPerdi.</li>
              <li>Masukkan nominal denda sesuai tagihan.</li>
              <li>Simpan bukti pembayaran dan konfirmasi ke admin.</li>
            </ol>
            <div class="notice warn">Pastikan nominal sesuai dengan tagihan sistem.</div>
          </div>
        </div>
      </div>
      <div class="guard">
        <p>Silakan login terlebih dahulu untuk melihat QRIS pembayaran denda.</p>
        <button class="btn solid" data-open-auth="login-student">Login</button>
      </div>
    </section>

    <section id="kontak" class="section contact">
      <div class="section-title">
        <h2>Kontak Admin SiPerdi</h2>
        <p>Butuh bantuan, konsultasi, atau konfirmasi pembayaran? Hubungi admin melalui kanal resmi berikut.</p>
      </div>
      <div class="contact-grid">
        <a class="contact-card" href="https://wa.me/6285779824006" target="_blank" rel="noopener">
          <img src="{{ asset('img/whatsapp.jpg') }}" alt="WhatsApp" />
          <div>
            <h4>WhatsApp Admin</h4>
            <p>+62 857-7982-4006</p>
          </div>
        </a>
        <a class="contact-card" href="mailto:admin@SiPerdi.my.id">
          <img src="{{ asset('img/email') }}" alt="Email" />
          <div>
            <h4>Email</h4>
            <p>admin@SiPerdi.my.id</p>
          </div>
        </a>
        <a class="contact-card" href="https://instagram.com/RedifyLabs.24" target="_blank" rel="noopener">
          <img src="{{ asset('img/instagram') }}" alt="Instagram" />
          <div>
            <h4>Instagram</h4>
            <p>@RedifyLabs.24</p>
          </div>
        </a>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div>
      <p class="brand-title">PT. Readify Labs</p>
      <p class="footer-text">Innovate. Educate. Elevate.</p>
      <p class="footer-text">Dikelola admin web untuk transformasi digital perpustakaan SMK Negeri 1 Cikarang Selatan.</p>
    </div>
    <div class="footer-links">
      <a href="#fitur">Fitur</a>
      <a href="#alur">Alur</a>
      <a href="#katalog">Katalog</a>
      <a href="#dashboard">Dashboard</a>
    </div>
  </footer>

  <div class="modal" id="auth-modal" aria-hidden="true">
    <div class="modal-backdrop" data-close-auth></div>
    <div class="modal-card">
      <button class="close" data-close-auth>&times;</button>
      <div class="auth-tabs">
        <button class="tab active" data-auth-tab="login">Login</button>
        <button class="tab" data-auth-tab="signup">Sign Up</button>
      </div>
      <div class="auth-panel" data-auth-panel="login">
        <h3>Masuk Akun <span data-role-label> Siswa</span></h3>
        <p class="sub" data-role-desc>Gunakan email sekolah dan kata sandi.</p>
        <div class="role-switch" data-role-switch>
          <button type="button" class="role-btn active" data-role="student">Siswa</button>
          <button type="button" class="role-btn" data-role="admin">Admin</button>
        </div>
        <form class="form" data-form="login">
          <input type="hidden" name="role" value="student" />
          <label>Email</label>
          <input type="email" name="email" placeholder="nama@sekolah.id" required />
          <label>Kata Sandi</label>
          <input type="password" name="password" placeholder="********" required />
          <div class="form-message" data-message="login"></div>
          <button class="btn solid full">Masuk</button>
        </form>
        <p class="switch">
          Belum punya akun?
          <button type="button" class="link" data-auth-switch="signup">Sign Up</button>
        </p>
      </div>
      <div class="auth-panel hidden" data-auth-panel="signup">
        <h3>Daftar Akun <span data-role-label> Siswa</span></h3>
        <p class="sub" data-role-desc>Isi data sesuai identitas agar akun tervalidasi.</p>
        <div class="role-switch" data-role-switch>
          <button type="button" class="role-btn active" data-role="student">Siswa</button>
          <button type="button" class="role-btn" data-role="admin">Admin</button>
        </div>
        <form class="form" data-form="signup">
          <input type="hidden" name="role" value="student" />
          <label>Nama Lengkap</label>
          <input type="text" name="name" placeholder="Nama Lengkap" required />
          <div data-role-fields="student">
            <label>NISN</label>
            <input type="text" name="nisn" placeholder="0000000000" />
            <label>Kelas</label>
            <input type="text" name="kelas" placeholder="XI RPL 2" />
          </div>
          <div data-role-fields="admin" class="hidden">
            <label>Kode Admin</label>
            <input type="number" name="admin_code" placeholder="Masukkan kode admin" inputmode="numeric" />
            <p class="sub">Kode hanya diketahui oleh admin perpustakaan.</p>
          </div>
          <label>Email</label>
          <input type="email" name="email" placeholder="nama@sekolah.id" required />
          <label>Kata Sandi</label>
          <input type="password" name="password" placeholder="Minimal 8 karakter" minlength="8" required />
          <div class="form-message" data-message="signup"></div>
          <button class="btn solid full">Daftar</button>
        </form>
        <p class="switch">
          Sudah punya akun?
          <button type="button" class="link" data-auth-switch="login">Login</button>
        </p>
      </div>
    </div>
  </div>

  <div class="logo-modal" id="logo-modal" aria-hidden="true">
    <div class="logo-backdrop" data-close-logo></div>
    <div class="logo-dialog">
      <img src="" alt="Logo" data-logo-image />
    </div>
  </div>

  <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
