/***  
	directions: 
		up: 	(0,-1)
		down: (0,1)
		left: (-1,0)
		right: (1,0)
***/


const printf = args => console.log(args);


const gridEl = document.getElementById('Grid');
const foodEl = document.getElementById('Food').style;
const snakeContainer = document.getElementById('Snake');
snakeContainer.innerHTML = '<div id="snake0"></div>'
const snakeEl = document.getElementById('snake0').style;
snakeEl.position = 'absolute';

const cellWidth = 21.33;	// in px
const cellHeight = 21.33; // in px
const rows = Math.floor(gridEl.clientWidth/cellWidth); // 16pt = 21.33 px
const cols = Math.floor(gridEl.clientHeight/cellHeight); // 16pt = 21.33 px

foodEl.width = cellWidth + 'px';
foodEl.height = cellHeight + 'px';
snakeEl.width = cellWidth + 'px';
snakeEl.height = cellHeight + 'px';

let [x, y] = [1, 1];
let dir = 'r';
let totalEaten = 0;
let snakePos = [{  x: 1, y: 1 }];
let foodPos = [{  
	x: Math.floor(Math.random() * rows),
	y: Math.floor(Math.random() * cols)
}]

const changeDir = (event) => {
	switch(event.keyCode) {
		case 38: { return 'u'; break; } 
		case 40: { return 'd'; break; }
		case 37: { return 'l'; break; }
		case 39: { return 'r'; break; }
		default: return dir;
		
	};
}
document.addEventListener('keydown', (event) => (dir = changeDir(event)));
/* 
const updateSnakePos = (newX, newY) => {
	for (let i = 1; i < snakePos.length; ++i) {
		snakePos[i].x = snakePos[i-1].x;
		snakePos[i].y = snakePos[i-1].y;
	}
	snakePos[0].x = newX;
	snakePos[0].y = newY;
	for (let i = 0; i < snakePos.length; ++i) {
		let tempSnake = document.getElementById('snake' + i).style;
		tempSnake.left = (snakePos[i].x * cellWidth) + 'px';
		tempSnake.top = (snakePos[i].y * cellHeight) + 'px';
	}
}
 */

const updateSnake = (dir) => {
	// for (let i = 1; i < snakePos.length; ++i) {
	// 	snakePos[i].x = snakePos[i-1].x;
	// 	snakePos[i].y = snakePos[i-1].y;
	// 	let tempSnake = document.getElementById('snake' + i).style;
	// 	tempSnake.left = (snakePos[i].x * cellWidth) + 'px';
	// 	tempSnake.top = (snakePos[i].y * cellHeight) + 'px';
	// }
	for (let i = snakePos.length - 1; i > 0; --i) {
		snakePos[i].x = snakePos[i-1].x;
		snakePos[i].y = snakePos[i-1].y;
		let tempSnake = document.getElementById('snake' + i).style;
		tempSnake.left = (snakePos[i].x * cellWidth) + 'px';
		tempSnake.top = (snakePos[i].y * cellHeight) + 'px';
	}
	switch (dir) {
		case 'u': { y -= 1; break; }
		case 'l': { x -= 1; break; }
		case 'd': { y += 1; break; }
		case 'r': { x += 1; break; }
	}
	x = x < 0 ? (x + rows)%rows : x%rows;
	y = y < 0 ? (y + cols)%cols : y%cols;
	snakePos[0].x = x;
	snakePos[0].y = y;
	snakeEl.left = x * cellWidth + 'px';
	snakeEl.top = y * cellHeight + 'px';
}


const showSnake = (snakePos) => {
	for (let i = 0; i < snakePos.length; ++i) {
		let tempSnake = document.getElementById('snake' + i).style;
		tempSnake.left = (snakePos[i].x * cellWidth) + 'px';
		tempSnake.top = (snakePos[i].y * cellHeight) + 'px';
	}
}

const getNewFoodLocation = () => {
	foodPos = {  
		x: Math.floor(Math.random() * rows),
		y: Math.floor(Math.random() * cols)
	};
	foodEl.left = foodPos.x * cellWidth + 'px';
	foodEl.top = foodPos.y * cellHeight + 'px';
}

const checkEaten = () => {
	return (snakePos[0].x == foodPos.x) && (snakePos[0].y == foodPos.y);
}

const addSnake = () => {
	// update snakePos
	++totalEaten;
	printf(snakePos);
	snakePos.push({
		x: snakePos[snakePos.length - 1].x -1,
		y: snakePos[snakePos.length - 1].y +1
	})
	// update the DOM
	let newSnake = document.createElement('div');
	printf(newSnake);
	newSnake.id = 'snake' + totalEaten;
	// newSnake.style.position = 'absolute';
	newSnake.style.width = cellWidth + 'px';
	newSnake.style.height = cellHeight + 'px';
	newSnake.style.left = snakeEl.left;
	newSnake.style.top = snakeEl.top;

	snakeContainer.appendChild(newSnake);
	getNewFoodLocation();
}


const updateGrid = () => {
	/* switch (dir) {
		case 'u': { y -= 1; break; }
		case 'l': { x -= 1; break; }
		case 'd': { y += 1; break; }
		case 'r': { x += 1; break; }
	}
	x = x < 0 ? (x + rows)%rows : x%rows;
	y = y < 0 ? (y + cols)%cols : y%cols; 

	updateSnakePos(x, y);
	*/

	updateSnake(dir);
	if (checkEaten()) addSnake(); 

}


getNewFoodLocation();
const fps = 10;
setInterval(updateGrid, 1000/fps);

