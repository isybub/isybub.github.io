

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
		
	


	if(battle.happening){
		battle.update();

		player.fighter.updateStatus()
	
		for(i = 1; i <= battle.enemyCount; i++){
	
			flist["enemy"+i].updateStatus();
	
		}
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

	this.enemyCount = 0;

	this.playerCount = 1;

	this.happening = false;

	this.currentSlotHolder = 0;

	this.readyToAttack = false;

	this.currentEnemy = new Decimal(1);

	this.previouslySelectedPerk = 0;

	this.show = function() {
		if(this.openable){
			document.getElementById("mainContainer").style.opacity = "0";
			document.getElementById("mainContainer").style.zIndex = "-1";
			document.getElementById("bigBattlingContainer").style.opacity = "1";
			document.getElementById("bigBattlingContainer").style.zIndex = "1";
			
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

			//document.body.style.overflowY = "hidden";
		}
	}

	this.hide = function(){
			document.getElementById("mainContainer").style.opacity = "1";
			document.getElementById("mainContainer").style.zIndex = "1";
			document.getElementById("bigBattlingContainer").style.opacity = "0";
			document.getElementById("bigBattlingContainer").style.zIndex = "-1";
			
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

			//document.body.style.overflowY = "scroll";

	}

	this.showFirstScreen = function(){

		var disp = document.getElementById("middleDisplay");

		var finalString = "<div id=classChoice><p>Choose the class of your first child to go to battle.</p>"+
							"<a href=\"javascript:battle.chooseFighter(1,\'one\',\'mage\')\">Mage</a>"+
							"<a href=\"javascript:battle.chooseFighter(1,\'one\',\'rogue\')\">Rogue</a>"+
							"<a href=\"javascript:battle.chooseFighter(1,\'one\',\'warrior\')\">Warrior</a>"+
							"<a href=\"javascript:battle.chooseFighter(1,\'one\',\'summoner\')\">Summoner</a></p>";


		disp.innerHTML = finalString;

	}

	this.showEnemySelectScreen = function() {
		

		if(this.enemyCount == 1) {
			battle.selectEnemy(1);
			return;
		}

		
		var d = document.getElementById("attackButtons");

		var finalString = "";

		for(var i = 1; i <= this.enemyCount; i++){

			finalString += "<div id=buttonHolder><a href=\"javascript:battle.selectEnemy("+i+")\">Enemy "+i+"</a></div>"

		}

		d.innerHTML = finalString;

	}

	this.selectEnemy = function(enemynum) {
		
		flist.selected = flist["enemy"+enemynum];
		
		document.getElementById("attackButtons").innerHTML = "";

		this.discoverCards();

	}

	this.chooseFighter = function(num,numstr,pclass){

		
		flist["child"].nameOfClass = pclass;


		var disp = document.getElementById("middleDisplay");

		var pdisp = document.getElementById("playerDisplay");

		var edisp = document.getElementById("enemyDisplay");

		disp.innerHTML = "FIGHT";

		pdisp.innerHTML += "<div class=healthbar id=p1health onmouseover=\'javascript:battle.displayPlayerInfo()\' onmouseout=\'javascript:battle.hideInfo()\'><h2> "+flist["child"].getHP()+" / "+flist["child"].getHP()+" </h2></div>";
		document.getElementById("p1health").style.boxShadow = "inset -"+player.fighter.currentHP.divide(player.fighter.getHP()).multiply(300)+"px 0px 0px var(--good)";

		edisp.innerHTML += "<div class=healthbar id=e1health onmouseover=\'javascript:battle.displayEnemyInfo()\' onmouseout=\'javascript:battle.hideInfo()\'><h2> first enemy </h2></div>";
		edisp.innerHTML += "<div class=atbe id=atbe1></<div>"

		this.happening = true;

		this.playerCount = 1;

		this.enemyCount = 1;


	}

	this.hideInfo = function(){
		
		for(i =0; i < document.getElementsByClassName("infoBox").length; i++){
			document.getElementsByClassName("infoBox")[i].style.opacity = 0;
		}
	}

	this.displayEnemyInfo = function(){

		var disp = document.getElementById("EnemyInfo");
		
		this.displayInfo(disp,flist.enemy1,"Enemy "+battle.currentEnemy);

	}

	this.displayPlayerInfo = function(){
		var disp = document.getElementById("PlayerInfo");
		
		this.displayInfo(disp,player.fighter,"Player");
		
	}

	this.displayInfo = function(disp,f,name){
		disp.innerHTML = "<h2 style=\'width:300px;\'> "+name+"</h2></p>"+
						"<p><span> Attack: </span><span>"+ f.baseAttack.toPrecision(3)+"</span></p>"+
						" <p><span>Defence: </span><span>"+ f.baseDefence.toPrecision(3)+"</span></p>"+
						" <p><span>Speed: </span><span>"+ f.baseSpeed.toPrecision(3)+"</span></p>"+
						" <p><span>Health Points: </span><span>"+ f.baseHP.toPrecision(3)+"</span></p>"+
						" <p><span>Attack Multiplier: </span><span>"+ f.attackMult.toPrecision(3)+"</span></p>"+
						" <p><span>Defend Multiplier: </span><span>"+ f.defenceMult.toPrecision(3)+"</span></p>"+
						" <p><span>Speed Multiplier: </span><span>"+ f.speedMult.toPrecision(3)+"</span></p>"+
						" <p><span>Health Multiplier: </span><span>"+ f.HPMult.toPrecision(3)+"</span></p>";
		disp.style.opacity = 1;
	}

	this.update = function(){

		this.updatePlayer();

		this.updateEnemy();


	

	}

	this.updatePlayer = function(){


		var p = player.fighter;

		if(p.bar.equals(0)){
			
			var atb = document.getElementById("atb");

			atb.style.boxShadow = "inset 0vw 0px 0px var(--light)";

			atb.style.transition = p.getSpeed()+"s box-shadow linear";

			atb.style.boxShadow = "inset -80vw 0px 0px var(--light)";

			p.chargeStart = Date.now();

			p.bar = p.bar.add(0.5);

		}else if(p.bar.lt(1)){

			if((Date.now() - p.chargeStart)/1000 > p.getSpeed()){

				p.bar = new Decimal(1);

			}

		}

	}

	this.updateEnemy = function(){

		for(i = 1; i <= this.enemyCount; i++){

			e = flist["enemy"+i];

			if(e.bar.equals(0)){
			
				var atb = document.getElementById("atbe"+i);

				atb.style.transition = "0s box-shadow";
	
				atb.style.boxShadow = "inset 0px 0px 0px var(--light)";

				setTimeout(function() {
					
					atb.style.transition = e.getSpeed()+"s box-shadow linear";
		
					atb.style.boxShadow = "inset -300px 0px 0px var(--light)";

				}, 10);
	
				e.chargeStart = Date.now();
	
				e.bar = e.bar.add(0.5);
	
			}else if(e.bar.lt(1)){
	
				if((Date.now() - e.chargeStart)/1000 > e.getSpeed()){
	
					e.bar = new Decimal(1);
	
				}
	
			}

		}

	}

	this.discoverCards = function(){

		var slotsSpare = player.slots;

		var cardList = [];

		
		for(i = 0; i < player.handSize; i++){

			var chance = Math.random()*player.fighter.attackList.length;
			var att = player.fighter.attackList[Math.floor(chance)];
			cardList.push(att);

		}

		player.currentCards = cardList;

		this.displayCards();

	}


	this.displayCards = function(){

		var disp = 	document.getElementById("attackButtons");

		var additivestring = "";

		for(i = 0; i < player.slots; i++){
			additivestring += "<div class=slot></div>"
		}


		disp.innerHTML += "<div id=slotsdisplay>"+additivestring+"</div>";

		additivestring = "";

		for(i = 0; i < player.currentCards.length; i++){

			additivestring += "<div class=\'attackinslot slotwidth"+ad.detSize(player.currentCards[i])+" perk"+ad.detType(player.currentCards[i])+"\'"
			+" onClick=\"javascript:battle.selectMove(this,\'"+player.currentCards[i]+"\')\"><h3>"+ad.detName(player.currentCards[i])+"</h3></div>";

		}

		disp.innerHTML += "<div id=carddisplay>"+additivestring;

		disp.innerHTML +="</div>"

		this.currentSlotHolder = 0;
	}

	this.selectMove = function(elem,attackName){
		//the first move that gets selected doesn't get removed from the selection list
		if(document.getElementsByClassName("slot").length - ad.detSize(attackName) >=0 && elem.parentNode.id!="slotsdisplay"){

			player.selectedMoves.push(attackName);

			while(document.getElementsByClassName("slot").length){
				
				var slotholder = document.getElementsByClassName("slot")[0];
				document.getElementById("slotsdisplay").removeChild(slotholder);

			}
			

			document.getElementById("slotsdisplay").appendChild(elem);
			var sizeOfAttack = 0;
			for(i = 0; i < player.selectedMoves.length; i++){
				sizeOfAttack += ad.detSize(player.selectedMoves[i]);
			}
			for(i = 0; i < player.slots - sizeOfAttack; i++){

				document.getElementById("slotsdisplay").innerHTML += "<div class=slot></div>";

			}
			
			this.currentSlotHolder = 0;

		}
		
		if(!this.readyToAttack){
			var disp = document.getElementById("attackButtons")
			var str = disp.innerHTML;
			disp.innerHTML ="<a href=\'javascript:player.doAttack()\' id=attackbutton>ATTACK</a>" + str;
			this.readyToAttack = true;
		}

		
	}

	this.deadPlayer = function(){
		this.happening = false;
		
		this.displayDeathScreen();
	}

	this.displayDeathScreen = function(){



		/*

		I want the perk tree to look like this


					    ◯      ◯
					◯      ◯      ◯
				◯      ◯      ◯      ◯
					◯      ◯      ◯
						◯      ◯
						    ◯


							middle line being new moves
							left side being offensive upgrades
							right side being defensive upgrades
		*/
		
		var perktree = document.getElementById("perktree");
		var store = document.getElementById("store");
		var unlocked = cl[player.fighter.nameOfClass].unlocked;
		perktree.innerHTML = "<h1> Perks </h1>"+
							"<h2> You have: "+player.perkPoints+" perk points. </h2>";
		var str = "";
		for(i=0;i<7;i++){
			str +="<div class=perkH>";
			var perk = cl[player.fighter.nameOfClass].perkStructure
			for(j=0;j<perk[i].length;j++){
				var unlockedString = "class=\'perk";
				if(unlocked.includes(perk[i][j])) unlockedString += " unlockedperk";
				unlockedString += " perk"+ ad.detType(perk[i][j]) + "\'";
				str += "<div "+unlockedString+" onclick=\'javascript:battle.showperkinfo(this,"+i+","+j+")\'></div>";
			}
			str += "</div>";
		}
		str += "<div id=perkinfo><h2>Click a perk to view info</h2></div>"
		perktree.innerHTML += str;


		store.innerHTML = "<h1> Store </h1>"+
						"<h2>You have: $"+player.lootingDollars.toPrecision(3)+" Looting Dollars.";

		
				
		document.getElementById("deathScreen").style.marginLeft = "0px";
		document.getElementById("bigBattlingContainer").style.marginLeft = "-120%";
		document.getElementById("bigBattlingContainer").style.marginRight = "120%";
				
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
							
					
					

	}
	this.closeDeathScreen = function(){
					
		document.getElementById("deathScreen").style.marginLeft = "120%";
		document.getElementById("bigBattlingContainer").style.marginLeft = "0px";
		document.getElementById("bigBattlingContainer").style.marginRight = "120%";
		
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

	}

	this.showperkinfo = function(el,i,j){
		var disp = document.getElementById("perkinfo");
		var cla = cl[player.fighter.nameOfClass]; //class is a protected namespace :(
		var perk = cla.perkStructure[i][j];
		disp.innerHTML = "<h2 class=perk"+ad.detType(perk)+">"+ad.detName(perk)+"</h2>"+
						"<p>"+ad.detScript(perk)+"</p>";
		
		el.style.boxShadow = "0px 0px 20px var(--white)"
		if(this.previouslySelectedPerk!=0){
			this.previouslySelectedPerk.style.boxShadow = "0px 0px 0px #000";
		}
		this.previouslySelectedPerk = el;
						
	}

	this.resume = function(){
		disp = document.getElementById("attackButtons");
		disp.innerHTML = "<div id=atb><h1>ATB</h1></div>";
		
		var u = player.u;
		player.fighter = new Fighter(u[0],u[1],u[2],u[3],u[4],u[5],u[6],u[7]);

		this.clearBattleDisplay();
		this.chooseFighter(1,"one",player.fighter.nameOfClass);
	}

	this.clearBattleDisplay = function(){
		document.getElementById("playerDisplay").innerHTML = "<div class=infoBox id=PlayerInfo></div>";
		document.getElementById("middleDisplay").innerHTML = "";
		document.getElementById("enemyDisplay").innerHTML = "<div class=infoBox id=EnemyInfo></div>";
	}

	this.deadEnemy = function(){
		player.finalizeKill(this.currentEnemy);
		this.currentEnemy = this.currentEnemy.add(1);
		var e = neg.gen(this.currentEnemy);
		flist.enemy1 = new Fighter(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]);
		flist.selected = flist.enemy1;
		
		bar = document.getElementById("e1health");
		bar.innerHTML = "<h2>Enemy "+this.currentEnemy+"</h2>";
		bar.style.boxShadow = "inset -"+flist.selected.currentHP.divide(flist.selected.getHP()).multiply(300)+"px 0px 0px var(--good)";
	}

	

}

var newEnemyGenerator = function(){
	this.gen = function(num){
		var att = num.divide(10).add(1).pow(2);
		var def = num.divide(10).add(1).pow(2);
		var spd = num.divide(10).add(1).pow(2);
		var hp = num.add(2).pow(2);
		var attm = new Decimal(1);
		var defm = new Decimal(1);
		var spdm = new Decimal(1);
		var hpm = new Decimal(1);
		return [att,def,spd,hp,attm,defm,spdm,hpm];

	}
}
var neg = new newEnemyGenerator();


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
	this.attackList = [];
	this.nameOfClass = "Mage";


	this.dealDamage = function(damage){

		var a = flist.selected;

		a.currentHP = a.currentHP.minus(damage.divide(a.baseDefence.multiply(a.defenceMult)));
		var bar;
		if(a == player.fighter){

			bar = document.getElementById("p1health");
			if(a.currentHP.lte(0)){
				battle.deadPlayer();
				return;
			}

		}else{

			bar = document.getElementById("e1health");
			if(a.currentHP.lte(0.01)){
				battle.deadEnemy();
				return;
			}

		}
		
		bar.innerHTML = "<h2>"+a.currentHP.toPrecision(3) + " / " + a.getHP().toPrecision(3)+"</h2>";
		bar.style.boxShadow = "inset -"+a.currentHP.divide(a.getHP()).multiply(300)+"px 0px 0px var(--good)";
		if(a.defenceMult.gt(1)) {
			a.defenceMult = new Decimal(1);
			bar.style.borderColor = "var(--good)";
		}

	}
	this.defend = function(){
		this.defenceMult = this.defenceMult.multiply(1.2);
		var bar;
		if(this == player.fighter){

			bar = document.getElementById("p1health");

		}else{

			bar = document.getElementById("e1health");

		}
		var str = bar.style.boxShadow;
		bar.style.boxShadow = str+",0px 0px 20px var(--light)";
		bar.style.borderColor = "var(--light)";
	}
	

	this.updateStatus = function(){

		if(this == player.fighter){
			

			if(this.bar.equals(1)){
				battle.showEnemySelectScreen();
				this.bar = new Decimal(1.5);
			}


		}

		if(this.bar.equals(1)){

			var prevsel = flist.selected;

			flist.selected = player.fighter;

			
			this.dealDamage(new Decimal(this.baseAttack.multiply(this.attackMult)));

			

			flist.selected = prevsel;

			this.bar = new Decimal(0);
		}

		

	}

	this.getSpeed = function(){

		return new Decimal(8).divide(this.baseSpeed.multiply(this.speedMult));

	}

	this.getHP = function(){
		return this.baseHP.multiply(this.HPMult);
	}

}
var fighterList = function(){
	
	var devAttackListPLSremove = ["Attack","Attack","Attack","Defend","Defend","Defend"];

	this.child = new Fighter(1,1,2,20,1,1,1,1);
	this.child.attackList = devAttackListPLSremove;

	var e = neg.gen(new Decimal(0));
	this.enemy1 = new Fighter(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]);
	this.enemy1.attackList = devAttackListPLSremove; 
	
	

	this.selected = this.enemy1;

	

	

}
var flist = new fighterList();
var MageAttacks = function(fighter){
	this.f = fighter;

	this.fire = 1;
	this.thunder = 2;
	this.ice = 3;
	this.element = this.fire;
	this.details = {"Attack":{"Name":"Fireball","Desc":"A small but pure concentration of energy, taking the form of fire. Deals base damage.","Cost":1,"Size":1,"Type":"Attack"},
					"Defend":{"Name":"Barrier","Desc":"Concentrated energy disrupting any incoming attacks, reducing damage taken by 1.2x per barrier.","Cost":1,"Size":1,"Type":"Defend"},
					"atkup":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup2":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup3":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup4":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup5":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"dfup":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup2":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup3":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup4":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup5":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"Special1":{"Name":"Snowstorm","Desc":"Freeze the enemies feet -50% enemy speed","Cost":50,"Size":2,"Type":"Special"},
					"Special2":{"Name":"Shift","Desc":"Change base element to lightning -50% damage but all attacks hit all enemies. Each lightning strike applies (10% base damage) per turn til death (max 3 stack)","Cost":1000,"Size":2,"Type":"Special"},
					"Special3":{"Name":"Freezer","Desc":"Enemy frozen. Attacking with fire deals 2.5x damage. And de-frosts the enemy. Otherwise defrosts in 2 turns","Cost":5000,"Size":3,"Type":"Special"},
					"Special4":{"Name":"Inferno","Desc":"Deals 3x fire damage, takes 2 turns to wind up (7.5x damage if frozen)","Cost":10000,"Size":3,"Type":"Special"}}
					

	this.perkStructure = [["Attack","Defend"],
					["atkup","Special1","dfup"],
					["atkup2","atkup3","dfup2","dfup3"],
					["atkup4","Special2","dfup4"],
					["atkup5","dfup5"],
					["Special3"],
					["Special4"]];

	this.unlocked = ["Attack","Defend"];

	

	

	this.Attack = function(){
		this.f.dealDamage(this.f.baseAttack.multiply(this.f.attackMult));
	}

	this.Defend = function(){
		this.f.defend();
	}


}

var RogueAttacks = function(fighter){
	this.fighter = fighter;
	this.details = {"Attack":{"Name":"Fireball","Desc":"A small but pure concentration of energy, taking the form of fire. Deals base damage.","Cost":1,"Size":1,"Type":"Attack"},
					"Defend":{"Name":"Barrier","Desc":"Concentrated energy disrupting any incoming attacks, reducing damage taken by 1.2x per barrier.","Cost":1,"Size":1,"Type":"Defend"},
					"atkup":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup2":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup3":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup4":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup5":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"dfup":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup2":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup3":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup4":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup5":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"Special1":{"Name":"Snowstorm","Desc":"Freeze the enemies feet -50% enemy speed","Cost":50,"Size":2,"Type":"Special"},
					"Special2":{"Name":"Shift","Desc":"Change base element to lightning -50% damage but all attacks hit all enemies. Each lightning strike applies (10% base damage) per turn til death (max 3 stack)","Cost":1000,"Size":2,"Type":"Special"},
					"Special3":{"Name":"Freezer","Desc":"Enemy frozen. Attacking with fire deals 2.5x damage. And de-frosts the enemy. Otherwise defrosts in 2 turns","Cost":5000,"Size":3,"Type":"Special"},
					"Special4":{"Name":"Inferno","Desc":"Deals 3x fire damage, takes 2 turns to wind up (7.5x damage if frozen)","Cost":10000,"Size":3,"Type":"Special"}}
					

	this.perkStructure = [["Attack","Defend"],
					["atkup","Special1","dfup"],
					["atkup2","atkup3","dfup2","dfup3"],
					["atkup4","Special2","dfup4"],
					["atkup5","dfup5"],
					["Special3"],
					["Special4"]];

	this.unlocked = ["Attack","Defend"];
	

	this.Attack = function(){
		this.f.dealDamage(this.f.baseAttack.multiply(this.f.attackMult));
	}

	this.Defend = function(){
		this.f.defend();
	}
}

var WarriorAttacks = function(fighter){
	this.fighter = fighter;
	this.details = {"Attack":{"Name":"Fireball","Desc":"A small but pure concentration of energy, taking the form of fire. Deals base damage.","Cost":1,"Size":1,"Type":"Attack"},
					"Defend":{"Name":"Barrier","Desc":"Concentrated energy disrupting any incoming attacks, reducing damage taken by 1.2x per barrier.","Cost":1,"Size":1,"Type":"Defend"},
					"atkup":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup2":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup3":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup4":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup5":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"dfup":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup2":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup3":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup4":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup5":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"Special1":{"Name":"Snowstorm","Desc":"Freeze the enemies feet -50% enemy speed","Cost":50,"Size":2},
					"Special2":{"Name":"Shift","Desc":"Change base element to lightning -50% damage but all attacks hit all enemies. Each lightning strike applies (10% base damage) per turn til death (max 3 stack)","Cost":1000,"Size":2,"Type":"Special"},
					"Special3":{"Name":"Freezer","Desc":"Enemy frozen. Attacking with fire deals 2.5x damage. And de-frosts the enemy. Otherwise defrosts in 2 turns","Cost":5000,"Size":3,"Type":"Special"},
					"Special4":{"Name":"Inferno","Desc":"Deals 3x fire damage, takes 2 turns to wind up (7.5x damage if frozen)","Cost":10000,"Size":3,"Type":"Special"}}
					

	this.perkStructure = [["Attack","Defend"],
					["atkup","Special1","dfup"],
					["atkup2","atkup3","dfup2","dfup3"],
					["atkup4","Special2","dfup4"],
					["atkup5","dfup5"],
					["Special3"],
					["Special4"]];

	this.unlocked = ["Attack","Defend"];
	

	
	this.Attack = function(){
		this.f.dealDamage(this.f.baseAttack.multiply(this.f.attackMult));
	}

	this.Defend = function(){
		this.f.defend();
	}
}

var SummonerAttacks = function(fighter){
	this.fighter = fighter;
	this.details = {"Attack":{"Name":"Fireball","Desc":"A small but pure concentration of energy, taking the form of fire. Deals base damage.","Cost":1,"Size":1,"Type":"Attack"},
					"Defend":{"Name":"Barrier","Desc":"Concentrated energy disrupting any incoming attacks, reducing damage taken by 1.2x per barrier.","Cost":1,"Size":1,"Type":"Defend"},
					"atkup":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup2":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup3":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup4":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"atkup5":{"Name":"Knowledge","Desc":"You spend some time studying energy. Increases your attack by x","Cost":10,"Type":"Attack"},
					"dfup":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup2":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup3":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup4":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"dfup5":{"Name":"Tactics","Desc":"After spending some time in battle, you begin to further understand how to position yourself, to reduce in coming damage by x","Cost":10,"Type":"Defend"},
					"Special1":{"Name":"Snowstorm","Desc":"Freeze the enemies feet -50% enemy speed","Cost":50,"Size":2},
					"Special2":{"Name":"Shift","Desc":"Change base element to lightning -50% damage but all attacks hit all enemies. Each lightning strike applies (10% base damage) per turn til death (max 3 stack)","Cost":1000,"Size":2,"Type":"Special"},
					"Special3":{"Name":"Freezer","Desc":"Enemy frozen. Attacking with fire deals 2.5x damage. And de-frosts the enemy. Otherwise defrosts in 2 turns","Cost":5000,"Size":3,"Type":"Special"},
					"Special4":{"Name":"Inferno","Desc":"Deals 3x fire damage, takes 2 turns to wind up (7.5x damage if frozen)","Cost":10000,"Size":3,"Type":"Special"}}
					

	this.perkStructure = [["Attack","Defend"],
					["atkup","Special1","dfup"],
					["atkup2","atkup3","dfup2","dfup3"],
					["atkup4","Special2","dfup4"],
					["atkup5","dfup5"],
					["Special3"],
					["Special4"]];

	this.unlocked = ["Attack","Defend"];
	this.attack = function(attackNo){
		this[attackNo]();
	}

	

	this.Attack = function(){
		this.f.dealDamage(this.f.baseAttack.multiply(this.f.attackMult));
	}

	this.Defend = function(){
		this.f.defend();
	}
}

var classList = function(){

	this.mage = new MageAttacks(flist.child);
	this.rogue = new RogueAttacks(flist.child);
	this.warrior = new WarriorAttacks(flist.child);
	this.summoner = new SummonerAttacks(flist.child);
	

}
var cl = new classList();
var attackDeterminer = function(){

	
	this.det = function(attackName){
		console.log(attackName);
		cl[player.fighter.nameOfClass][attackName]();
	}
	this.detSize = function(attackName){
		return cl[player.fighter.nameOfClass].details[attackName]["Size"];
	}
	this.detScript = function(attackName){
		return cl[player.fighter.nameOfClass].details[attackName]["Desc"];
	}
	this.detName = function(attackName){
		return cl[player.fighter.nameOfClass].details[attackName]["Name"];
	}
	this.detType = function(attackName){
		return cl[player.fighter.nameOfClass].details[attackName]["Type"];
	}

} 
var a;
var ad = new attackDeterminer();

var PlayerController = function(){

	this.slots = 3;

	this.experience = new Decimal(0);

	this.level = new Decimal(1);

	this.lootingDollars = new Decimal(0);

	this.fighter = flist.child;

	this.currentCards = [];

	this.handSize = 5;

	this.selectedMoves = [];

	this.u = [1,1,2,20,1,1,1,1];

	this.perkPoints = new Decimal(0);

	this.doAttack = function(){

		battle.readyToAttack = false;

		for(move in this.selectedMoves){
			ad.det(this.selectedMoves[move]);
		}
		
		this.selectedMoves = [];

		document.getElementById("attackButtons").innerHTML = "<div id=atb><h1>ATB</h1></div>";
		this.fighter.bar = new Decimal(0);

	}

	this.levelUp = function(){
		
		this.level = this.level.add(1);

		this.perkPoints = this.perkPoints.add(1);

	}

	this.finalizeKill = function(enemylevel){
		this.experience = this.experience.add(enemylevel.pow(2));
		this.lootingDollars = this.lootingDollars.add(enemylevel.pow(0.5));
		this.checkForLevelUp();
	}

	this.checkForLevelUp = function(){

		if(this.experience.gte(this.level.pow(3))) this.levelUp();

	}

}

var player = new PlayerController();






var playerTurn = function(){

	this.attack = function(fighter,attackNo){
		
	}

}

var enemyTurn = function(){

}

