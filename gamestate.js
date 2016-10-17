var GameState = function() 
{
	this.prototype = BaseState;
}

GameState.prototype.load = function() 
{
	this.delay = 2;
}

GameState.prototype.unload = function() 
{
}

GameState.prototype.update = function(dt) 
{
	player.update(dt);
	enemyGrunt.update(dt);
	ui.update(dt);
}

GameState.prototype.draw = function() 
{
	context.fillStyle = "#ccc";	
	context.fillRect(0, 0, canvas.width, canvas.height);
	level.drawMap(level1, 15);
	player.draw();
	enemyGrunt.draw();
	ui.draw();
	//bullet.draw();
	
	if(score > highScore)
	{
		highScore = score;
	}
}