// Code your JavaScript / jQuery solution here
var turn = 0;
var gameId = null;
const winCombo = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
  ]

  $(document).ready(function() {
    attachListeners();
  });

  var player = () =>{
      if(turn % 2===0){
        return "X"
      } else {
        return "O"
      }
    }

    function updateState(clickedSquare){
      $(clickedSquare).text(player())
    }

    function setMessage(msgString){
      $('div#message').text(msgString)
    }

function checkWinner(){
    var board = {};
    var status = false ;
    $('td').text((index,square)=>{ board[index] = square})
    for(var i=0; i < 8; i++){
        var el = winCombo[i]
        if(board[el[0]] === board[el[1]] && board[el[1]]=== board[el[2]] && (board[el[1]]==="X" || board[el[1]]==="O")){
          setMessage(`Player ${board[el[0]]} Won!`)
          return status = true
        }
      }
      return status;
}

  function doTurn(square){

    var status = $(square).text()

    if (status === ""){
      updateState(square);
      turn +=1
    }
    if(checkWinner()){
      saveGame()
      turn = 0;
      $('td').empty();
    } else if (turn===9){
        saveGame()
        setMessage("Tie game.")
        turn = 0;
        $('td').empty();
      }

    }

function attachListeners(){
    $('td').on('click', function() {
      if (!checkWinner()) {
        doTurn(this);
      }
    });
    $('#save').on('click', () => saveGame());
    $('#previous').on('click', () => previousGames());
    $('#clear').on('click', () =>{
      turn = 0;
      $('td').empty();
    })
}

  function previousGames(){
    $.get("/games", function(data) {
        var games = data;
        if(games.data){
          $("#games").empty();
          games.data.forEach(function(game){
            $('#games').append(`<button id="gameid-${game.id}">${game.id}</button><br>`);
            $(`#gameid-${game.id}`).on('click', () =>{
              $.get(`/games/${game.id}`, function(game){
                gameId = game.id;
                $('td').text(()=>{game})
              })

            })

          });
        }

      });
    }

    function saveGame() {
      var state = [];
      var gameData;

      $('td').text((index, square) => {
        state.push(square);
      });

      gameData = { state: state };

      if (gameId) {
        $.ajax({
          type: 'PATCH',
          url: `/games/${gameId}`,
          data: gameData
        });
      } else {
        $.post('/games', gameData, function(game) {
          gameId = game.data.id;
          $('#games').append(`<button id="gameid-${game.data.id}">${game.data.id}</button><br>`);
          $("#gameid-" + game.data.id).on('click', () => reloadGame(game.data.id));
        });
      }
    }

function reloadGame(gameID) {
  document.getElementById('message').innerHTML = '';

  const xhr = new XMLHttpRequest;
  xhr.overrideMimeType('application/json');
  xhr.open('GET', `/games/${gameID}`, true);
  xhr.onload = () => {
    const data = JSON.parse(xhr.responseText).data;
    const id = data.id;
    const state = data.attributes.state;

    let index = 0;
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        document.querySelector(`[data-x="${x}"][data-y="${y}"]`).innerHTML = state[index];
        index++;
      }
    }

    turn = state.join('').length;
    currentGame = id;

    if (!checkWinner() && turn === 9) {
      setMessage('Tie game.');
    }
  };

  xhr.send(null);
}
