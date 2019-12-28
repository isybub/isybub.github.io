

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


	

	if(lobbyingDollars.gt(highestLobbyingDollars)) highestLobbyingDollars = lobbyingDollars;
	

	mathematica.update();

	parents.update();

	iq.update();

	lobbying.updateTotals();

	Object.keys(child).forEach(function(c){
		child[c].update();
	});
		
	

}





function unlockFirstChild(){
	document.getElementById("tabletotals").style.opacity = 1;
	document.getElementById("tabletotals").style.zIndex = 1;
	child.one.newChild(); 
}




var genericAutobuyer = function(){

}


var lobbyingAcc = function(base,baseCost,baseMult,costMult){

	this.base = base;

	this.current = base;

	this.baseCost = baseCost;

	this.currentCost = baseCost;

	this.baseMult = baseMult;

	this.costMult = costMult;

	this.upgradeCount = new Decimal(0);

	this.upgrade = function(){

		this.upgradeCount = this.upgradeCount.add(1);

		this.current = this.base.multiply(this.baseMult.pow(this.upgradeCount));

		this.currentCost = this.baseCost.multiply(this.costMult.pow(this.upgradeCount));

		document.getElementById("LobbyingDollars").innerHTML = lobbying.lobbyingDollars.toPrecision(3);

	}

}

var examLobbyingUpgradeable = new lobbyingAcc(new Decimal(1),new Decimal(1.3),new Decimal(2),new Decimal(3));

var parentsAutobuyerUpgradeable = new lobbyingAcc(new Decimal(1), new Decimal(1.3), new Decimal(0.87), new Decimal(1.2));

var increaseXUpgradeable = new lobbyingAcc(new Decimal(1), new Decimal(1.3), new Decimal(2), new Decimal(2));

var LobbyingUpgradeable = function(){

	this.lobbyingDollars = new Decimal(0);

	this.lobbyingDollarsLive = new Decimal(0);

	this.openable = false;

	this.purchasable = false;

	this.show = function(){

		if(this.openable)document.getElementById("bigLobbyingContainer").style.top = "200px";

	}

	this.close = function(){

		document.getElementById("bigLobbyingContainer").style.top = "-100%";

	}

	this.updateTotals = function(){

		total = new Decimal(0);

		Object.keys(child).forEach(function(c){

			total = total.add(childToLobbyingDollars(child[c]));

		});

		this.lobbyingDollarsLive = total;

		document.getElementById("lobbyinggain").innerHTML = this.lobbyingDollarsLive.toPrecision(3);
	}



	this.sacrifice = function(){

		if(this.purchasable){

			this.lobbyingDollars = this.lobbyingDollars.add(this.lobbyingDollarsLive);

			document.getElementById("LobbyingDollars").innerHTML = this.lobbyingDollars.toPrecision(3);

			Object.keys(child).forEach(function (c){
				child[c].reset();
			});

			this.show();

		}


	}

	this.upgradeExamMult = function(){

		if(this.lobbyingDollars.gte(examLobbyingUpgradeable.currentCost)){

			this.lobbyingDollars = this.lobbyingDollars.minus(examLobbyingUpgradeable.currentCost);

			examLobbyingUpgradeable.upgrade();

			document.getElementById("lobc1c").innerHTML = examLobbyingUpgradeable.currentCost.toPrecision(3);


		}


	}

	this.upgradeParentsAutobuyer = function(){

		if(this.lobbyingDollars.gte(parentsAutobuyerUpgradeable.currentCost)){
			if(parentsAutobuyerUpgradeable.upgradeCount<25){

				if(parentsAutobuyerUpgradeable.currentCost.equals(1.30)) {
					document.getElementById("parentsAutobuyer").style.opacity = 1;
					document.getElementById("parentsAutobuyer").style.zIndex = 1;
					document.getElementById("lobp1").innerHTML = "Encourage the Government to give you a tax break.<br />Your Company can convert Mathematica 1.15x faster <br />Cost:<span id=lobp1c>1.30</span>Lobbying Dollars";
				}

				this.lobbyingDollars = this.lobbyingDollars.minus(parentsAutobuyerUpgradeable.currentCost);

				parentsAutobuyerUpgradeable.upgrade();

				document.getElementById("lobp1c").innerHTML = parentsAutobuyerUpgradeable.currentCost.toPrecision(3);

				parents.timeOfLastBuy = Date.now();

				parents.autobuyingSpeed = parentsAutobuyerUpgradeable.current.multiply(1000);

				document.getElementById("parentsAutobuyerSpeed").innerHTML = new Decimal(1).divide(parentsAutobuyerUpgradeable.current).toPrecision(3);

			}
			if(parentsAutobuyerUpgradeable.upgradeCount==25){

				document.getElementById("parentsAutobuyer").innerHTML = "You are now liquidating mathematica to Real Dollars Instantly.";
				document.getElementById("parentsAutobuyer").style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--good'); 
				document.getElementById("parentsAutobuyer").style.boxShadow = "none";


				document.getElementById("lobp1").innerHTML = "You are now liquidating mathematica to Real Dollars Instantly.";
				document.getElementById("lobp1").style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--good'); 
				document.getElementById("lobp1").style.boxShadow = "none";

				document.getElementById("story4").style.display = "none";
			}

		}

	}

	this.upgradeXIncrease = function(){
		if(this.lobbyingDollars.gte(increaseXUpgradeable.currentCost)){

			this.lobbyingDollars = this.lobbyingDollars.minus(increaseXUpgradeable.currentCost);

			increaseXUpgradeable.upgrade();

			document.getElementById("lobm1c").innerHTML = increaseXUpgradeable.currentCost.toPrecision(3);

			document.getElementById("xamount").innerHTML = increaseXUpgradeable.current.divide(10).toPrecision(3);

		}

	}


}
var lobbying = new LobbyingUpgradeable();

function childToLobbyingDollars(givenChild){

	if(givenChild.purchased && givenChild.currentYear > 1){

		return Math.pow(givenChild.currentYear,Math.sqrt(givenChild.currentYear));

	}

	return new Decimal(0);

}