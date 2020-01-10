
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

		lobbying.updateTotals();

	}

	this.upgradeAdditively = function(){
		
		this.upgradeCount = this.upgradeCount.add(1);

		this.current = this.base.add(this.baseMult.multiply(this.upgradeCount));

		this.currentCost = this.baseCost.multiply(this.costMult.pow(this.upgradeCount));

		lobbying.updateTotals();

	}

}

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

		this.lobbyingDollarsLive = total.add(lobUps.ldIncrease.current);


		if(this.lobbyingDollars.gt(this.highestLobbyingDollars)) this.highestLobbyingDollars = this.lobbyingDollars;

		document.getElementById("lobbyinggain").innerHTML = this.lobbyingDollarsLive.toPrecision(3);

		document.getElementById("LobbyingDollars").innerHTML = this.lobbyingDollars.toPrecision(3);
	}



	this.sacrifice = function(){

		if(this.purchasable){

			this.lobbyingDollars = this.lobbyingDollars.add(this.lobbyingDollarsLive);

			Object.keys(child).forEach(function (c){
				child[c].reset();
			});

			this.updateTotals();

			this.show();

			this.purchasable = false;

		}


	}

	this.upgradeExamMult = function(){


		if(!lobUps.examMult.purchased) {
			lobUps.examMult.purchased = true;
			document.getElementById("lobc2d").style.margin = "0%";
			if(child.one.upgradeCount.gte(6)){
				this.revealChildUpgrade2();
			}
		}
		if(this.lobbyingDollars.gte(lobUps.examMult.currentCost)){


			this.lobbyingDollars = this.lobbyingDollars.minus(lobUps.examMult.currentCost);

			lobUps.examMult.upgrade();

			document.getElementById("lobc1d").innerHTML = "Encourage the Government to increase teachers pay.<br />"+
														"Multiplies exam IQ Multiplier by 2 <br />(Currently "+
														lobUps.examMult.current.toPrecision(3)+
														")<br /><a href=\"javascript:lobbying.upgradeExamMult()\" id=lobc1><h3><span id=lobc1c>1.30</span> Lobbying Dollars</h3></a>";

			document.getElementById("lobc1c").innerHTML = lobUps.examMult.currentCost.toPrecision(3);

			


		}


	}

	this.revealChildUpgrade2 = function(){

		document.getElementById("lobc2d").innerHTML = "Encourage the Government to listen better to children."+
									"<br /> Increase Lobbying Dollar Gain by +2 <br />"+
									"(Currently +<span id=lobc2p>0</span>)<br />"+
									"<a href=\"javascript:lobbying.upgradeldGain()\" id=lobc2>"+
									"<h3><span id=lobc2c>2.60</span> Lobbying Dollars</h3></a>";

		document.getElementById("lobc2p").innerHTML = lobUps.ldIncrease.current;

		document.getElementById("lobc2c").innerHTML = lobUps.ldIncrease.currentCost.toPrecision(3);

	}

	this.revealChildUpgrade3 = function (){

		document.getElementById("lobc3d").innerHTML = "Encourage the Government to invest in public schools"+
									"<br /> Increase term speed by 1.15x <br />"+
									"(Currently x<span id=lobc3p>1</span>)<br />"+
									"<a href=\"javascript:lobbying.upgradeTermSpeed()\" id=lobc3>"+
									"<h3><span id=lobc3c>5.20</span> Lobbying Dollars</h3></a>";

		document.getElementById("lobc3p").innerHTML = lobUps.termSpeed.current.toPrecision(3);

		document.getElementById("lobc3c").innerHTML = lobUps.termSpeed.currentCost.toPrecision(3);
		
	}



	this.upgradeldGain = function(){
		if(!lobUps.ldIncrease.purchased){
			lobUps.ldIncrease.purchased = true;

			document.getElementById("lobc3d").style.margin = "0%";


		}
		if(this.lobbyingDollars.gte(lobUps.ldIncrease.currentCost)){

			if(lobUps.ldIncrease.upgradeCount.gte(2)){
				this.revealChildUpgrade3();
			}

			this.lobbyingDollars = this.lobbyingDollars.minus(lobUps.ldIncrease.currentCost);
			
			lobUps.ldIncrease.upgradeAdditively();

			document.getElementById("lobc2p").innerHTML = lobUps.ldIncrease.current;

			document.getElementById("lobc2c").innerHTML = lobUps.ldIncrease.currentCost.toPrecision(3);


		}
	}

	this.upgradeTermSpeed = function (){
		if(!lobUps.termSpeed.purchased){
			lobUps.termSpeed.purchased = true;

		}
		if(this.lobbyingDollars.gte(lobUps.termSpeed.currentCost)){

			this.lobbyingDollars = this.lobbyingDollars.minus(lobUps.termSpeed.currentCost);
			
			lobUps.termSpeed.upgrade();

			Object.keys(child).forEach(function(c){
				child[c].termspeed = child[c].termspeed.divide(new Decimal(1.15));
			});

			document.getElementById("lobc3p").innerHTML = lobUps.termSpeed.current;

			document.getElementById("lobc3c").innerHTML = lobUps.termSpeed.currentCost.toPrecision(3);


		}
	}

	this.upgradeParentsAutobuyer = function(){

		if(!lobUps.parentsAutobuyer.purchased) lobUps.parentsAutobuyer.purchased = true;
		if(this.lobbyingDollars.gte(lobUps.parentsAutobuyer.currentCost)){
			if(lobUps.parentsAutobuyer.upgradeCount<25){

				if(lobUps.parentsAutobuyer.currentCost.equals(1.30)) {
					document.getElementById("lobp1d").innerHTML = "Encourage the Government to give you a tax break.<br />Your Company can convert Mathematica 1.15x faster <br /><a href=\"javascript:lobbying.upgradeParentsAutobuyer()\" id=lobp1><h3><span id=lobp1c>1.30</span> Lobbying Dollars</h3></a>";
				}

				this.lobbyingDollars = this.lobbyingDollars.minus(lobUps.parentsAutobuyer.currentCost);

				lobUps.parentsAutobuyer.upgrade();

				document.getElementById("lobp1c").innerHTML = lobUps.parentsAutobuyer.currentCost.toPrecision(3);

				parents.timeOfLastBuy = Date.now();

				parents.autobuyingSpeed = lobUps.parentsAutobuyer.current.multiply(1000);

				//document.getElementById("parentsAutobuyerSpeed").innerHTML = new Decimal(1).divide(lobUps.parentsAutobuyer.current).toPrecision(3);

			}
			if(lobUps.parentsAutobuyer.upgradeCount==25){

				document.getElementById("ParentsContainer").innerHTML = "Real Dollars: <h1>$<span id=\"RealDollars\">0</span></h1><h2><span id=realdollarspersecond></span>/s</h2>You are liquidating mathematica to Real Dollars instantly.";

				document.getElementById("ParentsContainer").style.height = "200px";
				document.getElementById("ParentsContainer").style.width = "200px";
				document.getElementById("ParentsContainer").style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--good'); 
				document.getElementById("lobp1d").innerHTML = "<a id=lobp1><h3>Autobuyer Complete</h3></a>";

			}

		}

	}

	this.upgradeXIncrease = function(){
		if(!upgradeXIncrease.purchased) upgradeXIncrease.purchased = true;
		if(this.lobbyingDollars.gte(lobUps.xIncrease.currentCost)){

			this.lobbyingDollars = this.lobbyingDollars.minus(lobUps.xIncrease.currentCost);

			lobUps.xIncrease.upgrade();

			document.getElementById("whatever ").innerHTML = lobUps.xIncrease.currentCost.toPrecision(3);

			document.getElementById("xamount").innerHTML = lobUps.xIncrease.current.divide(10).toPrecision(3);

		}

	}

	this.unlockMPSMultiplier = function(){
		if(this.lobbyingDollars.gte(lobUps.mpsMultMult.currentCost)){

			this.lobbyingDollars = this.lobbyingDollars.subtract(lobUps.mpsMultMult.currentCost);
			if(!lobUps.mpsMultMult.purchased){

				document.getElementById("u1Alg").style.opacity = 1;
				document.getElementById("u1Alg").style.zIndex = 1;
				document.getElementById("u1Alg").innerHTML= "<h3>MPS *<span id=u1Algp>"+mpsMult.accbasemult.toPrecision(3)+"</span> <br /><span id=u1Algc>10.0</span> IQ Points</h3>";
				document.getElementById("lobm1d").innerHTML = "Encourage the Government to increase carbon offset tax. <br /> Multiply MPS Multiplier by * 1.02 <br />(Currently <span id=mpsmultinfo>1.2</span>)<br /><a href=\"javascript:lobbying.unlockMPSMultiplier()\" id=lobm1><h3><span id=lobm1c>1.30</span> Lobbying Dollars</h3></a>";
				
				document.getElementById("lobm2d").style.marginTop = 0;
				document.getElementById("lobm2d").style.marginBottom = 0;
				lobUps.mpsMultMult.purchased = true;
				return;

			}

			lobUps.mpsMultMult.upgrade();

			mpsMult.accbasemult = lobUps.mpsMultMult.current;

			mpsMult.upgradeCount = mpsMult.upgradeCount.minus(1);

			mpsMult.upgradeAll();

			mathematica.visuallyUpdate();

			document.getElementById("lobm1c").innerHTML = lobUps.mpsMultMult.currentCost.toPrecision(3);


			document.getElementById("u1Algp").innerHTML = mpsMult.accbasemult.toPrecision(3);

			document.getElementById("mpsmultinfo").innerHTML = mpsMult.accbasemult.toPrecision(3);


		}
		
	}
	this.unlockCostDivider = function(){
		if(this.lobbyingDollars.gte(lobUps.costDivMult.currentCost)){

			this.lobbyingDollars = this.lobbyingDollars.subtract(lobUps.costDivMult.currentCost);
			if(!lobUps.costDivMult.purchased){

				
				document.getElementById("u2Alg").style.opacity = 1;
				document.getElementById("u2Alg").style.zIndex = 1;
				document.getElementById("u2Alg").innerHTML= "<h3>Cost /<span id=u2Algp>"+costDiv.accbasemult.toPrecision(3)+"</span> <br /><span id=u2Algc>100.0</span> IQ Points</h3>";
				document.getElementById("lobm2d").innerHTML = "Encourage the Government to hand out solar panel incentives. <br /> Multiply the Cost Divider by * 1.02 <br />(Currently <span id=costdivinfo>1.2</span>)<br /><a href=\"javascript:lobbying.unlockCostDivider()\" id=lobm2><h3><span id=lobm2c>13.0</span> Lobbying Dollars</h3></a>";
				
				lobUps.costDivMult.purchased = true;
				return;

			}

			lobUps.costDivMult.upgrade();

			costDiv.accbasemult = lobUps.costDivMult.current;

			costDiv.upgradeCount = costDiv.upgradeCount.minus(1);

			costDiv.upgradeAll();

			mathematica.visuallyUpdate();

			document.getElementById("lobm2c").innerHTML = lobUps.costDivMult.currentCost.toPrecision(3);


			document.getElementById("u2Algp").innerHTML = costDiv.accbasemult.toPrecision(3);

			document.getElementById("costdivinfo").innerHTML = costDiv.accbasemult.toPrecision(3);


		}
	}



}
var lobbying = new LobbyingUpgradeable();


var lobbyingIncrementor = function(){

	this.examMult = new lobbyingAcc(new Decimal(2),new Decimal(1.3),new Decimal(2),new Decimal(3));
	this.parentsAutobuyer = new lobbyingAcc(new Decimal(1), new Decimal(1.3), new Decimal(0.87), new Decimal(1.2));
	this.xIncrease = new lobbyingAcc(new Decimal(1), new Decimal(1.3), new Decimal(2), new Decimal(2));
	this.mpsMultMult = new lobbyingAcc(new Decimal(1.2), new Decimal(1.3), new Decimal(1.02), new Decimal(1.1));
	this.costDivMult = new lobbyingAcc(new Decimal(1.2),new Decimal(13), new Decimal(1.02), new Decimal(1.1));
	this.ldIncrease = new lobbyingAcc(new Decimal(0), new Decimal(2.60), new Decimal(2), new Decimal(2));
	this.termSpeed = new lobbyingAcc(new Decimal(1), new Decimal(5.20), new Decimal(1.15), new Decimal(1.2));

}


var lobUps =  new lobbyingIncrementor();

function childToLobbyingDollars(givenChild){

	if(givenChild.purchased && givenChild.currentYear.gt(1)){

		return givenChild.currentYear.pow(givenChild.currentYear.sqrt(2));

	}

	return new Decimal(0);

}



var lobbyingAccLoader = new function (){



	this.load = function(lobaccobject){

		Object.keys(lobUps).forEach(function(c){


			try{

				Object.keys(lobaccobject[c]).forEach(function(k){


					lobUps[c][k] = lobaccobject[c][k];
					if(!isNaN(new Decimal(lobUps[c][k]))
						&&typeof(lobUps[c][k])!=='boolean')lobUps[c][k] = new Decimal(lobUps[c][k]);



				});

			}catch{

			}
			


		});
		if(lobUps.mpsMultMult.purchased){

			document.getElementById("u1Alg").style.opacity = 1;
			document.getElementById("u1Alg").style.zIndex = 1;
			document.getElementById("u1Alg").innerHTML= "<h3>MPS *<span id=u1Algp>"+mpsMult.accbasemult.toPrecision(3)+"</span> <br /><span id=u1Algc>10.0</span> IQ Points</h3>";
			document.getElementById("lobm1d").innerHTML = "Encourage the Government to increase carbon offset tax. <br /> Multiply MPS Multiplier by * 1.02 <br />(Currently <span id=mpsmultinfo>1.2</span>)<br /><a href=\"javascript:lobbying.unlockMPSMultiplier()\" id=lobm1><h3><span id=lobm1c>1.30</span> Lobbying Dollars</h3></a>";
			
			document.getElementById("lobm2d").style.marginTop = 0;
			document.getElementById("lobm2d").style.marginBottom = 0;

			document.getElementById("lobm1c").innerHTML = lobUps.mpsMultMult.currentCost.toPrecision(3);

			document.getElementById("u1Algp").innerHTML = mpsMult.accbasemult.toPrecision(3);

			document.getElementById("u1Algc").innerHTML = mpsMult.accCost.toPrecision(3);

			document.getElementById("mpsmultinfo").innerHTML = mpsMult.accbasemult.toPrecision(3);

		}
		if(lobUps.costDivMult.purchased){

			document.getElementById("u2Alg").style.opacity = 1;
			document.getElementById("u2Alg").style.zIndex = 1;
			document.getElementById("u2Alg").innerHTML= "<h3>Cost /<span id=u2Algp>"+costDiv.accbasemult.toPrecision(3)+"</span> <br /><span id=u2Algc>100.0</span> IQ Points</h3>";
			document.getElementById("lobm2d").innerHTML = "Encourage the Government to hand out solar panel incentives. <br /> Multiply the Cost Divider by * 1.02 <br />(Currently <span id=costdivinfo>1.2</span>)<br /><a href=\"javascript:lobbying.unlockCostDivider()\" id=lobm2><h3><span id=lobm2c>13.0</span> Lobbying Dollars</h3></a>";
			
			document.getElementById("lobm2c").innerHTML = lobUps.costDivMult.currentCost.toPrecision(3);

			document.getElementById("u2Algp").innerHTML = costDiv.accbasemult.toPrecision(3);

			document.getElementById("costdivinfo").innerHTML = costDiv.accbasemult.toPrecision(3);
			document.getElementById("u2Algc").innerHTML = costDiv.accCost.toPrecision(3);
		}
		if(lobUps.xIncrease.purchased){


			document.getElementById("whatever ").innerHTML = lobUps.xIncrease.currentCost.toPrecision(3);

			document.getElementById("xamount").innerHTML = lobUps.xIncrease.current.divide(10).toPrecision(3);

		}
		if(lobUps.parentsAutobuyer.upgradeCount<25){

				document.getElementById("lobp1d").innerHTML = "Encourage the Government to give you a tax break.<br />Your Company can convert Mathematica 1.15x faster <br /><a href=\"javascript:lobbying.upgradeParentsAutobuyer()\" id=lobp1><h3><span id=lobp1c> 1.30 </span> Lobbying Dollars</h3></a>";


				document.getElementById("lobp1c").innerHTML = lobUps.parentsAutobuyer.currentCost.toPrecision(3);

				//document.getElementById("parentsAutobuyerSpeed").innerHTML = new Decimal(1).divide(lobUps.parentsAutobuyer.current).toPrecision(3);

		}
		if(lobUps.parentsAutobuyer.upgradeCount==25){

			lobbying.upgradeParentsAutobuyer();

		}
		if(lobUps.examMult.purchased){			

			document.getElementById("lobc1d").innerHTML = "Encourage the Government to increase teachers pay.<br />Multiplies exam IQ Multiplier by 2 <br />(Currently "+lobUps.examMult.current.toPrecision(3)+")<br /><a href=\"javascript:lobbying.upgradeExamMult()\" id=lobc1><h3><span id=lobc1c>1.30</span> Lobbying Dollars</h3></a>";

			document.getElementById("lobc1c").innerHTML = lobUps.examMult.currentCost.toPrecision(3);

			document.getElementById("lobc2d").style.margin = "0%";

			if(child.one.upgradeCount.gte(6)){
				lobbying.revealChildUpgrade2();
			}

		}
		if(lobUps.ldIncrease.purchased){

			document.getElementById("lobc2d").style.margin = "0%";

			lobbying.revealChildUpgrade2();


			document.getElementById("lobc3d").style.margin = "0%";

			if(lobUps.ldIncrease.upgradeCount.gte(2)){
				lobbying.revealChildUpgrade3();
			}


		}
		if(lobUps.termSpeed.purchased){

			document.getElementById("lobc3d").style.margin = "0%";

			
			lobbying.revealChildUpgrade3();

			Object.keys(child).forEach(function(c){
				child[c].termspeed = child[c].termspeed.divide(lobUps.termSpeed.current);
			});
			

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


