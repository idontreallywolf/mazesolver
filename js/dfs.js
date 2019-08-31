/*

	// TODO: Complete nextNode function
	// make sure to look for obstacles

*/

// active nodes
let stack = [];

function searchPath(tiles, endPoints){
	// When stack is empty
	// initialize by appending start point to the stack
	if(stack.length == 0){
		stack.push(endPoints[0]);

		// mark as visited
		tiles[endPoints[0][0]][endPoints[0][1]].setVisited(true);
	}

	// look for free nodes (left, right, up or down)
	let freeNode = nextNode(tiles, stack[stack.length-1]);

	// If there's a free node...
	if(freeNode !== false){

		// if we came across endPoint, we can return true
		if(moveToNext(freeNode, stack[stack.length-1]) === true){
			console.log("Destination reached");
			setPath(stack);
			return true;
		}

		// whenever we cant find a path, call new searchPath
		if(searchPath(tiles, endPoints) === false){
			return searchPath(tiles, endPoints);
		} else {
			return true;
		}

	} else {
		stack.pop();
		return false;
	}

}

function setPath(stack){
	console.log(stack);
	for (var i = 0; i < stack.length; i++) {
		tiles[stack[i][0]][stack[i][1]].setMode(enums.MODE_PATH);
	}
}

function moveToNext(freeNode, currentNode){
	if(freeNode == 'left'){
		stack.push([currentNode[0], currentNode[1]-1]);
		tiles[currentNode[0]][currentNode[1]-1].setVisited(true);
	} else if(freeNode == 'right'){
		stack.push([currentNode[0], currentNode[1]+1]);
		tiles[currentNode[0]][currentNode[1]+1].setVisited(true);
	} else if(freeNode == 'up'){
		stack.push([currentNode[0]-1, currentNode[1]]);
		tiles[currentNode[0]-1][currentNode[1]].setVisited(true);
	} else if(freeNode == 'down'){
		stack.push([currentNode[0]+1, currentNode[1]]);
		tiles[currentNode[0]+1][currentNode[1]].setVisited(true);
	}

	let lastNode = stack[stack.length-1];
	if(tiles[lastNode[0]][lastNode[1]].getMode() == enums.MODE_DESTINATION_NODE){
		return true;
	} else {
		return false;
	}
}

function nextNode(tiles, currentNode){
	let left = right = up = down = false;

	// LEFT
	// avoid outOfBounds error
	if(currentNode[1] > 0){
		if((tiles[currentNode[0]][currentNode[1]-1].getMode() != enums.MODE_BLOCK)
		&& (tiles[currentNode[0]][currentNode[1]-1].isVisited() === false)){
			left = true;
		}
	}

	// RIGHT
	// avoid outOfBounds error
	if(currentNode[1] < tiles[0].length-1){
		if((tiles[currentNode[0]][currentNode[1]+1].getMode() != enums.MODE_BLOCK)
		&& (tiles[currentNode[0]][currentNode[1]+1].isVisited() === false)){
			right = true;
		}
	}

	// UP
	// avoid outOfBounds error
	if(currentNode[0] > 0){
		if((tiles[currentNode[0]-1][currentNode[1]].getMode() != enums.MODE_BLOCK)
		&& (tiles[currentNode[0]-1][currentNode[1]].isVisited() === false)) {
			up = true;
		}
	}

	// DOWN
	// avoid outOfBounds error
	if(currentNode[0] < tiles.length-1){
		if((tiles[currentNode[0]+1][currentNode[1]].getMode() != enums.MODE_BLOCK)
		&& (tiles[currentNode[0]+1][currentNode[1]].isVisited() === false)){
			down = true;
		}
	}


	return (left === true ? 'left':
				(right === true ? 'right':
						(up === true ? 'up':
							(down === true ? 'down':false)
						)
				)
			);
}
