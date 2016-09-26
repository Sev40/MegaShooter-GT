var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

//-------------------- Don't modify anything above here
var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var LAYER_COUNT = 3;
var LAYER_BACKGROUND = 0;
var LAYER_PLATFORMS = 1;
var LAYER_LADDERS = 2;
var MAP = {tw: 60, th: 15};
var TILE = 35;
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;

var METRE = TILE;
var GRAVITY = METRE * 9.8 * 6;
var MAXDX = METRE * 10;
var MAXDY = METRE * 15;
var ACCEL = MAXDX * 2;
var FRICTION = MAXDX * 6;
var JUMP = METRE * 1500;
var DEBUG = 1;

// some variables to calculate the Frames Per Second (FPS - this tells use
// how fast our game is running, and allows us to make the game run at a 
// constant speed)
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;
var score = 0;
var highScore = 0;

var backgroundMusic;
var sfxFire;

var keyboard = new Keyboard();
var collision = new Collision();
var level = new LevelDetails();
var enemyGrunt = new EnemyGrunt();
var player = new Player();
var ui = new Ui();
var stateManager = new StateManager();
//var bullet = new Bullet();

stateManager.pushState( new SplashState() );

function initialise(levelName){
	for(var layerIdx = 0;
	layerIdx < LAYER_COUNT;
	layerIdx++)
	{
		cells[layerIdx] = [];
		var idx = 0;
		for(var y = 0;
		y < levelName.layers[layerIdx].height;
		y++)
		{
			cells[layerIdx][y] = [];
			for(var x = 0;
			x < levelName.layers[layerIdx].width;
			x++)
			{
				if(levelName.layers[layerIdx].data[idx] != 0)
				{
					cells[layerIdx][y][x] = 1;
					cells[layerIdx][y-1][x] = 1;
					cells[layerIdx][y-1][x+1] = 1;
					cells[layerIdx][y][x+1] = 1;
				}
				else if(cells[layerIdx][y][x] != 1)
				{
					cells[layerIdx][y][x] = 0;
				}
				idx++;
			}
		}
	}
	
	musicBackground = new Howl(
	{
		urls: ["background.ogg"],
		loop: true,
		buffer: true,
		volume: 0.5
	} );
	
	musicBackground.play();
	sfxFire = new Howl(
	{
		urls: ["fireEffect.ogg"],
		buffer: true,
		volume: 1,
		onend: function() 
		{
			isSfxPlaying = false;
		}
	} );

}

function run()
{
	var deltaTime = getDeltaTime();
	stateManager.update(deltaTime);
	stateManager.draw();
	
	if(DEBUG == 1)
	{
		context.fillStyle = "#f00";
		context.fillText("Left/Right Imput: " + ((keyboard.onKeyDown(keyboard.KEY_LEFT)) || (keyboard.onKeyDown(keyboard.KEY_RIGHT))), 400, 20, 100);
		// update the frame counter 
		fpsTime += deltaTime;
		fpsCount++;
		if(fpsTime >= 1)
		{
			fpsTime -= 1;
			fps = fpsCount;
			fpsCount = 0;
		}		
		
		// draw the FPS
		context.fillStyle = "#f00";
		context.font="14px Arial";
		context.fillText("FPS: " + fps, 550, 20, 100);
	}
}

initialise(level1);

//-------------------- Don't modify anything below here


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
