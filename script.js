
const printf = args => console.log(args);
const random = (min, max) => {
	return Math.random() * (max - min) + min;
}

const fps = 8;
let gameState = 0;
const initalLength = 5;

const gridEl = document.getElementById('Grid');
const foodEl = document.getElementById('Food').style;
const snakeContainer = document.getElementById('Snake');
const snakeEl = document.getElementById('snake0').style;

const cellWidth = 20;	// in px
const cellHeight = 20; // in px
const rows = Math.floor(gridEl.clientWidth/cellWidth); 
const cols = Math.floor(gridEl.clientHeight/cellHeight); 

foodEl.width = cellWidth + 'px';
foodEl.height = cellHeight + 'px';
snakeEl.width = cellWidth + 'px';
snakeEl.height = cellHeight + 'px';

let [x, y] = [1, 1];
let dir = 'r';
let totalEaten = 0;
let snakeLength = 1;
let snakePos = [{  x: 1, y: 1 }];
let foodPos = [{  
	x: Math.floor(Math.random() * rows),
	y: Math.floor(Math.random() * cols)
}]

const changeDir = (event) => {
	switch(event.keyCode) {
		case 38: { return dir == 'd' ? dir : 'u'; break; } 
		case 40: { return dir == 'u' ? dir : 'd'; break; }
		case 37: { return dir == 'r' ? dir : 'l'; break; }
		case 39: { return dir == 'l' ? dir : 'r'; break; }
		default: return dir;
		
	};
}
document.addEventListener('keydown', (event) => (dir = changeDir(event)));

const updateSnake = (dir) => {
	switch (dir) {
		case 'u': { y -= 1; break; }
		case 'l': { x -= 1; break; }
		case 'd': { y += 1; break; }
		case 'r': { x += 1; break; }
	}
	x = x < 0 ? (x + rows)%rows : x%rows;
	y = y < 0 ? (y + cols)%cols : y%cols;
	
	for (let i = snakePos.length - 1; i > 0; --i) {
		if (snakePos[i].x === x && snakePos[i].y === y) {
			snakeContainer.textContent = '';
		}
		snakePos[i].x = snakePos[i-1].x;
		snakePos[i].y = snakePos[i-1].y;
		let tempSnake = document.getElementById('snake' + i).style;
		tempSnake.left = (snakePos[i].x * cellWidth) + 'px';
		tempSnake.top = (snakePos[i].y * cellHeight) + 'px';
	}

	snakePos[0].x = x;
	snakePos[0].y = y;
	snakeEl.left = x * cellWidth + 'px';
	snakeEl.top = y * cellHeight + 'px';
}

const getNewFoodLocation = () => {
	do {	
		foodPos = {  
			x: Math.floor(Math.random() * rows),
			y: Math.floor(Math.random() * cols)
		};
	} while (snakePos.some((pos) => pos == foodPos));

	foodEl.left = foodPos.x * cellWidth + 'px';
	foodEl.top = foodPos.y * cellHeight + 'px';
}

const checkEaten = () => {
	return (snakePos[0].x == foodPos.x) && (snakePos[0].y == foodPos.y);
}

const hasEaten = () => {
	totalEaten++;
	addSnake();
	getNewFoodLocation();
}

const addSnake = () => {
	// update snakePos
	snakePos.push({
		x: snakePos[snakePos.length - 1].x -1,
		y: snakePos[snakePos.length - 1].y +1
	})

	// update the DOM
	let newSnake = document.createElement('div');
	newSnake.id = 'snake' +  snakeLength;
	newSnake.style.width = cellWidth + 'px';
	newSnake.style.height = cellHeight + 'px';
	newSnake.style.left = snakeEl.left;
	newSnake.style.top = snakeEl.top;
	snakeContainer.appendChild(newSnake);
	snakeLength++;
}

const updateGrid = () => {
	updateSnake(dir);
	if (checkEaten()) hasEaten(); 
}

const toggleGame = (event) => {
	if (event.keyCode === 32)
		gameState = !gameState;
}

const startGame = () => {
	setInterval(updateGrid, 1000/fps);
}

getNewFoodLocation();
for (let i = 0; i < initalLength; ++i) addSnake();
startGame();
