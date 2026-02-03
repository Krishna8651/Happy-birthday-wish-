// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const particlesContainer = document.getElementById('particles');
const floatingHearts = document.getElementById('floatingHearts');
const confettiContainer = document.getElementById('confettiContainer');
const scenes = document.querySelectorAll('.scene');
const envelope = document.getElementById('envelope');
const nameInput = document.getElementById('nameInput');
const personalizeWish = document.getElementById('personalizeWish');
const candles = document.querySelectorAll('.candle');
const stars = document.querySelectorAll('.star');
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseContent = document.getElementById('surpriseContent');
const musicToggle = document.getElementById('musicToggle');
const soundToggle = document.getElementById('soundToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const clickSound = document.getElementById('clickSound');
const celebrationSound = document.getElementById('celebrationSound');
const viewCountElement = document.getElementById('viewCount');
const replayBtn = document.getElementById('replayBtn');
const shareBtn = document.getElementById('shareBtn');
const loveBtn = document.getElementById('loveBtn');

// Scene navigation elements
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn2 = document.getElementById('nextBtn2');
const prevBtn2 = document.getElementById('prevBtn2');
const prevBtn3 = document.getElementById('prevBtn3');

// Countdown elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// State variables
let currentScene = 0;
let userName = '';
let isMusicPlaying = true;
let isSoundEnabled = true;
let viewCount = localStorage.getItem('birthdayWishViews') || 0;
let rating = 0;

// Typewriter messages
const typewriterMessages = [
    "Today is your day, and the universe is celebrating you!",
    "May all your dreams come true and your heart be filled with joy.",
    "You're not just a year older, you're a year more amazing!",
    "This birthday marks the beginning of your best year yet.",
    "Wishing you endless happiness, laughter, and love today and always."
];

// Surprise messages
const surpriseMessages = [
    "🎉 You're amazing! Here's a virtual hug! 🤗",
    "✨ You deserve all the happiness in the world! ✨",
    "🎂 Your presence makes every moment special! 🎂",
    "💫 May all your wishes come true this year! 💫",
    "❤️ You are loved more than words can express! ❤️",
    "🌟 Your smile can light up the darkest rooms! 🌟"
];

// Initialize
function init() {
    // Load view count
    viewCount++;
    localStorage.setItem('birthdayWishViews', viewCount);
    viewCountElement.textContent = viewCount;
    
    // Start countdown timer
    startCountdown();
    
    // Create particles
    createParticles();
    
    // Create floating hearts
    createFloatingHearts();
    
    // Setup event listeners
    setupEventListeners();
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            showScene(0);
        }, 500);
    }, 2000);
    
    // Start background music
    backgroundMusic.volume = 0.5;
    backgroundMusic.play().catch(e => {
        console.log("Autoplay prevented. User interaction required.");
    });
}

// Create particle effects
function createParticles() {
    const colors = ['#ff6b8b', '#ffd166', '#06d6a0', '#118ab2', '#8e54e9'];
    
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.classList.add('confetti');
        
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = Math.random() * 10 + 5 + 'px';
        particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        particlesContainer.appendChild(particle);
        
        // Animate particles
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    particle.style.animation = `floatUp ${duration}s linear ${delay}s infinite`;
    
    // Random movement
    setInterval(() => {
        const x = Math.random() * 20 - 10;
        particle.style.transform = `translateX(${x}px)`;
    }, 1000);
}

// Create floating hearts
function createFloatingHearts() {
    const heartIcons = ['❤️', '💖', '💕', '💗', '💓', '💞', '💝', '🎂', '🎉', '✨'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart-particle');
            heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];
            
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.color = getRandomColor();
            
            floatingHearts.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, 8000);
        }, i * 500);
    }
    
    // Keep creating hearts
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.color = getRandomColor();
        
        floatingHearts.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 2000);
}

function getRandomColor() {
    const colors = ['#ff6b8b', '#ffd166', '#06d6a0', '#118ab2', '#8e54e9', '#ff9a00'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Scene management
function showScene(index) {
    scenes.forEach((scene, i) => {
        scene.classList.remove('active');
        if (i === index) {
            setTimeout(() => {
                scene.classList.add('active');
            }, 50);
        }
    });
    
    currentScene = index;
    
    // Play sound if enabled
    if (isSoundEnabled) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Sound play error"));
    }
}

// Setup event listeners
function setupEventListeners() {
    // Envelope click
    envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');
        if (isSoundEnabled) {
            clickSound.currentTime = 0;
            clickSound.play();
        }
        
        setTimeout(() => {
            showScene(1);
        }, 1500);
    });
    
    // Personalize wish button
    personalizeWish.addEventListener('click', () => {
        userName = nameInput.value.trim();
        if (userName) {
            // Update typewriter text
            const typewriterElement = document.getElementById('typewriter');
            const randomMessage = typewriterMessages[Math.floor(Math.random() * typewriterMessages.length)];
            const personalizedMessage = randomMessage.replace(/your/gi, `${userName}'s`)
                                                     .replace(/you/gi, userName);
            
            typewriterElement.innerHTML = `<p>${personalizedMessage}</p>`;
            
            // Add animation
            typewriterElement.style.animation = 'none';
            setTimeout(() => {
                typewriterElement.style.animation = 'typing 3s steps(40, end)';
            }, 10);
            
            // Create confetti
            createConfettiBurst(typewriterElement.getBoundingClientRect().left + typewriterElement.offsetWidth/2, 
                               typewriterElement.getBoundingClientRect().top);
            
            // Play celebration sound
            if (isSoundEnabled) {
                celebrationSound.currentTime = 0;
                celebrationSound.play();
            }
        } else {
            alert("Please enter your name first!");
            nameInput.focus();
        }
    });
    
    // Candles
    candles.forEach(candle => {
        candle.addEventListener('click', () => {
            if (!candle.classList.contains('blown')) {
                candle.classList.add('blown');
                
                // Create flame animation
                createFlameEffect(candle);
                
                // Check if all candles are blown
                const allBlown = Array.from(candles).every(c => c.classList.contains('blown'));
                if (allBlown) {
                    setTimeout(() => {
                        createConfettiRain();
                        if (isSoundEnabled) {
                            celebrationSound.currentTime = 0;
                            celebrationSound.play();
                        }
                        
                        // Show message
                        const message = userName ? 
                            `🎉 ${userName}, you've made a wish! It will come true! 🎉` :
                            "🎉 You've made a wish! It will come true! 🎉";
                        
                        alert(message);
                    }, 500);
                }
            }
        });
    });
    
    // Star rating
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            rating = value;
            
            // Update stars
            stars.forEach((s, index) => {
                if (index < value) {
                    s.classList.add('active');
                    s.style.color = '#ffd166';
                } else {
                    s.classList.remove('active');
                    s.style.color = '#555';
                }
            });
            
            // Thank you message
            const thankYouMessages = [
                "Thank you for your rating!",
                "We appreciate your feedback!",
                "Thanks for celebrating with us!",
                "Your opinion matters to us!",
                "Thank you for being awesome!"
            ];
            
            const randomMessage = thankYouMessages[Math.floor(Math.random() * thankYouMessages)];
            document.querySelector('.rating-text').textContent = randomMessage;
            
            // Create star effect
            createStarEffect(star);
        });
    });
    
    // Surprise button
    surpriseBtn.addEventListener('click', () => {
        const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
        surpriseContent.innerHTML = `<p style="font-size: 1.5rem; animation: fadeIn 1s;">${randomMessage}</p>`;
        
        // Create massive confetti
        createConfettiRain();
        createConfettiRain();
        createConfettiRain();
        
        // Play celebration sound
        if (isSoundEnabled) {
            celebrationSound.currentTime = 0;
            celebrationSound.play();
        }
        
        // Change button text
        surpriseBtn.innerHTML = '<i class="fas fa-gift"></i> Another Surprise?';
    });
    
    // Music toggle
    musicToggle.addEventListener('click', () => {
        isMusicPlaying = !isMusicPlaying;
        if (isMusicPlaying) {
            backgroundMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-music"></i><span class="music-text">Music</span>';
            musicToggle.style.background = 'rgba(255, 255, 255, 0.2)';
        } else {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i><span class="music-text">Music</span>';
            musicToggle.style.background = 'rgba(255, 0, 0, 0.2)';
        }
    });
    
    // Sound toggle
    soundToggle.addEventListener('click', () => {
        isSoundEnabled = !isSoundEnabled;
        if (isSoundEnabled) {
            soundToggle.innerHTML = '<i class="fas fa-volume-up"></i><span class="music-text">Sound</span>';
            soundToggle.style.background = 'rgba(255, 255, 255, 0.2)';
        } else {
            soundToggle.innerHTML = '<i class="fas fa-volume-off"></i><span class="music-text">Sound</span>';
            soundToggle.style.background = 'rgba(255, 0, 0, 0.2)';
        }
    });
    
    // Navigation buttons
    nextBtn.addEventListener('click', () => showScene(2));
    prevBtn.addEventListener('click', () => showScene(0));
    nextBtn2.addEventListener('click', () => showScene(3));
    prevBtn2.addEventListener('click', () => showScene(1));
    prevBtn3.addEventListener('click', () => showScene(2));
    
    // Replay button
    replayBtn.addEventListener('click', () => {
        // Reset candles
        candles.forEach(candle => {
            candle.classList.remove('blown');
        });
        
        // Reset stars
        stars.forEach(star => {
            star.classList.remove('active');
            star.style.color = '#555';
        });
        
        // Clear name input
        nameInput.value = '';
        userName = '';
        
        // Clear surprise content
        surpriseContent.innerHTML = '';
        
        // Reset surprise button
        surpriseBtn.innerHTML = '<i class="fas fa-gift"></i> Click for a Surprise!';
        
        // Reset rating text
        document.querySelector('.rating-text').textContent = 'Rate this birthday experience!';
        
        // Show first scene
        showScene(0);
        
        // Create confetti
        createConfettiRain();
        
        // Play sound
        if (isSoundEnabled) {
            celebrationSound.currentTime = 0;
            celebrationSound.play();
        }
    });
    
    // Share button
    shareBtn.addEventListener('click', () => {
        const shareText = "Check out this amazing birthday wish experience! 🎂🎉";
        const shareUrl = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: 'Birthday Wishes',
                text: shareText,
                url: shareUrl
            });
        } else {
            navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
                alert("Link copied to clipboard! Share it with your friends!");
            });
        }
    });
    
    // Love button
    loveBtn.addEventListener('click', () => {
        // Create heart explosion
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createHeartExplosion();
            }, i * 50);
        }
        
        // Update button text temporarily
        const originalText = loveBtn.innerHTML;
        loveBtn.innerHTML = '<i class="fas fa-heart"></i> Love Sent!';
        loveBtn.disabled = true;
        
        setTimeout(() => {
            loveBtn.innerHTML = originalText;
            loveBtn.disabled = false;
        }, 2000);
    });
    
    // Enter key for name input
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            personalizeWish.click();
        }
    });
}

// Create confetti rain
function createConfettiRain() {
    const colors = ['#ff6b8b', '#ffd166', '#06d6a0', '#118ab2', '#8e54e9', '#ff9a00'];
    
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 15 + 5 + 'px';
            confetti.style.height = Math.random() * 15 + 5 + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            confettiContainer.appendChild(confetti);
            
            // Animation
            const animation = confetti.animate([
                { transform: `translateY(-100px) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }, i * 10);
    }
}

// Create confetti burst
function createConfettiBurst(x, y) {
    const colors = ['#ff6b8b', '#ffd166', '#06d6a0', '#118ab2'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        confettiContainer.appendChild(confetti);
        
        // Burst animation
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 3;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = 0;
        let posY = 0;
        let opacity = 1;
        
        const animate = () => {
            posX += vx;
            posY += vy;
            vy += 0.1; // gravity
            opacity -= 0.02;
            
            confetti.style.transform = `translate(${posX * 10}px, ${posY * 10}px)`;
            confetti.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Create flame effect
function createFlameEffect(candle) {
    const flame = candle.querySelector('.flame');
    
    // Create mini particles from flame
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '5px';
            particle.style.height = '5px';
            particle.style.backgroundColor = '#ff9900';
            particle.style.borderRadius = '50%';
            particle.style.left = '7.5px';
            particle.style.top = '-30px';
            particle.style.boxShadow = '0 0 10px #ff9900';
            
            candle.appendChild(particle);
            
            // Animate particle
            const angle = Math.random() * Math.PI - Math.PI/2;
            const velocity = 1 + Math.random();
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let x = 0;
            let y = 0;
            let opacity = 1;
            
            const animateParticle = () => {
                x += vx;
                y += vy;
                opacity -= 0.05;
                
                particle.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animateParticle);
                } else {
             
