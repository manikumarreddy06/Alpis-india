// Select all elements with the scroll-animation class
const scrollElements = document.querySelectorAll('.scroll-animation');

// Function to check if element is in view
const isElementInView = (el) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= window.innerHeight * 0.8;
}

// Function to handle scroll animation
const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (isElementInView(el)) {
      el.classList.add('show');
    }
  });
}

// Add scroll event listener
window.addEventListener('scroll', handleScrollAnimation);

// Trigger on initial load
handleScrollAnimation();

class SmoothScroll {
    constructor(duration = 1000) {
        this.duration = duration;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Handle anchor link clicks
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId !== '#') {
                    this.scrollToElement(targetId);
                }
            });
        });
    }

    scrollToElement(targetId) {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / this.duration, 1);

            window.scrollTo(0, startPosition + distance * this.easeInOutCubic(progress));

            if (timeElapsed < this.duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    // Easing function for smooth acceleration and deceleration
    easeInOutCubic(t) {
        return t < 0.5 
            ? 4 * t * t * t 
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
}

// Initialize smooth scroll with custom duration (in milliseconds)
const smoothScroll = new SmoothScroll(1000);

// Enable smooth scrolling for the whole page
document.documentElement.style.scrollBehavior = 'smooth';

// Initialize smooth scroll
smoothScroll.initializeEventListeners(); 