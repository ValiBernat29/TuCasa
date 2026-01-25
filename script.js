"use strict";

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle ---
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

    // --- 2. Enhanced Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if navigating
                mobileMenu?.classList.add('hidden');
                if (menuIcon) menuIcon.textContent = 'menu';

                const offset = 80; // Height of your sticky header
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetElement.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. Refined Intersection Observer ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Triggers slightly before the element enters view
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

    // Apply animation classes to cards and headers
    const animateElements = document.querySelectorAll('section, h2, .group, .animate-on-scroll');
    animateElements.forEach(el => {
        el.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-10');
        observer.observe(el);
    });
});