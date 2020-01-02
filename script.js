

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


function devHack(){
	mathematica.mathematica = mathematica.mathematica.add(1000);
	parents.realDollars = parents.realDollars.add(1000);
	iq.points = iq.points.add(1000);
	iq.ps = iq.ps.add(100);
	lobbying.lobbyingDollars = lobbying.lobbyingDollars.add(1000000);
	Object.keys(child).forEach(function(c){
		child[c].termspeed = 1;
	});
}

function step(timestamp) {
	t = Date.now();
	dt = t - lt;
	tickTimer += dt;
	if(tickTimer >= tickSpeed){
		tick(tickTimer);
		tickTimer = 0;
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
	document.getElementById("M2RDC").innerHTML = parents.realDollarsLive.toPrecision(3);

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

	},3000);
	window.setTimeout(function(){

		document.getElementById("postchild1").style.opacity = "0";
		document.getElementById("postchild1").style.fontSize = "0";
		document.getElementById("postchild2").style.opacity = "1";
		
	},6000);
	window.setTimeout(function(){

		document.getElementById("postchild2").style.opacity = "0";
		document.getElementById("postchild2").style.fontSize = "0";
		document.getElementById("schoolingheading").style.opacity = "1";
		document.getElementById("child1").style.opacity = "1";
		child.one.newChild();
		document.getElementById("tabletotals").style.opacity = 1;
		document.getElementById("tabletotals").style.zIndex = 1;
		document.getElementById("childstory").innerHTML = "";
		
	},9000);
}




var genericAutobuyer = function(){

}

