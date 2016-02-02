CommIDs=[];

CommIDs.Bacon=0;
CommIDs.Lemons=1;
CommIDs.HorseMeat=2;
CommIDs.HoneyedLocusts=3;
CommIDs.Pheasant=4;
CommIDs.BrownBowl=5;
CommIDs.Lamb=6;
CommIDs.Duck=7;
CommIDs.Cheese=8;
CommIDs.BlackBread=9;
CommIDs.Bread=10;
CommIDs.Honey=11;
CommIDs.SistersStew=12;
CommIDs.Eggs=13;
CommIDs.Plums=14;
CommIDs.Apples=15;
CommIDs.DragonPepper=16;
CommIDs.GreenPepper=17;
CommIDs.BloodOrange=18;
CommIDs.Pomegrantes=19;
CommIDs.Beef=20;
CommIDs.SaltFish=21;
CommIDs.Onions=22;
CommIDs.Lamprey=23;
CommIDs.FreyPie=24;
CommIDs.LemonCake=25;
CommIDs.Pork=26;
CommIDs.SaltPork=27;
CommIDs.SaltBeef=28;
CommIDs.Capon=29;
CommIDs.MysteryMeat=30;
CommIDs.Soup=31
CommIDs.Stew=32
CommIDs.SingersStew=33;
CommIDs.PeasePie=34
CommIDs.PeasePorridge=35;
CommIDs.Pie=36;
CommIDs.HotPie=37;
CommIDs.Venison=38;
CommIDs.Veal=39;
CommIDs.Boar=40;
CommIDs.SucklingPig=41;
CommIDs.Beats=42;
CommIDs.Olives=43;
CommIDs.Strawberries=44;
CommIDs.Corn=45;
CommIDs.PigeonPie=46;
CommIDs.Biscuits=47;
CommIDs.GooseInBerries=48;
CommIDs.Lobster=49;
CommIDs.Whiskerfish=50;
CommIDs.Ham=51;
//4 more foods.
CommIDs.WidowsBlood=55; // tywin?
CommIDs.TheStrangler=56; //
CommIDs.Nightshade=57; //common
CommIDs.TearsOfLys=58;
CommIDs.BasiliskVenom=59; // madness
CommIDs.MoonTea=60;
CommIDs.SweetSleep=61;
CommIDs.MyrishLense=62;
CommIDs.Leaches=63;
CommIDs.UnicornHorn=64;
CommIDs.GlassPane=65;
CommIDs.BlackDye=66;
CommIDs.Amber=67;
CommIDs.EroticCarving=68;
CommIDs.EroticScroll=69; //I did not plan this. 
CommIDs.ThousandIslandDressing=70;
CommIDs.SourLeaf=71;
CommIDs.OakWood=80;
CommIDs.IronWood=81;
CommIDs.WeirWood=82;
CommIDs.EbonyWood=83;
CommIDs.SummerWood=84;
CommIDs.Dragonbone=85;
CommIDs.WhaleOil=86;
CommIDs.pigIron=88;
CommIDs.Bronze=87;
CommIDs.Iron=89;
CommIDs.Steel=90;
CommIDs.Silver=91;
CommIDs.Gold=92;
CommIDs.Obsidian=93;
CommIDs.Cloth=94;
CommIDs.Wool=95;

CommIDs.Prisoner=99;
CommIDs.Ale=100;
CommIDs.ArborGold=101;
CommIDs.DornishRed=102;
CommIDs.CheapWine=103;
CommIDs.Summerwine=105;
CommIDs.Rum=104;
CommIDs.Milk=106;
CommIDs.Horse=109;
CommIDs.SandSteed=107;
CommIDs.Destrier=108; //TODO check that spelling. two more hrose types? animal types?
CommIDs.BearPelt=112;
CommIDs.WolfPelt=110;
CommIDs.LionPelt=111;
CommIDs.Ruby=119;
CommIDs.Emerald=113;
CommIDs.Sapphire=114;
CommIDs.FireOpal=115;
CommIDs.Jade=116;
CommIDs.Onyx=117;
CommIDs.Diamond=118;
CommIDs.DragonEgg=199;
//medication




function commodity(id,amt)
{
	this.amount=amt;
	this.id=id;
	this.plural="s";
	this.name="Uninitialized item"
	this.cost=9999;
	this.description ="Shit dude! Fuck.";
	this.unit="";
	if(id==CommIDs.IronWood)
	{
		this.name="Ironwood"
		this.cost=8;
		this.description ="Hard Wood";
		this.unit=" Planks of ";
	}else if(id==CommIDs.EbonyWood)
	{
		this.name="Ebony Wood"
		this.cost=16;
		this.description ="Dark hard wood";
		this.unit=" Planks of ";
	}else if(id==CommIDs.Dragonbone)
	{
		this.name="Dragon bone"
		this.cost=200;
		this.description ="Black bones of a dead dragon.";
		this.unit=" Pieces of ";
	}else if(id==CommIDs.SummerWood)
	{
		this.name="Summerwood"
		this.cost=250;
		this.description ="Rare wood from the Summer Isles. Not normally traded with outsiders.";
		this.unit=" Planks of ";
	}else if(id==CommIDs.PigIorn)
	{
		this.name="Pig iron"
		this.cost=4;
		this.description ="Cheap iron. ";
	}else if(id==CommIDs.WhaleOil)
	{
		this.name="Whale oil"
		this.cost=12;
		this.description ="For torches and such.";
		this.unit=" Gallons of ";
	}else if(id==CommIDs.Bronze)
	{
		this.name="Bronze ingots"
		this.cost=30;
		this.description ="Bronze!";
		this.unit="";
	}else if(id==CommIDs.Gold)
	{
		this.name="Gold ingots"
		this.cost=80;
		this.description ="Gold.";
		this.unit="";
	}else if(id==CommIDs.Silver)
	{
		this.name="Silver ingots"
		this.cost=50;
		this.description ="Silver";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.Cloth)
	{
		this.name="Cloth"
		this.cost=2;
		this.description ="Cloth";
		this.unit=" Spools of ";
	}else if(id==CommIDs.BearPelt)
	{
		this.name="Bear pelt"
		this.cost=10;
		this.description ="Warm and fuzzy.";
		this.unit="";
	}else if(id==CommIDs.Wool)
	{
		this.name="Wool"
		this.cost=4;
		this.description ="Warmer than cloth";
		this.unit=" Bundles of ";
	}else if(id==CommIDs.Bacon)
	{
		this.name="Bacon"
		this.cost=3;
		this.description ="Bacon!";
		this.unit=" Sides of ";
	}else if(id==CommIDs.Lemons)
	{
		this.name="Lemons"
		this.cost=4;
		this.description ="Lemons";
		this.unit=" Bundles of ";
	}else if(id==CommIDs.HorseMeat)
	{
		this.name="Horse Meat"
		this.cost=2;
		this.description ="Dothraki delicacy.";
		this.unit=" Sides of";
	}else if(id==CommIDs.HoneyedLocusts)
	{
		this.name="Honeyed Locusts"
		this.cost=7;
		this.description ="Totally not poisioned.";
		this.unit="";
	}else if(id==CommIDs.Pheasant)
	{
		this.name="Pheasant"
		this.cost=5;
		this.description ="Some kinda yummy bird.";
		this.unit="";
	}else if(id==CommIDs.BrownBowl)
	{
		this.name="Bowl o' Brown"
		this.cost=1;
		this.description ="Flea Bottom recipe.";
		this.unit="";
	}else if(id==CommIDs.Lamb)
	{
		this.name="Lamb"
		this.cost=2;
		this.description ="Edible";
		this.unit=" Rack of ";
	}else if(id==CommIDs.Duck)
	{
		this.name="Duck"
		this.cost=3;
		this.description ="Quack.";
		this.unit="";
	}else if(id==CommIDs.Cheese)
	{
		this.name="Cheese"
		this.cost=3;
		this.description ="Used to be milk, but time makes fools of us all.";
		this.unit=" Wheels of ";
	}else if(id==CommIDs.Bread)
	{
		this.name="Bread"
		this.cost=3;
		this.description ="Oh no the carbs!";
		this.unit=" Loafs of ";
	}else if(id==CommIDs.Honey)
	{
		this.name="Honey"
		this.cost=3;
		this.description ="I'm thinking about bees again.";
		this.unit=" Jars of ";
	}else if(id==CommIDs.SistersStew)
	{
		this.name="Sister's Stew"
		this.cost=5;
		this.description ="Regional delicacy of Sisterton.";
		this.unit=" Bowls of ";
	}else if(id==CommIDs.Eggs)
	{
		this.name="Eggs"
		this.cost=3;
		this.description ="From chickens!";
		this.unit=" Dozen ";
	}else if(id==CommIDs.Plums)
	{
		this.name="Plums"
		this.cost=3;
		this.description ="Fruit";
		this.unit=" ";
	}else if(id==CommIDs.Apples)
	{
		this.name="Apples"
		this.cost=3;
		this.description ="Fruit";
		this.unit=" Bushels of ";
	}else if(id==CommIDs.DragonPepper)
	{
		this.name="Dragon Peppers"
		this.cost=9;
		this.description ="Spicy!";
		this.unit="";
	}else if(id==CommIDs.GreenPepper)
	{
		this.name="Green Pepper"
		this.cost=5;
		this.description ="Spicy!";
		this.unit="";
	}else if(id==CommIDs.BloodOrange)
	{
		this.name="Blood Orange"
		this.cost=4;
		this.description ="Not really sure what makes this different than a regular orange.";
		this.unit="";
	}else if(id==CommIDs.Pomegrantes)
	{
		this.name="Pomegrantes"
		this.cost=3;
		this.description ="Apparently they have magical powers.";
		this.unit="";
	}else if(id==CommIDs.SingersStew)
	{
		this.name="Singer's Stew"
		this.cost=3;
		this.description ="Best not to ask whats in it.";
		this.unit="";
	}else if(id==CommIDs.Stew)
	{
		this.name="Stew"
		this.cost=3;
		this.description ="Carl Weathers approves.";
		this.unit="";
	}else if(id==CommIDs.Soup)
	{
		this.name="Chicken Soup"
		this.cost=3;
		this.description ="Mmmm";
		this.unit="";
	}else if(id==CommIDs.PeasePorridge)
	{
		this.name="Pease Porridge"
		this.cost=3;
		this.description ="Ew.";
		this.unit="";
	}else if(id==CommIDs.PeasePie)
	{
		this.name="Pease Pie"
		this.cost=3;
		this.description ="Ew.";
		this.unit="";
	}else if(id==CommIDs.Pie)
	{
		this.name="Pie"
		this.cost=3;
		this.description ="";
		this.unit="";
	}else if(id==CommIDs.HotPie)
	{
		this.name="Hot pie"
		this.cost=5;
		this.description ="...what?";
		this.unit="";
	}else if(id==CommIDs.Venison)
	{
		this.name="Venison"
		this.cost=6;
		this.description ="Bambi's mom!";
		this.unit="";
	}else if(id==CommIDs.Veal)
	{
		this.name="Veal"
		this.cost=8;
		this.description ="Controversially delicious.";
		this.unit="";
	}else if(id==CommIDs.Boar)
	{
		this.name="Roast Boar"
		this.cost=6;
		this.description ="";
		this.unit="";
	}else if(id==CommIDs.SucklingPig)
	{
		this.name="Suckling Pig"
		this.cost=6;
		this.description ="It's still good! It's still good!";
		this.unit="";
	}else if(id==CommIDs.Beats)
	{
		this.name="Beats"
		this.cost=3;
		this.description ="Enjoy them before they are outlawed.";
		this.unit="";
	}else if(id==CommIDs.Olives)
	{
		this.name="Olives"
		this.cost=3;
		this.description ="Do they even have martinis in Westeros?";
		this.unit="";
	}else if(id==CommIDs.Strawberries)
	{
		this.name="Strawberries"
		this.cost=3;
		this.description ="I should get me some strawberries.";
		this.unit="";
	}else if(id==CommIDs.Corn)
	{
		this.name="Corn"
		this.cost=3;
		this.description ="Corn! Corn!";
		this.unit="";
	}else if(id==CommIDs.PigeonPie)
	{
		this.name="Pigeon Pie"
		this.cost=3;
		this.description ="Things got really bad for the pigeons when the ravens took over the message delivery racket.";
		this.unit="";
	}else if(id==CommIDs.Biscuits)
	{
		this.name="Biscuits"
		this.cost=3;
		this.description ="Hey I just learned how to spell Biscuits.";
		this.unit="";
	}else if(id==CommIDs.GooseInBerries)
	{
		this.name="Goose in Berries"
		this.cost=7;
		this.description ="..Does this sound dirty to anyone else?";
		this.unit="";
	}else if(id==CommIDs.Lobster)
	{
		this.name="Lobster"
		this.cost=19;
		this.description ="Mr. Pinchy";
		this.unit="";
	}else if(id==CommIDs.ThousandIslandDressing)
	{
		this.name="Thousand Island Dressing"
		this.cost=3;
		this.description ="Imported form the Thousand Islands.";
		this.unit="";
	}else if(id==CommIDs.SourLeaf)
	{
		this.name="Sour Leaf"
		this.cost=3;
		this.description ="You chew it.";
		this.unit="";
	}else if(id==CommIDs.Whiskerfish)
	{
		this.name="Whiskerfish"
		this.cost=15;
		this.description ="Large fish.";
		this.unit="";
	}else if(id==CommIDs.BlackBread)
	{
		this.name="Black Bread"
		this.cost=1;
		this.description ="Edible but not very fresh.";
		this.unit=" loafs of ";
	}else if(id==CommIDs.Ham)
	{
		this.name="Ham"
		this.cost=5;
		this.description ="Born of salt and smoke.";
		this.unit="";
	}else if(id==CommIDs.Onions)
	{
		this.name="Onions"
		this.cost=2;
		this.description ="Edible.";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.Beef)
	{
		this.name="Beef"
		this.cost=5;
		this.description ="Edible.";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.Lamprey)
	{
		this.name="Lamprey"
		this.cost=5;
		this.description ="Edible, but seriously have you seen one of these things?";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.FreyPie)
	{
		this.name="Frey Pie"
		this.cost=2;
		this.description ="Tastes like vengeance.";
		this.unit=" Slices of ";
	}else if(id==CommIDs.Pork)
	{
		this.name="Pork"
		this.cost=5;
		this.description ="Edible.";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.SaltPork)
	{
		this.name="Salt pork"
		this.cost=2;
		this.description ="Edible.";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.Ale)
	{
		this.name="Ale"
		this.cost=2;
		this.description ="Good for morale!";
		this.unit=" Gallons of ";
	}else if(id==CommIDs.ArborGold)
	{
		this.name="Arbor Gold"
		this.cost=24;
		this.description ="The fancy stuff.";
		this.unit=" Gallons of ";
	}else if(id==CommIDs.DornishRed)
	{
		this.name="Dornish red"
		this.cost=20;
		this.description ="the fancy stuff.";
		this.unit=" Gallons of ";
	}else if(id==CommIDs.CheapWine)
	{
		this.name="Cheap Wine"
		this.cost=7;
		this.description ="Drinkable";
		this.unit=" Gallons of ";
	}else if(id==CommIDs.SummerWine)
	{
		this.name="Summerwine"
		this.cost=14;
		this.description ="Sweet";
		this.unit=" Gallons of ";
	}else if(id==CommIDs.Rum)
	{
		this.name="Black tar rum"
		this.cost=17;
		this.description ="Alcohol from the Summer Isles.";
		this.unit=" Gallons of ";
	}else if(id==CommIDs.Horse)
	{
		this.name="Horse"
		this.cost=20;
		this.description ="Your basic Horse.";
		this.unit="";
	}else if(id==CommIDs.Prisoner)
	{
		this.name="Prisoner"
		this.cost=20;
		this.description ="No it's not slavery!!";
		this.unit="";
	}else if(id==CommIDs.SandSteed)
	{
		this.name="Dornish Sand Steed"
		this.cost=500;
		this.description ="Can run for a day and a night without tireing. Can't handle heavy loads.";
		this.unit="";
	}else if(id==CommIDs.Destrier)
	{
		this.name="Destrier"
		this.cost=200;
		this.description ="A Warhorse";
		this.unit="";
	}else if(id==CommIDs.WidowsBlood)
	{
		this.name="Widow's Blood"
		this.cost=200;
		this.description ="Poison";
		this.unit=" Vials of ";
	}else if(id==CommIDs.theStrangler)
	{
		this.name="The Strangler"
		this.cost=1000;
		this.description ="Rare poison that mimics the symptoms of choking. ";
		this.unit=" Vials of ";
	}else if(id==CommIDs.Nightshade)
	{
		this.name="Nightshade"
		this.cost=500;
		this.description ="Poison";
		this.unit=" Vials of ";
	}else if(id==CommIDs.TearsOfLys)
	{
		this.name="Tears of Lys"
		this.cost=1200;
		this.description ="Rare poison created by the Alchemists of Lys.";
		this.unit=" Vials of ";
	}else if(id==CommIDs.BasiliskVenom)
	{
		this.name="Basilisk venom"
		this.cost=800;
		this.description ="Poison the causes violent madness.";
		this.unit=" Vials of ";
	}else if(id==CommIDs.MoonTea)
	{
		this.name="Moon Tea"
		this.cost=20;
		this.description ="Morning after contreception";
		this.unit=" Vials of ";
	}else if(id==CommIDs.SweetSleep)
	{
		this.name="Sweet sleep"
		this.cost=90;
		this.description ="Sleep aid that kills in large doses.";
		this.unit=" Vials of ";
	}else if(id==CommIDs.Leaches)
	{
		this.name="Leaches"
		this.cost=12;
		this.description ="cures what ails ya!";
		this.unit="";
	}else if(id==CommIDs.GlassPane)
	{
		this.name="Glass pane"
		this.cost=40;
		this.description ="Glass.";
		this.unit=" Panels of ";
	}else if(id==CommIDs.WolfPelt)
	{
		this.name="Wolf pelt"
		this.cost=12;
		this.description ="Warm and fuzzy.";
		this.unit="";
	}else if(id==CommIDs.LionPelt)
	{
		this.name="Lion pelt"
		this.cost=15;
		this.description ="Warm and fuzzy.";
		this.unit="";
	}else if(id==CommIDs.MyrishLense)
	{
		this.name="Salt Beef"
		this.cost=2;
		this.description ="Edible.";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.BlackDye)
	{
		this.name="Black Dye"
		this.cost=5;
		this.description ="Dye clothes black";
		this.unit=" Gallons of ";
	}else if(id==CommIDs.SaltBeef)
	{
		this.name="Salt Beef"
		this.cost=2;
		this.description ="Edible.";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.LemonCake)
	{
		this.name="Lemon cakes"
		this.cost=17;
		this.description ="Lemony.";
		this.unit=" Pieces of ";
	}else if(id==CommIDs.WeirWood)
	{
		this.name="Weirwood"
		this.cost=30;
		this.description ="Pale white and will never rot. Excellent for making bows.";
		this.unit=" Pieces of ";
	}else if(id==CommIDs.OakWood)
	{
		this.name="Oak wood"
		this.cost=13;
		this.description ="Wood.";
		this.unit=" Pieces of ";
	}else if(id==CommIDs.MysteryMeat)
	{
		this.name="Mystery Meat"
		this.cost=1;
		this.description ="...is that a finger?";
		this.unit=" Pieces of ";
	}else if(id==CommIDs.SaltFish)
	{
		this.name="Salt Fish"
		this.cost=2;
		this.description ="Yummy fish.";
		this.unit=" Pieces of ";
	}else if(id==CommIDs.UnicornHorn)
	{
		this.unit=" Pieces of ";
		this.name="Unicorn Horn"
		this.cost=15;
		this.description ="Includes certificate of authenticity.";
	}else if(id==CommIDs.Capon)
	{
		this.unit=" Pieces of ";
		this.name="Capon"
		this.cost=15;
		this.description ="It's a tiny bird.";
	}else if(id==CommIDs.Steel)
	{
		this.unit=" Pieces of ";
		this.name="Steel Ignot";
		this.cost=50;
		this.description ="decent steel";
	}else if(id==CommIDs.Obsidian)
	{
		this.unit=" Pieces of ";
		this.name="Obsidian";
		this.cost=12;
		this.description ="Dragonglass";
	}else if(id==CommIDs.Amber)
	{
		this.unit=" Pieces of ";
		this.name="Amber";
		this.cost=15;
		this.description ="Can be used to make jewellery or medical potions. ";
	}else if(id==CommIDs.Ruby)
	{
		this.unit="";
		this.name="Ruby";
		this.cost=900;
		this.description ="Can be used to make jewellery or sold ";
	}else if(id==CommIDs.Emerald)
	{
		this.unit="";
		this.name="Emerald";
		this.cost=750;
		this.description ="Can be used to make jewellery or sold. ";
	}else if(id==CommIDs.Sapphire)
	{
		this.unit="";
		this.name="Sapphire";
		this.cost=600;
		this.description ="Can be used to make jewellery or sold. ";
	}else if(id==CommIDs.FireOpal)
	{
		this.unit="";
		this.name="Fire Opal";
		this.cost=550;
		this.description ="Can be used to make jewellery or sold. ";
	}else if(id==CommIDs.Jade)
	{
		this.unit="";
		this.name="Jade";
		this.cost=250;
		this.description ="Can be used to make jewellery or sold. ";
	}else if(id==CommIDs.Onyx)
	{
		this.unit="";
		this.name="Onyx";
		this.cost=400;
		this.description ="Can be used to make jewellery or sold. ";
	}else if(id==CommIDs.Diamond)
	{
		this.unit="";
		this.name="Diamond";
		this.cost=1000;
		this.description ="Can be used to make jewellery or sold. ";
	}else if(id==CommIDs.DragonEgg)
	{
		this.unit="";
		this.name="Dragon Egg";
		this.cost=10000;
		this.description ="The ages have turned them to stone.";
	}else if(id==CommIDs.EroticCarving)
	{
		this.unit="";
		this.name="Erotic carving";
		this.cost=50;
		this.description ="Smut of the First Men";
	}else if(id==CommIDs.EroticScroll)
	{
		this.unit="";
		this.name="Erotic scroll";
		this.cost=150;
		this.description ="Would make a septon go blind.";
	}
	commodity.prototype.combine=function(cmb)
	{
		this.amount=this.amount+cmb.amount;
		cmb.amount=0;
	};
}

function randomFood()
{
	return new commodity(Math.floor(Math.random()*55),Math.floor(Math.random()*40)+20);
};