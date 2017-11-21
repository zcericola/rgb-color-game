let colors = [];
let numOfSquares = 6;
let pickedColor;
let squares = document.querySelectorAll('.square');
let colorDisplay = document.getElementById('colorDisplay');
let colorChecker = document.getElementById('colorChecker');
const h1 = document.querySelector('h1');
const reset = document.querySelector('#reset');
const modeButtons = document.querySelectorAll('.mode');


init();

function init() {
    //Mode Buttons Event Listener Function    
    setUpModeButtons();
    //Loops through the squares and applies the colors in the colors array
    setUpSquares();
    resetGame();
}

function setUpModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function () {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');
            this.textContent === 'Easy' ? numOfSquares = 3 : numOfSquares = 6;

            resetGame();

        });
    }
}

function setUpSquares() {
    for (var i = 0; i < squares.length; i++) {
        //add initial color to squares
        squares[i].style.backgroundColor = colors[i];
        //add click listeners to squares
        squares[i].addEventListener('click', function () {
            //grab color of clicked square
            const clickedColor = this.style.backgroundColor;

            //compare the clicked square's color with the picked color   
            if (clickedColor === pickedColor) {
                colorChecker.textContent = "That's correct.";
                reset.textContent = 'Play again?';
                colorChange(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = '#232323';
                colorChecker.textContent = "Close, but no cigar.";
            }
        })
    }
}

function resetGame() {
    //generate new colors
    colors = getRandomColors(numOfSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    //change 'Play again?' back to 'New Colors'
    reset.textContent = 'New Colors';
    //reset colorChecker
    colorChecker.textContent = '';
    //change colors of squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = 'none';
        }

    };
    //reset h1 background color to the main background
    h1.style.backgroundColor = 'steelblue';

}


reset.addEventListener('click', function () {
    resetGame();
})




function colorChange(color) {
    //loop through all squares
    for (var i = 0; i < squares.length; i++) {
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    };

};

function pickColor() {
    let randomNum = Math.floor(Math.random() * colors.length);
    return colors[randomNum];

};

function getRandomColors(num) {
    //make an array
    let arr = [];
    //add num random colors to array
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor());
    }
    //return array
    return arr;
}

function randomColor() {
    // pick a 'red' from 0 -255
    let r = Math.floor(Math.random() * 256);
    // pick a 'green' from 0 -255
    let g = Math.floor(Math.random() * 256);
    // pick a 'blue' from 0 -255
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
