var fogSprite=new Array();
fogSprite.push(Sprite("fog1"));
fogSprite.push(Sprite("fog2"));
fogSprite.push(Sprite("fog3"));
fogSprite.push(Sprite("fog4"));

var ROOM_WIDTH=20;
var ROOM_HEIGHT=15;
var ROOM_TILE_SIZE=32;
var xOffset = 150;
var yOffset= 150;
var doorTypes=7;

function imageExists(url) 
{
	return true;
   var img = new Image();
   img.src = url;
   return img.height != 0;
}

var doorSprite=new Array();

//doorSprite.push(new Array());
for(var i=0;i<doorTypes;i++)
{
	doorSprite.push(new Array());
}
doorSprite[0][0]=Sprite("dungeontiles/door0");
doorSprite[0][1]=Sprite("dungeontiles/door1");
doorSprite[0][2]=Sprite("dungeontiles/door2");
doorSprite[0][3]=Sprite("dungeontiles/door3");

doorSprite[1][0]=Sprite("dungeontiles/doorclosed0");
doorSprite[1][1]=Sprite("dungeontiles/doorclosed1");
doorSprite[1][2]=Sprite("dungeontiles/doorclosed2");
doorSprite[1][3]=Sprite("dungeontiles/doorclosed3");

doorSprite[4][0]=Sprite("dungeontiles/blowncrack0");
doorSprite[4][1]=Sprite("dungeontiles/blowncrack1");
doorSprite[4][2]=Sprite("dungeontiles/blowncrack2");
doorSprite[4][3]=Sprite("dungeontiles/blowncrack3");

doorSprite[3][0]=Sprite("dungeontiles/closedcrack0");
doorSprite[3][1]=Sprite("dungeontiles/closedcrack1");
doorSprite[3][2]=Sprite("dungeontiles/closedcrack2");
doorSprite[3][3]=Sprite("dungeontiles/closedcrack3");

doorSprite[2][0]=Sprite("dungeontiles/lockeddoor0");
doorSprite[2][1]=Sprite("dungeontiles/lockeddoor1");
doorSprite[2][2]=Sprite("dungeontiles/lockeddoor2");
doorSprite[2][3]=Sprite("dungeontiles/lockeddoor3");

doorSprite[5][0]=Sprite("dungeontiles/curtaindoor0");
doorSprite[5][1]=Sprite("dungeontiles/curtaindoor1");
doorSprite[5][2]=Sprite("dungeontiles/curtaindoor2");
doorSprite[5][3]=Sprite("dungeontiles/curtaindoor3");

doorSprite[6][0]=Sprite("dungeontiles/doorclosed0");
doorSprite[6][1]=Sprite("dungeontiles/doorclosed1");
doorSprite[6][2]=Sprite("dungeontiles/doorclosed2");
doorSprite[6][3]=Sprite("dungeontiles/doorclosed3");

function staircase(up,clone)
{
	this.x=0;
	this.y=0;
	this.up=up;
	this.ctype=2;
	this.room=null;
	this.hidden=false;
	if(clone){
		this.x=clone.x;
		this.y=clone.y;
		this.up=clone.up;
		this.hidden=clone.hidden;
	}
	this.activate=function()
	{
		playSound("secret");
		this.hidden=!this.hidden;
		floorDirty=true;
	}
}
	
var doorType={};
doorType.Regular=0;
doorType.Closed=1;
doorType.Locked=2;
doorType.Bombable=3;
doorType.Bombed=4;
doorType.Curtains=5;
doorType.LampActivated=6;
	
function door(or,clone)
{
	if(!or){or=0;}
	this.x=0;
	this.y=0; 
	this.ctype=1;
	//this.source=sorc;
	this.on=false; 
	this.height=75;
	this.width=146;
	this.dest=null;
	this.orientation=or; //0=top, 1=right, 2= bottom, 3= left. 
	this.type=0;
	this.room=null;
	
	if(clone)
	{
		this.x=clone.x;
		this.y=clone.y; 
		this.dest=null;
		this.orientation=clone.orientation; //0=top, 1=right, 2= bottom, 3= left. 
		this.type=clone.type;
	}
	
	door.prototype.activate=function()
	{
		if(this.type==0)
		{
			playSound("doorclose");
			this.close();
		}else if(this.type==1)
		{
			playSound("dooropen");
			this.open();
		}
	}
	
	door.prototype.orient=function(dir)
	{
		this.orientation=dir;
		if((this.orientation==0) || (this.orientation==2))
		{
			this.x=8;
			this.height=75;
			this.width=146;
			if(this.orientation==0)
			{
				this.y=0;
			}else
			{
				this.y=17
			}
		}else
		{
			this.y=12;
			this.height=146;
			this.width=75;
			if(this.orientation==1)
			{
				this.x=17;
			}else
			{
				this.x=0;
			}
		}
	};
	
	door.prototype.close=function(lock)
	{
		if(this.type==4)
		{
			this.type=3;
			if(this.dest)
			{
				this.dest.type=3;
			}
			return;
		}
		this.type=1;
		if(this.dest)
		{
			this.dest.type=1;
		}
		if(lock)
		{
			this.type=2;
			if(this.dest)
			{
				this.dest.type=2;
			}
		}
	}
	
	door.prototype.open=function()
	{
		if(this.type==doorType.Bombable)
		{
			this.type=doorType.Bombed;
			if(this.dest)
			{
				this.dest.type=doorType.Bombed;
			}
			return;
		}
		this.type=0;
		if(this.dest)
		{
			this.dest.type=0;
		}
	}	
	
	door.prototype.getSprite=function()
	{
		return doorSprite[this.type][this.orientation];
	}
	
	door.prototype.passable=function(p)
	{
		if(editMode) {return true;}
		if((this.type==0) || (this.type==doorType.Bombed) || (this.type==doorType.Curtains)) //todo, if curtains are open. 
		{
			if(this.type==doorType.Curtains)
			{
				if(!this.on)
				{
					return true;
				}
			}else
			{
				return true;
			}
		}
		if((this.type==doorType.Locked)) 
		{
			if(p.keys>0)
			{
				this.open();
				p.keys--;
				playSound("unlock");
				bConsoleBox.log("Unlocked!");
				return true;
			}else if(p.AI==0)
			{
				playSound("locked");
				bConsoleBox.log("Need a key!");
			}
		}
		return false;
	}
	
	door.prototype.update=function()
	{
		if(this.type==doorType.LampActivated)
		{
			var lamps=0;
			var litLamps=0;
			for(var l=0;l<this.room.objects.length;l++)
			{
				if((this.room.objects[l].type==ObjectID.Lamp)  || (this.room.objects[l].type==ObjectID.TallLamp)||(this.room.objects[l].type==ObjectID.Candle))
				{
					lamps++;
					if(this.room.objects[l].on)
					{
						litLamps++;
					}
				}
			}
			if((lamps>0) &&(litLamps>lamps-1))
			{
				playSound("secret");
				playSound("dooropen");
				this.open();
			}	
		}
	}
	
	door.prototype.draw=function(can,cam)
	{
		
		if((this.type==doorType.Bombable) ||(this.type==doorType.Bombed))
		{
			if(this.orientation==0)
			{
				dungeonTileSprite[DungeonTileType.WallTop].draw(can,this.x*ROOM_TILE_SIZE+xOffset, this.y*ROOM_TILE_SIZE+yOffset);
			}else if(this.orientation==1)
			{
				dungeonTileSprite[DungeonTileType.WallRight].draw(can,this.x*ROOM_TILE_SIZE+xOffset, this.y*ROOM_TILE_SIZE+yOffset);
			}else if(this.orientation==2)
			{
				dungeonTileSprite[DungeonTileType.WallBottom].draw(can,this.x*ROOM_TILE_SIZE+xOffset, this.y*ROOM_TILE_SIZE+yOffset);
			}else if(this.orientation==3)
			{
				dungeonTileSprite[DungeonTileType.WallLeft].draw(can,this.x*ROOM_TILE_SIZE+xOffset,this.y*ROOM_TILE_SIZE+yOffset);
			}
			if(editMode)
			{
				this.getSprite().draw(can,(this.x-cam.tileX)*ROOM_TILE_SIZE+xOffset-30, (this.y-cam.tileY)*ROOM_TILE_SIZE+yOffset-30);
			}
			
		}
	  if((this.type!=doorType.Bombable) || (OPTIONS.showCracks))
		{
			this.getSprite().draw(can,(this.x-cam.tileX)*ROOM_TILE_SIZE+xOffset-30, (this.y-cam.tileY)*ROOM_TILE_SIZE+yOffset-30);
		}
	}

}

function Tile() { //the Map is made of a 2D array of tiles.
    this.x = 0;
    this.y = 0;
	//this.digable=false;
	this.dug=false;
    this.data =  0;
}
Tile.prototype.width = ROOM_TILE_SIZE;
Tile.prototype.height = ROOM_TILE_SIZE;
Tile.prototype.draw = function(can,cam) { 
    if(this.data==DungeonTileType.Grass){
        tileSprite[DungeonTileType.Grass].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==DungeonTileType.Stone){
		tileSprite[DungeonTileType.Stone].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==DungeonTileType.OrangeBrick){
        tileSprite[DungeonTileType.OrangeBrick].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==DungeonTileType.GreenBrick){
        tileSprite[DungeonTileType.GreenBrick].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE); 
    }else if(this.data==DungeonTileType.Water){
        tileSprite[DungeonTileType.Water+tileani].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==DungeonTileType.Lava){
        tileSprite[DungeonTileType.Lava+tileani].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==DungeonTileType.BirdHead){
        tileSprite[DungeonTileType.BirdHead].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(false){//this.data==DungeonTileType.Ice){
        tileSprite[DungeonTileType.Ice].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==DungeonTileType.GreenFloor){
        tileSprite[DungeonTileType.GreenFloor].draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==DungeonTileType.Ocean){
        //tileSprite[DungeonTileType.Ocean+tileani].draw(canvas, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else if(this.data==42){
        //watersprite.draw(canvas, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }else{  //if strange data, draw a solid color
        can.fillStyle = bColors[0]; 
        can.fillRect((this.x-cam.tileX)*this.width, (this.y-cam.tileY)*this.height, this.width, this.height);
    }
    if(this.cracked==1){
        crackedsprite.draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }
    if(this.platform==1){
        platformsprite.draw(can, (this.x-cam.tileX)*ROOM_TILE_SIZE, (this.y-cam.tileY)*ROOM_TILE_SIZE);
    }
    
};

function stringTrue(strng)
{
	if(strng=="true")
	{
		return true;
	}
	return false;
}

function tileToCost(data, canSwim) {
	if(canSwim)
	{
		if( data == TileType.Ocean ) return 2;
		if( data == TileType.Bridge ) return 2;
		if(/*(canSwim.navigateRivers )*/(true) && ( data == TileType.Water )) return 2;
		return 0;
	}else 
	{
		//if(sqd.getFlightHeight()>2) {return 2;}
		if(( data == TileType.Mountains ) ||( data == TileType.Ocean )) return 0;
		//if(sqd.getFlightHeight()>1) {return 2;}
		//if(( data == TileType.Water ) && sqd.canSwim()){ return 2;}
		if( data == TileType.Water ) {return 0;}
		if( data == TileType.Swamp  ) return 4;
		if( data == TileType.Forest  ) return 3;
		if( data == TileType.Sand  ) return 2;
		if( data == TileType.Road  ) return 1;
		//if( data == TileType.Grass  ) return 4;
		return 2;
	}
};

function getCost(map,x,y,aPlayer,avoidHoles)
{
	if(map.walkable(x,y,avoidHoles,aPlayer))
	{
		return 1;
	}else
	{
		return 0;
	}
}

function mapToGraph(map,aPlayer, avoidHoles) { 
    var tilesArray = [];
    for( var i=0; i<map.width; ++i ) {
        var rowArray = [];
        for( var j=0; j<map.height; ++j ) {
            var tile = map.tiles[i][j];
            var data = getCost(map,i,j,aPlayer,avoidHoles);
            /*for( var ii=-1; ii<2; ++ii ) {
                for( var jj=-1; jj<2; ++jj) {
                    if( i+ii < 0 || i+ii >= ROOM_WIDTH || j+jj < 0 || j+jj >= ROOM_WIDTH ) {
                        continue;
                    }
                    var adjTile = map.tiles[i+ii][j+jj];
                    if( !adjTile ) continue;
                    adjData = getCost(map,i+ii,j+jj);
                    if( data == 0 || adjData == 0 ) { data = 0; } else {
                        data = Math.max(data, adjData);
                    }
                }
            }*/
            rowArray.push(data);
        }
        tilesArray.push(rowArray);
    }
    return new Graph(tilesArray);
}

function reversePath(path)
{
	var spath=new Array();
	for(var i=0;i<path.list;i++)
	{
		spath.push(path.pop());
	}
	return spath;
}

function room(I) { //room object
    I = I || {};
    var i = 0;
    var j = 0;
	I.fogOfWar=false;
	I.x=0;
	I.x=0;
	I.y=0;
	I.lampLighting=false;
	I.lightLevel=0.00;
	I.miniMapX=0;
	I.miniMapY=0;
	I.bombs=new Array();
	I.explored=false;//TODO
	I.hidden=false;
	I.log=new Array();
	I.log.push("Constructed at "+thyme.getString());
	I.name=""; //simple string of it's coords? 
	I.tiledBackground=true;
	//eventually give tiles backgrounds random elements like rocks or cobwebs
	I.backgroundImage=null; // could be 32x32 tiles or whatever x whatever .png image. 
	I.exits=new Array(); //of doors, ladders and stairs
	I.stairs=new Array();
	//I.exits.push(new door(null,0));
	//I.windows=new Array(); //for zombie mode!
	I.lights=new Array();
	I.fires=new Array();
	I.enemies=new Array();
	I.objects=new Array();
	I.entities=new Array(); //comprising all the others
	//list of towns
	//story file?
	//enemy unit file
    I.active = true;
    I.color = "#00A";
    I.tiles = new Array(ROOM_WIDTH);
    for( i=0; i<ROOM_WIDTH; i++ ) { I.tiles[i] = new Array(ROOM_HEIGHT);  }
    for (i=0;i<ROOM_WIDTH; i++){
        for (j=0;j<ROOM_HEIGHT; j++){
            I.tiles[i][j]= new Tile();
            I.tiles[i][j].x=i;
            I.tiles[i][j].y=j;
        }
    }
    I.width = ROOM_WIDTH;
    I.height = ROOM_HEIGHT;
	I.seenMap=new Array();
	for (i=0;i<ROOM_WIDTH; i++){
		I.seenMap[i]=new Array();
        for (j=0;j<ROOM_HEIGHT; j++){
            I.seenMap[i][j]= false;
        }
    }
	
	I.copyTiles=function(clone,nowalls)
	{
		if(nowalls)
		{
			for(var i=2;i<I.width-2;i++)
			{
				for(var j=2;j<I.height-2;j++)
				{
					I.tiles[i][j].data=clone.tiles[i][j].data;
				}
			}
		}else
		{
			for(var i=0;i<I.width;i++)
			{
				for(var j=0;j<I.height;j++)
				{
					I.tiles[i][j].data=clone.tiles[i][j].data;
				}
			}
		}
	}
	I.redoWalls=function()
	{
		for(var i=0;i<I.width;i++)
		{
			I.tiles[i][0].data=14;
			I.tiles[i][1].data=14;
			
			I.tiles[i][14].data=17;
			I.tiles[i][13].data=17;
		}
		for(var i=1;i<I.height-1;i++)
		{
			I.tiles[0][i].data=15;
			I.tiles[1][i].data=15;
			
			I.tiles[18][i].data=16;
			I.tiles[19][i].data=16;
		}
		
		
		I.tiles[0][0].data=10;
		I.tiles[1][1].data=10;
		I.tiles[0][14].data=12;
		I.tiles[1][13].data=12;
		I.tiles[19][0].data=11;
		I.tiles[18][1].data=11;
		I.tiles[19][14].data=13;
		I.tiles[18][13].data=13;
	}
	I.copyStairs=function(clone)
	{
		I.stairs=new Array();
		for(var i=0;i<clone.stairs.length;i++)
		{
			I.stairs.push(new staircase(0,clone.stairs[i]));
		}
	}
	I.copyExits=function(clone)
	{
		I.exits=new Array();
		for(var i=0;i<clone.exits.length;i++)
		{
			I.exits.push(new door(0,clone.exits[i]));
		}
		I.copyStairs(clone);
	}
	
    I.getPath = function(startX, startY, endX, endY,aPlayer,avoidHoles) {
		//if(avoidHoles==null){avoidHoles=true;}
		if((startX==endX) && (startY==endY))
		{
			var maph={};
			maph.x=startX;
			maph.y=startY;
			var crap=new Array();
			crap.push(maph);
			return crap;
		}
		//var snerd=I.getSubMap(0,0,ROOM_WIDTH,ROOM_HEIGHT);//(startX,startY,endX,endY);
		var graph = mapToGraph(I,aPlayer,avoidHoles);
		
		return astar.search(graph.nodes, graph.nodes[startX][startY], graph.nodes[endX][endY]);
	};
	
	I.hasDoor=function(dir)
	{
		for(var i=0;i<I.exits.length;i++)
		{
			if((I.exits[i]) && (I.exits[i].orientation==dir))
			{
				return true;
			}
		}
		return false;
	};
	
	I.hasVisibleDoor=function(dir)
	{
		for(var i=0;i<I.exits.length;i++)
		{
			if((I.exits[i]) && (I.exits[i].orientation==dir) &&(I.exits[i].type!=doorType.Bombable))
			{
				if(I.exits[i].type==doorType.Curtains)
				{
					if(!I.exits[i].on)
					{
						return true;
					}
				}else
				{
					return true;
				}
			}
		}
		return false;
	};
	
	I.getSpecificDoor=function(x,y,dir)
	{
		if(!I.hasDoor(dir))		{return null;}
		for(var i=0;i<I.exits.length;i++)
		{
			if((I.exits[i]) && (I.exits[i].orientation==dir))
			{
				if((I.exits[i].x==x) && (I.exits[i].y==y))
				{
					return I.exits[i];
				}
			}
		}
		return null;
	};
	
	I.getDoor=function(dir)
	{
		if(!I.hasDoor(dir))		{return null;}
		for(var i=0;i<I.exits.length;i++)
		{
			if((I.exits[i]) && (I.exits[i].orientation==dir))
			{
				return I.exits[i];
			}
		}
		return null;
	};
	
	I.getDoors=function(dir)
	{
		var palst=new Array();
		for(var i=0;i<I.exits.length;i++)
		{
			if((I.exits[i]) && (I.exits[i].orientation==dir))
			{
				palst.push(I.exits[i]);
			}
		}
		return palst;
	};
	
	I.getOpenDoor=function(dir,p)
	{
		if(!I.hasDoor(dir))		{return null;}
		for(var i=0;i<I.exits.length;i++)
		{
			if((I.exits[i]) && (I.exits[i].orientation==dir) &&(I.exits[i].passable(p)))
			{
				return I.exits[i];
			}
		}
		return null;
	};
	
	I.getOpenDoors=function(dir)
	{
	
	};
	
	I.hasStairs=function(up)
	{
		for(var i=0;i<I.stairs.length;i++)
		{
			if((I.stairs[i]) && (I.stairs[i].up==up)&& (!I.stairs[i].hidden))
			{
				return true;
			}
		}
		return false;
	};
	
	I.getStairs=function(up)
	{
		for(var i=0;i<I.stairs.length;i++)
		{
			if((I.stairs[i]) && (I.stairs[i].up==up)&& (!I.stairs[i].hidden))
			{
				return I.stairs[i];
			}
		}
		return null;
	};
	
	I.recursiveFill=function(x,y,targID,newID)
	{
		if((x<0) || (x>I.width)||(y<0)||(y>I.height)) {return;}
		if(targID==newID) {return;}
		if(I.tiles[x][y].data!=targID) {return;}
		I.tiles[x][y].data=newID;
		I.recursiveFill(x-1,y,targID,newID);
		I.recursiveFill(x+1,y,targID,newID);
		I.recursiveFill(x,y-1,targID,newID);
		I.recursiveFill(x,y+1,targID,newID);
		return;
	};
		
	I.fill=function(x,y,id)
	{
		I.recursiveFill(x,y,I.tiles[x][y].data,id);
		return;
	};
	
	I.fillAll=function(id)
	{
		for(var i=2;i<I.width-2;i++)
		{
			for(var j=2;j<I.height-2;j++)
			{
				I.tiles[i][j].data=id;
			}
			
		}
	};
	
	I.sailable=function(x,y){//,b){
		if((I.tiles[x][y].data==TileType.Ocean)) {return true;}
		if(true)//(b.navigateRivers)
		{
			if((I.tiles[x][y].data==TileType.Ocean)) {return true;}
		}
		return false;
	}
	I.jumpable=function(x,y,aPlayer){
		if(I.tiles[x][y].data==DungeonTileType.Ocean)
		{
			return true;
		}
		if(I.tiles[x][y].data==DungeonTileType.Lava)
		{
			return true;
		}
		if(I.tiles[x][y].data==DungeonTileType.Hole)
		{
			return true;
		}
		return I.walkable(x,y,false,aPlayer);
		//basically if hole or water or lava return true? 
	}
	
	I.objectWillBlock=function(obj)
	{
		//Serously wtf was I thinking with this. This is insane. 
	/*	if(((I.tiles[x][y].data==DungeonTileType.FloorEighteen) ||I.tiles[x][y].data==DungeonTileType.FloorFifteen) ||(I.tiles[x][y].data==DungeonTileType.FloorSixteen) ||(I.tiles[x][y].data==DungeonTileType.FloorSeventeen)||(I.tiles[x][y].data==DungeonTileType.FloorTwelve) ||(I.tiles[x][y].data==DungeonTileType.FloorThirteen) ||(I.tiles[x][y].data==DungeonTileType.FloorFourteen) ||(I.tiles[x][y].data==DungeonTileType.FloorSeven) ||(I.tiles[x][y].data==DungeonTileType.FloorEight) ||(I.tiles[x][y].data==DungeonTileType.FloorNine) ||(I.tiles[x][y].data==DungeonTileType.FloorTen) ||(I.tiles[x][y].data==DungeonTileType.FloorEleven)|| (I.tiles[x][y].data==DungeonTileType.FloorFour) ||(I.tiles[x][y].data==DungeonTileType.FloorFive) ||(I.tiles[x][y].data==DungeonTileType.FloorSix) ||(I.tiles[x][y].data==DungeonTileType.FloorThree) ||(I.tiles[x][y].data==DungeonTileType.FloorTwo) ||(I.tiles[x][y].data==DungeonTileType.FloorOne) ||(I.tiles[x][y].data==DungeonTileType.GreenFloor) ||(I.tiles[x][y].data==DungeonTileType.UpStair)||(I.tiles[x][y].data==DungeonTileType.DownStair) ||(I.tiles[x][y].data==DungeonTileType.Unstable) ||(I.tiles[x][y].data==DungeonTileType.ReallyUnstable) ||(I.tiles[x][y].data==DungeonTileType.DeathHole) ||(I.tiles[x][y].data==DungeonTileType.GrassHole)||((I.tiles[x][y].data==DungeonTileType.Hole)) ||(I.tiles[x][y].data==DungeonTileType.Grass)||(I.tiles[x][y].data==DungeonTileType.Sand) ||(I.tiles[x][y].data==DungeonTileType.Ice))
		{*/
			for(var i=0;i<obj.room.objects.length;i++)
			{
				//if((I.objects[i].x==x) && (I.objects[i].y==y))
				//if((x>I.objects[i].x-1) && (x<I.objects[i].x+I.objects[i].width/32) && (y>I.objects[i].y-1) && (y<I.objects[i].y+I.objects[i].height/32))
				if(obj.room.objects[i].ID==obj.ID)
				{
					continue;
				}
				if((obj.room.objects[i].x==obj.x) && (obj.room.objects[i].y==obj.y) && (obj.room.objects[i].ID!=obj.ID)&& (obj.room.objects[i].fallingY<20))
				{	
					if(!obj.room.objects[i].walkable())
					{
						
						return true;
					}
				}
				if(obj.dir==0)
				{
					if((obj.room.objects[i].x==obj.x) && (obj.room.objects[i].y==obj.y-1) && (obj.room.objects[i].ID!=obj.ID)&& (obj.room.objects[i].fallingY<20))
					{
						if(!obj.room.objects[i].walkable())
						{
							return true;
						}
					}
				}else if(obj.dir==1)
				{
					if((obj.room.objects[i].x==obj.x+1) && (obj.room.objects[i].y==obj.y) && (obj.room.objects[i].ID!=obj.ID)&& (obj.room.objects[i].fallingY<20))
					{
						if(!obj.room.objects[i].walkable())
						{
							return true;
						}
					}
				}else if(obj.dir==2)
				{
					if((obj.room.objects[i].x==obj.x) && (obj.room.objects[i].y==obj.y+1) && (obj.room.objects[i].ID!=obj.ID)&& (obj.room.objects[i].fallingY<20))
					{
						if(!obj.room.objects[i].walkable())
						{
							return true;
						}
					}
				}else if(obj.dir==3)
				{
					if((obj.room.objects[i].x==obj.x-1) && (obj.room.objects[i].y==obj.y) && (obj.room.objects[i].ID!=obj.ID)&& (obj.room.objects[i].fallingY<20))
					{
						if(!obj.room.objects[i].walkable())
						{
							return true;
						}
					}
				}
			}
			return false;//true;
		/*}
		return false;*/
	}
	
	I.walkable=function(x,y,avoidHoles,aPlayer){
		/*if((aplayer) && (aplayer.has[hasID.Feather]))
		{
			if(I.tiles[x][y].data==DungeonTileType.Hole)
			{
				if(aplayer.featherCount==0)
				{
					console.log("must jump a hole!");
					aplayer.featherCount++;
					return true;
				}else
				{
					console.log("too many holes to jump");
					return false;
				}
			}else if((I.tiles[x][y].data==DungeonTileType.GreenFloor) ||(I.tiles[x][y].data==DungeonTileType.UpStair)||(I.tiles[x][y].data==DungeonTileType.DownStair) ||(I.tiles[x][y].data==DungeonTileType.Unstable) ||(I.tiles[x][y].data==DungeonTileType.Grass)||(I.tiles[x][y].data==DungeonTileType.Sand) ||(I.tiles[x][y].data==DungeonTileType.Ice))
			{
				for(var i=0;i<I.objects.length;i++)
				{
					if((I.objects[i].x==x) && (I.objects[i].y==y))
					{
						if(!I.objects[i].walkable())
						{
							return false;
						}
					}
				}
				console.log("trash");
				aplayer.featherCount=0;
				return true;
			}
			return false;
		}else
		{*/
		if(((aPlayer.canSwim)||(aPlayer.jumping)) && ((I.tiles[x][y].data>19) && (I.tiles[x][y].data<24)))
		{
			return true;
		}
			//Serously wtf was I thinking with this. This is insane. 
			if(((I.tiles[x][y].data==DungeonTileType.FloorEighteen) ||I.tiles[x][y].data==DungeonTileType.FloorFifteen)||(I.tiles[x][y].data==DungeonTileType.FloorNinteen) ||(I.tiles[x][y].data==DungeonTileType.FloorSixteen) ||(I.tiles[x][y].data==DungeonTileType.FloorSeventeen)||(I.tiles[x][y].data==DungeonTileType.FloorTwelve) ||(I.tiles[x][y].data==DungeonTileType.FloorThirteen) ||(I.tiles[x][y].data==DungeonTileType.FloorFourteen) ||(I.tiles[x][y].data==DungeonTileType.FloorSeven) ||(I.tiles[x][y].data==DungeonTileType.FloorEight) ||(I.tiles[x][y].data==DungeonTileType.FloorNine) ||(I.tiles[x][y].data==DungeonTileType.FloorTen) ||(I.tiles[x][y].data==DungeonTileType.FloorEleven)|| (I.tiles[x][y].data==DungeonTileType.FloorFour) ||(I.tiles[x][y].data==DungeonTileType.FloorFive) ||(I.tiles[x][y].data==DungeonTileType.FloorSix) ||(I.tiles[x][y].data==DungeonTileType.FloorThree) ||(I.tiles[x][y].data==DungeonTileType.FloorTwo) ||(I.tiles[x][y].data==DungeonTileType.FloorOne) ||(I.tiles[x][y].data==DungeonTileType.GreenFloor) ||(I.tiles[x][y].data==DungeonTileType.UpStair)||(I.tiles[x][y].data==DungeonTileType.DownStair) ||(I.tiles[x][y].data==DungeonTileType.Unstable) ||(I.tiles[x][y].data==DungeonTileType.ReallyUnstable) ||(I.tiles[x][y].data==DungeonTileType.DeathHole) ||(I.tiles[x][y].data==DungeonTileType.GrassHole)||((I.tiles[x][y].data==DungeonTileType.Hole) && (!avoidHoles)) ||(I.tiles[x][y].data==DungeonTileType.Grass)||(I.tiles[x][y].data==DungeonTileType.Sand) ||(I.tiles[x][y].data==DungeonTileType.Ice)||(I.tiles[x][y].data==DungeonTileType.CutGrass))
			{
				for(var i=0;i<I.objects.length;i++)
				{
					//if((I.objects[i].x==x) && (I.objects[i].y==y))
					if((x>I.objects[i].x-1) && (x<I.objects[i].x+I.objects[i].width/32) && (y>I.objects[i].y-1) && (y<I.objects[i].y+I.objects[i].height/32))
					{
						if((!I.objects[i].walkable()) && (I.objects[i].fallingY<20)&& (aPlayer.fallingY<20))
						{
							return false;
						}
					}
				}
				return true;
			}
			return false;
		//}
	}
	
	I.digable=function(x,y,player)
	{
		if( (this.tiles[x][y].data==DungeonTileType.Sand) || (this.tiles[x][y].data==DungeonTileType.FloorEleven)||(this.tiles[x][y].data==DungeonTileType.Grass) ||(this.tiles[x][y].data==DungeonTileType.CutGrass)||(this.tiles[x][y].data==DungeonTileType.FloorThirteen))
		{
			var meg=player.getFacingObject();
			if(!meg){return true};
			if((meg) && (meg.buried))
			{
				return true;
			}else if((meg) && (meg.type==ObjectID.Bush) && (!meg.on))
			{
				meg.exists=false;//shouldn't do this here.
				return true;
			}else
			{
				return false; 
			}
		}else
		{
			return false;
		}			
	
	} 
	
	
	I.setStairs=function()
	{
		curDungeon.curRoom().stairs = new Array();
		for(var i=0;i<curDungeon.curRoom().width;i++)
		{
			for(var j=0;j<curDungeon.curRoom().height;j++)
			{
				if(curDungeon.curRoom().tiles[i][j].data==DungeonTileType.UpStair)
				{
					I.addStair(i,j,true);
				}
				else if(curDungeon.curRoom().tiles[i][j].data==DungeonTileType.DownStair)
				{
					I.addStair(i,j,false);
				}
			}
		}
	}
	
	I.load=function(path)
	{
		
		var smuth=path+I.name+".txt";
		$.get(smuth, function(data) 
		{ 
			I.buildMapFromLoadedTiles("whatever",data); 
			I.active=true;
			bConsoleBox.log("Loaded "+smuth); 
			LOAD_COUNTS[countIndex]--;
		});  
		
	}
	I.loadObjects=function(path)
	{
		
		var smuth=path+I.name+".obj";
		$.get(smuth, function(data) 
		{ 
			I.buildLoadedObjects("whatever",data); 
			bConsoleBox.log("Loaded "+smuth); 
			
		});  
		
	}
	
	I.closestWalkable=function(x,y,aPlayer)
	{
		var ned={};
		ned.x=x;
		ned.y=y;
		if((x<0) || (x>I.width)||(y<0)||(y>I.height)) {return null;}
		if(I.walkable(x,y,true,aPlayer)) {return ned;}
		ned=I.closestWalkable(x-1,y,aPlayer);
		if(ned){return ned;}
		ned=I.closestWalkable(x+1,y,aPlayer);
		if(ned){return ned;}
		ned=I.closestWalkable(x,y-1,aPlayer);
		if(ned){return ned;}
		ned=I.closestWalkable(x,y+1,aPlayer);
		if(ned){return ned;}
		return null;
	}

	I.buriedLoot=function(x,y)
	{
		for(var i=0;i<I.objects.length;i++)
		{
			if((I.objects[i].x==x) && (I.objects[i].y==y) && (I.objects[i].buried))
			{
				return I.objects[i];
			}
		}
		return null;
	}
	
	I.closestAdj=function(you,it,aPlayer)
	{
		//todo! return closest walkable tile that is not the tile. make list of walkable ajacents, then sort by distance to it?
		var alist=new Array();
		if(I.walkable(you.x-1,you.y,true,aPlayer))
		{
			var gurp={};
			gurp.x=you.x+1;
			gurp.y=you.y;
			alist.push(gurp);
		}
		if(I.walkable(you.x-1,you.y,true,aPlayer))
		{
			var gurp={};
			gurp.x=you.x-1;
			gurp.y=you.y;
			alist.push(gurp);
		}
		if(I.walkable(you.x,you.y+1,true,aPlayer))
		{
			var gurp={};
			gurp.x=you.x;
			gurp.y=you.y+1;
			alist.push(gurp);
		}
		if(I.walkable(you.x,you.y-1,true,aPlayer))
		{
			var gurp={};
			gurp.x=you.x;
			gurp.y=you.y-1;
			alist.push(gurp);
		}
		alist.sort(function(a, b) //todo not this every frame. only when changes. 
		{
			if(distance(a,it)>distance(b,it))
			{
				return 1;
			}else if(distance(a,it)<distance(b,it))
			{
				return -1;
			}else
			{
				return 0;
			}
			
		
		});
		if(alist.length<1)
		{
				return null;
		}
		return alist[0];
	}
	
	I.save=function(path)
	{
		if(I.active)
		{
			var smoth=path+I.name+".txt";
			$.post("/save/", {"data": I.stringifyTiles(), "path": smoth}).done(function(response) { bConsoleBox.log("Saved " +smoth); });

		}else
		{
			//edit floor file to make clear there's no room.
			bConsoleBox.log("No room to save");
		}
	}
		
	I.saveObjects=function(path)
	{
		if(I.active)
		{
			var smoth=path+I.name+".obj";
			$.post("/save/", {"data": I.stringifyObjects(), "path": smoth}).done(function(response) { bConsoleBox.log("Saved " +smoth); });
		}else
		{
			//edit floor file to make clear there's no room.
			bConsoleBox.log("No room to save");
		}
	}
	
	I.stringifyTiles = function(name) {
		var tempstring= "";
		tempstring+=I.lampLighting;
		tempstring+=","
		tempstring+=I.hidden;
		tempstring+=","
		for (i=0;i<ROOM_WIDTH; i++){
			for (j=0;j<ROOM_HEIGHT; j++){
			tempstring = tempstring +I.tiles[i][j].data;
			tempstring += ","
			}
		}
		return tempstring;
	};
	
	I.stringifyObjects = function(name) {
		var tempstring= "";
		tempstring+=I.objects.length;
		tempstring+=";"
		for (i=0;i<I.objects.length; i++){
			tempstring+=I.objects[i].stringify();
			tempstring+=";";
		}
		return tempstring;
	};
	
	I.loadTiles = function (name) {
	var hempstring=localStorage.getItem(name);
		I.buildMapFromLoadedTiles(name, hempstring);
    };
	
	I.buildLoadedObjects = function(name, hempstring) {
		tempstring=hempstring.split(";");
		I.objects=new Array(); //get first bit of data, that's the number of objects. then loop that many times loading each objects x,y,type
		var numo =Math.floor(tempstring[0]);
		var ffset=5;
		var mitly=0;
		for(var i=1;i<numo*5+mitly;i+=ffset)
		{
			ffset=5;
			var higgins=new object(I);
			higgins.x=Math.floor(tempstring[i]);
			higgins.y=Math.floor(tempstring[i+1]);
			higgins.homeX=higgins.x;
			higgins.homeY=higgins.y;
			higgins.type=Math.floor(tempstring[i+2]);
			higgins.hidden=stringTrue(tempstring[i+3]);
			higgins.buried=stringTrue(tempstring[i+4]);
			higgins.room=I;
			if(higgins.type==ObjectID.Sign)
			{
				higgins.text=tempstring[i+5];
				ffset=6;
				mitly++;
				higgins.setup(ObjectID.Sign,higgins.text);
			}else if(higgins.type==ObjectID.Chest)
			{
				higgins.loot=Math.floor(tempstring[i+5]);
				ffset=6;
				mitly++;
				higgins.setup();
			}else if(higgins.type==ObjectID.Lamp)
			{
				higgins.on=!stringTrue(tempstring[i+5]);
				ffset=6;
				mitly++;
				higgins.setup();
			}else if(higgins.type==ObjectID.Curtains)
			{
				higgins.hasSecret=stringTrue(tempstring[i+5]);
				ffset=6;
				mitly++;
				higgins.setup();
			}else if((higgins.type==ObjectID.BlueBlocker) ||(higgins.type==ObjectID.RedBlocker))
			{
				var nerp=tempstring[i+5]
				higgins.on=stringTrue(nerp);
				ffset=6;
				mitly++;
				higgins.setup();
			}else if((higgins.type==ObjectID.ToggleSwitch) || (higgins.type==ObjectID.EyeSwitch)|| (higgins.type==ObjectID.HoldSwitch))
			{
				var nerp=tempstring[i+5] //number of dests
				var plerp=i+5;
				var todestsp=1;
				for(var j=0;j<nerp;j++)
				{
					var niles={};
					niles.roomZ=Math.floor(tempstring[plerp+1]);
					niles.roomX=Math.floor(tempstring[plerp+2]);
					niles.roomY=Math.floor(tempstring[plerp+3]);
					niles.x=Math.floor(tempstring[plerp+4]);
					niles.y=Math.floor(tempstring[plerp+5]);
					niles.type=Math.floor(tempstring[plerp+6]);
					niles.ctype=Math.floor(tempstring[plerp+7]);
					higgins.linkDescriptions.push(niles);
					plerp+=7; //move to the next dest
					todestsp+=7;
				}
				ffset=5+todestsp;//j*7;
				mitly+=todestsp;
				higgins.setup();
			}else
			{
				higgins.setup();
			}
			
			I.objects.push(higgins);
		}
		I.objects.sort(function(a, b) //todo not this every frame. only when changes. 
		{
			if((a.type==ObjectID.PotStand) || (a.type==ObjectID.HoldSwitch)|| (a.type==ObjectID.ToggleSwitch)|| ((a.type==ObjectID.HolePlugger) && (a.on)))
			{
				if((b.type==ObjectID.PotStand) || (b.type==ObjectID.HoldSwitch)|| (b.type==ObjectID.ToggleSwitch) || ((b.type==ObjectID.HolePlugger) && (b.on)))
				{
					return 0;
				}
				return -1;
			}
			if((b.type==ObjectID.PotStand) || (b.type==ObjectID.HoldSwitch)|| (b.type==ObjectID.ToggleSwitch) || ((b.type==ObjectID.HolePlugger) && (b.on)))
			{
				if((a.type==ObjectID.PotStand) || (a.type==ObjectID.HoldSwitch)|| (a.type==ObjectID.ToggleSwitch)|| ((a.type==ObjectID.HolePlugger) && (a.on)))
				{
					return 0;
				}
				return 1;
			}
			if(a.y>b.y)
			{
				return 1;
			}else if(a.y<b.y)
			{
				return -1;
			}else
			{
				if(((a.type==ObjectID.PotStand) || (a.type==ObjectID.HoldSwitch)|| (a.type==ObjectID.ToggleSwitch)) && ((b.type==ObjectID.Brick) || (b.type==ObjectID.Pot)))
				{
					return -1;
				}else if(((b.type==ObjectID.PotStand) || (b.type==ObjectID.HoldSwitch)|| (b.type==ObjectID.ToggleSwitch)) && ((a.type==ObjectID.Brick)||(a.type==ObjectID.Pot)))
				{
					return 1;
				}
				return 0;
			}
			
			return 0;
		});
		
	}
	
	I.buildMapFromLoadedTiles = function(name, hempstring) {
		tempstring=hempstring.split(",");
		I.lampLighting=stringTrue(tempstring[0]);
		I.hidden=stringTrue(tempstring[1]);
		tempstring.splice(0,2);
		if(name=="nowipe")
		{
		
		}else
		{
			I.exits=new Array();
			I.stairs=new Array();
		}
		for (i=0;i<ROOM_WIDTH; i++){
			for (j=0;j<ROOM_HEIGHT; j++)
			{
				I.tiles[i][j].data = Math.floor(tempstring[j+ROOM_HEIGHT*i]);
				I.tiles[i][j].dug=false;
				if((I.tiles[i][j].data>DungeonTileType.Door-1) && (I.tiles[i][j].data<DungeonTileType.Door+numDoorTypes+1)) //door
				{
					if((i==18))
					{
						var mindy= new door(1);
						mindy.x=i;
						mindy.y=j;
						mindy.exists=true;
						mindy.room=I;
						mindy.type=I.tiles[i][j].data-DungeonTileType.Door;
						I.exits.push(mindy);
					}else if((i==1))
					{
						var mindy= new door(3);
						mindy.x=i;
						mindy.y=j;
						mindy.room=I;
						mindy.exists=true;
						mindy.type=I.tiles[i][j].data-DungeonTileType.Door;
						I.exits.push(mindy);
					}else if((j==1))
					{
						var mindy= new door(0);
						mindy.x=i;
						mindy.y=j;
						mindy.room=I;
						mindy.exists=true;
						mindy.type=I.tiles[i][j].data-DungeonTileType.Door;
						I.exits.push(mindy);
					}else if(j==13)
					{
						var mindy= new door(2);
						mindy.x=i;
						mindy.y=j;
						mindy.room=I;
						mindy.exists=true;
						mindy.type=I.tiles[i][j].data-DungeonTileType.Door;
						I.exits.push(mindy);
					}
				}else if(I.tiles[i][j].data==DungeonTileType.UpStair)
				{
					var mindy= new staircase(true);
					mindy.x=i;
					mindy.y=j;
					mindy.room=I;
					mindy.exists=true;
					I.stairs.push(mindy);
				}else if(I.tiles[i][j].data==DungeonTileType.DownStair)
				{
					var mindy= new staircase(false);
					mindy.x=i;
					mindy.y=j;
					mindy.room=I;
					mindy.exists=true;
					I.stairs.push(mindy);
				}
			}
		}
    };
	
	I.saveTiles = function (name) {
		var tempstring = I.stringifyTiles(name);
		localStorage.setItem(name, tempstring);
	
    };
	
	I.randomizeTiles=function()
	{
		var i=Math.floor(Math.random()*stockRooms.length);
		var buup=new room();
		buup.buildMapFromLoadedTiles("whatever",stockRooms[i]);
		I.copyTiles(buup,true);
	}
    
    I.drawPath = function(can,x,y,xx,yy,aPlayer) {
        var path = I.getPath(x, y, xx, yy,aPlayer,false);
		//console.log(path);
		var snarp=can.fillStyle;
		var parp=can.globalAlpha;
		can.globalAlpha=0.4;
		can.fillStyle="yellow";
        for( var i=0; i<path.length; ++i ) {
           // I.setTile(path[i].x, path[i].y, 1);
		   
			can.fillRect(path[i].x*32+xOffset,path[i].y*32+yOffset,32,32);
			
        }
		can.globalAlpha=parp;
		can.fillStyle=snarp;
    };
    
	I.isHole=function(x,y)
	{
		if((I.tiles[x][y].data==DungeonTileType.Hole) || (I.tiles[x][y].data==DungeonTileType.DeathHole)|| (I.tiles[x][y].data==DungeonTileType.GrassHole))
		{
			return true;
		}
		return false;
	}
	
	I.isSafe=function(x,y,bob)
	{
		if(I.tiles[x][y].data==DungeonTileType.DeathHole)
		{
			return false;
		}
		if((I.tiles[x][y].data>19) && (I.tiles[x][y].data<25) && (!bob.canSwim))
		{
			return false;
		}
		if((I.tiles[x][y].data>24) && (I.tiles[x][y].data<28) && (!bob.canLavaSwim))
		{
			return false;
		}
		return true;
	}
	
	I.drawHoleEdges=function(can,cam)
	{
		for (i=0;i<ROOM_WIDTH; i++)
		{
            for (j=0;j<ROOM_HEIGHT; j++)
			{
				if((I.isHole(i,j)) &&(I.tiles[i][j].data!=DungeonTileType.GrassHole))
				{
					if(!I.isHole(i,j-1))
					{
						holeEdgeSprites[0].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
					}
					if(!I.isHole(i+1,j))
					{
						holeEdgeSprites[1].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
					}
					if(!I.isHole(i,j+1))
					{
						holeEdgeSprites[2].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
					}
					if(!I.isHole(i-1,j))
					{
						holeEdgeSprites[3].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
					}
				}
			}
		}
	}
	
	
    I.draw = function(can,cam) {
		if(!this.active){return;}
		//if(!mapDirty) {return;}
		//var cam={tileX:0,tileY:0,width:20,height:15};
		var poopx=cam.tileX+cam.width;//*Math.pow(2, I.zoom-1);
		var poopy=cam.tileY+cam.height;//*Math.pow(2, I.zoom-1);
		if(poopx>ROOM_WIDTH)
		{
			//poopx=ROOM_WIDTH-(cam.tileX+cam.width);
		}
		if(poopy>ROOM_HEIGHT)
		{
			poopy=ROOM_HEIGHT-(cam.tileY+cam.height);
		}
		I.zoom=1;

        for (i=0;i<ROOM_WIDTH; i++){
            for (j=0;j<ROOM_HEIGHT; j++){
                var DungeonTileTypes = {};
                for( var ii=0; ii<I.zoom; ii+=1 ) {
                    if ((i+ii>=ROOM_WIDTH)) { continue;}
                    for( var jj=0; jj<I.zoom; jj+=1 ) {
                        if ((j+jj>=ROOM_HEIGHT)) {continue;}

                        var data = I.tiles[i+ii][j+jj];
                        if( data ) {
                            if( !DungeonTileTypes[data.data] ) { DungeonTileTypes[data.data] = 1; }
                            else{ DungeonTileTypes[data.data] += 1; }
                        }
                    }
                }
                var dominantType = {type: null, occurs: 0};

                for( var type in DungeonTileTypes ) {
                    if( DungeonTileTypes[type] && DungeonTileTypes[type] > dominantType.occurs ) {
                        dominantType.occurs = DungeonTileTypes[type];
                        dominantType.type = type;
                    }
                }
				if((!this.fogOfWar) || (this.seenMap[i][j])|| (true))
				{
					/*if(dominantType.type && dominantType.type <22) {
					/*if(dominantType.type && dominantType.type <22) {
					//HACK to get rid of error
						if(dungeonTileSprite[dominantType.type])
						{
							dungeonTileSprite[dominantType.type].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
						}*/
					if(dominantType.type==DungeonTileType.BirdHead)
					{
						if(i<11)
						{
							dungeonTileSprite[dominantType.type].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
						}else
						{
							reverseBird.draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
						}
					}else if(dominantType.type&& (dominantType.type<24)&&(dominantType.type>19)){ //water
						dungeonTileSprite[20+tileani].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
					}else if (dominantType.type&& (dominantType.type<28)&&(dominantType.type>23)) { //lava
						dungeonTileSprite[24+tileani].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
					}else if(dungeonTileSprite[dominantType.type])//everything else
					{
						dungeonTileSprite[dominantType.type].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
					}else //for now draw still lava if problem
					{
							dungeonTileSprite[DungeonTileType.Lava].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
					}
					if(I.tiles[i][j].dug)
					{
						dugsprite.draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
					}
				}else
				{
					fogSprite[tileani].draw(can, (i-cam.tileX)*32/Math.pow(2,I.zoom-1)+xOffset, (j-cam.tileY)*32/Math.pow(2,I.zoom-1)+yOffset);
				}
            }
        }
		mapDirty=false;
		for(var p=0;p<this.stairs.length;p++)
		{
			if(this.stairs[p].hidden)
			{
				if(editMode)
				{
					can.globalAlpha=0.75;
				}
				dungeonTileSprite[DungeonTileType.GreenFloor].draw(can,this.stairs[p].x*32+xOffset,this.stairs[p].y*32+yOffset);
				if(editMode)
				{
					can.globalAlpha=1;
				}
			}
		}
		
		I.drawHoleEdges(can,cam);
		
		for(var p=0;p<this.exits.length;p++)
		{
			this.exits[p].draw(can,cam);
		}
		/*this.objects.sort(function(a, b) //todo not this every frame. only when changes. 
		{
			if(a.y>b.y)
			{
				return 1;
			}else if(a.y<b.y)
			{
				return -1;
			}else
			{
				/*if((a.type==ObjectID.PotStand) && ((b.type==ObjectID.Pot) || (b.type==ObjectID.Poop)))
				{
					return -1;
				}else if((b.type==ObjectID.PotStand) && (a.type==ObjectID.Pot))
				{
					return 1;
				}
				return 0;
			}
			
			return 0;
		});*/
		
		/*for(var p=0;p<this.objects.length;p++)
		{
			this.objects[p].draw(can,cam,xOffset,yOffset);
		}*/
	  };
	  
	I.darkenAdj=function(can,rxOffset,ryOffset) 
	{
		if((I.lampLighting) && (!editMode))
		{
			var lamps=0;
			var litLamps=0;
			for(var l=0;l<I.objects.length;l++)
			{
				if((I.objects[l].type==ObjectID.Lamp) || (I.objects[l].type==ObjectID.TallLamp)||(I.objects[l].type==ObjectID.Candle))
				{
					lamps++;
					if(I.objects[l].on)
					{
						litLamps++;
					}
				}
			}
			if(litLamps>1)
			{
				I.lightLevel=0;
			}else if(litLamps==1)
			{
				I.lightLevel=0.5;
			}else if(litLamps==0)
			{
				I.lightLevel=0.90;
			}
		}else
		{
			I.lightLevel=0;
		}
		var gar=can.globalAlpha;
		can.globalAlpha=I.lightLevel;
		can.fillStyle="black"; //maybe an RGB slight lighter than black? 
		for(var i=0;i<I.width;i++)
		{
			for(var j=0;j<I.height;j++)
			{
							
					can.fillRect(i*32+rxOffset,j*32+ryOffset,32,32);
			}
		}
		can.globalAlpha=gar;
	}
	
	I.darken=function(can,targ) //TODO: don't darken 6x6 grid from x-3 to x+3, 
	{
		var x=targ.x;
		var y=targ.y;
		//if(editMode){return;} //this was enabling lighting, somehow...
		if((I.lampLighting) && (!editMode))
		{
			var lamps=0;
			var litLamps=0;
			for(var l=0;l<I.objects.length;l++)
			{
				if((I.objects[l].type==ObjectID.Lamp)  || (I.objects[l].type==ObjectID.TallLamp)||(I.objects[l].type==ObjectID.Candle))
				{
					lamps++;
					if(I.objects[l].on)
					{
						litLamps++;
					}
				}
			}
			if(litLamps>1)
			{
				I.lightLevel=0;
			}else if(litLamps==1)
			{
				I.lightLevel=0.5;
			}else if(litLamps==0)
			{
				I.lightLevel=0.90;
			}
		}else
		{
			I.lightLevel=0;
		}
		can.globalAlpha=I.lightLevel;
		can.fillStyle="black"; //maybe an RGB slight lighter than black? 
		if(miles.deathAniTrack<2)
		{
			for(var i=-1;i<I.width+1;i++)
			{
				for(var j=-1;j<I.height+1;j++)
				{
					if((i>x-4) && (i<x+4) && (j>y-4) &&(j<y+4))
					{
						//don't draw!
					}else
					{			
						can.fillRect(i*32+xOffset+targ.xSmall,j*32+yOffset+targ.ySmall,32,32);
					}
				}
			}
			lightcirclesprite.draw(can,(x-3)*32+xOffset+targ.xSmall,(y-3)*32+yOffset+targ.ySmall);
			can.globalAlpha=I.lightLevel-0.30;
			if(I.lightLevel-0.30<0)
			{
				can.globalAlpha=0;
			}
			middlelightcirclesprite.draw(can,(x-3)*32+xOffset+targ.xSmall,(y-3)*32+yOffset+targ.ySmall);
			can.globalAlpha=I.lightLevel-0.50;
			if(I.lightLevel-0.50<0)
			{
				can.globalAlpha=0;
			}
			innerlightcirclesprite.draw(can,(x-3)*32+xOffset+targ.xSmall,(y-3)*32+yOffset+targ.ySmall);
		}else if((!miles.alive) && (miles.deadAniTrack==2))
		{
			for(var i=0;i<I.width;i++)
			{
				for(var j=0;j<I.height;j++)
				{
					
						can.fillRect(i*32+xOffset+targ.xSmall,j*32+yOffset+targ.ySmall,32,32);
				}
			}
		}
	}
	  
    I.clear =function(){
        for (i=0;i<ROOM_WIDTH; i++){
            for (j=0;j<ROOM_HEIGHT; j++){
                I.tiles[i][j]= new Tile();
                I.tiles[i][j].x=i;
                I.tiles[i][j].y=j;
            }
        }
    };
    
	 I.cleanSlate =function(){
        I.objects=new Array();
		I.doors= new Array();
		I.stairs=new Array();
		for (i=0;i<ROOM_WIDTH; i++){
            for (j=0;j<ROOM_HEIGHT; j++){
                I.tiles[i][j]= new Tile();
                I.tiles[i][j].x=i;
                I.tiles[i][j].y=j;
            }
        }
    };

    I.setTile = function (x,y,data) {
        I.tiles[x][y].data = data;
    };
    
	closeEnough=function(dba,tgb){
		if(Math.abs(dba[0]-tgb[0])>RGB_THRESHOLD)
		{
			return false;
		}
		if(Math.abs(dba[1]-tgb[1])>RGB_THRESHOLD)
		{
			return false;
		}
		if(Math.abs(dba[2]-tgb[2])>RGB_THRESHOLD)
		{
			return false;
		}
		return true;
	};

	
	I.addStair=function(x,y,up)
	{
		var mindy= new staircase(up);
		mindy.x=x;
		mindy.y=y;
		mindy.room=I;
		I.stairs.push(mindy);
		if(up)
		{
			I.tiles[mindy.x][mindy.y].data=DungeonTileType.UpStair;
		}else
		{
			I.tiles[mindy.x][mindy.y].data=DungeonTileType.DownStair;
		}
	};
	
	I.removeSpecificDoor=function(coor)
	{
		for(var i=0;i<I.exits.length;i++)
		{
			if(coor==I.exits[i])
			{
				if(coor.orientation==0)
				{
					I.tiles[coor.x][coor.y].data=14;
				}else if(coor.orientation==1)
				{
					I.tiles[coor.x][coor.y].data=16;
				}else if(coor.orientation==2)
				{
					I.tiles[coor.x][coor.y].data=17;
				}else if(coor.orientation==3)
				{
					I.tiles[coor.x][coor.y].data=15;
				}
				I.exits[i].exists=false;
				I.exits.splice(i,1);
				i--;
			}
		}
	}
	
	I.removeDoor=function(dir)
	{
		if(!I.hasDoor(dir))
		{
			return;
		}
		coor=I.getDoor(dir);
		if(coor.orientation==0)
		{
			I.tiles[coor.x][coor.y].data=14;
		}else if(coor.orientation==1)
		{
			I.tiles[coor.x][coor.y].data=16;
		}else if(coor.orientation==2)
		{
			I.tiles[coor.x][coor.y].data=17;
		}else if(coor.orientation==3)
		{
			I.tiles[coor.x][coor.y].data=15;
		}
		for(var i=0;i<I.exits.length;i++)
		{
			if(coor==I.exits[i])
			{
				I.exits[i].exists=false;
				console.log(I.exits[i].exists);
				I.exits.splice(i,1)
				i--;
			}
		}
	};
	I.addDoor=function(dir,x,y,type,link)
	{
		if(dir>3) {return;}
		
		//if(I.hasDoor(dir)) {return;}
		if(!x) {x=8;}
		if(!y) {y=6;}
		if(type==null) {type=0}
		if(dir==0)
		{
			var mindy= new door(0);
			mindy.x=x;
			mindy.y=1;
			mindy.type=type;
			mindy.exists=true;
			mindy.room=I;
			if(link)
			{
				mindy.dest=link;
			}
			I.exits.push(mindy);
			I.tiles[mindy.x][mindy.y].data=DungeonTileType.Door+type;
		}else if (dir==1)
		{
			var mindy= new door(1);
			mindy.x=18;
			mindy.y=y;
			mindy.type=type;
			mindy.exists=true;
			mindy.room=I;
			if(link)
			{
				mindy.dest=link;
			}
			I.exits.push(mindy);
			I.tiles[mindy.x][mindy.y].data=DungeonTileType.Door+type;
		}else if(dir==3)
		{
			var mindy= new door(3);
			mindy.x=1;
			mindy.y=y;
			mindy.type=type;
			mindy.exists=true;
			mindy.room=I;
			if(link)
			{
				mindy.dest=link;
			}
			I.exits.push(mindy);
			I.tiles[mindy.x][mindy.y].data=DungeonTileType.Door+type;
		}else if(dir==2)
		{
			var mindy= new door(2);
			mindy.x=x;
			mindy.y=13;
			mindy.type=type;
			mindy.exists=true;
			mindy.room=I;
			if(link)
			{
				mindy.dest=link;
			}
			I.exits.push(mindy);
			I.tiles[mindy.x][mindy.y].data=DungeonTileType.Door+type;
		}
		return mindy;
	};
	
	I.getSubMap=function(tilex1,tiley1,tilex2,tiley2)
	{
		var x=x2=y=y2=0;
		if(tilex1>tilex2)
		{
			x=tilex2;
			x2=tilex1;
		}else
		{
			x=tilex1;
			x2=tilex2;
		}
		
		if(tiley1>tiley2)
		{
			y=tiley2;
			y2=tiley1;
		}else
		{
			y=tiley1;
			y2=tiley2;
		}
		var snookle=new Map();
		snookle.width=x2-x;
		snookle.height=y2-y;
		snookle.tiles=new Array()
		for(var i=0;i<x2;i++)
		{
			snookle.tiles[i]=new Array();
			for(var j=0;j<y2;j++)
			{
				snookle.tiles[i][j]=this.tiles[x+i][y+j];
			}
		}
		return snookle;
	};
    return I;
}

