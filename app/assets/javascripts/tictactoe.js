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
// function player(){
  // const player = () =>{
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
  var board = ["","","","","","","","",""];
  var status = false ;
  for(var i=0;i<9;i++){
    // console.log(i)
    // debugger;
    board[i] = $('td').text()[i]
  }

    for(var i=0; i<9; i++){
    // console.log(el)
    // debugger;

    var el = winCombo[i]
   if(board[el[0]] === board[el[1]] && board[el[1]]=== board[el[2]] && board[el[1]]==="X" || board[el[1]]==="O"){
  // console.log(`Player ${board[el[0]]} Won!`)
    setMessage(`Player ${board[el[0]]} Won!`)
    // debugger;
    return status = true
    }
    }
    console.log("s",status)
    debugger;
    return status;
}

function doTurn(clickedSquare){
  turn ++;
  updateState(clickedSquare);
if(checkWinner()){

}

}
