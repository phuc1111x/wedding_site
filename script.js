// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);

    // Initialize all features
    initNavbar();
    initCountdown();
    initScrollAnimations();
    initRSVPForm();
    initMusicPlayer();
    initGallerySlider();
    loadWishes();
});

// Navbar scroll behavior
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 300) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Countdown Timer
function initCountdown() {
    const weddingDate = new Date('2025-12-29T16:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.querySelector('.countdown').innerHTML = '<p style="font-size: 1.5rem; color: var(--accent-color);">Đám cưới đang diễn ra! 🎉</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// RSVP Form Handler
function initRSVPForm() {
    const form = document.getElementById('rsvp-form');
    const successMessage = document.getElementById('rsvp-success');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('guest-name').value,
            email: document.getElementById('guest-email').value,
            phone: document.getElementById('guest-phone').value,
            count: document.getElementById('guest-count').value,
            attendance: document.querySelector('input[name="attendance"]:checked').value,
            message: document.getElementById('guest-message').value,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage
        let rsvpList = JSON.parse(localStorage.getItem('rsvpList') || '[]');
        rsvpList.push(formData);
        localStorage.setItem('rsvpList', JSON.stringify(rsvpList));

        // Add wish if message exists
        if (formData.message) {
            addWish(formData.name, formData.message);
        }

        // Show success message
        form.style.display = 'none';
        successMessage.style.display = 'block';

        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            successMessage.style.display = 'none';
            form.style.display = 'block';
        }, 5000);
    });
}

// Wishes Management
function loadWishes() {
    const wishesList = document.getElementById('wishes-list');
    let wishes = JSON.parse(localStorage.getItem('wishes') || '[]');

    // Add some default wishes if none exist
    if (wishes.length === 0) {
        wishes = [
            {
                name: 'Nguyễn Thị Lan',
                message: 'Chúc hai bạn trăm năm hạnh phúc, sớm có tin vui!',
                date: new Date().toISOString()
            },
            {
                name: 'Trần Văn Nam',
                message: 'Hạnh phúc mãi mãi bên nhau! Chúc mừng cô dâu chú rể!',
                date: new Date(Date.now() - 86400000).toISOString()
            },
            {
                name: 'Lê Thị Mai',
                message: 'Chúc cho tình yêu của hai bạn mãi xanh tươi như ban đầu!',
                date: new Date(Date.now() - 172800000).toISOString()
            }
        ];
        localStorage.setItem('wishes', JSON.stringify(wishes));
    }

    // Display wishes
    wishes.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    wishesList.innerHTML = wishes.map(wish => `
        <div class="wish-card fade-in visible">
            <div class="wish-name">${escapeHtml(wish.name)}</div>
            <div class="wish-message">${escapeHtml(wish.message)}</div>
            <div class="wish-date">${formatDate(wish.date)}</div>
        </div>
    `).join('');
}

function addWish(name, message) {
    let wishes = JSON.parse(localStorage.getItem('wishes') || '[]');
    wishes.push({
        name: name,
        message: message,
        date: new Date().toISOString()
    });
    localStorage.setItem('wishes', JSON.stringify(wishes));
    loadWishes();
}

// Gallery Slider
let galleryPosition = 0;
let galleryItemsPerView = 4;
let galleryAutoSlideInterval = null;

function initGallerySlider() {
    updateGalleryItemsPerView();
    window.addEventListener('resize', updateGalleryItemsPerView);
    startGalleryAutoSlide();
}

function startGalleryAutoSlide() {
    // Clear any existing interval
    if (galleryAutoSlideInterval) {
        clearInterval(galleryAutoSlideInterval);
    }
    // Auto slide every 3 seconds
    galleryAutoSlideInterval = setInterval(() => {
        slideGallery(1);
    }, 3000);
}

function updateGalleryItemsPerView() {
    if (window.innerWidth <= 768) {
        galleryItemsPerView = 1;
    } else {
        galleryItemsPerView = 4;
    }
    // Reset position if needed
    const track = document.querySelector('.gallery-track');
    if (!track) return;
    const items = track.querySelectorAll('.gallery-item');
    const maxPosition = Math.max(0, items.length - galleryItemsPerView);
    if (galleryPosition > maxPosition) {
        galleryPosition = maxPosition;
    }
    updateGalleryPosition();
}

function slideGallery(direction) {
    const track = document.querySelector('.gallery-track');
    if (!track) return;

    const items = track.querySelectorAll('.gallery-item');
    const totalItems = items.length;
    const maxPosition = totalItems - galleryItemsPerView;

    galleryPosition += direction;

    // Loop back
    if (galleryPosition < 0) {
        galleryPosition = maxPosition;
    } else if (galleryPosition > maxPosition) {
        galleryPosition = 0;
    }

    updateGalleryPosition();
}

function updateGalleryPosition() {
    const track = document.querySelector('.gallery-track');
    if (!track) return;

    const items = track.querySelectorAll('.gallery-item');
    if (items.length === 0) return;

    const itemWidth = items[0].offsetWidth;
    const gap = 5; // Same as CSS gap
    const offset = galleryPosition * (itemWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;
}

// Gallery Lightbox
let currentImageIndex = 0;
const galleryImages = [
    'assets/gallery (1).JPG',
    'assets/gallery (2).JPG',
    'assets/gallery (3).JPG',
    'assets/gallery (4).JPG',
    'assets/gallery (5).JPG',
    'assets/gallery (6).JPG',
    'assets/gallery (7).JPG',
    'assets/gallery (8).JPG'
];
const totalImages = galleryImages.length;

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');

    lightbox.classList.add('active');
    lightboxImage.src = galleryImages[index];
    lightboxImage.alt = `Ảnh cưới ${index + 1}`;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeSlide(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = totalImages - 1;
    } else if (currentImageIndex >= totalImages) {
        currentImageIndex = 0;
    }

    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = galleryImages[currentImageIndex];
    lightboxImage.alt = `Ảnh cưới ${currentImageIndex + 1}`;
}

// Close lightbox on outside click
document.addEventListener('click', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    }
    if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Map Functions
function openMap(type) {
    // Default location (example: Royal Palace Restaurant)
    const location = 'Royal+Palace+Restaurant+Ho+Chi+Minh+City';
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location}`;
    window.open(googleMapsUrl, '_blank');
}

// Music Player
function initMusicPlayer() {
    const musicBtn = document.getElementById('music-toggle');
    const audio = new Audio('assets/Beautiful In White - cut.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    let isPlaying = false;
    let hasTriedAutoplay = false;

    // Function to play music
    function playMusic() {
        if (hasTriedAutoplay) return;
        hasTriedAutoplay = true;

        audio.play().then(() => {
            musicBtn.classList.remove('paused');
            isPlaying = true;
            // Remove interaction listeners once playing
            document.removeEventListener('click', playMusic);
            document.removeEventListener('touchstart', playMusic);
            document.removeEventListener('scroll', playMusic);
            document.removeEventListener('keydown', playMusic);
        }).catch(err => {
            console.log('Autoplay blocked, waiting for interaction:', err);
            hasTriedAutoplay = false; // Reset to try again on interaction
        });
    }

    // Try to autoplay immediately after page loads
    setTimeout(() => {
        playMusic();
    }, 100);

    // Fallback: play on first user interaction (required by browsers)
    document.addEventListener('click', playMusic);
    document.addEventListener('touchstart', playMusic);
    document.addEventListener('scroll', playMusic);
    document.addEventListener('keydown', playMusic);

    musicBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent autoplay trigger
        if (isPlaying) {
            audio.pause();
            musicBtn.classList.add('paused');
            isPlaying = false;
        } else {
            audio.play().then(() => {
                musicBtn.classList.remove('paused');
                isPlaying = true;
            }).catch(err => {
                console.log('Audio play failed:', err);
            });
        }
    });
}

// Utility Functions
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return 'Hôm nay';
    } else if (diffDays === 1) {
        return 'Hôm qua';
    } else if (diffDays < 7) {
        return `${diffDays} ngày trước`;
    } else {
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add floating animation to ornaments
const ornaments = document.querySelectorAll('.ornament-top, .ornament-bottom');
ornaments.forEach((ornament, index) => {
    ornament.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
});

// Console Easter Egg
console.log('%c💒 Chúc mừng đám cưới! 💒', 'font-size: 24px; color: #d4a5a5; font-weight: bold;');
console.log('%cĐược thiết kế với ❤️', 'font-size: 14px; color: #c08a8a;');
