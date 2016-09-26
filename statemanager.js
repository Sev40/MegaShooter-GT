var StateManager = function() 
{
	this.states = [];	
}

StateManager.prototype.pushState = function(state)
{
	state.load();
	this.states.push(state);
}

StateManager.prototype.switchState = function(state)
{
	this.states[ this.states.length - 1 ].unload();
	this.states.pop();
	state.load();
	this.states.push(state);
}

StateManager.prototype.popState = function()
{
	this.states[ this.states.length - 1 ].unload();
	this.states.pop();
}

StateManager.prototype.update = function(dt) 
{
	this.states[ this.states.length - 1 ].update(dt);
}

StateManager.prototype.draw = function() 
{
	this.states[ this.states.length - 1 ].draw();
}