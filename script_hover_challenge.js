
const gridContainer = document.querySelector('.grid-container');
const scenarioDisplay = document.getElementById('scenario-display');
const counter = document.getElementById('counter');
const congratsMessage = document.getElementById('congrats-message');
const failureMessage = document.getElementById('message');
const retryButton = document.getElementById('retry-button');
let hoverCount = 0;

const scenarios = [
    { name: "Περιττές Θέσεις", positions: [1, 3, 5, 7, 9, 11] },
    { name: "Άρτιες Θέσεις", positions: [2, 4, 6, 8, 10, 12] },
    { name: "Θέσεις Πρώτων Αριθμών", positions: [1, 2, 3, 5, 7, 11] }
];

const selectedScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
scenarioDisplay.textContent = `Επιλεγμένο Σενάριο: ${selectedScenario.name}`;

for (let i = 1; i <= 12; i++) {
    const shapeElement = document.createElement('div');
    shapeElement.classList.add('shape');
    
    if (selectedScenario.positions.includes(i)) {
        shapeElement.classList.add('hoverable');
        shapeElement.dataset.correct = 'true';
    }

    shapeElement.addEventListener('mouseenter', handleHover);
    gridContainer.appendChild(shapeElement);
}

function handleHover(event) {
    const element = event.target;
    if (element.dataset.correct === 'true') {
        if (!element.classList.contains('hovered')) {
            element.classList.add('hovered');
            hoverCount++;
            updateCounter();
            checkCompletion();
        }
    } else {
        showFailureMessage();
    }
}

function updateCounter() {
    counter.textContent = `Hover: ${hoverCount}/${selectedScenario.positions.length}`;
}

function checkCompletion() {
    const totalHoverables = selectedScenario.positions.length;
    if (hoverCount === totalHoverables) {
        showCongratsMessage();
    }
}

function showCongratsMessage() {
    congratsMessage.classList.remove('hidden');
    congratsMessage.classList.add('show');
}

function showFailureMessage() {
    failureMessage.classList.remove('hidden');
    failureMessage.classList.add('show');
    showCorrectElements();

    setTimeout(() => {
        failureMessage.classList.remove('show');
    }, 3000);
}

function showCorrectElements() {
    document.querySelectorAll('[data-correct="true"]').forEach(el => {
        el.classList.add('highlight-correct');
    });
}

retryButton.addEventListener('click', () => {
    location.reload();
});

const instructionsButton = document.getElementById('instructions-button');
const instructionsDiv = document.getElementById('instructions');

instructionsButton.addEventListener('click', () => {
    if (instructionsDiv.classList.contains('hidden')) {
        instructionsDiv.classList.remove('hidden');
    } else {
        instructionsDiv.classList.add('hidden');
    }
});
