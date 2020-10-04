var p1_button = document.getElementById("p1_button");
var p2_button = document.getElementById("p2_button");
var res_button = document.getElementById("reset_button");
var score_limit = document.getElementById("score_cap");
var announcement = document.getElementById("who_won");

var p1_score = p2_score = 0;
var gameOver = false;
var score_cap = 5;

var score1 = document.getElementById("score1");
var score2 = document.getElementById("score2");
var score_cap_disp = document.getElementById("score_cap_disp");

score_limit.addEventListener("input", function(){
	reset();
	score_cap = this.value;
	score_cap_disp.textContent = score_cap;
})

p1_button.addEventListener("click", function(){
	if(!gameOver){
		p1_score++;
		if(p1_score == score_cap){
			gameOver = true;
			score1.style.color = "green";
			announcement.textContent = "Player 1 Won!";
		}
		score1.textContent = p1_score;
	}
})

p2_button.addEventListener("click", function(){
	if(!gameOver){
		p2_score++;
		if(p2_score == score_cap){
			gameOver = true;
			score2.style.color = "green";
			announcement.textContent = "Player 2 Won!";
		}
		score2.textContent = p2_score;
	}
})

res_button.addEventListener("click", function(){
	reset();
})

function reset(){
	p1_score = p2_score = 0;
	score1.textContent = p1_score;
	score2.textContent = p2_score;
	announcement.textContent = "";
	score1.style.color = score2.style.color = "black";
	gameOver = false;
}
