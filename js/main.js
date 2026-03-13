/*
  File Name: main.js
  Author: Jayvee O. Cruz
  Purpose: Main JavaScript - Portfolio Core Functionality
*/

// ================================
// CONFIGURATION
// ================================
const CONFIG = {
  images: [
    'iconv1.ico',
    'iconv2.ico',
    'my_icon_v2.png',
    'my_logo_v2.png',
    'background1.jpg',
    'background2.jpg',
    'monitor.png',
    'gear.png',
    'megaphone.png',
    'kasha.png',
    'fastdoc.png',
    'morivy.png',
    'tayocash.png'
  ],
  loadingDuration: 2500,
  animationDelay: 300
};

// ================================
// STATE
// ================================
const state = {
  imagesLoaded: 0,
  totalImages: CONFIG.images.length,
  isLoading: true
};

// ================================
// UTILITY FUNCTIONS
// ================================
const utils = {
  getElementById: (id) => {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with id "${id}" not found`);
    }
    return element;
  },

  select: (selector) => document.querySelectorAll(selector),

  isMobile: () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),

  isWindows: () => navigator.platform.indexOf('Win') > -1,

  isMacintosh: () => navigator.platform.indexOf('Mac') > -1,

  debounce: (func, wait) => {
    let timeout;
    return (...args) => {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// ================================
// LOADING SCREEN
// ================================
const createLoadingScreen = () => {
  let element = null;
  let icon = null;
  let progressBar = null;
  let text = null;

  const init = () => {
    element = utils.getElementById('loadingScreen');
    icon = utils.getElementById('loadingIcon');
    progressBar = document.querySelector('.loading-screen__progress-bar');
    text = document.querySelector('.loading-screen__text');
  };

  const show = () => {
    if (icon) {
      icon.classList.add('visible');
    }
  };

  const updateProgress = (progress) => {
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  };

  const hide = () => {
    if (element) {
      element.classList.add('hidden');
      setTimeout(() => {
        element.style.display = 'none';
      }, 800);
    }
  };

  return { init, show, updateProgress, hide };
};

// ================================
// FAVICON
// ================================
const setFavicon = () => {
  const icon1 = utils.getElementById('iconLink1');
  const icon2 = utils.getElementById('iconLink2');

  if (icon1) icon1.href = 'assets/iconv1.ico';
  if (icon2) icon2.href = 'assets/iconv2.ico';
};

// ================================
// IMAGE PRELOADER
// ================================
const createPreloader = (loadingScreen) => {
  const onImageLoad = () => {
    state.imagesLoaded++;
    const progress = (state.imagesLoaded / state.totalImages) * 100;
    loadingScreen.updateProgress(progress);
  };

  const preloadImages = () => {
    CONFIG.images.forEach(src => {
      const img = new Image();
      img.src = `assets/${src}`;
      img.onload = onImageLoad;
      img.onerror = onImageLoad; // Count errors too to prevent hanging
    });
  };

  return { preloadImages };
};

// ================================
// MAIN CONTAINER
// ================================
const createMainContainer = () => {
  let element = null;

  const init = () => {
    element = utils.getElementById('mainContainer');
  };

  const setup = () => {
    if (element) {
      element.classList.add('loaded');

      if (!utils.isMobile()) {
        element.style.right = '-17px';
      }
    }
  };

  return { init, setup };
};

// ================================
// WORD CLOUD (TAG CANVAS)
// ================================
const initWordCloud = () => {
  if (typeof TagCanvas !== 'undefined') {
    try {
      TagCanvas.Start('wordCloud', 'tags', {
        textFont: 'Courier New, sans-serif',
        textColour: '#FFF',
        shadow: '#00D4FF',
        shadowBlur: 15,
        textHeight: 28,
        stretchX: 2,
        noSelect: true,
        activeCursor: 'default',
        animTiming: 'Smooth',
        wheelZoom: false,
        noMouse: true,
        reverse: false,
        initial: [0.08, 0.04],
        depth: 0.8,
        maxSpeed: 0.02,
        outlineMethod: 'none',
        fadeIn: 1000
      });
    } catch (e) {
      console.warn('TagCanvas initialization failed:', e);
    }
  }
};

// ================================
// RICH MEDIA IFRAMES
// ================================
const createRichMedia = () => {
  const init = () => {
    const iframes = document.querySelectorAll('.rich-media-card__iframe');

    iframes.forEach(iframe => {
      iframe.setAttribute('marginwidth', '0');
      iframe.setAttribute('marginheight', '0');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('scrolling', 'no');
    });
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

  return { init, triggerAnimation };
};

// ================================
// LOADING ANIMATION
// ================================
const createLoadingAnimation = (onComplete) => {
  let animationCount = 0;
  const maxAnimations = 3;

  const animate = () => {
    const icon = utils.getElementById('loadingIcon');

    if (!icon) return;

    animationCount++;
    icon.classList.add('visible');

    if (animationCount < maxAnimations) {
      setTimeout(() => {
        icon.classList.remove('visible');
        setTimeout(animate, 300);
      }, 500);
    } else {
      setTimeout(onComplete, 500);
    }
  };

  const start = () => animate();

  return { start };
};

// ================================
// INITIALIZATION
// ================================
const loadingScreen = createLoadingScreen();
const mainContainer = createMainContainer();
const richMedia = createRichMedia();

const initApp = () => {
  loadingScreen.hide();

  mainContainer.init();
  mainContainer.setup();

  setTimeout(initWordCloud, 500);

  richMedia.init();

  if (typeof initAnimations === 'function') {
    initAnimations();
  }
};

// ================================
// ENTRY POINT
// ================================
window.addEventListener('load', () => {
  setFavicon();

  loadingScreen.init();
  loadingScreen.show();

  const preloader = createPreloader(loadingScreen);
  preloader.preloadImages();

  const loadingAnimation = createLoadingAnimation(initApp);
  loadingAnimation.start();
}, false);

// ================================
// EXPOSE UTILITIES GLOBALLY
// ================================
window.utils = utils;
window.richMedia = richMedia;
