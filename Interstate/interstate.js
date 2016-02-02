var bees=true;//false;

//var bConsoleStr=new Array();
var bConsoleClr=new Array();
var bConsoleBox;
var bMenuBox;

var farmSlots=new Array();
farmSlots.push(new point(458,260));
farmSlots.push(new point(418,260));



function kraken(x,y)
{
	this.tileX=x||0;
	this.tileY=y||0;
	this.x=this.tileX*tileSize;
	this.y=this.tileY*tileSize;
	this.xOffset=0;
	this.yOffset=0;
	this.sprites=new Array();
	this.sprites.push(Sprite("kraken0"));
	this.sprites.push(Sprite("kraken1"));
	this.sprites.push(Sprite("kraken2"));
	this.sprites.push(Sprite("kraken3"));	
	this.aniTrack=0;
	this.aboveWater=false;
	this.update=function()
	{
		
	};
	
	this.draw=function(can,cam)
	{
		this.sprites[this.aniTrack].draw(can, this.x-cam.tileX*tileSize+1,this.y-cam.tileY*tileSize+4);
	}
};

function dolphin(x,y)
{
	this.tileX=x||0;
	this.tileY=y||0;
	this.x=this.tileX*tileSize;
	this.y=this.tileY*tileSize;
	this.aniTrack=0;
	this.xOffset=0;
	this.yOffset=0;
	this.aboveWater=false;
	this.sprites=new Array();
	this.sprites.push(Sprite("dolph0"));
	this.sprites.push(Sprite("dolph1"));
	this.sprites.push(Sprite("dolph2"));
	this.sprites.push(Sprite("dolph3"));	
	this.update=function()
	{
		
	};
	this.draw=function(can,cam)
	{
		this.sprites[this.aniTrack].draw(can, this.x-cam.tileX*tileSize+1,this.y-cam.tileY*tileSize+4);
	};
};


var LightLevels=new Array();
LightLevels.push(0.90); //midnight
LightLevels.push(0.85); //1am
LightLevels.push(0.80); //2am
LightLevels.push(0.75); //3am
LightLevels.push(0.60); //4am
LightLevels.push(0.45); //5am
LightLevels.push(0.30); //6am
LightLevels.push(0.10); //7am
LightLevels.push(0.00); //8am
LightLevels.push(0.00); //9am
LightLevels.push(0.00); //10am
LightLevels.push(0.00); //11am
LightLevels.push(0.00); //12pm
LightLevels.push(0.00); //1pm
LightLevels.push(0.00); //2pm
LightLevels.push(0.00); //3pm
LightLevels.push(0.10); //4pm
LightLevels.push(0.20); //5pm
LightLevels.push(0.30); //6pm
LightLevels.push(0.34); //7pm
LightLevels.push(0.50); //8pm
LightLevels.push(0.60); //9pm
LightLevels.push(0.80); //10pm
LightLevels.push(0.85); //11pm

function farm(prnt,x,y)
{
	this.harvestTrack=0;
	this.harvestCount=0;
	this.task="Working a farm.";
	this.harvestAmount=60;
	this.tileX=x || 0;
	this.tileY=y || 0;
	this.width=156;
	this.height=156;
	this.x=this.tileX*tileSize;
	this.y=this.tileY*tileSize;
	this.lastmove=0;
	this.size=0; // /3
	this.crop=Math.floor(Math.random()*50); //resource? or convert to resource later?
	this.men=new Array();
	this.maxMen=3;
	this.parent=prnt;
	this.sprites=new Array();
	this.sprites.push(Sprite("farm0"));
	this.sprites.push(Sprite("farm1"));
	this.sprites.push(Sprite("farm2"));
	this.sprites.push(Sprite("farm3"));
	this.sprites.push(Sprite("farm4"));
	farm.prototype.employ=function(worker)
	{
		this.men.push(worker);
	};
	this.getWorkRate=function()//return # value based on number and skill of workers
	{
		return this.men.length; //for now.
	}
	this.harvest=function()
	{
		this.harvestTrack=0;
		this.harvestCount=0;
		var nelly=this.harvestAmount+Math.floor(Math.random()*20)
		var belly=new commodity(this.crop,nelly);
		this.parent.insertResource(belly);
		bConsoleBox.log("Harvested "+nelly+" "+belly.name+"s at "+thyme.getString());
		//this.parent.addfood?
	}
	farm.prototype.update=function()
	{
		//console.log("pog");
		var stamp = new Date();
		var milli=stamp.getTime();
		//speed=(speed * delta) * (60 / 1000);

		if(milli-this.lastmove>100)
		{
			
			var spd=this.getWorkRate();
			this.harvestCount+=spd;//*gameSpeed;
			if(this.harvestCount>2000)
			{
				this.harvestCount=0;
				this.harvestTrack++;
				if(this.harvestTrack>3)
				{
					this.harvest(); 
				}
			}
			this.lastmove=stamp.getTime();
		}
	};
	farm.prototype.draw=function(can,cam)
	{
		this.sprites[this.harvestTrack].draw(can, this.x-cam.tileX*tileSize+1,this.y-cam.tileY*tileSize+4);
	};
};


function stringifyGraphNode (gn)
{
	return JSON.stringify(gn);
};

function stringifyPath(bath) {
	var tempstring= "";
	for (j=0;j<bath.length; j++){
		tempstring += stringifyGraphNode(bath[j]);
		tempstring += ",";
	}
	console.log( tempstring);
};

function buildGNFromLoadedinfo(tempstring) {
    
    var tempobj = JSON.parse(tempstring);
    //for( var i=0; i<tempobjs.length; i++ ) {
	//var tempobj = tempobjs[i];

	return tempobj;
}

function buildPathFromLoadedinfo(tempstring) {
    
    var tempobj = JSON.parse(tempstring);
    //for( var i=0; i<tempobjs.length; i++ ) {
	//var tempobj = tempobjs[i];
	ning=new appointment();
	ning.name=tempobj.name;
	ning.address=tempobj.address;
	return ning;
}
	
function savePaths(ports) {
	var name="portpaths";
	var totstring="";
	for(var i=0;i<ports.length;i++) //first port
	{
		var botstring="";
		for(var j=0;j<ports.length;j++) //path to second port
		{
			var tar=name.concat(i);
			tar=tar+",";
			var tar=tar.concat(j);
			tar=tar+",";
			console.log(tar);
			//localStorage.setItem(tar,ports[i].portPaths[j].length);
			var mepstring="";
			for(var g=0;g<ports[i].portPaths[j].length;g++) //graph nodes
			{
				var har=tar.concat(g);
				har=har+",";
				var tempstring=stringifyGraphNode(ports[i].portPaths[j][g]);
				mepstring+=",";
				mepstring=mepstring.concat(tempstring);
				
				//localStorage.setItem(har,tempstring);

			}
			botstring=botstring.concat(mepstring);
			botstring+=";";
		}
		totstring=totstring.concat(botstring);
		totstring+=":";
	}
	//console.log(totstring);
	//localStorage.setItem(name,totstring);
}
	
function loadPaths() {
	//todo
	return;
	var name="portpaths";

	for(var i=0;i<39;i++) //first port
	{
		var tar=name.concat(i);
		var amount=39;//localStorage.getItem(tar+"num");
		for(var j=0;j<amount;j++) //path to second port
		{
			var lar=name.concat(i)
			lar=lar+",";
			lar.concat(j);
			var camount = localStorage.getItem(lar+"number");
			for(var g=0;g<camout;g++) //graph nodes
			{
				var har=lar.concat(g);
				har=har+",";
				var tempdata = localStorage.getItem(har);
				buildGNFromLoadedinfo(tempdata);
			}
			
		}
	}

}





function generateRandomDude()
{

};