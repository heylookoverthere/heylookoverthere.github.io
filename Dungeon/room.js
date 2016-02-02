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
var doorTypes=6;

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
	}
}
	
var doorType={};
doorType.Regular=0;
doorType.Closed=1;
doorType.Locked=2;
doorType.Bombable=3;
doorType.Bombed=4;
doorType.Curtains=5;
	
function door(or,clone)
{
	if(!or){or=0;}
	this.x=0;
	this.y=0; 
	this.ctype=1;
	//this.source=sorc;
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
			return true;
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
			if((I.tiles[x][y].data==TileType.Water)) {return true;}
		}
		return false;
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
		if((aPlayer.canSwim) && ((I.tiles[x][y].data>19) && (I.tiles[x][y].data<24)))
		{
			return true;
		}
			//Serously wtf was I thinking with this. This is insane. 
			if(((I.tiles[x][y].data==DungeonTileType.FloorEighteen) ||I.tiles[x][y].data==DungeonTileType.FloorFifteen) ||(I.tiles[x][y].data==DungeonTileType.FloorSixteen) ||(I.tiles[x][y].data==DungeonTileType.FloorSeventeen)||(I.tiles[x][y].data==DungeonTileType.FloorTwelve) ||(I.tiles[x][y].data==DungeonTileType.FloorThirteen) ||(I.tiles[x][y].data==DungeonTileType.FloorFourteen) ||(I.tiles[x][y].data==DungeonTileType.FloorSeven) ||(I.tiles[x][y].data==DungeonTileType.FloorEight) ||(I.tiles[x][y].data==DungeonTileType.FloorNine) ||(I.tiles[x][y].data==DungeonTileType.FloorTen) ||(I.tiles[x][y].data==DungeonTileType.FloorEleven)|| (I.tiles[x][y].data==DungeonTileType.FloorFour) ||(I.tiles[x][y].data==DungeonTileType.FloorFive) ||(I.tiles[x][y].data==DungeonTileType.FloorSix) ||(I.tiles[x][y].data==DungeonTileType.FloorThree) ||(I.tiles[x][y].data==DungeonTileType.FloorTwo) ||(I.tiles[x][y].data==DungeonTileType.FloorOne) ||(I.tiles[x][y].data==DungeonTileType.GreenFloor) ||(I.tiles[x][y].data==DungeonTileType.UpStair)||(I.tiles[x][y].data==DungeonTileType.DownStair) ||(I.tiles[x][y].data==DungeonTileType.Unstable) ||(I.tiles[x][y].data==DungeonTileType.ReallyUnstable)||((I.tiles[x][y].data==DungeonTileType.Hole) && (!avoidHoles)) ||(I.tiles[x][y].data==DungeonTileType.Grass)||(I.tiles[x][y].data==DungeonTileType.Sand) ||(I.tiles[x][y].data==DungeonTileType.Ice))
			{
				for(var i=0;i<I.objects.length;i++)
				{
					//if((I.objects[i].x==x) && (I.objects[i].y==y))
					if((x>I.objects[i].x-1) && (x<I.objects[i].x+I.objects[i].width/32) && (y>I.objects[i].y-1) && (y<I.objects[i].y+I.objects[i].height/32))
					{
						if(!I.objects[i].walkable())
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
	
	I.digable=function(x,y)
	{
		if( (this.tiles[x][y].data==DungeonTileType.Sand) || (this.tiles[x][y].data==DungeonTileType.FloorEleven)||(this.tiles[x][y].data==DungeonTileType.Grass) ||(this.tiles[x][y].data==DungeonTileType.FloorThirteen))
		{
			return true;
		}//if eds shovel? 
		return false; 
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
		var ffset=4;
		var mitly=0;
		for(var i=1;i<numo*4+mitly;i+=ffset)
		{
			ffset=4;
			var higgins=new object(I);
			higgins.x=Math.floor(tempstring[i]);
			higgins.y=Math.floor(tempstring[i+1]);
			higgins.type=Math.floor(tempstring[i+2]);
			higgins.hidden=stringTrue(tempstring[i+3]);
			higgins.room=I;
			if(higgins.type==ObjectID.Sign)
			{
				higgins.text=tempstring[i+4];
				ffset=5;
				mitly++;
				higgins.setup(ObjectID.Sign,higgins.text);
			}else if(higgins.type==ObjectID.Chest)
			{
				higgins.loot=Math.floor(tempstring[i+4]);
				ffset=5;
				mitly++;
				higgins.setup();
			}else if(higgins.type==ObjectID.Lamp)
			{
				higgins.on=!stringTrue(tempstring[i+4]);
				ffset=5;
				mitly++;
				higgins.setup();
			}else if(higgins.type==ObjectID.Curtains)
			{
				higgins.hasSecret=stringTrue(tempstring[i+4]);
				ffset=5;
				mitly++;
				higgins.setup();
			}else if((higgins.type==ObjectID.BlueBlocker) ||(higgins.type==ObjectID.RedBlocker))
			{
				var nerp=tempstring[i+4]
				higgins.on=stringTrue(nerp);
				ffset=5;
				mitly++;
				higgins.setup();
			}else if((higgins.type==ObjectID.ToggleSwitch) || (higgins.type==ObjectID.EyeSwitch))
			{
				var nerp=tempstring[i+4] //number of dests
				var plerp=i+4;
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
				ffset=4+todestsp;//j*7;
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
			if(a.y>b.y)
			{
				return 1;
			}else if(a.y<b.y)
			{
				return -1;
			}else
			{
				if((a.type==ObjectID.PotStand) && (b.type==ObjectID.Pot))
				{
					return -1;
				}else if((b.type==ObjectID.PotStand) && (a.type==ObjectID.Pot))
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
		
		for(var p=0;p<this.objects.length;p++)
		{
			this.objects[p].draw(can,cam,xOffset,yOffset);
		}
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
	
	I.darken=function(can,x,y) //TODO: don't darken 6x6 grid from x-3 to x+3, 
	{
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
			for(var i=0;i<I.width;i++)
			{
				for(var j=0;j<I.height;j++)
				{
					if((i>x-4) && (i<x+4) && (j>y-4) &&(j<y+4))
					{
						//don't draw!
					}else
					{			
						can.fillRect(i*32+xOffset,j*32+yOffset,32,32);
					}
				}
			}
			lightcirclesprite.draw(can,(x-3)*32+xOffset,(y-3)*32+yOffset);
			can.globalAlpha=I.lightLevel-0.30;
			if(I.lightLevel-0.30<0)
			{
				can.globalAlpha=0;
			}
			middlelightcirclesprite.draw(can,(x-3)*32+xOffset,(y-3)*32+yOffset);
			can.globalAlpha=I.lightLevel-0.50;
			if(I.lightLevel-0.50<0)
			{
				can.globalAlpha=0;
			}
			innerlightcirclesprite.draw(can,(x-3)*32+xOffset,(y-3)*32+yOffset);
		}else if((!miles.alive) && (miles.deadAniTrack==2))
		{
			for(var i=0;i<I.width;i++)
			{
				for(var j=0;j<I.height;j++)
				{
					
						can.fillRect(i*32+xOffset,j*32+yOffset,32,32);
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

	I.buildRoom= function(name){
       // setTimeout(function() {
		if(!imageExists("images/"+name+".png"))
		{
			console.log("No "+"images/"+name+".png");
			I.active=false;
			return;
		}
		var imageObj = new Image();
		imageObj.onerror= function()
		{
			console.log("No "+"images/"+name+".png, creating null room");
			I.active=false;
			//return;
		};
		imageObj.onload = function()
		{
			mapCanvas.drawImage(imageObj, 0, 0);
			//ROOM_WIDTH=imageObj.width;
			//ROOM_HEIGHT=imageObj.height;	
			I.width=ROOM_WIDTH;
			I.height=ROOM_HEIGHT;
			mapBitmap = mapCanvas.getImageData(0, 0, ROOM_WIDTH, ROOM_HEIGHT);

			for( var i=0; i<ROOM_WIDTH * ROOM_HEIGHT * 4; i+=4 )
			{//TODO/PROBLEMMAPWIDTH?
			  var rgba = [mapBitmap.data[i], mapBitmap.data[i+1], mapBitmap.data[i+2], mapBitmap.data[i+3]];
			  var greenfloorrgb =[60,0,64,0];
			  var birdheadrgb =[128,128,0,0];
			  var oceanrgb =[0,0,255,0];
			  var greenwallrgb =[0,0,0,0];
			  var sandrgb =[255,255,0,0];
			  var doorrgb =[128,128,128,0];
			  var wallcornerargb = [64,64,0,0];
			  var wallcornerbrgb =[0,0,64,0];
			  var wallcornercrgb= [0,50,0,0];
			  var wallcornerdrgb= [50,50,0,0];
			  var walltoprgb = [30,30,0,0];
			  var wallbottomrgb= [30,0,0,0];
			  var wallleftrgb= [0,30,0,0];
			  var wallrightrgb=[0,0,30,0];
			  var greenbrickrgb =[0,128,0,0];
			  var swamprgb =[0,255,64,0];
			  var plainsrgb =[128,64,64,0];
			  var stonergb =[230,230,230,0];
			  var hillrgb =[0,75,75,0];
			  var icergb =[120,64,53,7];
			  var icemountainrgb=[205,205,205,0]
			  var orangebrickrgb=[20,205,20,0]
			  var waterrgb =[0,100,255,0];
			  var lavargb =[255,0,0,0];
			  var grassrgb=[0,165,0,0];
			  var upstairrgb =[240,240,240,0];
			  var downstairrgb=[220,245,220,0];
			  var yPos = Math.floor(i / 4 / ROOM_WIDTH);
			  var xPos = (i / 4) % ROOM_WIDTH;
			if(closeEnough(rgba,stonergb)) {
				I.setTile(xPos, yPos, DungeonTileType.Stone);
			  }else if (closeEnough(rgba,icergb)) {
				I.setTile(xPos, yPos, DungeonTileType.Ice);
			  }else if (closeEnough(rgba,greenfloorrgb)){
				I.setTile(xPos, yPos, DungeonTileType.GreenFloor);
			  }else if (closeEnough(rgba,orangebrickrgb)){
				I.setTile(xPos, yPos, DungeonTileTypeOrangeBrick);
			  } else if (closeEnough(rgba,birdheadrgb)){
				I.setTile(xPos, yPos, DungeonTileType.BirdHead);
			  } else if (closeEnough(rgba,sandrgb)){
				I.setTile(xPos, yPos, DungeonTileType.Sand);
			  } else if (closeEnough(rgba,waterrgb)){
				I.setTile(xPos, yPos, DungeonTileType.Water);
			  } else if (closeEnough(rgba,greenbrickrgb)){
				I.setTile(xPos, yPos, DungeonTileType.GreenBrick);
			  } else if (closeEnough(rgba,lavargb)){
				I.setTile(xPos, yPos, DungeonTileType.Lava);
			  }else if (closeEnough(rgba,grassrgb)) {
				I.setTile(xPos, yPos, DungeonTileType.Grass);
			  }else if (closeEnough(rgba,greenwallrgb)) {
				I.setTile(xPos, yPos, DungeonTileType.GreenWall);
			  }else if (closeEnough(rgba,upstairrgb)) {
				I.setTile(xPos, yPos, DungeonTileType.UpStair);
				var mindy= new staircase(true);
				mindy.x=xPos;
				mindy.y=yPos;
				mindy.exists=true;
				I.stairs.push(mindy);
			  }else if (closeEnough(rgba,downstairrgb)) {
				I.setTile(xPos, yPos, DungeonTileType.DownStair);
				var mindy= new staircase(false);
				mindy.x=xPos;
				mindy.y=yPos;
				mindy.exists=true;
				I.stairs.push(mindy);
			  }else if (closeEnough(rgba,doorrgb)) {
				I.setTile(xPos, yPos, DungeonTileType.Door);
				if(xPos==18)
				{
					var mindy= new door(1);
					mindy.x=xPos;
					mindy.y=yPos;
					I.exits.push(mindy);
				}else if(xPos==1)
				{
					var mindy= new door(3);
					mindy.x=xPos;
					mindy.y=yPos;
					I.exits.push(mindy);
				}else if(yPos==1)
				{
					var mindy= new door(0);
					mindy.x=xPos;
					mindy.y=yPos;
					I.exits.push(mindy);
				}else if (yPos==13)
				{
					var mindy= new door(2);
					mindy.x=xPos;
					mindy.y=yPos;
					I.exits.push(mindy);
				}
			  }else if (closeEnough(rgba,wallcornerargb)) {
				I.setTile(xPos, yPos, DungeonTileType.WallCornerA);
			  }else if (closeEnough(rgba,wallcornerbrgb)){
				I.setTile(xPos, yPos, DungeonTileType.WallCornerB);
			  } else if (closeEnough(rgba,wallcornercrgb)){
				I.setTile(xPos, yPos, DungeonTileType.WallCornerC);
			  } else if (closeEnough(rgba,wallcornerdrgb)){
				I.setTile(xPos, yPos, DungeonTileType.WallCornerD);
			  }else if (closeEnough(rgba,walltoprgb)){
				I.setTile(xPos, yPos, DungeonTileType.WallTop);
			  } else if (closeEnough(rgba,wallbottomrgb)){
				I.setTile(xPos, yPos, DungeonTileType.WallBottom);
			  } else if (closeEnough(rgba,wallleftrgb)){
				I.setTile(xPos, yPos, DungeonTileType.WallLeft);
			  } else if (closeEnough(rgba,wallrightrgb)){
				I.setTile(xPos, yPos, DungeonTileType.WallRight);
			  }else{
				I.setTile(xPos, yPos, DungeonTileType.Sand);
			  }
			}

        };
		imageObj.src = "images/"+name+".png";
		//}, 2000);
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

function editCursor()
{
	this.x=9;
	this.y=7; 
	this.sprite=Sprite("cursor");
	this.brush=0;
	this.brushType=0;
	this.doorType=0;
	this.lootType=0;
	this.penDown=false;
	this.penDownMode=false;
	this.confirming=false;
	this.confirmed=false;
	this.confirmingWhat=null;
	this.mode=1;
	this.numModes=4;
	this.numObjectTypes=49;
	this.numBrushTypes=61;
	this.objectType=0;
	this.numDoorTypes=5;
	this.clipBoard=new room();
	this.clipBoard.active=false;
	this.linkingTo=null;
	this.linkingFrom=null;
	this.grabbed=null; 
	this.warpOpen=null;
}

editCursor.prototype.cycleLoot=function(up)
{
	if(up)
	{
		this.lootType++;
		if(this.lootType>507)
		{
			this.lootType=0;
		}else if((this.lootType>407) && (this.lootType<500))
		{
			this.lootType=500;
		}else if((this.lootType>300) && (this.lootType<400))
		{
			this.lootType=400;
		}else if((this.lootType>20) && (this.lootType<100))
		{
			this.lootType=300;
		}
	}else
	{
		this.lootType--;
		if(this.lootType<0)
		{
			this.lootType=507;
		}else if(this.lootType==499)
		{
			this.lootType=407;
		}else if(this.lootType==399)
		{
			this.lootType=300;
		}else if(this.lootType==299)
		{
			this.lootType=20;
		}
	}
}

editCursor.prototype.cycleObjects=function(up)
{
	if(up)
	{
		this.objectType++;
		if(this.objectType>507)
		{
			this.objectType=0;
		}else if((this.objectType>408) && (this.objectType<500))
		{
			this.objectType=500;
		}else if((this.objectType>301) && (this.objectType<400))
		{
			this.objectType=400;
		}else if((this.objectType>210) && (this.objectType<300))
		{
			this.objectType=300;
		}else if((this.objectType>117) && (this.objectType<200))
		{
			this.objectType=200;
		}else if((this.objectType>22) && (this.objectType<100))
		{
			this.objectType=100;
		}
	}else
	{
		this.objectType--;
		if(this.objectType<0)
		{
			this.objectType=507;
		}else if(this.objectType==499)
		{
			this.objectType=408;
		}else if(this.objectType==399)
		{
			this.objectType=301;
		}else if(this.objectType==299)
		{
			this.objectType=210;
		}else if(this.objectType==199)
		{
			this.objectType=117;
		}else if(this.objectType==99)
		{
			this.objectType=22;
		}
		
	}
}

editCursor.prototype.clearConfirm=function()
{
	if(this.confirming)
	{
		bConsoleBox.log("Nevermind","Yellow");
	}
	this.grabbed=null;
	this.penDown=false;
	this.confirming=false;
	this.confirmingWhat=null;
	this.confirmed=false;
	
}

editCursor.prototype.draw=function(can)
{
	this.sprite.draw(can,this.x*32+xOffset,this.y*32+yOffset);
}

editCursor.prototype.getTile=function(cRoom)
{
	return cRoom.tiles[this.x][this.y];
}

editCursor.prototype.move=function(dir)
{
	if(dir==0) //up 
	{
		if(this.y>2)
		{
			this.y--;
		}
	}else if(dir==2) //down
	{
		if(this.y<12)
		{
			this.y++;
		}
	}else if(dir==3) //right
	{
		if(this.x>2)
		{
			this.x--;
		}
	}else if(dir==1) //left
	{
		if(this.x<17)
		{
			this.x++;
		}
	}
	
};