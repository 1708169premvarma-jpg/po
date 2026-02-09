/**
 * Fashion Runway Animation System
 * Controls parallax scrolling, camera movement, and model walking animations
 * ONLY affects #home-runway section
 */

class RunwayAnimation {
  constructor() {
    this.runwaySection = null;
    this.container = null;
    this.models = [];
    this.isActive = false;
    this.animationFrame = null;
    
    // Camera state
    this.cameraZ = -300;
    this.cameraSway = 0;
    this.cameraSwaySpeed = 0.002;
    this.cameraSwayAmount = 2;
    
    // Scroll state
    this.scrollProgress = 0;
    this.lastScrollY = 0;
    
    // Model management
    this.modelCount = 3;
    this.modelSpacing = 400;
    this.modelSpeed = 0.5;
    this.activeModels = [];
    
    // Performance
    this.lastFrameTime = 0;
    this.frameInterval = 1000 / 60; // 60fps target
    
    // Reduced motion support
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }
  
  setup() {
    this.runwaySection = document.getElementById('home-runway');
    if (!this.runwaySection) {
      console.warn('Runway section not found');
      return;
    }
    
    // Create runway structure
    this.createRunwayStructure();
    
    // Create models
    this.createModels();
    
    // Setup scroll listener
    this.setupScrollListener();
    
    // Setup intersection observer to pause when out of view
    this.setupIntersectionObserver();
    
    // Start animation
    this.start();
  }
  
  createRunwayStructure() {
    // Create container
    this.container = document.createElement('div');
    this.container.className = 'runway-container';
    
    // Create back wall
    const backWall = document.createElement('div');
    backWall.className = 'runway-back-wall';
    this.container.appendChild(backWall);
    
    // Create lights
    const lights = document.createElement('div');
    lights.className = 'runway-lights';
    for (let i = 0; i < 5; i++) {
      const light = document.createElement('div');
      light.className = 'runway-light-beam';
      lights.appendChild(light);
    }
    this.container.appendChild(lights);
    
    // Create floor
    const floor = document.createElement('div');
    floor.className = 'runway-floor';
    this.container.appendChild(floor);
    
    // Create runway strip
    const strip = document.createElement('div');
    strip.className = 'runway-strip';
    this.container.appendChild(strip);
    
    // Create spotlight
    const spotlight = document.createElement('div');
    spotlight.className = 'runway-spotlight';
    this.container.appendChild(spotlight);
    
    // Create models container
    this.modelsContainer = document.createElement('div');
    this.modelsContainer.className = 'runway-models-container';
    this.container.appendChild(this.modelsContainer);
    
    // Insert at the beginning of runway section
    this.runwaySection.insertBefore(this.container, this.runwaySection.firstChild);
  }
  
  createModels() {
    for (let i = 0; i < this.modelCount; i++) {
      const model = this.createModel();
      model.dataset.index = i;
      this.models.push(model);
      this.modelsContainer.appendChild(model);
    }
  }
  
  createModel() {
    const model = document.createElement('div');
    model.className = 'runway-model';
    
    const body = document.createElement('div');
    body.className = 'model-body';
    
    // Head
    const head = document.createElement('div');
    head.className = 'model-head';
    body.appendChild(head);
    
    // Torso
    const torso = document.createElement('div');
    torso.className = 'model-torso';
    body.appendChild(torso);
    
    // Arms
    const armLeft = document.createElement('div');
    armLeft.className = 'model-arm model-arm-left';
    body.appendChild(armLeft);
    
    const armRight = document.createElement('div');
    armRight.className = 'model-arm model-arm-right';
    body.appendChild(armRight);
    
    // Legs
    const legLeft = document.createElement('div');
    legLeft.className = 'model-leg model-leg-left';
    body.appendChild(legLeft);
    
    const legRight = document.createElement('div');
    legRight.className = 'model-leg model-leg-right';
    body.appendChild(legRight);
    
    model.appendChild(body);
    
    return model;
  }
  
  setupScrollListener() {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    this.updateScroll(); // Initial update
  }
  
  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.start();
          } else {
            this.pause();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );
    
    if (this.runwaySection) {
      observer.observe(this.runwaySection);
    }
  }
  
  updateScroll() {
    if (!this.runwaySection) return;
    
    const rect = this.runwaySection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress within the section
    if (rect.bottom < 0 || rect.top > windowHeight) {
      this.scrollProgress = 0;
    } else {
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      this.scrollProgress = Math.max(0, Math.min(1, -sectionTop / sectionHeight));
    }
    
    this.lastScrollY = window.scrollY;
  }
  
  updateCamera() {
    // Initial camera zoom-in on load
    const loadProgress = Math.min(1, (Date.now() - this.startTime) / 2000);
    const initialZoom = -500 + (loadProgress * 200); // Zoom from -500 to -300
    
    // Scroll-based camera movement
    const scrollZoom = this.scrollProgress * 100; // Additional zoom on scroll
    
    // Camera sway for realism
    this.cameraSway += this.cameraSwaySpeed;
    const swayX = Math.sin(this.cameraSway) * this.cameraSwayAmount;
    
    // Final camera position
    this.cameraZ = initialZoom - scrollZoom;
    
    if (this.container) {
      this.container.style.transform = `
        translateZ(${this.cameraZ}px)
        translateX(${swayX}px)
        rotateY(${swayX * 0.1}deg)
      `;
    }
  }
  
  updateParallax() {
    if (!this.container) return;
    
    const parallaxFactor = this.scrollProgress;
    
    // Back wall (slowest)
    const backWall = this.container.querySelector('.runway-back-wall');
    if (backWall) {
      const offset = parallaxFactor * 50;
      backWall.style.transform = `translateZ(-500px) scale(2) translateY(${offset}px)`;
    }
    
    // Lights
    const lights = this.container.querySelector('.runway-lights');
    if (lights) {
      const offset = parallaxFactor * 40;
      lights.style.transform = `translateZ(-400px) scale(1.8) translateY(${offset}px)`;
    }
    
    // Floor (medium)
    const floor = this.container.querySelector('.runway-floor');
    if (floor) {
      const offset = parallaxFactor * 30;
      floor.style.transform = `translateZ(-200px) scale(1.4) rotateX(60deg) translateY(${offset}px)`;
    }
    
    // Runway strip
    const strip = this.container.querySelector('.runway-strip');
    if (strip) {
      const offset = parallaxFactor * 30;
      strip.style.transform = `translateX(-50%) translateZ(-200px) scale(1.4) rotateX(60deg) translateY(${offset}px)`;
    }
    
    // Spotlight
    const spotlight = this.container.querySelector('.runway-spotlight');
    if (spotlight) {
      const offset = parallaxFactor * 20;
      spotlight.style.transform = `translateX(-50%) translateZ(-100px) translateY(${offset}px)`;
    }
  }
  
  updateModels() {
    if (this.reducedMotion) return;
    
    const now = Date.now();
    const timeDelta = now - this.lastFrameTime;
    
    if (timeDelta < this.frameInterval) return;
    
    this.lastFrameTime = now;
    
    this.models.forEach((model, index) => {
      if (!model) return;
      
      // Calculate model position based on time and index
      const baseZ = -1000 - (index * this.modelSpacing);
      const timeOffset = (now * this.modelSpeed) % (this.modelSpacing * this.modelCount);
      const currentZ = baseZ + timeOffset;
      
      // Only show models that are in view range
      if (currentZ > -200 && currentZ < 200) {
        model.classList.add('active', 'walking');
        
        // Calculate X position (center with slight variation)
        const centerX = 50; // 50% from left
        const variation = Math.sin(now * 0.001 + index) * 5; // Subtle side-to-side
        const xPos = centerX + variation;
        
        // Calculate scale based on Z position (perspective)
        const scale = Math.max(0.3, Math.min(1.5, (currentZ + 1000) / 1000));
        
        // Calculate Y position (bottom alignment)
        const yPos = 30; // 30% from bottom
        
        model.style.left = `${xPos}%`;
        model.style.bottom = `${yPos}%`;
        model.style.transform = `translateZ(${currentZ}px) scale(${scale})`;
        model.style.opacity = Math.max(0, Math.min(1, (currentZ + 200) / 400));
      } else {
        model.classList.remove('active', 'walking');
        model.style.opacity = '0';
      }
    });
  }
  
  animate() {
    if (!this.isActive || !this.runwaySection) {
      return;
    }
    
    // Check if section is in viewport
    const rect = this.runwaySection.getBoundingClientRect();
    const isInView = rect.bottom > 0 && rect.top < window.innerHeight;
    
    if (!isInView) {
      this.animationFrame = requestAnimationFrame(() => this.animate());
      return;
    }
    
    this.updateCamera();
    this.updateParallax();
    this.updateModels();
    
    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
  
  start() {
    if (this.isActive) return;
    
    this.isActive = true;
    this.startTime = Date.now();
    this.lastFrameTime = Date.now();
    this.animate();
  }
  
  pause() {
    this.isActive = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
  
  destroy() {
    this.pause();
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.models = [];
    this.activeModels = [];
  }
}

// Initialize runway animation
let runwayAnimation = null;

// Function to initialize runway when element is available
function initRunway() {
  // Check if element exists
  const runwaySection = document.getElementById('home-runway');
  if (runwaySection && !runwayAnimation) {
    runwayAnimation = new RunwayAnimation();
  } else if (!runwaySection) {
    // Retry after a short delay if element not found
    setTimeout(initRunway, 100);
  }
}

// Auto-initialize when DOM is ready or immediately if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRunway);
} else {
  // If DOM is already loaded, try immediately and retry if needed
  initRunway();
}

// Also listen for React hydration/updates
if (typeof window !== 'undefined') {
  // Use MutationObserver to detect when React adds the element
  const observer = new MutationObserver(() => {
    if (!runwayAnimation) {
      initRunway();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Also try on next frame for React apps
  requestAnimationFrame(initRunway);
}

// Export for manual control if needed
export default RunwayAnimation;

