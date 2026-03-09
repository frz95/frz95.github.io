document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    // Close mobile nav when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Scroll Reveal Animations utilizing Intersection Observer ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- Active Nav Link Update on Scroll ---
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // --- Media Switcher Logic ---
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const switcherBtns = card.querySelectorAll('.switcher-btn');
        const mediaContents = card.querySelectorAll('.media-content');

        if (switcherBtns.length > 0) {
            switcherBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetMedia = btn.getAttribute('data-media');

                    // Update buttons
                    switcherBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // Update content
                    mediaContents.forEach(content => {
                        if (content.id === targetMedia) {
                            content.classList.add('active');

                            // Handle YouTube Iframes
                            const iframe = content.querySelector('iframe');
                            if (iframe) {
                                const src = iframe.src;
                                iframe.src = src;
                            }

                            // Handle Local Videos
                            const video = content.querySelector('video');
                            if (video) {
                                video.play();
                            }
                        } else {
                            content.classList.remove('active');

                            // Handle YouTube Iframes
                            const iframe = content.querySelector('iframe');
                            if (iframe) {
                                const src = iframe.src;
                                iframe.src = '';
                                iframe.src = src;
                            }

                            // Handle Local Videos
                            const video = content.querySelector('video');
                            if (video) {
                                video.pause();
                                video.currentTime = 0;
                            }
                        }
                    });
                });
            });
        }
    });
});
