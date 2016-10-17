var LevelDetails = function() {
	this.image = document.createElement("img");
	this.image.src = "tileset.png";
};

LevelDetails.prototype.drawMap = function(levelName, timeAllowed) {
	
	var maxTiles = Math.floor(SCREEN_WIDTH / TILE) + 2;
	var tileX = collision.pixelToTile(player.position.x);
	var offsetX = TILE + Math.floor(player.position.x % TILE);
	var startX = tileX - Math.floor(maxTiles / 2);
	var worldOffsetX = startX * TILE + offsetX;
	
	//In this code, I substituded several values with function things at the top - this will allow me to use different levels without having to rewrite the code
	this.allowedTime = timeAllowed;
	
	if(startX < -1)
	{
		startX = 0;
		offsetX = 0;
	}
	if(startX > levelName.tw - maxTiles)
	{
		startX = levelName.tw - maxTiles + 1;
		offsetX = TILE;
	}
	
	for( var layerIdx=0; layerIdx < LAYER_COUNT; layerIdx++ )
	{
		for( var y = 0; y < levelName.layers[layerIdx].height; y++ )
		{
			var idx = y * levelName.layers[layerIdx].width + startX;
			for( var x = startX; x < startX + maxTiles; x++ )
			{
				if( levelName.layers[layerIdx].data[idx] != 0 )
				{
 // the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile),
 // so subtract one from the tileset id to get the
 // correct tile
					var tileIndex = levelName.layers[layerIdx].data[idx] - 1;
					var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
					var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
						context.drawImage(this.image, sx, sy, TILESET_TILE, TILESET_TILE, (x-startX)*TILE - offsetX, (y-1)*TILE, TILESET_TILE, TILESET_TILE);
				}
			idx++;
			}
		}
	}
};