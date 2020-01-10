


var ParentsUpgradeable = function(){

	this.realDollars = new Decimal(0);

	this.realDollarsLive = new Decimal(0);

	this.highestRealDollars = new Decimal(0);

	this.autobuyingSpeed = new Decimal(10001);

	this.autobuyerUpgradeCost = new Decimal(25);

	this.timeOfLastBuy = new Decimal(Date.now());

	this.update = function(){
		


		if(!this.autobuyingSpeed.equals(10001)&&(Date.now() - this.timeOfLastBuy) > this.autobuyingSpeed){

			this.convert(Date.now() - this.timeOfLastBuy);
			this.timeOfLastBuy = new Decimal(Date.now());
		}
		if(!this.autobuyingSpeed.equals(10001))this.updateParentsAutobuyerProgressBar(Date.now() - this.timeOfLastBuy);

		if(this.realDollars.gt(this.highestRealDollars)) this.highestRealDollars = this.realDollars;

		this.realDollarsLive = mathematica.mathematica.root(2);

		if(lobUps.parentsAutobuyer.upgradeCount<25){
			document.getElementById("M2RDC").innerHTML = this.realDollarsLive.toPrecision(3);
		}else{
			document.getElementById("realdollarspersecond").innerHTML = mathematica.currentProd.divide(33).root(2).multiply(one1.divide(this.autobuyingSpeed.divide(1000))).toPrecision(3);
		}

	}

	this.convert = function(num){

		this.realDollars = this.realDollars.add(mathematica.mathematica.root(2).multiply(one1.divide(this.autobuyingSpeed.divide(num))));
		mathematica.mathematica = mathematica.mathematica.subtract(mathematica.mathematica);

	}

	this.upgradeAutobuyer = function(){

		if(this.autobuyingSpeed.equals(10001)&&this.realDollars.gte(25)){

			document.getElementById("parentsAutobuyer").innerHTML = "<span id=centertext>Autobuying every<span id=parentsAutobuyerSpeed>10</span> Seconds</span>";
			this.autobuyingSpeed = this.autobuyingSpeed.subtract(1);

		}else if(lobbyingDollars.gte(this.autobuyerUpgradeCost)){

			this.autobuyingSpeed = this.autobuyingSpeed.divide(1.15);
			this.autobuyerUpgradeCost = this.autobuyerUpgradeCost.multiply(1.2);
			document.getElementById("parentsAutobuyer").innerHTML = "<span id=centertext>Autobuying every<span id=parentsAutobuyerSpeed>"+this.autobuyingSpeed.divide(1000).toPrecision(3)+"</span> Seconds</span>";

		}

	}

	this.updateParentsAutobuyerProgressBar = function(prog){
		//var pbar = document.getElementById("parentsAutobuyer");
		//pbar.style.boxShadow = "inset "+ 279*(one1.divide(this.autobuyingSpeed).multiply(prog))+"px 0 0 0 var(--background)";
	}

}

var parents = new ParentsUpgradeable();

var parentsLoader = new function(){
	this.load = function(parentsobject){
		Object.keys(parentsobject).forEach(function(c){
			parents[c] = parentsobject[c];
			if(!isNaN(new Decimal(parents[c]))) parents[c] = new Decimal(parents[c]);
		});
	}
}