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

function player(){
    if(turn % 2 === 0 ){
      console.log('hello')
      return "X"
    } else {
      return "O"
    }
}

function updateState(clickedSquare){
  // var hello = player();
  $('clickedSquare').text(player())
}

function setMessage(msgString){
  $('div#message').text(msgString)
}

function checkWinner(){
  var board = [];
  for(i=0;i<9;i++){
    console.log(i)
    debugger;
    board[i] = $(`td#${i}`).val()
  }
  for(var el of winCombo){
    console.log(el)
    debugger;
    if(board[el[0]] === board[el[1]] && board[el[1]]=== board[el[2]] && board[el[1]]==="X" || board[el[1]]==="O"){
    setMessage(`Player ${board[el[0]]} won!`)
    return true
  }
  }

}
