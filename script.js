/* ============================================
   EXPLORE OUTBOUND BATU - MAIN SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // === PRELOADER ===
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hide');
        setTimeout(() => preloader.remove(), 500);
      }, 400);
    });
  }

  // === NAVBAR SCROLL ===
  const navbar = document.querySelector('.navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // === MOBILE MENU TOGGLE ===
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navOverlay = document.querySelector('.nav-overlay');

  function openMobileMenu() {
    navToggle.classList.add('active');
    navMenu.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      if (navMenu.classList.contains('active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close menu when a nav link is clicked
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // === BACK TO TOP ===
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === SCROLL ANIMATIONS ===
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  function checkAnimations() {
    const triggerPoint = window.innerHeight * 0.85;
    animatedElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < triggerPoint) {
        el.classList.add('animated');
      }
    });
  }
  window.addEventListener('scroll', checkAnimations);
  checkAnimations();

  // === LIGHTBOX (Gallery) ===
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      const img = this.querySelector('img');
      if (lightbox && lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Close lightbox with ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMobileMenu();
    }
  });

  // === COUNTER ANIMATION ===
  const counters = document.querySelectorAll('.hero-stat .number, .counter');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      if (!target) return;
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      const suffix = counter.getAttribute('data-suffix') || '';
      const prefix = counter.getAttribute('data-prefix') || '';

      function updateCounter() {
        current += increment;
        if (current < target) {
          counter.textContent = prefix + Math.ceil(current) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = prefix + target + suffix;
        }
      }
      updateCounter();
    });
    countersAnimated = true;
  }

  // Trigger counter when hero section is in view
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(heroStats);
  }

  // === WhatsApp FUNCTIONS ===
  window.openWhatsApp = function (message) {
    const phone = '6281234567890'; // Ganti dengan nomor WA asli
    const defaultMsg = message || 'Halo, saya tertarik dengan paket outbound Explore Outbound Batu. Bisa info lebih lanjut?';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMsg)}`;
    window.open(url, '_blank');
  };

  // === SHARE FUNCTIONS ===
  window.shareToWhatsApp = function () {
    const url = window.location.href;
    const title = document.title;
    const text = `${title} - ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  window.shareToFacebook = function () {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  window.shareToTwitter = function () {
    const url = window.location.href;
    const title = document.title;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  window.copyLink = function () {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const btn = document.querySelector('.share-btn.copy');
      if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
        btn.style.background = 'var(--success)';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
        }, 2000);
      }
    });
  };

  // === SMOOTH SCROLL for Anchor Links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // === PREVENT HORIZONTAL SCROLL on mobile ===
  document.addEventListener('touchmove', function(e) {
    // Allow vertical scroll only
  }, { passive: true });

  // Performance: Throttle scroll events
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleNavbarScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

});
