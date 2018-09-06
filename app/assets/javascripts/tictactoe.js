// Code your JavaScript / jQuery solution here
var turn = 0;
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
updateState(square);
turn +=1
var tie = () =>{
  if(!checkWinner() && turn===9){
    setMessage("Tie game.")
    return true;
}
}

if(checkWinner()||tie()){
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
$('#previous').on('click', () => showPreviousGames());
$('#clear').on('click', () =>{
  turn = 0;
  $('td').empty();
})
}