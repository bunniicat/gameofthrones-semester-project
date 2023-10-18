let diceValue;

let yourMatch = sessionStorage.getItem('yourMatch');

const playerOne = {
  tile: 1,
  playerTurn: true,
  playerToken: 'resources/chars/7.svg',
  tokenId: 1, //token id is used to identify the correct div for innerHTML clear upon moving characters
  playerName: 'Jon Snow',
};

const playerTwo = {
  tile: 1,
  playerTurn: false,
  playerToken: 'resources/chars/unmatch.svg',
  tokenId: 2, //token id is used to identify the correct div for innerHTML clear upon moving characters
  playerName: 'Unmatch',
};

//creates 30 tiles with an unique id, i = 1
function theBoard() {
  for (i = 1; i < 31; i++) {
    document.getElementById(
      'board-wrapper'
    ).innerHTML += `<div id="tile${i}" class="board-tile"><p class="board-tile-number">Tile ${i}</p>
        </div>`;
  }
  document.getElementById('tile10').classList.add('trap');
  document.getElementById('tile22').classList.add('trap');
  document.getElementById('tile16').classList.add('trap');
  document.getElementById('tile18').classList.add('trap');
  document.getElementById('tile25').classList.add('trap');
}

//used in traps switch function
function remove(elem) {
  elem.parentElement.removeChild(elem);
}

theBoard();

//by use of unique tile id places player tokens in tile !wrapped in divs with unique token for correct innerHTML clear
function placeToken() {
  document.getElementById(
    `tile${playerOne.tile}`
  ).innerHTML += `<div id="token1${playerOne.tile}" class="bounceIn"> <img src="${playerOne.playerToken}" alt="player token"> </div>`;
  document.getElementById(
    `tile${playerTwo.tile}`
  ).innerHTML += `<div id="token2${playerTwo.tile}" class="bounceIn"> <img src="${playerTwo.playerToken}" alt="player token"> </div>`;
  document.getElementById(
    'tile30'
  ).innerHTML += `<div class="match-tile"> <img src="resources/chars/${yourMatch}.svg"> </div>`;
}

placeToken();

const roll = document.querySelector('#roll');

roll.addEventListener('click', () => {
  diceValue = Math.ceil(Math.random() * 6);

  if (playerOne.playerTurn === true) {
    movePlayers(playerOne, playerOne.tokenId);
    updateBar(playerOne.tile);
    traps(playerOne);
    displayRoll(playerOne);
    if (diceValue != 6) {
      playerOne.playerTurn = false;
    }
  } else {
    movePlayers(playerTwo, playerTwo.tokenId);
    updateBarUnmatch(playerTwo.tile);
    displayRoll(playerTwo);
    if (diceValue != 6) {
      playerOne.playerTurn = true;
    }
  }
});

//moves the players, takes in two parameters = player obj, unique token id
function movePlayers(player, tokenid) {
  let elem = document.getElementById(`token${tokenid}${player.tile}`);
  elem.parentElement.removeChild(elem); //takes elems parent element and removes the child
  player.tile = player.tile + diceValue;
  goal(player);
  document.getElementById(
    `tile${player.tile}`
  ).innerHTML += `<div id="token${tokenid}${player.tile}" class="bounceIn"> <img src="${player.playerToken}" alt="player token">  </div>`;
}

function displayRoll(player) {
  document.getElementById('displayRoll').innerHTML = '';
  if (diceValue != 6) {
    document.getElementById('displayRoll').innerHTML += `<p>${player.playerName} rolled a ${diceValue}!</p>`;
  } else {
    document.getElementById(
      'displayRoll'
    ).innerHTML += `<p>${player.playerName} rolled a 6, ${player.playerName} gets to roll again!</p>`;
  }
}

//is only called for player one aka jon snow, either helps jon snow or adds progress towards unmatch
function traps(player) {
  switch (player.tile) {
    case 10:
      swal({
        title: 'OUCH: SEEN',
        text: 'Poor Jon Snow, they left him on seen.. his match is 5 steps closer to unmatching him and he need to step up his game.',
        imageUrl: 'traps/seen.png',
        imageWidth: 500,
        imageHeight: 150,
        showCancelButton: false,
        confirmButtonText: 'FML',
        confirmButtonColor: '#f68f9d',
      });
      remove(document.getElementById(`token2${playerTwo.tile}`));
      playerTwo.tile = playerTwo.tile += 5;
      document.getElementById(
        `tile${playerTwo.tile}`
      ).innerHTML += `<div id="token2${playerTwo.tile}" class="bounceIn"> <img src="${playerTwo.playerToken}">  </div>`;
      updateBarUnmatch(playerTwo.tile);
      goal(playerOne);
      goal(playerTwo);
      break;
    case 22:
      swal({
        title: 'HEARTHTHROB: COOL TITLE',
        text: 'Good job Jon Snow, flashing that title for what its worth, he impressed his match! He is 2 steps closer to finding the love of his life.',
        imageUrl: 'traps/title.png',
        imageWidth: 500,
        imageHeight: 200,
        showCancelButton: false,
        confirmButtonText: 'GUCCI',
        confirmButtonColor: '#f68f9d',
      });
      remove(document.getElementById(`token1${playerOne.tile}`));
      playerOne.tile = playerOne.tile += 2;
      document.getElementById(
        `tile${playerOne.tile}`
      ).innerHTML += `<div id="token1${playerOne.tile}" class="bounceIn"> <img src="${playerOne.playerToken}">  </div>`;
      goal(playerOne);
      goal(playerTwo);
      break;
    case 16:
      swal({
        title: 'OUCH: THE EX',
        text: 'Too bad Jon Snow, this moves his match 4 steps closer to unmatching him.',
        imageUrl: 'traps/ex.jpg',
        imageWidth: 500,
        imageHeight: 150,
        showCancelButton: false,
        confirmButtonText: 'FML',
        confirmButtonColor: '#f68f9d',
      });
      remove(document.getElementById(`token2${playerTwo.tile}`));
      playerTwo.tile = playerTwo.tile += 4;
      document.getElementById(
        `tile${playerTwo.tile}`
      ).innerHTML += `<div id="token2${playerTwo.tile}" class="bounceIn"> <img src="${playerTwo.playerToken}"> </div>`;
      updateBarUnmatch(playerTwo.tile);
      goal(playerOne);
      goal(playerTwo);
      break;
    case 18:
      swal({
        title: 'HEARTHTHROB: FUNNY LINES',
        text: 'Jon Snow made his match laugh with his witty lines, he moves up 3 tiles!',
        imageUrl: 'traps/funny.jpg',
        imageWidth: 500,
        imageHeight: 200,
        showCancelButton: false,
        confirmButtonText: 'GUCCI',
        confirmButtonColor: '#f68f9d',
      });
      remove(document.getElementById(`token1${playerOne.tile}`));
      playerOne.tile = playerOne.tile += 3;
      document.getElementById(
        `tile${playerOne.tile}`
      ).innerHTML += `<div id="token1${playerOne.tile}" class="bounceIn"> <img src="${playerOne.playerToken}">  </div>`;
      goal(playerOne);
      goal(playerTwo);
      break;
    case 25:
      swal({
        title: 'OUCH: OVERSHARING',
        text: "Ops, maybe he should keep his parental issues to himself, his match ain't no shrink. His match moves 4 steps closer to unmatching him.",
        imageUrl: 'traps/bastard.jpg',
        imageWidth: 500,
        imageHeight: 270,
        showCancelButton: false,
        confirmButtonText: 'FML',
        confirmButtonColor: '#f68f9d',
      });
      remove(document.getElementById(`token2${playerTwo.tile}`));
      playerTwo.tile = playerTwo.tile += 4;
      document.getElementById(
        `tile${playerTwo.tile}`
      ).innerHTML += `<div id="token2${playerTwo.tile}" class="bounceIn"> <img src="${playerTwo.playerToken}">  </div>`;
      updateBarUnmatch(playerTwo.tile);
      goal(playerOne);
      goal(playerTwo);
      break;
  }
}

function announceResult() {
  if ('winner' in sessionStorage) {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
    let winnerName = sessionStorage.getItem('winner');
    let winnerAvatar = sessionStorage.getItem('winnerToken');
    document.getElementById(
      'winner'
    ).innerHTML += `<div class="winnerAnnouncement">Congratulations, ${winnerName}!</div>
        <div class="winnerToken"><img src="${winnerAvatar}" width="180"> <img src="resources/symbols/like.svg" width="150"> <img src="resources/chars/${yourMatch}.svg" width="180"></div>
        <div class="winnerDescription"><p>Jon Snow managed to woo his match, true love starts with a swipe to the right!</p></div>
        <div class="playAgainBtn"><a href="index.html"><button onclick="playAgain()">Play again</button></a></div>`;
  }
  if ('loser' in sessionStorage) {
    console.log('you lost');
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
    let loserAvatar = sessionStorage.getItem('loserToken');
    document.getElementById('winner').innerHTML += `<div class="winnerAnnouncement">Jon Snow got unmatched, ouch!</div>
        <div class="winnerToken"><img src="${loserAvatar}" width="180"></div>
        <div class="winnerDescription"><p>The potential love of his life decided he just was not the thing for them. After ghosting him they just unmatched his sorry ass.</p></div>
        <div class="playAgainBtn"><a href="index.html"><button onclick="playAgain()">Play again</button></a></div>`;
  }
}

function goal(player) {
  if (player.tile >= 30) {
    player.tile = 30;
    if (playerOne.tile === 30) {
      sessionStorage.setItem('winner', player.playerName);
      sessionStorage.setItem('winnerToken', player.playerToken);
    }
    if (playerTwo.tile === 30) {
      sessionStorage.setItem('loser', player.playerName);
      sessionStorage.setItem('loserToken', player.playerToken);
    }
    announceResult();
  }
}

function playAgain() {
  sessionStorage.clear();
}

function updateBar(tile) {
  var mathWidth = tile * 3.33;
  var elem = document.getElementById('myBar');
  var displayProgress = document.getElementById('barProgress');
  elem.style.width = mathWidth + '%';
  var roundWidth = Math.ceil(mathWidth);
  displayProgress.innerHTML = '';
  displayProgress.innerHTML += `<p>Love Meter Match Progress: ${roundWidth}%</p>`;
}

function updateBarUnmatch(tile) {
  var mathWidth = tile * 3.33;
  var elem = document.getElementById('myBarUnmatch');
  var displayProgress = document.getElementById('barProgressUnmatch');
  elem.style.width = mathWidth + '%';
  var roundWidth = Math.ceil(mathWidth);
  displayProgress.innerHTML = '';
  displayProgress.innerHTML += `<p>Unmatch Meter Progress: ${roundWidth}%</p>`;
}

function instruct() {
  const popup = document.getElementById('instructions');
  popup.classList.remove('hide');
  popup.classList.add('show');
  if (popup.classList.contains('show')) {
    window.onclick = function (event) {
      if (event.target == popup) {
        popup.classList.add('hide');
        popup.classList.remove('show');
      }
    };
  }
}

function closePop() {
  const popup = document.getElementById('instructions');
  popup.classList.add('hide');
  popup.classList.remove('show');
}

function closeQuest() {
  const popup = document.getElementById('secretQ');
  popup.classList.add('hide');
  popup.classList.remove('show');
  remove(document.getElementById('treasureChest')); //dels the elem
}

document.getElementById('instr-btn').addEventListener('click', instruct);
document.getElementById('closeX').addEventListener('click', closePop);

function getQ() {
  const popup = document.getElementById('secretQ');
  popup.classList.remove('hide');
  popup.classList.add('show');
  if (popup.classList.contains('show')) {
    window.onclick = function (event) {
      if (event.target == popup) {
        popup.classList.add('hide');
        popup.classList.remove('show');
      }
    };
  }
  setTimeout(closeQuest, 15000);
}

function validateAnswer() {
  event.preventDefault();
  let inputDays = document.getElementById('numbDays').value;
  let inputHours = document.getElementById('numbHours').value;
  let inputMins = document.getElementById('numbMins').value;
  if (inputDays == 2 && inputHours == 22 && inputMins == 14) {
    remove(document.getElementById(`token1${playerOne.tile}`));
    playerOne.tile = playerOne.tile += 5;
    document.getElementById(
      `tile${playerOne.tile}`
    ).innerHTML += `<div id="token1${playerOne.tile}" class="bounceIn"> <img src="${playerOne.playerToken}">  </div>`;
    document.getElementById('resultQuestion').innerHTML += `<p>You aced it, move forward 5 tiles!</p>`;
    updateBar(playerOne.tile);
    setTimeout(closeQuest, 2000);
  } else {
    document.getElementById('resultQuestion').innerHTML += `<p>You know nothing.</p>`;
    setTimeout(closeQuest, 2000);
  }
}

document.getElementById('treasureChest').addEventListener('click', getQ);
document.getElementById('closeQ').addEventListener('click', closeQuest);
document.getElementById('submitAnswer').addEventListener('click', validateAnswer);

setTimeout(instruct, 1000);
