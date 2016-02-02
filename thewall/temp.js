//stuff for ravens

var differenceHeading = Math.abs(this.desiredHeading - this.heading);
//if we need to turn clockwise
if(differenceHeading>15)
{
	if(isTurnCCW(this.heading, this.desiredHeading))
	{
		//Turn right
		this.heading-=this.turnSpeed*gameSpeed;
			this.turning=true;
	}else
	{
		this.heading+=this.turnSpeed*gameSpeed;
			this.turning=true;
	}
}else{
	this.turning=false;//totodo
}

this.xv=Math.cos((Math.PI / 180)*Math.floor(this.heading));
this.yv=Math.sin((Math.PI / 180)*Math.floor(this.heading));
this.x+=this.xv*gameSpeed*this.speed;
this.y+=this.yv*gameSpeed*this.speed;
				
				
			var beta=Math.atan2(this.escorting.y-this.y,this.escorting.x-this.x)* (180 / Math.PI);
			
			if (beta < 0.0)
				beta += 360.0;
			else if (beta > 360.0)
				beta -= 360;
			this.desiredHeading=beta;