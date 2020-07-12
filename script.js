/***  
	directions: 
		up: 	(0,-1)
		down: (0,1)
		left: (-1,0)
		right: (1,0)
***/


const printf = args => console.log(args);


const gridEl = document.getElementById('grid');
const foodEl = document.getElementById('food').style;
const snakeEl = document.getElementById('snake').style;
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


const showSnake = (x, y) => {
	snakeEl.left = (x*cellWidth) + 'px';
	snakeEl.top = (y*cellHeight) + 'px';
}

const updateGrid = () => {
	switch (dir) {
		case 'u': { y -= 1; break; }
		case 'l': { x -= 1; break; }
		case 'd': { y += 1; break; }
		case 'r': { x += 1; break; }
	}
	x = x < 0 ? (x + rows)%rows : x%rows;
	y = y < 0 ? (y + cols)%cols : y%cols;
	showSnake(x, y);
	if ((snakeEl.left == foodEl.left) && (snakeEl.top == foodEl.top)) {
		getNewFoodLocation();
	}
	printf([[snakeEl.left, snakeEl.top], [foodEl.left, foodEl.top], dir]);
}

const getNewFoodLocation = () => {
	foodEl.left = Math.floor(Math.random() * rows) * cellWidth + 'px';
	foodEl.top = Math.floor(Math.random() * cols) * cellHeight + 'px';
}

getNewFoodLocation();
setInterval(updateGrid, 100);


