var settlementTypes=[];
settlementTypes.SmallVillage=0;
settlementTypes.LargeVillage=1;
settlementTypes.VillageWithKeep=2;
settlementTypes.SmallCity=3;
settlementTypes.CityWithKeep=4;
settlementTypes.VillageWithTower=5;
settlementTypes.Tower=6;
settlementTypes.Castle=7;

function settlement(x,y,name,ptx,pty)
{
	//this.name="Legoland";
	//this.tileX=166;
	//this.tileY=231;
	this.alive=true;
	this.port=true;
	this.portLeft=false;
	this.sprite=Sprite("genericvillage");
	this.name="Castle Black";
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
	this.portSprite=Sprite("dock");
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

var Stonedance=new settlement(785,870,"Stonedance",787,870);
Stonedance.resources.push(new commodity(CommIDs.Steel,99));
//Settlments.push(settlePort(Stonedance));

var Stonehelm=new settlement(703,1140,"Stonehelm",705,1140);
Stonehelm.resources.push(new commodity(CommIDs.Steel,99));

var TenTowers=new settlement(212,651,"Ten Towers",212,651);
TenTowers.resources.push(new commodity(CommIDs.Steel,99));

var GhastonGrey=new settlement(804,1300,"Ghaston Grey",806,1300);
GhastonGrey.sprite=Sprite("genericcastle")
GhastonGrey.resources.push(new commodity(CommIDs.Prisoner,99));

var Greenstone=new settlement(909,1164,"Greenstone",911,1165);
Greenstone.resources.push(new commodity(CommIDs.Steel,99));

var Faircastle=new settlement(90,780,"Faircastle");
Faircastle.resources.push(new commodity(CommIDs.Steel,99));

var WidowsWatch=new settlement(623,470,"Widow's Watch",626,470);
WidowsWatch.resources.push(new commodity(CommIDs.Steel,99));

var Seaguard=new settlement(239,570,"Seaguard",236,570);
Seaguard.sprite=Sprite("genericcastle")
Seaguard.portLeft=true;
Seaguard.resources.push(new commodity(CommIDs.Steel,99));

var FlintsFinger=new settlement(186,516,"Flint's Finger",183,516);
FlintsFinger.portLeft=true;
FlintsFinger.resources.push(new commodity(CommIDs.Steel,99));

var Ryamsport=new settlement(169,1326,"Ryamsport");
Ryamsport.portLeft=true;
Ryamsport.resources.push(new commodity(CommIDs.ArborGold,99));

var Volantis=new settlement(1550,1426,"Volantis");
Volantis.resources.push(new commodity(CommIDs.Steel,99));

var Winterfell=new settlement(404,373,"Winterfell");
Winterfell.sprite=Sprite("genericcastle")
Winterfell.type=settlementTypes.Castle;
Winterfell.port=false;
Winterfell.resources.push(new commodity(CommIDs.Steel,99));

var Maidenpool=new settlement(724,774,"Maidenpool",721,772);
Maidenpool.portLeft=true;
Maidenpool.resources.push(new commodity(CommIDs.Steel,99));

var Riverrun=new settlement(317,754,"Riverrun");
Riverrun.port=false;
Riverrun.resources.push(new commodity(CommIDs.Steel,99));

var TheEyrie=new settlement(646,680,"The Eyrie");
TheEyrie.port=false;
TheEyrie.resources.push(new commodity(CommIDs.Steel,99));

var Harrenhal=new settlement(482,760,"Harrenhal",483,766);
Harrenhal.port=true;
Harrenhal.resources.push(new commodity(CommIDs.Steel,99));

var Highgarden=new settlement(350,1106,"Highgarden",350,1110);
Highgarden.port=true;
Highgarden.resources.push(new commodity(CommIDs.Steel,99));

var TheTwins=new settlement(337,675,"The Twins");
TheTwins.port=false;
TheTwins.resources.push(new commodity(CommIDs.Steel,99));

var Saltpans=new settlement(663,773,"Saltpans",667,769);
Saltpans.resources.push(new commodity(CommIDs.Steel,99));

var BearIsland=new settlement(298,239,"Bear Island");
BearIsland.resources.push(new commodity(CommIDs.BearPelt,99));

var Driftmark=new settlement(760,818,"Driftmark");
Driftmark.resources.push(new commodity(CommIDs.Steel,99));

var Sisterton=new settlement(545,595,"Sisterton");
Sisterton.resources.push(new commodity(CommIDs.Steel,99));
Sisterton.portLeft=true;

var Tyrosh=new settlement(1179,1215,"Tyrosh");
Tyrosh.portLeft=true;
Tyrosh.resources.push(new commodity(CommIDs.Steel,99));

var Myr=new settlement(1310,1185,"Myr");
Myr.portLeft=true;
Myr.resources.push(new commodity(CommIDs.MyrishLense,99));

var Oldtown=new settlement(405,1200,"Oldtown",407,1203);
Oldtown.sprite=Sprite("hightower");
Oldtown.xOffset=-29;
Oldtown.yOffset-=16;
Oldtown.resources.push(new commodity(CommIDs.Steel,99));
Oldtown.resources.push(new commodity(CommIDs.CheapWine,99));

var Sunspear=new settlement(935,1425,"Sunspear",936,1432);
//Sunspear.yOffset=-60;
Sunspear.sprite=Sprite("sunspear");
Sunspear.resources.push(new commodity(CommIDs.DornishRed,99));
Sunspear.resources.push(new commodity(CommIDs.LemonCakes,99));
Sunspear.resources.push(new commodity(CommIDs.DornishSandSteed,99));

var Lys=new settlement(1302,1418,"Lys");
Lys.portLeft=true;
Lys.resources.push(new commodity(CommIDs.TearsOfLys,99));

var StormsEnd=new settlement(784,1013,"Storms End",787,1015);
StormsEnd.resources.push(new commodity(CommIDs.Steel,99));
StormsEnd.resources.push(new commodity(CommIDs.Horse,99));
StormsEnd.sprite=Sprite("stormsend");

var Dragonstone=new settlement(786,801,"Dragonstone");
Dragonstone.sprite=Sprite("genericcastle")
Dragonstone.resources.push(new commodity(CommIDs.Steel,99));

var KingsLanding=new settlement(670,863,"King's Landing",675,864);
KingsLanding.sprite=Sprite("kingslanding");
//KingsLanding.entranceTileXOffset=-232;
//KingsLanding.entranceTileXOffset=-19;
KingsLanding.xOffset=-20;
KingsLanding.resources.push(new commodity(CommIDs.Steel,99));

var Duskendale=new settlement(687,835,"Duskendale",693,837);
Duskendale.resources.push(new commodity(CommIDs.Steel,99));

var Tarth=new settlement(864,997,"Tarth");
Tarth.portLeft=true;
Tarth.resources.push(new commodity(CommIDs.Steel,99));

var TheCrag=new settlement(148,750,"The Crag",144,750);
TheCrag.sprite=Sprite("genericcastle");
TheCrag.portLeft=true;
TheCrag.resources.push(new commodity(CommIDs.Steel,99));

var Lannisport=new settlement(163,862,"Lannisport",156,862);
Lannisport.portLeft=true;
Lannisport.resources.push(new commodity(CommIDs.Steel,99));

var Pyke=new settlement(174,679,"Pyke");
Pyke.resources.push(new commodity(CommIDs.Steel,99));

var GreatWyk=new settlement(127,590,"Great Wyk");
GreatWyk.resources.push(new commodity(CommIDs.Steel,99));

var Morosh=new settlement(1569,506,"Morosh");
Morosh.yOffset=40;
Morosh.portLeft=true;
Morosh.resources.push(new commodity(CommIDs.Steel,99));

var Saath=new settlement(1539,522,"Saath");
Saath.resources.push(new commodity(CommIDs.Steel,99));
Saath.portLeft=true;

var Eastwatch=new settlement(491,233,"Eastwatch",494,233);
Eastwatch.resources.push(new commodity(CommIDs.OakWood,99));
Eastwatch.sprite=Sprite("eastwatch");

var Skagos=new settlement(226+326,200,"Skagos");
Skagos.portLeft=true;
Skagos.resources.push(new commodity(CommIDs.WeirWood,99));
Skagos.resources.push(new commodity(CommIDs.MysteryMeat,99));
Skagos.resources.push(new commodity(CommIDs.UnicornHorn,99));
Skagos.resources.push(new commodity(CommIDs.Obsidian,99));
var WhiteHarbor=new settlement(398,550,"White Harbor",404,550);
WhiteHarbor.resources.push(new commodity(CommIDs.SaltFish,99));
WhiteHarbor.resources.push(new commodity(CommIDs.Capon,99));
WhiteHarbor.resources.push(new commodity(CommIDs.Steel,99));
WhiteHarbor.resources.push(new commodity(CommIDs.FreyPie,99));
var Gulltown=new settlement(781,729,"Gulltown",781,733);
Gulltown.yOffset=-50;
Gulltown.resources.push(new commodity(CommIDs.SaltFish,99));
var Braavos=new settlement(1067,564,"Braavos");
Braavos.portLeft=true;
Braavos.resources.push(new commodity(CommIDs.SaltFish,99));

var Lorath=new settlement(1180,552,"Lorath");
Lorath.resources.push(new commodity(CommIDs.SaltFish,99));
Lorath.portLeft=true;

var Pentos=new settlement(1098,873,"Pentos");
Pentos.resources.push(new commodity(CommIDs.PeasePie,99));
Pentos.portLeft=true;

var CastleBlack=new settlement();
CastleBlack.height=10;
CastleBlack.yOffset=-136;
CastleBlack.sprite=Sprite("castleblack");
CastleBlack.port=false;

var ShadowTower=new settlement(382,231,"Shadow Tower");
ShadowTower.port=false;
ShadowTower.sprite=Sprite("shadowtower");
