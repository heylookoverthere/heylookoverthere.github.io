var shipClass=[];
shipClass.Fishing=0;
shipClass.Small=1;
shipClass.Longship=3;
shipClass.Drummond=4;
shipClass.OarShip=5;

function ship(pt)
{
	this.log=new Array();
	this.log.push("Commissioned at "+thyme.getString());
	this.navigateRivers=true;
	this.class=shipClass.Small;
	this.name="Blackbird";
	this.width=32;
	this.height=32;
	this.ports=new Array();
	this.alive=true;
	this.lights=new Array();
	this.type=0;
	this.cargoCapacity=1000;
	this.resources=new Array();
	this.men=new Array();
	//lyle.name="aaa";
	//console.log(lyle);
	//this.men.push(lyle);
	this.boat=true;
	this.lastmove=0;
	this.ports.push(pt);
	this.watch=false;
	this.homeport=this.ports[0];
	this.portTrack=-1;
	this.bobTrack=-4;
	this.bobflag=false;
	this.tileX=this.homeport.portTileX;
	this.tileY=this.homeport.portTileY;
	this.hp=100;
	this.sprites=new Array();
	this.facing=0;
	this.sprites[0]=Sprite("smallboatright");
	this.sprites[1]=Sprite("smallboatup");
	this.sprites[2]=Sprite("smallboat");
	this.sprites[3]=Sprite("smallboatdown");
	
	this.alive=true;
	this.x=this.tileX*tileSize;
	this.y=this.tileY*tileSize;
	this.cargo=new Array();
	this.speed=2;//1;
	this.speedTrack=0;
	this.path = null;
	this.bx = 8;
    this.by = 8;
    this.dx = 0;
    this.dy = 0;
	this.nextMove = null;
    this.nextTile = {x: this.tileX, y: this.tileY};
    this.inNextTile = false;
	this.lights.push(new light(16,18,12,this));
	this.visRange=10;
	this.crewShip=function(num,source)
	{
		
		for(var p=0;p<num;p++)
		{
			var teddanson=source.men.pop(); //todo better?
			teddanson.task="Captaining the ship "+this.name;
			this.men.push(teddanson);
		}
	}
	this.warpToPort=function(blint)
	{
		this.portTrack=blint;
		this.tileX=this.ports[this.portTrack].portTileX;
		this.tileY=this.ports[this.portTrack].portTileY;
		this.path=null;
		this.x=this.tileX*tileSize;
		this.y=this.tileY*tileSize;
	};
	this.clearFog=function(map)
	{
		for(var i=this.tileX-this.visRange+2;i<this.tileX+this.visRange;i++)
		{
			for(var j=this.tileY-this.visRange+2;j<this.tileY+this.visRange;j++)
			{
				map.seenMap[i][j]=true;
			}
			
		}
	}
	this.update=function(map)
	{
		//goto this.ports[this.portTrack]
		if(this.bobFlag)
		{
			this.bobTrack+=2;
			if(this.bobTrack>60)
			{
				this.bobFlag=false;
			}
		}else if(!this.bobFlag)
		{
			this.bobTrack-=2;
			if(this.bobTrack<-60)
			{
				this.bobFlag=true;
			}
		}
		this.updateAI(map);
	};
	
	this.upgrade=function(){
		this.type=2;
		this.width=64;
		this.cargoCapacity=10000;
		this.speed=5;
		this.sprites[0]=Sprite("largeboatright");
		this.sprites[1]=Sprite("largeboatup");
		this.sprites[2]=Sprite("largeboat");
		this.sprites[3]=Sprite("largeboatdown");
		this.log.push("Upgraded at "+thyme.getString());
	};
	
	this.draw=function(can,cam)
	{
		if(!this.alive) {return;}
		/*can.save();
		can.globalAlpha=0.6;
		can.scale(cam.zoom,cam.zoom);*/
		this.sprites[this.facing].draw(can, this.x-cam.tileX*tileSize,this.y-cam.tileY*tileSize+this.bobTrack/30);
		//mapDirty=true;
		//can.restore();
	}
	
	ship.prototype.nearestPort=function(orts)
	{
		var earlessPort=null;
		var tengle=900000;
		for(var i=0;i<orts.length;i++)
		{
			var bingle=tileDistance(this,orts[i]);
			if(bingle<tengle)
			{
				tengle=bingle;
				earlessPort=orts[i];
			}
			
		}
		return earlessPort; 
	};
	
	  ship.prototype.updateNextMove = function() {
		if(!bees) {return;}
        if( !this.path ) 
		{			
			if(this.portTrack==0)
			{
				//unload all cargo to watch. 
				bConsoleBox.log(this.name+ " has reached "+this.ports[this.portTrack].name +" at "+thyme.getString()+ " and unloaded their cargo.");
				this.log.push("Reached "+this.ports[this.portTrack].name + " and unloaded their cargo. at "+thyme.getString());
				if(this.watch)
				{
					for(var i=0;i<this.cargo.length;i++)
					{
						theWatch.insertResource(this.cargo[i]);
						//this.cargo.splice(i,1);
					}
				}else
				{
					for(var i=0;i<this.cargo.length;i++)
					{
						this.homeport.insertResource(this.cargo[i]);
						//this.cargo.splice(i,1);
					}
				}
				this.cargo=[];
				//Take items you have for sale if you know you're going to a port that wants them. for now just take them no matter what.
				while(theWatch.resources.length>0)
				{
					this.resources.push(theWatch.resources.pop());
				}
				
				
			}else if(this.portTrack<0)
			{
				this.portTrack=0; //so you don't get the message
			}else
			{
				if(this.ports[this.portTrack].resources.length>0)
				{
					var goods=Math.floor(Math.random()*(this.ports[this.portTrack].resources.length));
					var amt=Math.floor(Math.random()*10)+1;
					var cost=amt*this.ports[this.portTrack].resources[goods].cost;

					//todo TRADE before using gold!
					//if(this.ports[this.portTrack].desiredComodities) contains anything from this.resources
					{
						//give them as close to cost worth of sale item without going over cost. spend difference in gold.
					}		

						while(this.resources.length>0)
						{
							//sell
							var leop=this.resources.pop();
							if(this.watch)//todo give settlments own treasuries. 
							{
								theWatch.gold+=leop.cost*leop.amount;
							}
							this.ports[this.portTrack].resources.push(leop);
						}
			
					if(this.watch)
					{
						if(theWatch.spend(cost))
						{
							var zed=new commodity(this.ports[this.portTrack].resources[goods].id,amt)
							this.ports[this.portTrack].resources[goods].amount-=amt;
							this.insertCargo(zed);

							bConsoleBox.log(this.name+ " has reached "+this.ports[this.portTrack].name+" at "+thyme.getString()+" and picked up "+amt+" "+this.ports[this.portTrack].resources[goods].name);
							this.log.push("Reached "+this.ports[this.portTrack].name + "and picked up "+amt+" "+this.ports[this.portTrack].resources[goods].name+" at "+thyme.getString());
						}else
						{
							bConsoleBox.log(this.name+ " has reached "+this.ports[this.portTrack].name+" at "+thyme.getString()+" but the proposed deal was too expensive");
							this.log.push("Reached "+this.ports[this.portTrack].name + " but the proposed deal was too expensive: "+thyme.getString());
						}
						
					}else
					{
						bConsoleBox.log(this.name+ " has reached "+this.ports[this.portTrack].name);
						this.log.push("Reached "+this.ports[this.portTrack].name+" at "+thyme.getString());
						var zed=new commodity(this.ports[this.portTrack].resources[goods].id,amt)
						this.ports[this.portTrack].resources[goods].amount-=amt;
						this.insertCargo(zed);
					}

				}
				
			}
			var pDest=this.portTrack+1;
			if(pDest>this.ports.length-1)
			{
				pDest=0;
			}
			//this.NEWsetDestination(pDest);
			this.portTrack++;
			if(this.portTrack>this.ports.length-1)
			{
				this.portTrack=0;
			}
			this.setDestination(this.ports[this.portTrack].portTileX,this.ports[this.portTrack].portTileY,curMap);
			
			
			bConsoleBox.log(this.name+ " is heading to "+this.ports[this.portTrack].name);
            return;
        }
        this.nextMove = this.path.shift();
        if( !this.nextMove ) {
			if(this.team==0){
				var tmpstr=this.name + "reached their destination.";
				bConsoleStr.push(tmpstr);
				bConsoleClr.push("white");
			}else
			{
				//todo give enemy squads new destination now.
			}
            this.path = null; return;
        }
    };
    ship.prototype.isWalking = function() {
        return this.path != null;
    };
	ship.prototype.insertCargo=function(res)
	{
		//search for existing instance of res.id in stores. add to, or put at end if none found. 
		for(var i=0;i<this.cargo.length;i++)
		{
			if(this.cargo[i].id==res.id)
			{
				//console.log(this.stores[i].id,res.id);
				this.cargo[i].combine(res);
			}
		}
		if(res.amount>0) {
			this.cargo.push(res);
		}
	};
	
    ship.prototype.clearDestination=function(){
        this.path=null; this.dx = this.tileX; this.dy = this.tileY; this.nextMove = null;
    };
    ship.prototype.setDestination = function(x, y, map) {
		if(!map.sailable(x,y)) {console.log("invalid dest");return;}
        this.clearDestination();
        this.path = map.getPath(this.tileX, this.tileY, x, y,true);
        this.dx=x;
        this.dy=y;
		//console.log(portPaths);
    };
	ship.prototype.NEWsetDestination = function(destID ) {
		this.clearDestination();
		this.path=new Array();
		for(var i=0;i<ports[this.portTrack].portPaths[destID].length;i++)
		{
			this.path.push(ports[this.portTrack].portPaths[destID][i]);
		}
		
        //this.path = ports[this.portTrack].portPaths[destID];

    };
	ship.prototype.updateAI=function(map)
	{
		if( !this.nextMove )
		{
			this.updateNextMove();
		}
		if( !this.nextMove ) {
			return;
		}
		//var terrain = map.tiles[this.nextTile.x][this.nextTile.y].data;
		var speed = this.speed;
		//if (this.leaderless) {speed=3;} //PROBLEM?
		//if((terrain==4) &&(this.units[0].class==SEEAss.Frog)) {speed=4};

		//speed = speed / Math.pow(2, curMap.zoom-1);
		var stamp = new Date();
		var milli=stamp.getTime();
		//speed=(speed * delta) * (60 / 1000);

		if(milli-this.lastmove>100){
			if( this.nextMove.x > this.tileX ) {
				this.bx += speed;//*gameSpeed;
				this.x += speed;//*gameSpeed;
				this.facing=0;
			} else if( this.nextMove.x < this.tileX ) {
				this.bx -= speed;//*gameSpeed;
				this.x -= speed;//*gameSpeed;
				this.facing=2;
			}
			if( this.nextMove.y > this.tileY) {
				this.by += speed;//*gameSpeed;
				this.y += speed//*gameSpeed;
				this.facing=3;
			} else if( this.nextMove.y < this.tileY) {
				this.by -= speed;//*gameSpeed;
				this.y -= speed;//*gameSpeed;
				this.facing=1;
			}
			this.lastmove=stamp.getTime();
			if(map.fogOfWar)
			{
				this.clearFog(map);
			}
		}

		if( !this.inNextTile && ( this.bx <= 0 || this.bx >= 16 || this.by <= 0 || this.by >= 16 )) {
			this.nextTile = {};
			this.nextTile.x = this.nextMove.x;
			this.nextTile.y = this.nextMove.y;
			//           if( this.bx == 0 ) { this.bx = 16 } else if( this.bx == 16 ) { this.bx = 0; } 
			//           if( this.by == 0 ) { this.by = 16 } else if( this.by == 16 ) { this.by = 0; }          
			this.inNextTile = true;

		}
		if(( this.bx >= 24 || this.bx <= -8 ) || ( this.by <= -8 || this.by >= 24 )) {
			this.bx = this.by = 8;
			this.inNextTile = false;
			this.tileX = this.nextMove.x;
			this.tileY = this.nextMove.y;
			this.x=this.tileX*16;
			this.y=this.tileY*16;
			this.nextTile = {x: this.tileX, y: this.tileY};
			this.nextMove = null;

		}
	};
};