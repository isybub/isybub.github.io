
var lobbyingAcc = function(base,baseCost,baseMult,costMult){

	this.base = base;

	this.current = base;

	this.baseCost = baseCost;

	this.currentCost = baseCost;

	this.baseMult = baseMult;

	this.costMult = costMult;

	this.upgradeCount = new Decimal(0);

	this.purchased = false;

	this.upgrade = function(){

		this.upgradeCount = this.upgradeCount.add(1);

		this.current = this.base.multiply(this.baseMult.pow(this.upgradeCount));

		this.currentCost = this.baseCost.multiply(this.costMult.pow(this.upgradeCount));

		document.getElementById("LobbyingDollars").innerHTML = lobbying.lobbyingDollars.toPrecision(3);

	}

}

var examLobbyingUpgradeable = new lobbyingAcc(new Decimal(2),new Decimal(1.3),new Decimal(2),new Decimal(3));

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
		document.getElementById("mainContainer").style.marginRight = "120%";

	}

	this.updateTotals = function(){

		total = new Decimal(0);

		Object.keys(child).forEach(function(c){

			total = total.add(childToLobbyingDollars(child[c]));

		});

		this.lobbyingDollarsLive = total;


		if(this.lobbyingDollars.gt(this.highestLobbyingDollars)) this.highestLobbyingDollars = this.lobbyingDollars;

		document.getElementById("lobbyinggain").innerHTML = this.lobbyingDollarsLive.toPrecision(3);

		document.getElementById("LobbyingDollars").innerHTML = this.lobbyingDollars.toPrecision(3);
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


		if(!examLobbyingUpgradeable.purchased) examLobbyingUpgradeable.purchased = true;
		if(this.lobbyingDollars.gte(examLobbyingUpgradeable.currentCost)){


			this.lobbyingDollars = this.lobbyingDollars.minus(examLobbyingUpgradeable.currentCost);

			examLobbyingUpgradeable.upgrade();

			document.getElementById("lobc1d").innerHTML = "Encourage the Government to increase teachers pay.<br />Multiplies exam IQ Multiplier by 2 <br />(Currently "+examLobbyingUpgradeable.current.toPrecision(3)+")<br /><a href=\"javascript:lobbying.upgradeExamMult()\" id=lobc1><h3><span id=lobc1c>1.30</span> Lobbying Dollars</h3></a>";

			document.getElementById("lobc1c").innerHTML = examLobbyingUpgradeable.currentCost.toPrecision(3);
			


		}


	}

	this.upgradeParentsAutobuyer = function(){

		if(!parentsAutobuyerUpgradeable.purchased) parentsAutobuyerUpgradeable.purchased = true;
		if(this.lobbyingDollars.gte(parentsAutobuyerUpgradeable.currentCost)){
			if(parentsAutobuyerUpgradeable.upgradeCount<25){

				if(parentsAutobuyerUpgradeable.currentCost.equals(1.30)) {
					document.getElementById("lobp1d").innerHTML = "Encourage the Government to give you a tax break.<br />Your Company can convert Mathematica 1.15x faster <br /><a href=\"javascript:lobbying.upgradeParentsAutobuyer()\" id=lobp1><h3><span id=lobp1c>1.30</span> Lobbying Dollars</h3></a>";
				}

				this.lobbyingDollars = this.lobbyingDollars.minus(parentsAutobuyerUpgradeable.currentCost);

				parentsAutobuyerUpgradeable.upgrade();

				document.getElementById("lobp1c").innerHTML = parentsAutobuyerUpgradeable.currentCost.toPrecision(3);

				parents.timeOfLastBuy = Date.now();

				parents.autobuyingSpeed = parentsAutobuyerUpgradeable.current.multiply(1000);

				//document.getElementById("parentsAutobuyerSpeed").innerHTML = new Decimal(1).divide(parentsAutobuyerUpgradeable.current).toPrecision(3);

			}
			if(parentsAutobuyerUpgradeable.upgradeCount==25){

				document.getElementById("ParentsContainer").innerHTML = "Real Dollars: <h1>$<span id=\"RealDollars\">0</span></h1><h2><span id=realdollarspersecond></span>/s</h2>You are liquidating mathematica to Real Dollars instantly.";

				document.getElementById("ParentsContainer").style.height = "200px";
				document.getElementById("ParentsContainer").style.width = "200px";
				document.getElementById("ParentsContainer").style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--good'); 

			}

		}

	}

	this.upgradeXIncrease = function(){
		if(!upgradeXIncrease.purchased) upgradeXIncrease.purchased = true;
		if(this.lobbyingDollars.gte(increaseXUpgradeable.currentCost)){

			this.lobbyingDollars = this.lobbyingDollars.minus(increaseXUpgradeable.currentCost);

			increaseXUpgradeable.upgrade();

			document.getElementById("whatever ").innerHTML = increaseXUpgradeable.currentCost.toPrecision(3);

			document.getElementById("xamount").innerHTML = increaseXUpgradeable.current.divide(10).toPrecision(3);

		}

	}

	this.unlockMPSMultiplier = function(){
		if(this.lobbyingDollars.gte(unlockMPSMultiplier.currentCost)){

			this.lobbyingDollars = this.lobbyingDollars.subtract(unlockMPSMultiplier.currentCost);
			if(!unlockMPSMultiplier.purchased){

				document.getElementById("u1Alg").style.opacity = 1;
				document.getElementById("u1Alg").style.zIndex = 1;
				document.getElementById("u1Alg").innerHTML= "<h3>MPS *<span id=u1Algp>"+mpsMult.accbasemult.toPrecision(3)+"</span> <br /><span id=u1Algc>10.0</span> IQ Points</h3>";
				document.getElementById("lobm1d").innerHTML = "Encourage the Government to increase carbon offset tax. <br /> Multiply MPS Multiplier by * 1.02 <br />(Currently <span id=mpsmultinfo>1.2</span>)<br /><a href=\"javascript:lobbying.unlockMPSMultiplier()\" id=lobm1><h3><span id=lobm1c>1.30</span> Lobbying Dollars</h3></a>";
				
				document.getElementById("lobm2d").style.marginTop = 0;
				document.getElementById("lobm2d").style.marginBottom = 0;
				unlockMPSMultiplier.purchased = true;
				return;

			}

			unlockMPSMultiplier.upgrade();

			document.getElementById("lobm1c").innerHTML = unlockMPSMultiplier.currentCost.toPrecision(3);

			mpsMult.accbasemult = unlockMPSMultiplier.current;

			document.getElementById("u1Algp").innerHTML = mpsMult.accbasemult.toPrecision(3);

			document.getElementById("mpsmultinfo").innerHTML = mpsMult.accbasemult.toPrecision(3);


		}
		
	}
	this.unlockCostDivider = function(){
		if(this.lobbyingDollars.gte(unlockCostDivider.currentCost)){

			this.lobbyingDollars = this.lobbyingDollars.subtract(unlockCostDivider.currentCost);
			if(!unlockCostDivider.purchased){

				
				document.getElementById("u2Alg").style.opacity = 1;
				document.getElementById("u2Alg").style.zIndex = 1;
				document.getElementById("u2Alg").innerHTML= "<h3>Cost /<span id=u2Algp>"+costDiv.accbasemult.toPrecision(3)+"</span> <br /><span id=u2Algc>100.0</span> IQ Points</h3>";
				document.getElementById("lobm2d").innerHTML = "Encourage the Government to hand out solar panel incentives. <br /> Multiply the Cost Divider by * 1.02 <br />(Currently <span id=costdivinfo>1.2</span>)<br /><a href=\"javascript:lobbying.unlockCostDivider()\" id=lobm2><h3><span id=lobm2c>13.0</span> Lobbying Dollars</h3></a>";
				
				unlockCostDivider.purchased = true;
				return;

			}

			unlockCostDivider.upgrade();

			document.getElementById("lobm2c").innerHTML = unlockCostDivider.currentCost.toPrecision(3);

			costDiv.accbasemult = unlockCostDivider.current;

			document.getElementById("u2Algp").innerHTML = costDiv.accbasemult.toPrecision(3);

			document.getElementById("costdivinfo").innerHTML = costDiv.accbasemult.toPrecision(3);


		}
	}



}
var lobbying = new LobbyingUpgradeable();


var lobbyingIncrementor = function(){

	this.one = examLobbyingUpgradeable;
	this.two = parentsAutobuyerUpgradeable;
	this.three = increaseXUpgradeable;
	this.four = unlockMPSMultiplier;
	this.five = unlockCostDivider;

}

var lobinc =  new lobbyingIncrementor();

function childToLobbyingDollars(givenChild){

	if(givenChild.purchased && givenChild.currentYear.gt(1)){

		return givenChild.currentYear.pow(givenChild.currentYear.sqrt(2));

	}

	return new Decimal(0);

}



var lobbyingAccLoader = new function (){

	this.load = function(lobaccobject){

		Object.keys(lobinc).forEach(function(c){

			Object.keys(lobaccobject[c]).forEach(function(k){


					lobinc[c][k] = lobaccobject[c][k];
					if(!isNaN(new Decimal(lobinc[c][k]))
						&&typeof(lobinc[c][k])!=='boolean')lobinc[c][k] = new Decimal(lobinc[c][k]);



			});


		});
		if(unlockMPSMultiplier.purchased){

			document.getElementById("u1Alg").style.opacity = 1;
			document.getElementById("u1Alg").style.zIndex = 1;
			document.getElementById("u1Alg").innerHTML= "<h3>MPS *<span id=u1Algp>"+mpsMult.accbasemult.toPrecision(3)+"</span> <br /><span id=u1Algc>10.0</span> IQ Points</h3>";
			document.getElementById("lobm1d").innerHTML = "Encourage the Government to increase carbon offset tax. <br /> Multiply MPS Multiplier by * 1.02 <br />(Currently <span id=mpsmultinfo>1.2</span>)<br /><a href=\"javascript:lobbying.unlockMPSMultiplier()\" id=lobm1><h3><span id=lobm1c>1.30</span> Lobbying Dollars</h3></a>";
			
			document.getElementById("lobm2d").style.marginTop = 0;
			document.getElementById("lobm2d").style.marginBottom = 0;

			document.getElementById("lobm1c").innerHTML = unlockMPSMultiplier.currentCost.toPrecision(3);

			document.getElementById("u1Algp").innerHTML = mpsMult.accbasemult.toPrecision(3);

			document.getElementById("u1Algc").innerHTML = mpsMult.accCost.toPrecision(3);

			document.getElementById("mpsmultinfo").innerHTML = mpsMult.accbasemult.toPrecision(3);

		}
		if(unlockCostDivider.purchased){

			document.getElementById("u2Alg").style.opacity = 1;
			document.getElementById("u2Alg").style.zIndex = 1;
			document.getElementById("u2Alg").innerHTML= "<h3>Cost /<span id=u2Algp>"+costDiv.accbasemult.toPrecision(3)+"</span> <br /><span id=u2Algc>100.0</span> IQ Points</h3>";
			document.getElementById("lobm2d").innerHTML = "Encourage the Government to hand out solar panel incentives. <br /> Multiply the Cost Divider by * 1.02 <br />(Currently <span id=costdivinfo>1.2</span>)<br /><a href=\"javascript:lobbying.unlockCostDivider()\" id=lobm2><h3><span id=lobm2c>13.0</span> Lobbying Dollars</h3></a>";
			
			document.getElementById("lobm2c").innerHTML = unlockCostDivider.currentCost.toPrecision(3);

			document.getElementById("u2Algp").innerHTML = costDiv.accbasemult.toPrecision(3);

			document.getElementById("costdivinfo").innerHTML = costDiv.accbasemult.toPrecision(3);
			document.getElementById("u2Algc").innerHTML = costDiv.accCost.toPrecision(3);
		}
		if(increaseXUpgradeable.purchased){


			document.getElementById("whatever ").innerHTML = increaseXUpgradeable.currentCost.toPrecision(3);

			document.getElementById("xamount").innerHTML = increaseXUpgradeable.current.divide(10).toPrecision(3);

		}
		if(parentsAutobuyerUpgradeable.upgradeCount<25){

				document.getElementById("lobp1d").innerHTML = "Encourage the Government to give you a tax break.<br />Your Company can convert Mathematica 1.15x faster <br /><a href=\"javascript:lobbying.upgradeParentsAutobuyer()\" id=lobp1><h3><span id=lobp1c> 1.30 </span> Lobbying Dollars</h3></a>";


				document.getElementById("lobp1c").innerHTML = parentsAutobuyerUpgradeable.currentCost.toPrecision(3);

				//document.getElementById("parentsAutobuyerSpeed").innerHTML = new Decimal(1).divide(parentsAutobuyerUpgradeable.current).toPrecision(3);

		}
		if(parentsAutobuyerUpgradeable.upgradeCount==25){

			document.getElementById("ParentsContainer").innerHTML = "Real Dollars: <h1>$<span id=\"RealDollars\">0</span></h1><h2><span id=realdollarspersecond></span>/s</h2>You are liquidating mathematica to Real Dollars instantly.";

			document.getElementById("ParentsContainer").style.height = "200px";
			document.getElementById("ParentsContainer").style.width = "200px";
			document.getElementById("ParentsContainer").style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--good'); 

		}
		if(examLobbyingUpgradeable.purchased){			

			document.getElementById("lobc1d").innerHTML = "Encourage the Government to increase teachers pay.<br />Multiplies exam IQ Multiplier by 2 <br />(Currently "+examLobbyingUpgradeable.current.toPrecision(3)+")<br /><a href=\"javascript:lobbying.upgradeExamMult()\" id=lobc1><h3><span id=lobc1c>1.30</span> Lobbying Dollars</h3></a>";

			document.getElementById("lobc1c").innerHTML = examLobbyingUpgradeable.currentCost.toPrecision(3);
		}
		
	}

}

var lobbyingLoader = new function(){
	this.load = function(lobbobject){
		Object.keys(lobbobject).forEach(function(c){
			lobbying[c] = lobbobject[c];
			if(!isNaN(new Decimal(lobbying[c]))) lobbying[c] = new Decimal(lobbying[c]);
		});
		
	}
}


