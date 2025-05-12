const teams = [
    "Ferrari", "Mercedes", "Red Bull", "McLaren", "Williams",
    "Renault", "Alpine", "AlphaTauri", "Aston Martin", "Sauber"
];

const drivers = {
    "Sebastian Vettel": ["Ferrari", "Red Bull", "Aston Martin"],
    "Lewis Hamilton": ["Mercedes", "McLaren"],
    "Fernando Alonso": ["Renault", "Ferrari", "McLaren", "Alpine", "Aston Martin"],
    "Valtteri Bottas": ["Mercedes", "Williams", "Sauber"],
    "Daniel Ricciardo": ["Red Bull", "Renault", "McLaren", "AlphaTauri"],
    "Carlos Sainz": ["Toro Rosso", "Renault", "McLaren", "Ferrari"],
    "Pierre Gasly": ["Toro Rosso", "Red Bull", "AlphaTauri", "Alpine"],
    "Kimi Räikkönen": ["Ferrari", "Sauber", "Lotus", "Alfa Romeo", "McLaren"],
    "George Russell": ["Mercedes", "Williams"],
    "Lance Stroll": ["Aston Martin", "Williams", "Racing Point"],
    // Add more drivers here
};

let xTeams = [];
let yTeams = [];
let selectedCell = null;

// Get all .box elements
const boxes = document.querySelectorAll('.box');
const searchInput = document.querySelector('.search');

// Identify box elements
const topRowBoxes = document.querySelectorAll('.top-row .box');
const yAxisBoxes = document.querySelectorAll('.y-axis .box');
const gridBoxes = document.querySelectorAll('.box-container .box');

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function newGame() {
    // Reset
    xTeams = shuffle(teams).slice(0, 3);
    yTeams = shuffle(teams).slice(3, 6);
    selectedCell = null;
    searchInput.value = "";

    // Set x-axis labels
    topRowBoxes.forEach((box, i) => {
        box.textContent = i === 0 ? "" : xTeams[i - 1];
    });

    // Set y-axis labels
    yAxisBoxes.forEach((box, i) => {
        box.textContent = yTeams[i];
    });

    // Clear all grid guesses
    gridBoxes.forEach(box => {
        box.textContent = "";
        box.style.backgroundColor = "white";
        box.onclick = () => selectCell(box);
    });
}

function selectCell(box) {
    gridBoxes.forEach(b => b.style.border = "1px solid black");
    box.style.border = "3px solid red";
    selectedCell = box;
}

function submitGuess() {
    const guess = searchInput.value.trim();
    if (!selectedCell || !guess) {
        alert("Please select a cell and enter a driver name.");
        return;
    }

    const index = Array.from(gridBoxes).indexOf(selectedCell);
    const row = Math.floor(index / 3);
    const col = index % 3;

    const teamY = yTeams[row];
    const teamX = xTeams[col];

    const validTeams = drivers[guess];
    if (validTeams && validTeams.includes(teamX) && validTeams.includes(teamY)) {
        selectedCell.textContent = guess;
        selectedCell.style.backgroundColor = "#a6f0a6";
        selectedCell.onclick = null; // prevent re-selection
    } else {
        alert(`${guess} has not driven for both ${teamX} and ${teamY}.`);
    }

    searchInput.value = "";
    selectedCell.style.border = "1px solid black";
    selectedCell = null;
}

// Initialize game on load
window.onload = newGame;
