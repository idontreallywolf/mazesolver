// TODO: load maze from .txt file instead

const tileColor = ["#1e272e", "#808e9b", "#05c46b", "#353b48"];
const tileSize = 16;
let brush = 1;
const tiles = [];
let endPoints = [];
let canvas;
let ctx;

function run(){
	render();

	window.requestAnimationFrame(run);
}

function render(){
	if(canvas !== null){
		ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	}
	for (let i = 0; i < tiles.length; i++) {
		for (let j = 0; j < tiles[0].length; j++) {
			ctx.fillStyle = tiles[i][j].getColor();
			ctx.fillRect(tiles[i][j].x, tiles[i][j].y, tiles[i][j].width, tiles[i][j].height);
			tiles[i][j].drawEdges(ctx);
		}
	}

}


function prepareTiles(canvas){

	let canvasCols = canvas.clientWidth/tileSize;
	let canvasRows = canvas.clientHeight/tileSize;

	for (let i = 0; i < canvasRows; i++) {
		let row = new Array();
		for (let j = 0; j < canvasCols; j++) {
			row.push(new Tile(j, i, 0));
		}
		tiles.push(row);
	}
}

window.addEventListener('load', function(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	prepareTiles(canvas);

	this.tileSize = tileSize;
	this.tiles = tiles;
	this.endPoints = endPoints;

	this.leftMouseDown = false;
	this.brush = brush;

	this.offsetY = canvas.offsetTop;
	this.offsetX = canvas.offsetLeft;

	// Detect right click
	canvas.addEventListener('contextmenu', function(e){
		/*e.preventDefault();
		if(endPoints.length == 2){
			return;
		}

		for (let i = 0; i < tiles.length; i++) {
			for (let j = 0; j < tiles[0].length; j++) {
				if((e.clientX-offsetX >= (tiles[i][j].x) && e.clientX-offsetX <= (tiles[i][j].x + tileSize))
				&& (e.clientY-offsetY >= (tiles[i][j].y) && e.clientY-offsetY <= (tiles[i][j].y + tileSize))){
					tiles[i][j].setMode(2);
					endPoints.push([i, j]);
				}
			}
		}*/

	});

	registerEvent('saveMaze', 'click', function(){

		/* Canvas Donwload */
		let download = function(filename) {
			/// create an "off-screen" anchor tag
			var lnk = document.createElement('a'), e;

			/// the key here is to set the download attribute of the a tag
			lnk.download = filename;

			/// convert canvas content to data-uri for link. When download
			/// attribute is set the content pointed to by link will be
			/// pushed as "download" in HTML5 capable browsers
			lnk.href = canvas.toDataURL("image/png;base64");

			/// create a "fake" click-event to trigger the download
			if (document.createEvent) {
				e = document.createEvent("MouseEvents");
				e.initMouseEvent("click", true, true, window,
				0, 0, 0, 0, 0, false, false, false,
				false, 0, null);

				lnk.dispatchEvent(e);
			} else if (lnk.fireEvent) {
				lnk.fireEvent("onclick");
			}
		}

		download('maze.png');


	});

	registerEvent('resetEndPoints', 'click', function(e){
		for (let i = 0; i < endPoints.length; i++) {
			tiles[endPoints[i][0]][endPoints[i][1]].setMode(0);
		}
		endPoints = [];
	});

	// TODO: Avoid repeating code, try combining "resetEndPoints" with "clearMaze"
	registerEvent("clearMaze", "click", function(e){
		for (let i = 0; i < tiles.length; i++) {
			for (let j = 0; j < tiles[0].length; j++) {
				tiles[i][j].setMode(0);
				tiles[i][j].reset();
			}
		}

		endPoints = [];
	});
/*
	registerEvent('loadMaze', 'click', function(evt){
		let fileToLoad = document.getElementById("fileToLoad").files[0];
		let fr = new FileReader();

		fr.onload = function(e){
			endPoints = [];

			let maze = JSON.parse(e.target.result);

			for (let i = 0; i < maze.length; i++) {
				for (let j = 0; j < maze[i].length; j++) {
					tiles[i][j].setMode((maze[i][j].mode == 3 ? 0:maze[i][j].mode));
					tiles[i][j].edges = maze[i][j].edges;

					if(parseInt(maze[i][j].mode) == enums.MODE_DESTINATION_NODE){
						endPoints.push([i, j]);
					}
				}
			}

		}

		fr.readAsText(fileToLoad, "UTF-8");
		evt.preventDefault();
	});
*/

	registerEvent('genMaze', 'click', function(e){
		for (let i = 0; i < tiles.length; i++) {
			for (let j = 0; j < tiles[0].length; j++) {
				tiles[i][j].setVisited(false);
				tiles[i][j].setMode(0);
				tiles[i][j].reset();
			}
		}
		generateMaze(tiles);
		for (let i = 0; i < tiles.length; i++) {
			for (let j = 0; j < tiles[0].length; j++) {
				tiles[i][j].setVisited(false);
			}
		}
		genStack = [];
	});

	registerEvent('findPath', 'click', function(e){
		BFS(tiles, endPoints);
	});


	canvas.addEventListener("mousedown", function (e) {
		if(e.which == 1){
			leftMouseDown = true;

			if(endPoints.length == 2){
				return;
			}

			let i = Math.floor((e.clientY-offsetY)/tileSize);
			let j = Math.floor((e.clientX-offsetX)/tileSize);
			tiles[i][j].setMode(2);
			endPoints.push([i, j]);
		}
	});
/*
	canvas.addEventListener("mouseup", function (e) {
		if(e.which == 1){
			leftMouseDown = false;
		}
	});

	canvas.addEventListener("mousemove", function (e) {
    	if(leftMouseDown === true){
			tiles[Math.floor((e.clientY-offsetY)/tileSize)][Math.floor((e.clientX-offsetX)/tileSize)].setMode(brush);
		}
	});
*/

	run();
});

/**
	@param elementID - #ID of targeted HTML element
	@param eventID - JavaScript event to be registered. e.g: 'click' or 'load'
**/

function registerEvent(elementID, eventID, callback){
	if(Array.isArray(elementID) === true){
		for (let i = 0; i < elementID.length; i++) {
			document.getElementById(elementID[i]).addEventListener(eventID, function(e){
				callback(e);
			});
		}
		return;
	}

	document.getElementById(elementID).addEventListener(eventID, function(e){
		callback(e);
	});
}
