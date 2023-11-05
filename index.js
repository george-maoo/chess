const root = document.getElementById("root");

const boardDisplay = document.createElement("div");
boardDisplay.setAttribute("id", "chess-board");

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const button = document.createElement("button");
    button.setAttribute("id", "board-tile");
    button.row = i;
    button.column = j;
    button.addEventListener("click", () =>
      console.log(`${button.row} ${button.column}`)
    );
    boardDisplay.appendChild(button);
  }
}

root.appendChild(boardDisplay);
