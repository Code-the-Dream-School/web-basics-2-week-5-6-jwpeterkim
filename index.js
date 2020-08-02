//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, you have to create the board for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file
//First ask the players for their names (use propmt)
//Now each time the turn player clicks on any cell of the opponent's board (you have to verify if the player is clicking the right board) the program needs to verify if there is an opponent's ship in that cell. If it is then the opponent has one less ship
//We want you to store the data of each player in two Player objects. Each object has to store: name, remaining boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. Numbers 1 are representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. We want to see the information of each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
//one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'. the reset button has to start the game again and the new game create a new game with new players and a new random board.

//to do: 1. show lives 2. conditional for taking turns 3. conditional for strike
// 4. announcing the winner and ending the game 5. explaning the game 6. hide ships from browser

//1. turn display changes only after both players play each round for the first time 2. Stop the game after winner is announced 3. putting reset and new buttons side by side/reset the game
let player1 = {
  name: prompt("Type in your name"),
  shipCount: 0,
  lives: 4,
  playing: true,
  board: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};
let player2 = {
  name: prompt("Type in your name"),
  shipCount: 0,
  lives: 4,
  playing: false,
  board: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};

const battleShip = (id, player, opponent) => {
  const board = document.getElementById(`board_player${id}`);

  const player1Name = document.querySelector("#name_player1");
  const player2Name = document.querySelector("#name_player2");
  const turn = document.querySelector("#turn_player");
  const player_lives = document.querySelector(`#ships_player${id}`);

  player_lives.textContent = player.lives;
  player1Name.textContent = player1.name;
  player2Name.textContent = player2.name;
  turn.innerHTML = player1.name;

  //generate random numbers between 0 and 3
  while (player.shipCount < 4) {
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);
    if (player.board[x][y] == 0) {
      player.board[x][y] = 1;
      player.shipCount++;
    } else {
      continue;
    }
  }

  for (var x = 0; x < 4; x++) {
    const li = document.createElement("li"); // creating childs for the list (board), in this case represent a row number 'x' of the board

    for (var y = 0; y < 4; y++) {
      let cell = document.createElement("div");
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}: ${player.board[x][y]}`; // saves the coordinates as a string value 'x,y'
      cell.value = player.board[x][y]; //state of the cell
      cell.x = x;
      cell.y = y;

      //this function adds the click event to each cell
      cell.addEventListener("click", (e) => {
        if (player.playing) {
          return;
        }

        let cell = e.target; // get the element clicked
        console.log(cell.textContent); //display the coordinates in the console
        //cell.style.visibility = "hidden"; // this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens

        // cell.style.background = "purple"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes

        //strike opponent's ships
        if (e.target.value == 1) {
          cell.style.visibility = "hidden";
          player.shipCount--;
          player.lives--;
          alert("You hit a ship!");
        } else if (e.target.value == 0) {
          cell.style.background = "purple";
          alert("It's a miss!");
        }

        let updatedLives = document.querySelector(`#ships_player${id}`);
        updatedLives.textContent = player.lives;

        //taking turns
        player.playing = true;
        opponent.playing = false;

        const turn = document.querySelector("#turn_player");
        turn.innerHTML = opponent.name;

        console.log(e.target.value);

        //display the winner
        if (player1.lives == 0 && player2.lives > 0) {
          alert(`${player2.name} you won the game!`);
          alert("Loading a new game.");
          location.reload();
          return `The winner is...${player2.name}!`;
        } else if (player2.lives == 0 && player1.lives > 0) {
          alert(`${player1.name} you won the game!`);
          alert("Loading a new game.");
          location.reload();
          return `The winner is...${player1.name}!`;
        }
      });

      li.appendChild(cell); //adding each cell into the row number x
    }

    board.appendChild(li); //adding each row into the board
  }
  //reset and new buttons
  const reset = document.querySelector("#button1");
  reset.className = "button";
  reset.textContent = "Reset";
  reset.addEventListener("click", (e) => {});
  const newGame = document.querySelector("#button2");
  newGame.className = "button";
  newGame.textContent = "New Game";
  newGame.addEventListener("click", (e) => {
    location.reload();
  });
};
battleShip(1, player1, player2);
battleShip(2, player2, player1);
