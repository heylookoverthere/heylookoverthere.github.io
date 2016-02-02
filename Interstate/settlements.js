var settlementTypes=[];
settlementTypes.GasStaton=0;
settlementTypes.RestStop=1;
settlementTypes.Mall=2;
settlementTypes.SmalTown=3;
settlementTypes.Motel=4;
settlementTypes.TouristTrap=5;
settlementTypes.TruckStop=6;
settlementTypes.Estate=7;

function settlement(x,y,name,ptx,pty)
{
	//this.name="Legoland";
	//this.tileX=166;
	//this.tileY=231;
	this.alive=true;
	this.port=false;
	this.sprite=Sprite("genericvillage");
	this.name="Newtown";
	this.tileX=448;
	this.tileY=240;

	this.width=3;
	this.height=2;
	this.xOffset=0;
	this.yOffset=0;
	this.entranceTileXOffset=0;
	this.entranceTileYOffset=10;
	this.x=this.tileX*tileSize;
	this.y=this.tileY*tileSize;
	if(x) {this.tileX=x;}
	if(y) {this.tileY=y;}
	if(name) {this.name=name;}
	this.x=this.tileX*16;
	this.y=this.tileY*16;
	this.portTileX=ptx||this.tileX;
	this.portTileY=pty||this.tileY;
	this.entranceTileX=function() { return (Math.floor(this.tileX+this.width/2)+this.entranceTileXOffset);}//+3;
	this.entranceTileY=function() {return(Math.floor(this.tileY+this.height+1)+this.entranceTileYOffset);}
	this.resources=new Array();
	this.desiredCommodities=new Array();
	
	
	this.draw=function(can,cam)
	{
		/*can.save();
		can.globalAlpha=0.6;
		can.scale(cam.zoom,cam.zoom);*/
		if(this.port)
		{
			if(this.portLeft)
			{
				this.portSprite.draw(can, this.portTileX*tileSize+16-cam.tileX*tileSize,this.portTileY*tileSize-cam.tileY*tileSize);
				this.portSprite.draw(can, this.portTileX*tileSize+32-cam.tileX*tileSize,this.portTileY*tileSize-cam.tileY*tileSize);
			}else
			{
				this.portSprite.draw(can, this.portTileX*tileSize-cam.tileX*tileSize,this.portTileY*tileSize-cam.tileY*tileSize);
				this.portSprite.draw(can, this.portTileX*tileSize-16-cam.tileX*tileSize,this.portTileY*tileSize-cam.tileY*tileSize);
			}
		}
		if(this.portLeft)
		{
			this.sprite.draw(can, this.x+60-cam.tileX*tileSize+this.xOffset,this.y-20-cam.tileY*tileSize+this.yOffset);
		}else
		{
			this.sprite.draw(can, this.x-100-cam.tileX*tileSize+this.xOffset,this.y-20-cam.tileY*tileSize+this.yOffset);
		}
	
		//mapDirty=true;
		//can.restore();
	}
	settlement.prototype.computePaths=function(map,orts)
	{
		//todo
		return;
		this.portPaths=new Array();
		for(var i=0;i<orts.length;i++)
		{
			if(orts[i].name==this.name)
			{
				//this.portPaths.push(null);
				this.portPaths.push(map.getPath(this.tileX, this.tileY,orts[i].tileX, orts[i].tileY,true));
				console.log("	Computing path between "+this.name+" and "+orts[i].name)
			}else
			{
				console.log("	Computing path between "+this.name+" and "+orts[i].name);
				this.portPaths.push(map.getPath(this.tileX, this.tileY,orts[i].tileX, orts[i].tileY,true));
			}
		}
		
	};
	settlement.prototype.insertResource=function(res)
	{
		//search for existing instance of res.id in stores. add to, or put at end if none found. 
		for(var i=0;i<this.resources.length;i++)
		{
			if(this.resources[i].id==res.id)
			{
				//console.log(this.stores[i].id,res.id);
				this.resources[i].combine(res);
			}
		}
		if(res.amount>0) {
			this.resources.push(res);
		}
	};
	
};

function computeSomePaths(map)
{
	for(var i=0;i<ports.length;i++)
	{
		ports[i].computePaths(map,ports);
	}
}


var aRestStop=new settlement();
aRestStop.height=10;
aRestStop.yOffset=-136;
aRestStop.sprite=Sprite("reststop");

