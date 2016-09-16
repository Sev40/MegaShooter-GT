var LevelDetails = function() {
	this.image = document.createElement("img");
	this.image.src = "tileset.png";
};

LevelDetails.prototype.drawMap = function(levelName) {
	for(var layerIdx=0; layerIdx<LAYER_COUNT; layerIdx++)
	{
		var idx = 0;
		for( var y = 0; y < levelName.layers[layerIdx].height; y++ )
		{
			for( var x = 0; x < levelName.layers[layerIdx].width; x++ )
			{
				if( levelName.layers[layerIdx].data[idx] != 0 )
				{
// the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile), so subtract one from the tileset id to get the
// correct tile
					var tileIndex = levelName.layers[layerIdx].data[idx] - 1;
					var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
					var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_X)) * (TILESET_TILE + TILESET_SPACING);
					context.drawImage(this.image, sx, sy, TILESET_TILE, TILESET_TILE, x*TILE, (y-1)*TILE, TILESET_TILE, TILESET_TILE);
				}
				idx++;
			}
		}
	}
};