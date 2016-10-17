var Ui = function()
{
	this.healthBase = document.createElement("img");
	this.healthBase.src = "HealthUiBase.png";
	this.livesBase = document.createElement("img");
	this.livesBase.src = "Menu.png";
	this.healthBar = document.createElement("img");
	this.healthBar.src = "healthBar.png";
	this.life = document.createElement("img");
	this.life.src = "lives.png";
	
	this.health = 14;
	this.lives = 3;
	
	this.gameTimer = level.allowedTime;
}

Ui.prototype.update = function(deltaTime)
{
	if(keyboard.isKeyDown(keyboard.KEY_A) == true)
	{
		this.lives -1;
	}
	
	this.gameTimer -= deltaTime;
}

Ui.prototype.draw = function()
{
	//Draw GUI
	context.drawImage(this.healthBase, 450 - (this.healthBase.width+2), 420);
	context.drawImage(this.livesBase, 500 - (this.livesBase.width + 2), 0);
	
	//Draw Updating icons
	for(var i=0; i<this.health; i++)
	{
		context.drawImage(this.healthBar, 315 + ((this.healthBar.width + 2) * i), 430);
	}
	for(var i=0; i<this.lives; i++)
	{
		context.drawImage(this.life, 200 + ((this.life.width + 2) * i), 7);
	}
	
	//Arc Timer
	context.beginPath();
	context.arc(250, 250, 0, 0*Math.PI, (2*Math.PI) /* (this.gameTimer/level.time)*/);
	context.stroke();
}