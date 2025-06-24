# Go-Blog | Blog Sederhana dengan Penyimpanan Markdown (Pure HTML/CSS/JS)

![Animasi](https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyNHo3ODlqaWlldGMxb3Q0OGFldWJlZ2ZidDhwOWo5NHNpb2pxaDkyMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Hn61kteX5s3Wogno6o/giphy.gif)

Berikut penjelasan lengkap tentang **Go-Blog|Blog Sederhana** yang dibangun menggunakan ![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white), ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white), dan ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) tanpa backend atau framework:

---

## **Deskripsi Proyek**
Sebuah **blog statis** yang menyimpan postingan dalam format **Markdown** dan berjalan sepenuhnya di sisi klien (browser). Blog ini cocok untuk:
- Pembelajaran pemrograman web dasar
- Blog pribadi sederhana
- Prototyping sebelum mengembangkan sistem lengkap
- Demonstrasi penggunaan **localStorage** sebagai database sementara

---


## **Fitur Utama**

### 1. **Sistem Penyimpanan**
- Menggunakan **localStorage** sebagai database sementara
- Setiap postingan disimpan dalam format:
  ```javascript
  {
    title: "Judul Postingan",
    content: "Isi dalam markdown...",
    createdAt: "2023-10-01T12:00:00Z"
  }
  ```
- **Slug otomatis** dari judul (contoh: "Blog Pertama" → `blog-pertama`)

### 2. **Editor Markdown Sederhana**
- Mendukung sintaks dasar:
  ```markdown
  # Heading 1
  **Tebal**, *miring*
  [Link](contoh.com)
  ![Gambar](foto.jpg)
  - List
  1. Berurut
  > Blockquote
  `kode`
  ```

### 3. **Tampilan Responsif**
- Desain adaptif untuk mobile dan desktop
- Navigasi konsisten di semua halaman

### 4. **Manajemen Konten**
- **Create**: Buat postingan baru via `admin.html`
- **Read**: Lihat daftar postingan (`index.html`) atau baca lengkap (`view.html`)
- **Update**: Edit postingan yang ada
- **Delete**: Hapus postingan (hanya di mode admin)

### 5. **Pemisahan Tampilan**
- **Mode Pengunjung** (`index.html`):
  - Hanya menampilkan daftar postingan
  - Tanpa tombol edit/hapus
- **Mode Admin** (`admin-index.html`):
  - Menampilkan tombol aksi (edit/hapus)
  - Navigasi ke form editor

---

## **Cara Penggunaan**

1. **Buat Postingan Baru**:
   - Buka `admin.html`
   - Isi judul dan konten (markdown)
   - Klik "Simpan"

2. **Lihat Postingan**:
   - Buka `index.html` untuk daftar postingan
   - Klik judul untuk membaca lengkap di `view.html`

3. **Kelola Konten**:
   - Akses `admin-index.html` untuk:
     - Edit postingan
     - Hapus postingan

---

## **Keterbatasan**
1. **Penyimpanan Sementara**:
   - Data hanya tersimpan di browser yang sama
   - Kapasitas maksimal ~5MB
   - Hilang jika localStorage direset

2. **Keamanan Dasar**:
   - Tidak ada sistem login (admin panel terbuka)
   - **Solusi**: Tambahkan login (kalo mau)

3. **Fitur Terbatas**:
   - Tidak ada pencarian, kategori, atau tag
   - Tidak ada komentar

---

## **Teknologi yang Digunakan**
- ![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white): Struktur halaman
- ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white): Styling dan layout responsive
- ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E):
  - DOM Manipulation
  - localStorage API
  - Markdown parsing sederhana
- ![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white): Format penulisan konten

---

## **Potensi Pengembangan**
1. **Penyimpanan Permanen**:
   - Integrasi dengan ![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black) atau ![Github Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github%20Pages&logoColor=white)
   - Penyimpanan file markdown di folder `/posts/`

---

## **Mengapa Blog Ini Berguna?**
✅ **Tanpa Server**: Cukup buka file HTML di browser  
✅ **Cocok untuk Pemula**: Kode sederhana dan mudah dimodifikasi  
✅ **Portabel**: Bisa dihosting di GitHub Pages, Netlify, dll.  
✅ **Latihan JavaScript**: Praktik nyata penggunaan localStorage dan DOM  

---
## 🔗 **Link Percobaan Live Demo**
Anda dapat mencoba langsung melalui GitHub Pages:
👉 https://leowahata.github.io/Go-Blog/

---
## ☕ Buy me a Coffee  
Jika project ini membantumu, pertimbangkan untuk membelikan segelas kopi 😁
[![Kofi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](ko-fi.com/leowahatta)
Terima kasih atas supportnya! 🙏  
