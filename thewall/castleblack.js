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



function watchman()
{
	this.maxHp=100;
	this.hp=100;
	this.warmth=100;
	this.speed=5;
	this.intelligence=5;
	this.perception=5;
	this.fName="Miles";
	this.lName="";
};

function aWatch(){
	this.men=new Array(); //array!
	this.ships=new Array();
	this.rangerSquads=new Array();
	this.caravans=new Array();
	this.farms=new Array();
	this.settlements=new Array();
	this.recruits=new Array();
	this.trainingDays=10;
	this.gold=1500;
	this.prestige=10;
	this.health=100;
	this.horses=6;
	this.food=0;
	this.fireWood=1000;
	this.starving=false;
	this.wounded=0;
	this.mealsPerDay=2;
	this.stores=new Array();
	this.resources=new Array();
	this.stores.push(new commodity(CommIDs.SaltBeef,41));
	this.stores.push(new commodity(CommIDs.SaltFish,51));
	this.stores.push(new commodity(CommIDs.Capon,3));
	this.stores.push(new commodity(CommIDs.LemonCakes,11));
	
	this.resources.push(new commodity(CommIDs.OakWood,100));
	
	aWatch.prototype.getFood=function() //go through stores and compute numerical value of food. do one for wood also. 
	{
		var funt=0;
		for(var i=0;i<this.stores.length;i++)
		{
			if(this.stores[i].id<55)
			{
				funt+=this.stores[i].amount;
			}
		}
		return funt;
	};
	
	aWatch.prototype.spend=function(amt)
	{
		if(this.gold>amt)
		{
			this.gold-=amt;
			return true;
		}else
		{
			return false;
		}
	};
	
	aWatch.prototype.timeToStarve=function() //go through stores and compute numerical value of food. do one for wood also. 
	{
		var funt=0;
		for(var i=0;i<this.stores.length;i++)
		{
			if(this.stores[i].id<55)
			{
				funt+=this.stores[i].amount;
			}
		}
		return Math.floor(funt/(this.mealsPerDay*this.countMen()));
	};
	
	aWatch.prototype.insertResource=function(res)
	{
		//search for existing instance of res.id in stores. add to, or put at end if none found. 
		for(var i=0;i<this.stores.length;i++)
		{
			if(this.stores[i].id==res.id)
			{
				//console.log(this.stores[i].id,res.id);
				this.stores[i].combine(res);
			}
		}
		if(res.amount>0) {
			this.stores.push(res);
		}
	};
	
	aWatch.prototype.logMen=function()//todo break into three lists ranger builder steward
	{
		bConsoleBox.log("Men of the Watch: ("+this.countMen()+")");
		var menses=this.getAllMen();
		for(var i=0;i<menses.length;i++)
		{
			bConsoleBox.log("  "+menses[i].name+" - "+menses[i].task);
		}
	};
	for(var i=0;i<15;i++)
	{
		this.insertResource(new commodity(Math.floor(Math.random()*50),Math.floor(Math.random()*16+1)));
	}
	aWatch.prototype.logShips=function()
	{
		bConsoleBox.log("Ships of the Watch: ("+this.ships.length+")");
		for(var i=0;i<this.ships.length;i++)
		{
			bConsoleBox.log("  "+this.ships[i].name);
			//bConsoleBox.log("  "+this.ships[i].captain.name);
			bConsoleBox.log("    Home: "+this.ships[i].ports[0].name);
			bConsoleBox.log("    Dest: "+this.ships[i].ports[this.ships[i].portTrack].name);
			
			bConsoleBox.log("    Crew: ");
			for(var j=0;j<this.ships[i].men.length;j++)
			{
				bConsoleBox.log("       "+this.ships[i].men[j].name);
			}
			
			bConsoleBox.log("     Cargo: ");
			for(var j=0;j<this.ships[i].cargo.length;j++)
			{
				bConsoleBox.log("       "+this.ships[i].cargo[j].amount+" "+this.ships[i].cargo[j].name);
			}
		}
	};
	
	aWatch.prototype.firstFood=function()
	{
		var duf=null;
		for(var i=0;i<this.stores.length;i++)
		{
			if(this.stores[i].id<55)
			{
				return this.stores[i]; //how am I eating this thing. change the amt later I guessg? 
			}
		}
		return duf;
	};
	
	
	aWatch.prototype.haveMeal=function()
	{
		this.hunger=this.men.length;
		while(this.hunger>0)
		{	
			//console.log(this.hunger);
			this.feed();
			if(this.stores.length<1) //has food. NOT ALL ITEMS ARE FOOD
			{
				return false;
			}
			for(var i=0;i<this.stores.length;i++)
			{
				if(this.stores[i].amount<1)
				{
					this.stores.splice(i,1);
				}
			}
			
		}
	};
	
	aWatch.prototype.feed=function()
	{
		var fed=this.firstFood();
		
		var diff=0;
		if(!fed)
		{
			//starvation
			bConsoleBox.log("Your men are starving.");
			this.health-=10;
			this.hunger=0; // but not really. take health? kill dudes?
		}else if(this.hunger<fed.amount)
		{
			fed.amount-=this.hunger;
			this.hunger=0;
		}else
		{
			this.hunger-=fed.amount;
			fed.amount=0;
		}

	};
	
	aWatch.prototype.logStores=function()
	{
		bConsoleBox.log("Your supplies: ("+this.stores.length+")");
		for(var i=0;i<this.stores.length;i++)
		{
			bConsoleBox.log("  "+this.stores[i].amount+" "+this.stores[i].name);
		}
		if(this.stores.length==0)
		{
			bConsoleBox.log("  Nothing");
		}
		bConsoleBox.log("Earmarked for pick up:");
		for(var i=0;i<this.resources.length;i++)
		{
			bConsoleBox.log("  "+this.resources[i].amount+" "+this.resources[i].name);
		}
		if(this.resources.length==0)
		{
			bConsoleBox.log("  Nothing");
		}
	};
	
	aWatch.prototype.update=function()
	{
		

		if(trainTick)
		{
			if(this.mealsPerDay<2)
			{
				if(this.health>10)
				{
					this.health--;
				}
			}else if(this.mealsPerDay>2)
			{
				this.health++;
				if(this.health>100)
				{
					this.health=100;
				}
			}
			trainTick=false;
			for(var i=0;i<this.recruits.length;i++)
			{
				
				this.recruits[i].trainingDays--;
				
				if(this.recruits[i].trainingDays<1)
				{
					this.recruits[i].task="Manning the wall"
					this.men.push(this.recruits[i]);
					this.recruits.splice(i,1);
				}
			}
		}
		
		
		//check stores and remove things you are out of.
		for(var i=0;i<this.stores.length;i++)
		{
			if(this.stores[i].amount<1)
			{
				this.stores.splice(i,1);
			}
		}
		//eat!
		if((thyme.hours==6) && (thyme.minutes==0)&& (thyme.tick==1))
		{
			this.haveMeal()
			//if(this.hunger>0) {console.log("Canibalism!");}
		}
		if((this.mealsPerDay>1)&&(thyme.hours==12) && (thyme.minutes==0)&& (thyme.tick==1))
		{
			this.haveMeal();
			//if(this.hunger>0) {console.log("Canibalism!");}
		}
		if((this.mealsPerDay>2)&&(thyme.hours==18) && (thyme.minutes==0)&& (thyme.tick==1))
		{
			this.haveMeal();
			//if(this.hunger>0) {console.log("Canibalism!");}
		}
		if(this.health<1)
		{
			gameOver="Your men have all starved to death.";
		}
		if(this.men.length<1)
		{
			gameOver="Your men have all died.";
		}
		/*if(this.defaultLoan)
		{
			gameOver="You failed to repay your loan to the Iron Bank.";
		}
		if(you lost all your castles)
		{
			gameOver="The Wildlings have taken the Wall.";
		}
		*/
	};
	
	aWatch.prototype.calcFoodEaten=function()
	{
		return men.length;
	};
	
	aWatch.prototype.getAllMen=function()
	{
		var cont=new Array();
		for(var i=0;i<this.men.length;i++)
		{
			cont.push(this.men[i]);
		}
		for(var i=0;i<this.ships.length;i++)
		{
			for(var j=0;j<this.ships[i].men.length;j++)
			{
				cont.push(this.ships[i].men[j]);
			}
		}
		
		for(var i=0;i<this.rangerSquads.length;i++)
		{
			for(var j=0;j<this.rangerSquads[i].men.length;j++)
			{
				cont.push(this.rangerSquads[i].men[j]);
			}
		}
		for(var i=0;i<this.farms.length;i++)
		{
			for(var j=0;j<this.farms[i].men.length;j++)
			{
				cont.push(this.farms[i].men[j]);
			}
		}
		for(var i=0;i<this.caravans.length;i++)
		{
			for(var j=0;j<this.caravans[i].men.length;j++)
			{
				cont.push(this.caravans[i].men[j]);
			}
		}
		for(var i=0;i<this.recruits.length;i++)
		{
			cont.push(this.recruits[i]);
		}
		return cont;
	};
	
	aWatch.prototype.countMen=function()
	{
		var cont=this.men.length;
		for(var i=0;i<this.ships.length;i++)
		{
			cont+=this.ships[i].men.length;
		}
		
		for(var i=0;i<this.rangerSquads.length;i++)
		{
			cont+=this.rangerSquads[i].men.length;
		}
		for(var i=0;i<this.farms.length;i++)
		{
			cont+=this.farms[i].men.length;
		}
		for(var i=0;i<this.caravans.length;i++)
		{
			cont+=this.caravans[i].men.length;
		}
		cont+=this.recruits.length;
		return cont;
	};
	
	aWatch.prototype.sendMan=function(id,post)
	{
		if(post.men.length<post.maxMen)
		{
			this.men[id].task=post.task;
			post.men.push(this.men[id]);
			this.men.splice(id,1);
		}
	};
	
	aWatch.prototype.collectTribute=function()
	{
		//eventually randomize from various castles?
		var gil=Math.floor(Math.random()*170)+60;
		this.gold+=gil;
		var mens=gil=Math.floor(Math.random()*3)+3;
		for(var i=0;i<mens;i++)
		{
			this.men.push(new dude());
		}
		bConsoleBox.log("Happy New Year! ");
		bConsoleBox.log("Recived annual tribute from Winterfell.");
		bConsoleBox.log(mens+" Recruits and "+gil+" Gold");
	};
}

function generateRandomDude()
{

};