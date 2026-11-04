document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCrops();
  initGallery();
  initFarmingPractices();
  initContactForm();
  initBackToTop();
  initScrollSpy();
});

function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
      
      mobileToggle.innerHTML = isExpanded 
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });

    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

function initCrops() {
  const cropsGrid = document.getElementById('cropsGrid');
  const filterBtns = document.querySelectorAll('.crops-filter-bar .filter-btn');
  const cropModal = document.getElementById('cropModal');
  const cropModalContent = document.getElementById('cropModalContent');
  const closeModalBtn = document.getElementById('closeCropModal');

  if (!cropsGrid || typeof cropsData === 'undefined') return;

  function renderCrops(category = 'all') {
    const filtered = (category === 'all') 
      ? cropsData 
      : cropsData.filter(crop => crop.category === category);

    cropsGrid.innerHTML = filtered.map(crop => `
      <article class="crop-card" data-crop-id="${crop.id}">
        <div class="crop-img-wrap">
          <img 
            src="${crop.image}" 
            alt="Field of ${crop.name} growing at MyFarm" 
            class="crop-img" 
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'"
          />
          <span class="crop-season-tag">${crop.season}</span>
          <span class="crop-category-badge">${crop.categoryLabel}</span>
        </div>
        <div class="crop-body">
          <div class="crop-header">
            <h3 class="crop-name">${crop.name}</h3>
            <span class="crop-alt-name">${crop.hindiName}</span>
          </div>
          <p class="crop-description">${crop.shortDescription}</p>
          <div class="crop-meta-quick">
            <span><strong>Sowing:</strong> ${crop.sowingPeriod}</span>
            <span><strong>Harvest:</strong> ${crop.harvestPeriod}</span>
            <span><strong>Soil Preference:</strong> ${crop.soilType}</span>
          </div>
          <button type="button" class="crop-btn-details" data-open-crop="${crop.id}">
            <span>View Cultivation Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </button>
        </div>
      </article>
    `).join('');

    const detailButtons = cropsGrid.querySelectorAll('[data-open-crop]');
    detailButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cropId = btn.getAttribute('data-open-crop');
        openCropModal(cropId);
      });
    });
  }

  renderCrops('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderCrops(category);
    });
  });

  function openCropModal(cropId) {
    const crop = cropsData.find(c => c.id === cropId);
    if (!crop || !cropModal || !cropModalContent) return;

    cropModalContent.innerHTML = `
      <img src="${crop.image}" alt="${crop.name} at MyFarm" class="modal-crop-img" />
      <div class="modal-crop-body">
        <div class="modal-crop-header">
          <div class="modal-crop-tags">
            <span class="crop-season-tag" style="position:static;display:inline-block;">${crop.season}</span>
            <span class="crop-category-badge" style="position:static;display:inline-block;">${crop.categoryLabel}</span>
          </div>
          <h2 class="modal-crop-title">${crop.name} <small style="font-size:1rem;color:var(--brown-600);font-weight:normal;">(${crop.hindiName})</small></h2>
        </div>
        <p class="modal-crop-desc">${crop.fullDescription}</p>
        
        <div class="modal-specs-grid">
          <div class="spec-item">
            <span class="spec-label">Cultivation Cycle</span>
            <span class="spec-val">${crop.season} (${crop.sowingPeriod} – ${crop.harvestPeriod})</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Soil Conditions</span>
            <span class="spec-val">${crop.soilType}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Water & Irrigation</span>
            <span class="spec-val">${crop.waterRequirement}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Our Farm Practice</span>
            <span class="spec-val">${crop.farmingMethod}</span>
          </div>
        </div>
      </div>
    `;

    cropModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCropModalHandler() {
    if (cropModal) {
      cropModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeCropModalHandler);
  }

  if (cropModal) {
    cropModal.addEventListener('click', (e) => {
      if (e.target === cropModal) closeCropModalHandler();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cropModal && cropModal.classList.contains('active')) {
      closeCropModalHandler();
    }
  });
}

function initFarmingPractices() {
  const practiceCards = document.querySelectorAll('.practice-card');
  practiceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--green-500)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
    });
  });
}

const galleryItemsData = [
  {
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
    category: "fields",
    title: "Morning Sun over the Acres",
    subtitle: "Lush green agricultural fields waking up under natural dawn sunlight",
    featured: true
  },
  {
    src: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80",
    category: "crops",
    title: "Ripening Golden Wheat",
    subtitle: "Close-up of healthy winter wheat heads awaiting spring harvest",
    featured: false
  },
  {
    src: "https://images.unsplash.com/photo-1588661661623-10023e38711e?auto=format&fit=crop&w=1200&q=80",
    category: "crops",
    title: "Vibrant Yellow Mustard Field",
    subtitle: "Winter blossoms across our crop acreage supporting natural pollinators",
    featured: false
  },
  {
    src: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23094?auto=format&fit=crop&w=1200&q=80",
    category: "farm-life",
    title: "Daily Field Inspection",
    subtitle: "Checking seedling emergence and soil moisture depth by hand",
    featured: false
  },
  {
    src: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=1200&q=80",
    category: "fields",
    title: "Paddy Field Water Channels",
    subtitle: "Terraced water channels nurturing young monsoon rice crops",
    featured: false
  },
  {
    src: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80",
    category: "farm-life",
    title: "Family Working the Land",
    subtitle: "Generations working together in our organic pulse & grain plots",
    featured: false
  },
  {
    src: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    category: "fields",
    title: "Freshly Tilled Soil",
    subtitle: "Aerated and enriched soil ready for the next seasonal sowing cycle",
    featured: false
  },
  {
    src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1400&q=80",
    category: "harvest",
    title: "Harvest Season on the Farm",
    subtitle: "Collecting healthy grain crops at optimal maturity under clear skies",
    featured: true
  }
];

let currentLightboxIndex = 0;
let currentFilteredGallery = [...galleryItemsData];

function initGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  const filterBtns = document.querySelectorAll('.gallery-filter-bar .filter-btn');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxSub = document.getElementById('lightboxSub');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (!galleryGrid) return;

  function renderGallery(filter = 'all') {
    currentFilteredGallery = (filter === 'all') 
      ? galleryItemsData 
      : galleryItemsData.filter(item => item.category === filter);

    galleryGrid.innerHTML = currentFilteredGallery.map((item, index) => `
      <div class="gallery-item ${item.featured ? 'featured' : ''}" data-index="${index}">
        <img 
          src="${item.src}" 
          alt="${item.title} - MyFarm" 
          class="gallery-img" 
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'"
        />
        <div class="gallery-overlay">
          <span class="gallery-item-tag">${item.category.replace('-', ' ')}</span>
          <h4 class="gallery-item-title">${item.title}</h4>
          <p class="gallery-item-sub">${item.subtitle}</p>
        </div>
        <div class="gallery-zoom-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
        </div>
      </div>
    `).join('');

    const items = galleryGrid.querySelectorAll('.gallery-item');
    items.forEach(el => {
      el.addEventListener('click', () => {
        const index = parseInt(el.getAttribute('data-index'), 10);
        openLightbox(index);
      });
    });
  }

  renderGallery('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-gallery-filter');
      renderGallery(filter);
    });
  });

  function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    if (lightbox) {
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function updateLightboxContent() {
    const item = currentFilteredGallery[currentLightboxIndex];
    if (!item || !lightboxImg) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxSub) lightboxSub.textContent = item.subtitle;
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function showNext() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentFilteredGallery.length;
    updateLightboxContent();
  }

  function showPrev() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentFilteredGallery.length) % currentFilteredGallery.length;
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

function initContactForm() {
  const contactForm = document.getElementById('farmContactForm');
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const submitBtn = contactForm.querySelector('.btn-submit');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name.length < 2) {
      alert('Please enter your full name (at least 2 characters).');
      nameInput.focus();
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please provide a valid email address.');
      emailInput.focus();
      return;
    }

    if (message.length < 10) {
      alert('Please enter a brief message with at least 10 characters.');
      messageInput.focus();
      return;
    }

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
      <span>Submitting message...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      contactForm.reset();

      showToast(`Thank you, ${name}! Your inquiry has been received. Our farm family will get back to you shortly.`);
    }, 900);
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showToast(msg) {
    if (!toastNotice || !toastMessage) {
      alert(msg);
      return;
    }
    toastMessage.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 5000);
  }
}

function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
