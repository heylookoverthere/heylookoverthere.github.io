var ProjTypes={}
ProjTypes.Arrow=0;
ProjTypes.Boomarang=1;
ProjTypes.MagicBoomarang=2;
ProjTypes.SwordBeam=3;
ProjTypes.Hookshot=4;

var xOffset = 150;
var yOffset= 150;

var arrowsprite=Sprite("arrow");
var silverarrowsprite=Sprite("silverarrow");

var swordbeamsprite1=Sprite("swordbeam1");
var swordbeamsprite2=Sprite("swordbeam2");
var swordbeamsprite3=Sprite("swordbeam3");

var hooksprite=Sprite("hook");

var boomarangsprite1=Sprite("boomarang");
var boomarangsprite2=Sprite("boomarang1");
var magicboomarangsprite1=Sprite("magicboomarang");
var magicboomarangsprite2=Sprite("magicboomarang1");
function projectile(aPlayer)
{
	this.x=aPlayer.x*32+aPlayer.xSmall-16;
	this.y=aPlayer.y*32+aPlayer.ySmall-16;
	this.player=aPlayer;
	this.room=aPlayer.room;
	this.team=aPlayer.team;
	this.xv=0;
	this.yv=0; 
	this.type=0;
	this.angle=0;
	this.width=32;
	this.height=32;
	this.counter=0;
	this.bombArrow=false;
	this.exists=false;
	this.smart=true; // tracks player on return
	this.damage=20; 
	this.stun=false;
	this.startTime=0;
	this.curSprite=0;
	this.aniTrack=0;
	this.aniRate=6;
	this.peakTime=750;
	this.hitWall=false; 
	this.boomarang=false; // will it return
	this.returning=false;
	this.speed=1;
	this.sprites=new Array();
	
}

projectile.prototype.setup=function(type)
{
	this.type=type;
	this.startTime=new Date().getTime();
	if(this.type==ProjTypes.Arrow)
	{
		if(this.player.has[hasID.SilverArrows])
		{
			this.sprites.push(silverarrowsprite);
			this.damage=20
		}else
		{
			this.sprites.push(arrowsprite);
			this.damage=10;
		}
	}else if(this.type==ProjTypes.Boomarang)
	{
		this.sprites.push(boomarangsprite1);
		this.sprites.push(boomarangsprite2);
		this.damage=5;
	}else if(this.type==ProjTypes.MagicBoomarang)
	{
		this.sprites.push(magicboomarangsprite1);
		this.sprites.push(magicboomarangsprite2);
		this.damage=10;
	}else if(this.type==ProjTypes.SwordBeam)
	{
		this.sprites.push(swordbeamsprite1);
		this.sprites.push(swordbeamsprite2);
		this.sprites.push(swordbeamsprite3);
		this.damage=10;
		this.speed=1;
	}else if(this.type==ProjTypes.Hookshot)
	{
		this.sprites.push(hooksprite);
		this.damage=0;
	}

}

projectile.prototype.draw=function(can)
{
	
	if((this.type==0) || (this.type==ProjTypes.SwordBeam) || (this.type==ProjTypes.Hookshot))
	{
		can.save();
		can.translate(this.x+16+xOffset,this.y+16+yOffset);
		can.rotate((this.angle-90)* (Math.PI / 180));
		if(this.bombArrow)
		{
			bombsprite.draw(can, 0,0);
		}
		this.sprites[this.curSprite].draw(can, 0,0);//this.x+xOffset, this.y+yOffset);
	
		//can.scale(1,1);
		can.restore();
	}else if((this.type==1) || (this.type==2))
	{
		can.save();
		can.translate(this.x+xOffset,this.y+yOffset);
		can.rotate((this.counter)* (Math.PI / 180));
		this.sprites[0].draw(can, 0,0);//this.x+xOffset, this.y+yOffset);
		//can.scale(1,1);
		can.restore();
	}
	if(this.type==ProjTypes.Hookshot)
	{
		//draw chain.
	}
}

projectile.prototype.hit=function(obj)
{
	if(this.room.z!=obj.room.z)
	{
		return false;
	}
	if(this.room.x!=obj.room.x)
	{
		return false;
	}
	if(this.room.y!=obj.room.y)
	{
		return false;
	}
	if((this.x < obj.getScreenX()+obj.width) && (this.x+this.width>obj.getScreenX()) && (this.y<obj.getScreenY()+obj.height) && (this.y+this.height>obj.getScreenY()))
	{
		return true;
	}
	return false;
}

projectile.prototype.kill=function()
{
	this.exists=false;
	if(this.bombArrow)
	{
		var bep=new bomb(this.room,false);
		bep.x=Math.round(this.x/32);
		bep.y=Math.round(this.y/32);
		bep.fuse=0;
		bep.exists=true;
		bep.armed=true;
		bep.timePlaced=new Date().getTime();
		this.player.activebombs.push(bep);
	}
	if((this.type==1) || (this.type==2))
	{
		this.player.busyrang=false;
	}
}

projectile.prototype.update=function() //remember, this one's X,Y shoudl not be tile based!!! 
{
	var hoat=new Date().getTime();
	if(((this.type==1) || (this.type==2)) && (hoat-this.startTime>this.peakTime))
	{
		if(this.returning==false)
		{
			this.returning=true;
			this.startTime=hoat;
			if(this.smart)
			{
				var beta=Math.atan2(this.player.getScreenY()-this.y,this.player.getScreenX()-this.x)* (180 / Math.PI);
				if (beta < 0.0)
					beta += 360.0;
				else if (beta > 360.0)
					beta -= 360;
					this.angle=beta;
					this.xv=Math.cos((Math.PI / 180)*Math.floor(this.angle));
					this.yv=Math.sin((Math.PI / 180)*Math.floor(this.angle));
			}
		}else if(!this.smart)
		{
			this.kill();
		}
		
		
	}
	//update position based on...? see space game!
	if(this.returning)
	{
		//again, use angles and shit to move back to tosser.
       //but bear in mind tilex vs screenx.
	   if(this.smart)
	   {

		var beta=Math.atan2(this.player.getScreenY()-this.y,this.player.getScreenX()-this.x)* (180 / Math.PI);
		if (beta < 0.0)
			beta += 360.0;
		else if (beta > 360.0)
			beta -= 360;
			this.angle=beta;
			this.xv=Math.cos((Math.PI / 180)*Math.floor(this.angle));
			this.yv=Math.sin((Math.PI / 180)*Math.floor(this.angle));

		this.x+=this.xv*this.speed*gameSpeed;
		this.y+=this.yv*this.speed*gameSpeed;
		if(this.hit(this.player))
		{
			this.exists=false;
			this.player.busyrang=false;
			return;
		}
			
	   }else
	   {
	   	this.x-=this.xv*this.speed*gameSpeed;
		this.y-=this.yv*this.speed*gameSpeed;
	   }
	}else
	{
		//away from tosser along angle. 
		this.x+=this.xv*this.speed*gameSpeed;
		this.y+=this.yv*this.speed*gameSpeed;
	}
	
	this.counter+=10;
	if(this.counter>359)
	{
		this.counter=0;
	}
	
	this.aniTrack++;
	if (this.aniTrack>this.aniRate)
	{
		this.aniTrack=0;
		this.curSprite++;
		if((this.type==ProjTypes.Boomarang) || (this.type==ProjTypes.MagicBoomarang))
		{
			playSound("boomerang");
		}
		if(this.curSprite>this.sprites.length-1)
		{
			this.curSprite=0;
		}
	}
	
	for(var i=0;i<entities.length;i++)
	{
		if(this.hit(entities[i]))
		{
			if(this.type==0)
			{
				playSound("arrowhit");
				this.exists=false; //todo, link it to target so it moves with him stuck in him for  abit?
			}
			if((this.team!=entities[i].team) || (OPTIONS.FriendlyFire))
			{
				if((this.player.isPlayer) && (entities[i].isPlayer))
				{
					this.exists=true;
				}else if((this.player.partyMember) && (entities[i].partyMember))
				{
					this.exists=true;
				}else
				{
					entities[i].hurt(this.damage);
					//this.kill();
				}
			}
			//if(!this.exists) {this.kill();}
		}
	}
	
	for(var i=0;i<this.room.objects.length;i++)
	{
		if(this.hit(this.room.objects[i])) 
		{ 
			if(this.type==0)
			{
				if(this.room.objects[i].arrowsActivate)
				{
					this.room.objects[i].activate();
				}
				if(this.room.objects[i].blockArrows)
				{
					playSound("arrowhit");
					this.kill(); //todo, link it to target so it moves with him stuck in him for  abit?
				}
			}else if((this.type==1) || (this.type==2))
			{
				if(this.room.objects[i].boomarangActivate)
				{
					this.room.objects[i].activate(true);
				}
				if(this.room.objects[i].blockArrows)
				{
					//playSound("arrowhit");
					this.kill(); //todo, link it to target so it moves with him stuck in him for  abit?
				}
			}
		}
	}
	
	if((this.x/32<1) || (this.x/32>18) || (this.y/32<1)|| (this.y/32>13))
	{
		playSound("arrowhit");
		this.kill(); //todo, link it to target so it moves with him stuck in him for  abit?
	}
	
	//check collision with all objects. some may block, some may activate
}
