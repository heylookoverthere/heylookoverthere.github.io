function unit() {
    this.hp=40;
    this.gender=Math.floor(Math.random()*2);
    this.name="Miles";
    this.mp=0;
    this.maxhp=40;
    this.maxmp=40;
	this.flightHeight=-1;
	this.swimCarry=-1;
	this.statusTrack=0;
	this.whichBuff=0;
	this.whichDebuff=0;
	this.undead=false;
    this.nextLevel=60;
    this.speed=1;
    this.evade=1;
	this.team=0;
    this.luck=5;
    this.ali=50;
	this.element=Math.floor(Math.random()*3);
    this.attackType=new Array(2);
    this.attackType[0]=AttackTypes.Physical;
    this.attackType[1]=AttackTypes.Physical;
    this.status=new Array(7);
    this.status[0]=false;
    this.status[1]=false;
    this.status[2]=false;
    this.status[3]=false;
    this.status[4]=false;
    this.status[5]=false;
    this.status[6]=false;

    this.class=getClass(false);
    this.row=Math.floor(Math.random()*2);
    this.viewRange=5;
    this.level=1;
    this.def=1;
    this.mdef=1;
    this.attack=10;
    this.mag=5;
    this.alive=true;
    this.attacking=0;
	this.attackStage=0;
	this.attackAni=0;
	this.attackAniStage=0;
    this.hurting=0;
    this.atb=0;
    this.canlead = true;
    this.cost = 10;
    this.gambits = null;
    this.exp=0;
    this.level=1;
    this.equipment=new Array(3);
    this.equipment[0]=unarmed;
    this.equipment[1]=noarmor;
    this.equipment[2]=noaccessory;
    this.kills=0;
    this.damagetaken=0;
    this.damagedelt=0;
    this.battlesfought=0;
    this.battleswon=0;
    this.battleslost=0;
	this.religon=Math.floor(Math.random()*4);
	this.faith=Math.floor(Math.random()*60)+20;
    var nami=Math.floor(Math.random()*120);
    while(true) {
        if(namesused[this.gender][nami]) 
        {
            nami=Math.floor(Math.random()*120);
        }else {break;}
    }
    this.name=names[this.gender][nami];
    namesused[this.gender][nami]=true;
    
	this.stringifyUnit=function(){
		var smurf={'name':this.name,'class':this.class,'gender':this.gender,'def':this.def,'mdef':this.mdef,'ali':this.ali,'speed':this.speed,'evade':this.evade,'team':this.team,
		'alive':this.alive,'attack':this.attack,'mag':this.mag,'luck':this.luck,'level':this.level,'nextlevel':this.nextLevel,'exp': this.exp,'cost':this.cost,'canlead':this.canlead,
		'viewrange':this.viewRange,'kills':this.kills,'damagetaken':this.damagetaken,'damagedelt':this.damagedelt,'battlefought':this.battlesfought,'battleswon':this.battleswon,
		'battlelost':this.battlelost,'religion':this.religion,'faith':this.faith,'flightHeight':this.flightheight,'swimcarry':this.swimCarry,'maxhp':this.maxhp,'maxmp':this.maxmp,
		'undead':this.undead}
		var tempstring = JSON.stringify(smurf);
		//deal with equipment, attack type, status
		return tempstring;
	}
	

	
    this.getAttack= function(){
        //if status==beserek attack harder
		var nightBoost=0;
		if(theTime.hours>12){
			if(this.class==SEEAss.Werewolf){
				nightBoost=20;
				//this.attack+=20;
			}else if (this.class==SEEAss.Vampire)
			{
				nightBoost=10;
				//this.attack+=10;
				//this.evade+=10;
			}
		}
        if(this.getAttackType() == AttackTypes.Physical ) {
            return (this.attack+nightBoost-this.row)+this.equipAttack()+(this.level*1.5)+Math.floor(Math.random()*3);
        }else if( this.getAttackType() == AttackTypes.Ranged ) { //no row penalty
            return (this.attack+nightBoost)+this.equipAttack()+(this.level*1.5)+Math.floor(Math.random()*3);
        }else if( this.getAttackType() == AttackTypes.Magical ) {  //no row penalty
            return (this.mag)+this.equipMag()+(this.level*1.5)+Math.floor(Math.random()*3);
        }else if( this.getAttackType() == AttackTypes.Heal ) {
            return 0-this.mag;//todo problem?
        }
        //if(this.getAttackType() == AttackTypes.Physical ) {
        console.log(this.name+" "+this.class+" "+this.row);
        return (this.attack-this.row)+this.equipAttack()+(this.level*0.5)+Math.floor(Math.random()*3);
    };
    
    this.giveExp= function(val){
        this.exp+=val;
        if (this.exp>this.nextLevel) {
            this.exp=0;
            this.levelUp();
        }
    };
    
    this.esuna=function(){
        for(var i=0;i<NUM_STATUS;i++){
            this.status[i]=false;
        }
    };
	
	this.getClassName=function(){
		var texticles="";
		if(this.class===SEEAss.Bear) {texticles= "Bear"; }
        if(this.class===SEEAss.Shoe) {texticles= "Shoe"; }
        if(this.class===SEEAss.Wizard) {texticles= "Wizard"; }
        if(this.class===SEEAss.Frog) {texticles= "Frog"; }
        if(this.class===SEEAss.Archer) {texticles= "Archer"; }
		if(this.class===SEEAss.Healer) {texticles= "Healer"; }
		if(this.class===SEEAss.Ninja) {texticles= "Ninja"; }
		if(this.class===SEEAss.Winger) {texticles="Winger";}
        if(this.class===SEEAss.Knight) {texticles="Knight";}
        if(this.class===SEEAss.Cleric) {texticles="Cleric";}
        if(this.class===SEEAss.Sage) {texticles="Sage";}
        if(this.class===SEEAss.Angel) {texticles="Angel";}
        if(this.class===SEEAss.DarkKnight) {texticles="Dark Knight";}
        if(this.class===SEEAss.Palladin) {texticles="Palladin";}
        if(this.class===SEEAss.PolarBear) {texticles="Polar Bear";}
		if(this.class===SEEAss.CptBearmerica) {texticles="Cpt. Bearmerica";}
		if(this.class===SEEAss.IronBear) {texticles="Iron Bear";}
		if(this.class===SEEAss.HulkBear) {texticles="Hulk Bear";}
		if(this.class===SEEAss.RumHam) {texticles="Rum Ham";}
		if(this.class===SEEAss.Theif) {texticles="Theif";}
		if(this.class===SEEAss.Dancer) {texticles="Dancer";}
		if(this.class===SEEAss.Creeper) {texticles="Creeper";}
		if(this.class===SEEAss.Skeleton) {texticles="Skeleton";}
		if(this.class===SEEAss.Monk) {texticles="Monk";}
		if(this.class===SEEAss.Vampire) {texticles="Vampire";}
		if(this.class===SEEAss.Werewolf) {texticles="Werewolf";}
		if(this.class===SEEAss.Tiger) {texticles="Tiger";}
		if(this.class===SEEAss.Samurai) {texticles="Samurai";}
		if(this.class===SEEAss.Pumpkinhead) {texticles="Pumpkin Head";}
		if(this.class===SEEAss.Witch) {texticles="Witch";}
		if(this.class===SEEAss.Octopus) {texticles="Octopus";}
		if(this.class===SEEAss.Mermaid) {texticles="Mermaid";}
		if(this.class===SEEAss.BeastTamer) {texticles="Beast Tamer";}
		return texticles;
	};
    
    this.drawInfo=function(){
        
        //canvas.save();
        canvas.globalAlpha=0.60;
        canvas.fillStyle =  "#DCDCDC";
        canvas.fillRect(25,95,820,500);
        canvas.fillStyle =bColors[1];//Math.floor(Math.random()*5)];// "#483D8B ";
        canvas.fillRect(40,110,790,470);
       // canvas.restore();
		canvas.globalAlpha=1;
        canvas.font = "14pt Calibri";
        canvas.textAlign = "left";
        canvas.textBaseline = "middle";

        canvas.fillStyle = "white";
        var texticles= "Name: " + this.name;
        canvas.fillText(texticles, 60, 122);
        
        texticles= "HP: " + this.hp + " / " +this.maxhp;
        canvas.fillText(texticles, 60, 137);
        
        texticles= "MP: " + this.mp + " / " +this.maxmp;
        canvas.fillText(texticles, 60, 152);
        
        texticles= "Level: " + this.level;
        canvas.fillText(texticles, 60, 172);
        
        texticles= "Exp: " + this.exp +"/"+this.nextLevel;
        canvas.fillText(texticles, 60, 192);
 
		texticles=this.getClassName();
        canvas.fillText(texticles, 240, 122);
        
        texticles= "Speed: " + this.speed+ "+"+this.equipment[1].speed ;
        canvas.fillText(texticles, 180, 135);
        
        texticles= "Attack " + this.attack + "+"+this.equipment[0].attack;
        canvas.fillText(texticles, 180, 152);
        
        texticles= "Def: " + this.def + "+"+this.equipment[1].def;
        canvas.fillText(texticles, 180, 172);
        
        texticles= "M.Def: " + this.mdef + "+"+this.equipment[1].mdef ;
        canvas.fillText(texticles, 180, 192);
        
        texticles= "Magic: " + this.mag + "+"+this.equipment[1].mdef ;
        canvas.fillText(texticles, 330, 135);
        
        texticles= "Luck: " + this.luck + "+"+this.equipment[1].luck ;
        canvas.fillText(texticles, 330, 152);
        
        texticles= "Evade: " + this.evade + "+"+this.equipment[1].evade ;
        canvas.fillText(texticles, 330, 172);
        
        texticles= "Ali: " + this.ali ;
        canvas.fillText(texticles, 330, 192);
        
        if(this.getAttackType()===0) {texticles= "Attack Type: Physical";} 
        if(this.getAttackType()===1) {texticles= "Attack Type: Ranged";} 
        if(this.getAttackType()===2) {texticles= "Attack Type: Magic";} 
        if(this.getAttackType()===3) {texticles= "Attack Type: Heal";} 
        if(this.getAttackType()===4) {texticles= "Attack Type: Inflict Status";} 
        canvas.fillText(texticles, 60, 212);
        
        texticles= "Can be leader: " + this.canlead ;
        canvas.fillText(texticles, 60, 232);
        
        texticles= "Weapon: " + this.equipment[0].name;
        canvas.fillText(texticles, 60, 272);
        
        texticles= "Armor: " + this.equipment[1].name;
        canvas.fillText(texticles, 60, 292);
        
        texticles= "Accessory: " + this.equipment[2].name;
        canvas.fillText(texticles, 60, 312);
        
        
        texticles= "Battles Won: " + this.battleswon ;
        canvas.fillText(texticles, 380, 232);
        
        texticles= "Battles Lost: " + this.battleslost;
        canvas.fillText(texticles, 380, 252);
        
        texticles= "Units Killed: " + this.kills;
        canvas.fillText(texticles, 380, 272);
        
        texticles= "Damage Delt: " + this.damagedelt;
        canvas.fillText(texticles, 380, 292);
        
        texticles= "Damage Taken: " + this.damagetaken;
        canvas.fillText(texticles, 380, 312);
		
		canvas.fillText("O= Optimize",60,330);
		canvas.fillText("D= Remove all",60,350);
        
    };
    
    this.levelUp=function(){
        this.level++;
        this.nextLevel=20+(5*this.level);
		var ted=classLevel();
        this.maxhp+=ted.maxhp;
        this.hp+=ted.maxhp;
        this.maxmp+=ted.maxmp;
        this.mp+=ted.mp;
        //this.speed+=ted.speed;
        this.evade+=ted.evade;
        this.def+=ted.def;
        this.mdef+=ted.mdef;
        this.attack+=ted.attack;
		if(this.team==0){
        var tmpstr=this.name+ " gained a level!";
        console.log(tmpstr);
		bConsoleStr.push(tmpstr);
		bConsoleClr.push("white");
        //playSound("level");
		}
		
    };
    
    this.levelTo=function(tg){
		while(this.level<tg)
		{
			this.levelUp();
		}
    };
	
    this.getAttackType=function(){
        return this.attackType[this.row];
    };
    
    this.equipDef=function(){
        return this.equipment[0].def+this.equipment[1].def+this.equipment[2].def;
    };
    this.equipMDef=function(){  
        return this.equipment[0].mdef+this.equipment[1].mdef+this.equipment[2].mdef;
    };
    this.equipMag=function(){
        return this.equipment[0].mag+this.equipment[1].mag+this.equipment[2].mag;
    };
    this.equipSpeed=function(){
        return this.equipment[0].speed+this.equipment[1].speed+this.equipment[2].speed;
    };
    this.equipAttack=function(){
        return this.equipment[0].attack+this.equipment[1].attack+this.equipment[2].attack;
    };
    this.equipEvade=function(){
        return this.equipment[0].evade+this.equipment[1].evade+this.equipment[2].evade;
    };
    
    this.getDef= function(attacktype){
        if((attacktype==AttackTypes.Physical) || (attacktype==AttackTypes.Ranged)){
            if(this.row===0){
                return this.def+this.equipDef();
            }else{
                return this.def+5+this.equipDef();
            }
        }else
        {
            return this.mdef+this.equipMDef();
        }
        
    };
    this.hurt = function(dmg){

        this.hp-=dmg;
        this.damagetaken+=dmg;
        if (this.hp<0) {this.hp=0; this.alive=false;                    var tmpstr=this.name + " died.";
                        console.log(tmpstr);
						bConsoleStr.push(tmpstr);
						if(this.team==0) {bConsoleClr.push("red");}
						if(this.team==1) {bConsoleClr.push("green");}
                       }
    }; 
    
    this.heal=function(val){
        if (this.alive) {
            this.hp+=val;
            if (this.hp>this.maxhp) {this.hp=this.maxhp;}
        }
    };
    
    this.giveAli= function(val){
        this.ali+=val;
        if(this.ali>100) {this.ali=100;}
        if(this.ali<0) {this.ali=0;}
    };
    
    this.changeClass=function(){
        
    };
    
    this.giveStatus=function(stats){
        this.status[stats]=true;
    };
    
    this.removeStatus=function(stats){
        this.status[stats]=false;
    };
    
    
    this.hasStatus=function(stats){
        if(this.status[stats]) {return true;}
        return false;
    };
    
	this.canEquip=function(itm){
		var flag=false;
		for(var i=0;i<itm.classes.length;i++)
		{
			if(itm.classes[i]==this.class){
				flag=true;
			}
			
		}
		if (!flag) { return false;}
		return true;
	}
	
	this.equip=function(itm){
		
		if (!this.canEquip(itm)) { return false;}
		this.equipment[itm.slot]=itm;
		return true;
	};
	
    this.update = function (usqd,esqd){
        if(paused) {return;}
        //if(battleReport) {return;}
        if(battlePause) {return;}//todo for now
		this.team=usqd.team;
       /* if (this.attackStage>0) //doing this esewhere for now
		{
			if(this.attackStage==2)
			{
				this.attacking--; 
				if(this.attacking<1)
				{
					this.attackStage=0;
				}
				return;	
			}else if(this.attackStage==1)
			{
				this.attacking++; 
				if(this.attacking>10)
				{
					this.attackStage=2;
				}
				return;	
			}
		}*/
		if (this.attackStage>0) //no ATB when attackign
		{ return;
		}
        if (this.hurting>0) {this.hurting--; return;}
        if (this.atb>battlespeed) {
            //gambits, attack
            if(this.hasStatus(Status.Poison)){
                this.hurt(3);
            }
			if(this.hasStatus(Status.Regen)){
                this.heal(3);
            }
            this.atb=0;
            var targe=null;
            if(this.getAttackType()==AttackTypes.Heal)
            {
                if((this.class==SEEAss.Cleric) || (this.class==SEEAss.Angel)){
                    var deadguy=null;
                    for(var i=0;i<usqd.numUnits;i++){
                        if (!usqd.units[i].alive){
                            deadguy=usqd.units[i];
                            continue;
                        }
                    }
                    if(deadguy!==null)
                    {
                        deadguy.alive=true;
                        deadguy.heal(this.mag);
                        //esqd.damaged-=this.mag;
                        this.giveExp(this.mag);
                        var tmpstr=this.name + " revived " +deadguy.name;
                        console.log(tmpstr);
						bConsoleStr.push(tmpstr);
						bConsoleClr.push("white");
						usqd.turns++;
						this.attackStage=1;
						this.attackAniStage=1;
                    }else  if (this.class==SEEAss.Angel) 
                    {
                        var tmpstr=this.name + " healed the party" ;
                        console.log(tmpstr);
						bConsoleStr.push(tmpstr);
						bConsoleClr.push("white");
						usqd.turns++;
						this.attackStage=1;
						this.attackAniStage=1;
                        for(var i=0;i<usqd.numUnits;i++){
                            if (usqd.units[i].alive) {
                                usqd.units[i].heal(20);
                            }
                        }
                        
                    }else
                    {
                        targe=usqd.getWeakestHeal();
                        targe.heal(this.mag);
                        esqd.damaged-=this.mag;
                        this.giveExp(this.mag);
                        var tmpstr=this.name + " healed " +targe.name+ " " +this.mag+ " points.";
                        console.log(tmpstr);
						bConsoleStr.push(tmpstr);
						bConsoleClr.push("white");
						usqd.turns++;
						this.attackStage=1;
						this.attackAniStage=1;
                    }
                }else 
                {
                    targe=usqd.getWeakestHeal();
                    targe.heal(this.mag);
                    esqd.damaged-=this.mag;
                    this.giveExp(this.mag);
                    var tmpstr=this.name + " healed " +targe.name+ " " +this.mag+ " points.";
                    console.log(tmpstr);
					bConsoleStr.push(tmpstr);
					bConsoleClr.push("white");
					usqd.turns++;
					this.attackStage=1;
					this.attackAniStage=1;
                }
            }else if(this.getAttackType()==AttackTypes.GiveStatus){
				targe=usqd.units[this.statusTrack];
				usqd.units[this.statusTrack].giveStatus(this.whichBuff);
				this.whichBuff=Math.floor(Math.random()*3);//todo
				var stsu = "Haste";
				if(this.whichBuff==Status.Regen)
				{
					stsu="Regen";
				}else if(this.whichBuff==Status.Reflect)
				{
					stsu="Reflect";
				}else if(this.whichBuff==Status.Protect)
				{
					stsu="Protect";
				}else if(this.whichBuff==Status.Cloak)
				{
					stsu="Cloaked";
				}
				var tmpstr=this.name+" cast "+stsu+" on "+ usqd.units[this.statusTrack].name;
				console.log(tmpstr);
				bConsoleStr.push(tmpstr);
				bConsoleClr.push("white");
				this.attackStage=1;
				this.attackAniStage=1;
				usqd.turns++;
				this.statusTrack++;//todo: change
				if (this.statusTrack>usqd.numUnits-1) 
				{
					this.statusTrack=0;
					this.whichBuff++;
					if(this.wichBuff>NUM_BUFFS-1) {this.whichBuff=0;}
				}
				
			}else if(this.getAttackType()==AttackTypes.HealStatus){
				esqd.healStatus();
				usqd.turns++;
				//esqd.esuna();
			}else
            {
                if(this.equipment[0].hitAll){
                    for(var i=0;i<esqd.numUnits;i++)
                    {
                        if (esqd.units[i].alive)
                        {
                            targe=esqd.units[i];
                            var delt=Math.floor(this.getAttack()-targe.getDef(this.getAttackType()));
                            if (delt<1) {delt=1;}
                            if(Math.floor(Math.random()*20) > targe.evade) {
                                var temper="";
                                if(Math.floor(Math.random()*CRIT_CHANCE) < this.luck) { delt=delt+(delt/2); temper=" critical";} //critical hit
                                
                                var tmpstr=this.name + temper+" hit " +targe.name+ " for " +delt+ " damage.";
                                if(usqd.team===0) {
                                    console.log(tmpstr);//todo MONSOLE
									bConsoleStr.push(tmpstr);
									bConsoleClr.push("green");
                                }else
                                {
                                    console.warn(tmpstr);
									//todo set color
									bConsoleStr.push(tmpstr);
									bConsoleClr.push("red");
                                }
                                this.giveExp(delt);
                                this.damagedelt+=delt;
								if(targe.hasStatus(Status.Protect)){
									delt-=delt/.25;
								}
                                targe.hurt(delt); 
                                if(!targe.alive) { 
                                    this.kills++;
                                    if(targe.ali>this.ali+5){this.giveAli(2);}
                                    if(targe.ali<this.ali-5){this.giveAli(2);}
                                }
                                if((targe==esqd.leader) &&(!targe.alive)) {esqd.pickNewLeader();}
                                this.attackStage=1; 
								this.attackAniStage=1;
								if(this.attackType[this.row]==AttackTypes.Ranged)
								{
									//monsta.shoot(xp-50-this.attacking/2, 135+i*2*45,90,3);
									
								}
                                targe.hurting=20;
                                usqd.turns++;
                                usqd.damaged+=delt;
                            }
                        }
                    }
                }else
                {
                    if (usqd.battleAI===0) //weakest
                    {
                        targe=esqd.getWeakest();
                    }else if (usqd.battleAI===1) //Strongest
                    {
                        targe=esqd.getStrongest();
                    }else if (usqd.battleAI==2) //leader
                    {
                        targe=esqd.leader;
                        if(!targe.alive) {targe=esqd.getWeakest(); }
                    }
                    if((esqd!==null) && (esqd.alive)){
                        if(targe===null) { return;}//esqd.checkSurvivors(); return;}
                        var delt=Math.floor(this.getAttack()-targe.getDef(this.getAttackType()));
                        if (delt<1) {delt=1;}
                        if(Math.floor(Math.random()*20) > targe.evade) {
                            var temper="";
                            if(Math.floor(Math.random()*CRIT_CHANCE) < this.luck) { delt=delt+(delt/2); temper=" critical";} //critical hit
                            
                            var tmpstr=this.name + temper+" hit " +targe.name+ " for " +delt+ " damage.";
                            if(usqd.team===0) {
                                console.log(tmpstr);//todo MONSOLE
								bConsoleStr.push(tmpstr);
								bConsoleClr.push("green");
                            }else
                            {
                                console.warn(tmpstr);
								bConsoleStr.push(tmpstr);
								bConsoleClr.push("red");
                            }
                            this.giveExp(delt); //todo exp based on levels
                            this.damagedelt+=delt;
                            targe.hurt(delt); 
                            if(!targe.alive) { 
                                this.kills++;
                                if(targe.ali>this.ali+5){this.giveAli(2);}
                                if(targe.ali<this.ali-5){this.giveAli(2);}
                            }
                            if((targe==esqd.leader) &&(!targe.alive)) {esqd.pickNewLeader();}
							this.attackStage=1;
							this.attackAniStage=1;
                            targe.hurting=20;
                            usqd.turns++;
                            usqd.damaged+=delt;
                        } else {
			    
			    usqd.turns++;
			    this.attackStage=1; 
				this.attackAniStage=1;
			    var tmpstr = this.name + " missed "+ targe.name; 
			    console.log(tmpstr);
				bConsoleStr.push(tmpstr);
				bConsoleClr.push("white");
			} //miss
                    } else { endBattle(usqd,esqd); }
                }
            }
            
        }
        if((this.alive) &&(this.hp<1)) {
            this.hp=0; 
            this.alive=false;
            var tmpstr=this.name + " died.";
            console.log(tmpstr);//todo MONSOLE
			bConsoleStr.push(tmpstr);
			bConsoleClr.push("white");
            //usqd.checkSurvivors();
        }


		if(!battleReport){
			if(this.hasStatus(Status.Haste)){
				this.atb+=(this.speed*2*battleRate);
			}else if(this.hasStatus(Status.Slow)){
				this.atb+=(this.speed/2*battleRate);
			}else {
				this.atb+=this.speed*battleRate;
			}
		}
    };
    
    this.rowswap=function(){
        if (this.row===0) { this.row=1;}
        else if (this.row===1) { this.row=0;}
    };
    
    this.setClass=function() {
              
		this.maxhp=60;
		this.hp=60;
		this.attack=14
		this.maxmp=40;
		this.speed=1;
		this.luck=5;
		this.ali=50;
		this.blokemon=true;
		this.viewRange=5;
		this.def=15;
		this.mdef=3;
		this.cost=10;
		this.canlead=true;
		this.attackType[0]=AttackTypes.Physical;
		this.attackType[1]=AttackTypes.Physical;
		this.equipment[0]=claws;
		//this.equipment[1]=breastplate;
		this.sprite = Sprite("bear1");
		if (this.gender===1) {this.sprite = Sprite("beargirl");}
               
        
    };

    this.hp=this.maxhp;
    this.mp=this.maxmp;
	this.viewRange=50;
    if (this.gender===2) {this.name="Nancy";}
}

function squad() {
    //list of units
    //list of items
    //list of blokemon
    //leader
    //AI 
    //target
    //waypoints?
	this.selected=false;
    this.flightHeight=0;
    this.swimCarry=0;
    this.x = 12;
    this.y = 12;
    this.army=0;
    this.lastmove=0;
    this.basex=12;
    this.basey=12;
    this.battleAI=0;
    this.alive=true;
    this.numUnits=Math.floor(Math.random()*3)+3;//3;
    this.battling=false;
    this.units = new Array (5);
    this.units[0]= new unit();
    this.units[1]= new unit();
    this.units[2]= new unit();
    this.units[3]= new unit();
    this.units[4]= new unit();
    //for(var i=0;i<this.numUnits;i++) { this.units[i].alive=true;}
    this.leader = this.units[0];
    this.knockback=7;
    this.deployed=false;
    this.width=32;
    this.height=32;
    this.bx = 8;
    this.by = 8;
    this.dx = 0;
    this.dy = 0;
    this.team=0;
    this.cohesion=50;
    this.damaged=0;
    this.leaderless=false;
    this.ID=89;
    this.turns=0;
    this.sprite = this.leader.sprite;
    this.path = null;
    this.nextMove = null;
    this.nextTile = {x: this.x, y: this.y};
    this.inNextTile = false;
    this.viewRange=50;
    this.encounterCounter=0;
    this.encounterPoint=Math.floor(Math.random()*400)+200;
}

squad.prototype.stringifySquad=function(){
   var tempunits=new Array();
    for (i=0;i<this.numUnits; i++){
		tempunits.push(this.units[i].stringifyUnit());
    }
	var tempobj = {'numUnits': this.numUnits, 'units':tempunits};
    var tempstring = JSON.stringify(tempobj);
    return tempstring;
};

squad.prototype.isInTown=function(twns){
	for(var i=0;i<maps[mapSelected].numTowns;i++)
	{
		if(twns[i].checkCollision(this)){
			return i;
		}
	}	
	return false;
};
squad.prototype.classFromTerrain=function(map){
		if(map.tiles[this.x][this.y].data==TileType.Swamp) {return SEEAss.Frog;}
		if(map.tiles[this.x][this.y].data==TileType.Water) {return SEEAss.Octopus;}
		if(map.tiles[this.x][this.y].data==TileType.Forest) {return SEEAss.Tiger;}
		if(map.tiles[this.x][this.y].data==TileType.Plains) {return SEEAss.EarthBound;}
		if(map.tiles[this.x][this.y].data==TileType.Sand) {return SEEAss.Creeper;}
		if(map.tiles[this.x][this.y].data==TileType.Road) {return SEEAss.Creeper;}
		if(theTime.hours>16) {return SEEAss.Pumpkinhead;}
		if(theTime.hours>12) {return SEEAss.Skeleton;}
		return SEEAss.Shoe;
	};
	
squad.prototype.getViewRange=function() {
		var feight=0;
		for(var i=0;i<this.numUnits;i++)
		{
			feight+=this.units[i].viewRange;
		}
		return Math.floor(feight/this.numUnits);
	};	
    
squad.prototype.getFlightHeight=function()
	{
		var feight=0;
		for(var i=0;i<this.numUnits;i++)
		{
			if(this.units[i].alive){
				feight+=this.units[i].flightHeight;
			}
		}
		return feight;
	};	
	
	
	squad.prototype.canSwim=function()
	{
		var feight=0;
		for(var i=0;i<this.numUnits;i++)
		{
			if(this.units[i].alive){
				feight+=this.units[i].swimCarry;
			}
		}
		if ( feight>0) {return true;}
		return false;
	};	
    
squad.prototype.addUnit=function(uknit)
    {
        if (this.numUnits>4) {return false;}
        this.units[this.numUnits]=uknit;//new unit();
        this.numUnits++;
		return true;
    };
    
squad.prototype.removeUnit=function(id)
    {
        if (this.numUnits<1) {return false;}
        this.units[id].exists=false;
        //this.units[id].alive=false;
        
        for(var i=id;i<this.numUnits-1;i++)
        {
            this.units[i]=this.units[i+1];
            
        }
        /*this.units[this.numUnits].alive=false;
          this.units[this.numUnits].exists=false;
          this.units[this.numUnits].alive=null;*/
        this.numUnits--;
		return true;
    };
    
    squad.prototype.deploy=function()
    {
        var cst = this.getCost();
        if ((this.team==0) &&(armies[this.team].gold<cst)) {  var tmpstr="Not enough gold to deploy "+ this.leader.name+ "'s unit."; console.log(tmpstr);bConsoleStr.push(tmpstr);bConsoleClr.push("red"); return;}
        armies[this.team].gold-=cst;
        //revive and heal all just in case.
        this.deployed=true;
    }
    
    squad.prototype.healStatus=function(){
        for(var i=0;i<this.numUnits;i++){
            this.units[i].esuna();
        }
    };
    
    squad.prototype.refresh=function(){
        for(var i=0;i<this.numUnits;i++){
            this.units[i].alive=true;
            this.units[i].hp=this.units[i].maxhp;
            this.units[i].mp=this.units[i].maxmp;
            this.units[i].atb=0;
            //reset stats?
        }
        this.healStatus();
    };
    
    squad.prototype.row=function(){
        for (var i=0;i<this.numUnits;i++)
        {
            if (this.units[i].row===0) { this.units[i].row=1;}
            else if (this.units[i].row===1) { this.units[i].row=0;}
        }
    };
    squad.prototype.heal=function(){
        if (healcount<healrate) {healcount++; return;}
        healcount=0;
        for(var i=0;i<this.numUnits;i++){
            if (this.units[i].alive) {
                this.units[i].hp++;
                if (this.units[i].hp>this.units[i].maxhp) {this.units[i].hp=this.units[i].maxhp;}
            }
        }
    };
    
    squad.prototype.getCost=function(){
        var cst=0;
		for(var i=0;i<this.numUnits;i++)
		{
			cst+=this.units[i].cost;
		}
		return cst;
    };
	squad.prototype.getAli=function(){
        var cst=0;
		for(var i=0;i<this.numUnits;i++)
		{
			cst+=this.units[i].ali;
		}
		return Math.floor(cst/this.numUnits);
    };
	
	squad.prototype.getLuck=function(){
        var cst=0;
		for(var i=0;i<this.numUnits;i++)
		{
			cst+=this.units[i].luck;
		}
		return Math.floor(cst);
    };
squad.prototype.flee= function(c)
    {
		if(!isBattle) {return;}
        if(Math.floor(Math.random()*30) > (15)) {
            this.turns=20;
            this.damaged=-1;
			this.cohesion-=2;
        }else
        {
            console.log("Couldn't escape!");
			bConsoleStr.push("Couldn't escape!");
			bConsoleClr.push("red");
        }
    };
    squad.prototype.getHP=function(){
        var herbert=0;
        for (var i=0;i<this.numUnits;i++) {
            if(this.units[i].alive) {
                herbert=herbert+this.units[i].hp;
            }
        }
        return herbert;
    };
    squad.prototype.getMaxHP=function(){
        var herbert=0;
        for (var i=0;i<this.numUnits;i++) {
            if(this.units[i].alive) {
                herbert=herbert+this.units[i].maxhp;
            }
        }
        return herbert;
    };
    squad.prototype.getMP=function(){
        var herbert=0;
        for (var i=0;i<this.numUnits;i++) {
            if(this.units[i].alive) {
                herbert=herbert+this.units[i].mp;
            }
        }
        return herbert;
    };
    
    squad.prototype.pickNewLeader=function() { 
        var oldlead=this.leader;
        for(var i=0;i<this.numUnits;i++)
        {       
            if((this.units[i].alive) && (this.units[i].canlead)) {
                this.leader=this.units[i];
				var tmpstr=this.leader.name + " took over " + oldlead.name+"'s squad";
                console.log(tmpstr);
				bConsoleStr.push(tmpstr);
				bConsoleClr.push("white");
                return;
            }
        }
        if(this.alive===true){
			var tmpstr=this.leader.name + "'s squad has no qualified leader! returning to base!" 
            console.log(tmpstr);
			bConsoleStr.push(tmpstr);
			bConsoleClr.push("red");
            this.leaderless=true;
			if(this.path){
				this.clearDestination();
			}
            //this.setDestination(this.basex,this.basey,curMap);
        }
        return ;
    };
    
    squad.prototype.smartRow=function()
    {
        for(var j=0;j<this.numUnits;j++)
        {
            if(this.units[j].alive) {
                this.units[j].row=0;
                if ((this.units[j].class==SEEAss.Healer) || (this.units[j].class==SEEAss.Cleric)||(this.units[j].class==SEEAss.Archer)||(this.units[j].class==SEEAss.Wizard))
                {
                    this.units[j].row=1;
                }
            }
        }
    };
    
    squad.prototype.numSquadUnits=function() {
        var count=0;
        if(this.alive) 
        {
            for(var j=0;j<this.numUnits;j++)
            {
                if(this.units[j].alive) {count++;} //PROBLEM
            }
        }
        return count;
    };

    squad.prototype.getStrongest=function(){
        var strongest=null;
        var h=0;
        for(var i=0;i<this.numUnits;i++){
            if(this.units[i].hp>h) {
                h=this.units[i].hp;
                strongest=this.units[i];
            }
        }
        return strongest;
    };
    
    squad.prototype.checkSurvivors=function() {    //check for any living units if not kill squad.
        var anylife=false;
        for(var j=0;j<this.numUnits;j++)
        {
            if(this.units[j].alive) {anylife=true;}
        }
        if (anylife===false) { 
            this.alive=false;
			this.deployed=false;
            return false;
        }
        return true;
    };

    squad.prototype.getWeakest=function() {
        var weakest=null;
        var h=999;
        for(var i=0;i<this.numUnits;i++){
            if((this.units[i].hp<h) && (this.units[i].hp>0)) {
                h=this.units[1].hp;
                weakest=this.units[i];
            }
        }
        return weakest;
    };
    
    
    squad.prototype.getWeakestHeal=function() {
        var weakest=this.leader;
        var h=999;
        for(var i=0;i<this.numUnits;i++){
            if((this.units[i].hp<h) && (this.units[i].hp>0) && (this.units[i].hp<this.units[i].maxhp)) {
                h=this.units[i].hp;
                weakest=this.units[i];
            }
        }
        return weakest;
    };
	
	squad.prototype.isViable=function()
	{
		if((this.alive) && (this.deployed)) {return true;}
		return false;
	}

    squad.prototype.draw = function(cam) {
        if ((!this.alive) ||(!this.deployed)){return;} //TODO: also check visual range for enemies
        var press=this.leader.sprite;
		var xm=0;
		var ym=0;
		if(cam.zoom==2){
			//xm=8;
			//ym=8;
		}else if(cam.zoom==3){
			//xm=16;
			//ym=16;
		}
		if((this.leader.class==SEEAss.Werewolf) && (theTime.hours>12)) {
			press=this.leader.nightSprite;
		}
		press.draw(canvas,
                         (this.x * 16 + (Math.round(this.bx) - 8) - cam.x * 16) / Math.pow(2, curMap.zoom-1)-xm, 
                         (this.y * 16 + (Math.round(this.by) - 8) - cam.y * 16) / Math.pow(2, curMap.zoom-1)-ym);
        if (this.leaderless){
            noleader.draw(canvas,
                          (this.x * 16 + (Math.round(this.bx) - 8) - cam.x * 16) / Math.pow(2, curMap.zoom-1)-xm, 
                          (this.y * 16 + (Math.round(this.by) - 8) - cam.y * 16) / Math.pow(2, curMap.zoom-1)-ym);
        }
		if(this.isInTown(towns)==false)
		{
			if(curMap.tiles[this.x][this.y+2].data==TileType.Forest) {
				var gx=(this.x-cam.x)*16/Math.pow(2, curMap.zoom-1);
				var gy=(this.y-cam.y+1)*16/Math.pow(2, curMap.zoom-1);
				var plop=this.by;
				if(curMap.zoom>2) { 
					gy-=8;
					plop=0;
				}//todo
				tileSprite[TileType.Forest].draw(canvas, gx, gy+8*(Math.pow(2, curMap.zoom-1)-1)+plop);
				tileSprite[TileType.Forest].draw(canvas, gx+16, gy+8*(Math.pow(2, curMap.zoom-1)-1)+plop);//todo
		
			}else if((curMap.tiles[this.x][this.y+2].data==TileType.Water) &&(this.getFlightHeight()<1)) {
				var gx=(this.x-cam.x)*16/Math.pow(2, curMap.zoom-1);
				var gy=(this.y-cam.y+1)*16/Math.pow(2, curMap.zoom-1);
				//canvas.save();
				/*plop=this.by;
				if(curMap.zoom>2) { 
					gy-=8;
					plop=0;
				}//todo*/
				canvas.globalAlpha=0.80;
				tileSprite[TileType.Water+tileani].draw(canvas, gx, gy+8*(curMap.zoom-1)+plop);
				tileSprite[TileType.Water+tileani].draw(canvas, gx+16, gy+8*(curMap.zoom-1)+plop);//todo
				tileSprite[TileType.Water+tileani].draw(canvas, gx, gy+16+8*(curMap.zoom-1)+plop);
				tileSprite[TileType.Water+tileani].draw(canvas, gx+16, gy+16+8*(curMap.zoom-1)+plop);//todo
				//canvas.restore();
				canvas.globalAlpha=1;
			}
		}
    };

    squad.prototype.drawdest = function(cam) {
        if (!this.isViable()){return;} 
        flagsprite.draw(canvas, ((this.dx * 16 - cam.x * 16)+8) / Math.pow(2, curMap.zoom-1), ((this.dy * 16 - cam.y * 16)+8) / Math.pow(2, curMap.zoom-1));
    };
    
    squad.prototype.checkCollision= function() {

        if (this.team==0) {
            for(var i=0;i<armies[1].numSquads;i++){
                if ((this.isViable()) &&(armies[1].squads[i].isViable())&& (armies[1].squads[i].x-2<this.x) &&(armies[1].squads[i].x+2>this.x)&& (armies[1].squads[i].y+2>this.y) && (armies[1].squads[i].y-2<this.y)) {return armies[1].squads[i];} //TODO:START BATTLE
            }
        }

        return null;
    };

    squad.prototype.update = function(map) {
		//if(milliseconds-this.timelastmoved<this.speed){ return; }//todo
		if(!gamestart) {return;}
        if ((paused) || (!this.alive) ||(!this.deployed)|| (battleReport) || (isBattle) ||(preBattle)) {return;}
		var targ=null;
        if(this.team==0){
			targ=this.checkCollision();
		}else if(this.team==1) {targ=null;} 
        if ((targ!=null) && (targ.alive)) {
			if(targ.leader==armies[1].leader)
			 {
				if(!bossSpouted){
					bossSpouted=true;
					//alert("poopy");
					townbox.lines=4;
					var i=1;
					townbox.msg[0]=towns[i].speaker;
					townbox.msg[1]=towns[i].plotText[0];
					townbox.msg[2]=towns[i].plotText[1];
					townbox.msg[3]=towns[i].plotText[2];
					townbox.exists=true;
					paused=true;
				}
			 }
             preBattle=preBattleLength; /*isBattle=true;*/ /*battleCanvas.show();*/ 
			 if(MUSIC_ON){
				 document.getElementById("mapAudio").pause();
				 document.getElementById("battleAudio").volume=MUSIC_VOL;
				 document.getElementById("battleAudio").currentTime = 4;
				 document.getElementById("battleAudio").play();
			 }

			 combatants[0]=this;
			 combatants[1]=targ;
			 //camera.center(this);
			 camera.pan(this.x,this.y);
			 mapDirty=true; 
			 SELECTED=this.ID;
            var tmpstr=this.leader.name + "'s squad encountered an enemy!";

			battleBox.msg[0]=tmpstr;
			battleBox.exists=true;
            console.log(tmpstr);//todo MONSOLEreturn;
			bConsoleStr.push(tmpstr);
			bConsoleClr.push("white");
        };
        if((this.leaderless===true) && (this.path==null)){
            this.setDestination(this.basex,this.basey,curMap)}
        for(var i=0;i<maps[mapSelected].numTowns;i++) 
        {
			if(towns[i].checkCollision(this)) 
            {
                if(towns[i].team!=this.team)
				{
                    towns[i].team=this.team;
					if(towns[i].team==0) 
					{
						armies[0].opinion+=5;
						var tmpstr=this.leader.name+"'s unit liberated " + towns[i].name;
						lastEventX=towns[i].x;
						lastEventY=towns[i].y;
						console.log(tmpstr); 
						bConsoleStr.push(tmpstr);
						bConsoleClr.push("white");
						if(towns[i].itemChance>(Math.random()*99))
						{
							var lenny=towns[i].getItem();
							armies[0].addItem(lenny);
							bConsoleStr.push("The townsfolk give you a "+lenny.name);
							bConsoleClr.push("white");
						}
						
						if((this.team==0)&& (!towns[i].spouted) && (i!=maps[mapSelected].numTowns-1)){
							towns[i].spouted=true;
							townbox.lines=4;
							townbox.msg[0]=towns[i].speaker;
							townbox.msg[1]=towns[i].plotText[0];
							townbox.msg[2]=towns[i].plotText[1];
							townbox.msg[3]=towns[i].plotText[2];
							townbox.exists=true;
							paused=true;
						}
					}
                    if(towns[i].team==1)
					{
						armies[0].opinion-=10; 
						var tmpstr=this.leader.name+"'s unit captured " + towns[i].name; console.warn(tmpstr); 
						lastEventX=towns[i].x;
						lastEventY=towns[i].y;
						bConsoleStr.push(tmpstr);
						bConsoleClr.push("white");
					

					}
                }
                this.heal();
            }
		
        }
		
		if(armies[0].opinion<0) {armies[0].opinion=0;}
		
        if( !this.nextMove ) {
            this.updateNextMove();
        }
        if( !this.nextMove ) {
            return;
        }
        var terrain = map.tiles[this.nextTile.x][this.nextTile.y].data;
        var speed = (terrain == 4 ? 2 : 4);
        if (this.leaderless) {speed=3;} //PROBLEM?
        if((terrain==4) &&(this.units[0].class==SEEAss.Frog)) {speed=4};

        //speed = speed / Math.pow(2, curMap.zoom-1);
		var stamp = new Date();
		var milli=stamp.getTime();
		//speed=(speed * delta) * (60 / 1000);

		if(milli-this.lastmove>30){
			if( this.nextMove.x > this.x ) {
				this.bx += speed;
				this.encounterCounter++;
			} else if( this.nextMove.x < this.x ) {
				this.bx -= speed;
				this.encounterCounter++;
			}
			if( this.nextMove.y > this.y ) {
				this.by += speed;
				this.encounterCounter++;
			} else if( this.nextMove.y < this.y ) {
				this.by -= speed;
				this.encounterCounter++;
			}
			this.lastmove=stamp.getTime();
		}

        if( !this.inNextTile && ( this.bx <= 0 || this.bx >= 16 || this.by <= 0 || this.by >= 16 )) {
            this.nextTile = {};
            this.nextTile.x = this.nextMove.x;
            this.nextTile.y = this.nextMove.y;
            //           if( this.bx == 0 ) { this.bx = 16 } else if( this.bx == 16 ) { this.bx = 0; } 
            //           if( this.by == 0 ) { this.by = 16 } else if( this.by == 16 ) { this.by = 0; }          
            this.inNextTile = true;

        }
        if(( this.bx >= 24 || this.bx <= -8 ) || ( this.by <= -8 || this.by >= 24 )) {
            this.bx = this.by = 8;
            this.inNextTile = false;
            this.x = this.nextMove.x;
            this.y = this.nextMove.y;
            this.nextTile = {x: this.x, y: this.y};
            this.nextMove = null;

        }
		if(this.randomEncounter()){
			var bloke=new unit();
			bloke.class=this.classFromTerrain(map);
			bloke.setClass();
			var tmpstr=this.leader.name + "'s squad encountered a wild "+bloke.getClassName();
			console.log(tmpstr);
			bConsoleStr.push(tmpstr);
			bConsoleClr.push("white");
			var blokeSquad=new squad();
			blokeSquad.numUnits=1;
			blokeSquad.units[0]=bloke;
			combatants[0]=this;
			combatants[1]=blokeSquad;
			preBattle=preBattleLength;
			//todo different song
			if(MUSIC_ON){
				document.getElementById("mapAudio").pause();
				document.getElementById("battleAudio").volume=MUSIC_VOL;
				document.getElementById("battleAudio").currentTime = 4;
				document.getElementById("battleAudio").play();
			}//camera.center(this);
			camera.pan(this.x,this.y);
			battleBox.msg[0]=tmpstr;
			battleBox.exists=true;
            console.log(tmpstr);//todo MONSOLEreturn;
		}
    };
	squad.prototype.hasTamer=function(){
		for(var i=0;i<this.numUnits;i++){
			if (this.units[i].class==SEEAss.BeastTamer) {return true;}
		}
		return false;
	};
	squad.prototype.randomEncounter=function(){
		if(this.team==1) {return false;}
		if(!this.hasTamer()) {return false;}
		if(this.encounterCounter>this.encounterPoint){
			this.encounterCounter=0;
			this.encounterPoint=Math.floor(Math.random()*400)+ENCOUNTER_RATE;
			return true;
		}
		return false;
	};
    squad.prototype.updateNextMove = function() {
        if( !this.path ) {
            return;
        }
        this.nextMove = this.path.shift();
        if( !this.nextMove ) {
			if(this.team==0){
				var tmpstr=this.leader.name + "'s squad reached their destination.";
				bConsoleStr.push(tmpstr);
				bConsoleClr.push("white");
			}else
			{
				//todo give enemy squads new destination now.
			}
            this.path = null; return;
        }
    };
    squad.prototype.isWalking = function() {
        return this.path != null;
    };
    squad.prototype.clearDestination=function(){
        this.path=null; this.dx = this.x; this.dy = this.y; this.nextMove = null;
    };
    squad.prototype.setDestination = function(x, y, map) {
		if(!map.walkable(x,y,this)) {return;}
        this.clearDestination();
        this.path = map.getPath(this.x, this.y, x, y,this);
        this.dx=x;
        this.dy=y;
    };