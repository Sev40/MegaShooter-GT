var EnemyGrunt = function(){	
	this.image = document.createElement("img");
	this.width = 159;
	this.height = 163;
	this.rotation = 0;

	this.image.src = "hero.png";
	this.position = new Vector();
	this.position.set(49, 88);
};

EnemyGrunt.prototype.update = function(deltaTime)
{		
	if( typeof(this.rotation) == "undefined" )
		this.rotation = 0;				// hang on, where did this variable come from!
	else{
		this.rotation += deltaTime;
	}
}

EnemyGrunt.prototype.draw = function()
{
	context.save();			
		context.translate(this.position.x, this.position.y);
		context.rotate(this.rotation);
		context.drawImage(this.image, -this.width/2, -this.height/2);	
	context.restore();	
}