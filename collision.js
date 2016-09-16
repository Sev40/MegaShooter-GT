var cells = [];

var Collision = function(x1, y1, w1, h1, x2, y2, w2, h2)
{
	if(y2 + h2 < y1 || x2 + w2 < x1 || x2 > x1 + w1 || y2 > y1 + h1)
	{
		return false;
	}
	return true;
};

Collision.prototype.cellAtPixelCoord = function(layer, x, y)
{
	if(x < 0 || x > SCREEN_WIDTH)
	{
		return 1;
	}
	if(y > SCREEN_HEIGHT)
	{
		return 0;
	}
	
	return cellAtTileCoord(layer, p2t(x), p2t(y));
}

Collision.prototype.cellAtTileCoord = function(layer, tx, ty)
{
	if(tx < 0 || tx > MAP.tw)
	{
		return 1;
	}
	if(ty >= MAP.th)
	{
		return 0;
	}
	return cells[layer][ty][tx];
};

Collision.prototype.tileToPixel = function(tile)
{
	return tile * TILE;
};

Collision.prototype.pixelToTile = function(pixel)
{
	return Math.floor(pixel/TILE);
};

Collision.prototype.bound = function(value, min, max)
{
	if(value < min)
	{
		return min;
	}
	if(value > max)
	{
		return max;
	}
	return value;
}