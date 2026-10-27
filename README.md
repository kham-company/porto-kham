# Personal Portfolio — Kham

Portfolio developer cinematic & interaktif. Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion + Lucide.

## Struktur

```
app/            layout, global css, halaman utama
components/     Navbar, Hero, About, Skills, FeaturedProject, Projects,
                ProjectModal, Experience, Contact, Footer, Reveal, SectionHead
lib/data.ts     SEMUA konten teks (nama, deskripsi, project, dsb) — edit di sini
public/images/  taruh foto kamu di sini
deploy/         contoh konfigurasi nginx
ecosystem.config.js  konfigurasi PM2
```

## Baru di v1.9

- **Bot Demo** — simulator chat Telegram interaktif (`demo` di `lib/data.ts`)
- **Layanan** dan **Alur Kerja** (`services`, `workflow`)
- **Aktivitas** — heatmap ilustrasi, bukan data commit asli (`activity`)
- **Now** — apa yang sedang dikerjakan (`now`)
- **Navigasi titik** di sisi layar (layar lebar), **pintasan keyboard** (`?`, `/`, `T`, `G`), dan **toast**
- **Jam lokal WIB** di Contact; atur jam aktif lewat `profile.activeHours`
- FAQ dan Changelog ikut diperbarui

## 1. Pasang foto pribadi

Belum ada foto asli yang terpasang (placeholder). Untuk memasang:

1. Simpan foto utama sebagai `public/images/avatar.jpg` (rasio disarankan 4:5, potret).
2. Buka `components/Hero.tsx`, cari komentar `GANTI PLACEHOLDER INI`, hapus blok
   placeholder (div gradient + ikon), lalu tambahkan:
   ```tsx
   <img
     src="/images/avatar.jpg"
     alt="Foto Kham"
     className="absolute inset-0 w-full h-full object-cover"
   />
   ```
3. (Opsional) Untuk foto background hero yang lebih sinematik, tambahkan foto
   kedua di `public/images/bg.jpg` dan pasang sebagai layer background section
   Hero (`components/Hero.tsx`, elemen `<section id="home">`) dengan overlay
   gradient supaya teks tetap terbaca — pola gradient overlay sudah tersedia
   di file yang sama, tinggal ganti radial-gradient dengan
   `background-image: url(/images/bg.jpg)` + `background-size: cover`.

## 2. Edit konten

Semua teks (headline, about, skills, daftar project, pengalaman, kontak) ada
di **`lib/data.ts`**. Tidak perlu menyentuh komponen untuk ganti teks.

## 3. Development lokal

```bash
npm install
npm run dev
```
Buka http://localhost:3000

## 4. Build production

```bash
npm run build
npm start   # jalan di port 3000
```

## 5. Deploy ke Ubuntu 24.04 VPS (Nginx + PM2 + HTTPS)

```bash
# di VPS
sudo apt update && sudo apt install -y nginx nodejs npm
sudo npm install -g pm2

# upload/clone project ke /var/www/portfolio, lalu:
cd /var/www/portfolio
npm install
npm run build

# jalankan dengan PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # ikuti instruksi yang muncul agar PM2 auto-start saat reboot

# konfigurasi nginx (lihat deploy/nginx.conf.example)
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/portfolio
sudo nano /etc/nginx/sites-available/portfolio   # ganti domainkamu.com
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# HTTPS gratis via Let's Encrypt
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d domainkamu.com -d www.domainkamu.com
```

Setelah update konten di masa depan: `git pull && npm run build && pm2 restart portfolio`.

## Catatan teknis

- Semua animasi menghormati `prefers-reduced-motion` (lihat `app/globals.css`).
- Warna, font, dan spacing token ada di `tailwind.config.ts`.
- Tidak ada dependency di luar yang disebutkan di brief (Next.js, React,
  TypeScript, Tailwind, Framer Motion, Lucide React).
