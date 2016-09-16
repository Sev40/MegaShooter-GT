var LEFT = 0;
var RIGHT = 1;

var ANIM_IDLE_LEFT = 0;
var ANIM_JUMP_LEFT = 1;
var ANIM_WALK_LEFT = 2;
var ANIM_SHOOT_LEFT = 3;
var ANIM_CLIMB = 4;
var ANIM_IDLE_RIGHT = 5;
var ANIM_JUMP_RIGHT = 6;
var ANIM_WALK_RIGHT = 7;
var ANIM_SHOOT_RIGHT = 8;
var ANIM_MAX = 9;

var Player = function()
{	
	this.sprite = new Sprite("ChuckNorris.png");
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [8, 9, 10, 11, 12]);
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]);
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]);
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]);
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [52, 53, 54, 55, 56, 57, 58, 59]);
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [60, 61, 62, 63, 64]);
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]);
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05, [79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 90, 91, 92]);

	for(var i=0; i<ANIM_MAX; i++)
	{
		this.sprite.setAnimationOffset(i, -55, -87);
	}
	this.sprite.setAnimation(ANIM_IDLE_LEFT);

	this.position = new Vector();
	this.position.set(9*TILE, 0*TILE);
	this.velocity = new Vector();
	this.velocity.set(0, 0);
	
	this.width = 159;
	this.height = 163;
	
	this.falling = true;
	this.jumping = false;
	this.direction = LEFT;
};

Player.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);

	var left = false;
	var right = false;
	var jump = false;
	var shoot = false;

	if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true)
	{
		left = true;
		this.direction = LEFT;
		if(this.sprite.currentAnimation != ANIM_WALK_LEFT && this.jumping == false)
		{
			this.sprite.setAnimation(ANIM_WALK_LEFT);
		}
	}
	else if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true)
	{
		right = true;
		this.direction = RIGHT;
		if(this.sprite.currentAnimation != ANIM_WALK_RIGHT && this.jumping == false)
		{
			this.sprite.setAnimation(ANIM_WALK_RIGHT);
		}
	}
	else if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true)
	{
		shoot = true;
		if(this.direction == LEFT && shoot == true)
		{
			if(this.sprite.currentAnimation !=ANIM_SHOOT_LEFT)
			{
				this.sprite.setAnimation(ANIM_SHOOT_LEFT);
			}
		}
		else if(this.direction == RIGHT && shoot == true)
		{
			if(this.sprite.setAnimation !=ANIM_SHOOT_RIGHT)
			{
				this.sprite.setAnimation(ANIM_SHOOT_RIGHT);
			}
		}
	}
	else
	{
		if(this.jumping == false && this.falling == false)
		{
			if(this.direction == LEFT)
			{
				if(this.sprite.currentAnimation != ANIM_IDLE_LEFT)
				{
					this.sprite.setAnimation(ANIM_IDLE_LEFT);
				}
			}
			if(this.direction == RIGHT)
			{
				if(this.sprite.currentAnimation != ANIM_IDLE_RIGHT)
				{
					this.sprite.setAnimation(ANIM_IDLE_RIGHT);
				}
			}
		}
	}
	if(keyboard.isKeyDown(keyboard.KEY_UP) == true)
	{
		jump = true;
		if(this.direction == LEFT)
		{
			this.sprite.setAnimation(ANIM_JUMP_LEFT);
		}
		if(this.direction == RIGHT)
		{
			this.sprite.setAnimation(ANIM_JUMP_RIGHT);
		}
	}
	
	var wasLeft = this.velocity.x < 0;
	var wasRight = this.velocity.x > 0;
	var falling = this.falling;
	var ddx = 0;
	var ddy = GRAVITY;
	
	if(left)
	{
		ddx = ddx - ACCEL;
	}
	else if(wasLeft)
	{
		ddx = ddx + FRICTION;
	}
	
	if(right)
	{
		ddx = ddx + ACCEL;
	}
	else if(wasRight)
	{
		ddx = ddx - FRICTION;
	}
	
	if(jump && !this.jumping && !falling)
	{
		ddy = ddy - JUMP;
		this.jumping = true;
	}
	
	if(keyboard.onKeyUp(keyboard.KEY_SPACE) == true)
	{
		shoot = false;
	}

	this.velocity.x = collision.bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
	this.velocity.y = collision.bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
	this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));

	if((wasLeft && (this.velocity.x > 0)) || (wasRight && (this.velocity.x < 0)))
	{
		this.velocity.x = 0;
	}
	
/*collision detection
Our collision detection logic is greatly simplified by the fact that the player is a rectangle
and is exactly the same size as a single tile. So we know that the player can only ever
occupy 1, 2 or 4 cells.
This means we can short-circuit and avoid building a general purpose collision detection
engine by simply looking at the 1 to 4 cells that the player occupies: */

	var tx = collision.pixelToTile(this.position.x);
	var ty = collision.pixelToTile(this.position.y);
	var nx = (this.position.x)%TILE;
	var ny = (this.position.y)%TILE;
	var cell = collision.cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
	var cellRight = collision.cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
	var cellDown = collision.cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
	var cellDiag = collision.cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);
	
	if(this.velocity.y > 0)
	{
		if((cellDown && !cell) || (cellDiag && !cellRight && nx))
		{
			this.position.y = collision.tileToPixel(ty);
			this.velocity.y = 0;
			this.falling = false;
			this.jumping = false;
			ny = 0;
		}
	}
	else if(this.velocity.y < 0)
	{
		if((cell && !cellDown) || (cellRight && !cellDiag && nx))
		{
			this.position.y = collision.tileToPixel(ty + 1);
			this.velocity.y = 0;
			cell = cellDown;
			cellRight = cellDiag;
			ny = 0;
		}
		if(this.velocity.x > 0)
		{
			if((cellRight && !cell) || (cellDiag && !cellDown && ny))
			{
				this.position.x = collision.tileToPixel(tx);
				this.velocity.x = 0;
			}
		}
		else if(this.velocity.x < 0)
		{
			if((cell && !cellRight) || (cellDown && !cellDiag && ny))
			{
				this.position.x = collision.tileToPixel(tx + 1);
				this.velocity.x = 0;
			}
		}
	}
};

Player.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
};