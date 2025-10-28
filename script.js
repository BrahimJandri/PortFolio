document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu Toggle ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }

  // --- Scroll Progress Bar ---
  const scrollProgress = document.getElementById('scroll-progress');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  });

  // --- Generate Animated Stars ---
  const starsContainer = document.getElementById('stars-container');
  const numberOfStars = 100; // Adjust for more/fewer stars
  const numberOfShootingStars = 8; // Number of shooting stars

  function createStars() {
    // Clear existing stars
    starsContainer.innerHTML = '';
    
    // Create regular twinkling stars
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      
      // Random size
      const sizes = ['star-small', 'star-medium', 'star-large'];
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
      star.classList.add(randomSize);
      
      // Random position
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      
      // Random animation delay for varied twinkling
      star.style.animationDelay = Math.random() * 3 + 's';
      
      // Random animation duration (2-4 seconds)
      star.style.animationDuration = (Math.random() * 2 + 2) + 's';
      
      starsContainer.appendChild(star);
    }

    // Create shooting stars moving from top to bottom
    for (let i = 0; i < numberOfShootingStars; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.classList.add('shooting-star');
      
      // Random horizontal position
      shootingStar.style.left = Math.random() * 100 + '%';
      
      // Start from above the viewport
      shootingStar.style.top = '-100px';
      
      // Random animation delay (stagger them)
      shootingStar.style.animationDelay = Math.random() * 5 + 's';
      
      // Fast animation (0.6-1.2 seconds)
      shootingStar.style.animationDuration = (Math.random() * 0.6 + 0.6) + 's';
      
      starsContainer.appendChild(shootingStar);
    }
  }

  createStars();

  // --- Typewriter Effect for Name ---
  const nameElement = document.querySelector('.typewriter-name');
  if (nameElement) {
    const fullText = nameElement.textContent;
    nameElement.textContent = '';
    nameElement.style.opacity = '1';
    
    let charIndex = 0;
    const typeSpeed = 100; // milliseconds per character
    const deleteSpeed = 50; // milliseconds per character when deleting
    const pauseAfterType = 2000; // pause after typing complete (2 seconds)
    const pauseAfterDelete = 1000; // pause after deleting complete (1 second)
    let isDeleting = false;
    
    function typeWriter() {
      if (!isDeleting && charIndex < fullText.length) {
        // Typing forward
        nameElement.textContent += fullText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, typeSpeed);
      } else if (!isDeleting && charIndex === fullText.length) {
        // Finished typing, pause then start deleting
        isDeleting = true;
        setTimeout(typeWriter, pauseAfterType);
      } else if (isDeleting && charIndex > 0) {
        // Deleting backward
        nameElement.textContent = fullText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeWriter, deleteSpeed);
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, pause then start typing again
        isDeleting = false;
        setTimeout(typeWriter, pauseAfterDelete);
      }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
  }

  // --- Dark Mode Toggle Logic ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const lightIcon = document.getElementById('theme-toggle-light-icon');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');

  // Function to set theme
  const setTheme = (theme) => {
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
      lightIcon.classList.add('block');
      lightIcon.classList.remove('hidden');
      darkIcon.classList.add('hidden');
      darkIcon.classList.remove('block');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('light');
      lightIcon.classList.add('hidden');
      lightIcon.classList.remove('block');
      darkIcon.classList.add('block');
      darkIcon.classList.remove('hidden');
      localStorage.setItem('theme', 'light');
    }
  };

  // Check for saved theme in localStorage or system preference
  const currentTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  setTheme(currentTheme);

  // Toggle theme on button click
  themeToggleBtn.addEventListener('click', () => {
    const isDark = htmlElement.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  });

  // Mobile theme toggle
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', () => {
      const isDark = htmlElement.classList.contains('dark');
      setTheme(isDark ? 'light' : 'dark');
    });
  }


  // --- Contact Form Handling ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Create mailto link
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:bjandri.1337@gmail.com?subject=${subject}&body=${body}`;
      
      // Reset form
      contactForm.reset();
      
      // Show success message
      showSuccessMessage('Message sent! Your email client will open.');
    });
  }

  // Success message function
  function showSuccessMessage(message) {
    // Create success message element if it doesn't exist
    let successMsg = document.querySelector('.success-message');
    if (!successMsg) {
      successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      document.body.appendChild(successMsg);
    }
    
    successMsg.textContent = message;
    successMsg.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
      successMsg.classList.remove('show');
    }, 3000);
  }

  // Email copy to clipboard functionality
  const emailCopyLink = document.getElementById('email-copy');
  if (emailCopyLink) {
    emailCopyLink.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'bjandri.1337@gmail.com';
      
      // Copy to clipboard
      navigator.clipboard.writeText(email).then(() => {
        showSuccessMessage('✓ Email copied to clipboard!');
      }).catch(() => {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showSuccessMessage('✓ Email copied to clipboard!');
      });
    });
  }

  // Form input focus animations
  const formInputs = document.querySelectorAll('.contact-form-input');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });


  // --- Scroll Animation Logic ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    rootMargin: '0px',
    threshold: 0.1 // Triggers when 10% of the element is visible
  });

  // Observe all elements with animation classes
  const animatedSections = document.querySelectorAll('.fade-in-section, .slide-in-left, .slide-in-right, .scale-up');
  animatedSections.forEach(section => {
    observer.observe(section);
  });


  // --- Smooth Scrolling for Navigation Links ---
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return; // Skip if it's just '#'
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });


  // --- Image Loading Transition ---
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease-in';
    
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    }
  });


  // --- Floating Animation for CTA Button ---
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    // Add subtle floating animation via CSS class
    ctaButton.style.animation = 'float 3s ease-in-out infinite';
  }


  // --- Navbar Hide/Show on Scroll ---
  let lastScrollTop = 0;
  const navbar = document.querySelector('nav');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // Scrolling down & past threshold
          navbar.style.transform = 'translateY(-100%)';
        } else {
          // Scrolling up
          navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
      });
      
      ticking = true;
    }
  });


  // --- Back to Top Button ---
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
