document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const hero = document.getElementById('hero');

    // Handle scroll for header effects
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const heroHeight = hero.offsetHeight;

        // Change header style after scrolling past hero
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Change text color toggle based on background
        if (scrollPosition < heroHeight - 80) {
            header.classList.add('on-hero');
        } else {
            header.classList.remove('on-hero');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Improved Smooth Scroll with Easing
    const smoothScroll = (targetId) => {
        const target = document.querySelector(targetId);
        if (!target) return;

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const duration = 1200; // Немного дольше для плавности

        const ease = (t, b, c, d) => {
            t /= d;
            t--;
            return c * (t * t * t * t * t + 1) + b;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            smoothScroll(targetId);
        });
    });

    // Simple interaction for product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Future feature: Change image to hover image or show quick add
        });
    });

    // Hero title parallax effect
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 40;
            const y = (window.innerHeight / 2 - e.pageY) / 40;
            
            heroTitle.style.setProperty('--tx', `${x}px`);
            heroTitle.style.setProperty('--ty', `${y}px`);
            heroTitle.style.setProperty('--rx', `${-y}deg`);
            heroTitle.style.setProperty('--ry', `${x}deg`);
        });
        
        document.addEventListener('mouseleave', () => {
            heroTitle.style.setProperty('--tx', `0px`);
            heroTitle.style.setProperty('--ty', `0px`);
            heroTitle.style.setProperty('--rx', `0deg`);
            heroTitle.style.setProperty('--ry', `0deg`);
        });
    }
});
