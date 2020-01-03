
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

var unlockMPSMultiplier = new lobbyingAcc(new Decimal(1.2), new Decimal(1.3), new Decimal(1.02), new Decimal(1.1));

var unlockCostDivider = new lobbyingAcc(new Decimal(1.2),new Decimal(13), new Decimal(1.02), new Decimal(1.1));

var LobbyingUpgradeable = function(){

	this.lobbyingDollars = new Decimal(0);

	this.lobbyingDollarsLive = new Decimal(0);

	this.highestLobbyingDollars = new Decimal(0);

	this.openable = false;

	this.purchasable = false;

	this.levelOfMathematicaUpgrades = 0;

	this.show = function(){

		if(this.openable){
			document.getElementById("bigLobbyingContainer").style.left = "0px";
			document.getElementById("mainContainer").style.marginLeft = "-120%";
			document.getElementById("mainContainer").style.marginRight = "120%";
		}

	}

	this.close = function(){

		document.getElementById("bigLobbyingContainer").style.left = "120%";
		document.getElementById("mainContainer").style.marginLeft = "0px";
		document.getElementById("mainContainer").style.marginRight = "0px";

	}

	this.updateTotals = function(){

		total = new Decimal(0);

		Object.keys(child).forEach(function(c){

			total = total.add(childToLobbyingDollars(child[c]));

		});

		this.lobbyingDollarsLive = total;


		if(this.lobbyingDollars.gt(this.highestLobbyingDollars)) this.highestLobbyingDollars = this.lobbyingDollars;

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

				document.getElementById("lobp1").innerHTML = "You are now liquidating mathematica to Real Dollars Instantly.";

				document.getElementById("story4").style.display = "none";
			}

		}

	}

	this.upgradeXIncrease = function(){
		if(this.lobbyingDollars.gte(increaseXUpgradeable.currentCost)){

			this.lobbyingDollars = this.lobbyingDollars.minus(increaseXUpgradeable.currentCost);

			increaseXUpgradeable.upgrade();

			document.getElementById("whatever the cost amount  element is").innerHTML = increaseXUpgradeable.currentCost.toPrecision(3);

			document.getElementById("xamount").innerHTML = increaseXUpgradeable.current.divide(10).toPrecision(3);

		}

	}

	this.unlockMPSMultiplier = function(){
		if(this.levelOfMathematicaUpgrades==0){

			document.getElementById("u1Alg").style.opacity = 1;
			document.getElementById("u1Alg").style.zIndex = 1;
			document.getElementById("u1Alg").innerHTML= "MPS *<span id=u1Algp>"+mathematica.mpsMult.accbasemult.toPrecision(3)+"</span> <br />Cost:<span id=u1Algc>10.0</span>IQ Points";
			document.getElementById("lobm1").innerHTML = "Encourage the Government to increase carbon offset tax. <br /> Multiply the MPS Multiplier by 1.02 <br />Cost:<span id=lobm1c>1.30</span>Lobbying Dollars";
			
			document.getElementById("lobm2").style.marginTop = 0;
			this.levelOfMathematicaUpgrades += 1;
			return;

		}
		if(this.lobbyingDollars.gte(unlockMPSMultiplier.currentCost)){
			this.lobbyingDollars.subtract(unlockMPSMultiplier.currentCost);

			unlockMPSMultiplier.upgrade();

			document.getElementById("lobm1c").innerHTML = unlockMPSMultiplier.currentCost.toPrecision(3);

			mathematica.mpsMult.accbasemult = unlockMPSMultiplier.current;

			document.getElementById("u1Algp").innerHTML = mathematica.mpsMult.accbasemult.toPrecision(3);


		}
	}
	this.unlockCostDivider = function(){
		console.log(this.levelOfMathematicaUpgrades);
		if(this.levelOfMathematicaUpgrades==1){

			document.getElementById("u2Alg").style.opacity = 1;
			document.getElementById("u2Alg").style.zIndex = 1;
			document.getElementById("u2Alg").innerHTML= "Cost /<span id=u2Algp>"+mathematica.costDiv.accbasemult.toPrecision(3)+"</span> <br />Cost:<span id=u2Algc>100.0</span>IQ Points";
			document.getElementById("lobm2").innerHTML = "Encourage the Government to hand out solar panel incentives. <br /> Multiply the Cost Divider by 1.02 <br />Cost:<span id=lobm2c>13.0</span>Lobbying Dollars";
			
			this.levelOfMathematicaUpgrades += 1;
			return;

		}
		if(this.lobbyingDollars.gte(unlockCostDivider.currentCost)){

			this.lobbyingDollars.subtract(unlockCostDivider.currentCost);

			unlockCostDivider.upgrade();

			document.getElementById("lobm2c").innerHTML = unlockCostDivider.currentCost.toPrecision(3);

			mathematica.costDiv.accbasemult = unlockCostDivider.current;

			document.getElementById("u2Algp").innerHTML = mathematica.costDiv.accbasemult.toPrecision(3);


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