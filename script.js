/* ============================================
   LB YOGHURT — SCRIPT.JS
   Fiable, léger, avec fallback
============================================ */

(function () {
  'use strict';

  /* ----------------------------------------
     1. LOADER — Rapide et fiable
  ---------------------------------------- */
  var loader = document.getElementById('loader');

  function hideLoader() {
    if (!loader) return;
    loader.classList.add('is-hidden');
    setTimeout(function () {
      loader.style.display = 'none';
    }, 500);
  }

  // Cache le loader dès que la page est chargée (max 1.5s d'attente)
  window.addEventListener('load', function () {
    setTimeout(hideLoader, 1300);
  });

  // Sécurité : si le load prend trop de temps, on force
  setTimeout(hideLoader, 4000);

  /* ----------------------------------------
     2. ANIMATIONS — IntersectionObserver (CSS)
     Fonctionne sans GSAP. 100% fiable.
  ---------------------------------------- */
  function initRevealAnimations() {
    var elements = document.querySelectorAll('.anim-reveal');

    if (!elements.length) return;

    // On signale au CSS que JS fonctionne
    document.body.classList.add('anim-ready');

    // Vérifier si IntersectionObserver est supporté
    if (!('IntersectionObserver' in window)) {
      // Fallback : tout rendre visible immédiatement
      elements.forEach(function (el) {
        el.classList.add('anim-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Lancer les animations après que le loader disparaît
  // (petit délai pour laisser le temps au loader de se cacher)
  window.addEventListener('load', function () {
    setTimeout(initRevealAnimations, 1500);
  });

  // Sécurité : si tout est déjà chargé
  if (document.readyState === 'complete') {
    setTimeout(initRevealAnimations, 1500);
  }

  // Ultime sécurité : forcer la visibilité après 5 secondes
  setTimeout(function () {
    var elements = document.querySelectorAll('.anim-reveal');
    elements.forEach(function (el) {
      el.classList.add('anim-visible');
    });
    if (!document.body.classList.contains('anim-ready')) {
      document.body.classList.add('anim-ready');
    }
  }, 5000);

  /* ----------------------------------------
     3. NAVIGATION — Scroll Effect
  ---------------------------------------- */
  var nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.pageYOffset > 80) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  /* ----------------------------------------
     4. NAVIGATION — Mobile Menu
  ---------------------------------------- */
  var navBurger = document.getElementById('navBurger');
  var navLinks = document.getElementById('navLinks');

  if (navBurger && navLinks) {
    navBurger.addEventListener('click', function () {
      navBurger.classList.toggle('is-active');
      navLinks.classList.toggle('is-open');
      document.body.style.overflow = navLinks.classList.contains('is-open') ? 'hidden' : '';
    });

    // Fermer le menu au clic sur un lien
    var allNavLinks = navLinks.querySelectorAll('.nav__link');
    allNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navBurger.classList.remove('is-active');
        navLinks.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----------------------------------------
     5. FLOATING WHATSAPP BUTTON
  ---------------------------------------- */
  var waFloat = document.getElementById('waFloat');

  function handleWaFloat() {
    if (!waFloat) return;
    if (window.pageYOffset > 500) {
      waFloat.classList.add('is-visible');
    } else {
      waFloat.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', handleWaFloat, { passive: true });

  /* ----------------------------------------
     6. SMOOTH SCROLL for anchor links
  ---------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        var navHeight = nav ? nav.offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ----------------------------------------
     7. GSAP BONUS (optionnel — si chargé)
     Parallax léger sur hero et sections fond.
     Si GSAP ne charge pas, rien ne casse.
  ---------------------------------------- */
  window.addEventListener('load', function () {
    setTimeout(function () {
      // Vérifier si GSAP est disponible
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return; // Pas de GSAP ? Pas de problème, tout fonctionne déjà.
      }

      gsap.registerPlugin(ScrollTrigger);

      // Parallax hero
      var heroImg = document.querySelector('.hero__img');
      if (heroImg) {
        gsap.to(heroImg, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // Parallax family
      var familyBgImg = document.querySelector('.family__bg img');
      if (familyBgImg) {
        gsap.to(familyBgImg, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: '.family',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // Parallax partners
      var partnersBgImg = document.querySelector('.partners__bg img');
      if (partnersBgImg) {
        gsap.to(partnersBgImg, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: '.partners',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

    }, 2000); // Délai pour laisser le contenu apparaître d'abord
  });

})();
