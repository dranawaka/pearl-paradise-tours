(function () {
  'use strict';

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', mainNav.classList.contains('is-open'));
    });
  }

  // Mobile: open/close dropdowns
  var hasDropdowns = document.querySelectorAll('.has-dropdown');
  hasDropdowns.forEach(function (item) {
    var link = item.querySelector('a');
    if (link && window.matchMedia('(max-width: 900px)').matches) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          item.classList.toggle('is-open');
        }
      });
    }
  });

  // Hero slider
  var slides = document.querySelectorAll('.hero-slide');
  var dotsContainer = document.querySelector('.hero-dots');
  var prevBtn = document.querySelector('.hero-prev');
  var nextBtn = document.querySelector('.hero-next');
  var current = 0;
  var total = slides.length;
  var autoplayInterval;

  function goToSlide(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    slides.forEach(function (slide, i) {
      slide.classList.toggle('active', i === current);
    });
    var dots = document.querySelectorAll('.hero-dots .dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === current);
    });
  }

  function next() {
    goToSlide(current + 1);
  }

  function prev() {
    goToSlide(current - 1);
  }

  if (slides.length && dotsContainer) {
    for (var i = 0; i < total; i++) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      (function (idx) {
        dot.addEventListener('click', function () {
          goToSlide(idx);
        });
      })(i);
      dotsContainer.appendChild(dot);
    }

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    autoplayInterval = setInterval(next, 5000);
  }

  // Pause autoplay on focus/hover
  var hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', function () {
      if (autoplayInterval) clearInterval(autoplayInterval);
    });
    hero.addEventListener('mouseleave', function () {
      autoplayInterval = setInterval(next, 5000);
    });
  }

  // Contact form: prevent default and show feedback (static site)
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var text = btn ? btn.textContent : '';
      if (btn) {
        btn.textContent = 'Thank you! We\'ll be in touch.';
        btn.disabled = true;
      }
      setTimeout(function () {
        if (btn) {
          btn.textContent = text;
          btn.disabled = false;
        }
      }, 3000);
    });
  }

  // Photo gallery: load images from photo_gallery folder
  var galleryGrid = document.querySelector('.gallery-grid');
  if (galleryGrid) {
    var extensions = ['jpg', 'jpeg', 'png', 'webp'];
    var maxSlots = 24;

    function tryAddImage(num) {
      if (num > maxSlots) return;
      var tried = 0;
      function tryNext() {
        if (tried >= extensions.length) {
          tryAddImage(num + 1);
          return;
        }
        var ext = extensions[tried++];
        var src = 'photo_gallery/' + num + '.' + ext;
        var img = new Image();
        img.onload = function () {
          var wrap = document.createElement('div');
          wrap.className = 'gallery-item';
          wrap.setAttribute('role', 'listitem');
          var thumb = document.createElement('img');
          thumb.src = src;
          thumb.alt = 'Gallery image ' + num;
          wrap.appendChild(thumb);
          wrap.addEventListener('click', function () {
            openLightbox(src);
          });
          galleryGrid.appendChild(wrap);
          tryAddImage(num + 1);
        };
        img.onerror = function () {
          tryNext();
        };
        img.src = src;
      }
      tryNext();
    }

    function openLightbox(src) {
      var lightbox = document.getElementById('gallery-lightbox');
      var lbImg = lightbox && lightbox.querySelector('.gallery-lightbox-img');
      if (!lightbox || !lbImg) return;
      lbImg.src = src;
      lightbox.removeAttribute('hidden');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      var lightbox = document.getElementById('gallery-lightbox');
      if (!lightbox) return;
      lightbox.setAttribute('hidden', '');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    var closeBtn = document.querySelector('.gallery-lightbox-close');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    var lb = document.getElementById('gallery-lightbox');
    if (lb) {
      lb.addEventListener('click', function (e) {
        if (e.target === lb) closeLightbox();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lb.getAttribute('aria-hidden') === 'false') closeLightbox();
      });
    }

    tryAddImage(1);
  }
})();
