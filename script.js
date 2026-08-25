// Get DOM elements
const envelopeWrapper = document.getElementById('envelopeWrapper');
const envelope = document.querySelector('.envelope');
const envelopeFlap = document.querySelector('.envelope-flap');
const heartContainer = document.getElementById('heartContainer');
const arrow = document.getElementById('arrow');
const letter = document.getElementById('letter');
const catReveal = document.getElementById('catReveal');
const closeBtn = document.getElementById('closeBtn');

let isOpening = false;

// ========== ENVELOPE CLICK HANDLER ==========
envelopeWrapper.addEventListener('click', openEnvelope);

function openEnvelope() {
    if (isOpening) return; // Prevent multiple clicks
    isOpening = true;

    // Add opened class to envelope
    envelope.classList.add('opened');

    // Trigger heart animation
    triggerHeartShoot();

    // Trigger arrow animation
    triggerArrowShoot();

    // Show letter after a short delay
    setTimeout(() => {
        letter.classList.add('show');
    }, 300);

    // Reveal cat after animations complete
    setTimeout(() => {
        revealCat();
    }, 1500);
}

// ========== HEART SHOOT ANIMATION ==========
function triggerHeartShoot() {
    const heart = heartContainer.querySelector('.heart');
    heart.classList.remove('heart-shoot'); // Reset animation
    
    // Trigger reflow to restart animation
    void heart.offsetWidth;
    
    heart.classList.add('heart-shoot');
}

// ========== ARROW SHOOT ANIMATION ==========
function triggerArrowShoot() {
    arrow.classList.remove('arrow-shoot'); // Reset animation
    
    // Trigger reflow to restart animation
    void arrow.offsetWidth;
    
    arrow.classList.add('arrow-shoot');
}

// ========== CAT REVEAL ==========
function revealCat() {
    catReveal.classList.add('show');
}

// ========== CLOSE BUTTON ==========
closeBtn.addEventListener('click', closeCatReveal);

function closeCatReveal() {
    catReveal.classList.remove('show');
    
    // Reset everything for another interaction
    setTimeout(() => {
        resetEnvelope();
    }, 300);
}

// ========== RESET ENVELOPE ==========
function resetEnvelope() {
    envelope.classList.remove('opened');
    letter.classList.remove('show');
    heartContainer.querySelector('.heart').classList.remove('heart-shoot');
    arrow.classList.remove('arrow-shoot');
    isOpening = false;
}

// ========== TOUCH SUPPORT FOR MOBILE ==========
document.addEventListener('touchstart', function(e) {
    if (envelopeWrapper.contains(e.target)) {
        openEnvelope();
    }
}, { passive: true });

// ========== PUPIL TRACKING ON MOUSE MOVE (OPTIONAL) ==========
document.addEventListener('mousemove', function(e) {
    const pupils = document.querySelectorAll('.pupil');
    pupils.forEach(pupil => {
        const eye = pupil.parentElement;
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const distance = 6;

        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px)) scaleY(1)`;
    });
});

// ========== PREVENT PUPIL TRACKING ON MOBILE ==========
if (window.innerWidth <= 768) {
    document.removeEventListener('mousemove', arguments.callee);
}
