var techNames=["Aeroponics","Emergency Rations","Waffle Fries","Microbrewed Beer","Printers That Dont Need Paper With Those Holes On Each Side","Sneakers With Lights On Them","Captioning Pictures Of Cats","Inertial Dampners","Warp Drive","TransWarp","Slipstream","Shitty Sensors","Sensors","Long Range Sensors","Astrometrics","DetectTacheons","DetectCloakythings","DetectWormholethings","ShittyCloak","Cloak","BestCloak","Lasers","Phasers","Disruptors","BestEnergyWeapon","Torpedos","PhotonTorpedos","QuantumTorpedos","TransPhasicTorpedos","PowerCells","Grapple","TractorBeam","StructualIntegrityBeam","Transporter","TransportEnhancer","EmergencyTransporter","AdvTransporter","thatbullshitfromthenewmovie","Energy Shields","AdvEnergyShields","MetaPhasicShields","Armor","AblatativeArmor","MicroCircutry","BioNeuralCircutry","Nanobots","Assimilation","AlienMedican","AlienSurgery","Cloning","GeneticResequencing","Synthahol","AdvEnviromentalControls","ContainmentField","SubspaceTheory","ImpulseProbe","WarpProbe","Statis","WarpEscapePods","AdvEscapePods","AI","Robotics","Androids","Cybernetics","PowerManagment","Replicators","PowerManagment","Capacitors","Holodecks","EMH","MobileEmiter","AdvMetallurgy","DeuteriumCollector","Deflector"];
var hasItem=[];
var numItems=2;
var playerCiv=0;
var civs=[];
var clean=false;//true;
var Items={};
Items.RomulanPrisoner=0;
Items.Neelix=1;

for(var i=0;i<numItems;i++)
{
	hasItem.push(false);
}

var AIModes={};
AIModes.Normal=0;
AIModes.Agressive=6;
AIModes.Expansion=1;
AIModes.Defense=2;
AIModes.Explore=3;
AIModes.AgressiveDefense=4;
AIModes.Genocidal=5;
AIModes.Explor=7;

var Techs = {};
Techs.Aeroponics=1;
Techs.MERations=2; //start with.
Techs.WaffleFries=3;  //increases morale
Techs.Microbrew=4;
Techs.PrintersThatDontNeedPaperWithThoseHolesOnEachSide=5;
Techs.SneakersWithLightsOnThem=6;
Techs.CaptioningPicturesOfCats=7; // demolishes a civilzation's productivity
Techs.InertialDampners=8; //you can skip this, but if you do you crew will take huge damage accelerating or decerlarting too quicky.
Techs.Warp=9;
Techs.TransWarp=11;
Techs.Slipstream=12;
Techs.ShittySensors=13;
Techs.Sensors=14;
Techs.LongRangeSensors=15;
Techs.Astrometrics=16;
Techs.DetectTacheons=17;
Techs.DetectCloakythings=18;//todo.
Techs.DetectWormholethings=19;

Techs.ShittyCloak=20;
Techs.Cloak=21;
Techs.BestCloak=22;

Techs.Lasers=23;
Techs.Phasers=24;
Techs.Disruptors=25;
Techs.BestEnergyWeapon=26; //todo

Techs.Torpedos=27;
Techs.PhotonTorpedos=28;
Techs.QuantumTorpedos=29;
Techs.TransPhasicTorpedos=30;

Techs.PowerCells=31;

Techs.Grapple=32;
Techs.TractorBeam=33;
Techs.StructualIntegrityBeam=34;

Techs.Transporter=35;
Techs.TransportEnhancer=36;
Techs.EmergencyTransporter=37; //from nemesis

Techs.AdvTransporter=38; //penatrate some shields
Techs.thatbullshitfromthenewmovie=39;// why bother with starships?


Techs.EnergyShields=40;
Techs.AdvEnergyShields=41;
Techs.MetaPhasicShields=42;

Techs.Armor=43;
Techs.AblatativeArmor=44;

Techs.MicroCircutry=45;
Techs.BioNeuralCircutry=46;
Techs.Nanobots=47;
Techs.Assimilation=48;

Techs.AlienMedican=49;
Techs.AlienSurgery=50;
Techs.Cloning=51;
Techs.GeneticResequencing=52;//edit crew in some way, change race?
Techs.Synthahol=53; //removes drunken events, morale down.

Techs.AdvEnviromentalControls=54;
Techs.ContainmentField=55;

Techs.SubspaceTheory=56;
Techs.ImpulseProbe=57;
Techs.WarpProbe=58;

Techs.Statis=59;
Techs.WarpEscapePods=60;
Techs.AdvEscapePods=61; //statis, cloak. 

Techs.AI=62;
Techs.Robotics=63;
Techs.Androids=64;
Techs.Cybernetics=65;

Techs.PowerManagment=66;
Techs.Replicators=67;
Techs.PowerManagment=68;
Techs.Capacitors=69;
Techs.Holodecks=70;
Techs.EMH=71;
Techs.MobileEmiter=72;
Techs.AdvMetallurgy=73;
Techs.DeuteriumCollector=74;
Techs.Deflector=75;

function culture()
{
	this.militarism=5;
	this.religon=5;
	this.cuntiness=5;
	this.diplomacy=5;
	this.education=5;
	this.medicine=5;
	this.immunity=5;//whoa awesome what are you thinking here?!
	this.beurocracy=5; //which is better +/-?! //rename organization?
	this.boneisity=5; //the rate at which the reporduce
	this.art=5;
	this.optimism=5;
	this.xenophobia=5;
	this.constitution=5;//how well they hold up before resorting to things.
	this.slavery=false;
	
	this.personality=Math.floor(Math.random()*5);
	
	
}

function building(typ,wrld)
{
	this.name="bullshit";
	this.hp=100;
	this.maxHp=100;
	this.defense=1;
	this.ship=false;
	this.building=true;
	this.type=typ;
	this.world=wrld;
	if(this.type==Buildings.Lab)
	{
		this.name="Research Lab";
	}else if(this.type==Buildings.MilitaryBase)
	{
		this.name="Military Base";
		this.defense=3;
	}else if(this.type==Buildings.Mine)
	{
		this.name="mine";
	}else if(this.type==Buildings.Shipyard)
	{
		this.name="Shipyard";
		this.defense=2;
	}else if(this.type==Buildings.ShieldGrid)
	{
		this.name="Planetary Shield Grid";
		this.defense=2;
	}else if(this.type==Buildings.Library)
	{
		this.name="Library";
	}else if(this.type==Buildings.DaveAndBusters)
	{
		this.name="Dave & Busters";
	}else if(this.type==Buildings.OrbitalDefense)
	{
		this.name="Orbital Defense Control";
	}
}
var numCivFlags=10;
function civilization()
{
	this.civID=0;
	this.knownWorlds=[];
	this.color="purple";
	this.player=false;
	this.yearFlag=false;
	this.alive=true;
	this.hostileOnContact=false;
	this.hostileOnIncursion=false;
	this.name="Humanity";
	this.content=100;  //clf: they are happy.  They do not have 100 contents.
	this.techs=[];
	this.homeStar=0;
	this.homePlanet=2;
	this.flags=[];
	this.maxShips=95;
	for(var i=0;i<numCivFlags;i++)
	{
		this.flags.push(false);
	}
	this.homeworldWarning=true; //todo, allow them to recover and then get warned again later.
	this.researchRate=1;
	this.encounterTrack=0;
	this.money=1000;
	this.enemyCiv=null;
	this.AI=true;
	this.mode=AIModes.Explore;
	this.allied=false;
	this.fallenBack=false;
	this.targetWorlds=[];
	this.crewPool=[];
	this.targetPods=false;
	this.fallingBack=false;
	this.captainQueue=[];
	this.initialProduction=false;
	this.prisoners=[];
	this.numShipsStart=0;
	this.researchProgress=0;
	this.researchTick=0;
	this.nextResearch=100;
	this.numDefending=2;
	this.productionQueue=[];
	this.productionTick=0;
	this.productionRate=1;
	this.nextProduction=100;
	this.updateRate=100;
	this.messages=[];
	this.greeting="Greetings.";
	this.curShip=0;
	this.updateTick=Math.floor(Math.random()*90);//0;
	this.ships=[];
	this.worlds=[];
	this.fleets=[];
	this.fContacted=[];
	this.autoHostile=[];
	this.deadShips=[];
	
	for(var ipk=0;ipk<numRaces;ipk++){
		this.fContacted[ipk]=false;
	}
	this.techs=[];
	for(var i=0;i<100;i++)
	{
		this.techs.push(false);
	}
	this.techs[Techs.Sensors]=true;
	this.techs[Techs.Phasers]=true;
}
	civilization.prototype.checkDeath=function()
	{
		var live=false;
		if(this.worlds.length+this.ships.length>0)
		{
			live=true;
		}else
		{
			this.alive=false;
			console.log("The last "+this.name+" has died.");
			this.cleanUp();
		}
	};
	
	civilization.prototype.inOurSpace=function(hip)
	{
		for (var i=0;i<this.worlds.length;i++)
		{
			if(distance(this.worlds[i],hip)<500)
			{
				return true;
			}	
		}
		return false;
	};
	
	civilization.prototype.knowAllHomeWorlds=function()
	{
		this.knownWorlds=[];
		for(var i=0;i<civs.length;i++)
		{
			this.knownWorlds.push(civs[i].homeworld);
		}
	};
	
	civilization.prototype.knowAllWorlds=function()
	{
		this.knownWorlds=[];
		for(var i=0;i<stars.length;i++)
		{
			for(var j=0;j<stars[i].planets.length;j++)
			{
				this.knownWorlds.push(stars[i].planets[j]);
			}
		
		}
	};
	
	civilization.prototype.getTax=function()
	{
		var tax=0;
		for(var i=0;i<this.worlds.length;i++)
		{
			tax+=this.worlds[i].taxRate;
		}
		this.money+=tax;
	};
	
	civilization.prototype.cleanUp=function()
	{
		for(var i=0;i<this.worlds.length;i++)
		{
			this.worlds[i].civ=null;
			this.worlds[i].colonized=false; //todo: leave them independant, or give them to conquorer
	
			var pt=this.worlds[i].sun.civs.indexOf(this);
			if(pt>-1)
			{
				this.worlds[i].sun.civs.splice(pt,1);
				//console.log("removed "+this.civ.name+ " from the "+this.sun.name + " System civ list");
			}
		}
		this.ships=[];
	};
	
	var justOnce=false;
	
	civilization.prototype.newMasterAI=function()
	{
		//choose production
		if(!this.initialProduction)
		{
			this.produceBuilding(Buildings.ShieldGrid,this.homeworld);
			this.produceBuilding(Buildings.Mine,this.homeworld);
			this.produceBuilding(Buildings.OrbitalDefense,this.homeworld);
			this.money-=300;
			this.initialProduction=true;
		}else
		{
			var cost=300;
			if(this.civID==civIDs.Borg) {cost=15000;}
			if((this.money>cost-1) && (this.ships.length<this.maxShips))
			{
				
				if(this.produceShip(9,this.homeworld))
				{
					this.money-=cost;
				}
			}
		}
		
		if(this.civID==civIDs.Borg) //for now the borg have a seperate much simpler AI.  Kill everything.
		{
			return;
		}

		if((this.enemyCiv) && (this.targetWorlds.length<2))
		{
			for(var i=0;i<this.enemyCiv.worlds.length;i++)
			{
				this.targetWorlds.push(this.enemyCiv.worlds[i]);
			}
		}
		//remove dead enemies
		for(var i=0;i<this.autoHostile.length;i++)
		{
			if(!this.autoHostile[i].alive)
			{
				this.autoHostile.splice(i,1);
				i--;
			}
		}
		
		if(this.homeworld.civ!=this)//revenge at all costs against enemyciv.
		{
			this.enemyCiv=this.homeworld.civ;
			for(var i=0;i<this.ships.length;i++)
			{
				//first hit their ships
				if(this.enemyCiv.ships.length>0)
				{
					var bobert = this.ships[i].nearestSpecificShip(this.enemyCiv);
					if(bobert)
					{
						this.ships[i].orders=Orders.Attack;
						this.ships[i].setDestination(bobert,3);//this.ships[i].maxSpeed);
							
						//this.ships[i].orbiting=false;
						
					}
				}else if((this.enemyCiv.homeworld.civ===this.enemyCiv) && (this.ships[i].orbitTarg!=this.enemyCiv.homeworld)&& (this.ships[i].desiredOrbitTarg!=this.enemyCiv.homeworld))
				{
					this.ships[i].orderOrbit(this.enemyCiv.homeworld); //orderattack?
					this.ships[i].orders=Orders.Attack;
					this.ships[i].AIMode=AIModes.Agressive;
					if(this.enemyCiv.homeworldWarning)
					{
						
						
						console.log("The "+this.name+" have eliminated all "+this.enemyCiv.name+ " ships and are headed to " +this.enemyCiv.homeworld.name);
						this.enemyCiv.homeworldWarning=false;
					}
				}else if((this.enemyCiv.worlds.length>0) && (true)) // !this.ships[i].desiredOrbitTarg))
				{
					if((!this.ships[i].orbitTarg) || ((this.ships[i].orbitTarg) && (this.ships[i].orbitTarg.civ!=this.enemyCiv)))
					{
					//console.log("!!!!!!!!!!Lost Homeworld!!!!!!!moping up!");
					this.ships[i].orderOrbit(this.enemyCiv.worlds[0]);
					}
					this.ships[i].orders=Orders.Attack;
				}else
				{
					//resettle on new planet?
					//this.ships[i].planetTarget=null;
					//this.ships[i].orders=Orders.Explore;
				}
				if(this.ships[i].orders==Orders.Attack)
				{
					//later.
				}
				
			}
			return;
		}
		
		if(this.allied) {
			if(!civs[playerCiv].alive)
			{
				this.allied=false;
			}
			return;
		}
		if((borgTrack==this.civID) && (civs[civIDs.Borg].ships.length>0))
		{
			if(!this.fallingBack)
			{
				//fall back to homeworld!
				this.fallingBack=true;
				for(var i=0;i<this.ships.length;i++)
				{
					this.ships[i].orderOrbit(this.homeworld);
					this.ships[i].desiredSpeed=this.ships[i].maxSpeed;
				}
				console.log("All ships returning to "+this.homeworld.name+" to aid in its defense");
			}
		}else
		{
			this.fallingBack=false;
		}
		
		//set each ship's state
		//var counter=0;
		if(!justOnce)
		{
			for(var counter=0;(counter<this.numDefending) &&(counter<this.ships.length);counter++)
			{
				this.ships[counter].AIMode=AIModes.Defense;
			}
			justOnce=true;
		}
		//if you have an enemy, and hella ships, then go attack him.
		if((this.ships.length>10) && (this.autoHostile.length>0))
		{
			for(var counter=this.numDefending;counter<this.ships.length;counter++)
			{
				this.ships[counter].AIMode=AIModes.Agressive;
			}
		}else
		{
			for(var counter=this.numDefending;counter<this.ships.length;counter++)
			{
				this.ships[counter].AIMode=AIModes.Explore;
			}
		}		
		
		for(var i=0;i<this.ships.length;i++)
		{
			if(this.ships[i].AIMode==AIModes.Genociadal)
			{
				//select a race and attack them till they die planet and take it
			}else if(this.ships[i].AIMode==AIModes.Agressive)
			{
				if(this.autoHostile.length<1)
				{
					this.ships[i].desiredOrbitTarg=null;
					this.ships[i].planetTarget=null;
					this.ships[i].destination=null;
					//console.log("No enemies left for "+this.name+" to fight.");
					this.ships[i].AIMode=AIModes.Explore;
					return;
				}
				if((this.enemyCiv) && (!this.enemyCiv.alive))
				{
					if(this.autoHostile.length>1)
					{
						this.enemyCiv=this.autoHostile[1];
					}else
					{
						this.enemyCiv=null;
						this.ships[i].AIMode=AIModes.Explore;
					}
				}
				if(!this.enemyCiv)
				{
					this.enemyCiv=this.autoHostile[0];
				}
				if(this.enemyCiv.ships.length>0)
				{
					var bobert = this.ships[i].nearestSpecificShip(this.enemyCiv);
					if(bobert)
					{
						this.ships[i].orders=Orders.Attack;
						this.ships[i].setDestination(bobert,this.ships[i].crusingSpeed);
						
					}
				}else if((this.enemyCiv.homeworld.civ==this.enemyCiv) && (this.ships[i].orbitTarg!=this.enemyCiv.homeworld)&& (this.ships[i].desiredOrbitTarg!=this.enemyCiv.homeworld))
				{
					//console.log("sending " +this.name+" "+ships[i].name+" to enemy homeworld");
					this.ships[i].orderOrbit(this.enemyCiv.homeworld); //orderattack?
					this.ships[i].orders=Orders.Attack;
					if(this.enemyCiv.homeworldWarning)
					{
						console.log("The "+this.name+" have eliminated all "+this.enemyCiv.name+ " ships and are headed to " +this.enemyCiv.homeworld.name);
						this.enemyCiv.homeworldWarning=false;

					}
				}else if((this.targetWorlds.length>0)) //&& (this.ships[i].orbitTarg.civ!=this.enemyCiv))
				{
					this.ships[i].orderOrbit(this.targetWorlds[0]);
					this.ships[i].orders=Orders.Attack;
				}else if(false)
				{
					this.ships[i].orderOrbit(this.targetWorlds[0]);
					this.ships[i].orders=Orders.Attack;
				}
			}else if(this.ships[i].AIMode==AIModes.Expanding)
			{
			
			}else if(this.ships[i].AIMode==AIModes.Explore)
			{
			
				if((!this.ships[i].desiredOrbitTarg) || (this.ships[i].orbitTarg))//todo
				{
					var blah=Math.floor(Math.random()*(numSystems-1))+1;
					var gah=Math.floor(Math.random()*stars[blah].numPlanets);
					this.ships[i].orderOrbit(stars[blah].planets[gah]);
				}
			
			}else if(this.ships[i].AIMode==AIModes.Defense) 
			{
				//move at least one ship to each system
				this.ships[i].AIMode=0;
				var whichWorld=0;
				this.ships[i].orderOrbit(this.worlds[whichWorld]);
				if((this.ships[i].colony) || (this.ships[i].freighter))
				{
					break;
				}
				whichWorld++;
				if(whichWorld>this.worlds.length)
				{
					whichWorld=0;
				}
			}else if(this.ships[i].AIMode==AIModes.AgressiveDefense)
			{
				//attack anyone in your space
			}
		}
	};
	
	
	civilization.prototype.conquer=function(plan)
	{
//breen repeatidly conquoring dominion homeworld?
		if(plan.civ==this) {return;}
		if(plan.civ)
		{
			for(var i=0;i<plan.civ.worlds.length;i++)
			{
				if(plan.civ.worlds[i]==plan)
				{
					plan.civ.worlds.splice(i,1)
					i--;
				}
			}
		}
		plan.civ=this;
		plan.colonized=true;
		var t=this.targetWorlds.indexOf(plan);
		if(t!=-1)
		{
			this.targetWorlds.splice(t,1);
		}
		for(var i=0;i<this.ships.length;i++)
		{
			if(this.ships[i].planetTarget==plan)
			{
				this.ships[i].planetTarget=null;
				this.ships[i].attackingPlanet=null;
				this.ships[i].orders=0;
			}
		}
		this.worlds.push(plan);
		plan.sun.civs.push(this);
		if(this.civID!=civIDs.Borg)
		{
			console.log(plan.name+ " has been conquered by "+this.name);
		}else
		{
			console.log(plan.name+ " has been assimilated by The Borg.");
		}
	};
	
	civilization.prototype.declareWar=function(them)
	{
		console.log(this.name+" declared war on "+them.name);
		this.autoHostile.push(them);
	};
	civilization.prototype.cycleShips=function(cam)
	{
		if(this.ships.length<1)
		{
			console.log("You have no ships!");
			return;
		}else
		{
			console.log("You have no other ships!");
			return;
		}
		if(selectedShip.manualControl)
		{
			selectedShip.manualHelm();
		}
		this.curShip++;
		if(this.curShip>this.ships.length-1) {
			this.curShip=0;
		}
		selectedShip=this.ships[this.curShip];
		cam.center(this.ships[this.curShip]);
		cam.follow(this.ships[this.curShip]);
	};
	civilization.prototype.orderColonize=function(world){
		if(world.colonized)
		{
			console.log("The planet "+world.name+" has already been colonized by the "+races[world.civID]);
			return;
		}
		//check for free colony ship, if not add one to build queue
		var bob=this.freeColonyShip();
		if(bob)
		{
			bob.desiredOrbitTarg=world;
			bob.orders=Orders.Colonize;
			console.log(bob.prefix+" "+bob.name+ " has been orderd to colonize "+world.name);
		}else
		{
			if(this.money>150-1)
			{
				if(this.produceShip(1,this.homeworld,world))//(ShipClass[this.civID].colony);
				{
					this.money-=150;
				}
				console.log("A new colony ship is being constructed to colonize "+world.name);
			}else
			{
				console.log("Not enough money to build colony ship.");
			}
		}
		//set its destination, crew it
	};
	civilization.prototype.getProductionRate=function()
	{
		var rate=0;
		for(var i=0;i<this.worlds.length;i++)
		{
			rate+=this.worlds[i].getProduction();
		}
		this.productionRate=rate;
		return rate;
	};
	
	civilization.prototype.getResearchRate=function()
	{
		var rate=0;
		for(var i=0;i<this.worlds.length;i++)
		{
			rate+=this.worlds[i].getResearch();
		}
		this.researchRate=rate;
		return rate;
	};
	
	civilization.prototype.freeColonyShip=function() //todo find closest to world.
	{
		for (var i=0;i<this.ships.length;i++)
		{
			if(this.ships[i].colony)
			{
				return this.ships[i];
			}
		}
		return null;
	};
	
	civilization.prototype.producePlatform=function(lass,worldstart)
	{
		var tar=false;
		for(var i=0;i<worldstart.buildings.length;i++)
		{
			if(worldstart.buildings[i].type==Buildings.OrbitalDefense)
			{
				tar=true;
			}
		}
		if(!tar)
		{
			console.log("Cannot launch platform on "+worldstart.name+" without Orbital control building.");
			return;
		}
		var jimmy=newPlatform(worldstart);
		//jimmy.alive=false;
		if((logAll) ||(this==civs[playerCiv]))
		{
			console.log("Began contructing on an orbital weapons platform ");
		}
		this.productionQueue.push(jimmy);
	};
	
	civilization.prototype.produceShip=function(lass,worldstart,worldgo)//todo make worldstart do something
	{
		if(this.player)
		{
			if(this.captainQueue.length>0)
			{
				var theguy=this.captainQueue[0];
				this.captainQueue.splice(0,1);
				if(theguy.rank<5)
				{
					theguy.rank=5;
					theguy.title="Captain";
				}
				this.crewPool.splice(0,1);
				var jimmy=newShip(this,worldstart,theguy);
			}else
			{
				if(!this.AI)
				{
					console.log("No qualified captain for proposed new ship!");
				}
				return false;
			}
		}else
		{
			var jimmy=newShip(this,worldstart);
		}
		if(!worldstart)
		{
			worldstart=this.homeworld;
		}

		if(lass==1)
		{
			jimmy.colony=true;
			if(worldgo)
			{
				jimmy.desiredOrbitTarg=worldgo;
				jimmy.orders=Orders.Colonize;
			}
		}
		if(this.player)
		{
			console.log("Began contructing on the starship "+jimmy.name);
		}
		this.productionQueue.push(jimmy);
		return true;
	};
	
	civilization.prototype.produceBuilding=function(type,wrld){
		if(wrld.buildings.length<wrld.maxBuildings)
		{
			var timmy=new building(type,wrld);
			this.productionQueue.push(timmy);
			if((logAll) ||(this==civs[playerCiv]))
			{
				console.log("Began contructing a new "+timmy.name+" on " +wrld.name);
			}
		}else
		{
			if((logAll) ||(this==civs[playerCiv]))
			{
				console.log("Can't fit any more buildings on " +wrld.name);
			}
		}
	};
	
	civilization.prototype.colonize=function(world){
		if(world.colonized)
		{
			console.log("The planet "+world.name+" has already been colonized by the "+world.civ.name);
			return;
		}
		this.worlds.push(world);
		world.civID=this.civID;
		world.civ=this;
		if(world.sun.civs.indexOf(this)==-1)
		{
			world.sun.civs.push(this);
		}
		world.colonized=true;
		world.colonizedDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
		console.log("The planet "+world.name+" has been successfully colonized by the "+this.name);
		if(Math.random*10<5)
		{
			this.generatePlanetEvent(world);
		}
	};
	
	civilization.prototype.addHostile=function(iv)
	{
		if(this.autoHostile.indexOf(iv)>-1)
		{
			return;
		}
		this.autoHostile.push(iv);
	};
	
	civilization.prototype.update=function()
	{
		
		if(!this.alive) {return;}
		
		this.checkDeath();
		if(this.yearFlag)
		{
			this.getTax();
			this.yearFlag=false;
		}
		if(this.messages[0])
		{
			this.messages[0].update();
			if(!this.messages[0].exists){
				this.messages.splice(0,1);
			}
		}
		
		for(var i=0;i<this.ships.length;i++)
		{
			if (!this.ships[i].alive)
			{
				this.ships.splice(i,1);
				i--;
			}
		}
		
		for(var i=0;i<this.worlds.length;i++)
		{
			if (!this.worlds[i].alive)
			{
				this.worlds.splice(i,1);
				i--;
			}
		}
		if(holdEverything) {return;}
		this.updateTick+=1*gameSpeed;
		if(this.updateTick>this.updateRate)
		{
			
			if(this.AI)
			{
				this.newMasterAI();
			}
			
			this.updateTick=0;
			this.getResearchRate();
			this.researchTick+=this.getResearchRate()*gameSpeed;
			if(this.researchTick>this.nextResearch)
			{
				//finished researching somthing!
				this.techs[this.researchProgress]=true;
				if((logAll) ||((this==civs[playerCiv]) &&(!this.AI)))
				{
					console.log("The "+this.namePlural+ " have discovered "+techNames[this.researchProgress]);
				}
				if(this.researchProgress<this.techs.length)
				{
					this.researchProgress++;
				}
				this.researchTick=0;
				this.nextResearch+=100;
				
			}
			if(this.productionQueue.length>0)
			{
				this.productionTick+=this.getProductionRate()*gameSpeed;
				if(this.productionTick>this.nextProduction)
				{
					this.productionTick=0;
			
						
					
					var jerry=this.productionQueue[0];
					if(jerry)
					{
						if(jerry.ship)
						{
							if((logAll) ||(this==civs[playerCiv]))
							{
								console.log("Humanity produced the starship "+jerry.name);
							}
							jerry.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
							this.ships.push(jerry);
							ships.push(jerry);
						}else if(jerry.platform)
						{
							if((logAll) ||(this==civs[playerCiv]))
							{
								console.log("Humanity produced an orbital defense platform on "+jerry.orbitTarg.name);
							}
							//this.ships.push(jerry);
							ships.push(jerry);
						}else if(jerry.building)
						{
							//create building
							jerry.world.buildings.push(jerry);
							if(jerry.type==Buildings.ShieldGrid)
							{
								jerry.world.maxShields=100;
								jerry.world.shields=100;
								jerry.world.activeShields=true;
							}else if(jerry.type==Buildings.Shipyard)
							{
								jerry.world.hasShipyard=true;
							}else if(jerry.type==Buildings.OrbitalDefense)
							{
								ships.push(newPlatform(jerry.world));
							}
							if((logAll) ||(this==civs[playerCiv]))
							{
								console.log("Humanity produced a "+jerry.name+ " on "+jerry.world.name);
							}
						}
						this.productionQueue.splice(0,1);
					}
				}
			}
		}
		for(var i=0;i<this.autoHostile.length;i++)
		{
			if(!this.autoHostile[i].alive)
			{
				this.autoHostile.splice(i,1);
				i--;
			}
		}
	};
	civilization.prototype.generateMessage=function(other) //run on contact with other ships (with month or so break in between)
	{
		if(civs[playerCiv].AI)
		{
			return;
		}
		if(playerCiv>0)
		{
			return; //until we can make a system that adapts events for each race.
		}	
		if(this.civID==civIDs.Vulcan)
		{
			var ned=new textbox();
			ned.setup("Greetings, we are the Vulcan Confederacy.  How May we help you?",150,370);
			ned.civil=this;
			ned.choicesStart=1;
			ned.label="Vulcan Captain:";
			ned.addText("   Explain the Borg threat");
			ned.addText("   Demand their surrender");
			ned.optionOne=function(civil1,civil2)
			{
				console.log(civil2);
				var ped=new textbox();
				ped.label="Vulcan Captain:";
				ped.setup("Hm.  It seems logical to offer you our aid, as they will surely come" ,150,370);
				ped.civil=civil1;
				ped.addText("for us once they are done with you.");
				ped.optionTrack=0;
				ped.options=0;
				console.log("The Vulcans have agreed to help!");
				console.log(ped);
				civil1.allied=true;
				civil2.messages.push(ped);
				holdEverything=true;
			};
			ned.optionTwo=function(civil1,civil2)
			{
				var ped=new textbox();
				ped.label="Vulcan Captain:";
				ped.setup("We will not surrender, we can defend ourselves!" ,150,370);
				ped.civil=civil1;
				ped.optionTrack=0;
				ped.options=0;
				civil1.autoHostile.push(civil2);
				console.log("The "+civil2.namePlural + " have pissed off the" +civil1.namePlural+ " by demanding their surrender!");
				civil2.messages.push(ped);
				holdEverything=true;
			};
			ned.optionTrack=1;
			other.messages.push(ned);
		}else if(this.civID==civIDs.Ferengi)
		{
			var ned=new textbox();
			ned.label="Ferengi Captain:";
			ned.setup("Hello, we are the Ferengi.  We have heard about your troubles.",150,370);
			ned.addText("We would be happy to help defend your planet.  For a modest");
			ned.addText ("fee of course.");
			ned.civil=this;
			ned.choicesStart=3;
			ned.addText("   Hire them for $100");
			if(clean)
			{
				ned.addText("   Tell them you aren't interested.");
			}else
			{
				ned.addText("   Tell them to fuck off.");
			}
			ned.optionTrack=3;
			ned.optionOne=function(civil1,civil2)
			{
				var ped=new textbox();
				ped.label="Ferengi Captain:";
				ped.setup("Pleasure doing buisness with you.  Call us when you need our help." ,150,370);
				ped.civil=civil1;
				ped.optionTrack=0;
				ped.options=0;
				civil2.money-=100;
				console.log("The Ferengi have agreed to help!");
				civil1.allied=true;
				civil2.messages.push(ped);
				holdEverything=true;
			};
			ned.optionTwo=function(civil1,civil2)
			{
				var ped=new textbox();
				ped.label="Ferengi Captain:";
				ped.setup("Very well, your loss.  Good luck with the Borg." ,150,370);
				ped.civil=civil1;
				ped.optionTrack=0;
				ped.options=0;
				civil2.messages.push(ped);
				holdEverything=true;
			};
			other.messages.push(ned);
		}else if(this.civID==civIDs.Borg)
		{
			var ned=new textbox();
			ned.label="Borg Transmission:";
			ned.setup("We are Borg. You will be assimilated.  Resistance is futile.",150,370);
			ned.options=0;
			ned.civil=this;
			other.messages.push(ned);
		}else if(this.civID==civIDs.Betazoid)
		{
			var ned=new textbox();
			ned.label="Betazoid Ambassador:";
			if(clean)
			{
				ned.setup("We can read your minds.  We wont, though.",150,370);
			}else
			{
				ned.setup("We can read your mind, you dirty little fucker.",150,370);
			}
			ned.options=0;
			ned.civil=this;
			other.messages.push(ned);
		}else if(this.civID==civIDs.Hirogen)
		{
			var ned=new textbox();
			ned.label="Hirogen Hunter:";
			ned.setup("We are the Hirogen.  You are now our prey.",150,370);
			ned.options=0;
			ned.civil=this;
			other.messages.push(ned);
		}else if(this.civID==civIDs.Breen)
		{
			var ned=new textbox();
			ned.label="Breen:";
			ned.setup("....",150,370);
			ned.options=0;
			ned.civil=this;
			other.messages.push(ned);
		}else if(this.civID==civIDs.Cardassian)
		{
			var ned=new textbox();
			ned.label="Gul Dukat:";
			ned.setup("Hello.  I am Gul Dukat of the Cardassian Union.",150,370);
			ned.options=0;
			ned.civil=this;
			other.messages.push(ned);
		}else if(this.civID==civIDs.Bajoran)
		{
			var ned=new textbox();
			ned.label="Bajoran Captain:";
			ned.setup("Hello we are the Bajorans.  We would appreciate any help you ",150,370);
			ned.addText("can provide in our struggle with the Cardassian Union.");
			ned.options=0;
			ned.civil=this;
			other.messages.push(ned);
		}else if(this.civID==civIDs.Tellarite)
		{
			var ned=new textbox();
			ned.label="Tellarite Captain:";
			ned.setup("Hello I am a Tellarite.  Basically we are a race of Man-Bear-Pigs.",150,370);
			ned.addText("    Greet the Noble Captain");
			if(clean)
			{
				ned.addText("    Tell him he looks like your butt.");
			}else
			{
				ned.addText("    Conjecture that his mother was a prostitute.");
			}
			//ned.addText("");
			ned.options=2;
			ned.optionTrack=1;
			ned.choicesStart=1;
			ned.civil=this;
			ned.optionOne=function(civil1,civil2)
			{
				//console.log(civil2);
				var ped=new textbox();
				ped.setup("The Tellarite captain greets you politely enough, but you're pretty"  ,150,370);
				ped.addText("sure he muttered something under his breath.");
				ped.choicesStart=2;
				ped.optionTrack=2;
				ped.options=2;
				ped.addText("    You must defend your people's honor, attack!");
				ped.addText("    Let it go");
				ped.optionOne=function(civil1,civil2)
				{
					var hed=new textbox();
					hed.label="Tellarite Captain:";
					hed.setup("Pfft, we will destroy you humans. "  ,150,370);
					hed.options=0;
					civil2.autoHostile.push(civil1);
					hed.civil=civil1;
					civil2.messages.push(hed);
				};
				ped.optionTwo=function(civil1,civil2)
				{
					holdEverything=false;
				};
				ped.civil=civil1;
				civil2.messages.push(ped);
				holdEverything=true;
			};
			ned.optionTwo=function(civil1,civil2)
			{
				var ped=new textbox();
				ped.label="Tellarite Captain:";
				ped.setup("Haha, I like the cut of your space gib.  Call me if you need " ,150,370);
				if(clean)
				{
					ped.addText("anything, you smelly human.");
				}else
				{
					ped.addText("anything, you cocksucking human.");
				}
				ped.civil=civil1;
				ped.optionTrack=0;
				ped.options=0;
				civil1.allied=true;
				civil2.messages.push(ped);
				holdEverything=true;
			};
			other.messages.push(ned);
		}else if(this.civID==civIDs.Telaxian)
		{
			civs[playerCiv].flags[Flag.MetTelaxianBountyHunters]=true;
			console.log(this.flags);
			var ned=new textbox();
			ned.label="Telaxian Captain:";
			ned.setup("Hi. We are Telaxian bounty hunters.  We are after an escaped ",150,370);
			ned.addText("Telaxian serial killer, he calls himself Neelix.  Have you seen him?");
			ned.options=1;
			ned.civil=this;
			ned.optionTrack=2;
			ned.choicesStart=2;

			ned.addText("   Nope haven't seen him.");
			
			if(hasItem[Items.Neelix])
			{
				ned.options=3;
				ned.addText("   Yeah, and he's under our protection.");
				ned.addText("   Here take him please.");
			}
			ned.optionOne=function(civil1,civil2)
			{
				console.log(civil2);
				var ped=new textbox();
				ped.label="Telaxian Captain:";
				ped.setup("Oh well, be careful if you see him."  ,150,370);
				ped.civil=civil1;
				ped.optionTrack=0;
				ped.options=0;
				civil2.messages.push(ped);
				holdEverything=true;
			};
			ned.optionTwo=function(civil1,civil2)
			{
				var ped=new textbox();
				ped.label="Telaxian Captain:";
				ped.setup("If you won't turn him over, we will claim his body from the " ,150,370);
				ped.addText("wreakage of your ship!");
				ped.civil=civil1;
				ped.optionTrack=0;
				ped.options=0;
				civil1.autoHostile.push(civil2);
				civil2.messages.push(ped);
				holdEverything=true;
			};
			ned.optionThree=function(civil1,civil2)
			{
				var ped=new textbox();
				ped.label="Telaxian Captain:";
				ped.setup("Thank you, now this scumbag can be brought to justice.  The " ,150,370);
				ped.addText("Telaxian people thank you.  Call on us if you need help with the ");
				ped.addText("Borg.");
				ped.civil=civil1;
				ped.optionTrack=0;
				hasItem[Items.Neelix]=false;
				ped.options=0;
				civil1.allied=true;
				civil1.autoHostile.push(civil2);
				civil2.messages.push(ped);
				holdEverything=true;
			};
			other.messages.push(ned);
		}
		else if(this.civID==civIDs.Orion)
		{
			var ned=new textbox();
			ned.label="Orion Slaver:";
			ned.setup("Hello, would you like to buy a green skinned woman for $300?",150,370);
			ned.options=0;
			ned.civil=this;
			ned.options=3;
			ned.civil=this;
			ned.optionTrack=1;
			ned.choicesStart=1;
			ned.addText("   Hells yeah!");
			ned.addText("   No Thanks.");
			ned.addText("   Die Slaver!");
			ned.optionOne=function(civil1,civil2)
			{
				console.log(civil2);
				var ped=new textbox();
				ped.label="Orion Slaver:";
				ped.setup("Excellent!  Beaming her over now."  ,150,370);
				ped.civil=civil1;
				ped.optionTrack=0;
				ped.options=0;
				var sexslave=new dude();
				civil2.crewPool.push(sexslave);
				console.log("Ganed an Orion sex slave!");
				civil1.allied=true;
				civil2.messages.push(ped);
				holdEverything=true;
			};
			ned.optionTwo=function(civil1,civil2)
			{
				var ped=new textbox();
				ped.label="Orion Slaver:";
				ped.setup("Very Well." ,150,370);
				ped.civil=civil1;
				ped.optionTrack=0;
				ped.options=0;
				civil2.messages.push(ped);
				holdEverything=true;
			};
			ned.optionThree=function(civil1,civil2)
			{
				var ped=new textbox();
				ped.label="Orion Slaver:";
				ped.setup("Wait, what?!  Arm weapons!" ,150,370);
				ped.civil=civil1;
				ped.optionTrack=0;
				ped.options=0;
				civil1.autoHostile.push(civil2);
				civil2.messages.push(ped);
				holdEverything=true;
			};
			other.messages.push(ned);
		}else if(this.civID==civIDs.Dominion)
		{
			var ned=new textbox();
			ned.label="Weyoun:";
			ned.setup("Greetings! I am Weyoun a representative of the Dominion.",150,370);
			ned.options=0;
			ned.civil=this;
			other.messages.push(ned);
		}else if(this.civID==civIDs.Vidiian)
		{
			var ned=new textbox();
			ned.label="Vidiian Captain:";
			ned.setup("Nothing personal, but we need your organs to live.",150,370);
			this.autoHostile.push(civs[playerCiv]);
			ned.options=0;
			ned.civil=this;
			other.messages.push(ned);
		}else if(this.civID==civIDs.Pakled)
		{
			var ned=new textbox();
			ned.label="Pakled Captain:";
			ned.setup("We need things.  Things to make us go.",150,370);
			//this.autoHostile.push(civs[playerCiv]);
			ned.options=0;
			ned.civil=this;
			other.messages.push(ned);
		}else if(this.civID==civIDs.Andorian)
		{
			var ned=new textbox();
			ned.label="Andorian Captain:";
			ned.setup("Hello pinkskin.  Hope you are doing well.",150,370);
			ned.options=2;
			ned.civil=this;
			ned.choicesStart=1;
			ned.addText("   Explain the Borg threat");
			ned.addText("   Contine on your way");
			ned.optionOne=function(civil1,civil2)
			{
				console.log(civil2);
				var ped=new textbox();
				ped.label="Andorian Captain:";
				ped.setup("Hm. I suppose we could spare a ship or two. If only to learn"  ,150,370);
				ped.civil=civil1;
				ped.addText("more about the Borg threat.");
				ped.optionTrack=0;
				ped.options=0;
				console.log("The Andorians have agreed to help!");
				console.log(ped);
				civil1.allied=true;
				civil2.messages.push(ped);
				holdEverything=true;
			};
			ned.optionTwo=function(civil1,civil2)
			{
				var ped=new textbox();
				ped.label="Andorian Captain:";
				ped.setup("Do not waste our time!" ,150,370);
				ped.civil=civil1;
				ped.optionTrack=0;
				ped.options=0;
				civil2.messages.push(ped);
				holdEverything=true;
			};
			ned.optionTrack=1;
			other.messages.push(ned);
		}else if(this.civID==civIDs.Klingon)
		{
			var ned=new textbox();
			ned.label="Klingon Commander:";
			ned.setup("Filthy humans, once we are done with the Romulans we may just",150,370);
			ned.addText(" come for you.");
			if(hasItem[Items.RomulanPrisoner])
			{
				ned.options=2;
				ned.addText("    Alright then.  Have a good day...");
				ned.addText("    Hey we have this Romulan dude in stasis, wanna probe him?");
				ned.optionTrack=2;
				ned.choicesStart=2;
				ned.optionOne=function(civil1,civil2)
				{

				};
				ned.optionTwo=function(civil1,civil2)
				{
					hasItem[Items.RomulanPrisoner]=false;
					var ped=new textbox();
					ped.label="Klingon Commander:";
					ped.setup("Hm.  Yes we could learn much from him.  We will help" ,150,370);
					ped.addText("You in glorious battle against the Borg in exchange for");
					ped.addText("the Romulan officer.");
					ped.civil=civil1;
					ped.optionTrack=0;
					civil2.allied=true;
					ped.options=0;
					civil2.messages.push(ped);
					holdEverything=true;
				};
			}else
			{
				ned.options=1;
				ned.addText("    Alright then.  Have a good day...");
				ned.optionTrack=2;
				ned.choicesStart=2;
				ned.options=1;
				ned.optionOne=function(civil1,civil2)
				{
					holdEverything=false;
				};
			}
			ned.civil=this;
			other.messages.push(ned);
		}else if(this.civID==civIDs.Romulan)
		{
			var ned=new textbox();
			ned.label="Romulan Captain:";
			ned.setup("We are the Romulan Star Empire.  You will not violate our Space.",150,370);
			ned.options=0;
			if(hasItem[Items.RomulanPrisoner])
			{
				ned.options=2;
				ned.addText("    Alright then.");
				ned.addText("    We found one of your officers in an escape pod.");
				ned.optionTrack=1;
				ned.choicesStart=1;
				ned.optionOne=function(civil1,civil2)
				{
					holdEverything=false;
				};
				ned.optionTwo=function(civil1,civil2)
				{
					hasItem[Items.RomulanPrisoner]=false;
					var ped=new textbox();
					ped.label="Romulan Captain:";
					ped.setup("Thank you for returning our officer.  Prehaps this will be the" ,150,370);
					ped.addText("begging of improved relations between our people.");
					ped.civil=civil1;
					ped.optionTrack=0;
					civil2.allied=true;
					ped.options=0;
					civil2.messages.push(ped);
					holdEverything=true;
				};
			}else
			{
				ned.options=1;
				ned.addText("    Alright then.");
				ned.optionTrack=1;
				ned.choicesStart=1;
				ned.options=1;
				ned.optionOne=function(civil1,civil2)
				{
					holdEverything=false;
				};
			}
			ned.civil=this;
			other.messages.push(ned);
		}else
		{
			var ned=new textbox();
			ned.setup("Generic message!",150,370);
			ned.options=0;
			ned.civil=this;
			other.messages.push(ned);
		}
	};
