// ============ LOADING SCREEN ============
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 2000);
});

// ============ AOS (Animate on Scroll) ============
AOS.init({
    once: false,
    mirror: true,
    offset: 40,
    duration: 900,
    easing: 'ease-out-quart',
});

// ============ PARTICLES.JS ============
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 55, density: { enable: true, value_area: 900 } },
            color: { value: ['#C96614', '#EAA156', '#FDF9F3'] },
            shape: { type: 'circle' },
            opacity: {
                value: 0.25,
                random: true,
                anim: { enable: true, speed: 0.5, opacity_min: 0.05, sync: false }
            },
            size: {
                value: 2,
                random: true,
                anim: { enable: true, speed: 1.5, size_min: 0.3, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 160,
                color: '#FF6600',
                opacity: 0.06,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.6,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                repulse: { distance: 80, duration: 0.4 },
                push: { particles_nb: 3 }
            }
        },
        retina_detect: true
    });
}

// ============ NAVBAR ============
const mainContent = document.querySelector('.main-content');
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mainContent) {
    mainContent.addEventListener('scroll', () => {
        if (mainContent.scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active');
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navLinks.classList.remove('active');
    });
});

// ============ SWIPERS ============

// Founder Swiper (Cards Effect)
const founderSwiper = new Swiper('.founderSwiper', {
    effect: 'cards',
    grabCursor: true,
    loop: true,
    cardsEffect: {
        perSlideOffset: 9,
        perSlideRotate: 3,
        rotate: true,
        slideShadows: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 4500,
        disableOnInteraction: false,
    },
    speed: 700,
});

// Gallery Swiper (Coverflow Effect)
const gallerySwiper = new Swiper('.gallerySwiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 25,
        stretch: 0,
        depth: 220,
        modifier: 1,
        slideShadows: true,
    },
    loop: true,
    pagination: {
        el: '.gallery-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.gallery-next',
        prevEl: '.gallery-prev',
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    speed: 700,
});

// Hero Swiper (Fade Effect)
const heroSwiper = new Swiper('.heroSwiper', {
    effect: 'fade',
    fadeEffect: { crossFade: true },
    loop: true,
    speed: 1600,
    autoplay: {
        delay: 5500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.hero-pagination',
        clickable: true,
    },
    on: {
        slideChangeTransitionStart: function () {
            AOS.refreshHard();
        }
    }
});

// ============ CUSTOM CURSOR ============
const cursor = document.querySelector('.custom-cursor');
const cursorGlow = document.querySelector('.custom-cursor-glow');

if (cursor && cursorGlow) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    const lagFactor = 0.2; // Smoother and less laggy tracking

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = (mouseX - 4) + 'px';
        cursor.style.top  = (mouseY - 4) + 'px';
    });

    // Smooth trailing glow using requestAnimationFrame
    function animateGlow() {
        glowX += (mouseX - glowX) * lagFactor;
        glowY += (mouseY - glowY) * lagFactor;
        cursorGlow.style.left = (glowX - 18) + 'px';
        cursorGlow.style.top  = (glowY - 18) + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll(
        'a, button, .swiper-button-next, .swiper-button-prev, .menu-toggle, .gallery-slide img, .tag'
    );
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorGlow.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorGlow.classList.remove('active');
        });
    });
}

// ============ SECTION REVEAL ANIMATION ============
// Add staggered number counter for hero stats
function animateCounters() {
    const statNums = document.querySelectorAll('.stat-num');
    statNums.forEach(el => {
        const target = el.textContent.trim();
        if (!isNaN(parseInt(target))) {
            const num = parseInt(target);
            let current = 0;
            const increment = Math.ceil(num / 40);
            const timer = setInterval(() => {
                current += increment;
                if (current >= num) {
                    el.textContent = target; // Restore original (incl. "+")
                    clearInterval(timer);
                } else {
                    el.textContent = current;
                }
            }, 40);
        }
    });
}

// Trigger counter when hero is visible
const heroSection = document.getElementById('home');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateCounters, 1500);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (heroSection) observer.observe(heroSection);

// ============ AUDIO PLAYER EXPERIMENTAL ============
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

if (bgMusic && musicToggle) {
    // Start Audio at 40% volume for elegance
    bgMusic.volume = 0.4;
    
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
        } else {
            bgMusic.play().catch(e => console.log('Audio play failed:', e));
            musicToggle.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
}

// ============ ADVANCED UI EFFECTS (MAGNETIC & PARALLAX) ============

// 1. Cinematic Grain Overlay
const grain = document.createElement('div');
grain.className = 'grain-overlay';
document.body.appendChild(grain);

// 2. Magnetic Buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width/2) * 0.3; // magnetic pull strength
        const y = (e.clientY - rect.top - rect.height/2) * 0.3;
        btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
    });
});

// 3. Gentle Parallax Hover for Founder Cards
document.querySelectorAll('.founder-slide').forEach(slide => {
    const img = slide.querySelector('.founder-img');
    const info = slide.querySelector('.founder-info');
    
    slide.addEventListener('mousemove', e => {
        const rect = slide.getBoundingClientRect();
        // Calculate mouse position relative to center of slide
        const x = (e.clientX - rect.left - rect.width/2) / 25;
        const y = (e.clientY - rect.top - rect.height/2) / 25;
        
        if(img) img.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.02)`;
        if(info) info.style.transform = `translate3d(${-x*1.5}px, ${-y*1.5}px, 0)`;
    });
    
    slide.addEventListener('mouseleave', () => {
        if(img) img.style.transform = '';
        if(info) info.style.transform = '';
    });
});

// ============ SMOOTH SCROLL FOR NAV LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target && mainContent) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
