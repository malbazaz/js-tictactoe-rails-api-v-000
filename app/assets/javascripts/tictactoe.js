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
// function player(){
var player = () =>{
    if(turn % 2===0){
      // console.log('hello')
      // debugger;
      return "X"
    } else {
      return "O"
    }
    // console.log("v2",value)
    // return value;
}

function updateState(clickedSquare){
//   var hello = player();
// // debugger;
// clickedSquare.

$(clickedSquare).text(player())
}

function setMessage(msgString){
  $('div#message').text(msgString)
}

function checkWinner(){
    var board = {};
    var status = false ;
    $('td').text((index,square)=>{ board[index] = square})
    // for(var i=0;i<9;i++){
    //   // console.log(i)
    //   // debugger;
    //   var td_data = $('td').text()[i]
    //   if((td_data ==="X")||(td_data === "O")){
    //     debugger;
    //         board[i] = td_data
    //   }else{
    //         board[i] = ""
    //   }
    //
    // }
      for(var i=0; i < 8; i++){
        // console.log(el)
        // debugger;
        var el = winCombo[i]
        // debugger;
        if(board[el[0]] === board[el[1]] && board[el[1]]=== board[el[2]] && (board[el[1]]==="X" || board[el[1]]==="O")){
          // console.log(`Player ${board[el[0]]} Won!`)
          setMessage(`Player ${board[el[0]]} Won!`)
          // console.log("board1",board)
          // debugger;
          return status = true
        }
        // console.log(status)
        // console.log("board2", board)
        // console.log("i2",board)
        // debugger;
      }
      // console.log("s",status)
      // debugger;
      return status;
}

function doTurn(square){
  // debugger;
  var status = $(square).text()
  // debugger;
  if (status === ""){
    updateState(square);
    turn +=1
  }
  if(checkWinner()){
    postSave()
    turn = 0;
    $('td').empty();
  } else if (turn===9){
      postSave()
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
      // debugger;
      var games = data;
      // debugger;
      if(games.data){
      $("#games").empty();
  games.data.forEach(function(game){
    // debugger;
    // if(!($(`#gameid-${game.id}`))){
    // Check if there is already a GameId
  $('#games').append(`<button id="gameid-${game.id}">${game.id}</button><br>`);
  $(`#gameid-${game.id}`).on('click', () =>{
    $.get(`/games/${game.id}`, function(game){
    gameId = game.id;
    $('td').text(()=>{game})
  })

  })
// }
});
  }

      // $('td').text(game["state"]);
      // $("#games").attr(data);
    });

}

function saveGame(){

  // debugger;

  // $("#games").attr(game["id"]);
  // var values = $(this).serialize();
  // var saving = $.post('/games', values);
  // saving.done(function(data) {
  //       var game = data;
  //
  //       $("#games").attr(game["id"]);
  //       $('td').attr(game["state"]);
  //     });
  var state = [];
  var gameData;
  $('td').text((index, square) => {
    state.push(square);
  });
  gameData = { state: state };

// if previously saved, gameId
  // var values = $(this).serialize();
  if(gameId){
    $.ajax({
        type: 'PATCH',
        url: `/games/${gameId}`,
        data: gameData
      });
    turn = 0;
    $('td').empty();
  } else {
    postSave()
}
// turn = 0;
// $('td').empty();
}

  // var values = $(this).serialize();
  // var saving = $.post('/games', values);
  // saving.done(function(data) {
  //       var game = data;
  //
  //       $("#games").attr(game["id"]);
  //       $('td').attr(game["state"]);
  //     });

var postSave = () =>{
      // debugger;
      var state = [];
      var gameData;
      $('td').text((index, square) => {
        state.push(square);
      });
      gameData = { state: state };
      // var values = $(this).serialize();
      $.post('/games', gameData, function(data){
        // debugger;
        var game = data;
        gameId = parseInt(game["data"]["id"]);
        // debugger;
        // $("#games").attr(gameId);
        $('#games').append(`<button id="gameid-${game.data.id}">${game.data.id}</button><br>`);
        $("#gameid-" + game.data.id).on('click', () =>{ reloadGame(game.data.id)})
        // attempt at reloadGame
        //   $.get(`/games/${game.id}`, function(game){
        // $('td').text(()=>{game})
        // var board = {};
        // $('td').text((index)=>{ board[index] = game[index]})
        // })
      })

    // saving.done(function(data) {
          // gameId = null;
          // turn = 0;
          // $('td').empty();
          // $('td').attr(game["state"]);
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
