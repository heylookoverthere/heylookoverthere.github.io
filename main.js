var debugInfo=true;
var editMode=false;
var drawingPath=false;
var bullshitHack=true; //right click to link doors
var existingDungeons=new Array();
var countIndex=0;

var bulbsprite=Sprite("bulb");
var bulboffsprite=Sprite("bulboff");

document.getElementById("mainSong").addEventListener('ended', function() { //loops music
	this.currentTime = 0;
	this.play();
    }, false);


	
if(checkMobile())
{
	MobileMode=true;
	yOffset= 15;
}else
{
	MobileMode=false;
}
if(checkXbox())
{
	Xbox=true;
	customConsole=false;
	OPTIONS.musicOn=true;
	OPTIONS.LightingOn=false;
	milesFree=false;
}
	
	//document.addEventListener('touchmove', handleTouchMove, false);
	//document.concanvasElement.addEventListener('touchmove', handleTouchMove, false);
var xDown = null;                                                        
var yDown = null;                                                        
var downSince=new Date().getTime();	
var downLast=new Date().getTime();	



function handleTouchStart(evt) {  
	//evt.preventDefault();         
    downSince=new Date().getTime();	
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};
function handleConTouchStart(evt) {  
	evt.preventDefault(); 
		xDown = evt.touches[0].clientX;                                      
		yDown = evt.touches[0].clientY;    
		var now=new Date().getTime();
	
			
		if(now-downLast<OPTIONS.DoubleTapThreshold)
		{
			if(mode==0)
			{
	
			}else if(mode==1)
			{
				curDungeon.mapFloor=curDungeon.roomZ;
				mode=2;
				playSound("map");
			}else if (mode==2)
			{
				mode=1;
			}
		}else
		{
			//bConsoleBox.log("single tap on console");
		}
	
    downLast=new Date().getTime();	
                                
};
function handleTouchEnd(evt) {  
	//evt.preventDefault();   
	xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;  	
	var now=new Date().getTime();
	if(now-downSince>OPTIONS.HoldTime)
	{
		//held
		//console.log("held touch");
	}else
	{
		//single
	}	
    	
                                       
};                                             

function handleTouchMove(evt) {
	evt.preventDefault();
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

	toux=Math.floor((xUp-xOffset)/32);// * Math.pow(2, 1);//curMap.zoom-1);
	touy=Math.floor((yUp-yOffset)/32);
	
	if((Math.abs(xDiff)<75) &&(Math.abs(yDiff)<75) || (!OPTIONS.EnableSwipes))
	{
		return;
	}else
	{
	if(mode==0)
	{
	
	}else if(mode==1)
	{
		if((editMode) && (false)) //+edit mode create rooms
		{
			if ( Math.abs( xDiff ) > Math.abs( yDiff ) )
			{
				if ( xDiff > 0 ) 
				{
					/* left swipe */ 
					if(curDungeon.roomX>0)
					{
						if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX-1][curDungeon.roomY].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX-1,curDungeon.roomY)))
						{
							//curDungeon.curRoom().addDoor(3)
							//curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX-1][curDungeon.roomY].addDoor(1);
							curDungeon.smartAddDoor(1,6,3);
							editor.clearConfirm();
							editor.penDown=false;
							curDungeon.changeRoom(3,!editMode);
						}
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				} else 
				{
					/* right swipe */
					if(curDungeon.roomX<curDungeon.getWidth()-1)
					{
						if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX+1][curDungeon.roomY].active)|| (curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX+1,curDungeon.roomY)))
						{
							curDungeon.smartAddDoor(18,6,1);
							editor.clearConfirm();
							editor.penDown=false;
							curDungeon.changeRoom(1,!editMode);
						}
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				}                       
			} else //up or down swipe
			{
				if ( yDiff > 0 )
				{
					/* up swipe */ 
					if(curDungeon.roomY>0)
					{
						if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY-1].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY-1)))
						{
							curDungeon.smartAddDoor(8,1,0);
							editor.clearConfirm();
							editor.penDown=false;
							curDungeon.changeRoom(0,!editMode);
						}
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				} else 
				{ 
					/* down swipe */
					if(curDungeon.roomY<curDungeon.getHeight()-1)
					{
						if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY+1].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY+1)))
						{
							curDungeon.smartAddDoor(8,13,2);
							editor.clearConfirm();
							editor.penDown=false;
							curDungeon.changeRoom(2,!editMode);
						}
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				} 
			}
		}else if(editMode)
		{	
			if ( Math.abs( xDiff ) > Math.abs( yDiff ) )
			{
				if ( xDiff > 0 ) 
				{
					/* left swipe */ 
					if(curDungeon.roomX>0)
					{
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(3,!editMode);
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				} else 
				{
					/* right swipe */
					if(curDungeon.roomX<curDungeon.getWidth()-1)
					{
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(1,!editMode);
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}   
				}
			} else 
			{
				if ( yDiff > 0 )
				{
					/* up swipe */ 
					if(curDungeon.roomY>0)
					{
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(0,!editMode);
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				} else
				{ 
					/* down swipe */
					if(curDungeon.roomY<curDungeon.getHeight()-1)
					{
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(2,!editMode);
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				}
			}
		}else if(!editMode)
		{
			if ( Math.abs( xDiff ) > Math.abs( yDiff ) )
			{
				if ( xDiff > 0 ) 
				{
					/* left swipe */ 
					if(curDungeon.roomX>0)
					{
						if(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX-1][curDungeon.roomY].active) 
						{
							editor.clearConfirm();
							editor.penDown=false;
							curDungeon.changeRoom(3,!editMode);
						}
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				} else 
				{
					/* right swipe */
					if(curDungeon.roomX<curDungeon.getWidth()-1)
					{
						if(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX+1][curDungeon.roomY].active)
						{
							
							editor.clearConfirm();
							editor.penDown=false;
							curDungeon.changeRoom(1,!editMode);
						}
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}                      
				}
			} else 
			{
				if ( yDiff > 0 )
				{
					/* up swipe */ 
					if(curDungeon.roomY>0)
					{
						if(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY-1].active) 
						{
							editor.clearConfirm();
							editor.penDown=false;
							curDungeon.changeRoom(0,!editMode);
						}
					}else
					{
						bConsoleBox.log("Can't go off the map");
					}
				} else
				{ 
					/* down swipe */
					if(curDungeon.roomY<curDungeon.getHeight()-1)
					{
						if(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY+1].active)
						{
							editor.clearConfirm();
							editor.penDown=false;
							curDungeon.changeRoom(2,!editMode);
						}else
						{
							bConsoleBox.log("Can't go off the map");
						}
					}
				}
			}
		}
	}else if(mode==2)
	{
		if ( Math.abs( xDiff ) > Math.abs( yDiff ) )
			{
				if ( xDiff > 0 ) 
				{
					/* left swipe */ 
					
				} else 
				{
					/* right swipe */
					
				}
			} else 
			{
				if ( yDiff > 0 )
				{
					/* up swipe */ 
					curDungeon.mapFloor--;
					if(curDungeon.mapFloor<0)
					{
						curDungeon.mapFloor=0;
					}
				} else
				{ 
					/* down swipe */
					curDungeon.mapFloor++;
					if(curDungeon.mapFloor>curDungeon.floors-1)
					{
						curDungeon.mapFloor=curDungeon.floors-1;
					}
				}
			}
	}
	}
    /* reset values */
    xDown = null;
    yDown = null;                                             
};	
	
var gameOver=null;

var editor=new editCursor();

function logControls()
{

	bConsoleBox.log("CONTROLS:","yellow");
	bConsoleBox.log("Arrow Keys - Move room");
	bConsoleBox.log("Page Up/Down - Move floors");
	bConsoleBox.log("Shift + Arrow/Page keys - Make or connect room in that direction");
	bConsoleBox.log("W A S D - Move cursor");
	bConsoleBox.log("Shift + W A S D - Remove door");
	bConsoleBox.log("Delete - If an object is grabbed, deletes that object. Otherwise delete room");
	bConsoleBox.log("Shift + Delete - Delete floor");
	bConsoleBox.log("Insert - Create Room");
	bConsoleBox.log("0 - Toggle hidden room");
	bConsoleBox.log("Tab - Change selected tile/door");
	bConsoleBox.log("O - Options");
	bConsoleBox.log("F - Fill entire floor");
	bConsoleBox.log("Q  - Cycle edit modes");
	bConsoleBox.log("M  - Toggle sound");
	bConsoleBox.log("K  - Save floor");
	bConsoleBox.log("L  - Load floor");
	bConsoleBox.log("I  - Save room");
	bConsoleBox.log("T  - Load room");
	bConsoleBox.log("U  - Save copy of dungeon");
	bConsoleBox.log("C  - Copy room");
	bConsoleBox.log("R  - Random prefab room");
	//bConsoleBox.log("Shift+R  - Randomize objects");
	bConsoleBox.log("Shift + C  - Copy room sans doors");
	bConsoleBox.log("P  - Paste room");
	bConsoleBox.log("Space - Set Tile/Pen Down/Fill/Place Door");
	bConsoleBox.log("Left Click  - Place");
	bConsoleBox.log("Right Click  - Change mode/grab object");
	bConsoleBox.log("Mouse Wheel  - Change selected");
	bConsoleBox.log("B - Draw path between player and cursor");
	bConsoleBox.log("G  - Show map");
	//bConsoleBox.log("Z - Undo");
	bConsoleBox.log("Hit E to leave edit mode");
}

bConsoleBox=new textbox();
bConsoleBox.width=300;
bConsoleBox.height=CANVAS_HEIGHT-12;
bConsoleBox.exists=true;
bConsoleBox.log("Loading...");
if(checkMobile())
{
	bConsoleBox.log("Mobile Version");
	MobileMode=true;
}else if(checkXbox())
{
	bConsoleBox.log("Xbox Version");
	MobileMode=false;
	Xbox=true;
	OPTIONS.LightingOn=false;
	bConsoleBox.numLines=36;
	milesFree=false;
}else if(checkPSX())
{
	bConsoleBox.log("Playstation 4 Version");
	MobileMode=false;
	Xbox=true;
	OPTIONS.LightingOn=false;
	bConsoleBox.numLines=36;
	milesFree=false;
}else {
	bConsoleBox.log("Desktop Version");
	MobileMode=false;
}

bConsoleBox.y=18;
bConsoleBox.x=18;
bConsoleBox.lines=4;

var dungname="testmap";




var curDungeon= new dungeon(dungname);

var showMap=false;

var buttonX=156;

var buttons=new Array();
var timy=new button();
timy.text="Edit";
timy.x=56;
timy.y=677;
timy.height=17;
if(MobileMode)
{
	timy.height=32;
}
timy.exists=true;
timy.shiftable=false;
timy.visible=true;
timy.update=function()
{	
	if(editMode)
	{
		this.text="Play";
		
	}else
	{
		this.text="Edit";
	}
	if(this.hasFocus)
	{
		//holdInput=true;
			
			if(startkey.check())
			{
				this.doThings();
				//somehow order ship to move there.
			}
	}
}
timy.doThings=function()
{
	editMode=!editMode;
	editor.penDown=false;
	editor.clearConfirm();
	if(editMode)
	{
		curDungeon.hasEdited=true;
		this.text="Play";
	}else
	{
		this.text="Edit";
		curDungeon.roomZ=miles.room.z;
		curDungeon.roomY=miles.room.y;
		curDungeon.roomX=miles.room.x;
	}
}

buttons.push(timy);

//console.log(navigator.userAgent);
function checkMobile()
 { 
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ){
		return true;
	  }
	 else {
		return false;
	  }
}

function checkXbox()
 { 
	 if( navigator.userAgent.match(/Xbox One/i))
	 {
		return true;
	  }
	 else
	 {
		return false;
	  }
}

function checkPSX()
 { 
	 if( navigator.userAgent.match(/Playstation/i))
	 {
		return true;
	  }
	 else if( navigator.userAgent.match(/Playstation 4/i))
	 {
		return true;
	  }else
	 {
		return false;
	  }
}

var timy=new button();
timy.text="Save";
timy.x=188;
timy.y=10;
timy.height=22;
timy.exists=true;
timy.shiftable=false;
timy.visible=true;
timy.update=function()
{	
	if(editMode)
	{
		this.visible=true;
		
	}else
	{
		this.visible=false;;
	}
	if(this.hasFocus)
	{
		//holdInput=true;
			
			if(startkey.check())
			{
				this.doThings();
				//somehow order ship to move there.
			}
	}
}
timy.doThings=function()
{
	/*if(bullshitHack)
	{
		bConsoleBox.log("Right click to link switches first, or data may be lost.","yellow");
		return;
	}*/
	bConsoleBox.log("Saving dungeon. Existing data will be overwritten. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			curDungeon.save();
		}
		if(OPTIONS.confirmationPopUps)
		{
			popQuestion("Saving dungeon. Existing data will be overwritten. Confirm? (Y/N)");
		}
	
}
buttons.push(timy);

var timy=new button();
timy.text="Load";
timy.x=188;
timy.y=41;
timy.height=22;
timy.exists=true;
timy.shiftable=false;
timy.visible=true;
timy.update=function()
{	
	if((editMode) && (curDungeon.saveExists))
	{
		this.visible=true;
		
	}else
	{
		this.visible=false;;
	}
	if(this.hasFocus)
	{
		//holdInput=true;
			
			if(startkey.check())
			{
				this.doThings();
				//somehow order ship to move there.
			}
	}
}
timy.doThings=function()
{
	//return;
	editor.penDown=false;
	bConsoleBox.log("Loading dungeon from disk. Unsaved data will be overwritten. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			countIndex=existingDungeons.indexOf(curDungeon.name);
			//console.log(LOAD_COUNTS[countIndex]);
			curDungeon.load();
			editor.penDown=false;
			//console.log(LOAD_COUNTS[countIndex]);
			resetMiles();
			function checkIfLoaded() 
			{ 
				if (LOAD_COUNTS[countIndex] == 0)
				{ 
					actuallyStartGame();
				}else if((LOAD_COUNTS[countIndex]<0) && (!Xbox))
				{
					bConsoleBox.log("Load_Counts problem! Reload page.","yellow");
				}else			
				{ 
					//console.log("waiting for load count to be 0");
					window.setTimeout(checkIfLoaded, 1000); 
				}
			}
			checkIfLoaded();

		}
		if(OPTIONS.confirmationPopUps)
		{
			popQuestion("Loading dungeon from disk. Unsaved data will be overwritten. Confirm? (Y/N)");
		}
	
}
buttons.push(timy);

var timy=new button();
timy.text="Exit";
timy.x=94;
timy.y=677;
timy.height=17;
if(MobileMode)
{
	timy.height=32;
}
timy.exists=true;
timy.shiftable=false;
timy.visible=true;
timy.update=function()
{	
	if(editMode)
	{
		this.text="Mode";
		
	}else
	{
		this.text="Exit";
	}
	if(this.hasFocus)
	{
		//holdInput=true;
			
			if(startkey.check())
			{
				this.doThings();
				//somehow order ship to move there.
			}
	}
}
timy.doThings=function()
{
	editor.penDown=false;
	if(editMode)
	{
		editor.mode++;
		editor.penDown=false;
		if(editor.mode>editor.numModes)
		{
			editor.mode=0;
		}
	}else
	{
		var plk=new Date().getTime();
		if(curDungeon.lastSaved)
		{
			var mlk=plk-curDungeon.lastSaved.getTime();
			mlk=mlk/1000;
			mlk=mlk/60;
			if(mlk>59)
			{
				mlk=(Math.round((mlk/60)*10)/10)+" hours ago.";
			}else if(mlk<1)
			{
				mlk="less than a minute ago. ";
			}else
			{
				mlk=Math.round(mlk*10)/10+" minutes ago.";
			}
		}else
		{
			var mlk="never.";
		}
		bConsoleBox.log("Returning to main menu. Unsaved changes will be lost. Last saved "+mlk+" Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			
			$.post("/listdir/", {"path": "C:/JS/Dungeon/dungeons/"}, function(resp)
			 {
				tempExistingDungeons=resp.split(",");
				tempExistingDungeons.splice(0,1);
				
				for(var i=0;i<tempExistingDungeons.length;i++)
				{
					if(i%2)
					{
						LOAD_COUNTS.push(tempExistingDungeons[i]);
					}else
					{
						existingDungeons.push(tempExistingDungeons[i]);
					}
				}
				 
				// var index=existingDungeons.indexOf(curDungeon.name);
				//LOAD_COUNTS[index]=curDungeon.numRooms;
				curDungeon.cleanSlate();
			 } 
			 )
			//bullshitHack=true;
			mode=0;
			document.getElementById("mainSong").pause();
		}
		if(OPTIONS.confirmationPopUps)
		{
			popQuestion("Returning to main menu. Unsaved changes will be lost. Last saved "+mlk+" Confirm? (Y/N)","yellow");
		}
	}
}

buttons.push(timy);


var timy=new button();
timy.text="Help";
timy.x=18;
timy.y=677;
timy.height=17;
if(MobileMode)
{
	timy.height=32;
}
timy.exists=true;
timy.shiftable=false;
timy.visible=true;
timy.doThings=function()
{
	if((this.shiftable) && (shiftdown))
	{
		logControls();
	}else
	{
		var blex="Walk around with the controller or WASD. Try to find the tri-force" 
		if(editMode)
		{
			if(editor.mode==editModes.Pen)
			{
				blex="Pen mode is pretty self explanatory. Click or press space to put the pen down or pick it up again. Then move the cursor and it will paint the tiles. It's quick, but imprecise. Some special tiles cannot be painted, like stairs.";
			}else if(editor.mode==editModes.Stamp)
			{
				blex="Stamp mode lets you place individual tiles by clicking or pressing space." ;
			}else if(editor.mode==editModes.Fill)
			{
				blex="Fill mode works like the paintbucket tool in MSPaint. Not to be confused with the fill all function, that sets all floor tiles to the selected tile (activated by hitting f)"
			}else if(editor.mode==editModes.Door)
			{
				blex="Door mode. Place a door of the selected type. A matching door in the adjacent room will be created if possible. Watch out for overlapping doors! Doors can be removed in any mode with Shift + W,A,S,D. Be warned it removes the oldest door on the indicated wall, you don't get to choose. " 
			}else if(editor.mode==editModes.Objects)
			{
				blex="Object mode. Click or hit space to place the selected object. Click an existing object to edit it's special properties (if applicable). Right click an object to pick it up and again to put it down in a new location. (Because right click has been re-purposed in this mode, you'll have to use Q to change edit modes.) Delete kill will delete a currently grabbed object."
			}else if(editor.mode==editModes.BuriedObjects)
			{
				blex="Buried object mode. Just like object mode but for burying things."
			}else if(editor.mode==editModes.CopyArea)
			{
				blex="Copy Area mode. I have enabled this yet, so I don't know how you're seeing this message! I'm not sure if this is even a thing that is needed. Maybe make it selection/delete mode instead, and then you can delete what's selected? ";
			}else if(editor.mode==editModes.SwitchLink)
			{
				blex="Switch linking mode. May eventually become anything linking mode. But for now click a switch in object mode and then click any door or staircase to link them. (the staircase will become hidden, and only appear when the switch is activated.) There's no way to unlink at the moment, and the links aren't saved and loaded yet.";
			}else if(editor.mode==editModes.ChestLoot)
			{
				blex="Chest contents mode. Click a chest to fill it with the selected loot.";
			}
		}
	}
	var mancy=new textbox();
	mancy.setup();
	mancy.x=200;
	mancy.y=200;
	mancy.textLim=104;
	mancy.log(blex);
	mancy.hasFocus=true;
	buttons.push(mancy);
	
}
buttons.push(timy);
if(!Xbox)
{
var touchshiftkey=new akey("shift");
var controlskey= new akey("j");

var SNESAKey=new akey("down");
var SNESXKey=new akey("left");
var SNESYKey=new akey("right");
var SNESBKey=new akey("up");
var SNESRKey=new akey("shift");
var SNESLKey=new akey("/");

var SNESUpKey=new akey("w");
var SNESDownKey=new akey("s");
var SNESLeftKey=new akey("a");
var SNESRightKey=new akey("d");
/*var timy=new button();
timy.text="North";
timy.x=200-buttonX;
timy.y=640;
timy.exists=true;
timy.shiftable=true;
timy.visible=true;
timy.doThings=function()
{
	if((this.shiftable) && (shiftdown))
	{
		if(curDungeon.roomY>0)
		{
			if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY-1].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY-1)))
			{
				curDungeon.smartAddDoor(8,1,0);
				editor.clearConfirm();
				editor.penDown=false;
				curDungeon.changeRoom(0,!editMode);
			}
		}else{
			bConsoleBox.log("Can't go off the map");
		}
	}else
	{
		curDungeon.changeRoom(0,!editMode);
	}
}



buttons.push(timy);
timy=new button();
timy.text="South";
timy.x=200-buttonX;
timy.y=680;
timy.exists=true;
timy.shiftable=true;
timy.visible=true;
timy.doThings=function()
{
	if((this.shiftable) && (shiftdown))
	{
		if(curDungeon.roomY<curDungeon.getHeight()-1)
		{
			if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY+1].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY+1)))
			{
				curDungeon.smartAddDoor(8,13,2);
				editor.clearConfirm();
				editor.penDown=false;
				curDungeon.changeRoom(2,!editMode);
			}
		}else
		{
			bConsoleBox.log("Can't go off the map");
		}
	}else
	{
		curDungeon.changeRoom(2,!editMode);
	}
}
buttons.push(timy);
timy=new button();
timy.text="East";
timy.x=235-buttonX;
timy.y=660;
timy.exists=true;
timy.shiftable=true;
timy.visible=true;
timy.doThings=function()
{
	if((this.shiftable) && (shiftdown))
	{
		if(curDungeon.roomX<curDungeon.getWidth()-1)
		{
			if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX+1][curDungeon.roomY].active)|| (curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX+1,curDungeon.roomY)))
			{
				curDungeon.smartAddDoor(18,6,1);
				editor.clearConfirm();
				editor.penDown=false;
				curDungeon.changeRoom(1,!editMode);
			}
		}else{
			bConsoleBox.log("Can't go off the map");
		}
	}else
	{
		curDungeon.changeRoom(1,!editMode);
	}
}
buttons.push(timy);
timy=new button();
timy.text="West";
timy.x=165-buttonX;
timy.y=660;
timy.exists=true;
timy.shiftable=true;
timy.visible=true;
timy.doThings=function()
{
	if((this.shiftable) && (shiftdown))
	{
		if(curDungeon.roomX>0)
		{
			if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX-1][curDungeon.roomY].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX-1,curDungeon.roomY)))
			{
				//curDungeon.curRoom().addDoor(3)
				//curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX-1][curDungeon.roomY].addDoor(1);
				curDungeon.smartAddDoor(1,6,3);
				editor.clearConfirm();
				editor.penDown=false;
				curDungeon.changeRoom(3,!editMode);
			}
		}else
		{
			bConsoleBox.log("Can't go off the map");
		}
	}else{
		curDungeon.changeRoom(3,!editMode);
	}
}
buttons.push(timy);
timy=new button();
timy.text="Up";
timy.x=270-buttonX;
timy.y=640;
timy.exists=true;
timy.shiftable=true;
timy.visible=true;
timy.doThings=function()
{
	if((this.shiftable) && (shiftdown))
	{
		if(curDungeon.roomZ<curDungeon.floors-1)
			{
				if((curDungeon.rooms[curDungeon.roomZ+1][curDungeon.roomX][curDungeon.roomY].active) ||(curDungeon.createRoom(curDungeon.roomZ+1,curDungeon.roomX,curDungeon.roomY)))
				{
					curDungeon.smartAddStair(editor.x,editor.y,true);
					editor.clearConfirm();
					editor.penDown=false;
					curDungeon.changeFloor(true,!editMode,miles);
				}
			}else
			{
				//bConsoleBox.log("Can't go off the map");
				bConsoleBox.log("Will create new floor. Confirm? (Y/N)","yellow");
				editor.confirming=true;
				editor.confirmingWhat=function() {
					curDungeon.addFloor();
					bConsoleBox.log("New floor created");
				}
				if(OPTIONS.confirmationPopUps)
				{
					popQuestion("Will create new floor. Confirm? (Y/N)");
				}
			}
	}else
	{
		curDungeon.changeFloor(true,!editMode,miles);
	}
}
buttons.push(timy);
timy=new button();
timy.text="Down";
timy.x=270-buttonX;
timy.y=680;
timy.exists=true;
timy.shiftable=true;
timy.visible=true;
timy.doThings=function()
{
	if((this.shiftable) && (shiftdown))
	{
		if(curDungeon.roomZ>0)
		{
			if((curDungeon.rooms[curDungeon.roomZ-1][curDungeon.roomX][curDungeon.roomY].active) ||(curDungeon.createRoom(curDungeon.roomZ-1,curDungeon.roomX,curDungeon.roomY)))
			{
				curDungeon.smartAddStair(editor.x,editor.y,false);
				editor.clearConfirm();
				editor.penDown=false;
				curDungeon.changeFloor(false,!editMode,miles);
			}
		}else
		{
			bConsoleBox.log("Can't go off the map");
		}
	}else
	{
		curDungeon.changeFloor(false,!editMode,miles);
	}
}
buttons.push(timy);
*/
}
//lights.push(new light(7092,3748,14));
//lights.push(new light(7208,3777,14));

var upkey=new akey("up");
var downkey=new akey("down");
var deletekey=new akey("del");
var helpkey=letterkeys[7].check()
var insertkey=new akey("insert");
var tabkey=new akey("tab");
var fillkey=letterkeys[5];
var modekey=new akey("q");
var undokey=new akey("z");
var editkey=new akey("e");
var yeskey=new akey("y");
var nokey=new akey("n");
var controlkey=new akey("cntrl");
var copykey=new akey("c");
var pastekey=new akey("p");
var savefloorkey = new akey("k");
var loadfloorkey = new akey("l");
var mutekey= new akey("m");
var soundkey= new akey("f");
var randomkey= new akey("r");
var mapkey=new akey("g");
var saveaskey=new akey("u");


var miles= new entity(null,true,"entities/link/");

miles.name="Miles";

entities.push(miles);
theParty.add(miles);


function resetMiles()
{
	gameOver=false;
	miles.alive=true;
	miles.equippedTrack=0;
	miles.equippedTrack2=0;
	miles.dashing=false;
	miles.reallyDashing=false;
	miles.poking=false;
	miles.grabbed=null;
	miles.fallingY=0;
	miles.xSmall=0;
	miles.ySmall=0;
	miles.xv=0;
	miles.xa=0;
	miles.yv=0;
	miles.ya=0;
	miles.inventory=new Array();
	miles.inventoryAmounts=new Array();
	var meeee=new Object;
	meeee.type=ObjectID.PotStand;
	meeee.sprite=nullSprite;
	miles.inventory.push(meeee);
	miles.inventoryAmounts.push(1);
	miles.maxHp=100;
	miles.deathAniTrack=0;
	miles.aniCount=0;
	miles.hp=miles.maxHp;
	miles.dir=0;
	miles.wallet=250;
	miles.money=0;
	miles.bombs=0;
	miles.arrows=0;
	miles.x=9;
	miles.y=12;
	miles.enteredX=miles.x;
	miles.enteredY=miles.y;
	miles.canSwim=false;
	for(var i=0;i<miles.has.length;i++)
	{
		miles.has[i]=false;
	}
}

var Krugman=new entity(null,false,"entities/krugman/");
Krugman.AI=0;
Krugman.x=3;
Krugman.y=11;
Krugman.enteredX=Krugman.x;
Krugman.enteredY=Krugman.y;
Krugman.walkSpeed=6;
Krugman.tracking=miles;
Krugman.canSwim=true;
Krugman.lastWords="Avenge...me...";
Krugman.textBank.push("Oh thank god! I've been stuck down here for days! We have to find a way out!");
Krugman.textSaid.push(false);
var lop=function(){return true;}
Krugman.textConditions.push(lop);
Krugman.textBank.push("My name is Paul Krugman. I am a respected economist. I shat in that bucket over there.");
Krugman.textSaid.push(false);
lop=function(){return true;}
Krugman.textConditions.push(lop);
Krugman.textBank.push("Paul Ryan pushed me down a well and I found myself here.");
Krugman.textSaid.push(false);
lop=function(){return true;}
Krugman.textConditions.push(lop);
Krugman.textBank.push("Lead on, I have no idea where to go.");
Krugman.textSaid.push(false);
lop=function(){return true;}
Krugman.textConditions.push(lop);

Krugman.textBank.push("Now that it's no longer just you and me, I feel like we should establish some clear protocols regarding cannibalism. Namely that we eat the other guy first. Whenever you're ready. I skipped lunch. ");
Krugman.textSaid.push(false);
lop=function()
{
	if(theParty.members.length>2)
	{
		return true;
	}
	return false;	
}
Krugman.textConditions.push(lop);

Krugman.getOffChest=2;
Krugman.chatterBank.push("Supply side economics, and so forth.");
Krugman.chatterBank.push("I was in a movie! Do you have movies in this world?");
Krugman.chatterBank.push("I'll get that Paul Ryan if it's the last thing I do!");
Krugman.chatterBank.push("Beware the foe who uses Voodo-Economics.");
Krugman.chatterBank.push("I've been stuck in this world for over a month now. I really hope I can get back to Earth by July 19th. That's when my album is dropping");
Krugman.chatterBank.push("We're going to need to find at least 240 rupees to cover our losses on this expedition. Most of that will go towards buying a new intern. But if we find a little extra maybe we can get hats!");
if(!OPTIONS.SafeMode)
{
	Krugman.chatterBank.push("Hey, what do you guys call a Cleveland Steamer in this world?");
	Krugman.chatterBank.push("Do you ever stop and wonder how many whales the ocean has? I don't, cause I'm Paul Fucking Krugman. They fucking told me how many whales the ocean has. It's six. ");
}
Krugman.chatterBank.push("You can increase your liquidity by selling your extra bombs and arrows!");
Krugman.chatterBank.push("It is dangerous to go alone. Take this full-term life insurance policy.");// It indemnifies against suicide after three floors!");
Krugman.chatterBank.push("If an enemy proves especially difficult, aim for the reverse-mortgage. ");
Krugman.chatterBank.push("You may not know who I am, but I promise you that your dad loves my shit.")
Krugman.chatterBank.push("I'm Paul Krugman, and I have exhausted my list of things I know about myself.")
Krugman.chatterBank.push("I really hope we get out of here soon. I need to refill my prescription. You may not have noticed, but I suffer from Blurry Face Syndrome.")
Krugman.chatterBank.push("Not a lot of people know this, but I had fourteen confirmed kills in Vietnam. It's not something I talk about a lot. Mostly because I got them in the late 90's.");//, long after such pursuits had gone out of style.")

Krugman.name="Krugman";

Krugman.room=curDungeon.curRoom();
entities.push(Krugman);

Krugman.autoJoin=true;
//theParty.add(Krugman);

var nancy=new entity(null,false,"entities/professor/");
nancy.AI=0;
nancy.x=5;
nancy.y=6;
nancy.dir=2;
nancy.enteredX=nancy.x;
nancy.enteredY=nancy.y;

nancy.walkSpeed=6;
nancy.tracking=miles;
nancy.canSwim=true; 
nancy.autoJoin=true;
nancy.textBank.push("Oh, somebody else unfortunate enough to have fallen down here. I suppose we should find a way out.");
lop=function(){return true;}
nancy.textConditions.push(lop);
nancy.textSaid.push(false);
nancy.textBank.push("My name is Nancy. I am a professor at the local university. Despite my vast knowledge I must say I find myself totally lost. I suppose I'll follow you!");
lop=function(){return true;}
nancy.textConditions.push(lop);
nancy.textSaid.push(false);
//nancy.textBank.push("Let me know if you find a restroom. By the way I wouldn't recommend breaking that pot in the corner where I was trapped...");
//nancy.textSaid.push(false);
nancy.textBank.push("Lead on, I have no idea where to go.");
lop=function(){return true;}
nancy.textConditions.push(lop);
nancy.textSaid.push(false);
nancy.getOffChest=2;
nancy.chatterBank.push("In my youth I was a popular children's aardvark. Then...there was some unpleasantness. I'd rather not talk about it.");
nancy.chatterBank.push("Did you hear that!?");
//nancy.chatterBank.push("Let me know if you find a restroom. By the way I wouldn't recommend breaking that pot in the corner where I was trapped...");
nancy.chatterBank.push("It is said that in the far east there lives an elephant who never forgets...TO KILL.");
nancy.chatterBank.push("Do you ever stop and wonder how many whales the ocean has?");
nancy.chatterBank.push("Sometimes at night I look up at the stars and wonder about the nature of outer space. Surely there must be a poorly programmed adventure awaiting us up there, if only we could reach it.")
//nancy.chatterBank.push("My butt itches.");
nancy.chatterBank.push("I came here because I heard this dungeon housed great treasure. ...Triforce? No, I never heard of that. I'm here for the legendary Arybs Horsey Sauce recipe.");
nancy.chatterBank.push("It is said that at the far northern border of the known world, there exists a magnificent wall of ice."); 
nancy.chatterBank.push("While serious historians question if the Asparagus Emperor ever truly existed, he is revered as a god-king to this day by the people of Beoropolis");
nancy.chatterBank.push("One of the few fragments of The Chronicles of the Bear-kings known to exist in the west resides in the Library of Meullos. I have had the fortune of viewing it. It speaks of a legendary artifact known as Ed's Shovel.");
nancy.chatterBank.push("Archaeology tells us frustratingly little about civilizations that did not yet have the written word. The earliest written records know to exist are no more than 2000 years old, their meanings mostly lost to time. ")
nancy.chatterBank.push("Many of my colleges subscribe to the theory that the earliest human civilizations were wiped out around 22,000 years ago, in an as of yet unexplained extinction event. In fact there are those in the scientific community who claim there have been multiple extinction events, but their theories are without evidence and conveniently unprovable. ") //eventually this time should randomize slightly and change with time. the idea is it's when the NES cart battery died in the late 90's, in miliseconds. 
if(!OPTIONS.SafeMode)
{
	nancy.chatterBank.push("Back in town I am a known homosexual.");
	nancy.chatterBank.push("You have to sleep sometime!");
	nancy.chatterBank.push("have you ever seen an aardvark penis?");
	nancy.chatterBank.push("Don't touch me. Nothing gives you that right.");
	nancy.chatterBank.push("I wrote a poem for you, would you like to hear it? Roses are red / Violets are blue / I'm wearing sweatpants / To conceal my erection.");
	nancy.chatterBank.push("I'm the reason this game has a 'safe mode' option.");
}
nancy.room=curDungeon.rooms[7][7][7];
nancy.name="Nancy";

entities.push(nancy);


miles.x=9;
miles.y=12;

miles.task="wandering aimlessly";


function popQuestion(question)
{
	playSound("menucursor");
	var mancy=new textbox();
	mancy.setup();
	mancy.x=200;
	mancy.y=200;
	mancy.unClickable=true;
	/*mancy.optionTrack=1;
	mancy.options=2;*/
	mancy.textLim=104;
	mancy.log(question);
	/*mancy.log(" ");
	mancy.log("    No");
	mancy.log("    Yes");*/
	mancy.hasFocus=true;
	mancy.update=function(){
		if(!editor.confirming)
		{this.exists=false;}
	}
	
	buttons.push(mancy);
	
	
	var pancn=new button();
	pancn.text="  NO";
	pancn.x=mancy.x+170;
	pancn.y=mancy.y+27;
	pancn.height=29;
	pancn.width=50;
	pancn.exists=true;
	pancn.shiftable=false;
	pancn.visible=true;
	pancn.hasParent=true;
	pancn.parent=mancy;
	pancn.doThings=function()
	{
		if(editor.confirming)
		{
			playSound("menucancel");
			editor.confirming=false;
			bConsoleBox.log("No","Yellow");
		}
		this.parent.exists=false;
		this.exists=false;
	};
	
	buttons.push(pancn);
	
	pancn=new button();
	pancn.text="  Yes";
	pancn.x=mancy.x+100;
	pancn.y=mancy.y+27;
	pancn.height=29;
	pancn.width=50;
	pancn.exists=true;
	pancn.shiftable=false;
	pancn.visible=true;
	pancn.hasParent=true;
	pancn.parent=mancy;
	pancn.doThings=function()
	{
		if(editor.confirming)
		{
			playSound("menuselect");
			editor.confirmed=true;
			editor.confirming=false;
			editor.confirmingWhat();
			editor.confirmingWhat=null;
			bConsoleBox.log("Yes","Yellow");
		}
		this.parent.exists=false;
		this.exists=false;
	};
	buttons.push(pancn);
	
}




//camera.center(miles);

//camera.tileX=1472;
//camera.tileY=3360;

document.body.addEventListener("click", mouseClick, false);
document.body.addEventListener("dblclick", mouseDblClick, false);
document.body.addEventListener("mousewheel",mouseWheel,false);
document.body.addEventListener("DOMMouseScroll", mouseWheel, false);


//-----------------------------------------------


requestAnimationFrame = window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame || 
                        window.webkitRequestAnimationFrame || 
                        window.msRequestAnimationFrame || 
                        setTimeout; 


var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
var canvas = canvasElement.get(0).getContext("2d");

/*var radarElement = $("<canvas width='" + MAP_WIDTH + "' height='" + MAP_HEIGHT + "'></canvas");
var radarCanvas = radarElement.get(0).getContext("2d");*/

var mapCanvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
var mapCanvas = mapCanvasElement.get(0).getContext("2d");

var concanvasElement = $("<canvas width='" + 290 + "' height='" + CANVAS_HEIGHT + "'></canvas");
var concanvas = concanvasElement.get(0).getContext("2d");

concanvasElement.css("position", "absolute").css("z-index", "3").css("top", canvasElement.position().top).css("left", CANVAS_WIDTH);
concanvasElement.appendTo('body');


mapCanvasElement.css("position", "absolute").css("z-index", "1").css("top", canvasElement.position().top).css("left", canvasElement.position().left);
mapCanvasElement.appendTo('body');

canvasElement.css("position", "absolute").css("z-index", "2");
canvasElement.appendTo('body');
canvasElement.css("position", "absolute").css("z-index", "2").css("top", canvasElement.position().top).css("left", canvasElement.position().left);
canvasElement.get(0).addEventListener("mousemove", mouseXY, false);
if(MobileMode)
{	
	canvasElement.get(0).addEventListener('touchstart', handleTouchStart, false);   
	canvasElement.get(0).addEventListener('touchend', handleTouchEnd, false);   
	concanvasElement.get(0).addEventListener('touchmove', handleTouchMove, false);
	concanvasElement.get(0).addEventListener('touchstart', handleConTouchStart, false); 
}
if(false)
{
	//var controller = navigator.getGamepads()[0];
}else
{
	var gamepadSupportAvailable = !!navigator.getGamepads || !!navigator.webkitGamepads;

	var gamepad = navigator.getGamepads && navigator.getGamepads()[0];


	window.addEventListener("GamepadConnected", function(e) {
	  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
	  e.gamepad.index, e.gamepad.id,
	  e.gamepad.buttons.length, e.gamepad.axes.length);
	});

	window.addEventListener("GamepadDisconnected", function(e) {
	  console.log("Gamepad disconnected from index %d: %s",
	  e.gamepad.index, e.gamepad.id);
	});

	controller= new virtualGamePad();
}
var savekey=new akey("i"); //define the different keys
var loadkey=new akey("t");
var optionskey=new akey("o");
var inventorykey=new akey("v");
var shiftkey=new akey("shift");

var LOAD_COUNTS=new Array();
var gamestart=false;
var radar=true;
//var sortedExistingDungeons=new Array();


$.post("/listdir/", {"path": "C:/JS/Dungeon/dungeons/"}, function(resp)
 {
	var tempExistingDungeons=resp.split(",");
	tempExistingDungeons.splice(0,1);
	for(var i=0;i<tempExistingDungeons.length;i++)
	{
		if(i%2)
		{
			LOAD_COUNTS.push(tempExistingDungeons[i]);
		}else
		{
			existingDungeons.push(tempExistingDungeons[i]);
		}
	}
 } 
 )
 

 var showNancyInfo=false;
 
 

function drawGUI(can)
{
	if(editMode)
	{
		can.globalAlpha=0.75;
		can.fillStyle="white";
		can.fillRect(2,2,228,68);
		can.fillStyle="blue";
		can.fillRect(6,6,221,60);
		can.fillStyle="yellow";
		can.fillText(curDungeon.name + " "+curDungeon.numRooms+" rooms",8,22);
		can.fillText("Floor: "+curDungeon.roomZ+"/"+(curDungeon.floors-1),8,44);
	
		can.fillText("Room: "+curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name,8,62);
		can.fillStyle="white";
		if(showNancyInfo)
		{
				var surd="";
			if(nancy.going)
			{
				surd+=" Going";
			}
			can.fillRect(500,2,390,68);
			can.fillStyle="blue";
			can.fillRect(504,6,383,60);
			can.fillStyle="white";
			can.fillText("Nancy: "+nancy.status,508,24);
			can.fillText("Floor: "+nancy.room.z+" "+"RoomX: "+nancy.room.x+" RoomY: "+nancy.room.y+surd,508,48);
			
		}
		if(!curDungeon.curRoom().lampLighting)
		{
			bulbsprite.draw(can,812,110);
		}else
		{
			bulboffsprite.draw(can,812,110);
		}
		var cont=0;
		can.globalAlpha=1;
	}else
	{	can.globalAlpha=1;
		drawHearts(miles,can);
		objectSprites[ObjectID.Key][0].draw(can,-6,58);
		can.fillText("x"+miles.keys,18,85);
		moneysprite.draw(can,84,58);
		can.fillText("x"+miles.money,84+24,85);
		bombsprite.draw(can,42,58);
		can.fillText("x"+miles.bombs,42+24,85);
		arrowsprite.draw(can,62,90);
		can.fillText("x"+miles.arrows,62+24,117);
		
		can.fillStyle="white";
		can.fillText("Magic:",2,120);
		can.globalAlpha=0.75;
		can.fillRect(4,128,138,14);
		can.fillStyle="black";
		can.fillRect(8,130,130,10);
		can.fillStyle="green";
		var percent=miles.mp/miles.maxMp*130;
		canvas.fillRect(8,130,percent,10);
		if(showNancyInfo)
		{
			/*var surd="";
			if(nancy.going)
			{
				surd+=" Going "+nancy.destX+","+nancy.destY;
			}
			can.fillStyle="white";
			can.fillRect(500,2,390,68);
			can.fillStyle="blue";
			can.fillRect(504,6,383,60);
			can.fillStyle="white";
			can.fillText("Nancy: "+nancy.status,508,24);
			can.fillText("Floor: "+nancy.room.z+" "+"RoomX: "+nancy.room.x+" RoomY: "+nancy.room.y+surd,508,48);*/
			can.fillStyle="white";
			can.fillRect(500,2,390,68);
			can.fillStyle="blue";
			can.fillRect(504,6,383,60);
			can.fillStyle="white";
			can.fillText("Miles pos: "+miles.x+","+miles.y,508,24);
			can.fillText("Floor: "+miles.room.z+" "+"RoomX: "+miles.room.x+" RoomY: "+miles.room.y,508,48);
			can.fillText("last: "+miles.lastX+","+miles.lastY+" entered: "+miles.enteredX+","+miles.enteredY,508,64);
		}
		can.globalAlpha=1;
		can.fillStyle="white";
		can.fillRect(808,105,40,40);
		can.fillRect(808,56,40,40);
		can.fillStyle="black";
		can.fillRect(812,109,32,32);
		can.fillRect(812,60,32,32);
		if((!Xbox) && (!controller.pad))
		{
			can.save();
			can.fillStyle="white";
			var jam=miles.getContext();
			if(jam)
			{
				arrowkeysprite[2].draw(can,2,620);
				can.fillText(jam,42,644);
			}
			arrowkeysprite[1].draw(can,760,60);
			arrowkeysprite[3].draw(can,760,110);
			can.restore();
			if(miles.has[hasID.Sword])
			{
				can.save();
				can.font = "30pt Calibri";
				can.fillStyle="white";
				arrowkeysprite[0].draw(can,760,10);
				
				can.restore();
				can.fillStyle="white";
				can.fillRect(808,6,40,40);
				can.fillStyle="black";
				can.fillRect(812,9,32,32);
				if(miles.has[hasID.MasterSword])
				{
					objectSprites[ObjectID.MasterSword][0].draw(can,812,8);
				}else
				{
					objectSprites[ObjectID.Sword][0].draw(can,812,8);
				}
			}
		}else if (Xbox)
		{
			xboxxsprite.draw(can,760,60);
			xboxysprite.draw(can,760,110);
			can.fillStyle="white";
			var jam=miles.getContext();
			if(jam)
			{
				xboxbsprite.draw(can,2,620);
				can.fillText(jam,42,644);
			}
			if(miles.has[hasID.Sword])
			{
				xboxasprite.draw(can,760,10);
				can.fillStyle="white";
				can.fillRect(808,6,40,40);
				can.fillStyle="black";
				can.fillRect(812,9,32,32);
				if(miles.has[hasID.MasterSword])
				{
					objectSprites[ObjectID.MasterSword][0].draw(can,812,8);
				}else
				{
					objectSprites[ObjectID.Sword][0].draw(can,812,8);
				}
			}
		}else
		{
			can.fillStyle="white";
			var jam=miles.getContext();
			if(jam)
			{
				xboxasprite.draw(can,2,620);
				can.fillText(jam,42,644);
			}
			if(miles.has[hasID.Sword])
			{
				xboxbsprite.draw(can,760,10);
				can.fillStyle="white";
				can.fillRect(808,6,40,40);
				can.fillStyle="black";
				can.fillRect(812,9,32,32);
				if(miles.has[hasID.MasterSword])
				{
					objectSprites[ObjectID.MasterSword][0].draw(can,812,8);
				}else
				{
					objectSprites[ObjectID.Sword][0].draw(can,812,8);
				}
			}
			xboxysprite.draw(can,760,60);
			xboxxsprite.draw(can,760,110);
		}
		if(miles.equippedTrack>0)
		{
			//miles.equippedSprites[miles.equippedTrack].draw(can,812,80);
			var nep=miles.getUsableInventory();
			//console.log(nep[miles.equippedTrack]);
			nep[miles.equippedTrack].sprites[0].draw(can,812,60);
			can.fillStyle="white";
			if(!miles.inventory[miles.equippedTrack].singular)//miles.inventoryAmounts[miles.equippedTrack]>1)
			{
				can.fillText("x"+miles.inventoryAmounts[miles.equippedTrack],849,80);
			}
		}
		if(miles.equippedTrack2>0)
		{
			//miles.equippedSprites[miles.equippedTrack].draw(can,812,80);
			var nep=miles.getUsableInventory();
			//console.log(nep[miles.equippedTrack]);
			nep[miles.equippedTrack2].sprites[0].draw(can,812,109);
			can.fillStyle="white";
			if(!miles.inventory[miles.equippedTrack2].singular)
			{
				can.fillText("x"+miles.inventoryAmounts[miles.equippedTrack2],849,135);
			}
		}
	}
}

function convertSaves() //no effin clue if this will work. I suspect not. 
{
	for(var i=0;i<existingDungeons.length;i++)
	{
		curDungeon.name=existingDungeos[i];
		curDungeon.load();
		curDungeon.save();
	}
}

function copyDungeon()
{
	var lordCromp=prompt("Enter new dungeon name");
	if(lordCromp==null) {return;}
	while (!acceptableName(lordCromp,false))
	{
		lordCromp=prompt("Try again.");
		if(lordCromp==null) {return;}
	}
	curDungeon.saveExists=false;
	if(curDungeon.name)
	{
		curDungeon.save();	
	}
}


function showMapList()
{
	bConsoleBox.log("Existing Maps:","yellow");
	for(var i=0;i<existingDungeons.length;i++)
	{
		bConsoleBox.log(existingDungeons[i]+" - "+LOAD_COUNTS[i]+ " rooms");
	}
}

function drawDebug(can)
{
	if(!debugInfo) {return;}
	can.globalAlpha=0.75;
	can.fillStyle="blue";
	canvas.fillRect(672,6,221,90);
	can.fillStyle="yellow";
	can.fillText("Particles: "+monsta.particles.length,675,25);
	can.fillText("Gamespeed: "+gameSpeed,675,41);
	can.fillText("FPS:"+FPS,675,57);//+camera.x+","+camera.y,25,57);
	can.globalAlpha=1;
}

function merp() {
requestAnimationFrame(merp,canvas);

FPS=countFPS();
	if(mode==0){
		mainMenuUpdate();
		mainMenuDraw();
	}else if(mode==1){
		mainUpdate();
		mainDraw();	
	}else if(mode==2){
		mapUpdate();
		mapDraw();
	}else if(mode==3){
		optionsUpdate();
		optionsDraw();
	}else if(mode==4){
		inventoryUpdate();
		inventoryDraw();
	}else if(mode==5){
		controlsUpdate();
		controlsDraw();
	}
	//canvas.beginPath();
	//osCanvas.drawImage(canvasElement,0,0);
}




/*document.getElementById("myAudio").addEventListener('ended', function() { //loops music
    this.currentTime = 0;
    this.play();
}, false);*/

function menuDraw()
{
	return;
    battletick++;
    //canvas.save();
    canvas.globalAlpha=0.80;
    canvas.fillStyle =  "#DCDCDC";
    canvas.fillRect(25,95,850,500);
    canvas.fillStyle =bColors[6];//Math.floor(Math.random()*5)];// "#483D8B ";
    canvas.fillRect(40,110,820,470);
    //canvas.restore();
	canvas.globalAlpha=1;
    canvas.font = "14pt Calibri";
    canvas.textAlign = "left";
    canvas.textBaseline = "middle";
    
}

function mainMenuDraw(){
	canvas.fillStyle = "black";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	titlesprite.draw(canvas,0,0);
	canvas.fillStyle = "white";
	canvas.font = "16pt Calibri";
	//canvas.fillText("Press Enter",200,500);
	canvas.fillText("  New Map",80,210);
	//canvas.fillStyle = "grey";
	canvas.fillText("  Load Map",80,235);
	
	canvas.fillText("  View Map List",80,260);

	if(mmcur==0){
		canvas.fillText("-",78,210);
	}else if(mmcur==1)	{
		canvas.fillText("-",78,235);

	}else if(mmcur==2)	{
		canvas.fillText("-",78,260);
	}
	if(isLoading)
	{
		canvas.fillText("LOADING . . .",478,660);
	}
	if(bConsoleBox.exists)
	{
		bConsoleBox.draw(concanvas);
	}
	//monsta.draw(canvas,camera);
	//canvas.fillText("Particles: "+ monsta.particles.length,460,550);
};

function inventoryUpdate()
{
	controller.update();
	if((escapekey.check()))
	{
		mode=1;
		playSound("unpause");
	}
	
	if((inventorykey.check()) || ((Xbox) && (controller.Xcheck(11))) || ((!Xbox) && (controller.pad) && (controller.buttons[SNESKey.Start].check())))
	{
		mode=1;
		playSound("unpause");
	}
	if(miles.has[hasID.Map])
	{
		if(((Xbox) && (controller.pad) && (controller.Xcheck(10))) || ((!Xbox)&& (controller.pad) && (controller.buttons[SNESKey.Select].check())))
		{
			mode=2;
		}
	}
	if(upkey.check())
	{
		
	}
	if(downkey.check())
	{
		
	}
		
}
function inventoryDraw() {
	//SHOULDN'T
	canvas.fillStyle = "black";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

	if(floorDirty)
	{
		curDungeon.draw(mapCanvas,camera);
		floorDirty=false;
	}
	var xFset=164;
	var yFset=35;
	canvas.fillStyle="white";
	canvas.fillRect(xFset-8,yFset-28,558,754);
	canvas.fillRect(xFset+556,yFset+200,128,250);
	canvas.fillRect(22,yFset+200,128,250);
	if((miles.has[hasID.Map]) || (miles.has[hasID.Compass]))
	{
		canvas.fillRect(xFset+556,yFset+460,128,70);
	}
	canvas.fillStyle="blue";
	canvas.fillRect(xFset-4,yFset-24,548,744);
	canvas.fillRect(xFset+560,yFset+204,120,240);
	canvas.fillRect(26,yFset+204,120,240);
	if((miles.has[hasID.Map]) || (miles.has[hasID.Compass]))
	{
		canvas.fillRect(xFset+560,yFset+464,120,60);
	}
	canvas.font = "20pt Calibri";
	canvas.fillStyle="white";
	canvas.fillText("Inventory ",xFset+200,yFset+20-6);
	var thelist=new Array();
	if(miles.has[hasID.Bomb])
	{
		var shinex=new object();
		shinex.type=ObjectID.Bomb;
		if(miles.has[hasID.SuperBomb])
		{
			shinex.type=ObjectID.SuperBomb;
		}
		shinex.setup();
		thelist.push(shinex);
		
	}if(miles.has[hasID.Bow])
	{
		var shinex=new object();
		shinex.type=ObjectID.Bow;
		shinex.setup();
		thelist.push(shinex);
		
	}if(miles.has[hasID.Feather])
	{
		var shinex=new object();
		shinex.type=ObjectID.Feather;
		shinex.setup();
		thelist.push(shinex);
	}if(miles.hasItem(ObjectID.Mirror))
	{
		var shinex=new object();
		shinex.type=ObjectID.Mirror;
		shinex.setup();
		thelist.push(shinex);
	}if(miles.has[hasID.MagicBoomerang])
	{
		var shinex=new object();
		shinex.type=ObjectID.MagicBoomerang;
		shinex.setup();
		thelist.push(shinex);
	}else if(miles.has[hasID.Boomerang])
	{
		var shinex=new object();
		shinex.type=ObjectID.Boomerang;
		shinex.setup();
		thelist.push(shinex);
	}if(miles.has[hasID.Hookshot])
	{
		var shinex=new object();
		shinex.type=ObjectID.Hookshot;
		shinex.setup();
		thelist.push(shinex);
	}if(miles.hasItem(ObjectID.Shovel))
	{
		var shinex=new object();
		shinex.type=ObjectID.Shovel;
		shinex.setup();
		thelist.push(shinex);
	}if(miles.has[hasID.Lantern])
	{
		var shinex=new object();
		shinex.type=ObjectID.Lantern;
		shinex.setup();
		thelist.push(shinex);
	}if(miles.has[hasID.Hammer])
	{
		var shinex=new object();
		shinex.type=ObjectID.Hammer;
		shinex.setup();
		thelist.push(shinex);
	}if(miles.has[hasID.Flippers])
	{
		var shinex=new object();
		shinex.type=ObjectID.Flippers;
		shinex.setup();
		thelist.push(shinex);
	}if(miles.has[hasID.Lens])
	{
		var shinex=new object();
		shinex.type=ObjectID.Lens;
		shinex.setup();
		thelist.push(shinex);
	}if(miles.has[hasID.Boots])
	{
		var shinex=new object();
		shinex.type=ObjectID.Boots;
		shinex.setup();
		thelist.push(shinex);
	}if(miles.has[hasID.Glove])
	{
		var shinex=new object();
		shinex.type=ObjectID.Glove;
		shinex.setup();
		thelist.push(shinex);
	}if(miles.hasItem(ObjectID.Poo))
	{
		var shinex=new object();
		shinex.type=ObjectID.Poo;
		shinex.setup();
		thelist.push(shinex);
	}if(miles.hasItem(ObjectID.Cane))
	{
		var shinex=new object();
		shinex.type=ObjectID.Cane;
		shinex.setup();
		thelist.push(shinex);
	}
	if(miles.hasItem(ObjectID.Cape))
	{
		var shinex=new object();
		shinex.type=ObjectID.Cape;
		shinex.setup();
		thelist.push(shinex);
	}if(miles.hasItem(ObjectID.FireRod))
	{
		var shinex=new object();
		shinex.type=ObjectID.FireRod;
		shinex.setup();
		thelist.push(shinex);
	}
	if(miles.hasItem(ObjectID.IceRod))
	{
		var shinex=new object();
		shinex.type=ObjectID.IceRod;
		shinex.setup();
		thelist.push(shinex);
	}/*if(miles.has[hasID.Map])
	{
		var shinex=new object();
		shinex.type=ObjectID.Map;
		shinex.setup();
		thelist.push(shinex);
	}
	if(miles.has[hasID.Compass])
	{
		var shinex=new object();
		shinex.type=ObjectID.Compass;
		shinex.setup();
		thelist.push(shinex);
	}*/
	
	for(var i=0;i<thelist.length;i++)
	{
		if(i%2==0)
		{
			objectSprites[thelist[i].type][0].draw(canvas,xFset+100,yFset+75*((i+1)/2)-6+25);
			canvas.fillText(thelist[i].name,xFset+50,yFset+75*((i+1)/2)-6+79);
			if((thelist[i].type==ObjectID.Bomb) ||(thelist[i].type==ObjectID.SuperBomb))
			{
				canvas.font = "12pt Calibri";
				canvas.fillText(miles.bombs+"/"+miles.maxBombs,xFset+110,yFset+75*((i+1)/2)-6+60);
				canvas.font = "20pt Calibri";
			}
			if(thelist[i].type==ObjectID.Bow)
			{
				canvas.font = "12pt Calibri";
				canvas.fillText(miles.arrows+"/"+miles.maxArrows,xFset+110,yFset+75*((i)/2)-6+60);
				canvas.font = "20pt Calibri";
			}
		}else
		{
			objectSprites[thelist[i].type][0].draw(canvas,xFset+350,yFset+75*((i)/2)-6+25);
			canvas.fillText(thelist[i].name,xFset+300,yFset+75*((i)/2)-6+79);
			if((thelist[i].type==ObjectID.Bomb) ||(thelist[i].type==ObjectID.SuperBomb))
			{
				canvas.font = "12pt Calibri";
				canvas.fillText(miles.bombs+"/"+miles.maxBombs,xFset+360,yFset+75*((i+1)/2)-6+60);
				canvas.font = "20pt Calibri";
			}
			if(thelist[i].type==ObjectID.Bow)
			{
				canvas.font = "12pt Calibri";
				canvas.fillText(miles.arrows+"/"+miles.maxArrows,xFset+360,yFset+75*((i)/2)-6+60);
				canvas.font = "20pt Calibri";
			}
		}
	}

	objectSprites[ObjectID.Gold][0].draw(canvas,607,19);
		canvas.font = "12pt Calibri";
		canvas.fillText("x"+miles.money+"/"+miles.wallet,637,42);
		canvas.font = "20pt Calibri";
	
	if(miles.shells>0)
	{
		objectSprites[ObjectID.Shell][0].draw(canvas,607,53);
		canvas.font = "12pt Calibri";
		canvas.fillText("x"+miles.shells,637,75);
		canvas.font = "20pt Calibri";
	}
		if(miles.has[hasID.PendantPower])
		{
			objectSprites[ObjectID.PendantPower][0].draw(canvas,28,yFset+210);
			canvas.font = "10pt Calibri";
			canvas.fillText("+sword damage",56,yFset+235);
			canvas.font = "20pt Calibri";
			
		}

		if(miles.has[hasID.PendantWisdom])
		{
		
			objectSprites[ObjectID.PendantWisdom][0].draw(canvas,28,yFset+260);
			canvas.font = "10pt Calibri";
			canvas.fillText("Magic regen",57,yFset+285);
			canvas.font = "20pt Calibri";
	
		}
		if(miles.has[hasID.PendantSwiftness])
		{
			objectSprites[ObjectID.PendantSwiftness][0].draw(canvas,28,yFset+310);
			canvas.font = "10pt Calibri";
			canvas.fillText("Move faster",57,yFset+335);
			canvas.font = "20pt Calibri";
		}
		if(miles.has[hasID.PendantFour])
		{
		
			objectSprites[ObjectID.PendantFour][0].draw(canvas,28,yFset+360);
			canvas.font = "10pt Calibri";
			canvas.fillText("?????",57,yFset+385);
			canvas.font = "20pt Calibri";
	
		}
		if(miles.has[hasID.PendantSwiftness])
		{
			objectSprites[ObjectID.PendantFive][0].draw(canvas,28,yFset+410);
			canvas.font = "10pt Calibri";
			canvas.fillText("????",57,yFset+435);
			canvas.font = "20pt Calibri";
		}

		objectSprites[ObjectID.BluePotion][0].draw(canvas,xFset+560,yFset+225);
		canvas.font = "12pt Calibri";
		canvas.fillText("x"+miles.getItemAmt(ObjectID.BluePotion),xFset+592,yFset+250);
		canvas.font = "20pt Calibri";

		objectSprites[ObjectID.RedPotion][0].draw(canvas,xFset+560,yFset+275);
		canvas.font = "12pt Calibri";
		canvas.fillText("x"+miles.getItemAmt(ObjectID.RedPotion),xFset+592,yFset+300);
		canvas.font = "20pt Calibri";
	
		objectSprites[ObjectID.GreenPotion][0].draw(canvas,xFset+620,yFset+225);
		canvas.font = "12pt Calibri";
		canvas.fillText("x"+miles.getItemAmt(ObjectID.GreenPotion),xFset+652,yFset+250);
		canvas.font = "20pt Calibri";

		objectSprites[ObjectID.PurplePotion][0].draw(canvas,xFset+620,yFset+275);
		canvas.font = "12pt Calibri";
		canvas.fillText("x"+miles.getItemAmt(ObjectID.PurplePotion),xFset+652,yFset+300);
		canvas.font = "20pt Calibri";
	
		if(miles.has[hasID.BestShield])
		{
			objectSprites[ObjectID.BestShield][0].draw(canvas,xFset+590,yFset+380);
		}else if(miles.has[hasID.BetterShield])
		{
			objectSprites[ObjectID.BetterShield][0].draw(canvas,xFset+590,yFset+380);
		}else if(miles.has[hasID.Shield])
		{
			objectSprites[ObjectID.Shield][0].draw(canvas,xFset+590,yFset+380);
		}
		
		if(miles.has[hasID.MasterSword])
		{
			objectSprites[ObjectID.MasterSword][0].draw(canvas,xFset+632,yFset+380);
		}else if(miles.has[hasID.Sword])
		{
			objectSprites[ObjectID.Sword][0].draw(canvas,xFset+632,yFset+380);
		}
		
		if(miles.has[hasID.Map])
		{
			objectSprites[ObjectID.Map][0].draw(canvas,xFset+590,yFset+476);
		}
		if(miles.has[hasID.Compass])
		{
			objectSprites[ObjectID.Compass][0].draw(canvas,xFset+632,yFset+476);
		}
	
	//canvas.fillText("14) Bombs set off other bombs: "+OPTIONS.ChainingExplosions,xFset+15,yFset+400-6);



	
}
function controlsUpdate()
{
	controller.update();
	if((escapekey.check()))
	{
		mode=1;
		playSound("unpause");
	}

	if(((!Xbox) && (controlskey.check())) || ((Xbox) && (controller.Xcheck(13))) || ((!Xbox) && (controller.buttons[SNESKey.Start].check())))
	{
		mode=1;
		playSound("unpause");
	}
	if(miles.has[hasID.Map])
	{
		if(((Xbox) && (controller.pad) && (controller.Xcheck(10))) || ((!Xbox) && (controller.buttons[SNESKey.Select].check())))
		{
			mode=2;
		}
	}
	if(upkey.check())
	{
		
	}
	if(downkey.check())
	{
		
	}
		
}
function controlsDraw() {
	//SHOULDN'T
	canvas.fillStyle = "black";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

	curDungeon.draw(canvas,camera);
	var xFset=160;
	var yFset=35;
	canvas.fillStyle="white";
	canvas.fillRect(xFset-8,yFset-28,558,754);
	canvas.fillStyle="blue";
	canvas.fillRect(xFset-4,yFset-24,548,744);
	canvas.font = "20pt Calibri";
	canvas.fillStyle="white";
	canvas.fillText("Controls: ",xFset+150,yFset+12-6);
	

	if(Xbox)
	{
		canvas.fillText("Sword: ",xFset+60,yFset+64-6);
		canvas.fillText("Item1: ",xFset+60,yFset+100-6);
		canvas.fillText("Item2: ",xFset+60,yFset+138-6);
		canvas.fillText("Talk: ",xFset+60,yFset+174-6);
		canvas.fillText("Change item1: ",xFset+60,yFset+208-6);
		canvas.fillText("Change item2: ",xFset+60,yFset+242-6);
		canvas.fillText("Aim: ",xFset+60,yFset+272-6);
		//canvas.fillText("???: ",xFset+60,yFset+306-6);
		canvas.fillText("Map: ",xFset+60,yFset+306-6);
		canvas.fillText("Inventory: ",xFset+60,yFset+340-6);
		canvas.fillText("Toggle Console: ",xFset+60,yFset+396-6);
		xboxasprite.draw(canvas,xFset+360,yFset+28);
		xboxxsprite.draw(canvas,xFset+360,yFset+66);
		xboxysprite.draw(canvas,xFset+360,yFset+102);
		xboxbsprite.draw(canvas,xFset+360,yFset+138);
		xboxrtsprite.draw(canvas,xFset+360,yFset+174);
		xboxltsprite.draw(canvas,xFset+360,yFset+208);
		xboxlbsprite.draw(canvas,xFset+360,yFset+236);
		xboxlcsprite.draw(canvas,xFset+360,yFset+266);
		xboxrcsprite.draw(canvas,xFset+360,yFset+306);
		xboxdpadupsprite.draw(canvas,xFset+360,yFset+364);
	}else if(controller.pad)
	{
		canvas.fillText("Sword: ",xFset+60,yFset+64-6);
		canvas.fillText("Item1: ",xFset+60,yFset+100-6);
		canvas.fillText("Item2: ",xFset+60,yFset+138-6);
		canvas.fillText("Talk: ",xFset+60,yFset+174-6);
		canvas.fillText("Change item1: ",xFset+60,yFset+208-6);
		canvas.fillText("Change item2: ",xFset+60,yFset+242-6);
		canvas.fillText("Aim: ",xFset+60,yFset+272-6);
		//canvas.fillText("???: ",xFset+60,yFset+306-6);
		canvas.fillText("Map: ",xFset+60,yFset+306-6);
		canvas.fillText("Inventory: ",xFset+60,yFset+340-6);
		//canvas.fillText("Toggle Console: ",xFset+60,yFset+406-6);
		xboxbsprite.draw(canvas,xFset+360,yFset+28);
		xboxxsprite.draw(canvas,xFset+360,yFset+66);
		xboxysprite.draw(canvas,xFset+360,yFset+102);
		xboxasprite.draw(canvas,xFset+360,yFset+138);
		xboxrbsprite.draw(canvas,xFset+360,yFset+174);
		xboxrbsprite.draw(canvas,xFset+360,yFset+208);
		xboxxsprite.draw(canvas,xFset+415,yFset+172);
		xboxysprite.draw(canvas,xFset+415,yFset+206);
		canvas.fillText("+",xFset+400,yFset+202);
		canvas.fillText("+",xFset+400,yFset+230);
		xboxlbsprite.draw(canvas,xFset+360,yFset+236);
		canvas.fillText("Select",xFset+375,yFset+300);
		canvas.fillText("Start",xFset+375,yFset+334);
		//xboxlbsprite.draw(canvas,xFset+360,yFset+266);
		//xboxdpadupsprite.draw(canvas,xFset+360,yFset+374);
	}else //keyboard
	{
	
	}

	

}
var bannedchars=new Array();
bannedchars.push("/");
//bannedchars.push();
bannedchars.push("!");
bannedchars.push("@");
bannedchars.push("#");
bannedchars.push("$");
bannedchars.push("%");
bannedchars.push("^");
bannedchars.push("&");
bannedchars.push("*");
bannedchars.push("(");
bannedchars.push(")");
bannedchars.push(".");
bannedchars.push(";");
bannedchars.push("'");
bannedchars.push(",");
bannedchars.push("/");


function acceptableName(attempt,ld)
{
	//check for illegal characters, used names
	if(attempt==null) {return true;}
	if(attempt.length<1) {return false;}
	for(var i=0;i<bannedchars.length;i++)
	{
		if(attempt.indexOf(bannedchars[i])!=-1)
		{
			console.log("contains a banned character");
			return false;
		}
	}
	if(!ld) //check that the name isn't already used. 
	{
		for(var i=0;i<existingDungeons.length;i++)
		{
			if(attempt==existingDungeons[i])
			{
				return false;
			}
		}
		return true;
	}else if(ld) //check that the name is already used. 
	{
		for(var i=0;i<existingDungeons.length;i++)
		{
			if(attempt==existingDungeons[i])
			{
				return true;
			}
		}
		return false;
	}
	
}

function actuallyStartGame()
{
	isLoading=false;
	mode=1;
	miles.maxHp=100;
	miles.hp=miles.maxHp;
	curDungeon.timeStarted=new Date();
	miles.x=9;
	miles.y=12;
	miles.dir=0;
	camera.tileX=0;
	camera.tileY=0;
	miles.keys=0;
	miles.AI=0;
	miles.money=0;
	miles.bombs=0;
	miles.arrows=0;
	miles.wallet=250;
	countIndex=existingDungeons.indexOf(curDungeon.name);
	LOAD_COUNTS[countIndex]=curDungeon.numRooms;
	
	if(OPTIONS.musicOn)
	{
		document.getElementById("mainSong").play();
		document.getElementById("deadSong").pause();
	}
	
	//curDungeon.loadFloor();
	curDungeon.curRoom().explored=true;
	curDungeon.hasEdited=false;
	miles.room=curDungeon.curRoom();
	//graphboat = mapToGraph(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY],true);
	//graph = mapToGraph(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY],miles,false);
	if(OPTIONS.musicOn){
		document.getElementById("mainSong").volume=OPTIONS.musicVolume;
		document.getElementById("mainSong").play(); //starts music
		document.getElementById("deadSong").pause();
	}
	starter();
	if(!Xbox)
	{
		for(var i=0;i<curDungeon.floors;i++)
		{
			curDungeon.linkDoors(i);
			curDungeon.linkSwitches(i);
		}
		bConsoleBox.log("Doors and switches linked!","yellow");
	}
	LockTime=new Date().getTime();
}

function startGame(goolp,ploop)
{

	if(!goolp)
	{
		
		var lordCromp=prompt("Enter new dungeon name");
		if(lordCromp==null) {return;}
		while (!acceptableName(lordCromp,false))
		{
			lordCromp=prompt("Try again.");
			if(lordCromp==null) {return;}
		}
		curDungeon.name=lordCromp;
		curDungeon.floors=1;
		curDungeon.numRooms=0;
		curDungeon.saveExists=false;
		curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY);
		editMode=true;
		curDungeon.lastSaved=null;
		resetMiles();
		actuallyStartGame();
		//curDungeon.addFloor();
	}else if(!ploop)
	{
		pungname=prompt("Enter name of dungeon to load","testmap");
		if(pungname==null) {return;}
		while (!acceptableName(pungname,true)) //doesn't exist
		{
			pungname=prompt("No dungeon called "+pungname,"tutorial");
			if(pungname==null) {return;}
		}
		curDungeon.name=pungname;
		editMode=false;
		/*var crmath="dungeons/"+curDungeon.name+"/"+"main.txt";
		$.get(crmath, function(data) 
		{	
			var bata=data.split(",");
			LOAD_COUNT=Math.floor(bata[1]);
			console.log(LOAD_COUNT);
			
		});*/
		
		/*function checkLoadCount() 
		{ 
			if (LOAD_COUNT > 0)
			{ 
				curDungeon.load();
			}else 
			{ 	
				console.log("waiting for load count to be > 0");
				window.setTimeout(checkLoadCount, 1000); 
			}
		}
		checkLoadCount();*/
		
		countIndex=existingDungeons.indexOf(curDungeon.name);
		curDungeon.load();
		resetMiles();
		function checkIfLoaded() 
		{ 
			if (LOAD_COUNTS[countIndex] == 0)
			{ 
				actuallyStartGame();
			}else if((LOAD_COUNTS[countIndex]<0)  && (!Xbox))
			{
				bConsoleBox.log("Load_Counts problem! Reload page.","yellow");
			}else			
			{ 
				//console.log("waiting for load count to be 0");
				window.setTimeout(checkIfLoaded, 1000); 
			}
		}
		checkIfLoaded();
	}else
	{
		pungname=ploop;
		curDungeon.name=pungname;
		editMode=false;
				
		countIndex=existingDungeons.indexOf(curDungeon.name);
		curDungeon.load();
		resetMiles();
		function checkIfLoaded() 
		{ 
			if (LOAD_COUNTS[countIndex] == 0)
			{ 
				actuallyStartGame();
			}else if((LOAD_COUNTS[countIndex]<0)  && (!Xbox))
			{
				bConsoleBox.log("Load_Counts problem! Reload page.","yellow");
			}else			
			{ 
				//console.log("waiting for load count to be 0");
				window.setTimeout(checkIfLoaded, 1000); 
			}
		}
		checkIfLoaded();
	}
		
	
}

function starter()
{		
	gamestart=true;	
	//bees=true;
	
	bConsoleBox.log("started");
	bConsoleBox.log("Hit E for Edit Mode");
}



function mainMenuUpdate()
{
	var tick=0;
	lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	
	monsta.update();
	 if(mutekey.check()) {
		OPTIONS.musicOn=!OPTIONS.musicOn;
		document.getElementById("titleAudio").pause();
		//monsta.startOrbit(40000,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT),60);
	 }

	
	
	
	gamepad = navigator.getGamepads && navigator.getGamepads()[0];
	
	if(Xbox)
	{
		//bConsoleBox.log(controller.buttons.length);
		controller.update();
		if(controller.pad)
		{
			for( var i=0;i<controller.buttons.length;i++)
			{
				if((controller.pad.buttons[i].pressed) )
				{
					bConsoleBox.log(i+":"+controller.buttons[i].key);
					if((!isLoading) && ((i==11) || (i==0)))
					{
						startGame(true,"tutorial");	
						actuallyStartGame(); //yeah. what. 
					}
				}
			}
		}
		
	}
	
	if(false)//(controller.buttons[7].check())
	{
		if(mmcur==0)
		{
			startGame(false);
		}else if(mmcur==1)
		{
			startGame(true);
		}else if(mmcur==2)
		{
			showMapList();
		}
	}else if((!isLoading)&&((startkey.check()) || ((controller.pad) && (controller.buttons[SNESKey.Start].check()))))
	{	
		if(mmcur==0)
		{
			startGame(false);
		}else if((mmcur==1) && (existingDungeons.length>0))
		{
			startGame(true);
		}else if(mmcur==2)
		{
			showMapList();
		}
	}
	if(downkey.check()){
		mmcur++;
		if(mmcur>2) {mmcur=0;}
	}
	if(upkey.check()){
		mmcur--;
		if(mmcur<0) {mmcur=2;}
	}
	bConsoleBox.update();
};

function mapUpdate()
{
	controller.update();
	if((mapkey.check()) ||(escapekey.check())||(controller.buttons[8].check()))
	{
		curDungeon.mapFloor=curDungeon.roomZ;
		mode=1;
	}
	if((Xbox) && (controller.pad) && (controller.Xcheck(10)) || ((!Xbox) && (controller.buttons[SNESKey.Select].check())))
	{
		playSound("unpause");
		mode=1;
	}
	
	if((Xbox) && (controller.pad) && (controller.Xcheck(11)) || ((!Xbox) && (controller.buttons[SNESKey.Start].check())))
	{
		playSound("pause");
		mode=4;
	}
	if((Xbox) || (controller.pad))
	{
		if(controller.oneCheckUp())
		{
			curDungeon.mapFloor--;
			if(curDungeon.mapFloor<0)
			{
				curDungeon.mapFloor=0;
			}
		}
		if(controller.oneCheckDown())
		{
			curDungeon.mapFloor++;
			if(curDungeon.mapFloor>curDungeon.floors-1)
			{
				curDungeon.mapFloor=curDungeon.floors-1;
			}
		}
	}else
	{
		if(upkey.check())
		{
			curDungeon.mapFloor--;
			if(curDungeon.mapFloor<0)
			{
				curDungeon.mapFloor=0;
			}
		}
		if(downkey.check())
		{
			curDungeon.mapFloor++;
			if(curDungeon.mapFloor>curDungeon.floors-1)
			{
				curDungeon.mapFloor=curDungeon.floors-1;
			}
		}
	}
}
function mapDraw() {
	//SHOULDN'T
	canvas.fillStyle = "black";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

	curDungeon.draw(canvas,camera);
	curDungeon.drawLargeMap(canvas)
}
function optionsUpdate()
{
	if((escapekey.check()))
	{
		mode=1;
		playSound("unpause");
	}
	if(optionskey.check())
	{
		mode=1;
	}
	if(upkey.check())
	{
		
	}
	if(downkey.check())
	{
		
	}
		if(numberkeys[1].check())
		{
			OPTIONS.musicOn=!OPTIONS.musicOn;
			if(OPTIONS.musicOn)
			{
				document.getElementById("mainSong").volume=OPTIONS.musicVolume;
				document.getElementById("mainSong").play();
			}else
			{
				document.getElementById("mainSong").pause();
				document.getElementById("deadSong").pause();
			}
		}
		else if(numberkeys[2].check())
		{
			OPTIONS.SFX=!OPTIONS.SFX;
		
		}else if(numberkeys[3].check())
		{
			OPTIONS.LightingOn=!OPTIONS.LightingOn;
		
		}else if(numberkeys[4].check())
		{
			OPTIONS.UpdateAllRooms=!OPTIONS.UpdateAllRooms;
		
		}else if(numberkeys[5].check())
		{
			OPTIONS.showUnexploredRooms=!OPTIONS.showUnexploredRooms;
			
		}else if(numberkeys[6].check())
		{
			OPTIONS.showCracks=!OPTIONS.showCracks;
		
		}else if(numberkeys[7].check())
		{
			OPTIONS.showUnexploredDoors=!OPTIONS.showUnexploredDoors;
		
		}else if(numberkeys[8].check())
		{
			OPTIONS.SafeMode=!OPTIONS.SafeMode;
		
		}else if(numberkeys[9].check())
		{
			OPTIONS.confirmationPopUps=!OPTIONS.confirmationPopUps;
		
		}
}
function optionsDraw() {
	//SHOULDN'T
	canvas.fillStyle = "black";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

	curDungeon.draw(canvas,camera);
	var xFset=160;
	var yFset=35;
	canvas.fillStyle="white";
	canvas.fillRect(xFset-8,yFset-28,558,754);
	canvas.fillStyle="blue";
	canvas.fillRect(xFset-4,yFset-24,548,744);
	canvas.font = "20pt Calibri";
	canvas.fillStyle="white";
	canvas.fillText("OPTIONS: ",xFset+100,yFset+20-6);
	canvas.fillText("1) Music On: "+OPTIONS.musicOn,xFset+15,yFset+75-6);
	canvas.fillText("2) Sound Effects On: "+OPTIONS.SFX,xFset+15,yFset+100-6);
	canvas.fillText("3) Lighting on: "+OPTIONS.LightingOn,xFset+15,yFset+125-6);
	canvas.fillText("4) Update all rooms: "+OPTIONS.UpdateAllRooms,xFset+15,yFset+150-6);
	canvas.fillText("5) Show Unexplored Rooms on map/radar: "+OPTIONS.showUnexploredRooms,xFset+15,yFset+175-6);
	canvas.fillText("6) Show bomable cracks: "+OPTIONS.showCracks,xFset+15,yFset+200-6);
	canvas.fillText("7) Show unexplored doors: "+OPTIONS.showUnexploredDoors,xFset+15,yFset+225-6);
	canvas.fillText("8) Kid Friendly mode: "+OPTIONS.SafeMode,xFset+15,yFset+250-6);
	canvas.fillText("9) Confirmation pop ups: "+OPTIONS.confirmationPopUps,xFset+15,yFset+275-6);
	canvas.fillText("10) Walking breaks unstable ground: "+OPTIONS.UnsafeWalking,xFset+15,yFset+300-6);
	canvas.fillText("11) NPC's collect items: "+OPTIONS.NPCPickup,xFset+15,yFset+325-6);
	canvas.fillText("12) Mirror breaks on use: "+OPTIONS.MirrorBreaks,xFset+15,yFset+350-6);
	canvas.fillText("13) Drops persist: "+OPTIONS.DropsPersist,xFset+15,yFset+375-6);
	canvas.fillText("14) Friendly Fire: "+OPTIONS.FriendlyFire,xFset+15,yFset+400-6);
	canvas.fillText("15) Point n' click controls: "+OPTIONS.MouseControls,xFset+15,yFset+425-6);
	//canvas.fillText("14) Bombs set off other bombs: "+OPTIONS.ChainingExplosions,xFset+15,yFset+400-6);



	
}
//------------MAIN DRAW-----------------------------------------
function mainDraw() {
	//SHOULDN'T
	canvas.fillStyle = "black";
	//canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	canvas.fillRect(0,0,xOffset,CANVAS_HEIGHT);
	canvas.fillRect(0,0,CANVAS_WIDTH,yOffset);
	canvas.fillRect(0,629,CANVAS_WIDTH,136);
	canvas.fillRect(790,0,107,CANVAS_HEIGHT);
	if(true)//(floorDirty)
	{
		curDungeon.draw(canvas,camera);
		floorDirty=false;
	}
	//curRoom.draw(canvas,camera);
	//curRoom.draw(canvas,camera);
	if(customConsole)
	{
		bConsoleBox.draw(concanvas);
	}else
	{
		concanvas.clearRect(0,0,432,CANVAS_HEIGHT);
	}
	if(!gamestart) {return;}
		


	if(true)//(!stayDay)
	{
		/*canvas.globalAlpha=LightLevels[Darkness];
		canvas.fillStyle="black";
		canvas.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);*/
		//canvas.fillRect(0,0,CANVAS_WIDTH/3, CANVAS_HEIGHT);
		//canvas.fillRect((CANVAS_WIDTH/3)*2,0,CANVAS_WIDTH/3, CANVAS_HEIGHT);
		
	}

	
	mapDirty=true;
	
	//canvas.globalAlpha=1;
	/*if(showMap)
	{
		curMap.drawMap(camera,0,0);
	}else
	{
		canvas.globalAlpha=1;//0.4;
		curMap.drawRadar(camera,665,475);
	}*/
	
	if(editMode)
	{
		canvas.fillStyle="yellow";
		canvas.globalAlpha=1;
		canvas.font = "32pt Calibri";
		if(MobileMode)
		{
			canvas.fillText("Edit Mode",380,25);
		}else
		{
			canvas.fillText("Edit Mode",380,125);
		}
		canvas.font = "16pt Calibri";
		if(curDungeon.curRoom().hidden)
		{
			canvas.fillText("Hidden Room",580,145);
		}
		
		
		if(editor.mode==editModes.Pen)
		{
			if(editor.penDown)
			{	
				canvas.fillText("Pen Down",18,120);
			}else
			{
				canvas.fillText("Pen Up",18,120);
			}
			
		}
		else if(editor.mode==editModes.Stamp){
			canvas.fillText("Stamp mode",18,120);
		}else if(editor.mode==editModes.SwitchLink){
			canvas.fillText("Linking mode",18,120);
		}else if(editor.mode==editModes.ChestLoot){
			canvas.fillText("Chest mode",18,120);
		}else if(editor.mode==editModes.Fill){
			canvas.fillText("Fill mode",18,120);
		}else if(editor.mode==editModes.Objects){
			canvas.fillText("Object mode",18,120);
		}else if(editor.mode==editModes.BuriedObjects){
			canvas.fillText("Buried object mode",18,120);
		}else if (editor.mode==editModes.Door)
		{
			canvas.fillText("Door Mode",18,120);
		}else
		{
			canvas.fillText("Pen Mode",18,120);
		}
		if(editor.mode==editModes.Door)
		{
			if(editor.doorType==0)
			{
				canvas.fillText("Regular Door",18,96);
			}else if(editor.doorType==1)
			{
				canvas.fillText("Closed Door",18,96);
			}else if(editor.doorType==2)
			{
				canvas.fillText("Locked Door",18,96);
			}else if(editor.doorType==3)
			{
				canvas.fillText("Bombable Door",18,96);
			}else if(editor.doorType==4)
			{
				canvas.fillText("Bombed Door",18,96);
			}else if(editor.doorType==5)
			{
				canvas.fillText("Curtain Door",18,96);
			}else if(editor.doorType==6)
			{
				canvas.fillText("Lamp activated Door",18,96);
			}
			
		}else if(editor.mode==editModes.Objects)
		{
			canvas.fillText("Selected: ",18,96);
			if(objectSprites[editor.objectType][0])
			{
				objectSprites[editor.objectType][0].draw(canvas,110,73);
			}else
			{
				console.log("no sprite for "+editor.objectType);
			}
		}else if(editor.mode==editModes.BuriedObjects)
		{
			canvas.fillText("Selected: ",18,96);
			if(objectSprites[editor.objectType])
			{
				objectSprites[editor.objectType][0].draw(canvas,110,73);
			}else
			{
				console.log("no sprite for "+editor.objectType);
			}
		}else if(editor.mode==editModes.ChestLoot)
		{
			canvas.fillText("Selected: ",18,96);
			if(objectSprites[editor.lootType])
			{
				objectSprites[editor.lootType][0].draw(canvas,110,73);
			}else
			{
				console.log("no sprite for "+editor.lootType);
			}
		}else
		{
			canvas.fillText("Selected: ",18,96);
			if(dungeonTileSprite[editor.brushType])
			{
				if(editor.brushType==DungeonTileType.Hole)
				{
					holedispsprite.draw(canvas,110,73);
				}else if(editor.brushType==DungeonTileType.DeathHole)
				{
					deathholedispsprite.draw(canvas,110,73);
				}else
				{
					dungeonTileSprite[editor.brushType].draw(canvas,110,73);
				}
			}else
			{
				console.log("no sprite for "+editor.brushType);
			}
		}
		
	}	
	

	drawDebug(canvas);
	
	
	if(editMode) 
	{
		if(curDungeon.curRoom().active)
		{
			editor.draw(canvas);
		}
	}
	if(true)
	{
		var allentities=new Array();
		
		for(var p=0;p<curDungeon.curRoom().objects.length;p++)
		{
			allentities.push(curDungeon.curRoom().objects[p]);
		}
		for(var p=0;p<entities.length;p++)
		{
			allentities.push(entities[p]);
			for(var i=0;i<entities[p].projectiles.length;i++)
			{
				if((entities[p].projectiles[i].room.x==curDungeon.roomX) && (entities[p].projectiles[i].room.y==curDungeon.roomY)&&(entities[p].projectiles[i].room.z==curDungeon.roomZ))
				{
					allentities.push(entities[p].projectiles[i]);
				}
			}
		}
		for(var p=0;p<curDungeon.curRoom().bombs.length;p++)
		{
			allentities.push(curDungeon.curRoom().bombs[p]);
		}
		allentities.sort(function(a, b) //todo not this every frame. only when changes. 
		{
			/*if((a.type==ObjectID.PotStand) || (a.type==ObjectID.HoldSwitch)|| (a.type==ObjectID.ToggleSwitch)|| ((a.type==ObjectID.HolePlugger) && (a.on))|| ((a.type==ObjectID.Bush) ))
			{
				if((b.type==ObjectID.PotStand) || (b.type==ObjectID.HoldSwitch)|| (b.type==ObjectID.ToggleSwitch)|| ((b.type==ObjectID.HolePlugger) && (b.on))|| ((b.type==ObjectID.HolePlugger) ))
				{
					return 0;
				}
				return -1;
			}
			if((b.type==ObjectID.PotStand) || (b.type==ObjectID.HoldSwitch)|| (b.type==ObjectID.ToggleSwitch)|| ((b.type==ObjectID.HolePlugger) && (b.on))|| ((b.type==ObjectID.HolePlugger) ))
			{
				if((a.type==ObjectID.PotStand) || (a.type==ObjectID.HoldSwitch)|| (a.type==ObjectID.ToggleSwitch)|| ((a.type==ObjectID.HolePlugger) && (a.on)) || ((a.type==ObjectID.HolePlugger) ))
				{
					return 0;
				}
				return 1;
			}*/
			
			if(a.drawOrder<b.drawOrder)
			{
				return -1;
			}
			
			if(a.drawOrder>b.drawOrder)
			{
				return 1;
			}
			
			if(a.y>b.y)
			{
				return 1;
			}else if(a.y<b.y)
			{
				return -1;
			}
				return 0;
		});
		for(var i=0;i<allentities.length;i++)
		{
			if((allentities[i].exists) && (allentities[i].room.name==curDungeon.curRoom().name)&&(allentities[i].room.z==curDungeon.roomZ))
			{
				if(allentities[i].entity)
				{
					allentities[i].draw(canvas);//.sprites[entities[i].dir].draw(canvas,entities[i].x*32+xOffset,entities[i].y*32+yOffset-14);
				}else if((allentities[i].bomb) || (allentities[i].projectile))
				{
					allentities[i].draw(canvas,xOffset,yOffset);
				}else
				{
					allentities[i].draw(canvas,camera,xOffset,yOffset);
				}
			}
		}
	}
	for(var i=0;i<curDungeon.curRoom().objects.length;i++)
	{
		if(curDungeon.curRoom().objects[i].topLayer.length>0)
		{
			curDungeon.curRoom().objects[i].drawTop(canvas,camera,xOffset,yOffset);
		}
	}
	if(OPTIONS.LightingOn)
	{
		for(var i=0;i<curDungeon.curRoom().lights.length;i++)
		{
			//lights[i].draw(canvas,camera);
			if(curDungeon.curRoom().lights[i].alive)
			{
				lightenGradient(canvas,camera,curDungeon.curRoom().lights[i], curDungeon.curRoom().lights[i].radius)
			}
		}
	}
	explosions.forEach(function(expo) {
		if((expo.room.z==curDungeon.roomZ)&&(expo.room.x==curDungeon.roomX)&&(expo.room.y==curDungeon.roomY))
            expo.draw(canvas,xOffset,yOffset);
	});
	for(var i=0;i<curDungeon.curRoom().fires.length;i++)
	{
		curDungeon.curRoom().fires[i].draw(canvas,camera);
	}
	monsta.draw(canvas,camera);
	curDungeon.curRoom().darken(canvas,miles);
	curDungeon.drawMiniMap(canvas);//,player
	drawGUI(canvas);
	for (var h=0;h<buttons.length;h++)
	{
		buttons[h].draw(canvas);
	}
	
	
	if(drawingPath)
	{
		curDungeon.curRoom().drawPath(canvas,miles.x,miles.y,editor.x,editor.y,miles);
	}
	//curDungeon.curRoom().drawPath(canvas,9,11,9,3);//curDungeon.curRoom().getOpenDoor(0).x,curDungeon.curRoom().getOpenDoor(0).y+2)
	
	if((!gameOver) && (!miles.alive))
	{
		gameOver=true;
		if(OPTIONS.musicOn)
		{
			document.getElementById("mainSong").pause();
			document.getElementById("deadSong").volume=OPTIONS.musicVolume;
			document.getElementById("deadSong").play();
		}
		$("<div id='dialogBox'>").text("Sadly, no trace of them was ever found...").appendTo("body");
	}
	
	if(!milesFree)
	{
		canvas.save();
		var popl=new Date().getTime();
		canvas.fillStyle =  "#DCDCDC";
		var nakl=10-(popl-LockTime)/1000;
		if(nakl>7)
		{
			canvas.fillStyle =  "red";
		}else if(nakl>3)
		{
			canvas.fillStyle =  "orange";
		}else if(nakl>1)
		{
			canvas.fillStyle =  "yellow";
		}else
		{
			canvas.fillStyle =  "green";
		}
    	canvas.globalAlpha=1;
		canvas.font = "46pt Calibri";
		Math.round(nakl*10)/10
		canvas.fillText(Math.round(nakl*10)/10,400,250);
		canvas.restore();
	}

};
//------------MAIN LOOP-----------------------------------------
function mainUpdate()
{
	if(!gamestart) return;
	//if(gameOver) return;
	//hack
	
	//mel.x=miles.x;
	//mel.y=miles.y-26+miles.headHeight;
	var tick=0;	
    lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
//	thyme.update(); //cause wtf is this even doing anymore?
	if(controller)
	{
		controller.update();
	}
	if(optionskey.check())
	{
		mode=3;
	}
	if((Xbox) && (controller.pad) && (controller.Xcheck(13)))
	{
		playSound("pause");
		mode=5;
	}else if(controller.pad)
	{
	 //todo, button for this?
	}
	if(((Xbox) && (controller.pad) && (controller.Xcheck(13))) || ((!Xbox) &&(controlskey)&&(controlskey.check())))
	{
		playSound("pause");
		mode=5;
	}
	if((inventorykey.check())  ||((Xbox) && (controller.pad) && (controller.Xcheck(11))) || ((!Xbox) && (controller.pad)&&(controller.buttons[SNESKey.Start].check())))
	{
		playSound("pause");
		mode=4;
	}
	if((editMode) && (savekey.check()))
	{
		bConsoleBox.log("Existing room save will be overwritten. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			curDungeon.curRoom().save("Dungeon/dungeons/"+curDungeon.name+"/"+"floor"+curDungeon.roomZ+"/");
			curDungeon.curRoom().saveObjects("Dungeon/dungeons/"+curDungeon.name+"/"+"floor"+curDungeon.roomZ+"/");
	    }
		if(OPTIONS.confirmationPopUps)
		{
			popQuestion("Existing room save will be overwritten. Confirm? (Y/N)");
		}
	}
	if((editMode) && (loadkey.check()))
	{
		bConsoleBox.log(curDungeon.curRoom().name +" will be overwritten. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			curDungeon.curRoom().load("dungeons/"+curDungeon.name+"/"+"floor"+curDungeon.roomZ+"/");
			curDungeon.curRoom().z=curDungeon.roomZ;
			curDungeon.curRoom().x=curDungeon.roomX;
			curDungeon.curRoom().y=curDungeon.roomY;
			curDungeon.curRoom().loadObjects("dungeons/"+curDungeon.name+"/"+"floor"+curDungeon.roomZ+"/");
		}
		if(OPTIONS.confirmationPopUps)
		{
			popQuestion(curDungeon.curRoom().name +" will be overwritten. Confirm? (Y/N)");
		}
	}
		
	if((editMode) && (savefloorkey.check()))
	{
		bConsoleBox.log("Existing floor save will be overwritten. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			curDungeon.saveFloor(curDungeon.roomZ);
		}
		if(OPTIONS.confirmationPopUps)
		{
			popQuestion("Existing floor save will be overwritten. Confirm? (Y/N)");
		}
	}
	if((editMode) && (loadfloorkey.check()))
	{
		bConsoleBox.log("Unsaved data will be lost. Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
			curDungeon.loadFloor();
		}
		if(OPTIONS.confirmationPopUps)
		{
			popQuestion("Unsaved data will be lost. Confirm? (Y/N)");
		}
	}
	
	if(saveaskey.check())
	{	
		copyDungeon();
	}
	
	if((editMode) && (modekey.check()))
	{
		editor.mode++;
		editor.penDown=false;
		if(editor.mode>editor.numModes)
		{
			editor.mode=0;
		}
		
	}
	if((editMode) &&(undokey.check()))
	{
	    undoEdit(curDungeon.curRoom());
	}
	
	if((editMode) &&(shiftkey.checkDown()))
	{
		if(randomkey.check())
		{	
			//randomize objects
		}
	}else if(editMode)
	{
		if(randomkey.check())
		{	
			//randomize tiles
			bConsoleBox.log("Existing room will be overwritten. Confirm? (Y/N)","yellow");
			editor.confirming=true;
			editor.confirmingWhat=function()
			{
				curDungeon.curRoom().randomizeTiles();
			}
			if(OPTIONS.confirmationPopUps)
			{
				popQuestion("Existing room will be overwritten. Confirm? (Y/N)");
			}
		}
	}
	
	if((editMode) &&(shiftkey.checkDown()))
	{
		if(copykey.check())
		{
			editor.clipBoard.copyTiles(curDungeon.curRoom());
			editor.clipBoard.copyStairs(curDungeon.curRoom());
			editor.clipBoard.active=true;
			editor.clipBoard.exits=new Array();
			editor.clipBoard.redoWalls();
			bConsoleBox.log(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name+" copied to clipboard without doors.");
		}
	}
	if((editMode) && (copykey.check()))
	{
		editor.clipBoard.copyTiles(curDungeon.curRoom());
		editor.clipBoard.copyExits(curDungeon.curRoom());
		editor.clipBoard.active=true;
		bConsoleBox.log(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name+" copied to clipboard.");
	}else if((editMode)&&pastekey.check())
	{
		
		if(!editor.clipBoard.active)
		{
			bConsoleBox.log("Clipboard is empty.");
		}else if(!curDungeon.curRoom().active)
		{
			curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY,editor.clipBoard);
		}else
		{
			bConsoleBox.log(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name +" will be overwritten. Confirm? (Y/N)","yellow");
			editor.confirming=true;
			editor.confirmingWhat=function(){
				curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY,editor.clipBoard);
			}
			if(OPTIONS.confirmationPopUps)
			{
				popQuestion(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name +" will be overwritten.Confirm? (Y/N)");
			}
		}
	}

	
	if((editMode) && (fillkey.check()))
	{
		if((editor.brushType!=DungeonTileType.UpStair) && (editor.brushType!=DungeonTileType.DownStair))
		{
			curDungeon.curRoom().fillAll(editor.brushType);
			curDungeon.curRoom().stairs = new Array();
		}else
		{
			bConsoleBox.log("Can't fill with stairs");
		}
	}
	if(tabkey.check())
	{
		if(editor.mode==editModes.Door)
		{
			editor.doorType++;
			if(editor.doorType>editor.numDoorTypes)
			{
				editor.doorType=0;
			}
		}else if((editor.mode==editModes.Objects) || (editor.mode==editModes.BuriedObjects))
		{
			editor.cycleObjects();
		}else
		{
			editor.cycleTiles(true);
		}
	}
	if ((editMode) &&(editclickkey.check()))
	{
		editor.click(false,0,0);
	}
	for (var h=0;h<buttons.length;h++)
	{
		buttons[h].update();
		if(!buttons[h].exists)
		{
			buttons.splice(h,1);
			h--;
		}
	}
	if(soundkey.check())
	{
		OPTIONS.SFX=!OPTIONS.SFX;
		if(OPTIONS.SFX)
		{
			bConsoleBox.log("Sound effects turned on.");
		}else
		{
			bConsoleBox.log("Sound effects turned off.");
		}
	}
	 if(mutekey.check()) {
		OPTIONS.musicOn=!OPTIONS.musicOn;
		
		if(OPTIONS.musicOn)
		{
			bConsoleBox.log("Music turned on.");
			document.getElementById("mainSong").volume=OPTIONS.musicVolume;
			document.getElementById("mainSong").play();
		}else
		{
			bConsoleBox.log("Music turned off.");
			document.getElementById("mainSong").pause();
			document.getElementById("deadSong").pause();
		}
		document.getElementById("titleAudio").pause();
		//monsta.startOrbit(40000,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT),60);
	 }
		
	if(yeskey.check())
		{
			if(editor.confirming)
			{
				playSound("menuselect");
				editor.confirmed=true;
				editor.confirming=false;
				editor.confirmingWhat();
				editor.confirmingWhat=null;
				bConsoleBox.log("Yes","Yellow");
			}
		}
		if(nokey.check())
		{
			if(editor.confirming)
			{
				playSound("menucancel");
				editor.confirming=false;
				bConsoleBox.log("No","Yellow");
			}
		}
	
	if((mapkey.check()) || ((Xbox) && (controller.pad) && (controller.pad.buttons[10].pressed)) || ((!Xbox) && (controller.pad)&&(controller.buttons[SNESKey.Select].check())))
	{
		//console.log("look");
		if((editMode) || (miles.has[hasID.Map])) 
		{
			curDungeon.mapFloor=curDungeon.roomZ;
			mode=2;
			playSound("map");
		}else
		{
			playSound("error");
			bConsoleBox.log("You don't have a map of this dungeon!", "yellow");
		
		}
	}
		
	if(editMode)
	{
		/*if(letterkeys[15].check())
		{
			editor.penDownMode=!editor.penDownMode;
		}*/
		if(letterkeys[7].check())
		{
		
			//HELP
			logControls();

		}
		if(numberkeys[0].check())
		{
			curDungeon.curRoom().hidden=!curDungeon.curRoom().hidden
		}
		
		if(deletekey.check())
		{	
			if((editor.mode==editModes.Objects) ||(editor.mode==editModes.BuriedObjects))
			{
				if(shiftkey.checkDown())
				{
					bConsoleBox.log("All objects in this room will be deleted. Confirm? (Y/N)","yellow");
					editor.confirming=true;
					editor.confirmingWhat=function()
					{
						for(var i=0;i<curDungeon.curRoom().objects.length;i++)
						{
							if(curDungeon.curRoom().objects[i].flame)
							{
								curDungeon.curRoom().objects[i].flame.flare.alive=false;
							}
							curDungeon.curRoom().objects[i].exists=false;
						}
						curDungeon.curRoom().objects=new Array();
					}
					if(OPTIONS.confirmationPopUps)
					{
						popQuestion("All objects in this room will be deleted. Confirm? (Y/N)");
					}
				}
				if(editor.grabbed)
				{
					bConsoleBox.log(editor.grabbed.name+" will be deleted. Confirm? (Y/N)","yellow");
					editor.confirming=true;
					editor.confirmingWhat=function()
					{
						for(var i=0;i<curDungeon.curRoom().objects.length;i++)
						{
							if(curDungeon.curRoom().objects[i]==editor.grabbed)
							{
								editor.grabbed.exists=false;
								if(editor.grabbed.flame)
								{
									editor.grabbed.flame.flare.alive=false;
								}
								curDungeon.curRoom().objects.splice(i,1);
								i--;
								editor.grabbed=null;
							}
						}
					}
					if(OPTIONS.confirmationPopUps)
					{
						popQuestion(editor.grabbed.name +" will be deleted. Confirm? (Y/N)");
					}
				}
			}else
			{
				if(shiftkey.checkDown())
				{
					bConsoleBox.log("Entire floor will be deleted. Confirm? (Y/N)","yellow");
					editor.confirming=true;
					editor.confirmingWhat=function(){curDungeon.wipeFloor(curDungeon.roomZ);}
					if(OPTIONS.confirmationPopUps)
					{
						popQuestion("Entire floor will be deleted. Confirm? (Y/N)");
					}
				}
				else
				{
					bConsoleBox.log(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name +" will be deleted. Confirm? (Y/N)","yellow");
					editor.confirming=true;
					editor.confirmingWhat=function()
					{
						curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY]=new room();
						curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].active=false;
						var bactive=false;
						for(var i=0;i<15;i++)
						{
							for (var j=0;j<8;j++)
							{
								if(curDungeon.rooms[curDungeon.roomZ][i][j].active)
								{
									bactive=true;
								}
							}
						}
						if((curDungeon.roomZ==curDungeon.floors-1) && (!bactive))
						{
							curDungeon.floors--;
							console.log("agent carter");
						}
					}
					if(OPTIONS.confirmationPopUps)
					{
						popQuestion(curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY].name +" will be deleted. Confirm? (Y/N)");
					}
				}
			}
		}
		if(insertkey.check())
		{
			if(!curDungeon.curRoom().active)
			{
				curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY);
			}else
			{
				bConsoleBox.log("Room already exists!");
			}
			
		}
		if(shiftkey.checkDown())
		{
			
			if(letterkeys[22].check())
			{
				//curDungeon.curRoom().addDoor(0);
				//curDungeon.curRoom().removeDoor(0);
				curDungeon.smartRemoveDoor(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY,0);
			}
			if(letterkeys[0].check())
			{
				//curDungeon.curRoom().addDoor(3);
				//curDungeon.curRoom().removeDoor(3);
				curDungeon.smartRemoveDoor(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY,3);
			}
			if(letterkeys[18].check())
			{
				//curDungeon.curRoom().addDoor(2);
				//curDungeon.curRoom().removeDoor(2);
				curDungeon.smartRemoveDoor(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY,2);
			}
			if(letterkeys[3].check())
			{
				//curDungeon.curRoom().addDoor(1);
				//curDungeon.curRoom().removeDoor(1);
				curDungeon.smartRemoveDoor(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY,1);
			}
			if(pageupkey.check())
			{
				if(curDungeon.roomZ<curDungeon.floors-1)
				{
					if((curDungeon.rooms[curDungeon.roomZ+1][curDungeon.roomX][curDungeon.roomY].active) ||(curDungeon.createRoom(curDungeon.roomZ+1,curDungeon.roomX,curDungeon.roomY)))
					{
						curDungeon.smartAddStair(editor.x,editor.y,true);
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeFloor(true,!editMode,miles);
					}
				}else
				{
					//bConsoleBox.log("Can't go off the map");
					bConsoleBox.log("Will create new floor. Confirm? (Y/N)","yellow");
					editor.confirming=true;
					editor.confirmingWhat=function() {
						curDungeon.addFloor();
						bConsoleBox.log("New floor created");
					}
					if(OPTIONS.confirmationPopUps)
					{
						popQuestion("Will create new floor. Confirm? (Y/N)");
					}
				}
			}
			if(pagedownkey.check())
			{
				if(curDungeon.roomZ>0)
				{
					if((curDungeon.rooms[curDungeon.roomZ-1][curDungeon.roomX][curDungeon.roomY].active) ||(curDungeon.createRoom(curDungeon.roomZ-1,curDungeon.roomX,curDungeon.roomY)))
					{
						curDungeon.smartAddStair(editor.x,editor.y,false);
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeFloor(false,!editMode,miles);
					}
				}else
				{
					bConsoleBox.log("Can't go off the map");
				}
			}
			if(leftkey.check())
			{
				if(curDungeon.roomX>0)
				{
					if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX-1][curDungeon.roomY].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX-1,curDungeon.roomY)))
					{
						//curDungeon.curRoom().addDoor(3)
						//curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX-1][curDungeon.roomY].addDoor(1);
						curDungeon.smartAddDoor(1,6,3);
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(3,!editMode);
					}
				}else
				{
					bConsoleBox.log("Can't go off the map");
				}
			}
			if(rightkey.check())
			{
				if(curDungeon.roomX<curDungeon.getWidth()-1)
				{
					if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX+1][curDungeon.roomY].active)|| (curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX+1,curDungeon.roomY)))
					{
						curDungeon.smartAddDoor(18,6,1);
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(1,!editMode);
					}
				}else{
					bConsoleBox.log("Can't go off the map");
				}
			}
			if(upkey.check())
			{
				if(curDungeon.roomY>0)
				{
					if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY-1].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY-1)))
					{
						curDungeon.smartAddDoor(8,1,0);
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(0,!editMode);
					}
				}else{
					bConsoleBox.log("Can't go off the map");
				}
			}
			if(downkey.check())
			{	
				if(curDungeon.roomY<curDungeon.getHeight()-1)
				{
					if((curDungeon.rooms[curDungeon.roomZ][curDungeon.roomX][curDungeon.roomY+1].active) ||(curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY+1)))
					{
						curDungeon.smartAddDoor(8,13,2);
						editor.clearConfirm();
						editor.penDown=false;
						curDungeon.changeRoom(2,!editMode);
					}
				}else
				{
					bConsoleBox.log("Can't go off the map");
				}
			}
		}else if(editMode)
		{
			if(leftkey.check())
			{
				editor.clearConfirm();
				editor.penDown=false;
				curDungeon.changeRoom(3,!editMode);
			}
			if(rightkey.check())
			{
				editor.clearConfirm();
				editor.penDown=false;
				curDungeon.changeRoom(1,!editMode);
			}
			if(upkey.check())
			{
				editor.clearConfirm();
				editor.penDown=false;
				curDungeon.changeRoom(0,!editMode);
			}
			if(downkey.check())
			{
				editor.clearConfirm();
				editor.penDown=false;
				curDungeon.changeRoom(2,!editMode);
			}
			if(letterkeys[22].check())
			{
				editor.move(0);
			}
			if(letterkeys[0].check())
			{
				editor.move(3);
			}
			if(letterkeys[18].check())
			{
				editor.move(2);
			}
			if(letterkeys[3].check())
			{
				editor.move(1);
			}
			if(editor.penDown)
			{
				if(editor.mode==editModes.Pen)
				{
					if((editor.brushType!=DungeonTileType.UpStair) && (editor.brushType!=DungeonTileType.DownStair))
					{
						curDungeon.curRoom().tiles[editor.x][editor.y].data=editor.brushType;
						for(var i=0;i<curDungeon.curRoom().stairs.length;i++)
						{
							if((curDungeon.curRoom().stairs[i].x==editor.x) &&(curDungeon.curRoom().stairs[i].y==editor.y) )
							{
								curDungeon.curRoom().stairs.splice(i,1);
								i--;
							}
						}
					}else{
						bConsoleBox.log("Can't paint with stairs");
						editor.penDown=false;
					}
				}
				//addEdit(curDungeon.curRoom());
			}
		}
	}
	if(!milesFree)
	{
		var popl=new Date().getTime();
		if(popl-LockTime>10000)
		{
			milesFree=true;
			if(Xbox)
			{
				for(var i=0;i<curDungeon.floors;i++)
				{
					curDungeon.linkDoors(i);
					curDungeon.linkSwitches(i);
				}
				bConsoleBox.log("Doors and switches linked!","yellow");
				curDungeon.timeStarted=new Date();
			}
		}
	}else if((!editMode) && (controller.pad)) //?!
	{	
		controller.update();
		if((Xbox) && (controller.Xcheck(12)))
		{
			customConsole=!customConsole;
		}
		if((!Xbox) || (controller.pad))
		{
			//SNES controls
			
			/*for(var i=0;i<controller.buttons.length;i++)
			{
			
				if(controller.buttons[i].check())
				{
					console.log(i);
				}
			}*/
			if ($("#dialogBox").length > 0) 
			{
				if(((Xbox) && (controller.pad) && (controller.Xcheck(1))||(controller.Xcheck(0))) || ((!Xbox) && (controller.pad)&&(controller.buttons[SNESKey.A].check())))
				{
					$("#dialogBox").remove();
					if(gameOver)
					{
						mode=0;
					}
				}
			}
			
		for(var i=0;i<buttons.length;i++)
		{
			if(buttons[i].hasFocus)
			{
				if(((Xbox) && (controller.pad) && (controller.Xcheck(1))||(controller.Xcheck(0))) || ((!Xbox) && (controller.buttons[SNESKey.A].check())))
				{
					if((!buttons[i].unClickable))
					{
						buttons[i].hasFocus=false;
						buttons[i].exists=false;
						return;
					}else
					{
						
					}
				}
			}
		}
			
			if(((Xbox) && (controller.pad) && (controller.Xcheck(1))) || ((!Xbox) && (controller.pad)&&(controller.buttons[SNESKey.A].check())))
			{
				//contextual. if NPC in talk range, talk. 
				//if object in front, activate
				miles.doContextual();
			}
			if(miles.holding)
			{
				//todo: why does A have to be held?
				if(((Xbox) && (controller.pad) && (controller.Xcheck(0)) || (controller.Xcheck(1))) || ((!Xbox) && (controller.pad)&& ((controller.buttons[SNESKey.B].check()) ||(controller.buttons[SNESKey.A].checkDown()))))
				{
					miles.holding=false;
				}
			}
			if(((Xbox) && (controller.pad) && (controller.Xcheck(0))) || ((!Xbox) && (controller.pad)&& (controller.buttons[SNESKey.B].check())))
			{
				//console.log("b!");
				if(miles.swimming)
				{
					miles.dive();
				}else
				{
					miles.swingSword();
				}
			}
			if((miles.has[hasID.Sword]) && (!miles.swimming) && (!miles.swinging))
			{
				if(((Xbox) && (controller.pad) && (controller.pad.buttons[0].pressed)) || ((!Xbox) && (controller.pad)&&(controller.buttons[SNESKey.B].checkDown()))  )
				{
					if(!miles.poking)
					{
						miles.poking=true;
						miles.chargeStart=new Date().getTime();
					}
				}else
				{
					miles.poking=false;
					if(miles.charged)
					{
						miles.spinAttack();
					}
				}
			}else if (miles.swimming)
			{
				miles.poking=false;
			}
			if(((miles.getEquipped()==ObjectID.Bow) && (miles.getEquipped(true)==ObjectID.Bomb)) || ((miles.getEquipped(true)==ObjectID.Bow) && (miles.getEquipped()==ObjectID.Bomb)))
			{
				if(((Xbox) && (controller.checkTwo(2,3))) || ((controller.checkTwo(SNESKey.X,SNESKey.Y))))
				{
					if((miles.arrows>0) && (miles.bombs>0))
					{
						miles.bombs--;
						miles.removeItem(ObjectID.Bomb,1);
						if(miles.dir==0)
						{
							miles.shootArrow(90,true);
						}else if(miles.dir==1)
						{
							miles.shootArrow(180,true);
						}else if(miles.dir==2)
						{
							miles.shootArrow(270,true);
						}else if(miles.dir==3)
						{
							miles.shootArrow(0,true);
						}
					}else
					{
						bConsoleBox.log("Out of arrows or bombs.","yellow");
						playSound("error");
					}
				}else
				{
					if(((Xbox) && (controller.pad) && (controller.Xcheck(2))) || ((!Xbox) && (controller.pad)&&(controller.buttons[SNESKey.Y].check())))
					{
						//console.log("y!");
						if((!Xbox) && (controller.pad) && (controller.buttons[SNESKey.R].checkDown()))
						{
							miles.cycleEquipped(true);
						}else
						{
							miles.useItem();
						}
						
					}
					if(((Xbox) && (controller.pad) && (controller.Xcheck(3))) || ((!Xbox) && (controller.pad)&&(controller.buttons[SNESKey.X].check())))
					{
						//console.log("x!");
						if((!Xbox) && (controller.pad) && (controller.buttons[SNESKey.R].checkDown()))
						{
							miles.cycleEquipped(true,true);
						}else
						{
							miles.useItem(true);
						}
			
					}
				}
			}else 
			{
				if(((Xbox) && (controller.pad) && (controller.Xcheck(2))) || ((!Xbox) && (controller.pad)&&(controller.buttons[SNESKey.Y].check())))
				{
					//console.log("y!");
					if((!Xbox) && (controller.pad) && (controller.buttons[SNESKey.R].checkDown()))
					{
						miles.cycleEquipped(true);
					}else if(miles.inventory[miles.equippedTrack].type==ObjectID.Boomerang)
					{
						if(controller.checkDownRight())
						{
							miles.tossBoomerang(225);	
						}else if(controller.checkDownLeft())
						{
							miles.tossBoomerang(315);	
						}else if(controller.checkUpLeft())
						{
							miles.tossBoomerang(45);	
						}else if(controller.checkUpRight())
						{
							miles.tossBoomerang(135);	
						}else
						{
							miles.useItem();
						}
					}else if(miles.inventory[miles.equippedTrack].type==ObjectID.Bow)
					{
						if(controller.checkDownRight())
						{
							miles.shootArrow(225);	
						}else if(controller.checkDownLeft())
						{
							miles.shootArrow(315);	
						}else if(controller.checkUpLeft())
						{
							miles.shootArrow(45);	
						}else if(controller.checkUpRight())
						{
							miles.shootArrow(135);	
						}else
						{
							miles.useItem();
						}
					}else
					{
						miles.useItem();
					}
					
				}
				if(((Xbox) && (controller.pad) && (controller.Xcheck(3))) || ((!Xbox) && (controller.pad)&&(controller.buttons[SNESKey.X].check())))
				{
					//console.log("x!");
					if((!Xbox) && (controller.pad) && (controller.buttons[SNESKey.R].checkDown()))
					{
						miles.cycleEquipped(true,true);
					}else if(miles.inventory[miles.equippedTrack2].type==ObjectID.Boomerang)
					{
						if(controller.checkDownRight())
						{
							miles.tossBoomerang(225);	
						}else if(controller.checkDownLeft())
						{
							miles.tossBoomerang(315);	
						}else if(controller.checkUpLeft())
						{
							miles.tossBoomerang(45);	
						}else if(controller.checkUpRight())
						{
							miles.tossBoomerang(135);	
						}else
						{
							miles.useItem(true);
						}
					}else if(miles.inventory[miles.equippedTrack2].type==ObjectID.Bow)
					{
						if(controller.checkDownRight())
						{
							miles.shootArrow(225);	
						}else if(controller.checkDownLeft())
						{
							miles.shootArrow(315);	
						}else if(controller.checkUpLeft())
						{
							miles.shootArrow(45);	
						}else if(controller.checkUpRight())
						{
							miles.shootArrow(135);	
						}else
						{
							miles.useItem(true);
						}
					}else
					{
						miles.useItem(true);
					}
		
				}
			}
			/*if((!Xbox) && (controller.pad) && (controller.buttons[SNESKey.R].check()))
			{
				//console.log("R")
				miles.cycleEquipped(true);
			}
			/*if((!Xbox) && (controller.pad)&&(controller.buttons[SNESKey.L].check()))
			{
				//console.log("L")
				miles.cycleEquipped(true,true);
			}*/
			if((Xbox) && (controller.pad) && (controller.Xcheck(5)))
			{
				//console.log("R bumper")
				//miles.cycleEquipped(true);
			}
			/*if((Xbox) && (controller.pad) && (controller.Xcheck(4))) 
			{
				//console.log("L bumper")
				miles.cycleEquipped(false);
			}*/
			if((Xbox) && (controller.pad) && (controller.Xcheck(6)))
			{
				//console.log("R trigger")
				miles.cycleEquipped(true,true);
			}
			if((Xbox) && (controller.pad) && (controller.Xcheck(7))) 
			{
				//console.log("L trigger")
				miles.cycleEquipped(true,false);
			}
			if((!miles.busyHook) && (!miles.holding) && (!miles.dashing) && (!((miles.swimming) && (!miles.canSwim))&& (!miles.frozen)))
			{
				if(controller.checkUp())
				{
					miles.dir=0;
					miles.walkAnimate();
					miles.stepping=true;
					if(!(((Xbox) && (controller.pad) && (controller.pad.buttons[4].pressed)) || ((!Xbox) && (controller.pad)&&(controller.buttons[SNESKey.L].checkDown()))))
					{
						miles.incMove();
						if(miles.swimming)
						{
							playSound("swim");
						}else if(miles.room.tiles[miles.x][miles.y].data==DungeonTileType.Grass)
						{
							playSound("grasswalk");
						}
						if(miles.pushing)
						{
							playSound("push");
						}
					}
				}else if(controller.checkDown())
				{
					miles.dir=2;
					miles.walkAnimate();
					miles.stepping=true;
					if(!(((Xbox) && (controller.pad) && (controller.pad.buttons[4].pressed)) || ((!Xbox) && (controller.pad)&&(controller.buttons[SNESKey.L].checkDown()))))
					{
						miles.incMove();
						if(miles.swimming)
						{
							playSound("swim");
						}else if(miles.room.tiles[miles.x][miles.y].data==DungeonTileType.Grass)
						{
							playSound("grasswalk");
						}
						if(miles.pushing)
						{
							playSound("push");
						}
					}
				}else if(controller.checkLeft())
				{
					miles.dir=3;
					miles.walkAnimate();
					miles.stepping=true;
					if(!(((Xbox) && (controller.pad) && (controller.pad.buttons[4].pressed)) || ((!Xbox) && (controller.pad)&&(controller.buttons[SNESKey.L].checkDown()))))
					{
						miles.incMove();
						if(miles.swimming)
						{
							playSound("swim");
						}else if(miles.room.tiles[miles.x][miles.y].data==DungeonTileType.Grass)
						{
							playSound("grasswalk");
						}
						if(miles.pushing)
						{
							playSound("push");
						}
					}
				}else if(controller.checkRight())
				{
					miles.dir=1;
					miles.walkAnimate();
					miles.stepping=true;
					if(!(((Xbox) && (controller.pad) && (controller.pad.buttons[4].pressed)) || ((!Xbox) && (controller.pad)&&(controller.buttons[SNESKey.L].checkDown()))))
					{
						miles.incMove();
						if(miles.swimming)
						{
							playSound("swim");
						}else if(miles.room.tiles[miles.x][miles.y].data==DungeonTileType.Grass)
						{
							playSound("grasswalk");
						}
						if(miles.pushing)
						{
							playSound("push");
						}
					}
				}else
				{
					miles.stepping=false;
					miles.walkTrack=0;
				}
			}
		}
	}else if((!editMode) && (!Xbox) &&(controller.keyboard))//keyboard
	{
		if ($("#dialogBox").length > 0) 
		{
			if(SNESAKey.check())
			{
				$("#dialogBox").remove();
				if(gameOver)
				{
					mode=0;
				}
			}
		}
			
		for(var i=0;i<buttons.length;i++)
		{
			if(buttons[i].hasFocus)
			{
				if(SNESAKey.check())
				{
					if((!buttons[i].unClickable))
					{
						buttons[i].hasFocus=false;
						buttons[i].exists=false;
						return;
					}else
					{
						
					}
				}
			}
		}
			
			if(SNESAKey.check())
			{
				//contextual. if NPC in talk range, talk. 
				//if object in front, activate
				miles.doContextual();
			}
			if(miles.holding)
			{
				//todo: why does A have to be held?
				if( (SNESAKey.checkDown()) || (SNESBKey.check()))
				{
					miles.holding=false;
				}
			}
			if(SNESBKey.check())
			{
				//console.log("b!");
				if(miles.swimming)
				{
					miles.dive();
				}else
				{
					miles.swingSword();
				}
			}
			if((miles.has[hasID.Sword]) && (!miles.swimming) && (!miles.swinging))
			{
				if(SNESBKey.checkDown())
				{
					if(!miles.poking)
					{
						miles.poking=true;
						miles.chargeStart=new Date().getTime();					
					}
				}else
				{
					miles.poking=false;
					if(miles.charged)
					{
						miles.spinAttack();
					}
				}
			}
			if(SNESYKey.check())
			{
				//console.log("y!");
				miles.useItem();
			}
			if(SNESXKey.check())
			{
				//console.log("y!");
				miles.useItem(true);
			}
			if(SNESRKey.check())
			{
				//console.log("R")
				miles.cycleEquipped(true);
			}
			if(SNESLKey.check())
			{
				//console.log("L")
				miles.cycleEquipped(true,true);
			}
			if((!miles.busyHook) &&(!miles.holding) && (!miles.dashing)&& (!((miles.swimming) && (!miles.canSwim))&& (!miles.frozen)))
			{
				if(SNESUpKey.checkDown())
				{
					miles.dir=0;
					miles.stepping=true;
					miles.walkAnimate();
					miles.incMove();
					if(miles.swimming)
					{
						playSound("swim");
					}
				}else if(SNESDownKey.checkDown())
				{
					miles.dir=2;
					miles.stepping=true;
					miles.walkAnimate();
					miles.incMove();
					if(miles.swimming)
					{
						playSound("swim");
					}
				}else if(SNESLeftKey.checkDown())
				{
					miles.dir=3;
					miles.stepping=true;
					miles.walkAnimate();
					miles.incMove();
					if(miles.swimming)
					{
						playSound("swim");
					}
				}else if(SNESRightKey.checkDown())
				{
					miles.stepping=true;
					miles.dir=1;
					miles.walkAnimate();
					miles.incMove();
					if(miles.swimming)
					{
						playSound("swim");
					}
				}else
				{
					miles.stepping=false;
					miles.walkTrack=0;
				}
			}
		
	}
	for (var h=0;h<buttons.length;h++)
	{
		buttons[h].update();
	}
	
	explosions.forEach(function(expo) {
            expo.update();
	});
	
	 explosions= explosions.filter(function(aBomb) {
            return aBomb.exists;
	});
	
	if(pageupkey.check())
	{
		editor.clearConfirm();
		curDungeon.changeFloor(true,!editMode,miles);
		editor.penDown=false;
	}
	if(pagedownkey.check())
	{
		editor.clearConfirm();
		curDungeon.changeFloor(false,!editMode,miles);
		editor.penDown=false;
	}
	 
	gamepad = navigator.getGamepads && navigator.getGamepads()[0];
	
	for(var i=0;i<curDungeon.curRoom().fires.length;i++)
	{
		if(!curDungeon.curRoom().fires[i].alive)
		{
			curDungeon.curRoom().fires.splice(i,1);
			i--;
		}
	}
	
	if(logsetkey.check())
	{
		
	}	
	
	if(!editMode)
	{
		for (var i=0;i<entities.length;i++)
		{
			entities[i].update();
			if(!entities[i].exists)
			{
				entities.splice(i,1);
				i--;
			}
			
		}
		for (var i=0;i<curDungeon.curRoom().exits.length;i++)
		{
			curDungeon.curRoom().exits[i].update();
			if(!curDungeon.curRoom().exits[i].exists)
			{
				curDungeon.curRoom().exits.splice(i,1);
				i--;
			}
			
		}
		//miles.update();
	}
	
	if(escapekey.check()){
		editor.penDown=false;
		if(editor.confirming)
		{
			editor.clearConfirm();
		}else
		{
			var plk=new Date().getTime();
		if(curDungeon.lastSaved)
		{
			var mlk=plk-curDungeon.lastSaved.getTime();
			mlk=mlk/1000;
			mlk=mlk/60;
			if(mlk>59)
			{
				mlk=(Math.round((mlk/60)*10)/10)+" hours ago.";
			}else if(mlk<1)
			{
				mlk="less than a minute ago. ";
			}else
			{
				mlk=Math.round(mlk*10)/10+" minutes ago.";
			}
		}else
		{
			var mlk="never."
		}
		bConsoleBox.log("Returning to main menu. Unsaved changes will be lost. Last saved "+mlk+" Confirm? (Y/N)","yellow");
		editor.confirming=true;
		editor.confirmingWhat=function() {
				
				$.post("/listdir/", {"path": "C:/JS/Dungeon/dungeons/"}, function(resp)
				 {
					tempExistingDungeons=resp.split(",");
					tempExistingDungeons.splice(0,1);
					for(var i=0;i<tempExistingDungeons.length;i++)
					{
						if(i%2)
						{
							LOAD_COUNTS.push(tempExistingDungeons[i]);
						}else
						{
							existingDungeons.push(tempExistingDungeons[i]);
						}
					}
					//var index=existingDungeons.indexOf(curDungeon.name);
					//LOAD_COUNTS[index]=curDungeon.numRooms;
					curDungeon.cleanSlate();
					/*LOAD_COUNTS=new Array();
					for( var i=0;i<existingDungeons.length;i++)
					 {
						 var crmath="dungeons/"+existingDungeons[i]+"/"+"main.txt";
								$.get(crmath, function(data) 
								{	
									var bata=data.split(",");
									LOAD_COUNTS.push(Math.floor(bata[1]));
									
								});
					 }*/
				 } 
				 )
				bullshitHack=true;
				mode=0;
				document.getElementById("mainSong").pause();
			}
			if(OPTIONS.confirmationPopUps)
			{
				popQuestion("Returning to main menu. Unsaved changes will be lost. Last saved "+mlk+" Confirm? (Y/N)");
			}
		}
	}
	
	if(homekey.check())
	{
		//camera.unFollow();
		//camera.tileX=92+326;
		//camera.tileY=212;
		curDungeon.roomZ=0;
		curDungeon.roomX=7;
		curDungeon.roomY=7;
	}
	if(editkey.check())
	{
		editMode=!editMode;
		editor.penDown=false;
		editor.clearConfirm();
		if(editMode){
			curDungeon.hasEdited=true;
			bConsoleBox.log("Welcome to edit mode. Hit H for help.");
		}else
		{
			curDungeon.roomZ=miles.room.z;
			curDungeon.roomY=miles.room.y;
			curDungeon.roomX=miles.room.x;
		}
	}
		
	if ((milliseconds-lastani>WATER_RATE) &&(!isBattle))
	{
		tileani++;
		lastani=milliseconds;
		anicount=0;
		mapDirty=true;
    }
    if (tileani>3) {tileani=0} //tile animations
	camera.update();
	monsta.update();
	
	/*for(var i=0;i<curDungeon.curRoom().fires.length;i++)
	{
		curDungeon.curRoom().fires[i].update();
	}*/
	for(var d=0;d<curDungeon.floors;d++)
	{
	for(var a=0;a<curDungeon.getWidth();a++)
	{
		for(var b=0;b<curDungeon.getHeight();b++)
		{
			for(var i=0;i<curDungeon.rooms[d][a][b].objects.length;i++) //should do adjacent rooms too, no?
			{
				//TODO: getting errors here. dunno why but will hack around. maybe ccause roomZ is changing mid stream?
				curDungeon.rooms[d][a][b].objects[i].update();
				if(curDungeon.rooms[d][a][b].objects[i]) //why needed?
				{
					
					
					if(!curDungeon.rooms[d][a][b].objects[i].exists)
					{
						if(curDungeon.rooms[d][a][b].objects[i].flame)
						{
							curDungeon.rooms[d][a][b].objects[i].flame.flare=null;//.alive=false;
							curDungeon.rooms[curDungeon.roomZ][a][b].objects[i].flame=null;//alive=false;
						}
					
						curDungeon.rooms[d][a][b].objects.splice(i,1);
						i--;
					}
				}else if(!curDungeon.rooms[d][a][b].objects[i])
				{
					
					continue;
				}
			}
		}
	}
	}
	if(thyme.tock)
	{
		/*for(var i=0;i<ships.length;i++)
		{
			ships[i].update(curMap);
		}
		for(var i=0;i<caravans.length;i++)
		{
			caravans[i].update(curMap);
		}
		for(var i=0;i<farms.length;i++)
		{
			farms[i].update();
		}*/
		thyme.tock=false
	}
	
	 if(debugkey.check())
	 {
		//drawingPath=!drawingPath;
		showNancyInfo=!showNancyInfo;
		/*var mpu=curDungeon.curRoom().closestAdj(editor,miles);
		if(mpu)
		{
			editor.x=mpu.x;
			editor.y=mpu.y;
		}else
		{
			console.log("no walkable adjacent space");
		}*/
	 }
	 
	
	for(var i=0;i<curDungeon.curRoom().lights.length;i++)
	{
		curDungeon.curRoom().lights[i].update();
		if(!curDungeon.curRoom().lights[i].alive)
		{
			curDungeon.curRoom().lights.splice(i,1);
			i--;
		}
	}
	
	for(var i=0;i<curDungeon.curRoom().bombs.length;i++)
	{
		//curDungeon.curRoom().bombs[i].update();
		if(!curDungeon.curRoom().bombs[i].exists)
		{
			curDungeon.curRoom().bombs.splice(i,1);
			i--;
		}
	}
	
	var speeMulti=1;

	
};

merp();
var tt="Indiana Jones and the Mystery of the missing title";
var yui=Math.floor(Math.random()*10);
if (yui==0){
	tt="Indiana Jones and the Legend of the Lost Socks";
}else if (yui==1){
	tt="Indiana Jones Meets Batman & Robin";
}else if (yui==2){
	tt="Indiana Jones: Raiders of Hitler's Fridge";
}else if (yui==3){
	tt="Indiana Jones: Short Round's Revenge";
}else if (yui==4){
	tt="Indiana Jones: Back 2 Da Hood";
}else if (yui==5){
	tt="Indiana Jones and the Pyramids of Mars";
}else if (yui==6){
	tt="Indiana Jones and the Day He Just Graded Papers at the Office";
}else if (yui=7){
	tt="Indiana Jones and the Crab People";
}else if (yui==8){
	tt="Indiana Jones and the Last Sandwich";
}else if (yui==9){
	tt="Indiana Jones and Kingdom of the Silver Fork";
}else if (yui==9){
	tt="Indiana Jones and Case of the Hepatitis C";
}
document.title = tt;
//curDungeon.createRoom(curDungeon.roomZ,curDungeon.roomX,curDungeon.roomY);

//curDungeon.linkDoors();
//startGame(true);

//console.log(curMap.tiles[Skagos.x/16][Skagos.y/16].data);
