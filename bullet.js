/*var BULLET_SPEED = 7;

Bullet = function()
{
	this.bullets = [];
	
	this.shoot = false;
	this.bullet = {
		image: document.createElement("img"),
		x: player.position.x,
		y: player.position.y,
		width: 5,
		height: 5,
		velocityX: 0,
		velocityY: 4
	};
	
	this.bullet.image.src = "bullet.png";
	
	this.velX = 0;
	this.velY = 1;
	
	this.s = Math.sin(player.rotation);
	this.c = Math.cos(player.rotation);
	
	this.xVel = (this.velX * this.c) - (this.velY * this.s);
	this.yVel = (this.velX * this.s) + (this.velY * this.c);
	
	this.bullet.velocityX = this.xVel * BULLET_SPEED;
	this.bullet.velocityY = this.yVel * BULLET_SPEED;
	
	this.bullets.push(bullet);
	return
}

Bullet.prototype.draw = function()
{
	for(var i=0; i<this.bullets.length; i++)
	{
		this.bullets[i].x += this.bullets[i].velocityX;
		this.bullets[i].y += this.bullets[i].velocityY;
	}
	
	for(var i=0; i<bullets.length; i++)
	{
		if(this.bullets[i].x < -this.bullets[i].width || this.bullets[i].x > SCREEN_WIDTH || this.bullets[i].y < -thisbullets[i].height || this.bullets[i].y > SCREEN_HEIGHT)
		{
			bullets.splice(i, 1);
			break;
		}
	}
	
	if(shoot == true && shootTimer <=0)
	{
		Bullet();
		shootTimer += 0.3;
	}
	
	if(shootTimer > 0)
	{
		shootTimer -= deltaTime;
	}
}*/