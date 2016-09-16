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
	
	bullet.image.src = "bullet.png";
	
	this.velX = 0;
	this.velY = 1;
	
	this.s = Math.sin(player.rotation);
	this.c = Math.cos(player.rotation);
	
	this.xVel = (velX * c) - (velY * s);
	this.yVel = (velX * s) + (velY * c);
	
	bullet.velocityX = xVel * BULLET_SPEED;
	bullet.velocityY = yVel * BULLET_SPEED;
	
	bullets.push(bullet);
	return
}