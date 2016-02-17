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
	this.numModes=5;
	this.numObjectTypes=49;
	this.numBrushTypes=72;
	this.objectType=0;
	this.numDoorTypes=6;
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
		if(this.lootType>509)
		{
			this.lootType=0;
		}else if((this.lootType>407) && (this.lootType<500))
		{
			this.lootType=500;
		}else if((this.lootType>300) && (this.lootType<411))
		{
			this.lootType=400;
		}else if((this.lootType>28) && (this.lootType<100))
		{
			this.lootType=300;
		}
	}else
	{
		this.lootType--;
		if(this.lootType<0)
		{
			this.lootType=509;
		}else if(this.lootType==499)
		{
			this.lootType=411;
		}else if(this.lootType==399)
		{
			this.lootType=300;
		}else if(this.lootType==299)
		{
			this.lootType=28;
		}
	}
}

editCursor.prototype.click=function(m,mx,my)
{
	if(m)
	{
		var tx=Math.floor((mx-xOffset)/32);
		var ty=Math.floor((my-yOffset)/32);
		this.x=tx;
		this.y=ty;
	}else
	{
		tx=this.x;
		ty=this.y;
	}
	if(editMode)
	{
		if(this.mode==editModes.SwitchLink)
		{
			this.x=tx;
			this.y=ty;
			var glork=null;
			for(var k=0;k<curDungeon.curRoom().objects.length;k++)
			{
				if((this.x==curDungeon.curRoom().objects[k].x) && (this.y==curDungeon.curRoom().objects[k].y))
				{
					glork=curDungeon.curRoom().objects[k];
					if(glork.type==ObjectID.Chest)
					{
						glork.hidden=true;
					}
				}
			}
			//if over door
			var dork=null;
			var pork=curDungeon.curRoom().getSpecificDoor(this.x,this.y-1,0)
			if(pork)
			{
				dork=pork;
			}
			pork=curDungeon.curRoom().getSpecificDoor(this.x+1,this.y,1)
			if(pork)
			{
				dork=pork;
			}
			pork=curDungeon.curRoom().getSpecificDoor(this.x,this.y+1,2)
			if(pork)
			{
				dork=pork;
			}
			pork=curDungeon.curRoom().getSpecificDoor(this.x-1,this.y,3)
			if(pork)
			{
				dork=pork;
			}
			//curDungeon.curRoom().exits[0];
			if(dork)
			{
				this.linkingTo=dork;
				this.mode=editModes.Objects;
				this.linkingFrom.dest.push(this.linkingTo);
				bConsoleBox.log("Linked switch to door");
			}else if((glork) && (glork.type!=ObjectID.ToggleSwitch) && (!glork.type!=ObjectID.EyeSwitch))//is over an object
			{
				this.linkingTo=glork;
				this.mode=editModes.Objects;
				this.linkingFrom.dest.push(this.linkingTo);
				bConsoleBox.log("Linked switch to "+glork.name);
			}else
			{
				for(var i=0;i<curDungeon.curRoom().stairs.length;i++)
				{
					if((curDungeon.curRoom().stairs[i].x==this.x) && (curDungeon.curRoom().stairs[i].y==this.y))
					{
						this.linkingTo=curDungeon.curRoom().stairs[i];
						this.mode=editModes.Objects;
						this.linkingFrom.dest.push(this.linkingTo);
						bConsoleBox.log("Linked switch to stairs at "+curDungeon.curRoom().stairs[i].x+","+curDungeon.curRoom().stairs[i].y);
						curDungeon.curRoom().stairs[i].hidden=true;
					}
				}
			}
		}else if((tx>-1) && (tx<20) && (ty>-1) &&(ty<15))
		{
			//this.penDown=false;
			this.x=tx;
			this.y=ty;
			if((MobileMode) && (!curDungeon.curRoom().active))
			{
				curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY);
				return;
			}
			else if(this.mode==editModes.ChestLoot)
			{
				var meg=isOverTiledList(curDungeon.curRoom().objects,32);
			
				if((meg)&&(meg.type==ObjectID.Chest))
				{
					meg.loot=this.lootType;
					bConsoleBox.log("Filled chest at "+meg.x+","+meg.y+" with "+objectName[this.lootType]);
				}
			}else if(this.mode==editModes.Stamp)
			{
				curDungeon.curRoom().tiles[this.x][this.y].data=this.brushType; 
				if((curDungeon.roomZ<1) &&(this.brushType==DungeonTileType.Hole))
				{
					curDungeon.curRoom().tiles[tx][ty].data=DungeonTileType.DeathHole;
					bConsoleBox.log("falling into this hole will be fatal, as there is no floor below."); 
				}else if ((curDungeon.roomZ>0) &&(!curDungeon.rooms[curDungeon.roomZ-1][curDungeon.roomX][curDungeon.roomY].active))
				{
					curDungeon.curRoom().tiles[tx][ty].data=DungeonTileType.DeathHole;
					bConsoleBox.log("falling into this hole will be fatal, as there is no active room below."); 
				}
				this.penDown=false;
				if(this.brushType==DungeonTileType.UpStair)
				{
					curDungeon.curRoom().addStair(this.x,this.y,true);
				}else if(this.brushType==DungeonTileType.DownStair)
				{
					curDungeon.curRoom().addStair(this.x,this.y,false);
				}
			}else if(this.mode==editModes.Fill)
			{
				if((this.brushType!=DungeonTileType.UpStair) && (this.brushType!=DungeonTileType.DownStair))
				{
					curDungeon.curRoom().fill(this.x,this.y,this.brushType);
					this.penDown=false;
					curDungeon.curRoom().setStairs();
				}else
				{
					bConsoleBox.log("Can't fill with stairs");
				}
			}else if((this.mode==editModes.Objects) || (this.mode==editModes.BuriedObjects))
			{
			
				if(this.mode==editModes.BuriedObjects)
				{
					if(!curDungeon.curRoom().digable(this.x,this.y,miles))
					{
						bConsoleBox.log("Ground is not digable","yellow");
						return;
					}
					if((this.objectType>99) && ((this.objectType<300)))
					{
						bConsoleBox.log("This item cannot be buried.","yellow");
						return false;
					}
				}
				var meg=isOverTiledList(curDungeon.curRoom().objects,32);
				if(meg)
				{
					meg.activateEdit();
					return;
				}else
				{
					var text=randomPhrases[Math.floor(Math.random()*randomPhrases.length)]
					if((this.objectType==ObjectID.Curtains)||(this.objectType==ObjectID.WallShield)||(this.objectType==ObjectID.EyeSwitch))//curtains
					{
						if(this.x<2) //left
						{
							makeObject(1,this.y,curDungeon.curRoom(),this.objectType);
							return;
						}else if(this.x>17) //right
						{
							makeObject(18,this.y,curDungeon.curRoom(),this.objectType);
							return;
						}else if(this.y<2) //top
						{
							makeObject(this.x,1,curDungeon.curRoom(),this.objectType);
							return;
						}else if(this.y>12) //bottom
						{
							makeObject(this.x,13,curDungeon.curRoom(),this.objectType);
							return;
						}else
						{
							bConsoleBox.log("Not the best spot for that.");
							return;
						}
					}else if(this.objectType==ObjectID.Warp)
					{
						var mikey =makeObject(tx,ty,curDungeon.curRoom(),this.objectType,text);
						if(this.warpOpen)
						{
							this.warpOpen.dest=mikey;
							this.warpOpen.curSprite=1;
							this.warpOpen.active=true;
							mikey.dest=this.warpOpen;
							mikey.active=true;
							mikey.curSprite=1;
							this.warpOpen=null;
						}else
						{
							this.warpOpen=mikey;
						}
					}else
					{
						//console.log("making object");
						var burtrussel=makeObject(tx,ty,curDungeon.curRoom(),this.objectType,text);
						if(this.mode==editModes.BuriedObjects)
						{
							burtrussel.buried=true;
						}
					}
				}
			
				
			}else if(this.mode==editModes.Pen)
			{
				this.penDown=!this.penDown;
			}if(this.mode==editModes.Door)
			{
				this.penDown=false;
				if(this.x==2) //left
				{
					var billpaxton=curDungeon.smartAddDoor(1,this.y,3,this.doorType);
					if(this.doorType==doorType.Curtains)
					{
						var kurtrussel = makeObject(1,this.y,curDungeon.curRoom(),ObjectID.Curtains);
						kurtrussel.hasSecret=true;
						billpaxton.on=true;
					}
				}else if(this.x==17) //right
				{
					curDungeon.smartAddDoor(18,this.y,1,this.doorType);
					if(this.doorType==doorType.Curtains)
					{
						var kurtrussel = makeObject(18,this.y,curDungeon.curRoom(),ObjectID.Curtains);
						kurtrussel.hasSecret=true;
					}
				}else if(this.y==2) //top
				{
					curDungeon.smartAddDoor(this.x,1,0,this.doorType);
					if(this.doorType==doorType.Curtains)
					{
						var kurtrussel = makeObject(this.x,1,curDungeon.curRoom(),ObjectID.Curtains);
						kurtrussel.hasSecret=true;
					}
				}else if(this.y==12) //bottom
				{
					curDungeon.smartAddDoor(this.x,13,2,this.doorType);
					if(this.doorType==doorType.Curtains)
					{
						var kurtrussel = makeObject(this.x,13,curDungeon.curRoom(),ObjectID.Curtains);
						kurtrussel.hasSecret=true;
					}
				}else
				{
					bConsoleBox.log("Not the best spot for a door.");
					return;
				}
			}
		}	
	}
	
	return;
}

editCursor.prototype.cycleTiles=function(up)
{
	if(up)
	{
		this.brushType++;
		if((this.brushType==9) && (OPTIONS.skipWallTiles))
		{
			this.brushType=18;
		}else if(this.brushType==21)
		{
			this.brushType=24;
		}else if(this.brushType==25)
		{
			this.brushType=44;
		}else if(this.brushType==63)//skip water animation tiles
		{
			this.brushType=70;
		}else if(this.brushType==73)//skip lava animation tiles.
		{
			this.brushType=0;
		}
	}else
	{
		this.brushType--;
		
		if((this.brushType==17) && (OPTIONS.skipWallTiles))
		{
			this.brushType=8;
		}else if(this.brushType==24)
		{
			this.brushType=20;
		}else if(this.brushType==43)
		{
			this.brushType=25;
		}else if(this.brushType==69)//skip water animation tiles
		{
			this.brushType=62;
		}else if(this.brushType==-1)//skip lava animation tiles.
		{
			this.brushType=72;
		}
	}
}

editCursor.prototype.cycleObjects=function(up)
{
	if(up)
	{
		this.objectType++;
		if(this.objectType>509)
		{
			this.objectType=0;
		}else if((this.objectType>411) && (this.objectType<500))
		{
			this.objectType=500;
		}else if((this.objectType>301) && (this.objectType<400))
		{
			this.objectType=400;
		}else if((this.objectType>215) && (this.objectType<300))
		{
			this.objectType=300;
		}else if((this.objectType>118) && (this.objectType<200))
		{
			this.objectType=200;
		}else if((this.objectType>28) && (this.objectType<100))
		{
			this.objectType=100;
		}
	}else
	{
		this.objectType--;
		if(this.objectType<0)
		{
			this.objectType=509;
		}else if(this.objectType==499)
		{
			this.objectType=411;
		}else if(this.objectType==399)
		{
			this.objectType=301;
		}else if(this.objectType==299)
		{
			this.objectType=215;
		}else if(this.objectType==199)
		{
			this.objectType=118;
		}else if(this.objectType==99)
		{
			this.objectType=28;
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