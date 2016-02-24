function dungeon(path)
{
	this.numRooms=0;
	this.rooms=new Array();
	this.roomX=7;
	this.roomY=7;
	this.roomZ=0;
	this.lastSaved=null;
	this.timeStarted=0;
	this.bestTime=999000;
	this.saveExists=false;
	this.startFloor=0;
	this.startX=7;
	this.startY=7;
	this.entities=entities;
	this.hasEdited=false;
	this.name=path;
	this.mapFloor=0;
	this.entranceFloor=0;
	this.width=new Array();
	this.height=new Array();
	this.depth=0; //254;
	this.maxFloors=99;
	this.floors=this.maxFloors;
	this.blueBlockers=new Array();
	this.redBlockers=new Array(); 
	for(var i=0;i<this.floors;i++)
	{
		this.width.push(15);
		this.height.push(8);
	}


	for(var p=this.depth;p<this.floors;p++)
	{
		this.rooms.push(new Array());
		for(var i=0;i<this.width[p];i++)
		{
			this.rooms[p].push(new Array());
			for(j=0;j<this.height[p];j++)
			{
				var edgar=new room();
				//var parth=path+"/floor"+String(p)+"/roomX"+String(i)+"Y"+String(j);
				//edgar.buildRoom(parth);
				edgar.active=false;
				edgar.name="roomX"+String(i)+"Y"+String(j);
				this.rooms[p][i].push(edgar);
			}
		 }
	}
	 this.rooms[this.roomZ][this.roomX][this.roomY].explored=true;

	this.curRoom=function(player)
	{
		return this.rooms[this.roomZ][this.roomX][this.roomY];
	}
	this.setRoom=function(z,x,y)
	{
		this.roomZ=z;
		this.roomX=x;
		this.roomY=y; 
	}
	
	this.changeRoom=function(dir,limited) 
	{
		floorDirty=true;
		this.busyrang=false;
		for(var i=0;i<miles.projectiles.length;i++)
		{
			if((miles.projectiles[i].type==1) || (miles.projectiles[i].type==2))
			{
				miles.projectiles[i].kill();
				miles.projectiles.splice(i,1);
				i--;
			}
		}
		//either way, check map boundries to prevent errors. then if limited, check that a player could actually go that way. 
		if(dir==0) //going north
		{
			if(this.roomY<1)
			{	
				bConsoleBox.log("That would take you off the map");
				return;
			}
			
			if((!this.rooms[this.roomZ][this.roomX][this.roomY-1].active) && (limited))
			{
				bConsoleBox.log("No valid room in that direction.");
				return; 
			}
			
			if((this.curRoom().hasDoor(0)) || (!limited))
			{
				var purd=this.curRoom().getSpecificDoor(miles.x,1,0);
				if((!purd) && (miles.x>2))
				{
					purd=this.curRoom().getSpecificDoor(miles.x-1,1,0);
				}
				
				if((purd) &&(purd.passable(miles)) || (!limited))
				{
					
					
					/*if((limited) && (OPTIONS.MouseControls))
					{
						var nard=this.curRoom().getPath(miles.x,miles.y,purd.x,3,miles,true);
						
						if((miles.x==purd.x) && (miles.y==3))
						{
							nard.push(0);
						}
					}
					
					if((purd) &&(nard)&&(nard.length>0) || (!limited))
					{*/
						//console.log(purd);
						if(limited)
						{
							//miles.x=purd.x+1;
							miles.y=12;
							miles.dir=0;
							//miles.xSmall=0;
							miles.ySmall=0;
						}
						this.roomY--;
						if(limited)
						{	
							this.curRoom().explored=true;
							this.curRoom().hidden=false;
							miles.room=curDungeon.curRoom();
							if(miles.grabbed)
							{
								miles.grabbed.changeRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY);
							}
						}
					/*}else
					{
						bConsoleBox.log("No path to door!");
						playSound("error");
					}*/
				}else
				{
					//bConsoleBox.log("No open door!");
					//playSound("error");
				}
			}else
			{
				bConsoleBox.log("No door!");
				playSound("error");
			}
		}else if(dir==2) //going south
		{
			if(this.roomY>this.getHeight()-2)
			{	
				bConsoleBox.log("That would take you off the map");
				return;
			}
			
			if((!this.rooms[this.roomZ][this.roomX][this.roomY+1].active) && (limited))
			{
				bConsoleBox.log("No valid room in that direction.");
				return; 
			}
			
			if((this.curRoom().hasDoor(2)) || (!limited))
			{
				var purd=this.curRoom().getSpecificDoor(miles.x,13,2);
				if((!purd) && (miles.x>2))
				{
					purd=this.curRoom().getSpecificDoor(miles.x-1,13,2);
				}
				
				if((purd) &&(purd.passable(miles)) || (!limited))
				{
					
					/*if(limited)
					{
						var nard=this.curRoom().getPath(miles.x,miles.y,purd.x,12,miles,true);
						
						if((miles.x==purd.x) && (miles.y==12))
						{
							nard.push(0);
						}
					}
					
					if((purd) &&(nard)&&(nard.length>0)|| (!limited))
					{*/
						if(limited)
						{
							//miles.x=purd.x+1;
							miles.y=2;
							miles.dir=2;
							//miles.xSmall=0;
							miles.ySmall=0;
						}
						this.roomY++;
						if(limited)
						{
							this.curRoom().explored=true;
							this.curRoom().hidden=false;
							miles.room=curDungeon.curRoom();
							if(miles.grabbed)
							{
								miles.grabbed.changeRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY);
							}
						}
					/*}else
					{
						bConsoleBox.log("No path to door!");
						playSound("error");
					}*/
				}else
				{
					//bConsoleBox.log("No open door!");
					//playSound("error");
				}
			}else
			{
				bConsoleBox.log("No door!");
				playSound("error");
			}
		}else if(dir==1) //going east
		{
			if(this.roomX>this.getWidth()-2)
			{	
				bConsoleBox.log("That would take you off the map");
				return;
			}
			
			if((!this.rooms[this.roomZ][this.roomX+1][this.roomY].active) && (limited))
			{
				bConsoleBox.log("No valid room in that direction.");
				return; 
			}
			
			if((this.curRoom().hasDoor(1)) || (!limited))
			{
				var purd=this.curRoom().getSpecificDoor(18,miles.y,1);
				if((!purd) && (miles.x>2))
				{
					purd=this.curRoom().getSpecificDoor(18,miles.y-1,1);
				}
				if((purd) && (purd.passable(miles)) || (!limited))
				{
					
					/*if(limited)
					{
						var nard=this.curRoom().getPath(miles.x,miles.y,17,purd.y,miles,true);
						
						if((miles.y==purd.y) && (miles.x==17))
						{
							nard.push(0);
						}
					}
					
					if((purd) &&(nard)&&(nard.length>0) || (!limited))
					{*/
						//console.log(purd);
						if(limited)
						{
							miles.x=2;
							//miles.y=purd.y
							miles.dir=1;
							miles.xSmall=0;
							//miles.ySmall=0;
						}
						this.roomX++;
						if(limited)
						{
							this.curRoom().explored=true;
							this.curRoom().hidden=false;
							miles.room=curDungeon.curRoom();
							if(miles.grabbed)
							{
								miles.grabbed.changeRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY);
							}
	
						}
					/*}else
					{
						bConsoleBox.log("No path to door!");
						playSound("error");
					}*/
				}else
				{
					//bConsoleBox.log("No open door!");
					//playSound("error");
				}
			}else
			{
				bConsoleBox.log("No door!");
				playSound("error");
			}
		}else if(dir==3) //going west
		{
			if(this.roomX<1) 
			{	
				bConsoleBox.log("That would take you off the map");
				return;
			}
			
			if((!this.rooms[this.roomZ][this.roomX-1][this.roomY].active) && (limited))
			{
				bConsoleBox.log("No valid room in that direction.");
				return; 
			}
			
			if((this.curRoom().hasDoor(3)) || (!limited))
			{
				var purd=this.curRoom().getSpecificDoor(1,miles.y,3);
				if((!purd) && (miles.x>1))
				{
					purd=this.curRoom().getSpecificDoor(1,miles.y-1,3);
				}
				
				if((purd) &&(purd.passable(miles)) || (!limited))
				{
					
					
					/*if(limited)
					{
						var nard=this.curRoom().getPath(miles.x,miles.y,3,purd.y,miles,true);					
						if((miles.y==purd.y) && (miles.x==3))
						{
							nard.push(0);
						}
					}
					
					if((purd) &&(nard)&&(nard.length>0) || (!limited))
					{
						//console.log(purd);
							*/
						if(limited)
						{
							miles.x=17;
							//miles.y=purd.y;
							miles.dir=3;
							miles.xSmall=0;
							//miles.ySmall=0;
						}
						this.roomX--;
						if(limited)
						{
							this.curRoom().explored=true;
							this.curRoom().hidden=false;
							miles.room=curDungeon.curRoom();
							if(miles.grabbed)
							{
								miles.grabbed.changeRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY);
							}
	
						}
					/*}else
					{
						bConsoleBox.log("No path to door!");
						playSound("error");
					}*/
				}else
				{
					//bConsoleBox.log("No open door!");
					//playSound("error");
				}
			}else
			{
				bConsoleBox.log("No door!");
				playSound("error");
			}
		}

		miles.enteredX=miles.x;
		miles.enteredY=miles.y;

	}
	
	this.useDoor=function(which) //link to other doors
	{
		
	}
	this.getWidth=function()
	{
		//return(this.width[this.roomZ]);
		return 15;
	}
	 this.getHeight=function()
	{
		//return(this.height[this.roomZ]);
		return 8;
	}
	this.stringifyFloor=function(fl)
	{
		if(fl==null) {fl=this.roomZ;}
		var tempstring= "";
		for (i=0;i<this.getWidth(); i++)
		{
			for (j=0;j<this.getHeight(); j++)
			{
				if(this.rooms[fl][i][j].active)
				{
					tempstring = tempstring +"1"
					tempstring += ","
				}else
				{
					tempstring = tempstring +"0"
					tempstring += ","
				}
			}
		}
		return tempstring;
	}
	
	this.saveFloor=function(fl)
	{
		this.removeDeadLinks(fl);
		var jmath="Dungeon/dungeons/"+this.name+"/"+"floor"+fl+"/"+"map.txt";
			$.post("/save/", {"data": this.stringifyFloor(fl), "path": jmath}).done(function(response) { bConsoleBox.log("Saved " +jmath); });
		for(var i=0;i<this.getWidth();i++)
		{
			for(var j=0;j<this.getHeight();j++)
			{
				if(this.rooms[fl][i][j].active)
				{
					this.rooms[fl][i][j].save("Dungeon/dungeons/"+this.name+"/"+"floor"+fl+"/");
					this.rooms[fl][i][j].saveObjects("Dungeon/dungeons/"+this.name+"/"+"floor"+fl+"/");
				}
			}
		}
			
	}
	
	this.loadFloor=function(fl)
	{
		if(fl==null)
		{
			fl=this.roomZ;
		}
		var sbath="dungeons/"+curDungeon.name+"/"+"floor"+fl+"/"+"map.txt";
		var dung=this;
		$.get(sbath, function(data) 
		{
			tempstring=data.split(",");
			for(var i=0;i<dung.getWidth();i++)
			{
				for(var j=0;j<dung.getHeight();j++)
				{
					if(tempstring[j+(dung.getHeight())*i]==1)
					{
						dung.rooms[fl][i][j].name="roomX"+String(i)+"Y"+String(j);
						dung.rooms[fl][i][j].load("dungeons/"+dung.name+"/"+"floor"+fl+"/");
						dung.rooms[fl][i][j].z=fl;
						dung.rooms[fl][i][j].x=i;
						dung.rooms[fl][i][j].y=j;
						dung.rooms[fl][i][j].active=true;
						dung.rooms[fl][i][j].loadObjects("dungeons/"+dung.name+"/"+"floor"+fl+"/");
						dung.numRooms++;
					}else
					{
						//console.log("yar");
					}
				}
			}
			bConsoleBox.log("Loaded Dungeon/"+sbath); 
		});  
		
		
	};
	
	dungeon.prototype.addFloor=function()
	{
		this.floors++;
		/*this.rooms.push(new Array());
		
		for(var i=0;i<this.getWidth();i++)
		{
			this.rooms[this.floors].push(new Array());
			for(var j=0;j<this.getHeight();j++)
			{
				this.rooms[this.floors][i].push(new room());
			}
		}*/
	
		this.rooms.push(new Array());
		for(var i=0;i<this.getWidth();i++)
		{
			this.rooms[this.floors-1].push(new Array());
			for(j=0;j<this.getHeight();j++)
			{
				var edgar=new room();
				edgar.active=false;
				edgar.name="roomX"+String(i)+"Y"+String(j);
				this.rooms[this.floors-1][i].push(edgar);
			}
		 }
	
	}
	
	dungeon.prototype.blank=function()
	{
		this.rooms=new Array();
		for(var p=this.depth;p<this.floors;p++)
		{
			this.rooms.push(new Array());
			for(var i=0;i<this.width[p];i++)
			{
				this.rooms[p].push(new Array());
				for(j=0;j<this.height[p];j++)
				{
					var edgar=new room();
					//var parth=path+"/floor"+String(p)+"/roomX"+String(i)+"Y"+String(j);
					//edgar.buildRoom(parth);
					//edgar.name="roomX"+String(i)+"Y"+String(j);
					edgar.fillAll(1);
					edgar.active=false;
					this.rooms[p][i].push(edgar);
				}
			 }
		}
	}
	
	dungeon.prototype.save=function() 
	{
		//read main dungeon file, determine how many floors.
		
		var dung=this;
	
		
		dung.lastSaved=new Date();
		grmath="Dungeon/dungeons/"+this.name+"/main.txt";
		bgrmath="Dungeon/dungeons/"+this.name+"/entities.txt";
		var dunpth=curVersion+","+dung.floors+","+dung.numRooms+","+dung.startFloor+","+dung.startX+","+dung.startY+","+dung.lastSaved;
			$.post("/save/", {"data": dunpth, "path": grmath}).done(function(response) 
			{ 
				bConsoleBox.log("Saved " +grmath); 

			});
			for(var i=0;i<dung.floors;i++)
			{
				dung.saveFloor(i);
			}
			
			var junpth=(entities.length-1)+";";
			
			for( var i=0;i<entities.length;i++)
			{
				if(!entities[i].isPlayer)
				{
					junpth+=entities[i].stringify();
					junpth+=";";
				}
			}
			
			$.post("/save/", {"data": junpth, "path": bgrmath}).done(function(response) 
			{ 
				bConsoleBox.log("Saved " +bgrmath); 

			});
		//dung.blank();
		if(!dung.saveExists)
		{
			/*$.post("/listdir/", {"path": "C:/JS/Dungeon/dungeons/"}, function(resp)
			 {
				existingDungeons=resp.split(",");
				existingDungeons.splice(0,1);*/
				dung.saveExists=true;
				//need to do something to expand LOAD_COUNTS and existing dungeons
				/*//LOAD_COUNTS=new Array();
				LOAD_COUNTS.push(0);
				for( var i=0;i<existingDungeons.length;i++)
				 {
					 var crmath="dungeons/"+existingDungeons[i]+"/"+"main.txt";
							$.get(crmath, function(data) 
							{	
								var bata=data.split(",");
								LOAD_COUNTS[i]=Math.floor(bata[1]);
								
							});
				 }
			})*/
			var smoth="Dungeon/dungeons/"+curDungeon.name+"/score.txt";
			$.post("/save/", {"data": 999000, "path": smoth}).done(function(response) { bConsoleBox.log("Created default high score file at " +smoth); });
			bConsoleBox.log("refresh page before attempting to load another map.","yellow")
		}
		dung.lastSaved=new Date();
		var index=existingDungeons.indexOf(curDungeon.name);
		LOAD_COUNTS[index]=curDungeon.numRooms;
	}
	
	dungeon.prototype.load=function() 
	{
		var dung=this;
		isLoading=true;
		dung.cleanSlate();
		dung.saveExists=true;
		//read main dungeon file, determine how many floors.
		var vcrmath="dungeons/"+this.name+"/"+"score.txt";
		$.get(vcrmath, function(data)
		{
			dung.bestTime=data//new Date(data);
		});
		var crmath="dungeons/"+this.name+"/"+"main.txt";
		$.get(crmath, function(data) 
		{ 
			//console.log("Detected "+data+" floors"); 
			var smarf=data.split(",");
			if(curVersion!=smarf[0])
			{
				isLoading=false;
				bConsoleBox.log("WARNING: MAP VERSION NOT COMPATIBALE","red");
				return;
			}
			dung.floors=Math.floor(smarf[1]);
			dung.startFloor=Math.floor(smarf[3]);
			dung.roomZ=dung.startFloor;
			dung.startX=Math.floor(smarf[4]);
			dung.startY=Math.floor(smarf[5]);
			dung.lastSaved=new Date(smarf[6]);
			dung.roomX=dung.startX;
			dung.roomY=dung.startY;
			for(var i=0;i<dung.floors;i++)
			{
				dung.loadFloor(i);
			}
			
		}); 
		
		//dung.blank();

	}
	
	this.smartAddStair=function(x,y,up,croom)
	{ //todo, add other stair.
		if(!croom) {croom=this.curRoom();}
		var mindy= new staircase(up);
		mindy.x=x;
		mindy.y=y;
		croom.stairs.push(mindy);
		if(up)
		{
			croom.tiles[mindy.x][mindy.y].data=DungeonTileType.UpStair;
		}else
		{
			croom.tiles[mindy.x][mindy.y].data=DungeonTileType.DownStair;
		}
	};
	
	this.smartRemoveDoor=function(fl,x,y,dir)
	{
		if(!this.rooms[fl][x][y].hasDoor(dir))
		{
			return;
		}
		var coor=this.rooms[fl][x][y].getDoor(dir);
		if(!coor) {return;}
		if(coor.orientation==0)
		{
			this.rooms[fl][x][y].tiles[coor.x][coor.y].data=14;
			if((y>0) && (this.rooms[fl][x][y-1].active))
			{
				var thedoor=this.rooms[fl][x][y-1].getSpecificDoor(coor.x,13,2);
				if(thedoor)
				{
					this.rooms[fl][x][y-1].removeSpecificDoor(thedoor);
					thedoor.exists=false;
				}
			}

		}else if(coor.orientation==1)
		{
			this.rooms[fl][x][y].tiles[coor.x][coor.y].data=16;
			if((x+1<this.getWidth())  && (this.rooms[fl][x+1][y].active))
			{
				var thedoor=this.rooms[fl][x+1][y].getSpecificDoor(1,coor.y,3);
				if(thedoor)
				{
					this.rooms[fl][x+1][y].removeSpecificDoor(thedoor);
					thedoor.exists=false;
				}
			}

		}else if(coor.orientation==2)
		{
			this.rooms[fl][x][y].tiles[coor.x][coor.y].data=17;
			if((y+1<this.getHeight())  && (this.rooms[fl][x][y+1].active))
			{
				var thedoor=this.rooms[fl][x][y+1].getSpecificDoor(coor.x,1,0);
				if(thedoor)
				{
					this.rooms[fl][x][y+1].removeSpecificDoor(thedoor);
					thedoor.exists=false;
				}
			}
		}else if(coor.orientation==3)
		{
			this.rooms[fl][x][y].tiles[coor.x][coor.y].data=15;
			if((x>0) &&(this.rooms[fl][x-1][y].active))
			{
				var thedoor=this.rooms[fl][x-1][y].getSpecificDoor(18,coor.y,1);
				if(thedoor)
				{
					this.rooms[fl][x-1][y].removeSpecificDoor(thedoor);
					thedoor.exists=false;
				}
			}
		}
		for(var i=0;i<this.rooms[fl][x][y].exits.length;i++)
		{
			if(coor==this.rooms[fl][x][y].exits[i])
			{
				this.rooms[fl][x][y].exits[i].exists=false;
				this.rooms[fl][x][y].exits.splice(i,1)
				i--;
			}
		}
	};
	
	this.getObject=function(mupple)
	{
		if(mupple.ctype==1)
		{
			for(var v=0;v<this.rooms[mupple.roomZ][mupple.roomX][mupple.roomY].exits.length;v++)
			{
				if((this.rooms[mupple.roomZ][mupple.roomX][mupple.roomY].exits[v].x==mupple.x) && (this.rooms[mupple.roomZ][mupple.roomX][mupple.roomY].exits[v].y==mupple.y) && (this.rooms[mupple.roomZ][mupple.roomX][mupple.roomY].exits[v].type==mupple.type) )
				{
					return this.rooms[mupple.roomZ][mupple.roomX][mupple.roomY].exits[v];
				}	
			}
		}if(mupple.ctype==2)
		{
			for(var v=0;v<this.rooms[mupple.roomZ][mupple.roomX][mupple.roomY].stairs.length;v++)
			{
				if((this.rooms[mupple.roomZ][mupple.roomX][mupple.roomY].stairs[v].x==mupple.x) && (this.rooms[mupple.roomZ][mupple.roomX][mupple.roomY].stairs[v].y==mupple.y))
				{
					
					//hack
					this.rooms[mupple.roomZ][mupple.roomX][mupple.roomY].stairs[v].hidden=true;
					return this.rooms[mupple.roomZ][mupple.roomX][mupple.roomY].stairs[v];
				}	
			}
		}else
		{
			for(var v=0;v<this.rooms[mupple.roomZ][mupple.roomX][mupple.roomY].objects.length;v++)
			{
				if((this.rooms[mupple.roomZ][mupple.roomX][mupple.roomY].objects[v].x==mupple.x) && (this.rooms[mupple.roomZ][mupple.roomX][mupple.roomY].objects[v].y==mupple.y) && (this.rooms[mupple.roomZ][mupple.roomX][mupple.roomY].objects[v].type==mupple.type))
				{
					return this.rooms[mupple.roomZ][mupple.roomX][mupple.roomY].objects[v];
				}
			}
		}
		return false;
	}
	
	this.removeDeadLinks=function(fl)
	{
		//TODO
		for(var i=0;i<this.getWidth();i++)
		{
			for(var j=0;j<this.getHeight();j++)
			{
				for(var v=0;v<this.rooms[fl][i][j].objects.length;v++)
				{
					if(!this.rooms[fl][i][j].objects[v].dest) {continue;} //whhy
					for(var l=0;l<this.rooms[fl][i][j].objects[v].dest.length;l++)
					{
						if(!this.rooms[fl][i][j].objects[v].dest[l].exists)
						{
							this.rooms[fl][i][j].objects[v].dest.splice(l,1);
							l--;
						}
					}
				}
			}
			
		}
	}
	
	this.linkSwitches=function(fl)
	{
		
		for(var i=0;i<this.getWidth();i++)
		{
			for(var j=0;j<this.getHeight();j++)
			{
				for(var v=0;v<this.rooms[fl][i][j].objects.length;v++)
				{
					if((this.rooms[fl][i][j].objects[v].type==ObjectID.ToggleSwitch) || (this.rooms[fl][i][j].objects[v].type==ObjectID.EyeSwitch)|| (this.rooms[fl][i][j].objects[v].type==ObjectID.HoldSwitch)) //top
					{
						for(var f=0;f<this.rooms[fl][i][j].objects[v].linkDescriptions.length;f++)
						{
							var narp=this.getObject(this.rooms[fl][i][j].objects[v].linkDescriptions[f],true);
							if(narp)
							{
								this.rooms[fl][i][j].objects[v].dest.push(narp);
							}
							
						}
					}
				}
			}
		}
	}
	this.linkDoors=function(fl)
	{
		
		for(var i=0;i<this.getWidth();i++)
		{
			for(var j=0;j<this.getHeight();j++)
			{
				for(var v=0;v<this.rooms[fl][i][j].exits.length;v++)
				{
					if(this.rooms[fl][i][j].exits[v].type==doorType.Curtains)
					{
						for(var h=0;h<this.rooms[fl][i][j].objects.length;h++)
						{
							if((this.rooms[fl][i][j].objects[h].type==ObjectID.Curtains) && (this.rooms[fl][i][j].objects[h].x==this.rooms[fl][i][j].exits[v].x) && (this.rooms[fl][i][j].objects[h].y==this.rooms[fl][i][j].exits[v].y))
							{
								this.rooms[fl][i][j].exits[v].on=true;
							}
						}
					}
					if(this.rooms[fl][i][j].exits[v].orientation==0) //top
					{
						if((j>0) && (this.rooms[fl][i][j-1].active))
						{
							var somedoors=this.rooms[fl][i][j-1].getDoors(2);
							var thedoor=null;
							//console.log(somedoors);
							for(var k=0;k<somedoors.length;k++)
							{
								
								//console.log(somedoors[k],this.rooms[fl][i][j].exits[v]);
								if(somedoors[k].x==this.rooms[fl][i][j].exits[v].x)
								{
									thedoor=somedoors[k];									
								}
							}
							if(thedoor)
							{
								this.rooms[fl][i][j].exits[v].dest=thedoor;
							}
						}
					}
					if(this.rooms[fl][i][j].exits[v].orientation==1) //right
					{
						if((i<this.getWidth()-1) && (this.rooms[fl][i+1][j].active))
						{
							var somedoors=this.rooms[fl][i+1][j].getDoors(3);
							var thedoor=null;
							//console.log(somedoors);
							for(var k=0;k<somedoors.length;k++)
							{
								
								//console.log(somedoors[k],this.rooms[fl][i][j].exits[v]);
								if(somedoors[k].y==this.rooms[fl][i][j].exits[v].y)
								{
									thedoor=somedoors[k];									
								}
							}
							if(thedoor)
							{
								this.rooms[fl][i][j].exits[v].dest=thedoor;
							}
						}
					}
					if(this.rooms[fl][i][j].exits[v].orientation==2) //bottom
					{
						if((j<this.getHeight()-1) && (this.rooms[fl][i][j+1].active))
						{
							var somedoors=this.rooms[fl][i][j+1].getDoors(0);
							var thedoor=null;
							//console.log(somedoors);
							for(var k=0;k<somedoors.length;k++)
							{
								
								//console.log(somedoors[k],this.rooms[fl][i][j].exits[v]);
								if(somedoors[k].x==this.rooms[fl][i][j].exits[v].x)
								{
									thedoor=somedoors[k];									
								}
							}
							if(thedoor)
							{
								this.rooms[fl][i][j].exits[v].dest=thedoor;
							}
						}
					}
					if(this.rooms[fl][i][j].exits[v].orientation==3) //left
					{
						if((i>0) && (this.rooms[fl][i-1][j].active))
						{
							var somedoors=this.rooms[fl][i-1][j].getDoors(1);
							var thedoor=null;
							//console.log(somedoors);
							for(var k=0;k<somedoors.length;k++)
							{
								
								//console.log(somedoors[k],this.rooms[fl][i][j].exits[v]);
								if(somedoors[k].y==this.rooms[fl][i][j].exits[v].y)
								{
									thedoor=somedoors[k];									
								}
							}
							if(thedoor)
							{
								this.rooms[fl][i][j].exits[v].dest=thedoor;
							}
						}
					}
				}
			}
			
		}
	};
	
	this.checkLinks=function()//run before saving. make sure nobody is linking to null. 
	{
	 // Really need to get on that. 
	}
	
	this.changeFloor=function(up,limited,aplayer)
	{
		floorDirty=true;
		this.busyrang=false;
		for(var i=0;i<miles.projectiles.length;i++)
		{
			if(miles.projectiles[i].type==1)
			{
				miles.projectiles[i].kill();
				miles.projectiles.splice(i,1);
				i--;
			}
		}
		if(up)
		{
			if(this.roomZ>this.floors-2)
			{
				bConsoleBox.log("Already on top floor");
				playSound("error");
				return;
			}
			
			if((this.roomX>this.width[this.roomZ+1]-1) || (this.roomY>this.height[this.roomZ+1]-1))
			{
				bConsoleBox.log("would be off that floor's map boundaries");
				playSound("error");
				return;
			}
			
			if((limited) && (!this.rooms[this.roomZ+1][this.roomX][this.roomY].active)){
				bConsoleBox.log("No active room above");
				playSound("error");
				return;
			}
			if((this.curRoom().hasStairs(true)) || (!limited))
			{
				this.roomZ++;
				this.enteredX=this.x;
				this.enteredY=this.y;
				aplayer.enteredX=aplayer.x;
				aplayer.enteredY=aplayer.y;
				if(limited)
				{
					playSound("stairsup");
					miles.room=curDungeon.curRoom();
					if(miles.grabbed)
					{
						miles.grabbed.changeRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY);
					}
				}
				this.rooms[this.roomZ][this.roomX][this.roomY].explored=true;
				this.rooms[this.roomZ][this.roomX][this.roomY].hidden=false;
			}else
			{
				bConsoleBox.log("No stairs going up.");
				playSound("error");
			}
	
		}else
		{
			if(this.roomZ<1) 
			{
				bConsoleBox.log("Already on lowest floor");
				playSound("error");
				return
			}
			
			if((this.roomX>this.width[this.roomZ-1]-1) || (this.roomY>this.height[this.roomZ-1]-1))
			{
				bConsoleBox.log("would be off that floor's map boundaries");
				playSound("error");
				return;
			}
			
			if((!this.rooms[this.roomZ-1][this.roomX][this.roomY].active) && (limited))
			{
				bConsoleBox.log("No active room below");
				playSound("error");
				return;
			}
			
			if((this.curRoom().hasStairs(false)) || (!limited))
			{
				this.roomZ--;
				this.enteredX=this.x;
				this.enteredY=this.y;
				aplayer.enteredX=aplayer.x;
				aplayer.enteredY=aplayer.y;
				if(limited)
				{
					playSound("stairsdown");
					miles.room=curDungeon.curRoom();
					if(miles.grabbed)
					{
						miles.grabbed.changeRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY);
					}
				}
				if(limited)
				{
					this.rooms[this.roomZ][this.roomX][this.roomY].explored=true;
					this.rooms[this.roomZ][this.roomX][this.roomY].hidden=false
				}
			}else
			{
				bConsoleBox.log("No stairs going down.");
				playSound("error");
			}
		}
		
	}
	
	dungeon.prototype.smartAddDoor=function(x,y,dir,type,croom)
	{
		if(type==null) {type=0;}
		if(dir>3) {return;}
		if(this.curRoom().getSpecificDoor(x,y,dir)) {bConsoleBox.log("Already has door in that spot.","yellow"); return;}
		//todo should probably still allow creation of door on other side, if it doesn't exist. not too worried about it cause that should happen
		if(!croom)
		{
			croom=this.curRoom();
		}
		//if(croom.hasDoor(dir)) {return;}
		if(dir==0)
		{
			var mindy= new door(0);
			mindy.x=x;
			mindy.y=1;
			mindy.type=type;
			mindy.room=croom;
			mindy.exists=true;
			croom.exits.push(mindy);
			croom.tiles[mindy.x][mindy.y].data=DungeonTileType.Door+type;
			if((this.roomY>0) && (this.rooms[this.roomZ][this.roomX][this.roomY-1].active))
			{
				mindy.dest=this.rooms[this.roomZ][this.roomX][this.roomY-1].addDoor(2,x,13,type,mindy);
			}else
			{
				bConsoleBox.log("Warning: Door not linked. No room","Yellow");
			}
		}else if (dir==1)
		{
			var mindy= new door(1);
			mindy.x=18;
			mindy.y=y;
			mindy.type=type;
			mindy.room=croom;
			mindy.exists=true;
			croom.exits.push(mindy);
			croom.tiles[mindy.x][mindy.y].data=DungeonTileType.Door+type;
			if((this.roomX<this.getWidth()-1) && (this.rooms[this.roomZ][this.roomX+1][this.roomY].active))
			{
				mindy.dest=this.rooms[this.roomZ][this.roomX+1][this.roomY].addDoor(3,1,y,type,mindy);
			}else
			{
				bConsoleBox.log("Warning: Door not linked. No room","Yellow");
			}
		}else if(dir==3)
		{
			var mindy= new door(3);
			mindy.x=1;
			mindy.y=y;
			mindy.type=type;
			mindy.room=croom;
			mindy.exists=true;
			croom.exits.push(mindy);
			croom.tiles[mindy.x][mindy.y].data=DungeonTileType.Door+type;
			if((this.roomX>0) && (this.rooms[this.roomZ][this.roomX-1][this.roomY].active))
			{
				mindy.dest=this.rooms[this.roomZ][this.roomX-1][this.roomY].addDoor(1,18,y,type,mindy);
			}else
			{
				bConsoleBox.log("Warning: Door not linked. No room","Yellow");
			}
		}else if(dir==2)
		{
			var mindy= new door(2);
			mindy.x=x;
			mindy.y=13;
			mindy.type=type;
			mindy.exists=true;
			mindy.room=croom;
			croom.exits.push(mindy);
			croom.tiles[mindy.x][mindy.y].data=DungeonTileType.Door+type;
			if((this.roomY<this.getHeight()-1) && (this.rooms[this.roomZ][this.roomX][this.roomY+1].active))
			{
				mindy.dest=this.rooms[this.roomZ][this.roomX][this.roomY+1].addDoor(0,x,1,type,mindy);
			}else
			{
				bConsoleBox.log("Warning: Door not linked. No room","Yellow");
			}
		}
		return mindy;
	};
	
	this.cleanSlate=function()
	{
		for (var i=0;i<this.floors;i++)
		{
			this.wipeFloor(i);
		}
		this.floors=0;
		this.roomZ=0;
		this.roomX=7;
		this.roomY=7;
		this.numRooms=0;
		//this.name="blank";
	}
	
	this.wipeFloor=function(fl)
	{
		for(var i=0;i<this.getWidth();i++)
		{
			for(var j=0;j<this.getHeight();j++)
			{
				this.rooms[fl][i][j].redoWalls();
				this.rooms[fl][i][j].fillAll(DungeonTileType.GreenFloor);
				this.rooms[fl][i][j].active=false; 
				this.rooms[fl][i][j].explored=false; 
				this.rooms[fl][i][j].lightLevel=0.00;
				this.rooms[fl][i][j].lights=new Array();
				this.rooms[fl][i][j].fires=new Array();
				this.rooms[fl][i][j].stairs=new Array();
				this.rooms[fl][i][j].exits=new Array();
				this.rooms[fl][i][j].objects=new Array();
			}
		}
	};
	
	this.drawAdjacent=function(can,cam)
	{
		if(this.curRoom().lightLevel>0)
		{
			return;
		}
		if(!MobileMode)
		{
		var tyOffset=-331; //top
	
		if((this.roomY>0) && (this.rooms[this.roomZ][this.roomX][this.roomY-1].active) && (!this.rooms[this.roomZ][this.roomX][this.roomY-1].hidden))
		{
			for (i=0;i<ROOM_WIDTH; i++)
			{
				for (j=ROOM_HEIGHT-4;j<ROOM_HEIGHT; j++)
				{
					var aTile=this.rooms[this.roomZ][this.roomX][this.roomY-1].tiles[i][j];
					if(aTile.data==DungeonTileType.BirdHead)
					{
						if(i<11)
						{
							dungeonTileSprite[aTile.data].draw(can, i*32+xOffset, j*32+tyOffset);
						}else
						{
							reverseBird.draw(can, i*32+xOffset, j*32+tyOffset);
						}
					}else if ((aTile&& aTile<24) && (aTile.data>19))
					{
						dungeonTileSprite[20+tileani].draw(can, (i-0)*32+xOffset, (j-0)*32+tyOffset);
					}else if ((aTile&& aTile<28) &&(aTile.data>23))
					{
						dungeonTileSprite[24+tileani].draw(can, (i-0)*32+xOffset, (j-0)*32+tyOffset);
					}else if(dungeonTileSprite[aTile.data])
					{
						dungeonTileSprite[aTile.data].draw(can, (i-0)*32+xOffset, (j-0)*32+tyOffset);
					}else 
					{
						dungeonTileSprite[DungeonTileType.Lava+tileani].draw(can,(i-0)*32+xOffset, (j-0)*32+tyOffset);
					}
				}
			}
			if(this.rooms[this.roomZ][this.roomX][this.roomY-1].hasDoor(2))
			{
				var aDoorList=this.rooms[this.roomZ][this.roomX][this.roomY-1].getDoors(2);
				for(var g=0;g<aDoorList.length;g++){
					
					if((aDoorList[g].type==doorType.Bombable) || (aDoorList[g].type==doorType.Bombed))
					{
						if(aDoorList[g].orientation==0)
						{
							dungeonTileSprite[DungeonTileType.WallTop].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+xOffset, aDoorList[g].y*ROOM_TILE_SIZE+tyOffset);
						}else if(aDoorList[g].orientation==1)
						{
							dungeonTileSprite[DungeonTileType.WallRight].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+xOffset, aDoorList[g].y*ROOM_TILE_SIZE+tyOffset);
						}else if(aDoorList[g].orientation==2)
						{
							dungeonTileSprite[DungeonTileType.WallBottom].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+xOffset, aDoorList[g].y*ROOM_TILE_SIZE+tyOffset);
						}else if(aDoorList[g].orientation==3)
						{
							dungeonTileSprite[DungeonTileType.WallLeft].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+xOffset,aDoorList[g].y*ROOM_TILE_SIZE+tyOffset);
						}
					}
					
					if((aDoorList[g].type!=doorType.Bombable) || (OPTIONS.showCracks)|| (editMode))
					{
						aDoorList[g].getSprite().draw(can,(aDoorList[g].x-cam.tileX)*ROOM_TILE_SIZE+xOffset-30, (aDoorList[g].y-cam.tileY)*ROOM_TILE_SIZE+tyOffset-30);
					}
					
				}
			}
			
			for(var g=0;g<explosions.length;g++)
			{
				var expo=explosions[g];
				if((expo.room.z==this.roomZ) && (expo.room.x==this.roomX)&& (expo.room.y==this.roomY-1) && (true))//(expo.y>10))
				{
					expo.draw(can,xOffset,tyOffset);
				}
			
			}
			for(var g=0;g<this.rooms[this.roomZ][this.roomX][this.roomY-1].bombs.length;g++)
			{
				var simplicity=this.rooms[this.roomZ][this.roomX][this.roomY-1].bombs[g];
				
				if(simplicity.y>10)
				{
					simplicity.draw(can,xOffset,tyOffset);
				}
			}
			
			for(var g=0;g<this.rooms[this.roomZ][this.roomX][this.roomY-1].objects.length;g++)
			{
				var simplicity=this.rooms[this.roomZ][this.roomX][this.roomY-1].objects[g];
				if(simplicity.y>10)
				{
					this.rooms[this.roomZ][this.roomX][this.roomY-1].objects[g].draw(can,cam,xOffset,tyOffset);
					if(this.rooms[this.roomZ][this.roomX][this.roomY-1].objects[g].topLayer.length>0)
					{
						this.rooms[this.roomZ][this.roomX][this.roomY-1].objects[g].drawTop(can,cam,xOffset,tyOffset);
					}
				}
			}
			for(var g=0;g<this.rooms[this.roomZ][this.roomX][this.roomY-1].stairs.length;g++)
			{
				var simplicity=this.rooms[this.roomZ][this.roomX][this.roomY-1].stairs[g];
				if(simplicity.y>10)
				{
					if(simplicity.hidden)
					{
						dungeonTileSprite[DungeonTileType.GreenFloor].draw(can, (simplicity.x)*32+xOffset, (simplicity.y)*32+tyOffset);
					}
				}
			}
			
			for(var g=0;g<entities.length;g++)
			{
				if((entities[g].room.z==curDungeon.roomZ) && (entities[g].room.name==curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY-1].name))
				{
					if(entities[g].y>10)
					{
						entities[g].sprites[entities[g].dir].draw(can,(entities[g].x)*32+xOffset, (entities[g].y)*32+tyOffset);
					}
				}
			}
			curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY-1].darkenAdj(can,xOffset,tyOffset);
		}
		
		}
		
		var tyOffset=631;//bottom
		if(MobileMode)
		{
			tyOffset-=140;
		}
		if((this.roomY<this.getHeight()-1) && (this.rooms[this.roomZ][this.roomX][this.roomY+1].active)&& (!this.rooms[this.roomZ][this.roomX][this.roomY+1].hidden))
		{
			for (i=0;i<ROOM_WIDTH; i++)
			{
				for (j=0;j<4; j++)
				{
					var aTile=this.rooms[this.roomZ][this.roomX][this.roomY+1].tiles[i][j];
					
						
					if(aTile.data==DungeonTileType.BirdHead)
					{
						if(i<11)
						{
							dungeonTileSprite[aTile.data].draw(can, i*32+xOffset, j*32+tyOffset);
						}else
						{
							reverseBird.draw(can, i*32+xOffset, j*32+tyOffset);
						}
					}else if((aTile&& aTile<24) && (aTile.data>19))
					{
						dungeonTileSprite[20+tileani].draw(can, (i-0)*32+xOffset, (j-0)*32+tyOffset);
					}else if ((aTile&& aTile<28)  && (aTile.data>23))
					{
						dungeonTileSprite[24+tileani].draw(can, (i-0)*32+xOffset, (j-0)*32+tyOffset);
					}else if(dungeonTileSprite[aTile.data])
					{
							dungeonTileSprite[aTile.data].draw(can, (i-0)*32+xOffset, (j-0)*32+tyOffset);
					}else 
					{
						dungeonTileSprite[DungeonTileType.Lava+tileani].draw(can,(i-0)*32+xOffset, (j-0)*32+tyOffset);
					}
				}
			}
			if(this.rooms[this.roomZ][this.roomX][this.roomY+1].hasDoor(0))
			{
				var aDoorList=this.rooms[this.roomZ][this.roomX][this.roomY+1].getDoors(0);
				for(var g=0;g<aDoorList.length;g++){
					if((aDoorList[g].type==doorType.Bombable)|| (aDoorList[g].type==doorType.Bombed))
					{
						if(aDoorList[g].orientation==0)
						{
							dungeonTileSprite[DungeonTileType.WallTop].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+xOffset, aDoorList[g].y*ROOM_TILE_SIZE+tyOffset);
						}else if(aDoorList[g].orientation==1)
						{
							dungeonTileSprite[DungeonTileType.WallRight].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+xOffset, aDoorList[g].y*ROOM_TILE_SIZE+tyOffset);
						}else if(aDoorList[g].orientation==2)
						{
							dungeonTileSprite[DungeonTileType.WallBottom].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+xOffset, aDoorList[g].y*ROOM_TILE_SIZE+tyOffset);
						}else if(aDoorList[g].orientation==3)
						{
							dungeonTileSprite[DungeonTileType.WallLeft].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+xOffset,aDoorList[g].y*ROOM_TILE_SIZE+tyOffset);
						}
					}
					if((aDoorList[g].type!=doorType.Bombable) || (OPTIONS.showCracks)|| (editMode))
					{
						aDoorList[g].getSprite().draw(can,(aDoorList[g].x-cam.tileX)*ROOM_TILE_SIZE+xOffset-30, (aDoorList[g].y-cam.tileY)*ROOM_TILE_SIZE+tyOffset-30);
					}
					
				}
			}
			for(var g=0;g<this.rooms[this.roomZ][this.roomX][this.roomY+1].objects.length;g++)
			{
				var simplicity=this.rooms[this.roomZ][this.roomX][this.roomY+1].objects[g];
				if(simplicity.y<4)
				{
					this.rooms[this.roomZ][this.roomX][this.roomY+1].objects[g].draw(can,cam,xOffset,tyOffset);
					if(this.rooms[this.roomZ][this.roomX][this.roomY+1].objects[g].topLayer.length>0)
					{
						this.rooms[this.roomZ][this.roomX][this.roomY+1].objects[g].drawTop(can,cam,xOffset,tyOffset);
					}
					//simplicity.sprites[simplicity.curSprite].draw(can,(simplicity.x-cam.tileX)*ROOM_TILE_SIZE+xOffset,(simplicity.y-cam.tileY)*ROOM_TILE_SIZE+tyOffset);
				}
			}
			for(var g=0;g<this.rooms[this.roomZ][this.roomX][this.roomY+1].stairs.length;g++)
			{
				var simplicity=this.rooms[this.roomZ][this.roomX][this.roomY+1].stairs[g];
				if(simplicity.y<4)
				{
					if(simplicity.hidden)
					{
						dungeonTileSprite[DungeonTileType.GreenFloor].draw(can, (simplicity.x)*32+xOffset, (simplicity.y)*32+tyOffset);
					}
				}
			}
			for(var g=0;g<entities.length;g++)
			{
				if((entities[g].room.z==curDungeon.roomZ) && (entities[g].room.name==curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY+1].name))
				{
					if(entities[g].y<4)
					{
						entities[g].sprites[entities[g].dir].draw(can,(entities[g].x)*32+xOffset, (entities[g].y)*32+tyOffset)
					}
				}
			}
		
			for(var g=0;g<explosions.length;g++)
			{
				var expo=explosions[g];
				if((expo.room.z==this.roomZ) && (expo.room.x==this.roomX)&& (expo.room.y==this.roomY+1) && (true))//(expo.y>10))
				{
					expo.draw(can,xOffset,tyOffset);
				}
			
			}
			for(var g=0;g<this.rooms[this.roomZ][this.roomX][this.roomY+1].bombs.length;g++)
			{
				var simplicity=this.rooms[this.roomZ][this.roomX][this.roomY+1].bombs[g];
				
				if(simplicity.y<4)
				{
					simplicity.draw(can,xOffset,tyOffset);
				}
			}
				curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY+1].darkenAdj(can,xOffset,tyOffset);
		
		}
	var txOffset=-491;//left
		if((this.roomX>0) && (this.rooms[this.roomZ][this.roomX-1][this.roomY].active)&& (!this.rooms[this.roomZ][this.roomX-1][this.roomY].hidden))
		{
			for (i=ROOM_WIDTH-4;i<ROOM_WIDTH; i++)
			{
				for (j=0;j<ROOM_HEIGHT; j++)
				{
					var aTile=this.rooms[this.roomZ][this.roomX-1][this.roomY].tiles[i][j];
					if(aTile.data==DungeonTileType.BirdHead)
					{
						if(i<11)
						{
							dungeonTileSprite[aTile.data].draw(can, i*32+txOffset, j*32+yOffset);
						}else
						{
							reverseBird.draw(can, i*32+txOffset, j*32+yOffset);
						}
					}else if((aTile&& aTile<24)  && (aTile.data>19))
					{
						dungeonTileSprite[20+tileani].draw(can, (i-0)*32+txOffset, (j-0)*32+yOffset);
					}else if ((aTile&& aTile<28)  && (aTile.data>23))
					{
						dungeonTileSprite[24+tileani].draw(can, (i-0)*32+txOffset, (j-0)*32+yOffset);
					}else if(dungeonTileSprite[aTile.data])
					{
						dungeonTileSprite[aTile.data].draw(can, (i-0)*32+txOffset, (j-0)*32+yOffset);
					}else 
					{
						dungeonTileSprite[DungeonTileType.Lava+tileani].draw(can,(i-0)*32+txOffset, (j-0)*32+yOffset);
					}
				}
			}
			if(this.rooms[this.roomZ][this.roomX-1][this.roomY].hasDoor(1))
			{
				var aDoorList=this.rooms[this.roomZ][this.roomX-1][this.roomY].getDoors(1);
				for(var g=0;g<aDoorList.length;g++){
					
					if((aDoorList[g].type==doorType.Bombable)|| (aDoorList[g].type==doorType.Bombed))
					{
						if(aDoorList[g].orientation==0)
						{
							dungeonTileSprite[DungeonTileType.WallTop].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+txOffset, aDoorList[g].y*ROOM_TILE_SIZE+yOffset);
						}else if(aDoorList[g].orientation==1)
						{
							dungeonTileSprite[DungeonTileType.WallRight].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+txOffset, aDoorList[g].y*ROOM_TILE_SIZE+yOffset);
						}else if(aDoorList[g].orientation==2)
						{
							dungeonTileSprite[DungeonTileType.WallBottom].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+txOffset, aDoorList[g].y*ROOM_TILE_SIZE+yOffset);
						}else if(aDoorList[g].orientation==3)
						{
							dungeonTileSprite[DungeonTileType.WallLeft].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+txOffset,aDoorList[g].y*ROOM_TILE_SIZE+yOffset);
						}
					}
					
					if((aDoorList[g].type!=doorType.Bombable) || (OPTIONS.showCracks)|| (editMode))
					{
						aDoorList[g].getSprite().draw(can,(aDoorList[g].x-cam.tileX)*ROOM_TILE_SIZE+txOffset-30, (aDoorList[g].y-cam.tileY)*ROOM_TILE_SIZE+yOffset-30);
					}
					
				}
			}
			for(var g=0;g<this.rooms[this.roomZ][this.roomX-1][this.roomY].objects.length;g++)
			{
				var simplicity=this.rooms[this.roomZ][this.roomX-1][this.roomY].objects[g];
				if(simplicity.x>13)
				{
					this.rooms[this.roomZ][this.roomX-1][this.roomY].objects[g].draw(can,cam,txOffset,yOffset);
					if(this.rooms[this.roomZ][this.roomX-1][this.roomY].objects[g].topLayer.length>0)
					{
						this.rooms[this.roomZ][this.roomX-1][this.roomY].objects[g].drawTop(can,cam,txOffset,yOffset);
					}

					//simplicity.sprites[simplicity.curSprite].draw(can,(simplicity.x-cam.tileX)*ROOM_TILE_SIZE+txOffset,(simplicity.y-cam.tileY)*ROOM_TILE_SIZE+yOffset);
				}
			}
			for(var g=0;g<this.rooms[this.roomZ][this.roomX-1][this.roomY].stairs.length;g++)
			{
				var simplicity=this.rooms[this.roomZ][this.roomX-1][this.roomY].stairs[g];
				if(simplicity.x>15)
				{
					if(simplicity.hidden)
					{
						dungeonTileSprite[DungeonTileType.GreenFloor].draw(can, (simplicity.x)*32+txOffset, (simplicity.y)*32+yOffset);
					}
				}
			}
			for(var g=0;g<entities.length;g++)
			{
				if((entities[g].room.z==curDungeon.roomZ) && (entities[g].room.name==curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX-1][curDungeon.roomY].name))
				{
					if(entities[g].x>15)
					{
						entities[g].sprites[entities[g].dir].draw(can,(entities[g].x)*32+txOffset, (entities[g].y)*32+yOffset)
					}
				}
			}
			for(var g=0;g<explosions.length;g++)
			{
				var expo=explosions[g];
				if((expo.room.z==this.roomZ) && (expo.room.x==this.roomX-1)&& (expo.room.y==this.roomY) && (true))//(expo.y>10))
				{
					expo.draw(can,txOffset,yOffset);
				}
			
			}
			for(var g=0;g<this.rooms[this.roomZ][this.roomX-1][this.roomY].bombs.length;g++)
			{
				var simplicity=this.rooms[this.roomZ][this.roomX-1][this.roomY].bombs[g];
				
				if(simplicity.x>13)
				{
					simplicity.draw(can,txOffset,yOffset);
				}
			}
			can.fillStyle="black"
			can.fillRect(0,149,20,425);
			if(curDungeon.roomY>0)
			{
				curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY-1].darkenAdj(can,txOffset,yOffset);
			}
		}
		var txOffset=791;//right
		if((this.roomX<this.getWidth()-1) && (this.rooms[this.roomZ][this.roomX+1][this.roomY].active)&& (!this.rooms[this.roomZ][this.roomX+1][this.roomY].hidden))
		{
			for (i=0;i<4; i++)
			{
				for (j=0;j<ROOM_HEIGHT; j++)
				{
					var aTile=this.rooms[this.roomZ][this.roomX+1][this.roomY].tiles[i][j];
					if(aTile.data==DungeonTileType.BirdHead)
					{
						if(i<11)
						{
							dungeonTileSprite[aTile.data].draw(can, i*32+txOffset, j*32+yOffset);
						}else
						{
							reverseBird.draw(can, i*32+txOffset, j*32+yOffset);
						}
					}else if((aTile&& aTile<24) && (aTile.data>19))
					{
						dungeonTileSprite[20+tileani].draw(can, (i-0)*32+txOffset, (j-0)*32+yOffset);
					}else if ((aTile&& aTile<28) && (aTile.data>23))
					{
						dungeonTileSprite[24+tileani].draw(can, (i-0)*32+txOffset, (j-0)*32+yOffset);
					}else if(dungeonTileSprite[aTile.data])
					{
						dungeonTileSprite[aTile.data].draw(can, (i-0)*32+txOffset, (j-0)*32+yOffset);
					}else
					{
						dungeonTileSprite[DungeonTileType.Lava+tileani].draw(can,(i-0)*32+txOffset, (j-0)*32+yOffset);
					}
				}
			}
			if(this.rooms[this.roomZ][this.roomX+1][this.roomY].hasDoor(3))
			{
				var aDoorList=this.rooms[this.roomZ][this.roomX+1][this.roomY].getDoors(3);
				for(var g=0;g<aDoorList.length;g++){
					if((aDoorList[g].type==doorType.Bombable) || (aDoorList[g].type==doorType.Bombed))
					{
						if(aDoorList[g].orientation==0)
						{
							dungeonTileSprite[DungeonTileType.WallTop].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+txOffset, aDoorList[g].y*ROOM_TILE_SIZE+yOffset);
						}else if(aDoorList[g].orientation==1)
						{
							dungeonTileSprite[DungeonTileType.WallRight].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+txOffset, aDoorList[g].y*ROOM_TILE_SIZE+yOffset);
						}else if(aDoorList[g].orientation==2)
						{
							dungeonTileSprite[DungeonTileType.WallBottom].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+txOffset, aDoorList[g].y*ROOM_TILE_SIZE+yOffset);
						}else if(aDoorList[g].orientation==3)
						{
							dungeonTileSprite[DungeonTileType.WallLeft].draw(can,aDoorList[g].x*ROOM_TILE_SIZE+txOffset,aDoorList[g].y*ROOM_TILE_SIZE+yOffset);
						}
					}
					
					if((aDoorList[g].type!=doorType.Bombable) || (OPTIONS.showCracks)|| (editMode))
					{
						aDoorList[g].getSprite().draw(can,(aDoorList[g].x-cam.tileX)*ROOM_TILE_SIZE+txOffset-30, (aDoorList[g].y-cam.tileY)*ROOM_TILE_SIZE+yOffset-30);
					}
					
				}
			}
			for(var g=0;g<this.rooms[this.roomZ][this.roomX+1][this.roomY].objects.length;g++)
			{
				var simplicity=this.rooms[this.roomZ][this.roomX+1][this.roomY].objects[g];
				if(simplicity.x<4)
				{
					this.rooms[this.roomZ][this.roomX+1][this.roomY].objects[g].draw(can,cam,txOffset,yOffset);
					if(this.rooms[this.roomZ][this.roomX+1][this.roomY].objects[g].topLayer.length>0)
					{
						this.rooms[this.roomZ][this.roomX+1][this.roomY].objects[g].drawTop(can,cam,txOffset,yOffset);
					}
					//simplicity.sprites[simplicity.curSprite].draw(can,(simplicity.x-cam.tileX)*ROOM_TILE_SIZE+txOffset,(simplicity.y-cam.tileY)*ROOM_TILE_SIZE+yOffset);
				}
			}
			for(var g=0;g<this.rooms[this.roomZ][this.roomX+1][this.roomY].stairs.length;g++)
			{
				var simplicity=this.rooms[this.roomZ][this.roomX+1][this.roomY].stairs[g];
				if(simplicity.x<4)
				{
					if(simplicity.hidden)
					{
						dungeonTileSprite[DungeonTileType.GreenFloor].draw(can, (simplicity.x)*32+txOffset, (simplicity.y)*32+yOffset);
					}
				}
			}
			for(var g=0;g<entities.length;g++)
			{
				if((entities[g].room.z==curDungeon.roomZ) && (entities[g].room.name==curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX+1][curDungeon.roomY].name))
				{
					if(entities[g].x<4)
					{
						entities[g].sprites[entities[g].dir].draw(can,(entities[g].x)*32+txOffset, (entities[g].y)*32+yOffset)
					}
				}
			}
			for(var g=0;g<explosions.length;g++)
			{
				var expo=explosions[g];
				if((expo.room.z==this.roomZ) && (expo.room.x==this.roomX+1)&& (expo.room.y==this.roomY) && (true))//(expo.y>10))
				{
					expo.draw(can,txOffset,yOffset);
				}
			
			}
			for(var g=0;g<this.rooms[this.roomZ][this.roomX+1][this.roomY].bombs.length;g++)
			{
				var simplicity=this.rooms[this.roomZ][this.roomX+1][this.roomY].bombs[g];
				
				if(simplicity.x<4)
				{
					simplicity.draw(can,txOffset,yOffset);
				}
			}
			if(curDungeon.roomY>0)
			{
				curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY-1].darkenAdj(can,txOffset,yOffset);
			}
		}
	}
	 
	this.findNearestRoom=function()
	{
		//do better
		this.roomX=0;
		this.roomY=0;
	}
	 
	this.createRoom=function(z,x,y,clone)
	{
		if(x>this.getWidth()-1)
		{
			//his.width=x;
			return false;
		}
		if(y>this.getHeight()-1)
		{
			//this.height=y;
			return false;
		}
		if(z>this.floors-1)
		{
			//this.floors=z;
			return false;
		}
		if((z<0) || (x<0) || (y<0)) 
		{
			return false;
		}
		this.numRooms++;
		var kitchen=new room();
		kitchen.x=x;
		kitchen.y=y;
		kitchen.z=z;
		if(clone)
		{
			//var kitchen=new room(clone);
			/*for(var i=0;i<kitchen.width;i++)
			{
				for(var j=0;j<kitchen.height;j++)
				{
					kitchen.tiles[i][j].data=clone.tiles[i][j].data;
				}
			}*/
			kitchen.copyTiles(clone);
			kitchen.copyExits(clone);
			
		}else
		{
			kitchen.fillAll(DungeonTileType.GreenFloor);
			kitchen.redoWalls();
		}
		bConsoleBox.log("Room created at " +z+","+x+","+y);
		kitchen.name="roomX"+String(x)+"Y"+String(y);
		this.rooms[z][x][y]=kitchen;
		return true;
	}
	 

	this.draw=function(can,cam,player) //maybe dcam is a player variable and you pass this a playeR? 
	{ 
		//this.rooms[player.dX][player.dY].draw(can,cam);
		this.drawAdjacent(can,cam);
		this.rooms[this.roomZ][this.roomX][this.roomY].draw(can,cam);
	}
	
	this.drawLargeMap=function(can,player) //should also draw stairs, exit door in different color, goal/boss. 
	{
		var xFset=218;
		var yFset=20;
		can.fillStyle="white";
		can.fillRect(xFset-8,yFset-28,438,754);
		can.fillStyle="blue";
		can.fillRect(xFset-4,yFset-24,428,744);
		var size=28;
		var gjk=3;
		for(var zzTop=this.mapFloor;zzTop<this.mapFloor+gjk;zzTop++)
		{
			if(zzTop>this.floors-1)
			{
				//gjk+=1;
				continue;
			}
			can.font = "14pt Calibri";
			can.fillStyle="white";
			var suffix="Who knows";
			if(zzTop==0)
			{
				suffix="Basement";
			}else if(zzTop==1)
			{
				suffix="First Floor";
			}else if(zzTop==2)
			{
				suffix="Second Floor";
			}else if(zzTop==3)
			{
				suffix="Third Floor";
			}else if(zzTop==4)
			{
				suffix="Fourth Floor";
			}
			else if(zzTop==5)
			{
				suffix="Fifth Floor";
			}
			else if(zzTop==6)
			{
				suffix="Sixth Floor";
			}
			else if(zzTop==7)
			{
				suffix="Seventh Floor";
			}
			else if(zzTop==8)
			{
				suffix="Eighth Floor";
			}
			else if(zzTop==9)
			{
				suffix="Ninth Floor";
			}else 
			{
				suffix=String(zzTop)+"th Floor";
			}
			can.fillText(suffix,xFset,yFset-6);
			can.globalAlpha=0.76;
			   for(i=0;i<this.width[zzTop];i++)
			   {
					for (k=0;k<this.height[zzTop];k++)
					{
						if((!this.rooms[zzTop][i][k].active))
						{
							//draw black square? nothing?
							
							can.fillStyle="black";
							can.fillRect(xFset+size*i-1,yFset+size*k-1,size+2,size+2);
						}else
						{
							
							if(((this.rooms[zzTop][i][k].explored) && (!this.rooms[zzTop][i][k].hidden)) || (editMode))
							{
								//can.fillStyle="black";
								//canvas.fillRect(xFset+size*i-1,yFset+size*k-1,size+2,size+2);
								can.fillStyle="green";
								can.fillRect(xFset+size*i,yFset+size*k,size+1,size+1);
								
							}else 
							{
								//if((!this.rooms[zzTop][i][k].hidden)&&(!OPTIONS.showUnexploredRooms))
								//{
									can.fillStyle="black";
									can.fillRect(xFset+size*i-1,yFset+size*k-1,size+2,size+2);
								//}else
								//{
									//can.fillStyle="grey";
									//canvas.fillRect(xFset+size*i-1,yFset+size*k-1,size+2,size+2);
									//canvas.fillRect(xFset+size*i-1,yFset+size*k-1,size+2,size+2);
								//}							
								
							}
							
								
						}
						if((i==this.roomX) && (k==this.roomY)&&(zzTop==this.roomZ) && (editMode))
						{
							can.fillStyle="yellow";
							can.fillRect(xFset+size*i+3,yFset+size*k+3,size-6,size-6); //todo: scalig issues.
						}	
						for(var b=0;b<theParty.members.length;b++)
						{
							if((i==theParty.members[b].room.x) && (k==theParty.members[b].room.y)&&(zzTop==theParty.members[b].room.z))
							{
								theParty.members[b].mapSprite.draw(can,xFset+size*i-3,yFset+size*k-3)
							}
						}
					}
				}
				for(i=0;i<this.width[zzTop];i++)
				{
					for (k=0;k<this.height[zzTop];k++)
					{
						if(((this.rooms[zzTop][i][k].explored) || (OPTIONS.showUnexploredDoors)) && (!this.rooms[zzTop][i][k].hidden) || (editMode)) 
						{
							if(this.rooms[zzTop][i][k].hasVisibleDoor(0))
							{
								can.fillStyle="white";
								can.fillRect(xFset+size*i+size/2,yFset+size*k,4,2);
							}
							if(this.rooms[zzTop][i][k].hasVisibleDoor(2))
							{
								can.fillStyle="white";
								canv.fillRect(xFset+size*i+size/2,yFset+size*k+size,4,2);
							}
							if(this.rooms[zzTop][i][k].hasVisibleDoor(1))
							{
								can.fillStyle="white";
								can.fillRect(xFset+size*i+size,yFset+size*k+size/2,2,4);
							}
							if(this.rooms[zzTop][i][k].hasVisibleDoor(3))
							{
								can.fillStyle="white";
								can.fillRect(xFset+size*i,yFset+size*k+size/2,2,4);
							}
							for(var g=0;g<this.rooms[zzTop][i][k].stairs.length;g++)
							{
								if(!this.rooms[zzTop][i][k].stairs[g].up)
								{
									
									downarrowsprite.draw(can,xFset+size*i,yFset+size*k);
								}else if(this.rooms[zzTop][i][k].stairs[g].up)
								{
									uparrowsprite.draw(can,xFset+size*i,yFset+size*k);
								}
								//canvas.fillRect(xFset+size*i+this.rooms[zzTop][i][k].stairs[g].x,yFset+size*k+this.rooms[zzTop][i][k].stairs[g].y,1,1);
							}
						}
					}
				}
			can.globalAlpha=1;
			yFset+=245;
		}
	}
	
	this.drawMiniMap=function(can,player) //should also draw stairs, exit door in different color, goal/boss. 
	{
		var xFset=620;
		var yFset=609;
		if(Xbox)
		{
			yFset=509;
		}
		var size=18;
		can.globalAlpha=1;
		can.font = "16pt Calibri";
		can.fillStyle="white";
		var suffix="Who knows";
		if(this.roomZ==0)
		{
			suffix="Basement";
		}else if(this.roomZ==1)
		{
			suffix="First Floor";
		}else if(this.roomZ==2)
		{
			suffix="Second Floor";
		}else if(this.roomZ==3)
		{
			suffix="Third Floor";
		}else if(this.roomZ==4)
		{
			suffix="Fourth Floor";
		}
		else if(this.roomZ==5)
		{
			suffix="Fifth Floor";
		}
		else if(this.roomZ==6)
		{
			suffix="Sixth Floor";
		}
		else if(this.roomZ==7)
		{
			suffix="Seventh Floor";
		}
		else if(this.roomZ==8)
		{
			suffix="Eighth Floor";
		}
		else if(this.roomZ==9)
		{
			suffix="Ninth Floor";
		}else 
		{
			suffix=String(this.roomZ)+"th Floor";
		}
		can.fillText(suffix,xFset,yFset-6);
		can.globalAlpha=0.70;
		   for(i=0;i<this.width[this.roomZ];i++)
		   {
				for (k=0;k<this.height[this.roomZ];k++)
				{
					if(!this.rooms[this.roomZ][i][k].active)
					{
						//draw black square? nothing?
						
						can.fillStyle="black";
						can.fillRect(xFset+size*i,yFset+size*k,size,size);
					}else
					{
						
						if(((this.rooms[this.roomZ][i][k].explored) && (!this.rooms[this.roomZ][i][k].hidden)) || (editMode))
						{
							//can.fillStyle="black";
							//canvas.fillRect(xFset+size*i-1,yFset+size*k-1,size+1,size+1);
							can.fillStyle="blue";
							can.fillRect(xFset+size*i,yFset+size*k,size,size);
							//canvas.fillRect(xFset+size*i-1,yFset+size*k-1,size+1,size+1);
							
						}else 
						{
						
							if((this.rooms[this.roomZ][i][k].hidden) || (!OPTIONS.showUnexploredRooms))
							{
								can.fillStyle="black";
								can.fillRect(xFset+size*i,yFset+size*k,size,size);
							}else
							{							
								can.fillStyle="grey";
								can.fillRect(xFset+size*i-1,yFset+size*k-1,size,size);
							}
							
						}
						
							
					}
					if((i==this.roomX) && (k==this.roomY)) //todo and right floor?
					{
						can.fillStyle="yellow";
						can.fillRect(xFset+size*i+3,yFset+size*k+3,size-6,size-6); //todo: scalig issues.
					}	
				}
			}
			for(i=0;i<this.width[this.roomZ];i++)
		    {
				for (k=0;k<this.height[this.roomZ];k++)
				{
					if(((this.rooms[this.roomZ][i][k].explored) || (OPTIONS.showUnexploredDoors)) && (!this.rooms[this.roomZ][i][k].hidden) || (editMode)) 
					{
						if(this.rooms[this.roomZ][i][k].hasVisibleDoor(0))
						{
							can.fillStyle="white";
							can.fillRect(xFset+size*i+size/2,yFset+size*k,2,1);
						}
						if(this.rooms[this.roomZ][i][k].hasVisibleDoor(2))
						{
							can.fillStyle="white";
							can.fillRect(xFset+size*i+size/2,yFset+size*k+size,2,1);
						}
						if(this.rooms[this.roomZ][i][k].hasVisibleDoor(1))
						{
							can.fillStyle="white";
							can.fillRect(xFset+size*i+size,yFset+size*k+size/2,1,2);
						}
						if(this.rooms[this.roomZ][i][k].hasVisibleDoor(3))
						{
							can.fillStyle="white";
							can.fillRect(xFset+size*i,yFset+size*k+size/2,1,2);
						}
						for(var g=0;g<this.rooms[this.roomZ][i][k].stairs.length;g++)
						{
							can.fillStyle="orange";
							if(this.rooms[this.roomZ][i][k].stairs[g].up)
							{
								can.fillStyle="pink";
							}
							can.fillRect(xFset+size*i+this.rooms[this.roomZ][i][k].stairs[g].x,yFset+size*k+this.rooms[this.roomZ][i][k].stairs[g].y,1,1);
						}
					}
				}
			}
		can.globalAlpha=1;
	}

};