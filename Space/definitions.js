var backspaced=false;
var tabbed=false;
var keydown={};
var multiplayer=false;
// Prevent the backspace key from navigating back.
$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE' || d.type.toUpperCase() === 'EMAIL' )) 
             || d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }else if(holdInput)
		{
			doPrevent = true;
			backspaced=true;
		}
        else {
            doPrevent = true;
        }
    }else  if (event.keyCode === 9) {
       
			doPrevent = true;
			tabbed=true;
    }

    if (doPrevent) {
        event.preventDefault();
    }
});


var starting=false;
var bColors = ["#008000","#006400", "#FF4500", "#000080", "#696969", "#800080", "#808000", "#A52A2A", "#8B4513", "#FFDEAD", "#FFFF40","#000080" , "#FFFF80"]; //list of colors for radar/a few 
var yellowColors=["#F3F781","#F2F5A9","#FFFF00","#D7DF01","#AEB404"];
var holdEverything=false;
var logAll=false;
Flag={};
Flag.MetTelaxianBountyHunters=0;
Flag.LeftNeelix=1;

var stars=[];
var nebulas=[];

var holdInput=false;


var flashGUITick=0;
var flashGUITrack=0;
var arrowSprite=[];
arrowSprite.push(Sprite("greenarrow"));
arrowSprite.push(Sprite("yellowarrow"));
arrowSprite.push(Sprite("redarrow"));

function time(){
    this.hours=0; 
    this.minutes=0;
    this.seconds=0;
    this.days=0;
	this.years=2000;
}
var yearFlag=false;
time.prototype.update=function(plan){
    this.days+=plan.orbitSpeed*gameSpeed;
    if(this.days>360){
        this.days-=360;
        this.years++;
		yearFlag=true;
    }
};

var theTime=new time();
function textbox() 
 {  //draws a text box
	this.exists=false;
	this.x=140;
	this.y=370;
	this.scroll=0;
	this.width=600;
	this.label=false;
	this.height=55;
	this.options=2;
	this.object=null;
	this.civil=null;
	this.choicesStart=3;
	this.optionTrack=0;//draw the liitle -
	this.colors=[];
	this.msg=[];
	this.optionOne=function(civil1,civil2)
	{
		holdEverything=false;
	};
	this.optionTwo=function(civil1,civil2)
	{
		holdEverything=false;
	};
	this.optionThree=function(civil1,civil2)
	{
		holdEverything=false;
	};
	this.optionTwo=null;
	this.optionThree=null;
	this.response=function()
	{
		console.log("CONSEQUENCES HAVE HAPPENED");
	};
	this.addText=function(text)
	{
		this.msg.push(text);
		this.colors.push("white");
	};
	
	this.setup=function(firsttext,x,y)
	{
		this.msg.push(firsttext);
		this.exists=true;
		holdEverything=true;
		this.colors.push("white");
		this.x=x;
		this.y=y;
	};
	this.update=function()
	{
		if(upkey.check())
		{
			if(this.optionTrack>this.choicesStart)
			{
				this.optionTrack--;
			}
		}else if(downkey.check())
		{
			if(this.optionTrack<this.msg.length-1)
			{
				this.optionTrack++;
			}
		}else if(startkey.check())
		{
			//this.response();
			if(this.optionTrack-this.choicesStart===0)
			{
				this.optionOne(this.civil,civs[playerCiv]);
			}else if(this.optionTrack-this.choicesStart==1)
			{
				this.optionTwo(this.civil,civs[playerCiv]);
			}else if(this.optionTrack-this.choicesStart==2)
			{
				this.optionThree(this.civil,civs[playerCiv]);
			}else{
				holdEverything=false;
			}
			this.exists=false;
		}
	};
	this.draw=function(can)
	{
		can.save();
		can.globalAlpha=0.80;
		can.fillStyle = "#DCDCDC";
		var hight=this.msg.length*16;
		can.fillRect(this.x-10,this.y-10,this.width+10,this.height+10+hight);
		
		can.fillStyle = "#483D8B ";
		can.fillRect(this.x,this.y,this.width-10,this.height-10+hight);
		
		can.font = "16pt Calibri";
		can.textAlign = "left";
		can.textBaseline = "middle";
		can.fillStyle = "white";
	/*(	if(this.lines==1){
			can.fillStyle=this.colors[i];
			can.fillText(this.msg[0], this.x+10,this.y+8+(14));
			if((this.options>0) && (this.optionTrack==1))
			{
				can.fillText("-",this.x+5,this.y+8);
			}
		}else*/
		//todo if text is too long put it on next line
		if(this.label)
		{
			can.fillText(this.label,this.x+4,this.y+9);
		}
		for(var i=0;i<this.msg.length;i++)
		{
			//if (i>bConsoleStr.length) {break;}
			can.fillStyle=this.colors[i];
			can.fillText(this.msg[i], this.x+16,this.y+12+(18*(i+1)));
			if((this.options>0) && (this.optionTrack==i))
			{
				can.fillText("-", this.x+17,this.y+12+(18*(i+1)));
			}
		}	
		
		can.restore();
	};
}

function shopItem(type)
{
	this.type=0;
	this.name="crack";
	this.description="Crack!";
	this.item=true;
	this.person=false;
	this.tech=false;
	this.shop=false;
	this.cost=3.50;
	if(type)
	{
		this.type=type;
		if(type==Item.RedShirt)
		{
			this.name="Red Shirt";
			this.description="A fine red shirt.";
		}else if(type==Item.HandPhaser)
		{
			this.name="Hand Phaser";
			this.description="A hand Phaser.";
		}else if(type==Item.PhaserRifle)
		{
			this.name="Phaser Rifle";
			this.description="More powerful than the hand phaser, but lacks the vibrate setting.";
		}else if(type==Item.Tricorder)
		{
			this.name="Tricorder";
			this.description="For Scanning.";
		}else if(type==Item.MedKit)
		{
			this.name="Med Kit";
			this.description="For healin.";
		}else if(type==Item.EmergencyTranspor)
		{
			this.name="Emergency Transporter";
			this.description="That bullshit from Nemisis.";
		}else if(type==Item.Bomb)
		{
			this.name="Bomb";
			this.description="Space Bomb.  For bombing things.";
		}else if(type==Item.PersonalCloak)
		{
			this.name="Personal Cloaking Device";
			this.description="Developed by section 31 in 2285 to allow it's agents to sneak into the ladies locker room.";
		}else if(type==Item.PersonalShield)
		{
			this.name="Personal Shield";
			this.description="Borg technology allows the creation of a personal energy shield..";
		}
	}
	this.num=1;
}

function buyScreen(customer,sell) 
 {  //draws a text box
	this.exists=false;
	this.buying=true;
	this.x=140;
	this.y=170;
	this.scroll=0;
	this.width=600;
	this.customer=customer;
	this.label=false;
	this.height=350;
	this.options=4;
	this.object=null;
	this.total=0;
	this.civil=null;
	this.choicesStart=0;
	this.optionTrack=0;//draw the liitle -
	this.columTrack=0;
	this.colums=2;
	this.colors=[];
	this.msg=[];
	this.itemList=[];
	this.cart=[];
	this.onCheckout=false;
	if(sell)
	{
		this.buying=false;
	}
	this.defaultItemList=function()
	{
		if(this.buying)
		{
			this.itemList.push(new shopItem(Item.RedShirt));
			this.itemList.push(new shopItem(Item.HandPhaser));
			this.itemList.push(new shopItem(Item.PhaserRifle));
			this.itemList.push(new shopItem(Item.Tricorder));
			this.itemList.push(new shopItem(Item.Bomb));
			this.options=4;
		}else
		{
			var q=20;
			if(customer.items.length<20)
			{
				q=customer.items.length;
			}
			for(var i=0;i<q;i++)
			{
				this.itemList.push(customer.items.pop());
			}
		}
	};
	
	this.clearCart=function()
	{
		this.cart=[];
	};
	
	this.checkout=function()
	{
		if(this.buying)
		{
			if(this.total>this.customer.civ.money)
			{
				console.log("Not enough money");
				return;
			}
			this.customer.civ.money-=this.total;
			//this.customer.giveitems(this.itemList);
		}else
		{
			this.customer.civ.money+=this.total;
			console.log("Sold!");
		}
		this.exit();
	};
	this.exit=function(){
		if(!this.buying)
		{
			for(var i=0;i<this.cart.length;i++)
			{
				this.customer.items.push(this.cart[i]);
			}
		}
		this.clearCart();
		this.exists=false;
		holdEverything=false;
	};
	this.addtoCart=function(amt){
		for(var i=0;i<amt;i++)
		{
			this.cart.push(this.itemList[this.optionTrack]);
			if(!this.buying)
			{
				this.itemList.splice(this.optionTrack,1);
			}
		}
	};

	this.addItem=function(it)
	{
		this.itemList.push(it);
		this.options++;
		
	};
	
	this.setup=function()
	{
		this.exists=true;
		holdEverything=true;
		//todo!
	};
	this.update=function()
	{
		if(escapekey.check())
		{
			this.exit();
		}
		if(upkey.check())
		{
			if(this.columTrack===0)
			{
				if(this.optionTrack>this.choicesStart)
				{
					this.optionTrack--;
				}
			}else if(this.columTrack==1)
			{
				if(this.optionTrack>0)
				{
					this.optionTrack--;
				}
			}
		}else if(downkey.check())
		{
			if(this.columTrack===0)
			{
				if(this.optionTrack<this.itemList.length-1)
				{
					this.optionTrack++;
				}
			}else if(this.columTrack==1)
			{
				if(this.optionTrack<this.cart.length-1)
				{
					this.optionTrack++;
				}
			}
		}else if(rightkey.check())
		{
				if(this.columTrack===0)
				{
					if(this.optionTrack>this.cart.length-1)
					{
						this.optionTrack=this.cart.length-1;
					}
				}
				this.columTrack++;
				if(this.columTrack>this.colums)
				{
					this.columTrack=this.colums;
				}
		}else if(leftkey.check())
		{
			if(this.columTrack==1)
			{
				if(this.optionTrack>this.itemList.length-1)
				{
					this.optionTrack=this.itemList.length-1;
				}
			}
			this.columTrack--;
			if(this.columTrack<0)
			{
				this.columTrack=0;
			}
		}else if(startkey.check())
		{
			if(this.columTrack===0)
			{
				if(this.cart.length<20)
				{
					this.addtoCart(1);	
				}else
				{
					
					if(clean)
					{
						console.log("the cart is full.");
					}else
					{	
						console.log("the fucking cart is full.");
					}
				}
			}else if(this.columTrack==1)
			{
				console.log("removed "+this.cart[this.optionTrack].name +" from cart");
				this.cart.splice(this.optionTrack,1);
				this.optionTrack--;				
			}
			else if(this.columTrack==2)
			{
				this.checkout();
			}
			
		}
		this.total=0;
		for(var i=0;i<this.cart.length;i++)
		{
			this.total+=this.cart[i].cost;
		}
	};
	this.draw=function(can)
	{
		//draw user money, items, count, cost, checkout button and maker that it's selected
		can.save();
		
		can.fillStyle = "#DCDCDC";
		var hight=this.itemList.length*16;
		can.fillRect(this.x-10,this.y-10,this.width+10,this.height+10+hight);
		can.globalAlpha=0.80;
		can.fillStyle = "#483D8B ";
		can.fillRect(this.x,this.y,this.width-10,this.height-10+hight);
		
		can.font = "16pt Calibri";
		can.textAlign = "left";
		can.textBaseline = "middle";
		can.fillStyle = "white";
		if(this.buying)
		{
			can.fillText("Shop      Buying",this.x+4,this.y+9);
			can.fillText("Checkout",this.x+480,this.y+395);
		}else
		{
			can.fillText("Shop      Selling",this.x+4,this.y+9);
			can.fillText("Sell",this.x+480,this.y+395);
		}
		can.fillText("Money: $"+this.customer.civ.money,this.x+200,this.y+9);
		can.fillText("Total: $"+this.total,this.x+480,this.y+378);
		
		can.moveTo(this.x+400,this.y);
		can.strokeStyle = "white";
		can.lineWidth = 6;
		can.lineTo(this.x+400,this.y+420);
		can.stroke();
		for(var i=0;i<this.itemList.length;i++)
		{
			//if (i>bConsoleStr.length) {break;}
			//can.fillStyle=this.colors[i];
			can.fillText("    "+this.itemList[i].name, this.x+16,this.y+12+(18*(i+1)));
			
			can.fillText(this.itemList[i].cost, this.x+196,this.y+12+(18*(i+1)));
			if(this.columTrack===0)
			{
				if((this.options>0) && (this.optionTrack==i))
				{
					can.fillText("-", this.x+17,this.y+12+(18*(i+1)));
				}
			}else if(this.columTrack==1)
			{
				if((this.cart.length>0) && (this.optionTrack==i))
				{
					can.fillText("-", this.x+420,this.y+12+(18*(i+1)));
				}
			}else if(this.columTrack==2)
			{
				can.fillText("-", this.x+472,this.y+395);
			}
		}
		can.fillText("Cart:", this.x+410,this.y+9);
		for(var i=0;i<this.cart.length;i++)
		{
			//if (i>bConsoleStr.length) {break;}
			//can.fillStyle=this.colors[i];
			can.fillText("   "+this.cart[i].name, this.x+410,this.y+12+(18*(i+1)));
			if(this.columTrack==1)
			{
				if((this.cart.length>0) && (this.optionTrack==i))
				{
					can.fillText("-", this.x+420,this.y+12+(18*(i+1)));
				}
			}else if(this.columTrack==2)
			{
				can.fillText("-", this.x+472,this.y+395);
			}
		}
		
		can.restore();
	};
}

function timesaver()
{

	civs[1].generateMessage(civs[playerCiv]);
}

var monsta= new particleSystem();

var TileType={};
TileType.Grass=0;
TileType.Plains=1;
TileType.Swamp=2;
TileType.Hills=7;
TileType.Snow=5;
//TileType.DeepSnow=6;
TileType.Mountains=4;
TileType.Water=20;
TileType.Ocean=24;
TileType.Lava=28;
TileType.Forest=3;
TileType.Road=8;
TileType.Sand=9;

var lastEventX=0;
var lastEventY=0;

var selBox=[];
selBox.point1=[];
selBox.point2=[];
selBox.tX=0;
selBox.tY=0;
selBox.exists=false;
selBox.p1=false;
selBox.p2=false;
selBox.width=0;
selBox.height=0;

function drawSelBox(can){
	if(!selBox.exists) {return;}
	if(selBox.p1) {flagsprite.draw(can,selBox.point1.x,selBox.point1.y);}
	var w =selBox.point1.x-selBox.point2.x;
	var h =selBox.point1.y-selBox.point2.y;
	can.strokeStyle="#FFFF00";
	can.lineWidth=1;
	can.beginPath();
	if(!selBox.p2)
	{

		can.moveTo(selBox.point1.x,selBox.point1.y);
		console.log(mX,mY);
		can.lineTo(mX,selBox.point1.y);
		can.lineTo(mX,mY);
		can.lineTo(selBox.point1.x,mY);
		can.lineTo(selBox.point1.x,selBox.point1.y);
	}else
	{
		can.moveTo(selBox.point1.x,selBox.point1.y);
		can.lineTo(selBox.point2.x,selBox.point1.y);
		can.lineTo(selBox.point2.x,selBox.point2.y);
		can.lineTo(selBox.point1.x,selBox.point2.y);
		can.lineTo(selBox.point1.x,selBox.point1.y);
	}
    can.stroke();
	can.closePath();
}
function rectOverlap(r1,r2){
	
	if(r1.x> r2.x+2) {return false;}
	if(r1.x+r1.width< r2.x) {return false;}
	if(r1.y> r2.y+2) {return false;}
	if(r1.y+r1.height< r2.y) {return false;}

	return true;
}

var numMapPoints=6;
var mmcur=false;
var bConsoleStr=[];
var bConsoleClr=[];
var bConsoleBox;
var bMenuBox;
var lastExplosion=0;
var EXPLOSION_RATE=500;
bConsoleStr.push("");
bConsoleStr.push("");
bConsoleStr.push("");
bConsoleStr.push("Game Start!");
bConsoleClr.push("white");
bConsoleClr.push("white");
bConsoleClr.push("white");
bConsoleClr.push("white");
var radarBitmap=[];
var mapBitmap=[];
var CANVAS_WIDTH = 900;
var CANVAS_HEIGHT = 640;
var MUSIC_ON=true;
var MUSIC_VOL=0.1;
var wind=Math.floor(Math.random()*2)+1;
var MAP_WIDTH = 999;
var MAP_HEIGHT = 999;
var CRIT_CHANCE=100;
var FPS = 30;
var LAVA_RATE=2000;
var WATER_RATE=2000;
var BURN_RATE=100;
var CHARANI_RATE= 200;
var SPAWN_X=22;
var SPAWN_Y=19;
var GRAVITY_RATE=5;
var TEAM_SIZE = 12;
var SELECTED=0;
var MSELECTED=0;
var MUSELECTED=0;
var BSELECTED=0;
var NUM_STATUS=5;
var NUM_CLASSES=19;
var ENCOUNTER_RATE=25000;
var TAME_CHANCE=40;
var preBattle=0;
var preBattleLength=100;
var MAPNAME ="map3";
var pageCount=0;
var cardUsed=false;
var gamespeed=0;//2;
var isBattle=false;
var isMenu=0;
var battlelength=15;
var combatants=new Array(2);
var battledelay=10;
var battletick=0;
var battleenddelay=10;
var battleendtick=0;
var numMaps=5;
var mapSelected=0;
var winmode=0;
var mode=0;
var looseX=0;
var looseY=0;
var mapDirty=true;
var mmcur=true;
var victoryCount=0;
var victoryLap=200;
var victoryReport=200;
var victoryReporting=false;
var victory=false;
var projectionCount=0;
var projectionLength=200;
//var keychart = ["w","a","d","s","up","right","down","left","m","n","shift"];
var names= new Array (2);
names[0]=new Array(120);
names[1]=new Array(120);
var mX=120;
var mY=320;
var townnames=new Array(40);
townnames= ["Qarth","Meereen","Myr","Pentos","Ashford","Ashemark","Gulltown","Pyke","Lordsport","Lannisport","Lys","Tyrosh","Iben","New Ghis","Astapor","Yunkai","Qohor","Lorath","Volantis","Braavos","Vaes Dothrak","White Harbor","Maidenpool","Oldstones","Harrenhal","Riverrun","Seaguard","Winterfell","Saltpans","Castamere","Oxcross","Crakehall","The Crag","Duskendale","Dragonstone","Rosby","Highgarden","Oldtown","Grimston","Hardhome"];
tname=new Array(5);

tname[0]=["Last Hearth","Deepwood Motte","Karhold","Tohhren's Square","Barrowton","Hornwood","White Harbor","Castle Black"];
tname[1]=["Flint's Finger","Moat Cailin","Seaguard","Oldstones"];
tname[2]=["Fairmarket","Stoney Sept","High Heart","Acorn hall","Pinkmaiden"];
tname[3]=["Maidenpool","Duskendale","Brindlewood", "Crackclaw Point"];
tname[4]=["Blackmont","Kingsgrave","Wyl","Yornwood","Godsgrace","Saltshore","Lemonwood"];
names[0]= ["Eddard", "Theon","Bealor", "Aerys", "Aemon", "Aemond", "Fletcher Dick", "Beardless Dick", "Valarr", "Hot Pie", "Lommy", "Jon", "Matarys", "Dunk", "Egg", "Aerion","Bran","Bronn","Robb","Tyrion","Jamie","Tywin","Jeor","Jorah","Mero","Stannis","Gendrey","Yoren","Rickard","Drogo","Brandon","Gregor","Sandor","Polliver","Allister","Barristan","Jeoffery","Robert","Symon","Dolorous Edd","Podrick","Renly","Illyn","Aurane","Regular Ed","Merret","Walder","HODOR","Luwin","Cressen","Janos","Tytos","Garion","Willas","Garlan","Viserys","Loras","Willem","Martyn","Illyrio","Xaro Xhoan Ducksauce","Cleon","Aegon","Emmon","Skahaz","Cleos","Tygett","Vargo","Pono","Nimble Dick","Iron Emmett","Mance","Tormund","Varamyr","Orell","Jaquen","Wease","The Tickler","Dareon","Morroqo","Marwyn","Pate","Davos","Axel","Wyman","Pyter","Varys","Arnolf","Sigorn","Hoster","Tion","Helman","Torrhen","Yohn","Lyn","Nestor","Doran","Oberyn","Qyburn","Howland","Daario","Xhondo","Yellow Dick","Zachery","Zekko","Zollo","Will","Willbert","Wendel","Wendamyr","The Weeper","Wat","Walton","Vardis","Urrigon","Ulmer","Tobho","Timett","Syrio","Styr"];
names[1]= ["Alysane", "Lyra", "Naerys", "Pia", "Lynesse", "Maege", "Rhaenyra", "Kyra", "Rhae", "Tanselle", "Daena", "Elaena", "Myriah", "Aelinor","Arya","Sansa","Shae","Meera","Mina","Gilly","Ygritte","Ami","Cersei","Tanda","Lollys","Mya","Alayne","Myrcella","Lyanna","Lemore","Jayne","Talisa","Ros","Margery", "Catlyen", "Brienne", "Olenna", "Roslin", "Lysa", "Taena","Senelle","Falyse","Barra","Bella","Joanna","Joy","Janei","Dorna","Ashara","Allyria","Asha","Osha","Rhonda","Rhea","Alerie","Alysanne","Malora","Daenerys","Irri","Rhaella","Ellia","Illyrio","Quaithe", "Missandei", "Shireen","Mezzara","Kezmya","Qezza","Jhezene","Miklaz","Arianne","Shella","Mellario","Obara","Nymeria","Tyene","Obella","Dorea","Loreza","Myranda","Thistle","Alannys","Alla ","Alia","Alyce","Minisa","Meris","Wenda","Anya","Doreah","Horma","Weasel","Tysha","Sarella","Maggi","Jenny","Barbrey","Bethany","Wylla","Leona","Alys","Amarei","Old Nan","Yna","Ysilla","Victaria","Visenya","Val","The Waif","Tya","Tysane","Tansey","Talla","Taela","Squirrel","Shiera","Sharna","Scolera","Sarra","Sallei","S'vrone","Rhea","Rhialta"];
var namesused=new Array(2);
namesused[0]=new Array(120);
namesused[1]=new Array(120);
for( var i=0; i<120; i++ ){ namesused[0][i]=false;namesused[1][i]=false; }

var titlesprite = Sprite("title");

var RGB_THRESHOLD=15;

var explosionsprite=new Array(4);
explosionsprite[0] =Sprite("explosion0");
explosionsprite[1] =Sprite("explosion1");
explosionsprite[2] =Sprite("explosion2");
explosionsprite[3] =Sprite("explosion3");

var numClouds=44;


var tileani=0;
  
 


var anicount=0;
var anirate=4000;
var lastani=0;
var gotall=false;
var BATTLE_REPORT_LENGTH=400;
var numsounds=0;
var soundsplaying ="";
var timestamp = new Date(); 
var milliseconds = timestamp.getTime();
var lasttime=0;
var enemyDeployCount=1;
var deployRate=200;
var battlespeed=100;
var battleRate=2;
var paused=false;
var mappause=false;
var battleReport=false;
var battlePause=false;
var unitinfo=false;
var lastClick=0;
var dblClickRate=350;
var healcount=0;
var healrate=140;
//var numTowns=6;
var CSELECTED=0;
var maps=new Array(6);
var mapIconWidth=32;
var mapIconHeight=45;

