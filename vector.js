var Vector = function(x, y){
	this.x = 0;
	this.y = 0;
}

Vector.prototype.set = function(x, y){
	this.x = x;
	this.y = y;
}

Vector.prototype.normalise = function(){
	var magnitude = (dirX * dirX) + (dirY * dirY);
	if(magnitude != 0){
		var oneOverMag = 1 / Math.sqrt(magnitude);
		dirX *= oneOverMag;
		dirY *= oneOverMag;
	}
}

Vector.prototype.add = function(v2){
	this.x = this.x + v2.x;
	this.y = this.y + v2.y;
}

Vector.prototype.subtract = function(v2){
	this.x = this.x - v2.x;
	this.y = this.y - v2.y;
}

Vector.prototype.multiplyScalar = function(num){
	this.x = this.x * num;
	this.y = this.y * num;
}