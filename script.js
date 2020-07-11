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
// let grid = [];

// for (var i = 0; i < rows; ++i) {
// 	const arrayRow = new Array(cols).fill(0);
// 	grid.push(arrayRow);
// }





// DIRECTION NOT UPDATING PROPERLY. LOOKS SUPER BUGGY


const changeDir = (event) => {
	switch(event.keyCode) {
		case 38: return 'u'; break; 
		case 40: return 'd'; break;
		case 37: return 'l'; break;
		case 39: return 'r'; break;
	};
}
document.addEventListener('keydown', (event) => (dir = changeDir(event)));


const showSnake = (x, y, dir) => {
	snakeEl.left = ((x%rows)*cellWidth) + 'px';
	snakeEl.top = ((y%cols)*cellHeight) + 'px';
}

printf(snakeEl);
const updateGrid = () => {
	showSnake(x, y);
	switch (dir) {
		case ('u'): --y;
		case ('d'): ++y;
		case ('l'): --x;
		case ('r'): ++x;
	}
	printf(dir);
}

const getNewFoodLocation = () => {
	foodEl.left = Math.floor(Math.random() * rows) * cellWidth + 'px';
	foodEl.top = Math.floor(Math.random() * cols) * cellHeight + 'px';
}

// setInterval(updateGrid, 50);


