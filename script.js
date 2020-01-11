

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
}




var genericAutobuyer = function(){

}



var Battle = function(){


	this.openable = true; // not forever thx


	this.show = function() {
		if(this.openable){
			document.getElementById("mainContainer").style.opacity = "0";
			document.getElementById("mainContainer").style.zIndex = "-1";
			document.getElementById("bigBattlingContainer").style.opacity = "1";
			document.getElementById("bigBattlingContainer").style.zIndex = "1";
		}
	}

	this.hide = function(){
			document.getElementById("mainContainer").style.opacity = "1";
			document.getElementById("mainContainer").style.zIndex = "1";
			document.getElementById("bigBattlingContainer").style.opacity = "0";
			document.getElementById("bigBattlingContainer").style.zIndex = "-1";

	}
}
var battle = new Battle();