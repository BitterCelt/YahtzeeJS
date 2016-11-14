// declare variables
var button = [];
var boardX, boardY, boardW, boardH;
var boardL, boardR, boardT, boardB;
var turn = 0;
var rolledDice = [];
var s;
var r;
var startBool = false;
var infoWindow = false;
var opac = 0;

//define variables and set up canvas
function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	textAlign(CENTER);
	textFont("Arial");
	s = new Start();
	r = new Roll();

	for (var i = 0; i < 5; i++) {
		button[i] = new Button();
		button[i].t = i + 1;
		button[i].x = ((i + 1) / 6)*windowWidth;
	}

	for (var i = 0; i < 5; i++) {
		rolledDice[i] = new DiceDraw();
		rolledDice[i].x = ((i + 1) / 6)*windowWidth;
	}
	frameRate(255);
}
// draw the board, background, etc
function draw() {
	createCanvas(windowWidth, windowHeight);
	textFont("Arial");
	
	background(0,0,100);
	
	board();

	stroke(0);
	s.draw();
	for (var i = 0; i < 5; i++) {
		button[i].draw();
	}
	//draws dice rolling if startBool (which is what I used as an on/off switch for the Start button is true)
	if (startBool) {
		for (var i = 0; i < 5; i++) {
			rolledDice[i].x = ((i + 1) / 6)*windowWidth;
			rolledDice[i].roll();
			rolledDice[i].draw();
		}
	//leaves the dice there, also should roll with Roll.press()?
	}
	for (var i = 0; i < 5; i++) {
		rolledDice[i].x = ((i + 1) / 6)*windowWidth;
	}
	r.draw();

	//draws 5 numbered buttons
	for (var i = 0; i < 5; i++) {
		button[i].x = ((i + 1) / 6)*windowWidth;
		// 	rolledDice[i].roll();
		// }
		rolledDice[i].draw();
	}
	
	if (turn<4) {
		text(turn, windowWidth/2, windowHeight*3/4);
	} else {
		text("3", windowWidth/2, windowHeight*3/4);
	}

	info();
}
//drawing the board
function board() {
	boardX = windowWidth/2;
	boardY = windowHeight/3;
	boardW = windowWidth*4/5;
	boardH = windowHeight*3/5;
	boardL = boardX - boardW/2;
	boardR = boardX + boardW/2;
	boardT = boardY - boardH/2;
	boardB = boardY + boardH/2;
	fill(0,100,0);
	rect(boardX, boardY, boardW, boardH);
	stroke(0, 50, 0);
	strokeWeight(3);
	for (var i = 1; i < 5; i++) {
		line(boardX - boardW/2 + boardW * i/5, boardT, boardX - boardW/2 + boardW * i/5, boardB);
	}
}
//5 of these, supposed to be dice selectors
function Button() {
	this.on = false;
	this.c = color(255, 0, 0);
	this.draw = function() {
		this.x;
		this.y = windowHeight - windowHeight / 8;
		this.w;
		this.h;
		this.ts;
		
		if (windowHeight > windowWidth) {
			this.w = windowWidth/10;
			this.ts = windowWidth/20;
			this.h = this.w;
		} else {
			this.w = windowHeight/10;
			this.ts = windowHeight/20;
			this.h = this.w;
		}
		this.t;
		fill(this.c);
		rect(this.x, this.y, this.w, this.h)
		fill(255);
		textAlign(CENTER);
		textSize(this.ts);
		text(this.t, this.x, this.y);
	}
	this.press = function() {
		if(mouseX < this.x + this.w/2 && mouseX > this.x - this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2 && this.on == false) {
			this.c = color(100, 0, 0);
			this.on = true;
		} else if(mouseX < this.x + this.w/2 && mouseX > this.x - this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2 && this.on == true) {
			this.c = color(255, 0, 0);
			this.on = false;
		}

	}
	this.release = function() {
		if(mouseX < this.x + this.w/2 && mouseX > this.x - this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2 || this.on == true) {
			this.c = color(255, 0, 0);
			this.on = false;
		}
	}
}

function Start() {
	this.x = windowWidth/3;
	this.y = windowHeight * 3/4;
	this.c = color(255, 0, 0);
	if (windowHeight > windowWidth) {
		this.w = windowWidth/5;
		this.ts = windowWidth/20;
		this.h = windowHeight/10;
	} else {
		this.w = windowHeight/5;
		this.ts = windowHeight/20;
		this.h = windowHeight/10;
	}
	this.press = function() {
		if(mouseX < this.x + this.w/2 && mouseX > this.x - this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2) {
			this.c = color(100, 0, 0);
			for (var i = 0; i < 5; i++) {
				button[i].on = false;
				button[i].c = color(255, 0, 0);
				rolledDice[i].x = ((i + 1) / 6)*windowWidth;
				rolledDice[i].draw();
				startBool = true;
			}
			turn = 1;
		}
	}
	if(mouseX < this.x + this.w/2 && mouseX > this.x - this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2) {
		cursor(HAND);
	} else {
		cursor(ARROW);
	}
	this.t = "START";
	this.draw = function() {
		this.x = windowWidth/3;
		this.y = windowHeight * 3/4;
		if (windowHeight > windowWidth) {
			this.w = windowWidth/5;
			this.ts = windowWidth/20;
			this.h = windowHeight/10;
		} else {
			this.w = windowHeight/5;
			this.ts = windowHeight/20;
			this.h = windowHeight/10;
		}
		fill(this.c);
		rect(this.x, this.y, this.w, this.h)
		fill(255);
		textAlign(CENTER);
		textSize(this.ts);
		text(this.t, this.x, this.y);
		if(mouseX < this.x + this.w/2 && mouseX > this.x - this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2) {
			cursor(HAND);
		} else {
			cursor(ARROW);
		}
	}
}

function Roll() {
	this.x = windowWidth* 2/3;
	this.y = windowHeight * 3/4;
	this.c = color(255, 0, 0);
	this.p;
	if (windowHeight > windowWidth) {
		this.w = windowWidth/5;
		this.ts = windowWidth/20;
		this.h = windowHeight/10;
	} else {
		this.w = windowHeight/5;
		this.ts = windowHeight/20;
		this.h = windowHeight/10;
	}
	this.t = "ROLL";
	this.press = function() {
		if (mouseX < this.x + this.w/2 && mouseX > this.x - this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2) {

			this.p = true
			this.c = color(100, 0, 0);
			if (turn < 3) {
				for (var i = 0; i < 5; i++) {
					if (button[i].on == true) {
						rolledDice[i].x = ((i + 1) / 6)*windowWidth;
						rolledDice[i].roll();
						button[i].c = color(255, 0, 0);
					}
				}
			}
			if (turn < 4) {
				turn++;
			}

			
		}
	}
	this.release = function() {
		if ((mouseX < this.x + this.w/2 && mouseX > this.x - this.w/2 && mouseY > this.y - this.h/2 && mouseY < this.y + this.h/2)||this.p == true) {
			if (turn <= 4) {
				for (var i = 0; i < 5; i++) {
					button[i].on = false;
					button[i].c = color(255, 0, 0);
				}
			}
			this.p = false;
		}
	}
	this.draw = function() {
		this.x = windowWidth* 2/3;
		this.y = windowHeight * 3/4;
		if (windowHeight > windowWidth) {
			this.w = windowWidth/5;
			this.ts = windowWidth/20;
			this.h = windowHeight/10;
		} else {
			this.w = windowHeight/5;
			this.ts = windowHeight/20;
			this.h = windowHeight/10;
		}
		fill(this.c);
		rect(this.x, this.y, this.w, this.h)
		fill(255);
		textAlign(CENTER);
		textSize(this.ts);
		text(this.t, this.x, this.y);
	}
}
//rolledDice
function DiceDraw() {
	this.x;
	this.y = boardY;

	this.dice = function() {
		this.w;
		this.h;
		if (windowHeight > windowWidth) {
				this.w = windowWidth/10;
				this.h = this.w;
			} else {
				this.w = windowHeight/10;
				this.h = this.w;
			}
		fill(255,0,0);
		rect(this.x, this.y, this.w, this.h, this.w/10);
		fill(255);
	}

	this.die1 = function() {
		this.y = boardY;
		this.dice();
		ellipse(this.x, this.y, this.w/5, this.h/5);
	}

	this.die2 = function() {
		// this.x;
		this.y = boardY;
		this.dice();
		ellipse(this.x + this.w/4, this.y + this.h/4, this.w/5, this.h/5);
		ellipse(this.x - this.w/4, this.y - this.h/4, this.w/5, this.h/5);
	}

	this.die3 = function() {
		// this.x;
		this.y = boardY;
		this.dice();
		ellipse(this.x, this.y, this.w/5, this.h/5);
		ellipse(this.x + this.w/4, this.y + this.h/4, this.w/5, this.h/5);
		ellipse(this.x - this.w/4, this.y - this.h/4, this.w/5, this.h/5);
	}

	this.die4 = function() {
		// this.x;
		this.y = boardY;
		this.dice();
		ellipse(this.x + this.w/4, this.y + this.h/4, this.w/5, this.h/5);
		ellipse(this.x - this.w/4, this.y - this.h/4, this.w/5, this.h/5);
		ellipse(this.x + this.w/4, this.y - this.h/4, this.w/5, this.h/5);
		ellipse(this.x - this.w/4, this.y + this.h/4, this.w/5, this.h/5);
	}

	this.die5 = function() {
		// this.x;
		this.y = boardY;
		this.dice();
		ellipse(this.x + this.w/4, this.y + this.h/4, this.w/5, this.h/5);
		ellipse(this.x - this.w/4, this.y - this.h/4, this.w/5, this.h/5);
		ellipse(this.x + this.w/4, this.y - this.h/4, this.w/5, this.h/5);
		ellipse(this.x - this.w/4, this.y + this.h/4, this.w/5, this.h/5);
		ellipse(this.x, this.y, this.w/5, this.h/5);
	}

	this.die6 = function() {
		// this.x;
		this.y = boardY;
		this.dice();
		ellipse(this.x + this.w/4, this.y + this.h/4, this.w/5, this.h/5);
		ellipse(this.x - this.w/4, this.y - this.h/4, this.w/5, this.h/5);
		ellipse(this.x + this.w/4, this.y - this.h/4, this.w/5, this.h/5);
		ellipse(this.x - this.w/4, this.y + this.h/4, this.w/5, this.h/5);
		ellipse(this.x + this.w/4, this.y, this.w/5, this.h/5);
		ellipse(this.x - this.w/4, this.y, this.w/5, this.h/5);
	}

	this.roll = function() {
		this.rand = parseInt(random(1,7));
	}
	
	this.draw = function() {
		if (this.rand == 1) {
			this.die1();
		} else if (this.rand == 2) {
			this.die2();
		} else if (this.rand == 3) {
			this.die3();
		} else if (this.rand == 4) {
			this.die4();
		} else if (this.rand == 5) {
			this.die5();
		} else if (this.rand == 6) {
			this.die6();
		}
	}
}

function mousePressed() {
	s.press();
	if (turn > 0 && turn < 3) {
		for (var i = 0; i < 5; i++) {
			button[i].press();
		}
	}

	r.press();
}

function mouseReleased() {
	startBool = false;
	r.release();
	s.c = color(255, 0, 0);
	r.c = color(255, 0, 0);	
}

function info() {
	this.c = color(255, 0, 0);
	this.x = windowWidth - windowWidth/60;
	this.y = 0 + windowWidth/60;
	this.w = windowWidth/30;
	this.h = this.w;
	if (mouseX < windowWidth && mouseX > windowWidth - this.w && mouseY > 0 && mouseY < 0 + this.h) {
		this.c = color(100, 0, 0);
		if (opac < 17) {
			opac++;
		}
	} else {
		if (opac > 0) {
			opac--;
		}
	}
	if (opac > 0) {
		infoWindow = true;
	} else {
		infoWindow = false;
	}
	fill(this.c);
	rect(this.x, this.y, this.w, this.h);
	textFont("Times New Roman");
	textAlign(CENTER);
	fill(255);
	text("i", this.x, this.y + windowHeight/100);
	if (infoWindow) {
		textFont("Arial");
		fill(0, sq(opac));
		strokeWeight(0);
		rect(boardX, boardY, boardW, boardH);
		fill(255, sq(opac));
		text("Yahtzee!\nThe game where you aim to get\nall 5 dice the same face up!\nYou get 3 rolls, including the first\nPress Start for the first roll\nFor the second and third rolls\nclick the button under the die\nand then press Roll\nYou win if you get 5 of a kind", boardX, boardT+windowHeight/20);
	}
}