const symbolsDatabase = ['🔮', '✨', '🌟', '⚡', '💎', '👑', '🚀', '🍀', '🔥', '🌈', '🛸', '👻', '🎭', '🎨', '🦁', '🐉', '🐬', '☀️', '🌙', '💀'];
let winningSymbol = '';
let currentFontSize = 100;

function generateTable() {
    const grid = document.getElementById('symbols-grid');
    grid.innerHTML = '';
    const randomIdx = Math.floor(Math.random() * symbolsDatabase.length);
    winningSymbol = symbolsDatabase[randomIdx];
    const secondarySymbols = symbolsDatabase.filter(s => s !== winningSymbol);

    for (let i = 0; i < 100; i++) {
        const sym = (i % 9 === 0 && i > 0 && i < 91) ? winningSymbol : secondarySymbols[Math.floor(Math.random() * secondarySymbols.length)];
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `<span class="num">${i}</span><span class="sym">${sym}</span>`;
        grid.appendChild(div);
    }
}

// LÓGICA DE ALTERNAR A ORDEM DOS MATEMÁTICOS
function randomizeMagicians() {
    const instImg = document.getElementById('instructions-magician');
    const revImg = document.getElementById('reveal-magician');
    
    // Atenção extra à capitalização aqui!
    const magicians = [
        { src: 'rafael.png', alt: 'Rafael' }, 
        { src: 'ronaldo.png', alt: 'Ronaldo' }
    ];

    if (Math.random() > 0.5) {
        magicians.reverse();
    }

    if (instImg) {
        instImg.src = magicians[0].src;
        instImg.alt = magicians[0].alt;
    }
    if (revImg) {
        revImg.src = magicians[1].src;
        revImg.alt = magicians[1].alt;
    }
}

function showTableScreen() {
    stopSpeech();
    generateTable();
    document.getElementById('screen-instructions').classList.add('hidden');
    document.getElementById('screen-table').classList.remove('hidden');
}

function goBackToInstructions() {
    stopSpeech();
    document.getElementById('screen-table').classList.add('hidden');
    document.getElementById('screen-instructions').classList.remove('hidden');
}

function revealMind() {
    stopSpeech();
    document.getElementById('screen-table').classList.add('hidden');
    document.getElementById('final-symbol').textContent = winningSymbol;
    document.getElementById('screen-reveal').classList.remove('hidden');
}

function resetGame() {
    stopSpeech();
    randomizeMagicians(); 
    document.getElementById('screen-reveal').classList.add('hidden');
    document.getElementById('screen-instructions').classList.remove('hidden');
}

// ACESSIBILIDADE
function changeFontSize(dir) {
    currentFontSize += (dir * 10);
    if (currentFontSize < 80) currentFontSize = 80;
    if (currentFontSize > 150) currentFontSize = 150;
    document.body.style.fontSize = currentFontSize + "%";
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

function readText() {
    stopSpeech();
    const activeScreen = document.querySelector('.screen:not(.hidden)');
    const textToRead = activeScreen.innerText;
    
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
    window.speechSynthesis.cancel();
}

// EVENTO CORRIGIDO: Não interfere mais com o VLibras!
document.addEventListener("DOMContentLoaded", function() {
    randomizeMagicians();
});
