Buildings={};
Buildings.Lab=0;
Buildings.MilitaryBase=1;
Buildings.Mine=2;
Buildings.Library=3;
Buildings.Shipyard=4;
Buildings.OrbitalDefense=5;
Buildings.ShieldGrid=6;
Buildings.DaveAndBusters=7;


function particle(){
	this.alive=false;
	this.x=0;
	this.y=0;
	this.wtf="Planet";
	this.sun=null;
	this.oxygen=100;
	this.colonizeDate=2000.00;
	this.evented=false;
	this.width=1;
	this.height=1;
	this.color=bColors[Math.floor(Math.random()*8)];
	this.gravity=false;
	this.xv=0;
	this.yv=0;
	this.shieldSprite=null;//Sprite("planetshields");
	this.textured=false;
	this.orbitDecay=0;
	//this.texture=
	this.size=1;
	this.taxRate=20;
	this.speed=(Math.random()*4)+1;
	this.orbiting=false;
	this.orbx=0;
	this.orby=0;
	this.planet=false;
	this.moon=false;
	this.astroid=false;
	this.meteor=false;
	this.colonized=false;
	this.raceID=-1;
	this.civ=null;
	this.numMoons=0;
	this.moons=[];
	this.buildings=[];
	this.maxBuildings=6;
	this.population=5;
	this.hasShipyard=false;
	this.healTick=0;
	this.hp=100;
	this.maxHp=100;
	this.shields=0;
	this.maxShields=0;
	this.orbitDiameter=4;
	this.orbitTrack=0;
	this.orbitSpeed=1;
	this.updateRate=40;
	this.destx=0;
	this.desty=0;
	this.gotoDest=false;
	this.lastUpdateTime=0;
	this.startTime=0;
	this.durTime=2000;
	this.immortal=false;
	this.gravity=true;
	this.smoker=false;
	this.flicker=true;
	this.exploader=false;
}
	particle.prototype.hurt=function(amt)
	{
		this.shields-=amt;
		var wound=0;
		if(this.shields<0){wound+=this.shields; this.shields=0;}
		this.hp+=wound;
		if((this.hp<1) && (this.civ))
		{
			this.hp=100;
			var pt=this.sun.civs.indexOf(this.civ);
			if(pt>-1)
			{
				this.sun.civs.splice(pt,1);
				//console.log("removed "+this.civ.name+ " from the "+this.sun.name + " System civ list");
			}
			if((logAll) ||(this.civ==civs[playerCiv]))
			{
				if(this==this.civ.homeworld)
				{
					console.log(this.name+" has fallen!  Well shit.");
				}else
				{
					console.log(this.civ.name+" lost their colony on "+this.name);
				}
			}
			for(var i=0;i<this.civ.worlds.length;i++)
			{
				if(this==this.civ.worlds[i])
				{
					this.civ.worlds.splice(i,1);
					i--;
				}
			}
			this.colonized=false;
			this.civ=null;
		}
		
	};
	particle.prototype.getResearch=function()
	{
		var rate=1;
		for(var i=0;i<this.buildings.length;i++)
		{
			if(this.buildings[i].type==Buildings.Lab)
			{
				rate+=0.5;
			}
		}
		return rate;
	};
	particle.prototype.getProduction=function()
	{
		var rate=1;
		for(var i=0;i<this.buildings.length;i++)
		{
			if(this.buildings[i].type==Buildings.Mine)
			{
				rate+=0.5;
			}
		}
		return rate;
	};
	//this.startTime=
	//this.curTime=
	//this.durTime=2;
	particle.prototype.update=function(){
		var stamp = new Date();
		var tim=stamp.getTime();
		if((tim-this.startTime>this.durTime) && (!this.immortal)) {this.alive=false;}
		if(tim-this.lastUpdateTime<this.updateRate) { return;}
		if(this.orbiting)
		{
			if((this.planet) || (this.moon))
			{
				this.orbx=this.sun.x;
				this.orby=this.sun.y;
			}
			this.orbitTrack+=this.orbitSpeed*gameSpeed;
			this.orbitDiameter-=this.orbitDecay*this.orbitSpeed*gameSpeed;
			if(this.orbitDiameter<1) 
			{
				this.alive=false;
			}
			//if((this.shrinking) && (this.orbitDiameter>1)) {this.orbitDiameter--;}
			if (this.orbitTrack>360){ this.orbitTrack=0;}
			this.x=this.orbx+Math.cos(this.orbitTrack* (Math.PI / 180))*this.orbitDiameter;
			this.y=this.orby+Math.sin(this.orbitTrack*(Math.PI / 180))*this.orbitDiameter;
			this.y+=this.yv;
			if(this.gotoDest)
			{
				if(this.orbx<this.destx) {this.orbx+=this.speed;}
				if(this.orbx>this.destx) {this.orbx-=this.speed;}
				if(this.orby<this.desty) {this.orby+=this.speed;}
				if(this.orby>this.desty) {this.orby-=this.speed;}
				if((Math.abs(this.orbx-this.destx)<5) && (Math.abs(this.orby-this.desty)<5)) {this.gotoDest=false;}
			}
		}else
		{
			this.x+=this.xv;
			this.y+=this.yv;
			if(this.flicker)
			{
				this.color=bColors[Math.floor(Math.random()*8)];
			}

		}
		if(this.gravity)
		{
				this.yv+=0.5;
		}
		//this.counter--;
		//time stuff
		//if (this.counter<1) this.alive=false;
		if(this.planet)
		{
			this.healTick+=1*gameSpeed;
			if(this.healTick>1000)
			{
				this.healTick=0;
				if(this.hp<this.maxHp)
				{
					this.hp++;
				}
			}
		}


	};

function particleSystem(){
	this.particles = [];
	this.updateRate=1;
	this.lastUpdate=0;
}
	particleSystem.prototype.start=function(dur,x,y,xv,yv,color,gravity,exploader){
		var tod=new particle();
		if(!exploader) {exploader=false;}
		tod.x=x;
		tod.y=y;
		tod.xv=xv;
		tod.yv=yv;
		tod.alive=true;
		tod.counter=dur;
		tod.color=color;
		tod.gravity=gravity;
		tod.exploader=exploader;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		this.particles.push(tod);
	};
	particleSystem.prototype.startTextured=function(dur,x,y,xv,yv,color,gravity,exploader,spt){
		var tod=new particle();
		if(!exploader) {exploader=false;}
		tod.x=x;
		tod.y=y;
		tod.xv=xv;
		tod.yv=yv;
		tod.alive=true;
		tod.textured=true;
		tod.sprite=Sprite(spt);
		tod.counter=dur;
		tod.color=color;
		tod.gravity=gravity;
		tod.exploader=exploader;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		this.particles.push(tod);
	};
	particleSystem.prototype.draw=function(can,cam){
		var c=1;
	
		can.save();
		for(var i=0;i<this.particles.length;i++)
		{
			if(cam.isNear(this.particles[i]))
			{
				if(this.particles[i].alive)
				{
					can.save();
					if (true){//this.particles[i].color!=c){
						can.fillStyle = this.particles[i].color;
						c= this.particles[i].color;
					}
					
					can.translate((this.particles[i].x+cam.x)*cam.zoom,(this.particles[i].y+cam.y)*cam.zoom);
				
					can.scale(this.particles[i].size*cam.zoom,this.particles[i].size*cam.zoom);
					if(this.particles[i].textured)
					{
						//this.particles[i].sprite.draw(can, this.particles[i].x+cam.x-this.particles[i].width/2,this.particles[i].y+cam.y-this.particles[i].height/2);
						//this.particles[i].sprite.draw(can, -this.particles[i].width*cam.zoom/2,-this.particles[i].height*cam.zoom/2);
						this.particles[i].sprite.draw(can, -this.particles[i].width/2,-this.particles[i].height/2);
						if(this.particles[i].shields>0)
						{
							//can.save();
							can.globalAlpha=this.shields/100;
							//can.scale(this.particles[i].size*cam.zoom,this.particles[i].size*cam.zoom);
							this.particles[i].shieldSprite.draw(can, -this.particles[i].width/2,-this.particles[i].height/2);
							can.restore();
						}
					}else
					{
						can.fillRect(this.particles[i].x+cam.x-this.particles[i].width/2, this.particles[i].y+cam.y-this.particles[i].height/2, this.particles[i].size*cam.zoom, this.particles[i].size*cam.zoom);
					}
					can.restore();
				}
			}
		}
		
	};
	particleSystem.prototype.update=function(){
		for(var i=0;i<this.particles.length;i++)
		{
			this.particles[i].update();
			if(!this.particles[i].alive)
			{
				if(this.particles[i].exploader)
				{
					this.explosion(6,this.particles[i].x,this.particles[i].y,4);
				}	
				if(this.particles[i].planet)
				{
					for(var j=0;j<this.particles[i].numMoons;j++)
					{
						this.particles[i].moons[j].alive=false;
					}
					console.log(this.particles[i].name +" was destroyed.");
					this.particles[i].sun.planets.splice(this.planetNum,1);
					this.particles[i].sun.numPlanets--;
					if(this.particles[i].sun.selected>this.particles[i].planetNum)
					{
						//this.particles[i].sun.selected--;
						//TODO! problem with selected jumping! if the third planet is selected, then the second planet removed, suddenly the third planet is now what used to be the fourth planet.
					}
					
				}
				this.particles.splice(i,1);
			}
		}
	};
	particleSystem.prototype.explosion=function(num,x,y,force){
		for( var i = 0; i < num;i++) {
			var ang = Math.random()*360;
			var vel = 0;//Math.random() * 15 + 8;
			this.start(700, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,bColors[Math.floor(Math.random()*8)],true);
		}
	};
	particleSystem.prototype.explosionTextured=function(num,x,y,force,txt){
		for( var i = 0; i < num;i++) {
			var ang = Math.random()*360;
			var vel = Math.random() * 15 + 8;
			this.startTextured(700, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,bColors[Math.floor(Math.random()*8)],true,false,txt);
		}
	};
	particleSystem.prototype.shoot=function(x,y,ang,vel){
		this.start(1000, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,bColors[Math.floor(Math.random()*8)],false);

	};
	particleSystem.prototype.shootTextured=function(x,y,ang,vel,tex){
		this.startTextured(1000, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,bColors[Math.floor(Math.random()*8)],true,false,tex);

	};
	particleSystem.prototype.startPlanet=function(dur,son,diam,spd,decay,imm,planettype){
		var tod=new particle();
		//if(!exploader) {exploader=false;}
		//tod.x=x;
		//tod.y=y;
		//tod.name=names[1][Math.floor(Math.random()*20)];
		this.wtf="Planet";
		son.planets[son.numPlanets]=tod;
		son.planetDetails[son.numPlanets]=new planetInfo();
		tod.planetNum=son.numPlanets;
		tod.name=son.name+ " " +romanize(tod.planetNum);
		son.numPlanets++;
		tod.gameSped=true;
		tod.orbx=son.x;
		tod.orby=son.y;
		tod.shieldSprite=Sprite("planetshields");
		tod.sun=son;
		tod.numMoons=0;
		tod.size=Math.floor(Math.random()*4)+1;
		tod.planet=true;
		tod.exploader=true;
		tod.orbiting=true;
		tod.orbitDecay=decay;
		tod.orbitDiameter=diam;
		tod.orbitTrack=Math.floor(Math.random()*360);
		tod.x=son.x+Math.cos(tod.orbitTrack* (Math.PI / 180))*diam;
		tod.y=son.y+Math.sin(tod.orbitTrack*(Math.PI / 180))*diam;
		tod.xv=0;
		tod.yv=0;
		tod.shrinking=true;
		tod.alive=true;
		tod.immortal=imm;
		tod.orbitSpeed=spd;
		tod.textured=true;
		
		if(planettype==null)
		{
			tod.type=Math.floor((Math.random()*6));
		}else
		{
			tod.type=planettype;
		}
		tod.width=32;
		tod.height=32;
		//tod.sprite=Sprite("earthsmall");
		var twitch=Math.floor(Math.random()*4);
		if (tod.type===0) {tod.sprite=Sprite("earthsmall");tod.shieldSprite=Sprite("planetshieldsmall");}
		if (tod.type==1) {tod.sprite=Sprite("planetsmall");tod.shieldSprite=Sprite("planetshieldsmall");}
		if (tod.type==2) {tod.sprite=Sprite("hotplanetsmall");tod.shieldSprite=Sprite("planetshieldsmall");}
		if (tod.type==3) {tod.sprite=Sprite("iceplanetsmall");tod.shieldSprite=Sprite("planetshieldsmall");}
		if (tod.type==4) 
		{
			tod.sprite=Sprite("gasgiant"+twitch);
			tod.width=64;
			tod.height=64;
		}
		if (tod.type==5) {
			tod.sprite=Sprite("saturn");
			tod.width=64;
			tod.height=64;
		}
		tod.counter=dur;
		tod.color="white";
		tod.gravity=false;
		tod.exploader=true;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		this.particles.push(tod);
	};
	
	particleSystem.prototype.startMoon=function(dur,son,diam,spd,decay,imm,moonType){
		var tod=new particle();
		//if(!exploader) {exploader=false;}
		//tod.x=x;
		//tod.y=y;
		this.wtf="Moon";
		tod.name=names[1][Math.floor(Math.random()*20)];
		son.moons[son.numMoons]=tod;
		tod.moonNum=son.numMoons;
		son.numMoons++;
		tod.gameSped=true;
		tod.orbx=son.x;
		tod.orby=son.y;
		tod.sun=son;
		tod.moon=true;
		tod.exploader=true;
		tod.orbiting=true;
		tod.orbitDecay=decay;
		tod.orbitDiameter=diam*son.size;
		tod.orbitTrack=Math.floor(Math.random()*360);
		tod.x=son.x+Math.cos(tod.orbitTrack* (Math.PI / 180))*diam;
		tod.y=son.y+Math.sin(tod.orbitTrack*(Math.PI / 180))*diam;
		tod.xv=0;
		tod.yv=0;
		tod.shrinking=true;
		tod.alive=true;
		tod.immortal=imm;
		tod.orbitSpeed=spd;
		tod.textured=true;
		
		tod.width=16;
		tod.height=16;
		tod.type=Math.floor(Math.random()*4);

		tod.sprite=Sprite("moon"+tod.type);
		tod.counter=dur;
		tod.color="white";
		tod.gravity=false;
		tod.exploader=true;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		this.particles.push(tod);
	};
	
	particleSystem.prototype.startAstroid=function(dur,son,diam,spd,decay,imm,type){
		var tod=new particle();
		//if(!exploader) {exploader=false;}
		//tod.x=x;
		//tod.y=y;
		//son.astroids[son.numAstroids]=tod;
		this.wtf="Asteroid";
		son.numAstroids++;
		tod.gameSped=true;
		tod.orbx=son.x;
		tod.orby=son.y;
		tod.sun=son;
		tod.planet=true;
		tod.exploader=true;
		tod.orbiting=true;
		tod.orbitDecay=decay;
		tod.orbitDiameter=diam;
		tod.orbitTrack=Math.floor(Math.random()*360);
		tod.x=son.x+Math.cos(tod.orbitTrack* (Math.PI / 180))*diam;
		tod.y=son.y+Math.sin(tod.orbitTrack*(Math.PI / 180))*diam;
		tod.xv=0;
		tod.yv=0;
		tod.shrinking=true;
		tod.alive=true;
		tod.immortal=imm;
		tod.orbitSpeed=spd;
		tod.textured=true;
		tod.astroid=true;
		tod.type=Math.floor((Math.random()*2)); //todo
	
		//tod.sprite=Sprite("earthsmall");
		if (tod.type===0) {tod.sprite=Sprite("meteorsmall");}
		if (tod.type==1) {tod.sprite=Sprite("meteorlarge");}
		tod.counter=dur;
		tod.color="white";
		tod.gravity=false;
		tod.exploader=true;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		this.particles.push(tod);
	};
	
	particleSystem.prototype.startOrbit=function(dur,x,y,diam,spd,decay,imm,planettype){
		var tod=new particle();
		//if(!exploader) {exploader=false;}
		//tod.x=x;
		//tod.y=y;
		tod.gameSped=true;
		tod.orbx=x;
		tod.orby=y;
		tod.exploader=true;
		tod.orbiting=true;
		tod.orbitDecay=decay;
		tod.orbitDiameter=diam;
		tod.orbitTrack=Math.floor(Math.random()*360);
		tod.x=x+Math.cos(tod.orbitTrack* (Math.PI / 180))*diam;
		tod.y=y+Math.sin(tod.orbitTrack*(Math.PI / 180))*diam;
		tod.xv=0;
		tod.yv=0;
		tod.shrinking=true;
		tod.alive=true;
		tod.immortal=imm;
		tod.orbitSpeed=spd;
		tod.textured=true;
		
		if(planettype==null)
		{
			tod.type=Math.floor((Math.random()*5));
		}else
		{
			tod.type=planettype;
		}
	
		//tod.sprite=Sprite("earthsmall");
		if (tod.type===0) {tod.sprite=Sprite("earthsmall");}
		if (tod.type==1) {tod.sprite=Sprite("planetsmall");}
		if (tod.type==2) {tod.sprite=Sprite("hotplanetsmall");}
		if (tod.type==3) {tod.sprite=Sprite("iceplanetsmall");}
		if (tod.type==4) {tod.sprite=Sprite("gasplanet");}
		if (tod.type==5) {tod.sprite=Sprite("meteorsmall");}
		if (tod.type==6) {tod.sprite=Sprite("meteorlarge");}
		tod.counter=dur;
		tod.color="white";
		tod.gravity=false;
		tod.exploader=true;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		this.particles.push(tod);
	};
	particleSystem.prototype.swarm=function(x,y){
		for(var i=0;i<this.particles.length;i++)
		{
			if(this.particles[i].orbiting)
			{
				var dx=(Math.random()*64)-32;
				var dy=(Math.random()*64)-32;
				/*this.particles[i].orbx=x+dx;
				this.particles[i].orby=y+dy;*/
				this.particles[i].gotoDest=true;
				this.particles[i].destx=x+dx;
				this.particles[i].desty=y+dy;
			}
		}
	};
	particleSystem.prototype.unSwarm=function(){
		for(var i=0;i<this.particles.length;i++)
		{
			if(this.particles[i].orbiting)
			{
				this.particles[i].gotoDest=true;
				this.particles[i].destx=Math.floor(Math.random()*CANVAS_WIDTH);
				this.particles[i].desty=Math.floor(Math.random()*CANVAS_HEIGHT);
			}
		}
	};
	particleSystem.prototype.colonyCollapse=function(){
		for(var i=0;i<this.particles.length;i++)
		{
			if(this.particles[i].orbiting)
			{
				this.particles[i].gravity=true;
			}
		}
	};
