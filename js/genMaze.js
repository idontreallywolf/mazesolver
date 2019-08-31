let genStack = [];
let backtrack = [];

function setPath(stack){
	for (var i = 0; i < stack.length; i++) {
		tiles[stack[i][0]][stack[i][1]].setMode(enums.MODE_PATH);
	}
}

function generateMaze(tiles){

	// initialize
	if(genStack.length == 0){
		genStack.push(tiles[0][0]);
		tiles[0][0].setVisited(true);
	}

	let current = genStack[genStack.length-1];
	let freeNode = getFreeNodes(current.getPos(), tiles);
	if(freeNode !== null){

		// going UP
		if(current.y > freeNode.y){

			current.edges.top = false;
			freeNode.edges.bottom = false;

		// going DOWN
		} else if (current.y < freeNode.y) {

			current.edges.bottom = false;
			freeNode.edges.top = false;
		}

		// going LEFT
		if (current.x > freeNode.x) {

			current.edges.left = false;
			freeNode.edges.right = false;

		// going RIGHT
		} else if (current.x < freeNode.x) {

			current.edges.right = false;
			freeNode.edges.left = false;
		}

		if(generateMaze(tiles) == false){
			return generateMaze(tiles);
		} else {
			return true;
		}


	} else {
		genStack.pop();
		return false;
	}

}

function getFreeNodes(current, tiles){

	// Nodes which are available will be saved here
	let childNodes = [];

	// up, down, left, right
	let dy = [-1, 1, 0, 0];
	let dx = [0, 0, -1, 1];
	let x = current[1];
	let y = current[0];

	for (var i = 0; i < dy.length; i++) {

		// avoid getting out of bounds
		if((y + dy[i] < 0 || x + dx[i] < 0)
		|| (y + dy[i] > tiles.length-1 || x + dx[i] > tiles[0].length-1)){
			continue;
		}

		let childNode = tiles[y + dy[i]][x + dx[i]];

		if( (childNode.isVisited() === false)
		&&  (childNode.getMode() != 1) ){
			childNodes.push(childNode);
		}
	}

	let index = Math.floor(Math.random() * childNodes.length);

	if(childNodes[index] == undefined){
		return null;
	} else {
		childNodes[index].setVisited(true);
		genStack.push(childNodes[index]);
		return childNodes[index]
	}

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
