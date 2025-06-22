let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('.reset-btn');
let newGameBtn = document.querySelector('.new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let counter = 0;

let turn0 = true; // Player 1 starts

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const resetGame = () => {
    turn0 = true; // Reset turn to Player 1
    enableBoxes();
    msgContainer.classList.add('hide');
    counter = 0; // Reset counter
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0){
            box.innerText = "O";
            box.style.color = '#7D5BA6';
            turn0 = false;
        }else{
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkWin();
        counter++;
        if(counter === 9 && msgContainer.classList.contains('hide')) {
            msg.innerText = "It's a draw!";
            msgContainer.classList.remove('hide');
            disableBoxes();
        }
    })
});

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = ""; // Clear the text
    });
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! ${winner} wins!`;
    msgContainer.classList.remove('hide');
    disableBoxes();
}

const checkWin = () => {
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
            }
        }
    }
}

newGameBtn.addEventListener("click", () => resetGame());
resetBtn.addEventListener("click", () => resetGame());