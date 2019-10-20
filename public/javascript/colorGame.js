var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll('.square');
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.mode');

resetButton.addEventListener('click', reset);

init();

function init() {
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener('click', function() {
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			this.classList.add('selected');
			// if this.textConetent === "Easy" numsquares becomes 3 else it becomes 6
			this.textContent === 'Easy' ? (numSquares = 3) : (numSquares = 6);
			reset();
		});
	}
}

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
		//add click listeners to squares
		squares[i].addEventListener('click', function() {
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to pickedColor
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = 'Correct!';
				resetButton.textContent = 'Play Again?';
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = '#232323';
				messageDisplay.textContent = 'Try Again';
			}
		});
	}
}

function reset() {
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = 'New Colors';
	messageDisplay.textContent = '';
	//change colors of squares
	for (var i = 0; i < squares.length; i++) {
		//if there is a color
		if (colors[i]) {
			//style.display = "block" shows the square (when the game is difficult)
			squares[i].style.display = 'block';
			squares[i].style.backgroundColor = colors[i];
		} else {
			//style.display = "block" hides the square (when the game is easy)
			squares[i].style.display = 'none';
		}
	}
	h1.style.backgroundColor = 'steelblue';
}

function changeColors(color) {
	//loop through all squares
	for (var i = 0; i < squares.length; i++) {
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	//this function ill be called to decide which is the winning color and it's either colors[1] or [2]...
	//math.random will give a decimal between (0 and 0.99) and math.floor wil remove the decimal part
	var random = Math.floor(Math.random() * colors.length);
	//depending on the difficulty of the game we will have a number betwenn 0 and 2 or between 0 and 5 just to access the table colors
	return colors[random];
}

function generateRandomColors(num) {
	//this function will make an array of colors and to each index add an rgb color using the randomColor function
	//make an array
	var arr = [];
	//repeat num times
	for (var i = 0; i < num; i++) {
		//get random rgb color and push into arr
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor() {
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256);
	//we need this format "rgb(r, g, b,)"
	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}