/* =========================================
   1. HAMBURGER MENU (MOBILE)
========================================= */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Ubah ikon bar ke silang
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      icon.classList.replace('fa-xmark', 'fa-bars');
    }
  });
}

// Tutup menu saat link diklik
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    if(hamburger) hamburger.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
  });
});

/* =========================================
   2. DATA GALERI
========================================= */
const galleryData = [
  {
    src: 'img/foto1.1.jpeg',
    date: '27 Des 2025',
    category: 'Rapat',
    title: 'Koordinasi Perdana',
    desc: 'Pembentukan struktur organisasi dan pembagian tugas inti kelompok.'
  },
  {
    src: 'img/foto2.png?v=2',
    date: '31 Des 2025',
    category: 'Rapat',
    title: 'Koordinasi Perdana DPL',
    desc: 'Koordinasi ke seluruh Kelompok DPL. KKN PLP dilaksanakan bersamaan dengan KKN semester 5 dan 6. PLP 1 dilakukan 2 hari per minggu di sekolah untuk observasi aktivitas guru dan proses pembelajaran, sedangkan PLP 2 berupa pelaksanaan tugas sebagai pengajar sesuai arahan guru pamong. Mahasiswa wajib menyusun 11 program kerja (masing-masing 1 proker) yang relevan dengan kebutuhan desa dan bidang jurusan, dengan target minimal 80% proker terlaksana. Koordinasi dan etika sangat ditekankan, terutama saat meminta bantuan kepada pihak desa. Mahasiswa diharapkan tinggal di posko, melakukan absen KKN mingguan kepada DPL, serta membuat absen PLP disertai foto berseragam. Satu guru pamong membimbing tiga mahasiswa, dan kegiatan survei dilaksanakan tanggal 5 dengan tetap berkoordinasi bersama DPL.'
  },
  {
    src: 'img/foto3.jpeg?v=2',
    date: 'XX bulan XXXX',
    category: 'Sosialisasi',
    title: 'soon',
    desc: '--'
  },
  {
    src: 'img/disini.jpeg',
    date: 'XX bulan XXXX',
    category: 'Observasi',
    title: 'soon',
    desc: '--'
  },
];

/* =========================================
   3. RENDER GALERI (DENGAN FITUR LACI/READ MORE)
========================================= */
const galleryContainer = document.getElementById('gallery-grid');

if (galleryContainer) {
  // Kosongkan container dulu untuk mencegah duplikasi
  galleryContainer.innerHTML = '';

  galleryData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card reveal';
    
    // Trik Animasi: Muncul satu per satu
    card.style.transitionDelay = `${index * 0.1}s`; 

    // --- LOGIKA BARU: CEK PANJANG TEKS ---
    // Jika teks lebih dari 120 huruf, anggap panjang
    const isLongText = item.desc.length > 120;
    
    // Jika panjang, buat tombolnya. Jika pendek, kosongkan.
    const buttonHtml = isLongText 
      ? `<button class="read-more-btn" onclick="toggleDesc(this)">
           Baca Selengkapnya <i class="fa-solid fa-chevron-down"></i>
         </button>` 
      : '';

    card.innerHTML = `
      <div class="card-img">
        <img src="${item.src}" alt="${item.title}" loading="lazy"
             onerror="this.onerror=null; this.parentElement.style.background='#e2e8f0'; this.style.display='none';">
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-tag">${item.category}</span>
          <span><i class="fa-regular fa-calendar"></i> ${item.date}</span>
        </div>
        <h3 class="card-title">${item.title}</h3>
        
        <p class="card-desc">${item.desc}</p>
        
        ${buttonHtml}
      </div>
    `;

    galleryContainer.appendChild(card);
  });
}

// --- FUNGSI TAMBAHAN UNTUK KLIK TOMBOL ---
function toggleDesc(btn) {
  // Cari elemen paragraf deskripsi di atas tombol ini (previous sibling)
  const desc = btn.previousElementSibling; 
  
  // Toggle class 'open' di deskripsi (diatur di CSS)
  desc.classList.toggle('open');
  
  // Toggle class 'active' di tombol (untuk putar panah)
  btn.classList.toggle('active');

  // Ubah tulisan tombol sesuai kondisi
  if (desc.classList.contains('open')) {
    btn.innerHTML = `Tutup <i class="fa-solid fa-chevron-up"></i>`;
  } else {
    btn.innerHTML = `Baca Selengkapnya <i class="fa-solid fa-chevron-down"></i>`;
  }
}

/* =========================================
   4. SCROLL ANIMATION (Optimized)
========================================= */
const observerOptions = {
  threshold: 0.1 // Elemen muncul saat 10% terlihat
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Stop observe setelah muncul agar browser tidak kerja terus menerus
      observer.unobserve(entry.target); 
    }
  });
}, observerOptions);

// Jalankan observer setelah halaman selesai loading sepenuhnya
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
});