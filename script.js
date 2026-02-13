// Get button elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');

// Initial sizes (in rem for responsiveness)
let yesBtnSize = 1.5;
let noBtnSize = 1.5;
let yesBtnPadding = { vertical: 20, horizontal: 40 };
let noBtnPadding = { vertical: 20, horizontal: 40 };

// Track click count for scaling
let clickCount = 0;

// Handle "No" button click
noBtn.addEventListener('click', function() {
    clickCount++;
    
    // Calculate new sizes
    // Yes button grows exponentially
    yesBtnSize += 0.3 * Math.pow(1.2, clickCount);
    yesBtnPadding.vertical += 5;
    yesBtnPadding.horizontal += 10;
    
    // No button shrinks
    noBtnSize = Math.max(0.5, noBtnSize - 0.2);
    noBtnPadding.vertical = Math.max(5, noBtnPadding.vertical - 3);
    noBtnPadding.horizontal = Math.max(10, noBtnPadding.horizontal - 6);
    
    // Apply new sizes
    yesBtn.style.fontSize = `${yesBtnSize}rem`;
    yesBtn.style.padding = `${yesBtnPadding.vertical}px ${yesBtnPadding.horizontal}px`;
    
    noBtn.style.fontSize = `${noBtnSize}rem`;
    noBtn.style.padding = `${noBtnPadding.vertical}px ${noBtnPadding.horizontal}px`;
    
    // Add shake animation to No button
    noBtn.style.animation = 'none';
    setTimeout(() => {
        noBtn.style.animation = 'shake 0.5s';
    }, 10);
    
    // After several clicks, make yes button cover most of the screen
    if (clickCount >= 5) {
        yesBtn.style.position = 'fixed';
        yesBtn.style.top = '50%';
        yesBtn.style.left = '50%';
        yesBtn.style.transform = 'translate(-50%, -50%)';
        yesBtn.style.width = '80vw';
        yesBtn.style.height = '60vh';
        yesBtn.style.fontSize = '3rem';
        yesBtn.style.zIndex = '999';
    }
    
    // Hide no button if it gets too small
    if (noBtnSize <= 0.6) {
        noBtn.style.opacity = '0.3';
        noBtn.style.pointerEvents = 'none';
    }
});

// Handle "Yes" button click
yesBtn.addEventListener('click', function() {
    celebration.classList.remove('hidden');
    
    // Create floating hearts animation
    createFloatingHearts();
});

// Create floating hearts effect
function createFloatingHearts() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
            heart.style.opacity = '0';
            heart.style.transition = 'all 3s ease-out';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1001';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.style.top = '-10vh';
                heart.style.opacity = '1';
                heart.style.transform = `translateX(${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 360}deg)`;
            }, 100);
            
            setTimeout(() => {
                heart.remove();
            }, 3100);
        }, i * 100);
    }
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
