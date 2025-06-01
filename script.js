// Document object model Variables

const buttons = document.getElementsByClassName("btn"); // Alle speelknoppen (bijv. 42 knoppen, 6 rijen x 7 kolommen)
const reset = document.getElementById("reset-btn"); // Reset-knop
const playerType = document.getElementById("player-type"); // Spelersweergave ("speler - 1" of "speler - 2")

// Game Flow Variables

let playerNumber = 1;
const filledGrid = [];
let filledCells = 0;

// Vul het bord met -1 (6 rijen x 7 kolommen)
for (let i = 0; i < 6; i++) {
  filledGrid.push([-1, -1, -1, -1, -1, -1, -1]);
}

// Event Listener voor reset
reset.addEventListener("click", function () {
  resetBoard();
});

// Event Listeners voor alle knoppen
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    // buttonNo is van vorm "btn-nummer" bijv. btn-13
    const buttonNo = this.classList[1];
    const flatIndex = parseInt(buttonNo.slice(4)) - 1; // Maak het 0-based
    const col = flatIndex % 7;

    makeMove(col);
  });
}

// Zet een steen in de juiste cel binnen een kolom
function makeMove(col) {
  // Zoek de onderste lege rij in deze kolom
  for (let row = 5; row >= 0; row--) {
    if (filledGrid[row][col] === -1) {
      // Update array
      filledGrid[row][col] = playerNumber;
      filledCells++;

      // Zoek de juiste knop in de flat array (row * 7 + col)
      const index = row * 7 + col;
      const button = buttons[index];

      // Voeg juiste klasse toe
      button.classList.add(playerNumber === 1 ? "btn-player-1" : "btn-player-2");

      // Zet knop op disabled
      button.disabled = true;

      // Wissel speler
      playerNumber = playerNumber === 1 ? 2 : 1;
      playerType.textContent = "Player - " + playerNumber;

      return;
    }
  }
}

// Reset het bord
function resetBoard() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
    buttons[i].classList.remove("btn-player-1", "btn-player-2");
  }

  playerNumber = 1;
  playerType.textContent = "Player - 1";
  filledCells = 0;

  // Reset array
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      filledGrid[i][j] = -1;
    }
  }
}

