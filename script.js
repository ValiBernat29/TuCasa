"use strict";

function openStory() {
    const modal = document.getElementById('story-modal');
    const backdrop = document.getElementById('story-backdrop');
    const panel = document.getElementById('story-panel');

    if (modal && backdrop && panel) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            backdrop.classList.remove('opacity-0');
            panel.classList.remove('translate-y-full');
        }, 10);
        document.body.style.overflow = 'hidden'; 
    }
}

function closeStory() {
    const modal = document.getElementById('story-modal');
    const backdrop = document.getElementById('story-backdrop');
    const panel = document.getElementById('story-panel');

    if (modal && backdrop && panel) {
        backdrop.classList.add('opacity-0');
        panel.classList.add('translate-y-full');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto'; 
        }, 500);
    }
}

function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto'; 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Tab Functionality ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');

                // Reset all buttons to inactive state
                tabBtns.forEach(b => {
                    b.classList.remove('bg-primary', 'text-white');
                    b.classList.add('bg-gray-200', 'dark:bg-gray-800', 'text-charcoal', 'dark:text-gray-300', 'hover:bg-gray-300', 'dark:hover:bg-gray-700');
                });

                // Set clicked button to active state
                btn.classList.remove('bg-gray-200', 'dark:bg-gray-800', 'text-charcoal', 'dark:text-gray-300', 'hover:bg-gray-300', 'dark:hover:bg-gray-700');
                btn.classList.add('bg-primary', 'text-white');

                // Hide all tab content
                tabContents.forEach(content => {
                    content.classList.remove('block');
                    content.classList.add('hidden');
                });
                
                // Show the target tab content
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                    targetContent.classList.add('block');
                }
            });
        });
    }

    // --- 2. Language Switcher ---
    const langBtn = document.getElementById('lang-switch');
    const langText = document.getElementById('lang-text');
    const elementsToTranslate = document.querySelectorAll('.translate-text');

    let currentLang = localStorage.getItem('preferredLang') || 'ro';

    function updateLanguage() {
        document.documentElement.lang = currentLang;

        if (langText) {
            langText.innerText = currentLang === 'ro' ? 'EN' : 'RO';
        }

        elementsToTranslate.forEach(el => {
            const translation = el.getAttribute(`data-${currentLang}`);
            if (translation) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else {
                    el.innerHTML = translation; 
                }
            }
        });
    }

    updateLanguage();

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'ro' ? 'en' : 'ro';
            localStorage.setItem('preferredLang', currentLang);
            updateLanguage();
        });
    }

    // --- 3. Mobile Menu ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuBtn ? menuBtn.querySelector('.material-symbols-outlined') : null;

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (menuIcon) {
                menuIcon.textContent = mobileMenu.classList.contains('hidden') ? 'menu' : 'close';
            }
        });
    }

    // --- 4. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                mobileMenu?.classList.add('hidden');
                if (menuIcon) menuIcon.textContent = 'menu';

                const offset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 5. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.project-card, .animate-on-scroll');
    
    animateElements.forEach(el => {
        el.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-10');
        observer.observe(el);
    });

    // --- 6. Global Event Listeners ---
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            closeLightbox();
            closeStory();
        }
    });

    // --- 7. Form Date Constraints ---
    const dateInput = document.getElementById('consultation-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
});