/*
  File Name: animations.js
  Author: Jayvee O. Cruz
  Purpose: Scroll Animations, Reveal Effects, and Micro-interactions
*/

// ================================
// UTILITY FUNCTIONS
// ================================
const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isTouchDevice = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches;

// ================================
// REVEAL OBSERVER
// ================================
const createRevealObserver = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const handleIntersect = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect, options);

  const init = () => {
    const revealElements = document.querySelectorAll('.reveal, .reveal--right, .reveal--left, .reveal--scale');
    revealElements.forEach(el => observer.observe(el));
  };

  const refresh = () => {
    const revealElements = document.querySelectorAll('.reveal:not(.active), .reveal--right:not(.active)');
    revealElements.forEach(el => observer.observe(el));
  };

  init();

  return { refresh };
};

// ================================
// PARALLAX EFFECT
// ================================
const createParallaxEffect = () => {
  const elements = document.querySelectorAll('.parallax');
  const scrollContainer = document.getElementById('mainContainer');
  let ticking = false;

  const getScrollTop = () => {
    const windowScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const containerScroll = scrollContainer ? scrollContainer.scrollTop : 0;
    return Math.max(windowScroll, containerScroll);
  };

  const update = () => {
    const scrollTop = getScrollTop();

    elements.forEach(el => {
      const speed = 0.3;
      const yPos = (scrollTop - el.offsetTop) * speed;
      el.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  };

  const init = () => {
    if (elements.length > 0) {
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);
      }
      window.addEventListener('scroll', handleScroll);
    }
  };

  init();
};

// ================================
// MAGNETIC EFFECT
// ================================
const createMagneticEffect = () => {
  const elements = document.querySelectorAll('.magnetic');
  const strength = 0.3;

  const handleEnter = (el) => {
    el.style.transition = 'transform 0.1s ease-out';
  };

  const handleMove = (e, el) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = (el) => {
    el.style.transition = 'transform 0.3s ease-out';
    el.style.transform = 'translate(0, 0)';
  };

  const init = () => {
    if (elements.length > 0 && !isMobile()) {
      elements.forEach(el => {
        el.addEventListener('mouseenter', () => handleEnter(el));
        el.addEventListener('mousemove', (e) => handleMove(e, el));
        el.addEventListener('mouseleave', () => handleLeave(el));
      });
    }
  };

  init();
};

// ================================
// CUSTOM CURSOR
// ================================
const createCustomCursor = () => {
  const cursor = document.getElementById('cursor');
  const cursorDot = document.querySelector('.cursor__dot');
  const cursorOutline = document.querySelector('.cursor__outline');
  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;

  const animateOutline = () => {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateOutline);
  };

  const init = () => {
    if (!cursor || isMobile()) return;

    let started = false;

    const startCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      outlineX = mouseX;
      outlineY = mouseY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      cursor.classList.add('active');
      cursor.style.opacity = '1';
      started = true;

      animateOutline();
    };

    document.addEventListener('mousemove', (e) => {
      if (!started) {
        startCursor(e);
      }

      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const hoverTargets = document.querySelectorAll('a, button, .magnetic, .project-card, .service-card');
    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
      target.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
    });

    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', (e) => {
      if (started) {
        cursor.style.opacity = '1';
      }
    });
  };

  init();
};

// ================================
// TYPEWRITER EFFECT
// ================================
const createTypewriterEffect = (element, words, options = {}) => {
  const typeSpeed = options.typeSpeed || 80;
  const deleteSpeed = options.deleteSpeed || 40;
  const pauseEnd = options.pauseEnd || 2500;
  const pauseStart = options.pauseStart || 300;
  let currentWordIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let targetTime = 0;

  const update = () => {
    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      currentCharIndex--;
      element.textContent = currentWord.substring(0, currentCharIndex) || '\u200B';
    } else {
      currentCharIndex++;
      element.textContent = currentWord.substring(0, currentCharIndex);
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;
    delay += Math.random() * 30 - 15;

    if (!isDeleting && currentCharIndex === currentWord.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      delay = pauseStart;
    }

    targetTime = performance.now() + delay;
  };

  const animate = (timestamp = 0) => {
    if (timestamp >= targetTime) {
      update();
    }
    requestAnimationFrame(animate);
  };

  if (element) {
    animate();
  }
};

// ================================
// SMOOTH NAVIGATION
// ================================
const createSmoothNavigation = () => {
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav__link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const sections = document.querySelectorAll('.section');
  const scrollContainer = document.getElementById('mainContainer');
  const scrollThreshold = 100;

  const getScrollTop = () => {
    const windowScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const containerScroll = scrollContainer ? scrollContainer.scrollTop : 0;
    return Math.max(windowScroll, containerScroll);
  };

  const toggleMobileNav = () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  };

  const closeMobileNav = () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  };

  const updateNavVisibility = () => {
    const scrollTop = getScrollTop();

    if (scrollTop > scrollThreshold) {
      nav.classList.remove('nav--hidden');
      nav.classList.add('nav--visible', 'nav--scrolled');
    } else {
      nav.classList.add('nav--hidden');
      nav.classList.remove('nav--visible', 'nav--scrolled');
    }
  };

  const updateActiveLink = () => {
    let currentSection = '';

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSection) {
        link.classList.add('active');
      }
    });
  };

  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateNavVisibility();
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  };

  const init = () => {
    [...navLinks, ...mobileNavLinks].forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });

          if (mobileNav.classList.contains('active')) {
            toggleMobileNav();
          }
        }
      });
    });

    // Smooth scroll for CTA buttons and logo link
    document.querySelectorAll('.home__cta a[href^="#"], .nav__logo a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    if (hamburger) {
      hamburger.addEventListener('click', toggleMobileNav);
    }

    if (mobileNav) {
      mobileNav.addEventListener('click', (e) => {
        if (e.target === mobileNav) {
          closeMobileNav();
        }
      });
    }

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('touchmove', handleScroll, { passive: true });
    document.addEventListener('touchend', handleScroll, { passive: true });

    updateNavVisibility();
  };

  init();
};

// ================================
// STAGGER ANIMATIONS
// ================================
const createStaggerAnimations = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const handleIntersect = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('active');
          }, index * 100);
        });
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect, options);

  const init = () => {
    const staggerContainers = document.querySelectorAll('.stagger');
    staggerContainers.forEach(container => observer.observe(container));
  };

  init();
};

// ================================
// SCROLL PROGRESS
// ================================
const createScrollProgress = () => {
  const scrollContainer = document.getElementById('mainContainer');
  const progressBar = document.querySelector('.scroll-progress__bar');
  const isMobileDevice = isTouchDevice();

  const updateProgress = () => {
    let scrollTop, scrollHeight;

    if (isMobileDevice) {
      scrollTop = window.scrollY || document.documentElement.scrollTop;
      scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    } else {
      scrollTop = scrollContainer ? scrollContainer.scrollTop : 0;
      scrollHeight = scrollContainer ? scrollContainer.scrollHeight - scrollContainer.clientHeight : 1;
    }

    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${progress}%`;
  };

  const init = () => {
    if (!progressBar) return;

    const handleScroll = () => updateProgress();

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('scroll', handleScroll);
  };

  init();
};

// ================================
// SECTION LINE ANIMATION
// ================================
const createSectionLineAnimation = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const handleIntersect = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const line = entry.target.querySelector('.section__line') || entry.target;
        if (line.classList.contains('section__line')) {
          line.style.animation = 'drawLineFromCenter 0.6s var(--ease-out-expo) forwards';
        }
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect, options);

  const init = () => {
    const lines = document.querySelectorAll('.section__line');
    lines.forEach(line => {
      line.style.transform = 'scaleX(0)';
      observer.observe(line.closest('.section__header') || line);
    });
  };

  init();
};

// ================================
// RICH MEDIA ANIMATION TRIGGER
// ================================
const createRichMediaAnimations = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const triggerAnimation = (iframe) => {
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage({ action: 'run-animation' }, '*');
      } catch (e) {
        console.warn('Could not trigger iframe animation:', e);
      }
    }
  };

  const handleIntersect = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        const iframe = entry.target.querySelector('iframe');
        triggerAnimation(iframe);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect, options);

  const init = () => {
    const richMediaCards = document.querySelectorAll('.rich-media-card');
    richMediaCards.forEach(card => observer.observe(card));
  };

  init();
};

// ================================
// INITIALIZE ALL ANIMATIONS
// ================================
const initAnimations = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAnimations);
  } else {
    setupAnimations();
  }
};

const setupAnimations = () => {
  // Initialize reveal observer
  window.revealObserver = createRevealObserver();

  // Initialize parallax
  createParallaxEffect();

  // Initialize magnetic effect
  createMagneticEffect();

  // Initialize custom cursor
  createCustomCursor();

  // Initialize smooth navigation
  createSmoothNavigation();

  // Initialize stagger animations
  createStaggerAnimations();

  // Initialize section line animations
  createSectionLineAnimation();

  // Initialize rich media animations
  createRichMediaAnimations();

  // Initialize scroll progress
  createScrollProgress();

  // Initialize typewriter for home
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    createTypewriterEffect(typewriterEl, [
      'Web Developer',
      'Front End Specialist',
      'UI|UX Enthusiast',
      'Rich Media Developer'
    ], {
      typeSpeed: 70,
      deleteSpeed: 35,
      pauseEnd: 2500,
      pauseStart: 500
    });
  }

  // Initialize scroll indicator visibility
  createScrollIndicator();
};

// ================================
// SCROLL INDICATOR (Home Section Only)
// ================================
const createScrollIndicator = () => {
  const scrollIndicator = document.querySelector('.home__scroll-indicator');
  const homeSection = document.getElementById('home');

  if (!scrollIndicator || !homeSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scrollIndicator.classList.add('visible');
      } else {
        scrollIndicator.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(homeSection);
};

// Export for use in main.js
window.initAnimations = initAnimations;
