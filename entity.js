var equippedID={};
equippedID.Bomb=1;
equippedID.Bow=2;
equippedID.Boomerang=3;

var numEquippable=2;

var dude_count=0;

var bunnyheadsprite=new Array();
bunnyheadsprite.push(Sprite("bheadup"));
bunnyheadsprite.push(Sprite("bheadright"));
bunnyheadsprite.push(Sprite("bheaddown"));
bunnyheadsprite.push(Sprite("bheadleft"));

var halfgrasssprite=Sprite("dungeontiles/halfgrass");
var frozenSprite=Sprite("frozen");

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

var bombCount=0;

function bomb(croom,isSuper)
{
	if(!isSuper) {isSuper=false;}
	this.isSuper=isSuper;
	this.x=0;
	this.y=0;
	this.bomb=true;
	this.ID=bombCount;
	bombCount++;
	this.exists=false;
	this.timePlaced=0;
	this.name="bomb";
	this.fuse=4;
	this.room=croom;
	this.armed=false;
	this.sprites=new Array();
	this.sprites.push(Sprite("bomb1"));
	this.sprites.push(Sprite("bomb2"));
	this.sprites.push(Sprite("superbomb"));
	this.sprites.push(Sprite("superbomb1"));
	this.xv=0;
	this.yv=0;
	this.underWater=false;
	this.xa=0;
	this.ya=0;
	this.decel=0.000;
	this.friction=0.05;
	this.fallingY=0;
	this.fallingUp=0;
	this.xSmall=0;
	this.ySmall=0;
	this.peakXV=2;
	this.peakYV=2;
	this.update=function()
	{
		if(this.fallingUp>0)
		{
			this.fallingY+=1;
			this.fallingUp-=1;
		}else if(this.fallingY>0)
		{
			this.fallingY-=4;
			if((this.fallingY<1) && (this.fallingUp<1)) 
			{
				if((this.room.tiles[this.x][this.y].data>19) && (this.room.tiles[this.x][this.y].data<24))
				{
					playSound("splash");
					this.underWater=true;
					this.xa=0;
					this.ya=0;
					this.xv=0;
					this.yv=0;
					var bumj= new explosionEffect(this.room);
					bumj.setup(this.x,this.y,this.room,this,2);
					explosions.push(bumj);
				}
				this.fallingY=0;
				
			}
		}

		this.incMove();

		if(this.room.isHole(this.x,this.y))
		{
			playSound("itemfall");
			if((this.room.z>0) && (curDungeon.rooms[this.room.z-1][this.room.x][this.room.y].active) && (this.room.tiles[this.x][this.y].data!=DungeonTileType.DeathHole))
			{
				this.room=curDungeon.rooms[this.room.z-1][this.room.x][this.room.y];
				this.fallingY=150;
			}else
			{
				this.exists=false;
			}
		}
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
			var nt=this.x-3;
			if(nt<0) {nt=0;}
			var mt=this.y-3;
			if(mt<0) {mt=0};
			var ft=this.x+3;
			if(ft>19) {ft=19;}
			var pt=this.y+3;
			if(pt>14) {pt=14;}
			for (var n=nt;n<ft;n++)
			{
				for (var m=mt;m<pt;m++)
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
		if(this.exists)
		{
			if(this.underWater)
			{
				if((miles.has[hasID.Lens]) || (editMode))
				{
					can.globalAlpha=0.5;
				}else
				{
					return;
				}
			}
			
			var millip= new Date().getTime();
			var dex=0;
			if(this.fallingY>0)
			{
				shadowSprite[0].draw(can, this.x*32+xoffh+this.xSmall, this.y*32+yoffh+this.ySmall);
			}
			if(this.isSuper)
			{
				dex=2;
			}
			if((millip-this.timePlaced>this.fuse*800) && (this.armed))
			{
				if(millip%2==0)
				{
					this.sprites[dex+1].draw(can,this.x*32+xoffh+this.xSmall,this.y*32+yoffh+this.ySmall-this.fallingY*2);
				}else
				{
					this.sprites[dex+0].draw(can,this.x*32+xoffh+this.xSmall,this.y*32+yoffh+this.ySmall-this.fallingY*2);
				}
			}else
			{
				this.sprites[dex+0].draw(can,this.x*32+xoffh+this.xSmall,this.y*32+yoffh+this.ySmall-this.fallingY*2);
			}
		}
	}
}

bomb.prototype.changeRoom=function(dz,dx,dy)
{
	for (var i=0;i<this.room.bombs.length;i++)
	{
		if(this.room.bombs[i].ID==this.ID)
		{
			this.room.bombs.splice(i,1);
			i--;
		}
	}
	this.room=curDungeon.rooms[dz][dx][dy];
	this.room.bombs.push(this);
}

bomb.prototype.tryMove=function(dir)
	{
		if(dir==0)
		{
			if(this.y<2)
			{
				return false;
			}
			if(true)//(this.room.walkable(this.x,this.y-1,false,this))
			{
				//this.lastX=this.x;
				//this.lastY=this.y;
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
			if(true)//(this.room.walkable(this.x,this.y+1,false,this))
			{
				//this.lastX=this.x;
				//this.lastY=this.y;
				this.y++;
			}else
			{
				return false;
			}
		}else if(dir==3)
		{
			if(this.x<3)
			{
				return false;
			}
			if(true)//(this.room.walkable(this.x-1,this.y,false,this))
			{
				//this.lastX=this.x;
				//this.lastY=this.y;
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
			if(true)//(this.room.walkable(this.x+1,this.y,false,this))
			{
				//this.lastX=this.x;
				//this.lastY=this.y;
				this.x++;
			}else
			{
				return false;
			}
		}
		return true; 
	}
bomb.prototype.canMove=function(dir)
	{
		if(dir==0)
		{
			if(this.y<2)
			{
				return false;
			}
			if(false)//(!this.room.walkable(this.x,this.y-1,false,this))
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
			if(false)//(!this.room.walkable(this.x,this.y+1,false,this))
			{
				return false;
			}else
			{
				return true;
			}
		}else if(dir==3)
		{
			if(this.x<3)
			{
				return false;
			}
			if(false)//(!this.room.walkable(this.x-1,this.y,false,this))
			{
				return false;
			}else
			{
				return true;
			}
		}else if(dir==1)
		{
			if(this.x>16)
			{
				return false;
			}
			if(false)//(!this.room.walkable(this.x+1,this.y,false,this))
			{
				return false;
			}else
			{
				return true;
			}
		}
		return true; 
	}
bomb.prototype.toss=function(dir,force)
{
	playSound("throw");
	this.fallingUp=24;
	if(force==null) {force=1000000.6;}
	if(dir==0)
	{
		this.ya=-force;
	}
	if(dir==1)
	{
		this.xa=+force;
	}
	if(dir==2)
	{
		this.ya=+force;
	}
	if(dir==3)
	{
		this.xa=-force;
	}
}

bomb.prototype.incMove=function()
{
	
	if((this.swimming) &&(!this.canSwim))
	{
		//thrash! 
		//...shark?
		return;
	}
	
	this.xSmall+=this.xv*2;
	this.ySmall+=this.yv*2;
	this.xv+=this.xa*2;
	this.yv+=this.ya*2;
	if(this.fallingY<1){
		if(this.xv>0)
		{
			this.xv-=this.friction/2;
			if(this.xv<0)
			{
				this.xv=0;
			}
		}else if(this.xv<0)
		{
			this.xv+=this.friction/2;
			if(this.xv>0)
			{
				this.xv=0;
			}
		}
	}else
	{
		if(this.xv>0)
		{
			this.xv-=this.friction/3;
			if(this.xv<0)
			{
				this.xv=0;
			}
		}else if(this.xv<0)
		{
			this.xv+=this.friction/2;
			if(this.xv>0)
			{
				this.xv=0;
			}
		}

	}
	if(this.yv>0)
	{
		this.yv-=this.friction/2;
		if(this.yv<0)
		{
			this.yv=0;
		}
	}else if(this.yv<0)
	{
		this.yv+=this.friction/2;
		if(this.yv>0)
		{
			this.yv=0;
		}
	}
	/*if(this.xa>0)
	{
		this.xa-=this.decel;
		if(this.xa<0)
		{
			this.xa=0;
		}
	}if(this.xa<0)
	{
		this.xa+=this.decel;
		if(this.xa>0)
		{
			this.xa=0;
		}
	}
	if(this.ya>0)
	{
		this.ya-=this.decel;
		if(this.ya<0)
		{
			this.ya=0;
		}
	}if(this.ya<0)
	{
		this.ya+=this.decel;
		if(this.ya>0)
		{
			this.ya=0;
		}
	}(*/
	if(this.xv>this.peakXV)
	{
		this.xv=this.peakXV;
		this.xa=0;
	}
	if(this.yv>this.peakYV)
	{
		this.yv=this.peakYV;
		this.ya=0;
	}
	if(this.xv<-this.peakXV)
	{
		this.xv=-this.peakXV;
		this.xa=0;
	}
	if(this.yv<-this.peakYV)
	{
		this.yv=-this.peakYV;
		this.ya=0;
		//this.yv=0;
	}
	var temp_break=SMALL_BREAK;
	if(!this.canMove(2))
	{
		temp_break=SMALL_BREAK/2;
	}
	if(this.ySmall>temp_break)
	{
		if(this.canMove(2))
		{
			this.ySmall=-SMALL_BREAK;
			this.tryMove(2);
			
			//return true;
		}else
		{
			this.ySmall=temp_break;//SMALL_BREAK;
			this.ya=0;
			this.yv=0;
			//return false;
		}
	temp_break=SMALL_BREAK;
	if(!this.canMove(0))
	{
		temp_break=SMALL_BREAK/2;
	}
	}else if(this.ySmall<-temp_break)
	{
		if(this.canMove(0))
		{
			this.ySmall=SMALL_BREAK;
			this.tryMove(0);
			//return true;
		}else
		{
			this.ySmall=temp_break;
			this.ya=0;
			this.yv=0;
			//return false;
		}
	}
	if(this.xSmall>SMALL_BREAK)
	{
		if(this.canMove(1))
		{
			this.xSmall=-SMALL_BREAK;
			this.tryMove(1);
			//return true;
		}else
		{
			this.xSmall=SMALL_BREAK;
			this.xa=0;
			this.xv=0;
			//return false;
		}
	}else if(this.xSmall<-SMALL_BREAK)
	{
		if(this.canMove(3))
		{
			this.xSmall=SMALL_BREAK;
			this.tryMove(3);
			//return true;
		}else
		{
			this.xSmall=SMALL_BREAK;
			this.xa=0;
			this.xv=0;
			//return false;
		}
	}
	if((this.fallingY<1) &&(this.room.tiles[this.x][this.y].data>19) && (this.room.tiles[this.x][this.y].data<25))
	{
		this.underWater=true;
	}
}
var actionID={};
actionID.Boomerang=0;
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
	this.ID=dude_count;
	dude_count++;
	this.mp=100;
	this.maxMp=100
	this.magicRegen=0;
	this.invincible=false;
	this.invisible=false;
	this.RumHam=false;
	this.frozen=0;
	this.shaking=false;
	this.shakingSince=0;
	this.shakingDur=150;
	this.shakingRight=true;
	this.shakeTrack=0;
	this.baseSpeed=4;
	this.speed=4;
	this.team=0;
	this.entity=true;
	this.pushing=false; 
	this.grabbed=null;
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
	this.ignoreHole=0;
	this.ignoreHoleX=0;
	this.ignoreHoleY=0;
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
	this.capon=false; 
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
	this.deadinswatersprite=Sprite("profdeath2");
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
	
	this.grab=function(obj)
	{
		playSound("grab");
		this.grabbed=obj;
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
	
	this.recharge=function(amt)
	{
		if(this.mp>this.maxMp-1) {return;}
		if(amt==0){ amt=this.maxMp;}
		//this.healAmount=amt;
		playSound("magrefill");
		this.mp+=amt;
		if(this.mp>this.maxMp)
		{
			this.mp=this.maxMp;
		}
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
		if(this.dir==0)
		{
			edsbomb.y=this.y-1;	
		}else if(this.dir==1)
		{
			edsbomb.x=this.x+1;	
		}else if(this.dir==2)
		{
			edsbomb.y=this.y+1;	
		}else if(this.dir==3)
		{
			edsbomb.x=this.x-1;	
		}
		edsbomb.exists=true;
		edsbomb.armed=true;
		edsbomb.timePlaced=new Date().getTime();
		playSound("bombdrop");
		this.activebombs.push(edsbomb);
		this.room.bombs.push(edsbomb);
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
	
	this.getItemAmt=function(id)
	{
		for(var i=0;i<this.inventory.length;i++)
		{
			if(this.inventory[i].type==id)
			{
				return this.inventoryAmounts[i];
			}
		}
		return 0;
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
			var temp_break=SMALL_BREAK;
			if(!this.canMove(2))
			{
				temp_break=SMALL_BREAK/2;
			}
			if(this.ySmall>temp_break)
			{
				if(this.canMove(dir))
				{
					this.ySmall=-SMALL_BREAK;
					this.tryMove(dir);
					return true;
				}else
				{
					this.ySmall=temp_break;
					return false;
				}
			}
			return true;
		}else if(dir==0)
		{
			this.ySmall-=this.speed;
			var temp_break=SMALL_BREAK;
			if(!this.canMove(0))
			{
				temp_break=SMALL_BREAK/2;
			}
			if(this.ySmall<-temp_break)
			{
				if(this.canMove(dir))
				{
					this.ySmall=SMALL_BREAK;
					this.tryMove(dir);
					return true;
				}else
				{
					this.ySmall=-temp_break;
					return false;
				}
			}
			return true;			
		}else if(dir==1)
		{
			this.xSmall+=this.speed;
			var temp_break=SMALL_BREAK;
			if(!this.canMove(1))
			{
				temp_break=SMALL_BREAK/2;
			}
			if(this.xSmall>temp_break)
			{
				if(this.canMove(dir))
				{
					this.xSmall=-SMALL_BREAK;
					this.tryMove(dir);
					return true;
				}else
				{
					this.xSmall=temp_break;
					return false;
				}
			}		
			return true;
		}else if(dir==3)
		{
			this.xSmall-=this.speed;
			var temp_break=SMALL_BREAK;
			if(!this.canMove(3))
			{
				temp_break=SMALL_BREAK/2;
			}
			if(this.xSmall<-temp_break)
			{
				if(this.canMove(dir))
				{
					this.xSmall=SMALL_BREAK;
					this.tryMove(dir)
					return true;
				}else
				{
					this.xSmall=-temp_break;
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
		if((this.dashing) || (!this.alive)){return false;}
		this.dashing=true;
		this.stepping=true;
		this.dashStart=new Date().getTime();
		
	}
	this.stopDashing=function()
	{
		this.dashing=false;
		this.reallyDashing=false;
		this.stepping=false;
		this.ignoreHole=0;
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
				glen.toss(miles.dir);
				glen.fallingUp=12;
				glen.friction=0.1;
				return true;
			}else if(Math.random()*10>4)
			{
				var bmoke=3;
				if(Math.random()*10>8)
				{
					var ben=makeObject(spotX,spotY,this.room,ObjectID.Shell);
					ben.toss(miles.dir);
					ben.fallingUp=12;
					ben.friction=0.1;
					return true;
				}
				if((this.hp<miles.maxHp) && (Math.random()*10<3))
				{
					var ben=makeObject(spotX,spotY,this.room,ObjectID.Heart);
					ben.toss(miles.dir);
					ben.fallingUp=12;
					ben.friction=0.1;
					return true;
				}
				if((this.has[hasID.Bow]) && (Math.random()*10<3))
				{
					var ben=makeObject(spotX,spotY,this.room,ObjectID.Arrow);
					ben.toss(miles.dir);
					ben.fallingUp=12;
					ben.friction=0.1;
					return true;
				}
				if((this.has[hasID.Bomb]) && (Math.random()*10<3))
				{
					var ben=makeObject(spotX,spotY,this.room,ObjectID.BombRefill);
					ben.toss(miles.dir);
					ben.fallingUp=12;
					ben.friction=0.1;
					return true;
				}
				var pojk=500+Math.floor(Math.random()*2);
				var ben=makeObject(spotX,spotY,this.room,pojk);
				ben.toss(miles.dir);
				ben.fallingUp=12;
				ben.friction=0.1;
				return true;
				
			}
			return true;
		}
		return false;
	}
	
	this.doContextual=function()
	{
		if(this.grabbed!=null)
		{
			this.grabbed.toss(this.dir,15);
			this.grabbed=null;
		}else
		{
			var mled=this.getFacingBomb();
			if((mled) && (mled.fallingY<1) && (!this.swimming))
			{
				this.grab(mled);
			}
			var gled=this.getFacingObject();
			if((gled) &&(this.has[hasID.Glove])&& (gled.fallingY<1) && (gled.grababble) && (!this.swimming))
			{
				this.grab(gled);
			}else if((gled) && (gled.playerUsable) && (!this.swimming))
			{
				//console.log(this.grabbed.ID,gled.ID);
				if((this.grabbed) && (this.grabbed.ID==gled.ID))
				{
				}else
				{
					if(gled.frontOnly)
					{
						if(gled.y<this.y)
						{
							gled.playerActivate();
						}
					}else
					{
						gled.playerActivate();
					}
				}
			}else 
			{
				var pled=this.getFacingEntity();
				if((pled) && (pled.team==this.team))
				{
					if(pled.alive) 
					{
						pled.say();
						if((!pled.partyMember) && (pled.autoJoin))
						{
							theParty.add(pled);
						}
						return;
					}else if(this.hasItem(ObjectID.PurplePotion))
					{
						pled.revive();
						this.removeItem(ObjectID.PurplePotion,1); 
					}
				}
			}
		}
	}
	
	this.getContext=function()
	{
		
		if(this.grabbed!=null)
		{
			return "Throw "+this.grabbed.name;
		}
		var mled=this.getFacingBomb();
		if((mled) && (mled.fallingY<1)&&(!this.swimming))
		{
			return "Grab bomb";
		}
		gled=this.getFacingObject();
		if((gled) && (gled.fallingY<1) &&(!this.swimming))
		{
			if((gled.type==ObjectID.Peg) && (this.has[hasID.Hammer]))
			{
				return "Hammer peg";
			}
			if((gled.type==ObjectID.Rock) && (this.has[hasID.Glove]))
			{
				return "Lift rock";
			}else if((gled.type==ObjectID.Pot) && (this.has[hasID.Glove]))
			{
				return "Lift pot";
			}else if((gled.type==ObjectID.Skull) && (this.has[hasID.Glove]))
			{
				return "Lift skull";
			}else if((gled.type==ObjectID.Lamp) || (gled.type==ObjectID.TallLamp) && (this.has[hasID.Lantern]))
			{
				if(gled.on)
				{
					return "Extinguish lamp";
				}else
				{
					return "Light lamp";
				}
			}else if((gled.type==ObjectID.Candle) && (this.has[hasID.Lantern]))
			{
				if(gled.on)
				{
					return "Extinguish candle";
				}else
				{
					return "Light candle";
				}
			}else if(gled.type==ObjectID.Curtains)
			{
				if(gled.on)
				{
					return "Open curtains";
				}else
				{
					//return "close curtains";
				}
			}else if((gled.type==ObjectID.Sign) && (gled.y<this.y))
			{
				return "Read sign";
			}else if((gled.type==ObjectID.Chest) && (gled.y<this.y) && (gled.curSprite==0))
			{
				return "Open chest";
			}
		}
		var pled=miles.getFacingEntity();
		if((pled) && (pled.team==this.team))
		{
			if(pled.alive)
			{
				return "Talk to "+pled.name;	
			}else if(this.hasItem(ObjectID.PurplePotion))
			{
				return "Revive "+pled.name;
			}
		}
		return null;
	}
	
	this.somariaize=function()
	{
		this.mp-=15;
		playSound("cane");
		//todo //check that this is a good place. poof thing?
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
		makeObject(gx,gy,this.room,ObjectID.Brick);
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

		}else if(this.getEquipped(secondary)==ObjectID.Cane)
		{
			if(this.mp>15)
			{
				this.somariaize();
			}else
			{
				playSound("error");
			}
			
		}else if(this.getEquipped(secondary)==ObjectID.Cape)
		{
			if(this.capon)
			{
				this.capon=false;
				playSound("capeoff")
				this.invisible=false;
				this.invincible=false;
			}else if(!this.capon)
			{
				if(this.mp>2)
				{
					this.capon=true;
					playSound("capeon")
					this.invisible=true;
					this.invincible=true;
				}else
				{
					playSound("error");
				}
			}

		}else if(this.getEquipped(secondary)==ObjectID.Shovel)
		{
			if(this.dig())
			{
			
			}else
			{
				bConsoleBox.log("You can't dig here.","yellow");
			}

		}else if(this.getEquipped(secondary)==ObjectID.Hookshot)
		{
	
			if(this.dir==0)
			{
				this.shootHook(90);
			}else if(this.dir==1)
			{
				this.shootHook(180);
			}else if(this.dir==2)
			{
				this.shootHook(270);
			}else if(this.dir==3)
			{
				this.shootHook(0);
			}
			
		}else if(this.getEquipped(secondary)==ObjectID.FireRod)
		{
			if(this.mp>5)
			{
				this.mp-=5;
				//this.removeItem(ObjectID.Bow,1);
				if(this.dir==0)
				{
					this.shootFire(90);
				}else if(this.dir==1)
				{
					this.shootFire(180);
				}else if(this.dir==2)
				{
					this.shootFire(270);
				}else if(this.dir==3)
				{
					this.shootFire(0);
				}
			}else
			{
				bConsoleBox.log("Not enough magic!","yellow");
				playSound("error");
			}

		}else if(this.getEquipped(secondary)==ObjectID.IceRod)
		{
			if(this.mp>5)
			{
				this.mp-=5;

				if(this.dir==0)
				{
					this.shootIce(90);
				}else if(this.dir==1)
				{
					this.shootIce(180);
				}else if(this.dir==2)
				{
					this.shootIce(270);
				}else if(this.dir==3)
				{
					this.shootIce(0);
				}
			}else
			{
				bConsoleBox.log("Not enough magic!","yellow");
				playSound("error");
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

		}else if(this.getEquipped(secondary)==ObjectID.Boomerang)
		{
			if(this.dir==0)
			{
				this.tossBoomerang(90);
			}else if(this.dir==1)
			{
				this.tossBoomerang(180);
			}else if(this.dir==2)
			{
				this.tossBoomerang(270);
			}else if(this.dir==3)
			{
				this.tossBoomerang(0);
			}
			
		}else if(this.getEquipped(secondary)==ObjectID.Boots)
		{
			if(this.dashing)
			{
				this.stopDashing();
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
				if(theParty.members[i].alive){
					theParty.members[i].room=curDungeon.curRoom();
					theParty.members[i].x=9;
					theParty.members[i].y=12;
					theParty.members[i].fallingY=0;
				}
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
			if(this.mp<this.maxMp)
			{
				this.recharge(this.maxMp);
				this.removeItem(ObjectID.GreenPotion,1); 
			}else
			{
				bConsoleBox.log("You are fully charged.","yellow");
			}
		}else if(this.getEquipped(secondary)==ObjectID.PurplePotion)
		{
			for(var i=0;i<entities.length;i++)
			{
				if((entities[i].room.z==curDungeon.roomZ) && (entities[i].room.x==curDungeon.roomX)&& (entities[i].room.y==curDungeon.roomY))
				{
					if((isOverTiled(entities[i],32)) && (!entities[i].isPlayer) && (!entities[i].alive))
					{
						entities[i].revive();
						this.removeItem(ObjectID.PurplePotion,1); 
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
		if((this.jumping) || (!this.alive)) {return false;}
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
		if(this.invincible) {return;}
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
	this.tossBoomerang=function(ang)
	{
		if((this.swimming) ||(this.holding))
		{
			return false;
		}
		if(!this.busyrang)
		{
			playSound("boomerang");
			this.acting=true;
			this.action=actionID.Boomerang;
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
			if(this.has[hasID.MagicBoomerang])
			{
				poot.speed=1;
				poot.peakTime=375;
			}
			poot.xv=-Math.cos((Math.PI / 180)*Math.floor(ang));
			poot.yv=-Math.sin((Math.PI / 180)*Math.floor(ang));
			if(this.has[hasID.MagicBoomerang])
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
			poot.y+=28;
		}
		if(ang==0)
		{
			poot.y+=28;
		}
		if(ang==180)
		{
			poot.x+=28;
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
	
	this.shootFire=function(ang)
	{
		playSound("firerod");
	
		/*this.acting=true;
		this.action=actionID.Bow;
		this.actfor=750;
		this.actStart=new Date().getTime();*/

		var poot=new projectile(this);
		poot.type=ProjTypes.Fireball;
		
		poot.exists=true; 
		poot.angle=ang;
		if(ang==270) //hack
		{
			poot.x+=32;
			poot.y+=28;
		}
		if(ang==0)
		{
			poot.y+=28;
		}
		if(ang==180)
		{
			poot.x+=28;
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
		poot.setup(poot.type);
		this.projectiles.push(poot);
		
	}
	
	this.shootIce=function(ang)
	{
		playSound("icerod");
	
		/*this.acting=true;
		this.action=actionID.Bow;
		this.actfor=750;
		this.actStart=new Date().getTime();*/

		var poot=new projectile(this);
		poot.type=ProjTypes.Iceball;
		
		poot.exists=true; 
		poot.angle=ang;
		if(ang==270) //hack
		{
			poot.x+=32;
			poot.y+=28;
		}
		if(ang==0)
		{
			poot.y+=28;
		}
		if(ang==180)
		{
			poot.x+=28;
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
		poot.setup(poot.type);
		this.projectiles.push(poot);
		
	}
	
	this.shootHook=function(ang)
	{
		//this.acting=true;
		//this.action=actionID.Hookshot;
		//this.actfor=750;
		//this.actStart=new Date().getTime();

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
		poot.setup(ProjTypes.Hookshot);
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
		/*for(var i=0;i<this.projectiles.length;i++)
		{
			if((this.projectiles[i].room.x==curDungeon.roomX) && (this.projectiles[i].room.y==curDungeon.roomY)&&(this.projectiles[i].room.z==curDungeon.roomZ))
			{
				this.projectiles[i].draw(can,xOffset,yOffset);
			}
		}*/
		
		if(this.invisible)
		{
			shadowSprite[2].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset);
			if(this.room.tiles[this.x][this.y].data==DungeonTileType.Grass)
			{
				can.globalAlpha=0.85;
				if(this.dir==0)
				{
					halfgrasssprite.draw(can,this.x*32+this.xSmall+xOffset-6,this.y*32+this.ySmall+yOffset+10-4-this.fallingY*2);
				}else if(this.dir==1)
				{
					halfgrasssprite.draw(can,this.x*32+this.xSmall+xOffset-6,this.y*32+this.ySmall+yOffset+10-this.fallingY*2);
				}else if(this.dir==2)
				{
					halfgrasssprite.draw(can,this.x*32+this.xSmall+xOffset+4-6,this.y*32+this.ySmall+yOffset+10-4-this.fallingY*2);
				}else if(this.dir==3)
				{
					halfgrasssprite.draw(can,this.x*32+this.xSmall+xOffset-4-6,this.y*32+this.ySmall+yOffset+10-this.fallingY*2);
				}
				can.globalAlpha=1;
			}
			return; 
		}

		if(!this.alive)
		{
			if(!this.swimming)
			{
				this.deadSprites[this.deathAniTrack].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2)
			}else
			{
				this.deadinwatersprite.draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2)
			}
			
			
			return;
		}
		if((this.isPlayer) && (this.holding))
		{
			
			this.sprites[4].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
			this.holding.draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-16-this.fallingY*2);
		}else if((this.isPlayer) && (this.swinging) && (this.gotHurt%2==0))
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
				shX=-6;
				shY=2;
			}else if(this.dir==3)
			{
				shX=8;
				shY=8;
			}
			if((this.dir==0)&&(this.has[hasID.Shield]) && (!this.grabbed))
			{
				this.shieldSprites[1].draw(can,this.x*32+this.xSmall+xOffset+shX+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+shY);
			}else if((this.dir==1) &&(this.has[hasID.Shield]))
			{
				this.shieldSprites[0].draw(can,this.x*32+this.xSmall+xOffset+shX+this.shakeTrack,this.y*32+this.ySmall+3+yOffset-14-this.fallingY*2+shY);
			}
			this.swingSprites[this.dir][this.swingtrack].draw(can,this.x*32+this.xSmall+xOffset+knuckx+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+knucky);
			if((this.dir!=0) &&(this.has[hasID.Shield]))
			{
				if(this.dir==2)
				{
					this.shieldSprites[3].draw(can,this.x*32+this.xSmall+xOffset+shX+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+shY);
				}else if(this.dir==3)
				{
					this.shieldSprites[2].draw(can,this.x*32+this.xSmall+xOffset+shX+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2+shY);
				}

			}
		}else if((this.isPlayer) && (this.poking)&& (this.gotHurt%2==0))
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
					if(this.has[hasID.Shield])
					{
						if((!this.pushing) && (!this.grabbed) && (this.dir==0))
						{
							this.shieldSprites[0].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
						}else if ((this.pushing) || (this.grabbed) && (this.dir==2))
						{
							this.shieldSprites[0].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack-4,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
						}
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
						if((this.grabbed) || (this.pushing))
						{
							if(this.dir==3)
							{
								this.shieldSprites[1].draw(can,this.x*32+this.xSmall+xOffset-5+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
							}else if(this.dir==1)
							{
								this.shieldSprites[3].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack+4,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
							}
						}else
						{
							if(this.dir==3)
							{
								this.shieldSprites[3].draw(can,this.x*32+this.xSmall+xOffset-5+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
							}else if(this.dir==1)
							{
								this.shieldSprites[1].draw(can,this.x*32+this.xSmall+xOffset-5+4+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
							}else
							{
								this.shieldSprites[2].draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset-14-this.fallingY*2);
							}							
						}
	
					}else if ((this.has[hasID.Shield]) && (this.dir==0))
					{
						if((this.grabbed) || (this.pushing))
						{
							var shx=8;
							if(this.has[hasID.BestShield])
							{
								shx=4;
							}else if(this.has[hasID.BetterShield])
							{
								shx=4;
							}
							this.shieldSprites[2].draw(can,this.x*32+this.xSmall+xOffset+shx+this.shakeTrack,this.y*32+this.ySmall+yOffset-22-this.fallingY*2);
						}
					}
				}
				
			}
			if((this.fallingY>0))// && (this.room.isHole(this.x,this.y)))
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
		
		/*for(var i=0;i<this.activebombs.length;i++)
		{
			if((this.activebombs[i].exists) && ((this.activebombs[i].room.z==curDungeon.roomZ) &&(this.activebombs[i].room.x==curDungeon.roomX) &&(this.activebombs[i].room.y==curDungeon.roomY)))
			{
				this.activebombs[i].draw(can,xOffset,yOffset);
			}
		}*/
		if(this.grabbed)
		{
			this.grabbed.draw(can,camera,xOffset,yOffset,"no shadow");
		}
		if(this.room.tiles[this.x][this.y].data==DungeonTileType.Grass)
		{
			can.globalAlpha=0.85;
			if(this.dir==0)
			{
				halfgrasssprite.draw(can,this.x*32+this.xSmall+xOffset-6,this.y*32+this.ySmall+yOffset+10-4-this.fallingY*2);
			}else if(this.dir==1)
			{
				halfgrasssprite.draw(can,this.x*32+this.xSmall+xOffset-6,this.y*32+this.ySmall+yOffset+10-this.fallingY*2);
			}else if(this.dir==2)
			{
				halfgrasssprite.draw(can,this.x*32+this.xSmall+xOffset+4-6,this.y*32+this.ySmall+yOffset+10-4-this.fallingY*2);
			}else if(this.dir==3)
			{
				halfgrasssprite.draw(can,this.x*32+this.xSmall+xOffset-4-6,this.y*32+this.ySmall+yOffset+10-this.fallingY*2);
			}
			can.globalAlpha=1;
		}
		if(this.frozen)
		{
			can.globalAlpha=0.8;
			frozenSprite.draw(can,this.x*32+this.xSmall+xOffset+this.shakeTrack,this.y*32+this.ySmall+yOffset);
		}
		can.globalAlpha=1;
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
	
	this.getFacingObject=function(special)
	{
		var gx=this.x;
		var gy=this.y;
		
		if(special=="1up"){ gy--;}
		if(special=="1left"){ gx--;}
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
			if((this.room.objects[i].x==gx) && (this.room.objects[i].y==gy)&& (this.room.objects[i].type!=ObjectID.PotStand)&&(this.room.objects[i].type!=ObjectID.ToggleSwitch) && (this.room.objects[i].type!=ObjectID.HoldSwitch))
			{
				if(this.grabbed==null) 
				{
					return this.room.objects[i];
				}else if((this.grabbed) && (this.grabbed.ID!=this.room.objects[i].ID))
				{
					console.log(this.grabbed.ID,this.room.objects[i].ID);
					return this.room.objects[i];
				}
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
	
	this.closeEnoughTo=function(obj)
	{
		if((obj.x==this.x) && (obj.y==this.y))
		{
			return true;
		}
		
		if((obj.x==this.x+1) &&(obj.y==this.y) && (this.xSmall>8))
		{
			return true;
		}else if((obj.x==this.x-1) &&(obj.y==this.y) && (this.xSmall<-8))
		{
			return true;
		}else if((obj.x==this.x) &&(obj.y==this.y+1) && (this.ySmall>8))
		{
			return true;
		}else if((obj.x==this.x) &&(obj.y==this.y-1) && (this.ySmall<-8))
		{
			return true;
		}
		
		return false;
		
	}
	
	this.getFacingBomb=function()
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
		for(var i=0;i<this.room.bombs.length;i++)
		{
			if((this.room.bombs[i].x==this.x) && (this.room.bombs[i].y==this.y))
			{
				return this.room.bombs[i];
			}else if((this.room.bombs[i].x==gx) && (this.room.bombs[i].y==gy))
			{
				return this.room.bombs[i];
			}
			
		}
		
		return null;
	}
	
	this.freeze=function(dur)
	{
		this.frozen=dur;
		if(!dur)
		{
			this.frozen=5000;
		}
		this.frozenAt=new Date().getTime();
		playSound("freeze");
	}
	
	
	this.unfreeze=function()
	{
		this.frozen=0;
		playSound("unfreeze");
	}
	
	this.update=function()
	{
		if(this.capon)
		{
			this.mp-=0.5;
			if(this.mp<0)
			{
				this.capon=false;
				this.invincible=false;
				this.invisible=false;
				playSound("capeoff");
			}
		}
		this.mp+=this.magicRegen;
		if(this.mp>this.maxMp)
		{
			this.mp=this.maxMp;
		}
		//thaw
		if(this.frozen)
		{
			var plopl=new Date().getTime();
			if(plopl-this.frozenAt>this.frozen)
			{
				this.unfreeze();
			}
		}
		if (this.RumHam)
		{
			var juk=this.maxArrows-this.arrows;
			var juy=this.maxBombs-this.bombs;
			//this.giveItem(ObjectID.Bow,juy)
			//this.giveItem(ObjectID.Bombs,juk)
			this.bombs=this.maxBombs;
			this.arrows=this.maxArrows;
		}
		if(this.grabbed)
		{
			this.grabbed.x=this.x;
			this.grabbed.y=this.y;
			this.grabbed.xSmall=this.xSmall;
			this.grabbed.ySmall=this.ySmall;
			this.grabbed.fallingY=this.fallingY+20;
			if((!this.grabbed.exists) || (!this.alive) || (this.swimming) || (this.poking) || (this.swinging))
			{
				this.grabbed=null;
			}
		}
		for(var i=0;i<this.projectiles.length;i++)
		{
			this.projectiles[i].update();
			if((this.projectiles[i].type==ProjTypes.Boomerang) || (this.projectiles[i].type==ProjTypes.MagicBoomerang))
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
			this.stopDashing();
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
					this.walkAnimate();
					this.stepping=true;
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
					this.stopDashing();
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
			if(!this.alive)
			{
				this.jumping=false;
				return; 
			}
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
							curDungeon.changeFloor(true,true,this);
							break;
						}else
						{
							this.lastX=this.x;
							this.lastY=this.y;
							curDungeon.changeFloor(false,true,this);
							break;
						}
					}
				}
			}
			for(var i=0;i<this.room.exits.length;i++)
			{
				if(this.room.exits[i].orientation==0)
				{
					if((this.y==2) && (this.ySmall<-7)&& ((this.x==this.room.exits[i].x) || (this.x==this.room.exits[i].x+1)))
					{
						if((controller.pad) && (controller.checkUp()))
						{
							curDungeon.changeRoom(0,true);
						}else if (SNESUpKey.checkDown())
						{
							curDungeon.changeRoom(0,true);
						}else if ((this.reallyDashing) && (this.dir==0))
						{
							curDungeon.changeRoom(0,true);
						}
					}
				}else if(this.room.exits[i].orientation==2)
				{
					if((this.y==12) && (this.ySmall>7)&& ((this.x==this.room.exits[i].x) || (this.x==this.room.exits[i].x+1)))
					{
						if((controller.pad) &&(controller.checkDown()))
						{
							curDungeon.changeRoom(2,true);
						}else if (SNESDownKey.checkDown())
						{
							curDungeon.changeRoom(2,true);
						}else if ((this.reallyDashing) && (this.dir==2))
						{
							curDungeon.changeRoom(2,true);
						}
					}
				}else if(this.room.exits[i].orientation==3)
				{
					if((this.x==2)&& (this.xSmall<-7) && ((this.y==this.room.exits[i].y) || (this.y==this.room.exits[i].y+1)))
					{
						if((controller.pad) &&(controller.checkLeft()))
						{
							curDungeon.changeRoom(3,true);
						}else if (SNESLeftKey.checkDown())
						{
							curDungeon.changeRoom(3,true);
						}else if ((this.reallyDashing) && (this.dir==3))
						{
							curDungeon.changeRoom(3,true);
						}
					}
				}else if(this.room.exits[i].orientation==1)
				{
					if((this.x==17) && (this.xSmall>7) && ((this.y==this.room.exits[i].y) || (this.y==this.room.exits[i].y+1)))
					{
						if((controller.pad) &&(controller.checkRight()))
						{
							curDungeon.changeRoom(1,true);
						}else if (SNESRightKey.checkDown())
						{
							curDungeon.changeRoom(1,true);
						}else if ((this.reallyDashing) && (this.dir==1))
						{
							curDungeon.changeRoom(1,true);
						}
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
							this.room.objects[i].playerActivate();
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
						if((this.room.objects[i].swordActivate()) && (this.room.objects[i].pokable))
						{
							this.room.objects[i].playerActivate();
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
			this.fallingY-=4;
			if(this.fallingY<1)
			{
				if(this.room.tiles[this.x][this.y].data==DungeonTileType.ReallyUnstable)
				{
					playSound("landing");
					playSound("cavein");
					if((this.room.z<1) || (!curDungeon.rooms[curDungeon.roomZ-1][curDungeon.roomX][curDungeon.roomY].active))
					{
						this.room.tiles[this.x][this.y].data=DungeonTileType.DeathHole;
					}else
					{
						this.room.tiles[this.x][this.y].data=DungeonTileType.Hole;
					}
					
				}
				this.falling=false;
				this.fallingY=0;
				if(this.room.tiles[this.x][this.y].data!=DungeonTileType.Hole)
				{
					//playSound("landing");
					this.lastX=this.x;
					this.lastY=this.y;
				}
				if((this.room.tiles[this.x][this.y].data>19) && (this.room.tiles[this.x][this.y].data<24))
				{
					playSound("splash");
					var bumj= new explosionEffect(this.room);
					bumj.setup(this.x,this.y,this.room,2);
					explosions.push(bumj);
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
				}
				if((this.room.objects[i].hurty) && (this.closeEnoughTo(this.room.objects[i])))
				{
					this.hurt(10);
				}else if(this.room.objects[i].type==ObjectID.SpikeyThing)
				{
					if((this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y))
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
							//this.room.objects[i].playerActivate(); // PROBLEM ONE
						}
					}
				}else if((this.room.objects[i].pickupable) &&(this.closeEnoughTo(this.room.objects[i])))//(this.room.objects[i].x==this.x) && (this.room.objects[i].y==this.y))
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
					if((this.room.z<1) || (!curDungeon.rooms[this.room.z-1][this.room.x][this.room.y].active))
					{
						this.room.tiles[this.x][this.y].data=DungeonTileType.DeathHole;
					}else
					{
						this.room.tiles[this.x][this.y].data=DungeonTileType.Hole;
					}
					playSound("cavein");
					//this.lastX=this.x;
					//this.lastY=this.y;
					if((this.reallyDashing)) //&& (this.ignoreHole==0))
					{
						this.ignoreHole=1;
						this.ignoreHoleX=this.x;
						this.ignoreHoleY=this.y;
					}
				}
			}else if((this.room.isHole(this.x,this.y)) &&(!this.falling) &&(!this.jumping))
			{
				var dontFall=false;
				if((this.reallyDashing) && (this.ignoreHole>0))
				{
					if((this.x==this.ignoreHoleX) && (this.y==this.ignoreHoleY))
					{
						//skip the next part
						dontFall=true;
					}else
					{
						this.ignoreHole--;
					}
				}
				if(!dontFall)
				{
					if(this.room.tiles[this.x][this.y].data==DungeonTileType.DeathHole)
					{
						//this.fallingY=0;
						this.hurt(20);
						//this.falling=false;
						this.x=this.enteredX;
						this.y=this.enteredY;
						this.xSmall=0;
						this.ySmall=0;
						this.stopDashing();
						this.lastX=this.x;
						this.lastY=this.y;
						return;
						//damage and find nearest standable point. 
					}
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
					this.stopDashing();
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
							this.lastX=this.x;
							this.lastY=this.y;
							//damage and find nearest standable point. 
						}else if(!curDungeon.rooms[this.room.z-1][this.room.x][this.room.y].active)
						{
							this.fallingY=0;
							bConsoleBox.log("no room below");
							//console.log(this.enteredX,this.enteredY);
							this.hurt(20);
							this.x=this.enteredX;
							this.y=this.enteredY;
							this.lastX=this.x;
							this.lastY=this.y;
						}else 
						{
							if(this.isPlayer)
							{
									curDungeon.roomZ--;
									this.room=curDungeon.curRoom();
									if(this.grabbed)
									{
										this.grabbed.changeRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY);
									}
									this.room.explored=true;
									this.room.hidden=false;
							}else
							{
								this.room=curDungeon.rooms[this.room.z-1][this.room.x][this.room.y];
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
				}
			}else if((this.room.tiles[this.x][this.y].data>19) && (this.room.tiles[this.x][this.y].data<25))
			{
				if(!this.jumping)
				{
					this.swimming=true;
				
				}
			}
		}
		this.pushing=false;
		if((this.isPlayer) && (!this.grabbed) && (!this.swimming) && (!this.dashing)&& (!this.poking)&& (!this.swinging))
		{
			//up pushing
			var mufasa=this.getFacingObject();
			if(!mufasa)
			{
				if((this.dir==1) || (this.dir==3))
				{
					//var mufasa=this.getFacingObject("1up");
				}
			}
			if(!mufasa)
			{
				if((this.dir==0) || (this.dir==0))
				{
					//var mufasa=this.getFacingObject("1left");
				}
			}
			if(mufasa!=null)
			{
			if((mufasa) &&((controller.pad) && (controller.checkUp())) || (SNESUpKey.checkDown()))
			{
				
				if((this.ySmall<-7) && (mufasa.pushable) && (mufasa.y=this.y-1)) 
				{	
					this.pushing=true;
					mufasa.slide(0);
				}
			}else if((mufasa) &&((controller.pad) && (controller.checkRight())) || (SNESRightKey.checkDown()))
			{
				
				if((this.xSmall>7) && (mufasa.pushable) && (mufasa.x=this.x+1)) 
				{	
					this.pushing=true;
					mufasa.slide(1);
				}
			}else if((mufasa) &&((controller.pad) && (controller.checkDown())) || (SNESDownKey.checkDown()))
			{
				
				if((this.ySmall>7) && (mufasa.pushable) && (mufasa.y=this.y+1)) 
				{	
					this.pushing=true;
					mufasa.slide(2);
				}
			}else if((mufasa) &&((controller.pad) && (controller.checkLeft())) || (SNESLeftKey.checkDown()))
			{
				
				if((this.xSmall<-7) && (mufasa.pushable) && (mufasa.x=this.x-1)) 
				{	
					this.pushing=true;
					mufasa.slide(3);
				}
			}
			
			}			
		}
		
		if((this.AI==1) && (!this.going)&& (this.alive)&& (!this.frozen))
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
						this.enteredX=this.x;
						this.enteredY=this.y;
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
									this.enteredX=this.x;
									this.enteredY=this.y;
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
						this.enteredX=this.x;
						this.enteredY=this.y;
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
									this.enteredX=this.x;
									this.enteredY=this.y;
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
									this.enteredX=this.x;
									this.enteredY=this.y;
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
									this.enteredX=this.x;
									this.enteredY=this.y;
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
									this.enteredX=this.x;
									this.enteredY=this.y;
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