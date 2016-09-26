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
}

Ui.prototype.update = function(deltaTime)
{
	if( this.delay > 0 )
	this.delay -= deltaTime;

	if(this.delay <=0 && player.position.y > 600)
	{
		this.health = 0;
		this.lives - 1;
	}
}

Ui.prototype.draw = function()
{
	context.drawImage(this.healthBase, 200 - (this.healthBase.width+2), 420);
	context.drawImage(this.livesBase, 330 - (this.livesBase.width + 2), 0);
	
	for(var i=0; i<this.health; i++)
	{
		context.drawImage(this.healthBar, 65 + ((this.healthBar.width + 2) * i), 430);
	}
	for(var i=0; i<this.lives; i++)
	{
		context.drawImage(this.life, 30 + ((this.life.width + 2) * i), 7);
	}
}