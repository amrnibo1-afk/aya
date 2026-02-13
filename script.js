// Get button elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionEl = document.querySelector('.question');
const celebration = document.getElementById('celebration');

const loveQuestions = [
    "بتحبيني يا ايه ؟",
    "بجد يعني؟ 😉",
    "قد البحر وسمكاته؟ 🌊",
    "ومش هتزهقي مني خالص؟ 🥺",
    "لو خيروكي بين لولو و انا هتختريني ؟ "
];

let currentQuestionIndex = 0;

const noTexts = [
    "لا؟",
    "متأكدة؟",
    "فكري تاني بس..",
    "لو قلتي لا هزعل 🥺",
    "يا لهوي ليه كدة؟",
    "طب عشان خاطري؟",
    "هعيط والله 😭",
    "لا لا لا مفيش لا!",
    "مش هسيبك تقولي لا 😂"
];

let textIndex = 0;

// Initial sizes (in rem for responsiveness)
let yesBtnSize = 1.5;
let noBtnSize = 1.5;
let yesBtnPadding = { vertical: 20, horizontal: 40 };
let noBtnPadding = { vertical: 20, horizontal: 40 };

// Track click count for scaling
let clickCount = 0;

// Function to move the No button to a random position
function moveButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    
    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.zIndex = '100';
    
    // Change text when it moves
    textIndex = (textIndex + 1) % noTexts.length;
    noBtn.innerText = noTexts[textIndex];
}

// Make the button move away when the mouse gets close
noBtn.addEventListener('mouseover', function() {
    if (clickCount < 10) { // Keep moving until many attempts
        moveButton();
    }
});

// For touch devices
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moveButton();
});

// Handle "No" button click (if they manage to click it)
noBtn.addEventListener('click', function() {
    clickCount++;
    
    // Calculate new sizes
    yesBtnSize += 0.5 * Math.pow(1.15, clickCount);
    yesBtnPadding.vertical += 10;
    yesBtnPadding.horizontal += 20;
    
    noBtnSize = Math.max(0.4, noBtnSize - 0.2);
    noBtnPadding.vertical = Math.max(5, noBtnPadding.vertical - 3);
    noBtnPadding.horizontal = Math.max(10, noBtnPadding.horizontal - 6);
    
    // Apply new sizes
    yesBtn.style.fontSize = `${yesBtnSize}rem`;
    yesBtn.style.padding = `${yesBtnPadding.vertical}px ${yesBtnPadding.horizontal}px`;
    
    noBtn.style.fontSize = `${noBtnSize}rem`;
    noBtn.style.padding = `${noBtnPadding.vertical}px ${noBtnPadding.horizontal}px`;
    
    // Move it even if clicked
    moveButton();
    
    // After several clicks, make yes button cover most of the screen
    if (clickCount >= 6) {
        yesBtn.style.position = 'fixed';
        yesBtn.style.top = '0';
        yesBtn.style.left = '0';
        yesBtn.style.width = '100vw';
        yesBtn.style.height = '100vh';
        yesBtn.style.display = 'flex';
        yesBtn.style.alignItems = 'center';
        yesBtn.style.justifyContent = 'center';
        yesBtn.style.fontSize = '5rem';
        yesBtn.style.zIndex = '1000';
        yesBtn.style.borderRadius = '0';
    }
});

// Handle "Yes" button click
yesBtn.addEventListener('click', function() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < loveQuestions.length) {
        // Move to next question
        questionEl.innerText = loveQuestions[currentQuestionIndex];
        
        // Add a little pop animation to the question
        questionEl.style.animation = 'none';
        setTimeout(() => {
            questionEl.style.animation = 'fadeInDown 0.5s ease-out';
        }, 10);

        // Slightly pulse the yes button to show progress
        yesBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            yesBtn.style.transform = 'scale(1)';
        }, 200);

    } else {
        // Final question answered
        celebration.classList.remove('hidden');
        createFloatingHearts();
    }
});

// Create floating hearts effect
function createFloatingHearts() {
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['❤️', '💖', '✨', '🌹', '💕', '🐱', '🦋'][Math.floor(Math.random() * 7)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
            heart.style.opacity = '0';
            heart.style.transition = 'all 3s ease-out';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '2000';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.style.top = '-10vh';
                heart.style.opacity = '1';
                heart.style.transform = `translateX(${(Math.random() - 0.5) * 300}px) rotate(${Math.random() * 360}deg)`;
            }, 100);
            
            setTimeout(() => {
                heart.remove();
            }, 3100);
        }, i * 80);
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
