# SiPerdi - Frontend UI (Laravel-ready)

Struktur ini menyiapkan tampilan UI SiPerdi dengan warna putih dan merah serta efek lighting sesuai logo Readify Labs dan SMK Negeri 1 Cikarang Selatan. Login dan signup berfungsi untuk demo menggunakan penyimpanan lokal (localStorage). Untuk produksi, tetap disarankan menggunakan autentikasi Laravel.

## Struktur
- public/index.html: versi static untuk preview cepat
- public/css/app.css: style utama
- public/js/app.js: interaksi modal login, signup, profil, dan peminjaman
- public/img/logo.svg: logo Readify Labs (vector)
- public/img/logo-smkn1.svg: logo sekolah placeholder (silakan ganti dengan logo asli)
- resources/views/welcome.blade.php: versi Blade untuk Laravel
- routes/web.php: contoh route ke view welcome

## Cara Preview Cepat
Buka file `public/index.html` lewat browser.

## Integrasi Laravel
Salin folder `public` dan `resources` ke proyek Laravel, lalu pastikan `routes/web.php` berisi route ke `welcome`.

## Catatan Login/Signup & Profil
Mode demo menggunakan localStorage agar alur login, signup, profil, dan peminjaman bisa dicoba tanpa backend. Untuk implementasi nyata, hubungkan dengan sistem autentikasi Laravel dan database.
