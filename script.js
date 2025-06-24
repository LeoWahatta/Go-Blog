// Simpan postingan di localStorage sebagai fallback
const BLOG_STORAGE_KEY = 'blog_posts';

// Fungsi untuk mendapatkan atau membuat penyimpanan postingan
function getPostStorage() {
  const stored = localStorage.getItem(BLOG_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}

// Fungsi untuk menyimpan postingan
function savePostStorage(posts) {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
}

// Fungsi untuk mengubah markdown ke HTML (sederhana)
function markdownToHTML(markdown) {
  // Header
  markdown = markdown.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  markdown = markdown.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  markdown = markdown.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  
  // Bold dan italic
  markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Link
  markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
  
  // Gambar
  markdown = markdown.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
  
  // Kode inline
  markdown = markdown.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // Kode block
  markdown = markdown.replace(/```([a-z]*)\n([\s\S]*?)\n```/g, '<pre><code class="language-$1">$2</code></pre>');
  
  // List tidak berurut
  markdown = markdown.replace(/^\s*\*\s(.*$)/gm, '<li>$1</li>');
  markdown = markdown.replace(/(<li>.*<\/li>)+/g, function(match) {
    return '<ul>' + match + '</ul>';
  });
  
  // List berurut
  markdown = markdown.replace(/^\s*\d+\.\s(.*$)/gm, '<li>$1</li>');
  markdown = markdown.replace(/(<li>.*<\/li>)+/g, function(match) {
    return '<ol>' + match + '</ol>';
  });
  
  // Blockquote
  markdown = markdown.replace(/^\>\s(.*$)/gm, '<blockquote>$1</blockquote>');
  
  // Garis horizontal
  markdown = markdown.replace(/^\-{3,}$/gm, '<hr>');
  
  // Tabel (sederhana)
  markdown = markdown.replace(/^\|(.+)\|$/gm, function(match, cells) {
    const header = cells.split('|').map(cell => `<th>${cell.trim()}</th>`).join('');
    return `<table><tr>${header}</tr></table>`;
  });
  
  // Paragraf (untuk teks biasa)
  markdown = markdown.replace(/^(?!<[a-z])(.*$)/gm, function(match) {
    if (match.trim().length === 0) return '';
    return '<p>' + match + '</p>';
  });
  
  return markdown;
}

// Fungsi untuk membuat slug dari judul
function createSlug(title) {
  return title.toLowerCase()
    .replace(/[^\w\s-]/g, '') // Hapus karakter non-word
    .replace(/\s+/g, '-') // Ganti spasi dengan -
    .replace(/--+/g, '-') // Ganti multi - dengan single -
    .replace(/^-+/, '') // Hapus - dari awal
    .replace(/-+$/, ''); // Hapus - dari akhir
}

// Fungsi untuk memuat daftar postingan
function loadPosts() {
  const postsList = document.getElementById('posts-list'); // Tampilan umum
  const adminPostsList = document.getElementById('posts-list-admin'); // Tampilan admin
  
  if (!postsList && !adminPostsList) return;
  
  const posts = getPostStorage();
  const postKeys = Object.keys(posts);
  
  // Tampilan untuk pengunjung biasa
  if (postsList) {
    postsList.innerHTML = '';
    
    if (postKeys.length === 0) {
      postsList.innerHTML = '<p>Belum ada postingan.</p>';
      return;
    }
    
    postKeys.forEach(slug => {
      const post = posts[slug];
      const postElement = document.createElement('div');
      postElement.className = 'post-item';
      postElement.innerHTML = `
        <h3><a href="view.html?post=${encodeURIComponent(slug)}">${post.title}</a></h3>
        <p>${post.content.substring(0, 100)}...</p>
        <!-- Tidak ada tombol aksi untuk pengunjung -->
      `;
      postsList.appendChild(postElement);
    });
  }
  
  // Tampilan khusus admin
  if (adminPostsList) {
    adminPostsList.innerHTML = '';
    
    if (postKeys.length === 0) {
      adminPostsList.innerHTML = '<p>Belum ada postingan.</p>';
      return;
    }
    
    postKeys.forEach(slug => {
      const post = posts[slug];
      const postElement = document.createElement('div');
      postElement.className = 'post-item';
      postElement.innerHTML = `
        <h3><a href="view.html?post=${encodeURIComponent(slug)}">${post.title}</a></h3>
        <p>${post.content.substring(0, 100)}...</p>
        <div class="post-actions">
          <a href="admin.html?edit=${encodeURIComponent(slug)}" class="edit-post">Edit</a>
          <a href="#" data-slug="${slug}" class="delete-post">Hapus</a>
        </div>
      `;
      adminPostsList.appendChild(postElement);
    });
    
    // Tambahkan event listener untuk tombol hapus
    document.querySelectorAll('.delete-post').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const slug = this.getAttribute('data-slug');
        deletePost(slug);
      });
    });
  }
}

// Fungsi untuk memuat postingan tertentu
function loadPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postSlug = urlParams.get('post');
  
  if (!postSlug) {
    window.location.href = 'index.html';
    return;
  }
  
  const posts = getPostStorage();
  const post = posts[postSlug];
  
  if (!post) {
    document.getElementById('post-content').innerHTML =
      '<p>Postingan tidak ditemukan.</p>';
    return;
  }
  
  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-content').innerHTML = markdownToHTML(post.content);
}

// Fungsi untuk menyimpan postingan baru
function savePost(title, content) {
  const slug = createSlug(title);
  const posts = getPostStorage();
  
  posts[slug] = {
    title: title,
    content: content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  savePostStorage(posts);
  return slug;
}

// Fungsi untuk menghapus postingan
function deletePost(slug) {
  if (!confirm('Apakah Anda yakin ingin menghapus postingan ini?')) return;
  
  const posts = getPostStorage();
  delete posts[slug];
  savePostStorage(posts);
  loadPosts();
  
  // Jika sedang melihat postingan yang dihapus, redirect ke home
  const urlParams = new URLSearchParams(window.location.search);
  const currentPost = urlParams.get('post');
  if (currentPost === slug) {
    window.location.href = 'index.html';
  }
}

// Fungsi untuk mengedit postingan
function editPost(slug) {
  const posts = getPostStorage();
  const post = posts[slug];
  
  if (!post) {
    alert('Postingan tidak ditemukan');
    return;
  }
  
  // Isi form dengan data postingan
  document.getElementById('title').value = post.title;
  document.getElementById('content').value = post.content;
  
  // Tambahkan slug sebagai data attribute ke form untuk update
  const form = document.getElementById('post-form');
  form.setAttribute('data-edit-slug', slug);
  
  // Scroll ke form
  form.scrollIntoView({ behavior: 'smooth' });
}

// Fungsi untuk menangani form admin
function setupAdminForm() {
  const form = document.getElementById('post-form');
  if (!form) return;
  
  // Cek apakah mode edit
  const urlParams = new URLSearchParams(window.location.search);
  const editSlug = urlParams.get('edit');
  
  if (editSlug) {
    editPost(editSlug);
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    
    if (!title || !content) {
      alert('Judul dan konten harus diisi!');
      return;
    }
    
    // Cek apakah mode edit
    const isEditMode = form.hasAttribute('data-edit-slug');
    let slug;
    
    if (isEditMode) {
      // Mode edit - update postingan yang ada
      const oldSlug = form.getAttribute('data-edit-slug');
      const posts = getPostStorage();
      const post = posts[oldSlug];
      
      if (!post) {
        alert('Postingan tidak ditemukan untuk diupdate');
        return;
      }
      
      // Hapus yang lama jika slug berubah
      slug = createSlug(title);
      if (oldSlug !== slug) {
        delete posts[oldSlug];
      }
      
      // Update postingan
      posts[slug] = {
        title: title,
        content: content,
        createdAt: post.createdAt, // Pertahankan tanggal dibuat
        updatedAt: new Date().toISOString() // Update tanggal modifikasi
      };
      
      savePostStorage(posts);
      alert('Postingan berhasil diupdate!');
    } else {
      // Mode buat baru
      slug = savePost(title, content);
      alert('Postingan berhasil disimpan!');
    }
    
    form.reset();
    if (form.hasAttribute('data-edit-slug')) {
      form.removeAttribute('data-edit-slug');
    }
    loadPosts();
    
    // Buka postingan yang baru dibuat/diupdate
    window.location.href = `view.html?post=${encodeURIComponent(slug)}`;
  });
}

// Inisialisasi berdasarkan halaman saat ini
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop();
  
  if (path === 'index.html' || path === '') {
    loadPosts();
  } else if (path === 'admin-index.html') {
    loadPosts(); // Memuat daftar postingan untuk admin
  } else if (path === 'view.html') {
    loadPost();
  } else if (path === 'admin.html') {
    setupAdminForm();
    loadPosts();
  }
});