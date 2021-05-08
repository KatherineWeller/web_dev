var colors = [
	"rgb(100, 100, 100)",
	"rgb(0, 100, 100)",
	"rgb(100, 0, 100)",
	"rgb(100, 100, 0)",
	"rgb(0, 0, 255)",
	"rgb(255, 100, 0)"
	]

var colors = generateRandomColors(6);

var squares = document.querySelectorAll(".square");
var winningColor = randomWinningColor();
var colorDisp = document.getElementById("winningColorDisp");
var messageDisp = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");

colorDisp.textContent = winningColor;

resetButton.addEventListener("click", function(){
	//generate all new colors
	colors = generateRandomColors(6);
	//pick a new random color from array
	winningColor = randomWinningColor();
	colorDisp.textContent = winningColor;
	//change the colors of the squares on the page
	for(var i = 0; i < squares.length; i++){
		//add initial colors to squares
		squares[i].style.backgroundColor = colors[i];
	}
	resetButton.textContent = "New Colors";
	h1.style.backgroundColor = "#232323";
	messageDisp.textContent = "";
})


for(var i = 0; i < squares.length; i++){
	//add initial colors to squares
	squares[i].style.backgroundColor = colors[i];

	//add click listeners to squares
	squares[i].addEventListener("click", function(){
		//grab color of picked square
		var clickedColor = this.style.backgroundColor;
		//comapre color to winningColor
		if(clickedColor === winningColor){
			messageDisp.textContent = "Correct!"
			h1.style.backgroundColor = winningColor;
			resetButton.textContent = "Play Again?"
			changeColors(winningColor);
		} else {
			this.style.backgroundColor = "#23232323";
		}
	})
}

function changeColors(color){
	//loop through all squares 
	for(var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function randomWinningColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//make an array
	var arr = []
	//add num random colors to array
	for(var i = 0; i < num; i++){
		arr.push(generateSingleRandomColor())
	}
	//return that array
	return arr;
}

function generateSingleRandomColor() {
	//pick a "red" from 0 - 255
	var red = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	var green = Math.floor(Math.random() * 256);
	//pick and "blue" from 0 - 255
	var blue = Math.floor(Math.random() * 256);

	return "rgb(" + red + ", " + green + ", " +  blue +")";
}