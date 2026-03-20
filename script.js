let menuOpen = false;
let isLoadingPage = true;

function scrollToTopOnLoad() {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    
    requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scrollToTopOnLoad);
} else {
    scrollToTopOnLoad();
}

window.addEventListener('load', function() {
    scrollToTopOnLoad();
    setTimeout(() => {
        isLoadingPage = false;
        initializeScrollFadeObserver();
    }, 300);
});

history.scrollRestoration = 'manual';

window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        scrollToTopOnLoad();
        setTimeout(() => {
            location.reload();
        }, 100);
    }
});

function toggleMenu() {
    let sidebar = document.getElementById("sidebar");
    let mainWrapper = document.querySelector(".main-wrapper");
    let grids = document.querySelectorAll(".grid");

    if (!sidebar || !mainWrapper) {
        console.error("Elemento sidebar o mainWrapper non trovato");
        return;
    }

    if (menuOpen) {
        sidebar.classList.add("closed");
        mainWrapper.classList.remove("sidebar-open");

        grids.forEach(function(grid) {
            grid.classList.add("grid-4");
        });

        menuOpen = false;

    } else {
        sidebar.classList.remove("closed");
        mainWrapper.classList.add("sidebar-open");

        grids.forEach(function(grid) {
            grid.classList.remove("grid-4");
        });

        menuOpen = true;
    }
}

window.addEventListener("scroll", function() {
    let header = document.getElementById("header");

    if (!header) return;

    if (window.scrollY > 80) {
        header.classList.add("small");
    } else {
        header.classList.remove("small");
    }
}, { passive: true });

document.addEventListener('click', function(e) {
    if (e.target.classList && e.target.classList.contains('nav-link')) {
        e.preventDefault();

        let targetId = e.target.getAttribute('href');
        let targetElement = document.querySelector(targetId);

        if (targetElement) {
            if (menuOpen) {
                toggleMenu();
            }

            setTimeout(() => {
                let header = document.getElementById("header");
                if (!header) {
                    console.error("Header non trovato");
                    return;
                }

                let headerHeight = header.offsetHeight;
                let elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                let offsetPosition;
                if (targetId === '#contact') {
                    offsetPosition = elementPosition - headerHeight - 80;
                } else if (targetId === '#home') {
                    offsetPosition = 0;
                } else {
                    offsetPosition = elementPosition - headerHeight - 20;
                }

                window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: 'smooth'
                });
            }, 150);
        }
    }
});

document.addEventListener('click', function(e) {
    if (e.target.classList && e.target.classList.contains('glitch')) {
        console.log("Bottone cliccato: " + e.target.textContent.trim());
    }
});

function ensureHeroVisibility() {
    let heroSection = document.querySelector('.fade-in-content');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.filter = 'blur(0px)';
        heroSection.style.pointerEvents = 'auto';
    }
}

function initializeScrollFadeObserver() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px 100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    let scrollFadeElements = document.querySelectorAll('.scroll-fade');
    
    if (scrollFadeElements.length === 0) {
        console.warn("Nessun elemento .scroll-fade trovato");
        return;
    }

    scrollFadeElements.forEach(element => {
        observer.observe(element);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        ensureHeroVisibility();
        setTimeout(initializeScrollFadeObserver, 50);
    });
} else {
    ensureHeroVisibility();
    setTimeout(initializeScrollFadeObserver, 50);
}

window.addEventListener('load', function() {
    ensureHeroVisibility();
    setTimeout(() => {
        let unobservedElements = document.querySelectorAll('.scroll-fade:not(.visible)');
        if (unobservedElements.length > 0) {
            console.warn("Elementi non osservati trovati, re-inizializzando observer");
            initializeScrollFadeObserver();
        }
    }, 500);
});

window.addEventListener('error', function(event) {
    console.error('Errore globale:', event.error);
});

document.addEventListener('DOMContentLoaded', function() {
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }
        });
    }
});

window.addEventListener('load', function() {
    let criticalElements = ['header', 'sidebar', 'contact'];
    let missingElements = [];

    criticalElements.forEach(id => {
        if (!document.getElementById(id)) {
            missingElements.push(id);
        }
    });

    if (missingElements.length > 0) {
        console.warn("Elementi critici mancanti:", missingElements);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const carouselImages = document.querySelectorAll('.carousel-image');
    if (carouselImages.length === 0) return;

    let currentIndex = 0;

    function showImage(index) {
        carouselImages.forEach(img => {
            img.classList.remove('active');
        });
        if (carouselImages[index]) {
            carouselImages[index].classList.add('active');
        }
    }

    showImage(0);

    setInterval(() => {
        currentIndex = (currentIndex + 1) % carouselImages.length;
        showImage(currentIndex);
    }, 1500);
});