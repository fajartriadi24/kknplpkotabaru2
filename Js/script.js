/* =========================================
   1. HAMBURGER MENU (LOGIKA MOBILE)
   ========================================= */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const icon = hamburger ? hamburger.querySelector('i') : null;

// Hanya jalankan jika elemen hamburger ada di halaman
if (hamburger && navMenu && icon) {
  
  // Saat tombol diklik
  hamburger.addEventListener('click', () => {
    // Toggle class 'active'
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Ubah ikon: Garis Tiga <-> Silang (X)
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });

  // Tutup menu otomatis saat link diklik
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    });
  });
}

/* =========================================
   2. DATA GALERI (FOTO & TEKS)
   ========================================= */
const galleryData = [
  // FOTO 1
  {
    src: 'img/foto1.jpeg', 
    date: '27 Des 2025',      
    category: 'Rapat',        
    title: 'Koordinasi Perdana', 
    desc: 'Pertemuan pertama rapat koordinasi KKN PLP. Pembentukan struktur kepanitiaan serta pembagian tugas kepada seluruh anggota.'
  },



  // Anda bisa tambah Foto 3 disini dengan format yang sama...
];

/* =========================================
   3. RENDER GALERI (MENAMPILKAN KE HTML)
   ========================================= */
const galleryContainer = document.getElementById('gallery');

if (galleryContainer) {
  galleryData.forEach((item, index) => {
    // 1. Buat Elemen Kartu
    const card = document.createElement('div');
    card.classList.add('gallery-card', 'fade-in');
    
    // Efek Waterfall (Muncul bergantian)
    card.style.animationDelay = `${index * 0.15}s`; 

    // 2. Isi HTML Kartu
    card.innerHTML = `
      <div class="gallery-img-wrapper">
        <img src="${item.src}" alt="${item.title}">
        
        <div class="date-badge">
          <span class="icon"><i class="fa-regular fa-calendar"></i></span> ${item.date}
        </div>
      </div>
      
      <div class="gallery-info">
        <div class="gallery-meta">${item.category}</div>
        
        <div class="gallery-title">${item.title}</div>
        
        <div class="gallery-line"></div>
        
        <div class="gallery-desc">${item.desc}</div>
      </div>
    `;

    // 3. Masukkan ke halaman
    galleryContainer.appendChild(card);
  });
}