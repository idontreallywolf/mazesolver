function Tile(x, y, mode = 0){
	this.x = x * tileSize;
	this.y = y * tileSize;
	this.mode = mode;
	this.color = tileColor[mode];
	this.width = tileSize;
	this.height = tileSize;
	this.visited = false;
	this.parent = null;

	this.edges = {
		left: true,
		right: true,
		top: true,
		bottom: true
	}
}

Tile.prototype.reset = function(){
	this.visited = false;
	this.parent = null;

	this.edges.top = true;
	this.edges.left = true;
	this.edges.bottom = true;
	this.edges.right = true;
}

Tile.prototype.drawEdges = function(ctx){
	ctx.beginPath();

	if(this.edges.top === true){
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + tileSize, this.y);
	}

	if(this.edges.left === true){
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x, this.y + tileSize);
	}

	if(this.edges.bottom === true){
		ctx.moveTo(this.x, this.y  + tileSize);
		ctx.lineTo(this.x + tileSize, this.y  + tileSize);
	}

	if(this.edges.right === true){
		ctx.moveTo(this.x + tileSize, this.y);
		ctx.lineTo(this.x + tileSize, this.y + tileSize);
	}

	ctx.strokeStyle = "#ffa801";
	ctx.stroke();
}

Tile.prototype.getPos = function(){
	return [this.y / tileSize, this.x / tileSize];
}

Tile.prototype.setMode = function (mode) {
	this.mode = mode;
	this.color = tileColor[mode];
}

Tile.prototype.setParent = function(parent){
	this.parent = parent;
}

Tile.prototype.getParent = function(){
	return this.parent;
}

Tile.prototype.getMode = function(){
	return this.mode;
}

Tile.prototype.getColor = function(){
	return this.color;
}

Tile.prototype.setColor = function(newColor){
	this.color = newColor;
}

Tile.prototype.setVisited = function(boolVisited){
	this.visited = boolVisited;
}

Tile.prototype.isVisited = function(){
	if(this.visited){
		return true;
	}
	return false;
}
