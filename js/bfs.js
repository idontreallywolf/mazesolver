let backTrack = [];

let queue = [];

function BFS(tiles, endPoints){

	// Append start Point to out queue before starting the search
	if(queue.length == 0){
		queue.push(tiles[endPoints[0][0]][endPoints[0][1]]);
		tiles[endPoints[0][0]][endPoints[0][1]].setVisited(true);
	}

	for (var i = 0; i < queue.length; i++) {
		// Look for child nodes
		let childNodes = getChildrenNodes(tiles, queue[i].getPos());

		// Move on if there were no available child nodes
		if(childNodes === null){
			continue;
		}

		// Append each child node to the queue
		for (var c = 0; c < childNodes.length; c++) {

			// Check if we found destination node
			if(childNodes[c].getMode() == enums.MODE_DESTINATION_NODE){

				// ... in that case backtrack
				// to start point and then break the loop
				backTrackPath(childNodes[c], backTrack);
				break;
			}

			queue.push(childNodes[c]);
		}

	}
	backTrack = [];
	queue = [];
}

/**
	@param currentNode Where the search is currently active
	@return if available, a list of unvisited nodes will be returned. Otherwise null.
**/

function getChildrenNodes(tiles, currentNode){

	// Nodes which are available will be saved here
	let childNodes = [];

	// up, down, left, right
	let dy = [-1, 1, 0, 0];
	let dx = [0, 0, -1, 1];
	let x = currentNode[1];
	let y = currentNode[0];
	let current = tiles[currentNode[0]][currentNode[1]];

	for (var i = 0; i < dy.length; i++) {

		// avoid getting out of bounds
		if((y + dy[i] < 0 || x + dx[i] < 0)
		|| (y + dy[i] > tiles.length-1 || x + dx[i] > tiles[0].length-1)){
			continue;
		}

		let childNode = tiles[y + dy[i]][x + dx[i]];

		// UP
		if(y + dy[i] < y){
			if(childNode.isVisited() === false && childNode.edges.bottom === false && current.edges.top === false){
				childNode.setParent(currentNode);
				childNode.setVisited(true);
				childNodes.push(childNode);
			}
		// DOWN
		} else if(y + dy[i] > y){
			if(childNode.isVisited() === false && childNode.edges.top === false && current.edges.bottom === false){
				childNode.setParent(currentNode);
				childNode.setVisited(true);
				childNodes.push(childNode);
			}
		}


		// LEFT
		if(x + dx[i] < x){
			if(childNode.isVisited() === false && childNode.edges.right === false && current.edges.left === false){
				childNode.setParent(currentNode);
				childNode.setVisited(true);
				childNodes.push(childNode);
			}
		// RIGHT
		} else if(x + dx[i] > x){
			if(childNode.isVisited() === false && childNode.edges.left === false && current.edges.right === false){
				childNode.setParent(currentNode);
				childNode.setVisited(true);
				childNodes.push(childNode);
			}
		}

	}

	return (childNodes.length > 0 ? childNodes : null);
}

/**
	@param node - Takes an object (destination node)
**/
function backTrackPath(node){
	let parent = node.getParent();
	if(parent === null){
		return;
	}

	// setting mode to 3 will allow a path to be displayed
	node.setMode(3);

	// In order to be able to use the algorithm again
	// we have to reset node properties
	node.setParent(null);
	node.setVisited(false);

	// process next node
	backTrackPath(tiles[parent[0]][parent[1]]);
}
