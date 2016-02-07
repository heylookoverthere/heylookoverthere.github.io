var equippedID={};
equippedID.Bomb=1;
equippedID.Bow=2;
equippedID.Boomerang=3;

var numEquippable=2;

var bunnyheadsprite=new Array();
bunnyheadsprite.push(Sprite("bheadup"));
bunnyheadsprite.push(Sprite("bheadright"));
bunnyheadsprite.push(Sprite("bheaddown"));
bunnyheadsprite.push(Sprite("bheadleft"));

var masterSwingSprites=new Array();
masterSwingSprites.push(new Array());
masterSwingSprites.push(new Array());
masterSwingSprites.push(new Array());
masterSwingSprites.push(new Array());
for(var i=0;i<4;i++)
{
	for(var j=0;j<8;j++) 
	{
		var daPath= "masterswordswing"+i+j;
		masterSwingSprites[i].push(Sprite(daPath));
	}
}
masterPokeSprites=new Array()
masterPokeSprites.push(Sprite("masterpoke0"));
masterPokeSprites.push(Sprite("masterpoke1"));
masterPokeSprites.push(Sprite("masterpoke2"));
masterPokeSprites.push(Sprite("masterpoke3"));

function bomb(croom,isSuper)
{
	if(!isSuper) {isSuper=false;}
	this.isSuper=isSuper;
	this.x=0;
	this.y=0;
	this.exists=false;
	this.timePlaced=0;
	this.fuse=4;
	this.room=croom;
	this.armed=false;
	this.sprites=new Array();
	this.sprites.push(Sprite("bomb1"));
	this.sprites.push(Sprite("bomb2"));
	this.sprites.push(Sprite("superbomb"));
	this.sprites.push(Sprite("superbomb1"));
	this.update=function()
	{
		var millip=new Date().getTime();
		if((millip-this.timePlaced>this.fuse*1000) && (this.armed))
		{
			this.explode();
		}
	}
	this.explode=function()
	{
		playSound("explosion");
		this.exists=false;
		if(this.isSuper)
		{
			for (var n=this.x-3;n<this.x+3;n++)
			{
				for (var m=this.y-3;m<this.y+3;m++)
				{
					//particles, sprites, trigger switches, destroy walls and cracked floors
					if((n<this.x+2) && (m<this.y+2))
					{
						var boop=new explosionEffect();
						boop.setup(n,m,this.room);
						explosions.push(boop);
					}
					for(var i=0;i<this.room.exits.length;i++)
					{
						var otherX=this.room.exits[i].x
						var otherY=this.room.exits[i].y
						if(this.room.exits[i].orientation==0)
						{
							otherX=this.room.exits[i].x+1
						}else if(this.room.exits[i].orientation==1)
						{
							otherY=this.room.exits[i].y+1
						}else if(this.room.exits[i].orientation==2)
						{
							otherX=this.room.exits[i].x+1
						}else if(this.room.exits[i].orientation==3)
						{
							otherY=this.room.exits[i].y+1
						}
						var blow=false;
						if((this.room.exits[i].x==n) && (this.room.exits[i].y==m))
						{
							blow=true;
						}else if((otherX==n) && (otherY==m)) // other
						{
							blow=true;
						}
						if((blow) && (this.room.exits[i].type==3))
						{
							playSound("secret");
							this.room.exits[i].open();
						}
					}
					for(var i=0;i<this.room.objects.length;i++)
					{
						var blow=false;
						if((this.room.objects[i].x==n) && (this.room.objects[i].y==m))
						{
							blow=true;
						}
						if((blow) && (this.room.objects[i].bombable))
						{
							this.room.objects[i].activate();
						}
						
					}
					for(var i=0;i<entities.length;i++)
					{
						var blow=false;
						if((entities[i].x==n) && (entities[i].y==m))
						{
							blow=true;
						}
						if((blow) && (entities[i].room.z==this.room.z)&&(entities[i].room.x==this.room.x)&&(entities[i].room.y==this.room.y))
						{
							entities[i].hurt(20);
						}
					}
					var blow=false;
					if((this.room.tiles[n][m].data==DungeonTileType.Unstable) || (this.room.tiles[n][m].data==DungeonTileType.ReallyUnstable))
					{
						blow=true;
						this.room.tiles[n][m].data=DungeonTileType.Hole;
					}
					if(blow)
					{
						playSound("secret");
					}
				}
				
			}
			return;
		}
		
		
		//particles, sprites, trigger switches, destroy walls and cracked floors
		var boop=new explosionEffect();
		boop.setup(this.x-1,this.y-1,this.room);
		explosions.push(boop);
		boop=new explosionEffect();
		boop.setup(this.x-2,this.y-1,this.room);
		explosions.push(boop);
		boop=new explosionEffect();
		boop.setup(this.x,this.y-1,this.room);
		explosions.push(boop);
		boop=new explosionEffect();
		boop.setup(this.x-1,this.y-2,this.room);
		explosions.push(boop);
		boop=new explosionEffect();
		boop.setup(this.x-1,this.y,this.room);
		explosions.push(boop);
		for(var i=0;i<this.room.exits.length;i++)
		{
			var otherX=this.room.exits[i].x
			var otherY=this.room.exits[i].y
			if(this.room.exits[i].orientation==0)
			{
				otherX=this.room.exits[i].x+1
			}else if(this.room.exits[i].orientation==1)
			{
				otherY=this.room.exits[i].y+1
			}else if(this.room.exits[i].orientation==2)
			{
				otherX=this.room.exits[i].x+1
			}else if(this.room.exits[i].orientation==3)
			{
				otherY=this.room.exits[i].y+1
			}
			var blow=false;
			if((this.room.exits[i].x==this.x) && (this.room.exits[i].y==this.y))
			{
				blow=true;
			}else if((this.room.exits[i].x+1==this.x) && (this.room.exits[i].y==this.y))
			{
				blow=true;
			}else if((this.room.exits[i].x-1==this.x) && (this.room.exits[i].y==this.y))
			{
				blow=true;
			}else if((this.room.exits[i].x==this.x) && (this.room.exits[i].y-1==this.y))
			{
				blow=true;
			}else if((this.room.exits[i].x==this.x) && (this.room.exits[i].y+1==this.y))
			{
				blow=true;
			}else if((otherX==this.x) && (otherY==this.y)) // other
			{
				blow=true;
			}else if((otherX+1==this.x) && (otherY==this.y))
			{
				blow=true;
			}else if((otherX-1==this.x) && (otherY==this.y))
			{
				blow=true;
			}else if((otherX==this.x) && (otherY-1==this.y))
			{
				blow=true;
			}else if((otherX==this.x) && (otherY+1==this.y))
			{
				blow=true;
			}
			if((blow) && (this.room.exits[i].type==3))
			{
				playSound("secret");
				this.room.exits[i].open();
			}
		}
		for(var i=0;i<this.room.objects.length;i++)
		{
			var blow=false;
			if((this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y))
			{
				blow=true;
			}else if((this.room.objects[i].x==this.x+1) && (this.room.objects[i].y==this.y))
			{
				blow=true;
			}else if((this.room.objects[i].x==this.x-1) && (this.room.objects[i].y==this.y))
			{
				blow=true;
			}else if((this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y-1))
			{
				blow=true;
			}else if((this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y+1))
			{
				blow=true;
			}
			if((blow) && (this.room.objects[i].bombable))
			{
				this.room.objects[i].activate();
			}
			
		}
		for(var i=0;i<entities.length;i++)
		{
			var blow=false;
			if((entities[i].x==this.x) && (entities[i].y==this.y))
			{
				blow=true;
			}else if((entities[i].x==this.x+1) && (entities[i].y==this.y))
			{
				blow=true;
			}else if((entities[i].x==this.x-1) && (entities[i].y==this.y))
			{
				blow=true;
			}else if((entities[i].x==this.x) && (entities[i].y==this.y-1))
			{
				blow=true;
			}else if((entities[i].x==this.x) && (entities[i].y==this.y+1))
			{
				blow=true;
			}
			if((blow) && (entities[i].room.z==this.room.z)&&(entities[i].room.x==this.room.x)&&(entities[i].room.y==this.room.y))
			{
				entities[i].hurt(20);
			}
		}
		var blow=false;
		if((this.room.tiles[this.x][this.y].data==DungeonTileType.Unstable) || (this.room.tiles[this.x][this.y].data==DungeonTileType.ReallyUnstable))
		{
			blow=true;
			this.room.tiles[this.x][this.y].data=DungeonTileType.Hole;
		}
		if((this.room.tiles[this.x+1][this.y].data==DungeonTileType.Unstable) || (this.room.tiles[this.x+1][this.y].data==DungeonTileType.ReallyUnstable))
		{
			blow=true;
			this.room.tiles[this.x+1][this.y].data=DungeonTileType.Hole;
		}
		if((this.room.tiles[this.x-1][this.y].data==DungeonTileType.Unstable) || (this.room.tiles[this.x-1][this.y].data==DungeonTileType.ReallyUnstable))
		{
			blow=true;
			this.room.tiles[this.x-1][this.y].data=DungeonTileType.Hole;
		}
		if((this.room.tiles[this.x][this.y+1].data==DungeonTileType.Unstable) || (this.room.tiles[this.x][this.y+1].data==DungeonTileType.ReallyUnstable))
		{
			blow=true;
			this.room.tiles[this.x][this.y+1].data=DungeonTileType.Hole;
		}
		if((this.room.tiles[this.x][this.y-1].data==DungeonTileType.Unstable) || (this.room.tiles[this.x][this.y-1].data==DungeonTileType.ReallyUnstable))
		{
			blow=true;
			this.room.tiles[this.x][this.y-1].data=DungeonTileType.Hole;
		}			
		if(blow)
		{
			playSound("secret");
		}
	}
	this.draw=function(can,xoffh,yoffh)
	{
		if((this.room.z==curDungeon.roomZ) &&(this.room.x==curDungeon.roomX) &&(this.room.y==curDungeon.roomY))
		{
			var millip= new Date().getTime();
			var dex=0;
			if(this.isSuper)
			{
				dex=2;
			}
			if((millip-this.timePlaced>this.fuse*800) && (this.armed))
			{
				if(millip%2==0)
				{
					this.sprites[dex+1].draw(can,this.x*32+xoffh,this.y*32+yoffh);
				}else
				{
					this.sprites[dex+0].draw(can,this.x*32+xoffh,this.y*32+yoffh);
				}
			}else
			{
				this.sprites[dex+0].draw(can,this.x*32+xoffh,this.y*32+yoffh);
			}
		}
	}
}

var actionID={};
actionID.Boomarang=0;
actionID.Bow=1;
actionID.Hookshot=2;
actionID.Sword=3; //for holding sword out/ pegasus dash

function entity(croom)
{
	this.dir=0;
	this.hp=100;
	this.maxHp=100;
	this.keys=0;
	this.AI=0;
	this.x=4;
	this.y=3;
	this.shaking=false;
	this.shakingSince=0;
	this.shakingDur=150;
	this.shakingRight=true;
	this.shakeTrack=0;
	this.baseSpeed=4;
	this.speed=4;
	this.team=0;
	this.swordDamage=10;
	this.enteredX=this.x;
	this.enteredY=this.y;
	this.partyPos=0;
	this.partyMember=false;
	this.mapSprite=Sprite("profhead");
	this.name="Waffles";
	this.xSmall=0;
	this.ySmall=0;
	this.lastX=4;
	this.dashing=false;
	this.reallyDashing=false;
	this.dashDelay=1000;
	this.dashStart=0;
	this.dashSpeed=8;
	this.jumping=false;
	this.jumpTime=300;
	this.jumpStart=0;
	this.jumpPeaked=false;
	this.jumpSpeed=2;
	this.maxBombs=10;
	this.maxArrows=20;
	this.swimming=false;
	this.diving=false;
	this.busyrang=false;
	this.lastY=3;
	this.width=32;
	this.height=48;
	this.holdBreath=2;
	this.acting=false;
	this.actfor=0;
	this.action=0;
	this.bunnyHead=false;
	this.shieldSprites=shieldSprites;
	this.actingSprites=new Array();
	this.actingSprites.push(new Array());
	this.actingSprites.push(new Array());
	this.actingSprites.push(new Array());
	this.actingSprites.push(new Array());
	this.actingSprites[0].push(Sprite("linkupbooma"));
	this.actingSprites[1].push(Sprite("linkrightbooma"));
	this.actingSprites[2].push(Sprite("linkdownbooma"));
	this.actingSprites[3].push(Sprite("linkleftbooma"));
	this.actingSprites[0].push(Sprite("linkbow0"));
	this.actingSprites[1].push(Sprite("linkbow1"));
	this.actingSprites[2].push(Sprite("linkbow2"));
	this.actingSprites[3].push(Sprite("linkbow3"));
	//sword?
	this.swinging=false; 
	this.poking=false; 
	this.swingrate=2;
	this.swingtrack=0;
	this.swingcount=0;
	this.pokeSprites=new Array()
	this.pokeSprites.push(Sprite("poke0"));
	this.pokeSprites.push(Sprite("poke1"));
	this.pokeSprites.push(Sprite("poke2"));
	this.pokeSprites.push(Sprite("poke3"));
	this.animated=false;
	this.walkTrack=0;
	this.walkFrames=1;
	this.stepping=false;
	this.walkAni=0;
	this.walkAniRate=5;
	this.walkSprites=new Array();
	this.walkSprites.push(new Array());
	this.walkSprites.push(new Array());
	this.walkSprites.push(new Array());
	this.walkSprites.push(new Array());
	
	this.swingSprites=new Array();
	this.swingSprites.push(new Array());
	this.swingSprites.push(new Array());
	this.swingSprites.push(new Array());
	this.swingSprites.push(new Array());
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<8;j++) // change j max to eight!
		{
			var daPath= "swordswing"+i+j;
			this.swingSprites[i].push(Sprite(daPath));
		}
	}

	
	this.tookBreath=0;
	this.canSwim=false;
	this.autoJoin=false;
	this.alignment=0; //friends 1==neutral, 2== enemy 
	this.featherCount=0;
	this.falling=false;
	this.fallingY=0;
	this.room=null;
	this.tracker=false;
	this.tracking=null;
	this.shells=0;
	this.talkBox=new textbox();
	this.getOffChest=0; //how many elements of talkBank should be said without prompting him
	this.textBank=new Array();
	this.textSaid=new Array();
	this.textConditions=new Array();
	this.textTrack=0;
	this.chatterBank=new Array(); //random stuff said
	this.equippedTrack=0;
	this.equippedTrack2=0;
	if(croom)
	{
		this.room=croom;
	}
	this.status="not set";
	
	this.sprites=new Array();
	this.sprites.push(Sprite("prof0"));
	this.sprites.push(Sprite("prof1"));
	this.sprites.push(Sprite("prof2"));
	this.sprites.push(Sprite("prof3"));
	this.swimSprites=new Array();
	this.swimSprites.push(Sprite("profswim0"));
	this.swimSprites.push(Sprite("profswim1"));
	this.swimSprites.push(Sprite("profswim2"));
	this.swimSprites.push(Sprite("profswim3"));
	this.isPlayer=false;
	this.money=0;
	this.bombs=0;
	this.arrows=0;
	this.wallet=250;
	this.exists=true; 
	this.has=new Array();
	this.destObj=null;
	this.destX=0;
	this.destY=0;
	this.path=null; 
	this.walkTrack=0;
	this.walkSpeed=0;
	this.walkSpeed=0;
	this.going=false;
	this.pathTrack=0;
	this.healAmount=0;
	this.healRate=6;
	this.healCount=0;
	this.alive=true;
	this.gotHurt=0;
	this.deadSprites=new Array();
	this.deadSprites.push(Sprite("profdeath0"));
	this.deadSprites.push(Sprite("profdeath1"));
	this.deadSprites.push(Sprite("profdeath2"));
	this.deathAniTrack=0;
	this.aniCount=0;
	this.aniTrack=0;
	this.aniRate=19;
	this.activebombs=new Array();
	this.inventory=new Array();
	this.inventoryAmounts=new Array();
	var meeee=new Object;
	meeee.type=ObjectID.PotStand;
	meeee.sprite=nullSprite;
	this.inventory.push(meeee);
	this.inventoryAmounts.push(1);
	this.has=new Array();
	this.projectiles=new Array();
	this.pushText=function()
	{
	 //todo - the forgotten dwarf. 
	}
	this.kill=function()
	{
		if(this.lastWords)
		{
			this.say(this.lastWords);
		}
		bConsoleBox.log(this.name+" has died.");
		//if(this.isPlayer)
		playSound("playerdying");
		//this.exists=false;
		this.alive=false;
	}
	
	this.shake=function()
	{
		this.shaking=true;
		this.shakingSince=new Date().getTime();
		this.shakingRight=true;
	}
	
	this.dive=function()
	{
		if((this.room.tiles[this.x][this.y].data<20) || (this.room.tiles[this.x][this.y].data>24))
		{
			return false
			bConsoleBox.log("Can't dive here.");
			playSound("error");
		}
		if(!this.diving)
		{
			this.diving=true;
			this.firstBreath=new Date().getTime();
			return true;
		}else
		{
			this.diving=false;
			//todo sound?
		}
		
	}
	
	this.getScore=function()
	{
		var scar=0;
		//rupees collected (current minus start? 
		  //excess arrows and bombs? all items? converted to rupees if you have krugman alive 
		//rooms explored - loop through all rooms and count those that are explored
		//heart containers found- just compare maxhp to 120 / start maxhp
		//special items found =check .has
		//enemies killed? exp gained? 
		//-1000 if you have the poop
		//-500 if you don't, but you touched it. 
		//5000 - 100% bonus - found all chests + special items (has) + rooms
		return scar;
	
	}
	
	this.revive=function(amt)
	{
		playSound("chant");
		if(this.isPlayer)
		{
			if(gameOver)
			{
				$("#dialogBox").remove();
				gameOver=false;
			}
		}
		if(!amt) {amt=this.maxHp;}
		this.alive=true;
		bConsoleBox.log(this.name + " has returned to life!");
		this.deathAniTrack=0;
		this.hp=amt;
		
		
	}
	
	
	this.heal=function(amt)
	{
		if(this.hp>this.maxHp-1) {return;}
		if(amt==0){ amt=this.maxHp;}
		this.healAmount=amt;
		/*playSound("heal");
		this.hp+=amt;
		if(this.hp>this.maxHp)
		{
			this.hp=this.maxHp;
		}*/
	}
	
	this.placeBomb=function()
	{
		if(!this.has[hasID.Bomb]) {return;}
		if(this.bombs<1) {return;}
		this.bombs--;
		var edsbomb=new bomb(this.room,this.has[hasID.SuperBomb]);
		edsbomb.x=this.x;
		edsbomb.y=this.y;
		edsbomb.exists=true;
		edsbomb.armed=true;
		edsbomb.timePlaced=new Date().getTime();
		this.activebombs.push(edsbomb);
	}
	this.getEquipped=function(secondary)
	{
		if((this.equippedTrack<0) || (this.equippedTrack>this.inventory.length-1))
		{
			this.equippedTrack=0;
		}
		if((this.equippedTrack2<0) || (this.equippedTrack2>this.inventory.length-1))
		{
			this.equippedTrack2=0;
		}
		if(secondary)
		{
			//PROBLEM> 
			return this.inventory[this.equippedTrack2].type;
		}
		return this.inventory[this.equippedTrack].type;//==ObjectID.Bomb
	}
	
	this.getUsableInventory=function()
	{
		return this.inventory;
	}
	
	this.hasItem=function(id)
	{
		for(var i=0;i<this.inventory.length;i++)
		{
			if(this.inventory[i].type==id)
			{
				return true;
			}
		}
		return false;
	}
	
	this.getItem=function(id)
	{
		for(var i=0;i<this.inventory.length;i++)
		{
			if(this.inventory[i].type==id)
			{
				return this.inventory[i];
			}
		}
		return null;
	}
	
	this.giveItem=function(obj,amt)
	{
		if(!amt){amt=1;}
		if(!this.hasItem(obj.type))
		{
			this.inventory.push(obj);
			
			if(obj.type==ObjectID.Bomb)
			{
				if(amt>this.maxBombs)
				{
					amt=this.maxBombs;
					this.bombs=this.maxBombs;
				}
				
			}else if(obj.type==ObjectID.Bow)
			{
				if(amt>this.maxArrows)
				{
					amt=this.maxArrows;
					this.arrows=this.maxArrows
				}
				
			}
			this.inventoryAmounts.push(amt); 
		}else
		{
			for(var i=0;i<this.inventory.length;i++)
			{
				if(this.inventory[i].type==obj.type)
				{
					this.inventoryAmounts[i]+=amt;
					if(obj.type==ObjectID.Bomb)
					{
						if(this.inventoryAmounts[i]>this.maxBombs)
						{
							this.inventoryAmounts[i]=this.maxBombs;
							this.bombs=this.maxBombs;
						}
						
					}else if(obj.type==ObjectID.Bow)
					{
						if(this.inventoryAmounts[i]>this.maxArrows)
						{
							this.inventoryAmounts[i]=this.maxArrows;
							this.arrows=this.maxArrows
						}
						
					}
				}
			}
		}
		if(obj.type==ObjectID.Bomb)
		{
			if(this.inventoryAmounts[i]>this.maxBombs)
			{
				this.inventoryAmounts[i]=this.maxBombs;
			}
			
		}
		if(this.isPlayer)
		{

		
		}
	}
	
	this.removeItem=function(obj,amt)
	{
		
		for(var i=0;i<this.inventory.length;i++)
		{
			if(this.inventory[i].type==obj)
			{
				if(amt)
				{
					this.inventoryAmounts[i]-=amt;
					if(this.inventoryAmounts[i]<1)
					{
						if(this.equippedTrack==i) 
						{
							this.cycleEquipped(true);
							//this.equippedTrack=0;
						}
						if(this.equippedTrack2==i) 
						{
							this.cycleEquipped(true,true);
							//this.equippedTrack2=0;
						}
						this.inventory.splice(i,1);
						this.inventoryAmounts.splice(i,1);
						i--;
					}
				}else
				{
					if(this.equippedTrack==i) {this.equippedTrack=0;}
					if(this.equippedTrack2==i) {this.equippedTrack2=0;}
					this.inventory.splice(i,1);
					this.inventoryAmounts.splice(i,1);
					i--;

				}
			}
		}
		if((this.equippedTrack<0) || (this.equippedTrack>this.inventory.length-1)) 
		{
			this.cycleEquipped(true);
			//this.equippedTrack=0;
		}
		if((this.equippedTrack2<0) || (this.equippedTrack2>this.inventory.length-1)) 
		{
			this.cycleEquipped(true,true);
			//this.equippedTrack2=0;
		}

	}
	
	this.incMove=function(dir)
	{
		if(!this.alive) {return false;}
		if((this.fallingY>0) && (!this.jumping)) {return false;}
		if(!dir){dir=this.dir;}
		//if(!this.canMove(dir)) { return false;}
		if(dir==2)
		{
			this.ySmall+=this.speed;
			if(this.ySmall>SMALL_BREAK)
			{
				if(this.canMove(dir))
				{
					this.ySmall=-SMALL_BREAK;
					this.tryMove(dir);
					return true;
				}else
				{
					this.ySmall=SMALL_BREAK;
					return false;
				}
			}
			return true;
		}else if(dir==0)
		{
			this.ySmall-=this.speed;
			if(this.ySmall<-SMALL_BREAK)
			{
				if(this.canMove(dir))
				{
					this.ySmall=SMALL_BREAK;
					this.tryMove(dir);
					return true;
				}else
				{
					this.ySmall=-SMALL_BREAK;
					return false;
				}
			}
			return true;			
		}else if(dir==1)
		{
			this.xSmall+=this.speed;
			if(this.xSmall>SMALL_BREAK)
			{
				if(this.canMove(dir))
				{
					this.xSmall=-SMALL_BREAK;
					this.tryMove(dir);
					return true;
				}else
				{
					this.xSmall=SMALL_BREAK;
					return false;
				}
			}		
			return true;
		}else if(dir==3)
		{
			this.xSmall-=this.speed;
			if(this.xSmall<-SMALL_BREAK)
			{
				if(this.canMove(dir))
				{
					this.xSmall=SMALL_BREAK;
					this.tryMove(dir)
					return true;
				}else
				{
					this.xSmall=-SMALL_BREAK;
					return false;
				}
			}	
			return true;			
		}
	}
	
	this.tryMove=function(dir)
	{
		if(!dir){dir=this.dir;}
		if(dir==0)
		{
			if(this.y<2)
			{
				return false;
			}
			if(this.room.walkable(this.x,this.y-1,false,this))
			{
				this.lastX=this.x;
				this.lastY=this.y;
				this.y--;
			}else
			{
				return false;
			}
		}else if(dir==2)
		{
			if(this.y>12)
			{
				return false;
			}
			if(this.room.walkable(this.x,this.y+1,false,this))
			{
				this.lastX=this.x;
				this.lastY=this.y;
				this.y++;
			}else
			{
				return false;
			}
		}else if(dir==3)
		{
			if(this.x<2)
			{
				return false;
			}
			if(this.room.walkable(this.x-1,this.y,false,this))
			{
				this.lastX=this.x;
				this.lastY=this.y;
				this.x--;
			}else
			{
				return false;
			}
		}else if(dir==1)
		{
			if(this.x>17)
			{
				return false;
			}
			if(this.room.walkable(this.x+1,this.y,false,this))
			{
				this.lastX=this.x;
				this.lastY=this.y;
				this.x++;
			}else
			{
				return false;
			}
		}
		return true; 
	}
	
	this.canMove=function(dir)
	{
		if(!dir){dir=this.dir;}
		if(dir==0)
		{
			if(this.y<2)
			{
				return false;
			}
			if(!this.room.walkable(this.x,this.y-1,false,this))
			{
				return false;
			}else
			{
				return true;
			}
		}else if(dir==2)
		{
			if(this.y>12)
			{
				return false;
			}
			if(!this.room.walkable(this.x,this.y+1,false,this))
			{
				return false;
			}else
			{
				return true;
			}
		}else if(dir==3)
		{
			if(this.x<2)
			{
				return false;
			}
			if(!this.room.walkable(this.x-1,this.y,false,this))
			{
				return false;
			}else
			{
				return true;
			}
		}else if(dir==1)
		{
			if(this.x>17)
			{
				return false;
			}
			if(!this.room.walkable(this.x+1,this.y,false,this))
			{
				return false;
			}else
			{
				return true;
			}
		}
		return true; 
	}
	
	this.dash=function()
	{
		if(this.dashing) {return false;}
		this.dashing=true;
		this.dashStart=new Date().getTime();
		
	}
	
	this.dig=function() //fuck you, it's dig now. It shoulda been dig to begin with! the verb of shovel is dig!
	{
		
		var spotX=this.x;
		var spotY=this.y;
		if(this.dir==0)
		{
			spotY--;
		}else if(this.dir==1)
		{
			spotX++;
		}else if(this.dir==2)
		{
			spotY++;
		}else if(this.dir==3)
		{
			spotX--;
		}
		if((spotX<2) || (spotY<2) || (spotX>ROOM_WIDTH-3)|| (spotY>ROOM_HEIGHT-3)|| (this.room.tiles[spotX][spotY].dug) || (!this.room.digable(spotX,spotY,this)))//TODO: check for digability.
		{
			playSound("error");
			return false;
		}else
		{
			playSound("shovel")
			this.room.tiles[spotX][spotY].dug=true;
			var glen=this.room.buriedLoot(spotX,spotY);
			if(glen)
			{
				glen.buried=false;
			}else if(Math.random()*10>4)
			{
				var bmoke=3;
				if(Math.random()*10>8)
				{
					makeObject(spotX,spotY,this.room,ObjectID.Shell);
					return;
				}
				if((this.hp<miles.maxHp) && (Math.random()*10<3))
				{
					makeObject(spotX,spotY,this.room,ObjectID.Heart);
					return;
				}
				if((this.has[hasID.Bow]) && (Math.random()*10<3))
				{
					makeObject(spotX,spotY,this.room,ObjectID.Arrow);
					return;
				}
				if((this.has[hasID.Bomb]) && (Math.random()*10<3))
				{
					makeObject(spotX,spotY,this.room,ObjectID.BombRefill);
					return;
				}
				var pojk=500+Math.floor(Math.random()*2);
				makeObject(spotX,spotY,this.room,pojk);
			}
			return true;
		}
	}
	
	this.useItem=function(secondary)
	{
		if(this.swimming) {return false;}
		if(this.holding) {return false;}

		if(this.getEquipped(secondary)==ObjectID.Bomb)
		{
			this.placeBomb();
			this.removeItem(ObjectID.Bomb,1);
		}else if(this.getEquipped(secondary)==ObjectID.Feather)
		{
			this.jump();

		}else if(this.getEquipped(secondary)==ObjectID.Shovel)
		{
			if(this.dig())
			{
			
			}else
			{
				bConsoleBox.log("You can't dig here.","yellow");
			}

		}else if(this.getEquipped(secondary)==ObjectID.Bow)
		{
			if(this.arrows>0)
			{
				//this.arrows--;
				//this.removeItem(ObjectID.Bow,1);
				if(this.dir==0)
				{
					this.shootArrow(90);
				}else if(this.dir==1)
				{
					this.shootArrow(180);
				}else if(this.dir==2)
				{
					this.shootArrow(270);
				}else if(this.dir==3)
				{
					this.shootArrow(0);
				}
			}else
			{
				bConsoleBox.log("Out of arrows.","yellow");
				playSound("error");
			}

		}else if(this.getEquipped(secondary)==ObjectID.Boomarang)
		{
			if(this.dir==0)
			{
				this.tossBoomarang(90);
			}else if(this.dir==1)
			{
				this.tossBoomarang(180);
			}else if(this.dir==2)
			{
				this.tossBoomarang(270);
			}else if(this.dir==3)
			{
				this.tossBoomarang(0);
			}
			
		}else if(this.getEquipped(secondary)==ObjectID.Boots)
		{
			if(this.dashing)
			{
				this.dashing=false;
			}else
			{
				this.dash();
			}
			
		}else if(this.getEquipped(secondary)==ObjectID.Mirror)
		{
			playSound("warp");
			this.busyrang=false;
			curDungeon.roomZ=curDungeon.startFloor;
			curDungeon.roomX=curDungeon.startX;
			curDungeon.roomY=curDungeon.startY;
			for(var i=0;i<theParty.members.length;i++)
			{
				theParty.members[i].room=curDungeon.curRoom();
				theParty.members[i].x=9;
				theParty.members[i].y=12;
				theParty.members[i].fallingY=0;
			}
			if(OPTIONS.MirrorBreaks)
			{
				this.removeItem(ObjectID.Mirror,1); 
				//this.equippedTrack=0;
			}
		}else if (this.getEquipped(secondary)==ObjectID.Poo)
		{
			//remove poop, make new poop object
			this.has[hasID.Poo]=false;
			this.removeItem(ObjectID.Poo,1); 
			if(this.dir==0)
			{
				var hio= makeObject(this.x,this.y-1,curDungeon.curRoom(),ObjectID.Poo);
			}else if(this.dir==1)
			{
				var hio= makeObject(this.x+1,this.y,curDungeon.curRoom(),ObjectID.Poo);
			}else if(this.dir==2)
			{
				var hio= makeObject(this.x,this.y+1,curDungeon.curRoom(),ObjectID.Poo);
			}else if(this.dir==3)
			{
				var hio= makeObject(this.x-1,this.y,curDungeon.curRoom(),ObjectID.Poo);
			}
			hio.on=true;
		}else if(this.getEquipped(secondary)==ObjectID.RedPotion)
		{
			if(this.hp<this.maxHp)
			{
				this.heal(this.maxHp);
				this.removeItem(ObjectID.RedPotion,1); 
			}else
			{
				bConsoleBox.log("You are not hurt.","yellow");
			}
		}else if(this.getEquipped(secondary)==ObjectID.GreenPotion)
		{
			for(var i=0;i<entities.length;i++)
			{
				if((entities[i].room.z==curDungeon.roomZ) && (entities[i].room.x==curDungeon.roomX)&& (entities[i].room.y==curDungeon.roomY))
				{
					if((isOverTiled(entities[i],32)) && (!entities[i].isPlayer) && (!entities[i].alive))
					{
						entities[i].revive();
						this.removeItem(ObjectID.GreenPotion,1); 
						return false;
					}
				}
			}
			playSound("error");
			bConsoleBox.log("Nobody there to revive");
		}else if(this.getEquipped(secondary)==ObjectID.BluePotion)
		{
			this.heal(120);
			this.removeItem(ObjectID.BluePotion,1); 
		}
	}
	
	this.jump=function()
	{
		if(this.jumping) {return false;}
		//do we even need dir? no jumping is just a status. 
		playSound("jump");
		this.jumpStart=new Date().getTime(); 
		this.fallingY=1;
		this.jumping=true;
		this.jumpPeaked=false;
	}
	
	this.cycleEquipped=function(up,secondary)
	{
		if(secondary)
		{
			var mup=this.getUsableInventory();
			if(up)
			{
				this.equippedTrack2++;
				if(this.equippedTrack2>mup.length-1)
				{
					this.equippedTrack2=0;//mup.length-1;
				}
			}else
			{
				this.equippedTrack2--;
				if(this.equippedTrack2<0)
				{
					this.equippedTrack2=mup.length-1;//0;
				}
			}
			if(this.equippedTrack2>0)
			{
				if(this.equippedTrack2==this.equippedTrack)
				{
					this.cycleEquipped(true,true);
				}
			}
		}else
		{
		
			var mup=this.getUsableInventory();
			if(up)
			{
				this.equippedTrack++;
				if(this.equippedTrack>mup.length-1)
				{
					this.equippedTrack=0;//mup.length-1;
				}
			}else
			{
				this.equippedTrack--;
				if(this.equippedTrack<0)
				{
					this.equippedTrack=mup.length-1;//0;
				}
			}
			if(this.equippedTrack>0)
			{
				if(this.equippedTrack==this.equippedTrack2)
				{
					this.cycleEquipped(true,false);
				}
			}
		}
		
	}
	this.onArrival=function()
	{
	}
	this.hurt=function(dmg)
	{
		if(!this.alive) {return;}
		if(this.diving) {return;}
		if(this.gotHurt>0) {return;}
		this.hp-=dmg;
		playSound("playerhurt");
		if (this.hp<1) 
		{
			this.kill();
		}else
		{
			this.gotHurt=60;
		}
	}
	
	this.getScreenX=function()
	{
		return this.x*32;
	}
	this.getScreenY=function()
	{
		return this.y*32;
	}
	this.swingSword=function()
	{
		if((!miles.has[hasID.Sword]) || (this.swinging))
		{
			return;
		}
		this.poking=false;
		this.swinging=true;
		playSound("sword4");
	}
	this.tossBoomarang=function(ang)
	{
		if((this.swimming) ||(this.holding))
		{
			return false;
		}
		if(!this.busyrang)
		{
			playSound("boomerang");
			this.acting=true;
			this.action=actionID.Boomarang;
			this.actfor=100; 
			this.busyrang=true;
			this.actStart=new Date().getTime();
			var poot=new projectile(this);
			if((this.dir==0) || (this.dir==2))
			{
				poot.x+=32;
			}
			poot.exists=true; 
			poot.angle=ang;
			poot.speed=.5;
			if(this.has[hasID.MagicBoomarang])
			{
				poot.speed=1;
				poot.peakTime=375;
			}
			poot.xv=-Math.cos((Math.PI / 180)*Math.floor(ang));
			poot.yv=-Math.sin((Math.PI / 180)*Math.floor(ang));
			if(this.has[hasID.MagicBoomarang])
			{
				poot.setup(2);
			}else
			{
				poot.setup(1);
			}
			this.projectiles.push(poot);
		}
	}
	
	this.shootArrowAt=function(targ)
	{
		this.arrows--;
		this.removeItem(ObjectID.Bow,1);
		var beta=Math.atan2(this.targ.y-this.y,this.targ.x-this.x)* (180 / Math.PI);
			if (beta < 0.0)
				beta += 360.0;
			else if (beta > 360.0)
				beta -= 360;
		this.shootArrow(beta);
	}
	
	this.shootArrow=function(ang,bmb)
	{
		this.arrows--;
		this.removeItem(ObjectID.Bow,1);
		playSound("shoot");
	
		this.acting=true;
		this.action=actionID.Bow;
		this.actfor=750;
		this.actStart=new Date().getTime();

		var poot=new projectile(this);
		if(bmb) {poot.bombArrow=true;}
		poot.exists=true; 
		poot.angle=ang;
		if(ang==270) //hack
		{
			poot.x+=32;
		}
		if(ang==0)
		{
			poot.y+=28;
		}
		if(ang==225)
		{
			poot.x+=32;
		}
		if(ang==315)
		{
			poot.x+=32;
			poot.y+=32;
		}
		poot.xv=-Math.cos((Math.PI / 180)*Math.floor(ang));
		poot.yv=-Math.sin((Math.PI / 180)*Math.floor(ang));
		poot.setup(0);
		this.projectiles.push(poot);
	}
	
	this.shootBeam=function()
	{
		if((this.swimming) ||(this.holding))
		{
			return false;
		}
		if(this.dir==0)
		{
			ang=90;
		}else if(this.dir==1)
		{
			ang=180;
		}else if(this.dir==2)
		{
			ang=270;
		}else if(this.dir==3)
		{
			ang=0;
		}
		playSound("swordbeam");
		var poot=new projectile(this);
		poot.exists=true; 
		poot.angle=ang;

		if(ang==270) //hack
		{
			poot.x+=32;
		}
		if(ang==0)
		{
			poot.y+=28;
		}
		if(ang==225)
		{
			poot.x+=32;
		}
		if(ang==315)
		{
			poot.x+=32;
			poot.y+=32;
		}
		poot.xv=-Math.cos((Math.PI / 180)*Math.floor(ang));
		poot.yv=-Math.sin((Math.PI / 180)*Math.floor(ang));
		poot.setup(ProjTypes.SwordBeam);
		this.projectiles.push(poot);
	}
	
	this.walkAnimate=function()
	{
		this.walkAni++;
		if(this.walkAni>this.walkAniRate)
		{
			this.walkAni=0;
			this.walkTrack++;
			if(this.walkTrack>this.walkFrames-1)
			{
				this.walkTrack=0;
			}
		}
	}
	
	this.draw=function(can)
	{
		for(var i=0;i<this.projectiles.length;i++)
		{
			this.projectiles[i].draw(can,xOffset,yOffset);
		}
		if(!this.alive)
		{
			//if((this.deathAniTrack<2) || (this.isPlayer))//hack
			//{
				this.deadSprites[this.deathAniTrack].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2)
			//}else
			//{
			//	this.deadSprites[this.deathAniTrack].draw(can,this.x*32+xOffset-16,this.y*32+yOffset+8-this.fallingY*2)
			//}
			return;
		}else if((this.isPlayer) && (this.holding))
		{
			
			this.sprites[4].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
			this.holding.draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-16-this.fallingY*2);
		}else if((this.isPlayer) && (this.swinging))
		{
			var knuckx=-48;
			var knucky=-48;
			
			var shX=0;
			var shY=0;
			if(this.dir==0)
			{
				shX=2;
				shY=4;
			}else if(this.dir==1)
			{
				shX=0;
				shY=0;
			}else if(this.dir==2)
			{
				shX=-4;
				shY=2;
			}else if(this.dir==3)
			{
				shX=8;
				shY=8;
			}
			if((this.dir==0)&&(this.has[hasID.Shield]))
			{
				this.shieldSprites[1].draw(can,this.x*32+this.xSmall+xOffset+shX+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+shY);
			}else if((this.dir==1) &&(this.has[hasID.Shield]))
			{
				this.shieldSprites[0].draw(can,this.x*32+this.xSmall+xOffset+shX+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+shY);
			}
			this.swingSprites[this.dir][this.swingtrack].draw(can,this.x*32+this.xSmall+xOffset+knuckx+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+knucky);
			if((this.dir!=0) && (this.dir!=1) &&(this.has[hasID.Shield]))
			{
				if(this.dir==2)
				{
					this.shieldSprites[3].draw(can,this.x*32+this.xSmall+xOffset+shX+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+shY);
				}else if(this.dir==3)
				{
					this.shieldSprites[2].draw(can,this.x*32+this.xSmall+xOffset+shX+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+shY);
				}
			}
		}else if((this.isPlayer) && (this.poking))
		{
			var knuckx=-48;
			var knucky=-48;
			
			var shX=0;
			var shY=0;
			if(this.dir==0)
			{
				shX=2;
				shY=4;
			}else if(this.dir==1)
			{
				shX=0;
				shY=0;
			}else if(this.dir==2)
			{
				shX=2;
				shY=2;
			}else if(this.dir==3)
			{
				shX=8;
				shY=8;
			}
			if((this.dir==0)&&(this.has[hasID.Shield]))
			{
				this.shieldSprites[1].draw(can,this.x*32+this.xSmall+xOffset+shX+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+shY);
			}else if((this.dir==1) &&(this.has[hasID.Shield]))
			{
				this.shieldSprites[0].draw(can,this.x*32+this.xSmall+xOffset+shX+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+shY);
			}
			
			if((this.animated) && (this.stepping))
			{
				if((this.dir==2) || (this.dir==1))
				{
					this.walkSprites[this.dir][this.walkTrack].draw(can,this.x*32+this.xSmall+xOffset+knuckx+this.shakeTrack+48,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+knucky+46);
					this.pokeSprites[this.dir].draw(can,this.x*32+this.xSmall+xOffset+knuckx+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+knucky);
				
				}else
				{
					this.pokeSprites[this.dir].draw(can,this.x*32+this.xSmall+xOffset+knuckx+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+knucky);
					this.walkSprites[this.dir][this.walkTrack].draw(can,this.x*32+this.xSmall+xOffset+knuckx+this.shakeTrack+48,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+knucky+46);
				}
				
			}else
			{	
				if((this.dir==2) || (this.dir==1))
				{
					this.sprites[this.dir].draw(can,this.x*32+this.xSmall+xOffset+knuckx+this.shakeTrack+48,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+knucky+49);
					this.pokeSprites[this.dir].draw(can,this.x*32+this.xSmall+xOffset+knuckx+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+knucky);
				}else
				{
					this.pokeSprites[this.dir].draw(can,this.x*32+this.xSmall+xOffset+knuckx+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+knucky);
					this.sprites[this.dir].draw(can,this.x*32+this.xSmall+xOffset+knuckx+this.shakeTrack+48,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+knucky+49);
				}
			}
			//somehow only draw section of sprite. 
	
			if((this.dir!=0) && (this.dir!=1) &&(this.has[hasID.Shield]))
			{
				if(this.dir==2)
				{
					this.shieldSprites[3].draw(can,this.x*32+this.xSmall+xOffset+shX+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+shY);
				}else if(this.dir==3)
				{
					this.shieldSprites[2].draw(can,this.x*32+this.xSmall+xOffset+shX+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+shY);
				}
			}
		}else
		{
			if(this.gotHurt%2==0)
			{
				if(this.diving)
				{
					var jerry=can.globalAlpha;
					can.globalAlpha=0.75;
					divesprite.draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
					can.globalAlpha=jerry; 
				}else if(this.swimming)
				{
					this.swimSprites[this.dir].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
				}else
				{
					if((this.has[hasID.Shield]) && (this.dir==0))
					{
						this.shieldSprites[0].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
					}
					
				
					if(this.acting)
					{
							if((this.dir==0) || (this.dir==1))
							{
								this.actingSprites[this.dir][this.action].draw(can,this.x*32+this.xSmall+xOffset-12+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
							}else
							{
								this.actingSprites[this.dir][this.action].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
							}
					}else
					{
						if((this.animated) && (this.stepping))
						{
							this.walkSprites[this.dir][this.walkTrack].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
						}else
						{
							this.sprites[this.dir].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
						}
					}
					
					if((this.has[hasID.Shield]) && (this.dir>0))
					{
						if(this.dir==3)
						{
							this.shieldSprites[this.dir].draw(can,this.x*32+this.xSmall+xOffset-5+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
						}else
						{
							this.shieldSprites[this.dir].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
						}
					
					}
				}
				
			}
			if((this.fallingY>0) && (this.room.tiles[this.x][this.y].data!=DungeonTileType.Hole))
			{
				if(this.fallingY>100)
				{
					shadowSprite[0].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset);
				}else if(this.fallingY>50)
				{
					shadowSprite[1].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset);
				}else 
				{
					shadowSprite[2].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset);
				}
			}
		}
		
		if(this.bunnyHead)
		{
			bunnyheadsprite[this.dir].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-18-this.fallingY*2);
		}
		
		if(this.dashing)
		{
			/*
			can.globalAlpha=0.50;
			footcloudsprite.draw(can,this.x*32+this.xSmall+xOffset,this.y*32+this.ySmall+yOffset+10-this.fallingY*2);
			can.globalAlpha=1;*/
		}
		
		for(var i=0;i<this.activebombs.length;i++)
		{
			if(this.activebombs[i].exists)
			{
				this.activebombs[i].draw(can,xOffset,yOffset);
			}
		}
		
		
	}
	this.goHole=function(x,y,obj)
	{
		this.destX=x;
		this.destY=y;
		this.path=this.room.getPath(this.x,this.y,x,y,this,false);
		this.pathTrack=0;
		if(obj)
		{
			this.destObj=obj;
		}
		this.going=true;
	}
	this.go=function(x,y,obj)
	{
		this.destX=x;
		this.destY=y;
		this.path=this.room.getPath(this.x,this.y,x,y,this,true);
		this.pathTrack=0;
		if((obj)) //&& (!obj.underWater))
		{
			this.destObj=obj;
		}
		this.going=true;
	}

	this.say=function(saywhat)
	{
		playSound("textbox");
		/*this.talkBox=new textbox();
		this.talkBox.setup();
		this.talkBox.x=200;
		this.talkBox.y=200;
		this.talkBox.textLim=102;*/
		if(saywhat==null)
		{
			if((this.textTrack<this.textBank.length) && (this.textConditions[this.textTrack]()))
			{
				//this.talkBox.log(this.name+": "+this.textBank[this.textTrack]);
				$("<div id='dialogBox'>").text(this.name+": "+this.textBank[this.textTrack]).appendTo("body");
				if(!this.textSaid[this.textTrack])
				{
					this.textSaid[this.textTrack]=true;
					this.textTrack++;
					
				}

			}else
			{
				var k=Math.floor(Math.random()*this.chatterBank.length);
				//this.talkBox.log(this.name+": "+this.chatterBank[k]);
				$("<div id='dialogBox'>").text(this.name+": "+this.chatterBank[k]).appendTo("body");
			}
		}else
		{
			//this.talkBox.log(this.name+": "+saywhat);
			$("<div id='dialogBox'>").text(this.name+": "+saywhat).appendTo("body");
		}
		//this.talkBox.hasFocus=true;
		//buttons.push(this.talkBox);
		return;
	}
	
	this.getFacingObject=function()
	{
		var gx=this.x;
		var gy=this.y;
		if(this.dir==0)
		{
			gy--;
		}else if(this.dir==1)
		{
			gx++;
		}else if(this.dir==2)
		{
			gy++;
		}else if(this.dir==3)
		{
			gx--;
		}
		for(var i=0;i<this.room.objects.length;i++)
		{
			if((this.room.objects[i].x==gx) && (this.room.objects[i].y==gy))
			{
				return this.room.objects[i];
			}
		}
		return null;
	}
	
	this.getFacingEntity=function()
	{
		var gx=this.x;
		var gy=this.y;
		if(this.dir==0)
		{
			gy--;
		}else if(this.dir==1)
		{
			gx++;
		}else if(this.dir==2)
		{
			gy++;
		}else if(this.dir==3)
		{
			gx--;
		}
		for(var i=0;i<entities.length;i++)
		{
			if((entities[i].x==gx) && (entities[i].y==gy))
			{
				if((entities[i].room.z==this.room.z)&&(entities[i].room.x==this.room.x) && (entities[i].room.y==this.room.y))
				{
					return entities[i];
				}
			}
		}
		for(var i=0;i<entities.length;i++)
		{
			if((entities[i].x==this.x) && (entities[i].y==this.y) &&(!entities[i].isPlayer))
			{
				if((entities[i].room.z==this.room.z)&&(entities[i].room.x==this.room.x) && (entities[i].room.y==this.room.y))
				{
					return entities[i];
				}
			}
		}
		return null;
	}
	
	this.update=function()
	{
		for(var i=0;i<this.projectiles.length;i++)
		{
			this.projectiles[i].update();
			if((this.projectiles[i].type==ProjTypes.Boomarang) || (this.projectiles[i].type==ProjTypes.MagicBoomarang))
			{
				if(!this.busyrang)
				{
					this.projectiles[i].exists=false;
				}
			}
			if(!this.projectiles[i].exists)
			{
				this.projectiles.splice(i,1);
				i--;
			}
		}
		if(this.shaking)
		{
			var plopl=new Date().getTime();
			if(plopl-this.shakingSince>this.shakingDur)
			{
				this.shaking=false;
				this.shakeTrack=0;
			}else
			{
				if(this.shakingRight)
				{
					this.shakeTrack+=2;
					if(this.shakeTrack>4)
					{
						this.shakingRight=false;
						this.shakeTrack=0;
					}
				}else
				{
					this.shakeTrack-=2;
					if(this.shakeTrack<-4)
					{
						this.shakingRight=true;
						this.shakeTrack=0;
					}
				}
			}
		}
		if((this.swimming) || (this.holding))
		{
			this.dashing=false;
			this.reallyDashing=false;
			if((this.swimming) && (!this.has[hasID.Flippers]))
			{
				this.hurt(20);
				this.x=this.enteredX;
				this.y=this.enteredY;
			}
		}
		if(this.dashing)
		{
			
			var plopl=new Date().getTime();
			if(plopl-this.dashStart>this.dashDelay)
			{
				this.reallyDashing=true;
				this.speed=this.dashSpeed;
				if(this.incMove())
				{
					playSound("dash");
					var angrand=Math.random()*12;
					angrand-=4;
					var xrand=Math.random()*12;
					xrand-=4;
					var poto =monsta.shootTextured(this.x*32+this.xSmall+xOffset+xrand+6,this.y*32+this.ySmall+yOffset+22-this.fallingY*2,270+angrand,0.5,"footcloud");//sprite);
					poto.durTime=200;
					poto.alpha=0.25;
					poto.gravity=false;
				}else
				{
					this.dashing=false;
					this.reallyDashing=false;
					//bounce back? 
					playSound("rebound");
					this.shake();
				}
				
			}else
			{
				//rev up sound, effects
				playSound("dash");
				var angrand=Math.random()*12;
				angrand-=4;
				var xrand=Math.random()*12;
				xrand-=4;
				var poto =monsta.shootTextured(this.x*32+this.xSmall+xOffset+xrand+6,this.y*32+this.ySmall+yOffset+22-this.fallingY*2,270+angrand,2.95,"footcloud");//sprite);
				poto.durTime=200;
				poto.alpha=0.25;
			}	
		
		}else
		{
			this.speed=this.baseSpeed;
		}
		if(this.jumping)
		{
			if(!this.jumpPeaked)
			{
				this.fallingY+=this.jumpSpeed;
				var sunt=new Date().getTime();
				if(sunt-this.jumpStart>this.jumpTime)
				{
					this.jumpPeaked=true; 
					this.falling=true;
				}
			}
		}
		
		//if((this.x!=this.lastX) || (this.y!=this.lastY))
		if(this.isPlayer) 
		{
			if((this.x!=this.lastX) || (this.y!=this.lastY))
			{
				for(var i=0;i<this.room.stairs.length;i++)
				{
					if((this.room.stairs[i].x==this.x) && (this.room.stairs[i].y==this.y) &&(!this.room.stairs[i].hidden))
					{
						if(this.room.tiles[this.x][this.y].data==DungeonTileType.UpStair)
						{
							this.lastX=this.x;
							this.lastY=this.y;
							curDungeon.changeFloor(true,true);
							break;
						}else
						{
							this.lastX=this.x;
							this.lastY=this.y;
							curDungeon.changeFloor(false,true);
							break;
						}
					}
				}
			}
			for(var i=0;i<this.room.exits.length;i++)
			{
				if(this.room.exits[i].orientation==0)
				{
					if((this.y==2) && (this.ySmall<-8)&& ((this.x==this.room.exits[i].x) || (this.x==this.room.exits[i].x+1)))
					{
						curDungeon.changeRoom(0,true);
					}
				}else if(this.room.exits[i].orientation==2)
				{
					if((this.y==12) && (this.ySmall>8)&& ((this.x==this.room.exits[i].x) || (this.x==this.room.exits[i].x+1)))
					{
						curDungeon.changeRoom(2,true);
					}
				}else if(this.room.exits[i].orientation==3)
				{
					if((this.x==2)&& (this.xSmall<-8) && ((this.y==this.room.exits[i].y) || (this.y==this.room.exits[i].y+1)))
					{
						curDungeon.changeRoom(3,true);
					}
				}else if(this.room.exits[i].orientation==1)
				{
					if((this.x==17) && (this.xSmall>8) && ((this.y==this.room.exits[i].y) || (this.y==this.room.exits[i].y+1)))
					{
						curDungeon.changeRoom(1,true);
					}
				}
			}
		}
		if(this.diving)
		{
			//check for underwater shit
			var sunt=new Date().getTime();
			if(sunt-this.firstBreath>this.holdBreath*1000)
			{
				this.diving=false; 
			}
			this.swinging=false;
		}
		if(this.swinging)
		{
			this.swingcount++;
			if(this.swingcount>this.swingrate)
			{
//				console.log("swinging");
				this.swingcount=0;
				this.swingtrack++;
				if((this.swingtrack==4) && (this.has[hasID.MasterSword]) && (this.hp==this.maxHp))
				{
					this.shootBeam();
				}
				if (this.swingtrack>7)
				{
					this.swingtrack=0;
					this.swinging=false; 
				}
			}
			//return;
			var hurtx=-1;
			var hurty=-1;
			if(this.swingtrack<3)
			{
				if(this.dir==0)
				{
					hurtx=this.x-1;
					hurty=this.y-1;
				}else if(this.dir==1)
				{
					hurtx=this.x+1;
					hurty=this.y-1;
				}else if(this.dir==2)
				{
					hurtx=this.x-1;
					hurty=this.y+1;
				}else if(this.dir==3)
				{
					hurtx=this.x-1;
					hurty=this.y-1;
				}
			}else if(this.swingtrack<5)
			{
				if(this.dir==0)
				{
					hurtx=this.x;
					hurty=this.y-1;
				}else if(this.dir==1)
				{
					hurtx=this.x+1;
					hurty=this.y;
				}else if(this.dir==2)
				{
					hurtx=this.x;
					hurty=this.y+1;
				}else if(this.dir==3)
				{
					hurtx=this.x-1;
					hurty=this.y;
				}
			}else
			{
				if(this.dir==0)
				{
					hurtx=this.x+1;
					hurty=this.y-1;
				}else if(this.dir==1)
				{
					hurtx=this.x+1;
					hurty=this.y+1;
				}else if(this.dir==2)
				{
					hurtx=this.x+1;
					hurty=this.y+1;
				}else if(this.dir==3)
				{
					hurtx=this.x-1;
					hurty=this.y+1;
				}
			} 
			if((hurtx>-1) && (hurty>-1))
			{
				for(var i=0;i<entities.length;i++)
				{
					if((entities[i].room.z==this.room.z) && (entities[i].room.x==this.room.x) && (entities[i].room.y==this.room.y))
					{
						if((entities[i].x==hurtx) && (entities[i].y==hurty))
						{
							if((this.team!=entities[i].team) || (OPTIONS.FriendlyFire))
							{
								entities[i].hurt(this.swordDamage);
							}
						}
					}
				}
				for(var i=0;i<this.room.objects.length;i++)
				{
					if((this.room.objects[i].x==hurtx) && (this.room.objects[i].y==hurty))
					{
						if(this.room.objects[i].swordActivate()) 
						{
							this.room.objects[i].activate();
						}
					}
				
				}
			}
		}else if(this.poking)
		{
			var hurtx=-1;
			var hurty=-1;
			if(this.dir==0)
			{
				hurtx=this.x;
				hurty=this.y-1;
			}else if(this.dir==1)
			{
				hurtx=this.x+1;
				hurty=this.y;
			}else if(this.dir==2)
			{
				hurtx=this.x;
				hurty=this.y+1;
			}else if(this.dir==3)
			{
				hurtx=this.x-1;
				hurty=this.y;
			}
			
			if((hurtx>-1) && (hurty>-1))
			{
				for(var i=0;i<entities.length;i++)
				{
					if((entities[i].room.z==this.room.z) && (entities[i].room.x==this.room.x) && (entities[i].room.y==this.room.y))
					{
						if((entities[i].x==hurtx) && (entities[i].y==hurty))
						{
							if((this.team!=entities[i].team) || (OPTIONS.FriendlyFire))
							{
								entities[i].hurt(this.swordDamage/2);
							}
						}
					}
				}
				for(var i=0;i<this.room.objects.length;i++)
				{
					if((this.room.objects[i].x==hurtx) && (this.room.objects[i].y==hurty))
					{
						if(this.room.objects[i].swordActivate()) 
						{
							this.room.objects[i].activate();
						}
					}
				
				}
			}
		}else if((this.acting) && (this.actfor>0))
		{
			var hupp=new Date().getTime();
			if(hupp-this.actStart>this.actfor)
			{
				this.acting=false;
			}
		}
		if(this.holding)
		{
			this.going=false;
			this.path=null; 
			this.onArrival=function(){};
			this.destObj=null;
		}
		this.swimming=false;
		if(!this.alive)
		{
			if(this.deathAniTrack>1) {return;}
			this.aniCount++;
			if(this.aniCount>this.aniRate)
			{
				this.aniCount=0;
				this.aniTrack++;
				this.deathAniTrack++;
			}
			return;
		}
		if(this.gotHurt>0) //not so quick?
		{
			this.gotHurt--;
		}
		
		if(this.healAmount>4)
		{
			this.healCount++;
			if(this.healCount>this.healRate)
			{
				this.healCount=0;
			
				this.healAmount-=5;
				if(this.healAmount<0)
				{
					this.healAmount=0;
				}
				this.hp+=5;
				playSound("heal");
				if(this.hp>this.maxHp)
				{
					this.hp=this.maxHp;
					this.healAmount=0;
				}
			}
		}
		if(!OPTIONS.UpdateAllRooms)
		{
			if((this.room) && (this.room.name!=curDungeon.curRoom().name))
			{
				return; 
			}
		}
		
		for(var i=0;i<this.activebombs.length;i++)
		{
			this.activebombs[i].update();
			if(!this.activebombs[i].exists)
			{
				this.activebombs.splice(i,1);
				//i--;
			}
			
		}
	
		if(this.falling)
		{
			this.swinging=false;
			this.poking=false;
			this.fallingY-=5;
			if(this.fallingY<1)
			{
				if(this.room.tiles[this.x][this.y].data==DungeonTileType.ReallyUnstable)
				{
					playSound("landing");
					playSound("cavein");
					this.room.tiles[this.x][this.y].data=DungeonTileType.Hole;
				}
				this.falling=false;
				this.fallingY=0;
				if(this.room.tiles[this.x][this.y].data!=DungeonTileType.Hole)
				{
					playSound("landing");
					this.lastX=this.x;
					this.lastY=this.y;
				}
				
			}
			this.path=null;
			this.going=false;
			this.walkTrack=0;
			this.destObj=null;
			this.onArrival=function(){};
			
		}
		if(this.isPlayer)
		{
			//this.room=curDungeon.curRoom();
		}
		for(var i=0;i<this.room.objects.length;i++)
		{
			if(this.fallingY<1)
			{
		
				if(this.room.objects[i].type==ObjectID.Spikes)
				{
					if((this.room.objects[i].on)&&(this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y))
					{
						this.hurt(10); 
					}
				}else if(this.room.objects[i].type==ObjectID.ToggleSwitch)
				{
					
					if(this.isPlayer)//OPTION?
					{
						if((!this.room.objects[i].on)&&(this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y))
						{
							this.room.objects[i].playerActivate();
						}
					}
				}else if(this.room.objects[i].type==ObjectID.Pot)
				{
					
					if(this.isPlayer)//OPTION?
					{
						if((this.room.objects[i].curSprite==0)&&(this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y))
						{
							this.room.objects[i].playerActivate();
						}
					}
				}else if((this.room.objects[i].pickupable) &&(this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y))
				{
					if(!this.room.objects[i].underWater)
					{
						if((this.AI==0) || (OPTIONS.NPCPickup))
						{
							this.room.objects[i].playerActivate();
						}
					}else if(this.diving)
					{
						if((this.AI==0) || (OPTIONS.NPCPickup))
						{
							this.room.objects[i].playerActivate();
						}
					}
				}
			}
		}
		if(this.fallingY<1)
		{
			this.jumping=false;
			if((this.room.tiles[this.x][this.y].data==DungeonTileType.Unstable) && (OPTIONS.UnsafeWalking))
			{
				
				if((this.x!=this.lastX) || (this.y!=this.lastY))
				{
					this.room.tiles[this.x][this.y].data=DungeonTileType.ReallyUnstable;
					playSound("unstable");
					this.lastX=this.x;
					this.lastY=this.y;
				}
			}else if((this.room.tiles[this.x][this.y].data==DungeonTileType.ReallyUnstable)&& (OPTIONS.UnsafeWalking))
			{
				if((this.x!=this.lastX) || (this.y!=this.lastY))
				{
					this.room.tiles[this.x][this.y].data=DungeonTileType.Hole;
					playSound("cavein");
					//this.lastX=this.x;
					//this.lastY=this.y;
				}
			}else if((this.room.tiles[this.x][this.y].data==DungeonTileType.Hole) &&(!this.falling) &&(!this.jumping))
			{
				
				if(this.isPlayer)
				{	
					playSound("fall");
				}else
				{
					//playSound("enemyfall");
				}
				//console.log("you fell down a floor!")
				//Do better drawing?
				this.falling=true;
				this.fallingY=150;
				this.dashing=false;
				this.reallyDashing=false;
				this.xSmall=0;
				this.ySmall=0;
				if(this.isPlayer)
				{
					if(this.room.z==0)
					{
						this.fallingY=0;
						bConsoleBox.log("can't fall any lower");
						this.hurt(20);
						this.x=this.enteredX;
						this.y=this.enteredY;
						//damage and find nearest standable point. 
					}else if(!curDungeon.rooms[this.room.z-1][this.room.x][this.room.y].active)
					{
						this.fallingY=0;
						bConsoleBox.log("no room below");
						//console.log(this.enteredX,this.enteredY);
						this.hurt(20);
						this.x=this.enteredX;
						this.y=this.enteredY;
					}else
					{
						if(this.isPlayer)
						{
							curDungeon.roomZ--;
							this.room=curDungeon.curRoom();
							this.room.explored=true;
							this.room.hidden=false;
						}else
						{
							this.room=curDungeon.rooms[curDungeon.roomZ-1][this.room.x][this.room.y];
						}
						
					
						this.enteredX=this.x;
						this.enteredY=this.y;
					}
				}else if (this.room.z>0)
				{
					this.room=curDungeon.rooms[this.room.z-1][this.room.x][this.room.y];

				}else
				{
					bConsoleBox.log("npc can't fall any lower");
					this.hurt(20);
					this.x=this.enteredX;
					this.y=this.enteredY;
				}
				//this.room=curDungeon.rooms[curDungeon.roomZ-1][curDungeon.roomX][curDungeon.roomY];
			}else if((this.room.tiles[this.x][this.y].data>19) && (this.room.tiles[this.x][this.y].data<25))
			{
				if(!this.jumping)
				{
					this.swimming=true;
				
				}
			}
		}
		
		if((this.AI==1) && (!this.going))
		{
			//this.go(Math.floor(Math.random()*12) need function to find walkable tile.
			
			if((this.room.name==miles.room.name) && (this.room.z==miles.room.z))
			{
				var neddle=null;//.room.closestAdj(miles,this);
				if((this.party) && (this.partyPos>0))
				{
					neddle=this.party.members[this.partyPos-1];
				}else
				{
					neddle=miles;
				}
				if((this.x!=neddle.x) || (this.y!=neddle.y))
				{
					this.go(neddle.x,neddle.y)
					this.path.pop();
					this.status="Target is in the same room!";
				}else
				{
					this.status="Arrived." 
					//if arrived at player, which we'll assume for now.
					if((this.textTrack<this.getOffChest) && ($("#dialogBox").length < 1))//(!this.talkBox.exists))
					{
						//this.textSaid[this.textTrack]=true; 
						if((!this.partyMember) && (this.autoJoin))
						{
							theParty.add(this);
						}
						this.say();
						//this.textBank.splice(0,1);
					}
						
				}
				
				
			}else if(this.room.z>miles.room.z) //find stairs (or hole?) down and head there
			{	
				this.status="Target is below";
				if(this.room.hasStairs(false))
				{
					this.status+=" and there are stairs!";
					this.onArrival=function()
					{
						this.room=curDungeon.rooms[this.room.z-1][this.room.x][this.room.y]
					}
					var nex=this.room.getStairs(false);
					this.go(nex.x,nex.y);
					return;
				}else 
				{
					for(var i=2;i<this.room.width-3;i++) //TODO check this
					{
						for(var j=2;j<this.room.height-3;j++)
						{
							if(this.room.tiles[i][j].data==DungeonTileType.Hole)
							{
								this.status+=" and there is a hole!";
								this.onArrival=function()
								{
									//this.room=curDungeon.rooms[this.room.z-1][this.room.x][this.room.y]
								}
								var nex=this.room.getStairs(false);
								this.goHole(i,j);
								return;
							}
						}
					}
				}
			}else if(this.room.z<miles.room.z) //find stairs up and head there
			{
				this.status="Target is above";
				if(this.room.hasStairs(true))
				{
					this.status+=" and there are stairs!";
					this.onArrival=function()
					{
						this.room=curDungeon.rooms[this.room.z+1][this.room.x][this.room.y]
					}
					var nex=this.room.getStairs(true)
					this.go(nex.x,nex.y);
				}
			}else //you have the right floor.
			{
				var nard=new Array();
				this.status="Target is on the same floor";
				if((miles.room.y<this.room.y) && (this.room.getOpenDoor(0,this)))
				{
					this.status="he's to the north and there is an open door!";
					var peg=this.room.getOpenDoor(0,this);
					nard=this.room.getPath(this.x,this.y,peg.x,peg.y+1,this,true);
					if((this.x==peg.x) &&  (this.y==peg.y+1))
					{
						nard.push(0);
					}
				}if((miles.room.x>this.room.x) && (this.room.getOpenDoor(1,this)))
				{
					this.status="he's to the east and there is an open door!";
					var peg=this.room.getOpenDoor(1,this);
					nard=this.room.getPath(this.x,this.y,peg.x-1,peg.y,this,true);
					if((this.x==peg.x-1) &&  (this.y==peg.y))
					{
						nard.push(0);
					}
				}if((miles.room.y>this.room.y) && (this.room.getOpenDoor(2,this)))
				{
					this.status="he's to the south and there is an open door!";
					var peg=this.room.getOpenDoor(2,this);
					nard=this.room.getPath(this.x,this.y,peg.x,peg.y-1,this,true);
					if((this.x==peg.x) &&  (this.y==peg.y-1))
					{
						nard.push(0);
					}
				} if((miles.room.x<this.room.x) && (this.room.getOpenDoor(3,this)))
				{
					this.status="he's to the west and there is an open door!";
					var peg=this.room.getOpenDoor(3,this);
					nard=this.room.getPath(this.x,this.y,peg.x+1,peg.y,this,true);
					if((this.x==peg.x+1) &&  (this.y==peg.y))
					{
						nard.push(0);
					}
				}
				if((nard) && (nard.length>0))
				{
								
					if(peg)
					{
						if(peg.orientation==0) 
						{
							this.onArrival=function()
							{
								//curDungeon.changeRoom(0,true);
								if(this.room.y>0){
									this.room=curDungeon.rooms[this.room.z][this.room.x][this.room.y-1]
									this.y=12;
									this.x=peg.x;
								}
							}
							this.go(peg.x,peg.y+1);
						}else if(peg.orientation==1) 
						{
							
							this.onArrival=function()
							{
								if(this.room.x<curDungeon.getWidth()-1){
									this.room=curDungeon.rooms[this.room.z][this.room.x+1][this.room.y]
									this.x=2;
									this.y=peg.y;
								}
							}
							
							this.go(peg.x-1,peg.y);
						}else if(peg.orientation==2) 
						{
							this.onArrival=function()
							{
								if(this.room.y<curDungeon.getHeight()-1){
									this.room=curDungeon.rooms[this.room.z][this.room.x][this.room.y+1]
									this.y=2;
									this.x=peg.x;
								}
							}
							this.go(peg.x,peg.y-1);
						}else if(peg.orientation==3) 
						{
							this.onArrival=function()
							{
								if(this.room.x>0){
									this.room=curDungeon.rooms[this.room.z][this.room.x-1][this.room.y]
									this.x=17;
									this.y=peg.y;
								}
							}
							this.go(peg.x+1,peg.y);
						}
					}
				}else
				{
					this.status="on same floor, but no open door";
				}
				
			}	

		}
		if(this.going)
		{
			
			if(this.path)//if path. length==0, you're there. do function. 
			{
				
				if(this.path.length>0)
				{
					if(this.path[this.pathTrack].x>this.x) //facing east
					{
						this.dir=1;
					}
					if(this.path[this.pathTrack].x<this.x) //facing west
					{
						this.dir=3;
					}
					if(this.path[this.pathTrack].y>this.y) //facing south
					{
						this.dir=2;
					}
					if(this.path[this.pathTrack].y<this.y) //facing north
					{
						this.dir=0;
					}
					if(this.dir==0)
					{
						this.ySmall-=this.speed;
						if(this.ySmall<-SMALL_BREAK)
						{
							this.lastX=this.x;
							this.lastY=this.y;
							this.x=this.path[this.pathTrack].x;
							this.y=this.path[this.pathTrack].y;
							this.pathTrack++;
							this.ySmall=SMALL_BREAK;
						}
					}else if(this.dir==2)
					{
						this.ySmall+=this.speed;
						if(this.ySmall>SMALL_BREAK)
						{
							this.lastX=this.x;
							this.lastY=this.y;
							this.x=this.path[this.pathTrack].x;
							this.y=this.path[this.pathTrack].y;
							this.pathTrack++;
							this.ySmall=-SMALL_BREAK;
						}
					}else if(this.dir==3)
					{
						this.xSmall-=this.speed;
						if(this.xSmall<-SMALL_BREAK)
						{
							this.lastX=this.x;
							this.lastY=this.y;
							this.x=this.path[this.pathTrack].x;
							this.y=this.path[this.pathTrack].y;
							this.pathTrack++;
							this.xSmall=SMALL_BREAK;
						}
					}else if(this.dir==1)
					{
						this.xSmall+=this.speed;
						if(this.xSmall>SMALL_BREAK)
						{
							this.lastX=this.x;
							this.lastY=this.y;
							this.x=this.path[this.pathTrack].x;
							this.y=this.path[this.pathTrack].y;
							this.pathTrack++;
							this.xSmall=-SMALL_BREAK;
						}
					}
					/*this.lastX=this.x;
					this.lastY=this.y;
					this.x=this.path[this.pathTrack].x;
					this.y=this.path[this.pathTrack].y;
					this.pathTrack++;*/
				}
				if(this.pathTrack==this.path.length)
				{
					this.going=false;
					this.walkTrack=0;
					this.pathTrack=0;
					//this.lastX=this.x;
					//this.lastY=this.y;
					this.path=null;
					if((this.AI>0) && (this.tracking))
					{
						var bup=this.room.closestAdj(this.tracking,this,this);
						if((bup)&&(this.x==bup.x) && (this.y==bup.y))
						{
							this.status="Arrived." 
							
							//if arrived at player, which we'll assume for now.
							if((!this.partyMember) && (this.autoJoin))
							{
								theParty.add(this);
							}
							if((this.textTrack<this.getOffChest) && ($("#dialogBox").length < 1))//(!this.talkBox.exists))
							{
								this.say();
								//this.textBank.splice(0,1);
							}
						}
					}
					if((this.destObj) && ((!this.destObj.underWater) || (this.diving)))
					{
						if(this.destObj.x>this.x)
						{
							this.dir=1;
						}else if(this.destObj.x<this.x)
						{
							this.dir=3;
						}else if(this.destObj.y>this.y)
						{
							this.dir=2;
						}else if(this.destObj.y<this.y)
						{
							this.dir=0;
						}
						if(this.destObj.playerUsable)
						{
							//if((!this.destObj.underWater) || (this.diving))
							//{
								this.destObj.playerActivate();
							//}
						}
						this.destObj=null;
					}
					this.onArrival();
					this.onArrival=function()
					{
					}
				}
			}
		}
		if(!this.swimming)
		{
			this.diving=false;
		}
	}

	for(var i=0;i<numHas;i++)
	{
		this.has.push(false);
	}
	//this.has[5]=true;

}