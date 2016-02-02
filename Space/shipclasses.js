function shipClass()
{
	this.ship=true;
	this.orders=0;
	this.civID=0;
	this.raceID=0;
	this.colony=false;
	this.canHasShields=true;
	this.hasShields=false;
	this.frieghter=false;
	this.phaserRange=500;
	this.destination=null;
	this.transportRange=200;
	this.lifeSupport=true;
	this.lifeSupportRate=0.25;
	this.maxMines=100;
	this.maxTorpedos=100;
	this.numTorpedos=100;
	this.numMines=this.maxMines;
	this.shieldChargeRate=1;
	this.autoEvac=true;
	this.maxHp=100;
	this.oxygen=1000;
	this.homing=true;//todo
	this.healTick=0;
	this.evacRate=10;
	this.NCC=0;//initial random+counter?
	this.warpSignature=0;
	this.commandCode=1234;
	this.prefixCode=Math.floor(Math.random()*9999); //that bullshit from WoKhan
	this.escapePods=[];
	this.acceltick=0;
	this.accelrate=10;
	this.weaponsHot=0;
	this.phaserBanks=[];
	this.numPhasers=1;
	this.torpedoBays=[];
	this.numTorpedoBays=0;
	this.phaserBanks.push(new energyWeapon(this));
	this.shields=0;
	this.tractorDist=80;
	this.maxShields=0;
	this.hasShields=false;
	this.shieldSprite=Sprite("shields1");
	this.sensorRange=500;
	this.tractorRange=200;
	this.morale=70;
	this.turnSpeed=2;
	this.acceleration=0.5;
	this.hp=100;
	this.prefix="U.S.S.";
	this.name="Type-2 Shuttle";
	this.heading=Math.floor(Math.random()*359);
	this.desiredHeading=this.heading;
	this.speed=1;
	this.desiredSpeed=1;
	this.maxSpeed=5;
	this.cruisingSpeed=5;
	this.status="idle";
	this.type=0;
	this.width=32;
	this.height=32;
	this.alive=false;
	this.crewCapacity=5;
	this.crewMax=0;
	this.orbitDiameter=50;
	this.captainFlees=false;
	this.baseRepair=0.25;
	this.autoFireRate=40;
	this.sprite=Sprite("ship1");
	
	this.sensors=0;
	this.torpedoTubes=2;

	
	this.impulseEngine=0;
	this.armor=0;
	this.shields=0;
	this.numEscapePods=10;
	this.transporter=0;
	this.crewQuarters=0;
	this.tractor=0;
	this.warpCore=0;
	this.warpEngine=0;
	this.stores=0;

	this.maxTeamSize=4;
	//windows
}

baseClass=new shipClass();

colonlyShipClass=new shipClass();
frieghterClass=new shipClass();
shuttlecraft=new shipClass();
shuttlecraft.prefix="U.S.S.";
shuttlecraft.name="Type-2 Shuttle";
shuttlecraft.numTorpedos=0;
shuttlecraft.numMines=0;
shuttlecraft.hasShields=false;
shuttlecraft.crewMax=5;
shuttlecraft.turnSpeed=3;

galaxyClass=new shipClass();

vulcanCapitol=new shipClass();

andorianWarship=new shipClass();

cubeClass=new shipClass();
cubeClass.numTorpedos=200;
cubeClass.hasShields=true;
cubeClass.autoEvac=false;

tellariteWarship=new shipClass();

dominionWarship=new shipClass();

cardassianWarship=new shipClass();

hirogenHunter=new shipClass();

birdOfPrey=new shipClass();

warbird=new shipClass();


shipClasses=[];
for(var i=0;i<18;i++)
{
	shipClasses[i]=[];
}

shipClasses[civIDs.Human].push(galaxyClass);
shipClasses[civIDs.Human].push(shuttlecraft);
shipClasses[civIDs.Vulcan].push(vulcanCapitol);
shipClasses[civIDs.Andorian].push(andorianWarship);
shipClasses[civIDs.Tellarite].push(tellariteWarship);
shipClasses[civIDs.Romulan].push(warbird);
shipClasses[civIDs.Klingon].push(birdOfPrey);
shipClasses[civIDs.Borg].push(cubeClass);
shipClasses[civIDs.Dominion].push(dominionWarship);
shipClasses[civIDs.Hirogen].push(hirogenHunter);
shipClasses[civIDs.Cardassian].push(cardassianWarship);

for(var i=0;i<18;i++)
{
	if(shipClasses[i].length<1)
	{
		baseClass.name=races[i]+" Ship";
		shipClasses[i].push(baseClass);
		baseClass.name="oops!";
	}
}

//shipClasses[civIDs.Human].push(galaxyClass);
