CommIDs=[];

CommIDs.Bacon=0;
CommIDs.Lemons=1;
CommIDs.HorseMeat=2;
CommIDs.Artichoke=3;
CommIDs.Pheasant=4;
CommIDs.Ramen=5;
CommIDs.Lamb=6;
CommIDs.Duck=7;
CommIDs.Cheese=8;
CommIDs.OldBread=9;
CommIDs.Bread=10;
CommIDs.ChickenBroccoli=12;
CommIDs.Eggs=13;
CommIDs.Plums=14;
CommIDs.Apples=15;
CommIDs.Burrito=16;
CommIDs.Pizza=17;
CommIDs.BloodOrange=18;
CommIDs.Pomegrantes=19;
CommIDs.Steak=20;
CommIDs.Fish=21;
CommIDs.Onions=22;
CommIDs.Pancakes=23;
CommIDs.HotDog=24;
CommIDs.Cake=25;
CommIDs.Pork=26;
CommIDs.PorkChop=27;
CommIDs.Meatloaf=28;
CommIDs.Capon=29;
CommIDs.MysteryMeat=30;
CommIDs.Soup=31
CommIDs.Stew=32
CommIDs.Hamburger=33;
CommIDs.ChickenSandwich=34;
CommIDs.Sandwitch=35;
CommIDs.Pie=36;
CommIDs.ChickenNuggets=37;
CommIDs.Venison=38;
CommIDs.Veal=39;
CommIDs.Boar=40;
CommIDs.SucklingPig=41;
CommIDs.Beats=42;
CommIDs.Olives=43;
CommIDs.Strawberries=44;
CommIDs.Corn=45;
CommIDs.ChickenSalad=46;
CommIDs.Biscuits=47;
CommIDs.GeneralTsoChicken=48;
CommIDs.Lobster=49;
CommIDs.Tuna=50;
CommIDs.Ham=51;
//4 more foods.

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
	}else if(id==CommIDs.Artichoke)
	{
		this.name="Artichokes"
		this.cost=7;
		this.description ="Yummy";
		this.unit="";
	}else if(id==CommIDs.Pheasant)
	{
		this.name="Pheasant"
		this.cost=5;
		this.description ="Some kinda yummy bird.";
		this.unit="";
	}else if(id==CommIDs.Ramen)
	{
		this.name="Ramen Noodles."
		this.cost=1;
		this.description ="Cheap.";
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
	}else if(id==CommIDs.Meatloaf)
	{
		this.name="Meatloaf"
		this.cost=5;
		this.description ="Lemme sleep onnnn iiiit.";
		this.unit=" Chunks of";
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
	}else if(id==CommIDs.ChickenSandwich)
	{
		this.name="Chicken Sandwitch"
		this.cost=9;
		this.description ="Chi-kan Sanwich?";
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
	}else if(id==CommIDs.ChickenBroccoli)
	{
		this.name="Chicken and Broccoli"
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
	}else if(id==CommIDs.Tuna)
	{
		this.name="Tuna Sammich"
		this.cost=3;
		this.description ="Ew.";
		this.unit="";
	}else if(id==CommIDs.GeneralTsoChicken)
	{
		this.name="General Tso's Chicken"
		this.cost=3;
		this.description ="That coward.";
		this.unit="";
	}else if(id==CommIDs.Pie)
	{
		this.name="Pie"
		this.cost=3;
		this.description ="";
		this.unit="";
	}else if(id==CommIDs.HotPocket)
	{
		this.name="Hot pocket"
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
	}else if(id==CommIDs.HotDog)
	{
		this.name="Hot Dog"
		this.cost=3;
		this.description ="Hey Norm!";
		this.unit="";
	}else if(id==CommIDs.Biscuits)
	{
		this.name="Biscuits"
		this.cost=3;
		this.description ="Hey I just learned how to spell Biscuits.";
		this.unit="";
	}else if(id==CommIDs.Hamburger)
	{
		this.name="Hamburger"
		this.cost=7;
		this.description ="Don't fool yourself Timmy. If a cow ever got the chance he'd eat your and everybody you care about.";
		this.unit="";
	}else if(id==CommIDs.Lobster)
	{
		this.name="Lobster"
		this.cost=19;
		this.description ="Mr. Pinchy";
		this.unit="";
	}else if(id==CommIDs.ChickenNuggets)
	{
		this.name="Chicken Nuggets"
		this.cost=3;
		this.description ="I thought chickens didn't have nuggets.";
		this.unit="";
	}else if(id==CommIDs.ChickenSalad)
	{
		this.name="Chicken Salad"
		this.cost=3;
		this.description ="You chew it.";
		this.unit="";
	}else if(id==CommIDs.Burrito)
	{
		this.name="Burrito"
		this.cost=15;
		this.description ="A Burrito!";
		this.unit="";
	}else if(id==CommIDs.OldBread)
	{
		this.name="Old Bread"
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
	}else if(id==CommIDs.Steak)
	{
		this.name="Steak"
		this.cost=5;
		this.description ="Yum.";
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
	}else if(id==CommIDs.PorkChop)
	{
		this.name="Pork Chop"
		this.cost=2;
		this.description ="Edible.";
		this.unit=" Pounds of ";
	}else if(id==CommIDs.MysteryMeat)
	{
		this.name="Mystery Meat"
		this.cost=1;
		this.description ="...is that a finger?";
		this.unit=" Pieces of ";
	}else if(id==CommIDs.Fish)
	{
		this.name="Fish"
		this.cost=2;
		this.description ="Yummy fish.";
		this.unit=" Pieces of ";
	}else if(id==CommIDs.Cake)
	{
		this.name="Cake"
		this.cost=17;
		this.description ="Reads 'Happy Birthday Suzy'";
		this.unit=" Pieces of ";
	}
}

function randomFood()
{
	return new commodity(Math.floor(Math.random()*55),Math.floor(Math.random()*40)+20);
};