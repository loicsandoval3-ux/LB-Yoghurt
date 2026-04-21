/* ============================================
   LB YOGHURT — SCRIPT.JS
   Premium Website Interactions
   GSAP + ScrollTrigger Animations
============================================ */

(function () {
    'use strict';

    /* ----------------------------------------
       1. LOADER
    ---------------------------------------- */
    const loader = document.getElementById('loader');

    window.addEventListener('load', function () {
        // Wait for the progress bar animation to finish (1.8s) then hide
        setTimeout(function () {
            loader.classList.add('is-hidden');
            // Remove from DOM after transition
            setTimeout(function () {
                loader.style.display = 'none';
                // Start entrance animations after loader is gone
                initAnimations();
            }, 600);
        }, 2000);
    });

    /* ----------------------------------------
       2. NAVIGATION — Scroll Effect
    ---------------------------------------- */
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    function handleNavScroll() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 80) {
            nav.classList.add('is-scrolled');
        } else {
            nav.classList.remove('is-scrolled');
        }
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    /* ----------------------------------------
       3. NAVIGATION — Mobile Menu
    ---------------------------------------- */
    const navBurger = document.getElementById('navBurger');
    const navLinks = document.getElementById('navLinks');

    navBurger.addEventListener('click', function () {
        navBurger.classList.toggle('is-active');
        navLinks.classList.toggle('is-open');
        document.body.style.overflow = navLinks.classList.contains('is-open') ? 'hidden' : '';
    });

    // Close menu on link click
    const allNavLinks = navLinks.querySelectorAll('.nav__link');
    allNavLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navBurger.classList.remove('is-active');
            navLinks.classList.remove('is-open');
            document.body.style.overflow = '';
        });
    });

    /* ----------------------------------------
       4. FLOATING WHATSAPP BUTTON
    ---------------------------------------- */
    const waFloat = document.getElementById('waFloat');

    function handleWaFloat() {
        if (window.pageYOffset > 500) {
            waFloat.classList.add('is-visible');
        } else {
            waFloat.classList.remove('is-visible');
        }
    }

    window.addEventListener('scroll', handleWaFloat, { passive: true });

    /* ----------------------------------------
       5. SMOOTH SCROLL for anchor links
    ---------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ----------------------------------------
       6. GSAP + SCROLLTRIGGER ANIMATIONS
    ---------------------------------------- */
    function initAnimations() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Animate all elements with data-animate attribute
        const animatedElements = document.querySelectorAll('[data-animate]');

        animatedElements.forEach(function (el) {
            const animType = el.getAttribute('data-animate');
            const delay = parseFloat(el.getAttribute('data-delay')) || 0;

            let fromVars = {
                opacity: 0,
                duration: 0.9,
                delay: delay,
                ease: 'power3.out'
            };

            switch (animType) {
                case 'fade-up':
                    fromVars.y = 40;
                    break;
                case 'fade-down':
                    fromVars.y = -30;
                    break;
                case 'fade-right':
                    fromVars.x = -50;
                    break;
                case 'fade-left':
                    fromVars.x = 50;
                    break;
                default:
                    break;
            }

            gsap.from(el, {
                ...fromVars,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none'
                }
            });

            // Set element to visible (GSAP will handle the animation)
            el.style.opacity = '';
            el.style.transform = '';
        });

        /* ----------------------------------------
           7. HERO PARALLAX EFFECT
        ---------------------------------------- */
        const heroImg = document.querySelector('.hero__img');
        if (heroImg) {
            gsap.to(heroImg, {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        /* ----------------------------------------
           8. FAMILY SECTION PARALLAX
        ---------------------------------------- */
        const familyBgImg = document.querySelector('.family__bg img');
        if (familyBgImg) {
            gsap.to(familyBgImg, {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.family',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        /* ----------------------------------------
           9. PARTNERS SECTION PARALLAX
        ---------------------------------------- */
        const partnersBgImg = document.querySelector('.partners__bg img');
        if (partnersBgImg) {
            gsap.to(partnersBgImg, {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.partners',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        /* ----------------------------------------
           10. PRODUCT CARDS — STAGGER ANIMATION
        ---------------------------------------- */
        const productCards = document.querySelectorAll('.product-card');
        if (productCards.length > 0) {
            gsap.from(productCards, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.products__grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }

        /* ----------------------------------------
           11. WHY CARDS — STAGGER ANIMATION
        ---------------------------------------- */
        const whyCards = document.querySelectorAll('.why-card');
        if (whyCards.length > 0) {
            gsap.from(whyCards, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.why__grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }

        /* ----------------------------------------
           12. CONTACT CARDS — STAGGER
        ---------------------------------------- */
        const contactCards = document.querySelectorAll('.contact-card');
        if (contactCards.length > 0) {
            gsap.from(contactCards, {
                opacity: 0,
                y: 40,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.contact__grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }

        /* ----------------------------------------
           13. QUALITY FEATURES STAGGER
        ---------------------------------------- */
        const qualityFeatures = document.querySelectorAll('.quality__feature');
        if (qualityFeatures.length > 0) {
            gsap.from(qualityFeatures, {
                opacity: 0,
                x: 30,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.quality__features',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }

        /* ----------------------------------------
           14. PARTNER ADVANTAGES STAGGER
        ---------------------------------------- */
        const partnerAdvantages = document.querySelectorAll('.partners__advantage');
        if (partnerAdvantages.length > 0) {
            gsap.from(partnerAdvantages, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.partners__advantages',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }

        /* ----------------------------------------
           15. SECTION HEADERS — Subtle line animation
        ---------------------------------------- */
        const sectionLabels = document.querySelectorAll('.section-header__label');
        sectionLabels.forEach(function (label) {
            gsap.from(label, {
                opacity: 0,
                letterSpacing: '8px',
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: label,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            });
        });

        /* ----------------------------------------
           16. STORY DIVIDER ANIMATION
        ---------------------------------------- */
        const storyDivider = document.querySelector('.story__divider');
        if (storyDivider) {
            gsap.from(storyDivider, {
                width: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: storyDivider,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            });
        }

        const qualityDivider = document.querySelector('.quality__divider');
        if (qualityDivider) {
            gsap.from(qualityDivider, {
                width: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: qualityDivider,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            });
        }

        /* ----------------------------------------
           17. FOOTER ANIMATION
        ---------------------------------------- */
        gsap.from('.footer__top', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    }

    /* ----------------------------------------
       FALLBACK: If page already loaded
    ---------------------------------------- */
    if (document.readyState === 'complete') {
        setTimeout(function () {
            loader.classList.add('is-hidden');
            setTimeout(function () {
                loader.style.display = 'none';
                initAnimations();
            }, 600);
        }, 2000);
    }

})();
