// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  const card = document.querySelector('.card');
  const toSignupBtn = document.getElementById('to-signup');
  const toLoginBtn = document.getElementById('to-login');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const socialBtns = document.querySelectorAll('.social-btn');
  
  // 3D Effect Variables
  let xRotation = 0;
  let yRotation = 0;
  const cardRect = card.getBoundingClientRect();
  const cardCenterX = cardRect.left + cardRect.width / 2;
  const cardCenterY = cardRect.top + cardRect.height / 2;
  
  // Switch between login and signup forms
  toSignupBtn.addEventListener('click', function() {
    // Play zombie groan
    playZombieSound('groan');
    // Add shake animation
    card.classList.add('shake');
    
    // Flip card after short delay
    setTimeout(() => {
      card.classList.add('flip');
      // Remove shake animation
      card.classList.remove('shake');
    }, 300);
  });
  
  toLoginBtn.addEventListener('click', function() {
    // Play zombie sound
    playZombieSound('hiss');
    // Add shake animation
    card.classList.add('shake');
    
    // Flip card after short delay
    setTimeout(() => {
      card.classList.remove('flip');
      // Remove shake animation
      card.classList.remove('shake');
    }, 300);
  });
  
  // 3D Mouse Movement Effect
  document.addEventListener('mousemove', function(e) {
    if (!card.classList.contains('flip')) {
      // 3D effect only when on login side
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Calculate rotation values
      const rotateY = (mouseX - cardCenterX) / (cardRect.width / 2) * 10;
      const rotateX = (cardCenterY - mouseY) / (cardRect.height / 2) * 10;
      
      // Apply smooth 3D rotation
      xRotation = rotateX;
      yRotation = rotateY;
      
      card.style.transition = 'transform 0.1s';
      card.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    }
  });
  
  // Reset 3D effect when mouse leaves
  card.addEventListener('mouseleave', function() {
    if (!card.classList.contains('flip')) {
      card.style.transition = 'transform 0.5s ease-out';
      card.style.transform = 'rotateX(0) rotateY(0)';
      xRotation = 0;
      yRotation = 0;
    }
  });
  
  // Form Submissions
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add loading effect
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.innerHTML = '<span>ACCESSING...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      playZombieSound('success');
      showNotification('Access granted! Welcome back, survivor.');
      
      // Reset button
      setTimeout(() => {
        submitBtn.innerHTML = '<span>ENTER SAFE ZONE</span> <i class="fas fa-biohazard"></i>';
        submitBtn.disabled = false;
      }, 2000);
    }, 1500);
  });
  
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add loading effect
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.innerHTML = '<span>PROCESSING...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      playZombieSound('success');
      showNotification('Registration successful! Welcome to the resistance.');
      
      // Reset button and flip back to login
      setTimeout(() => {
        submitBtn.innerHTML = '<span>JOIN RESISTANCE</span> <i class="fas fa-skull"></i>';
        submitBtn.disabled = false;
        card.classList.remove('flip');
      }, 2000);
    }, 1500);
  });
  
  // Social Login Buttons
  socialBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const platform = this.classList.contains('google') ? 'Google' :
                      this.classList.contains('facebook') ? 'Facebook' :
                      'Twitter';
      
      // Add loading effect
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      this.disabled = true;
      
      // Simulate login
      setTimeout(() => {
        playZombieSound('success');
        showNotification(`${platform} login successful!`);
        
        // Reset button
        setTimeout(() => {
          this.innerHTML = this.classList.contains('google') ? '<i class="fab fa-google"></i>' :
                          this.classList.contains('facebook') ? '<i class="fab fa-facebook-f"></i>' :
                          '<i class="fab fa-twitter"></i>';
          this.disabled = false;
        }, 1500);
      }, 1000);
    });
  });
  
  // Input Animations
  const inputs = document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"]');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      playZombieSound('click');
    });
  });
  
  // Add shake animation class
  function addShakeAnimation() {
    document.documentElement.style.setProperty('--shake-animation', `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
    `);
    
    const style = document.createElement('style');
    style.innerHTML = `
      .shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Call this function once to add the shake animation
  addShakeAnimation();
  
  // Create blood splatter effect
  function createBloodSplatter(x, y) {
    const splat = document.createElement('div');
    splat.className = 'blood-splat';
    splat.style.cssText = `
      position: absolute;
      top: ${y}px;
      left: ${x}px;
      width: 30px;
      height: 30px;
      background: var(--blood-red);
      border-radius: 50%;
      transform: scale(0);
      opacity: 0.8;
      z-index: 100;
      pointer-events: none;
    `;
    
    document.body.appendChild(splat);
    
    // Animate the splatter
    setTimeout(() => {
      splat.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      splat.style.transform = 'scale(1)';
      splat.style.borderRadius = '40% 60% 30% 70%';
      
      // Remove after animation
      setTimeout(() => {
        splat.style.opacity = '0';
        setTimeout(() => {
          splat.remove();
        }, 500);
      }, 1000);
    }, 10);
  }
  
  // Click effect for blood splatter
  document.addEventListener('click', function(e) {
    if (Math.random() > 0.6) { // Only show blood sometimes
      createBloodSplatter(e.clientX, e.clientY);
    }
  });
  
  // Notification system
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'zombie-notification';
    notification.innerHTML = `
      <i class="fas fa-radiation"></i>
      <p>${message}</p>
    `;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: -300px;
      background: var(--zombie-dark-green);
      color: white;
      padding: 15px 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 1000;
      transition: right 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.style.right = '20px';
      
      // Auto-remove after delay
      setTimeout(() => {
        notification.style.right = '-300px';
        setTimeout(() => {
          notification.remove();
        }, 500);
      }, 3000);
    }, 100);
  }
  
  // Zombie sound effects
  function playZombieSound(type) {
    const audio = new Audio();
    
    switch(type) {
      case 'groan':
        audio.src = 'https://freesound.org/data/previews/368/368811_6836487-lq.mp3'; // Zombie groan sound
        break;
      case 'hiss':
        audio.src = 'https://freesound.org/data/previews/445/445111_4865751-lq.mp3'; // Zombie hiss
        break;
      case 'click':
        audio.src = 'https://freesound.org/data/previews/243/243020_4284968-lq.mp3'; // Click sound
        break;
      case 'success':
        audio.src = 'https://freesound.org/data/previews/320/320654_5260872-lq.mp3'; // Success sound
        break;
      default:
        return;
    }
    
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
  }
  
  // Create random floating particles
  function createParticles() {
    const particles = 15;
    const container = document.querySelector('.container');
    
    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.className = 'zombie-particle';
      
      // Random size
      const size = Math.random() * 5 + 2;
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Random color (green or yellow hues)
      const color = Math.random() > 0.5 ? 
                   `rgba(${57 + Math.random() * 20}, ${255 - Math.random() * 40}, ${20 + Math.random() * 20}, 0.7)` : 
                   `rgba(${154 + Math.random() * 20}, ${143 + Math.random() * 20}, ${85 + Math.random() * 20}, 0.7)`;
      
      // Random animation duration
      const duration = Math.random() * 20 + 10;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        top: ${posY}%;
        left: ${posX}%;
        box-shadow: 0 0 ${size * 2}px ${color};
        pointer-events: none;
        z-index: -1;
        animation: float ${duration}s infinite ease-in-out;
      `;
      
      container.appendChild(particle);
    }
    
    // Add keyframes for float animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0%, 100% {
          transform: translateY(0) translateX(0);
        }
        25% {
          transform: translateY(-20px) translateX(10px);
        }
        50% {
          transform: translateY(-10px) translateX(-10px);
        }
        75% {
          transform: translateY(-30px) translateX(5px);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Initialize particles
  createParticles();
  
  // Add zombie cursor effect
  function addZombieCursor() {
    const cursorStyle = document.createElement('style');
    cursorStyle.innerHTML = `
      body {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="%234a5d23" stroke="%23000" stroke-width="1"/><circle cx="10" cy="10" r="4" fill="%2339ff14"/></svg>'), auto;
      }
      
      button, a, input, .switch-btn {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><path d="M5 15 L12 5 L18 5 L25 15 L18 25 L12 25 Z" fill="%238b0000" stroke="%23000" stroke-width="1"/></svg>'), auto;
      }
    `;
    document.head.appendChild(cursorStyle);
  }
  
  // Initialize zombie cursor
  addZombieCursor();
  
  // Create pulsating effect for zombie eyes
  function animateZombieEyes() {
    const eyes = document.querySelectorAll('.eye');
    setInterval(() => {
      eyes.forEach(eye => {
        // Increase size & glow temporarily
        eye.style.transition = 'all 0.3s';
        eye.style.boxShadow = '0 0 20px var(--toxic-green)';
        eye.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
          // Return to normal
          eye.style.boxShadow = '0 0 10px var(--toxic-green)';
          eye.style.transform = 'scale(1)';
        }, 300);
      });
    }, 5000);
  }
  
  // Initialize eye animation
  animateZombieEyes();
  
  // Create typing effect for placeholders
  function createTypingEffect() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"]');
    
    inputs.forEach(input => {
      const originalPlaceholder = input.placeholder;
      
      input.addEventListener('focus', function() {
        this.placeholder = '';
        
        let i = 0;
        const typing = setInterval(() => {
          if (i <= originalPlaceholder.length) {
            this.placeholder = originalPlaceholder.substring(0, i) + '|';
            i++;
          } else {
            clearInterval(typing);
            this.placeholder = originalPlaceholder;
          }
        }, 100);
        
        // Store the interval to clear it when focus is lost
        this.dataset.typingInterval = typing;
      });
      
      input.addEventListener('blur', function() {
        if (this.dataset.typingInterval) {
          clearInterval(parseInt(this.dataset.typingInterval));
          this.placeholder = originalPlaceholder;
        }
      });
    });
  }
  
  // Initialize typing effect
  createTypingEffect();
  
  // Add screen flicker effect occasionally
  function addScreenFlicker() {
    const flicker = document.createElement('div');
    flicker.className = 'screen-flicker';
    flicker.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      opacity: 0;
      pointer-events: none;
      z-index: 9999;
      transition: opacity 0.1s;
    `;
    document.body.appendChild(flicker);
    
    // Random flicker effect
    setInterval(() => {
      if (Math.random() > 0.95) { // Only occasionally
        flicker.style.opacity = '0.7';
        setTimeout(() => {
          flicker.style.opacity = '0';
        }, 100);
      }
    }, 2000);
  }
  
  // Initialize screen flicker
  addScreenFlicker();
});
