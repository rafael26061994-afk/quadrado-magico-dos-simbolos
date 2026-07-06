// Banco de dados de emojis para parecerem símbolos mágicos
const symbolsDatabase = ['🔮', '✨', '🌟', '⚡', '💎', '👑', '🚀', '🍀', '🔥', '🌈', '🛸', '👻', '🎭', '🎨', '🦁', '🐉', '🐬', '☀️', '🌙', '💀'];

let winningSymbol = '';

// Função para iniciar e gerar a tabela
function generateTable() {
    const grid = document.getElementById('symbols-grid');
    grid.innerHTML = ''; // Limpa a tabela anterior

    // 1. Sorteia o símbolo vencedor da rodada
    const randomIdx = Math.floor(Math.random() * symbolsDatabase.length);
    winningSymbol = symbolsDatabase[randomIdx];

    // 2. Cria uma lista de símbolos secundários excluindo o vencedor
    const secondarySymbols = symbolsDatabase.filter(sym => sym !== winningSymbol);

    // 3. Gera os números de 0 a 99
    for (let i = 0; i < 100; i++) {
        let currentSymbol = '';

        // Se for múltiplo de 9 (e menor/igual a 90, que são os resultados possíveis)
        // Colocamos de 0 a 99 por segurança e para camuflar ainda melhor o padrão visual
        if (i % 9 === 0 && i > 0 && i < 91) {
            currentSymbol = winningSymbol;
        } else {
            // Símbolo completamente aleatório para os outros números
            const randSecIdx = Math.floor(Math.random() * secondarySymbols.length);
            currentSymbol = secondarySymbols[randSecIdx];
        }

        // Monta o elemento HTML do item da tabela
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `<span class="num">${i}</span><span class="sym">${currentSymbol}</span>`;
        grid.appendChild(item);
    }
}

// Controle de Navegação das Telas
function showTableScreen() {
    generateTable(); // Garante que a tabela muda a cada jogo
    document.getElementById('screen-instructions').classList.add('hidden');
    document.getElementById('screen-table').classList.remove('hidden');
}

function revealMind() {
    document.getElementById('screen-table').classList.add('hidden');
    
    // Insere o símbolo vencedor na tela final
    const finalSymbolDiv = document.getElementById('final-symbol');
    finalSymbolDiv.textContent = winningSymbol;
    
    document.getElementById('screen-reveal').classList.remove('hidden');
}

function resetGame() {
    document.getElementById('screen-reveal').classList.add('hidden');
    document.getElementById('screen-instructions').classList.remove('hidden');
}