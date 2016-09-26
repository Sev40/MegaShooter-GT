var SplashState = function() 
{
	this.prototype = BaseState;
}

SplashState.prototype.load = function() 
{
}

SplashState.prototype.unload = function() 
{
}

SplashState.prototype.update = function(dt) 
{
	if( keyboard.isKeyDown( keyboard.KEY_SPACE ) == true )
	{
		stateManager.switchState( new GameState() );
	}
}

SplashState.prototype.draw = function() 
{
	context.font="72px Verdana";	
	context.fillStyle = "#FF0";	
	var width =  context.measureText("SPLASH SCREEN").width;
	context.fillText("SPLASH SCREEN", SCREEN_WIDTH/2 - width/2, SCREEN_HEIGHT/2);		
	
	context.font="18px Verdana";	
	context.fillStyle = "#000";	
	width =  context.measureText("Press SPACE to Continue.").width;
	context.fillText("Press SPACE to Continue.", SCREEN_WIDTH/2 - width/2, 300);	
}