// SIMLOG Carousel Management
class SimlogCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.totalSlides = this.slides.length;
        this.isTransitioning = false;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        if (this.totalSlides === 0) return;
        
        // Set up initial state
        this.showSlide(0);
        
        // Add keyboard navigation
        this.setupKeyboardNavigation();
        
        // Add touch/swipe support
        this.setupTouchNavigation();
        
        // Start autoplay if multiple slides
        if (this.totalSlides > 1) {
            this.startAutoplay();
        }
        
        // Pause autoplay on hover
        this.setupHoverPause();
        
        console.log(`SIMLOG Carousel initialized with ${this.totalSlides} slides`);
    }
    
    showSlide(index) {
        if (this.isTransitioning) return;
        
        // Normalize index
        if (index >= this.totalSlides) {
            index = 0;
        } else if (index < 0) {
            index = this.totalSlides - 1;
        }
        
        this.isTransitioning = true;
        
        // Remove active class from current slide
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].classList.remove('active');
        }
        
        // Add active class to new slide
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        
        // Reset transition flag after animation
        setTimeout(() => {
            this.isTransitioning = false;
        }, 1000);
        
        // Preload next image
        this.preloadNextImage();
        
        console.log(`Showing slide ${index + 1} of ${this.totalSlides}`);
    }
    
    nextSlide() {
        this.showSlide(this.currentSlide + 1);
        this.resetAutoplay();
    }
    
    prevSlide() {
        this.showSlide(this.currentSlide - 1);
        this.resetAutoplay();
    }
    
    preloadNextImage() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        const nextSlide = this.slides[nextIndex];
        if (nextSlide) {
            const img = nextSlide.querySelector('img');
            if (img && !img.complete) {
                const preloadImg = new Image();
                preloadImg.src = img.src;
            }
        }
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            } else if (e.key === ' ') {
                e.preventDefault();
                this.toggleAutoplay();
            }
        });
    }
    
    setupTouchNavigation() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        const carouselContainer = document.querySelector('.carousel-container');
        if (!carouselContainer) return;
        
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        carouselContainer.addEventListener('touchmove', (e) => {
            // Prevent scrolling during horizontal swipe
            if (Math.abs(e.touches[0].clientX - startX) > Math.abs(e.touches[0].clientY - startY)) {
                e.preventDefault();
            }
        }, { passive: false });
        
        carouselContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Check if horizontal swipe
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
        }, { passive: true });
    }
    
    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    resetAutoplay() {
        if (this.autoplayInterval) {
            this.startAutoplay();
        }
    }
    
    toggleAutoplay() {
        if (this.autoplayInterval) {
            this.stopAutoplay();
        } else {
            this.startAutoplay();
        }
    }
    
    setupHoverPause() {
        const carouselContainer = document.querySelector('.carousel-container');
        if (!carouselContainer) return;
        
        carouselContainer.addEventListener('mouseenter', () => {
            this.stopAutoplay();
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            this.startAutoplay();
        });
    }
}

// Global functions for navigation buttons
function changeSlide(direction) {
    if (window.simlogCarousel) {
        if (direction > 0) {
            window.simlogCarousel.nextSlide();
        } else {
            window.simlogCarousel.prevSlide();
        }
    }
}

function goToSlide(index) {
    if (window.simlogCarousel) {
        window.simlogCarousel.showSlide(index);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a page with carousel
    if (document.querySelector('.carousel-container')) {
        window.simlogCarousel = new SimlogCarousel();
        
        // Add loading states for images
        const images = document.querySelectorAll('.carousel-slide img');
        let loadedImages = 0;
        
        const checkAllImagesLoaded = () => {
            loadedImages++;
            if (loadedImages === images.length) {
                document.querySelector('.carousel-container').classList.add('loaded');
                console.log('All carousel images loaded');
            }
        };
        
        images.forEach(img => {
            if (img.complete) {
                checkAllImagesLoaded();
            } else {
                img.addEventListener('load', checkAllImagesLoaded);
                img.addEventListener('error', () => {
                    console.warn('Failed to load carousel image:', img.src);
                    checkAllImagesLoaded();
                });
            }
        });
        
        // Add fade-in animation to hero content
        setTimeout(() => {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.classList.add('fade-in');
            }
        }, 500);
    }
});

// Handle visibility change (pause autoplay when tab is not visible)
document.addEventListener('visibilitychange', () => {
    if (window.simlogCarousel) {
        if (document.hidden) {
            window.simlogCarousel.stopAutoplay();
        } else {
            window.simlogCarousel.startAutoplay();
        }
    }
});

// Resize handler for responsive behavior
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        // Reinitialize carousel if needed
        if (window.simlogCarousel) {
            console.log('Carousel resize handled');
        }
    }, 250);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimlogCarousel;
}
