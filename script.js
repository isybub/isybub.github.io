

var unlockProgress = 0;
var discoverProgress = -2;




var tickRate = 1;

var lobbyingDollars = new Decimal(0);
var highestLobbyingDollars = new Decimal(0);



var one1 = new Decimal(1);





var tickSpeed = new Decimal(33);

var start = Date.now();
var dt = 0;
var t = 0;
var lt = 0;
var tickTimer = 0;
var saveTimer = 0;


function devHack(){
	mathematica.mathematica = mathematica.mathematica.add(1000);
	parents.realDollars = parents.realDollars.add(1e50);
	iq.points = iq.points.add(1000);
	iq.ps = iq.ps.add(100);
	lobbying.lobbyingDollars = lobbying.lobbyingDollars.add(1000000);
	override = 8;
	Object.keys(child).forEach(function(c){
		child[c].termspeed = new Decimal(1);
	});
}


var Load = function(){
	this.load = function() {
		override = parseInt(localStorage.getItem("discoverProgress"));
		childLoader.load(JSON.parse(localStorage.getItem("children")));
		iqLoader.load(JSON.parse(localStorage.getItem("iq")));
		
		mathematicaLoader.loadmps(JSON.parse(localStorage.getItem("mpsMult")));
		mathematicaLoader.loadcost(JSON.parse(localStorage.getItem("costDiv")));
		mathematicaLoader.loadmaths(JSON.parse(localStorage.getItem("mathematica")));

		parentsLoader.load(JSON.parse(localStorage.getItem("parents")));
		lobbyingLoader.load(JSON.parse(localStorage.getItem("lobbying")));
		lobbyingAccLoader.load(JSON.parse(localStorage.getItem("lobbyingacc")));
		document.body.style.overflowY = "scroll";
  		document.body.style.scrollBehavior = "auto";
  		document.body.scrollTop = 0;
  		document.documentElement.scrollTop = 0;

	}
	this.save = function(){
		override = 0;
		localStorage.setItem("exists","true");
		localStorage.setItem("discoverProgress",discoverProgress);
		localStorage.setItem("children",JSON.stringify(child));
		localStorage.setItem("iq",JSON.stringify(iq));
		localStorage.setItem("mathematica",JSON.stringify(mathematica));
		localStorage.setItem("mpsMult",JSON.stringify(mpsMult));
		localStorage.setItem("costDiv",JSON.stringify(costDiv));
		localStorage.setItem("parents",JSON.stringify(parents));
		localStorage.setItem("lobbying",JSON.stringify(lobbying));
		localStorage.setItem("lobbyingacc",JSON.stringify(lobUps));
		console.log("Game Saved.");
	}
	this.initLocalStorage = function(){

		console.log("No Local Storage, new save being created.");

		this.save();

	}

}

var gameLoader = new Load();
window.onload = function(){
	if(localStorage.getItem("exists")===null){
		gameLoader.initLocalStorage();
	}else{
		saveTimer = 0;
		gameLoader.load();
		console.log("Game Loaded.");
	}
}

var saveTime = 30000;
function step(timestamp) {
	t = Date.now();
	dt = t - lt;
	tickTimer += dt;

	if(dt < saveTime)saveTimer += dt;
	
	if(tickTimer >= tickSpeed){
		tick(tickTimer);
		tickTimer = 0;
	}
	if(saveTimer > saveTime){
		gameLoader.save();
		saveTimer = 0;
	}
	lt = t;
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);



function tick(tickTimer){

	updatemathematicas(tickRate);
	updateVisual(tickTimer);

}

var lastUpdate = 0;
function updateVisual(tickTimer){

	document.getElementById("mps").innerHTML = mathematica.currentProd.toPrecision(3);
	document.getElementById("RealDollars").innerHTML = parents.realDollars.toPrecision(3);
	document.getElementById("iqPoints").innerHTML = iq.points.toPrecision(3);

	updateBuyables();
	updateBasedOnProgress();
}






function updatemathematicas(tickRate){
	

	mathematica.update();

	parents.update();

	iq.update();

	lobbying.updateTotals();

	Object.keys(child).forEach(function(c){
		child[c].update();
	});
		
		flist.child1.updateStatus();
		flist.child2.updateStatus();
	

	if(battle.happening){
		battle.update();
	}

}





function unlockFirstChild(){
	document.getElementById("child1buy").style.opacity = "0";
	document.getElementById("child1buy").style.height = "0";
	window.setTimeout(function(){

		document.getElementById("postchild1").style.opacity = "1";

	},3000*(override ? 0.001 : 1));
	window.setTimeout(function(){

		document.getElementById("postchild1").style.opacity = "0";
		document.getElementById("postchild1").style.fontSize = "0";
		document.getElementById("postchild2").style.opacity = "1";
		
	},6000*(override ? 0.001 : 1));
	window.setTimeout(function(){

		document.getElementById("postchild2").style.opacity = "0";
		document.getElementById("postchild2").style.fontSize = "0";
		document.getElementById("schoolingheading").style.opacity = "1";
		document.getElementById("iqPoints").style.opacity = "1";
		document.getElementById("child1").style.opacity = "1";
		child.one.newChildInIntro();
		document.getElementById("tabletotals").style.opacity = 1;
		document.getElementById("tabletotals").style.zIndex = 1;
		document.getElementById("childstory").innerHTML = "";
		document.getElementById("childstory").style.marginBottom = "0px";
		
	},9000*(override ? 0.001 : 1));
	document.body.style.overflowY = "scroll";
	document.body.style.scrollBehavior = "auto";
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}




var genericAutobuyer = function(){

}



var Battle = function(){


	this.openable = true; // not forever thx

	this.enemyCount = 4;

	this.happening = false;

	this.show = function() {
		if(this.openable){
			document.getElementById("mainContainer").style.opacity = "0";
			document.getElementById("mainContainer").style.zIndex = "-1";
			document.getElementById("bigBattlingContainer").style.opacity = "1";
			document.getElementById("bigBattlingContainer").style.zIndex = "1";
			
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

			document.body.style.overflowY = "hidden";
		}
	}

	this.hide = function(){
			document.getElementById("mainContainer").style.opacity = "1";
			document.getElementById("mainContainer").style.zIndex = "1";
			document.getElementById("bigBattlingContainer").style.opacity = "0";
			document.getElementById("bigBattlingContainer").style.zIndex = "-1";
			
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

			document.body.style.overflowY = "scroll";

	}

	this.showFirstScreen = function(){

		var disp = document.getElementById("battleDisplay");

		var finalString = "<div id=classChoice><p>Choose the class of your first child to go to battle.</p>"+
							"<a href=\"javascript:battle.chooseFighter(1,\'one\',\'mage\')\">Mage</a>"+
							"<a href=\"javascript:battle.chooseFighter(1,\'one\',\'rogue\')\">Rogue</a>"+
							"<a href=\"javascript:battle.chooseFighter(1,\'one\',\'warrior\')\">Warrior</a>"+
							"<a href=\"javascript:battle.chooseFighter(1,\'one\',\'summoner\')\">Summoner</a></p>";


		disp.innerHTML = finalString;

	}

	this.showEnemySelectScreen = function() {
		
		var d = document.getElementById("controlButtons");

		var finalString = "";

		for(var i = 1; i <= this.enemyCount; i++){
			finalString += "<div id=buttonHolder><a href=\"javascript:battle.selectEnemy("+i+")\">Enemy "+i+"</a></div>"
		}

		d.innerHTML = finalString;

	}

	this.selectEnemy = function(enemynum) {
		


		flist.selected = flist["enemy"+enemynum];
		

	}
	this.chooseFighter = function(num,numstr,pclass){

		ad[numstr] = cl[pclass];
		cl[pclass].f = flist["child"+num]


		var disp = document.getElementById("battleDisplay");

		disp.innerHTML = "FIGHT";

		this.happening = true;


	}



	this.update = function(){

		var p = flist.isPlayer;


		if(p.bar.equals(0)){
			
			var atb = document.getElementById("atb");

			atb.style.boxShadow = "inset 0vw 0px 0px var(--light)";

			atb.style.transition = p.getSpeed()+"s box-shadow";

			atb.style.boxShadow = "inset -80vw 0px 0px var(--light)";

			p.chargeStart = Date.now();

			p.bar = p.bar.add(0.5);

		}else if(p.bar.lt(1)){

			if((Date.now() - p.chargeStart)/1000 > p.getSpeed()){

				p.bar = new Decimal(1);

			}

		}

		if(p.bar.equals(1)){

			//this.displayCards();

		}


	}

	this.displayCards = function(){

	}


}


var battle = new Battle();
var Fighter = function(baseAttack, baseDefence, baseSpeed, baseHP,attackMult,defenceMult,speedMult,HPMult){

	this.baseAttack = new Decimal(baseAttack);
	this.baseDefence = new Decimal(baseDefence);
	this.baseSpeed = new Decimal(baseSpeed);
	this.baseHP = new Decimal(baseHP);
	this.attackMult = new Decimal(attackMult);
	this.defenceMult = new Decimal(defenceMult);
	this.speedMult = new Decimal(speedMult);
	this.HPMult = new Decimal(HPMult);
	this.currentHP = new Decimal(baseHP);
	this.defenceWillResetAtStartOfTurn = true;
	this.bar = new Decimal(0);
	this.chargeStart = new Decimal(0);


	this.attack = function(damage){
		var a = flist.selected;

		a.currentHP = a.currentHP.minus(damage.divide(a.baseDefence.multiply(a.defenceMult)));
	}
	this.defend = function(){
		this.defenceMult = this.defenceMult.multiply(1.2);
	}
	this.startTurn = function() {
		if(!this.defenceMult.equals(this.baseDefence)&&this.defenceWillResetAtStartOfTurn){
			this.defenceMult = this.baseDefence;
		}
	}

	this.updateStatus = function(){
		if(this == flist.isPlayer){
			

			if(this.bar.gte(1)){
				battle.showEnemySelectScreen();
			}
		}
	}

	this.getSpeed = function(){

		return new Decimal(8).divide(this.baseSpeed.multiply(this.speedMult));

	}

}
var fighterList = function(){
	
	this.child1 = new Fighter(2,2,2,20,1,1,1,1);
	this.child2 = new Fighter(2,2,2,20,1,1,1,1);
	this.child3 = new Fighter(2,2,2,20,1,1,1,1);
	this.child4 = new Fighter(2,2,2,20,1,1,1,1);


	this.enemy1 = new Fighter(2,2,2,20,1,1,1,1);
	this.enemy2 = new Fighter(2,2,2,20,1,1,1,1);
	this.enemy3 = new Fighter(2,2,2,20,1,1,1,1);
	this.enemy4 = new Fighter(2,2,2,20,1,1,1,1);

	this.selected = this.enemy1;

	this.isPlayer = this.child1;

}
var flist = new fighterList();
var MageAttacks = function(fighter){
	this.f = fighter;

	this.fire = 1;
	this.thunder = 2;
	this.ice = 3;
	this.element = this.fire;

	this.attack = function(attackNo){
		this[attackNo]();
	}


	this.one = function(){
		f.attack(f.baseAttack.multiply(f.attackMult));
	}

	this.two = function(){
		f.defend();
	}


}

var RogueAttacks = function(fighter){
	this.fighter = fighter;
	this.attack = function(attackNo){
		this[attackNo]();
	}


	this.one = function(){
		
	}
}

var WarriorAttacks = function(fighter){
	this.fighter = fighter;
	this.attack = function(attackNo){
		this[attackNo]();
	}


	this.one = function(){
		
	}
}

var SummonerAttacks = function(fighter){
	this.fighter = fighter;
	this.attack = function(attackNo){
		this[attackNo]();
	}


	this.one = function(){
		
	}
}

var classList = function(){

	this.mage = new MageAttacks(flist.child1);
	this.rogue = new RogueAttacks(flist.child2);
	this.warrior = new WarriorAttacks(flist.child3);
	this.summoner = new SummonerAttacks(flist.child4);

}
var cl = new classList();
var attackDeterminer = function(){

	this.one = cl.mage;
	this.two = cl.rogue;
	this.three = cl.warrior;
	this.four = cl.summoner;
	
	this.det = function(fighter,attackNo){
		this[fighter].attack(attackNo);
	}

}
var ad = new attackDeterminer();





var playerTurn = function(){

	this.attack = function(fighter,attackNo){
		
	}

}

var enemyTurn = function(){

}

