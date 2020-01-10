

var MathematicaAccessory = function(accBase, accBaseCost, accbasemult, upgradeCount, type){

	this.accBase = new Decimal(accBase);

	this.accBaseCost = new Decimal(accBaseCost);

	this.upgradeCount = new Decimal(upgradeCount);

	this.accbasemult = accbasemult;

	this.accCost = this.accBaseCost;

	this.acc = this.accBase;

	this.type = type;

	this.upgradeAll = function(){

		this.upgradeCount = this.upgradeCount.add(1);

		this.acc = upgradeAccx(this.accBase,this.upgradeCount,this.accbasemult);

		this.updateCost();

	}

	this.updateCost = function(){

		var x = new Decimal(1.8);

		this.accCost = this.accBaseCost.multiply(x.pow(this.upgradeCount));

	}

}



var MathematicaUpgradeable = function(costDiv, mpsMult, upgradeCount){

	this.upgradeCount = new Decimal(upgradeCount);

	this.currentCost = new Decimal(20);

	this.currentProd = new Decimal(0.5);


	this.mathematica = new Decimal(0);

	this.highestMathematica = new Decimal(0);

	this.mps = new Decimal(0);


	this.upgradeX = function (){

		if(this.iCanBuyThis(this.currentCost)){

			iq.points = iq.points.subtract(this.currentCost);

			this.upgradeCount = this.upgradeCount.add(lobUps.xIncrease.current);
			
			this.currentProd = upgradeMathematicaProduction(this.startProd,this.upgradeCount,mpsMult.acc);

			this.currentCost = upgradeMathematicaCost(this.startCost,this.upgradeCount,costDiv.acc);

			this.visuallyUpdate();
		}

		

	};


	this.upgradeCostDiv = function(){

		if(this.iCanBuyThis(costDiv.accCost)){

			iq.points = iq.points.subtract(costDiv.accCost);

			costDiv.upgradeAll();

			this.currentCost = upgradeMathematicaCost(this.startCost,this.upgradeCount,costDiv.acc);

			this.visuallyUpdate();

		}

		
	}

	this.upgradeMPSMult = function(){

		if(this.iCanBuyThis(mpsMult.accCost)){

			iq.points = iq.points.subtract(mpsMult.accCost);

			mpsMult.upgradeAll();

			this.currentProd = upgradeMathematicaProduction(this.startProd,this.upgradeCount,mpsMult.acc);

			this.visuallyUpdate();

		}

		

	}
	
	this.iCanBuyThis = function(cost){

		return iq.points.gte(cost);

	}

	this.update = function(){

		this.mathematica = this.mathematica.add(this.currentProd.div(tickSpeed).multiply(tickRate));

		if(this.mathematica.gt(this.highestMathematica)) this.highestMathematica = this.mathematica;

		if(parents.autobuyingSpeed.lte(33)){
			document.getElementById("mathematica").innerHTML = this.currentProd.multiply(parents.autobuyingSpeed.divide(1000)).toPrecision(3);
		}else{

			document.getElementById("mathematica").innerHTML = mathematica.mathematica.toPrecision(3);


		}
		

	}

	this.visuallyUpdate = function(){


		document.getElementById("mpsAlg").innerHTML = mpsMult.acc.toPrecision(3)+"&xscr;<sup>2</sup>";

		document.getElementById("u1Algc").innerHTML = mpsMult.accCost.toPrecision(3);


		document.getElementById("costAlg").innerHTML = "20<sup>&xscr;</sup>/"+costDiv.acc.toPrecision(3);

		document.getElementById("u1xc").innerHTML = this.currentCost.toPrecision(3);

		document.getElementById("u2Algc").innerHTML = costDiv.accCost.toPrecision(3);


		document.getElementById("u1xc").innerHTML = this.currentCost.toPrecision(3);

		document.getElementById("xval").innerHTML = this.upgradeCount.divide(10).toPrecision(3);

	}
}

var costDiv = new MathematicaAccessory(1.0,new Decimal(100),new Decimal(1.2),0,"Cost");

var mpsMult = new MathematicaAccessory(0.5,new Decimal(10),new Decimal(1.2),0,"MPS");

var mathematica = new MathematicaUpgradeable(costDiv,mpsMult,10);

var mathematicaLoader = new function(){

	this.loadmps = function(mps){
		
		Object.keys(mps).forEach(function(c){
			mpsMult[c] = mps[c];
			if(!isNaN(new Decimal(mpsMult[c]))) mpsMult[c] = new Decimal(mpsMult[c]);
		});

	}
	this.loadmaths = function(math){
		
		Object.keys(math).forEach(function(c){
			mathematica[c] = math[c];
			if(!isNaN(new Decimal(mathematica[c]))) mathematica[c] = new Decimal(mathematica[c]);
		});
		mathematica.visuallyUpdate();


	}
	this.loadcost = function(cost){
		
		Object.keys(cost).forEach(function(c){
			costDiv[c] = cost[c];
			if(!isNaN(new Decimal(costDiv[c]))) costDiv[c] = new Decimal(costDiv[c]);
		});

	}


}

function upgradeMathematicaProduction(startProd,upgradeCount,mpsMultAcc){

	return mpsMultAcc.multiply(upgradeCount.divide(10).pow(2));

}

function upgradeMathematicaCost(startCost,upgradeCount,costDivAcc){

	return new Decimal(20).pow(upgradeCount.divide(10)).divide(costDivAcc);

}

function upgradeAccx(mpsMult, mpsMultUpgradeCount, mpsmultmult){

	return mpsMult.multiply(mpsmultmult.pow(mpsMultUpgradeCount));

}
