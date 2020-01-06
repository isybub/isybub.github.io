



var ChildUpgradeable = function(startCost, currentCost, startProd, currentProd, upgradeCount, childNum, childNumAsString,firstTimeRound){

	this.startCost = new Decimal(startCost);

	this.currentCost = new Decimal(currentCost);

	this.startProd = new Decimal(startProd);

	this.nextProd = new Decimal(0);

	this.randSeed = new Decimal(Math.random()*0.3+0.1);

	this.currentProd = new Decimal(currentProd);

	this.upgradeCount = new Decimal(upgradeCount);

	this.childNum = childNum;

	this.childNumAsString = childNumAsString;

	this.timeToExam = new Decimal(5);

	this.currentYear = new Decimal(1);

	this.progressBar = new Decimal(0); 

	this.termspeed = new Decimal(6);

	this.progressbarsStartTime = new Decimal(0);

	this.completedExams = new Decimal(0);

	this.purchased = false;

	this.upgradeTime = new Decimal(0);

	this.upgradingRepresentation = false;

	this.firstTimeRound = firstTimeRound;

	this.upgrade = function (){

		if(this.iCanBuy(this.currentCost)&&!this.progressBar.gt(0)){

			parents.realDollars = parents.realDollars.subtract(this.currentCost);
			this.upgradeCount = this.upgradeCount.add(1);


			this.progressbarsStartTime = new Decimal(Date.now());
			this.progressBar = this.progressBar.add(0.01);
			this.update();

		}

	};

	this.reset = function(){
		if(this.purchased){
			this.upgradeCount = new Decimal(1);
			this.currentCost = new Decimal(0);
			this.completedExams = new Decimal(0);
			this.progressBar = new Decimal(0);
			this.timeToExam = new Decimal(6);
			this.currentYear = new Decimal(0);
			this.finalize();
		}
	}


	this.update = function(){

		if(this.progressBar.gt(0)){

			this.progressBar = new Decimal(0.01+(Date.now() - this.progressbarsStartTime)/(this.termspeed.multiply(1000)));

			var bar = document.getElementById("child"+this.childNum.valueOf()+"buy");
			bar.style.boxShadow = "inset "+225*this.progressBar.valueOf()+"px 0 0 0 var(--background)";

			if(this.progressBar.gte(1)){

				this.finalize();

			}

		}

		if(this.purchased){
			this.updateRepresentation();
		}

	}

	this.updateRepresentation = function(){

		document.getElementById("child"+this.childNum.valueOf()+"rep").style.left = ((50*(1-(100/(document.getElementById("childrendisplay").offsetWidth))))*(Math.sin(this.randSeed.multiply(Date.now()/500.0))+1-((this.childNum-1)*(0.65))))+"%";
		
		document.getElementById("child"+this.childNum.valueOf()+"glow").style.left = ((50*(1-(100/(document.getElementById("childrendisplay").offsetWidth))))*(Math.sin(this.randSeed.multiply(Date.now()/500.0))+1))+"%";

		document.getElementById("child"+this.childNum.valueOf()+"glow").style.top = this.childNum.minus(1).multiply(-100).minus(5).valueOf()+"px";
		
		document.getElementById("child"+this.childNum.valueOf()+"glow").style.boxShadow = "0px -"+5*this.currentYear.valueOf()+"px "+20*this.currentYear.valueOf()+"px "+getComputedStyle(document.documentElement).getPropertyValue('--yoga'+this.currentYear.valueOf());

		document.getElementById("child"+this.childNum.valueOf()+"rep").style.transform = "rotate("+((document.getElementById("childrendisplay").offsetWidth/2)*(Math.sin(this.randSeed.multiply(Date.now()/500.0))))+"deg)";
		
		if(this.upgradingRepresentation)this.upgradeRepresentation();
	}

	this.upgradeRepresentation = function(){
		var circ = document.getElementById("childupgradecircle");
		var leftamount = document.getElementById("child"+this.childNum.valueOf()+"rep").style.left;
		if(!this.upgradingRepresentation){
			this.upgradingRepresentation = true;
			this.upgradeTime = new Decimal(Date.now());
		}
		if(this.upgradingRepresentation){
			circ.style.width = Math.pow((Date.now() - this.upgradeTime)/20,2);
			circ.style.height = Math.pow((Date.now() - this.upgradeTime)/20,2);
			circ.style.left = 0.8*document.body.offsetWidth*(parseFloat(leftamount)/100.0) + 0.1*document.body.offsetWidth- parseFloat(circ.style.height)/2+"px";
			circ.style.top = window.innerHeight - 200 - parseFloat(circ.style.height)/2+"px";
			circ.style.borderColor = "rgb("+(Math.sin(Date.now()/200+1.57)*127+126)+","+(Math.sin(Date.now()/200+3.141)*127+126)+","+(Math.sin(Date.now()/200+4.71)*127+126)+")";
			if(parseFloat(circ.style.width)>2 * Math.sqrt(Math.pow(document.body.offsetWidth,2)+Math.pow(document.body.offsetHeight,2))){
				circ.style.width = 1;
				circ.style.height = 1;
				circ.style.left = "-100%";
				this.upgradingRepresentation = false;
			}


		}

	}

	this.finalize = function(){

		this.howMuchLongerUntilExam()

		this.progressBar = new Decimal(0);
		this.currentProd = upgradeChildProduction(this.startProd,this.upgradeCount,this.completedExams);
		var examCostPredictor = this.completedExams;
		if(this.timeToExam.equals(1)) examCostPredictor = examCostPredictor.add(1);
		this.currentCost = upgradeChildCost(this.startCost,this.upgradeCount,examCostPredictor,this.currentYear);
		this.nextProd = upgradeChildProduction(this.startProd,this.upgradeCount.add(1),examCostPredictor).subtract(this.currentProd);

		this.displayExamOrTerm();
		iq.updateTotal();
		this.visuallyUpdateChild();

		lobbying.updateTotals(lobbying);

	}


	this.howMuchLongerUntilExam = function(){
		
		this.timeToExam = this.timeToExam.minus(1);
		if(this.timeToExam.equals(0)){
			this.timeToExam = new Decimal(5);
			this.completedExams = this.completedExams.add(1);
			this.upgradeRepresentation();
		}

	}


	this.displayExamOrTerm = function(){

		var num = this.childNum.valueOf();
		var upgrade = "child"+(num)+"up";

		if(this.timeToExam.equals(1)){

			document.getElementById(upgrade).innerHTML = "<a id=child"+num+"buy href=\"javascript:child."+childNumAsString+".upgrade()\"><span id=centertext>End of year exam <br />+<span id=\"child"+num+"iqnext\">1</span> IQ Points<br />$<span id=\"child"+num+"cost\">1</span> Real Dollars</span></a>";

		}else if(this.timeToExam.equals(5)){

			this.currentYear = this.currentYear.add(1);
			if(this.firstTimeRound){
				this.firstTimeRound = false;
				this.breadcrumbnewchild();
			}

			document.getElementById(upgrade).innerHTML = "<a id=child"+num+"buy href=\"javascript:child."+childNumAsString+".upgrade()\"><span id=centertext>Complete a term <br />+<span id=\"child"+num+"iqnext\">1</span> IQ Points<br />$<span id=\"child"+num+"cost\">1</span> Real Dollars</span></a>";


		}

	}


	this.visuallyUpdateChild = function(){

		document.getElementById("child"+this.childNum.valueOf()+"IQ").innerHTML = this.currentProd.toPrecision(3)+" IQ";
		document.getElementById("child"+this.childNum.valueOf()+"cost").innerHTML = this.currentCost.toPrecision(3);
		document.getElementById("iqps").innerHTML = iq.ps.toPrecision(3);
		if(this.purchased){

			document.getElementById("child"+this.childNum.valueOf()+"iqnext").innerHTML = this.nextProd.toPrecision(3);

			var year = "child"+this.childNum.valueOf()+"year";
			var pic = "child"+this.childNum.valueOf()+"rep";
			document.getElementById(pic).src = "icons/svg/Year "+this.currentYear.valueOf()+".svg";
			if(this.currentYear.equals(1)){
				document.getElementById(year).innerHTML = "1st Year";
			}else if(this.currentYear.equals(2)){
				document.getElementById(year).innerHTML = "2nd Year";

			}else if(this.currentYear.equals(3)){
				document.getElementById(year).innerHTML = "3rd Year";				
			}else{
				document.getElementById(year).innerHTML = this.currentYear.valueOf()+"th Year";
			}
			if(this.timeToExam.equals(1)){
				document.getElementById(year).innerHTML += "<br /> Exam Time";
			}else{
				document.getElementById(year).innerHTML += "<br /> Term "+(6-this.timeToExam);
			}

		}

	}

	this.newChildInIntro = function(){
		this.nextProd = upgradeChildProduction(this.startProd,this.upgradeCount.add(1),this.completedExams).subtract(this.currentProd);
			var num = this.childNum.valueOf();
			var tr = "child"+num;
			var name = "child"+num+"name";
			var IQ = "child"+num+"IQ";
			var upgrade = "child"+num+"up";
			var year = "child"+num+"year";
			document.getElementById(tr).style.opacity = 1;
			document.getElementById(tr).style.zIndex = 1;

			//document.getElementById(name).innerHTML = "Random";
			document.getElementById(IQ).innerHTML = "0 IQ";
			document.getElementById(upgrade).innerHTML = "<a id=child"+num+"buy href=\"javascript:child."+childNumAsString+".upgrade()\"><span id=centertext>Complete a term <br />+<span id=\"child"+num+"iqnext\">1</span> IQ Points<br />$<span id=\"child"+num+"cost\">10.0</span> Real Dollars</span></a>";
			document.getElementById(year).innerHTML = "1st Year";

			this.purchased = true;

			if(++num<5&&!this.firstTimeRound){
				this.breadcrumbnewchild();
			}
			this.visuallyUpdateChild();
	}

	this.newChild = function(){
		if(parents.realDollars.gte(this.currentCost)){
			parents.realDollars = parents.realDollars.subtract(this.currentCost);
			this.nextProd = upgradeChildProduction(this.startProd,this.upgradeCount.add(1),this.completedExams).subtract(this.currentProd);
			var num = this.childNum.valueOf();
			var tr = "child"+num;
			var name = "child"+num+"name";
			var IQ = "child"+num+"IQ";
			var upgrade = "child"+num+"up";
			var year = "child"+num+"year";
			document.getElementById(tr).style.opacity = 1;
			document.getElementById(tr).style.zIndex = 1;

			//document.getElementById(name).innerHTML = "Random";
			document.getElementById(IQ).innerHTML = "0 IQ";
			document.getElementById(upgrade).innerHTML = "<a id=child"+num+"buy href=\"javascript:child."+childNumAsString+".upgrade()\"><span id=centertext>Complete a term <br />+<span id=\"child"+num+"iqnext\">1</span> IQ Points<br />$<span id=\"child"+num+"cost\">10.0</span> Real Dollars</span></a>";
			document.getElementById(year).innerHTML = "1st Year";

			this.purchased = true;

			if(++num<5&&!this.firstTimeRound){
				this.breadcrumbnewchild();
			}
			this.visuallyUpdateChild();
		}
		

	}

	this.breadcrumbnewchild = function(){

		tr = "child"+(this.childNum.add(1).valueOf());
		document.getElementById(tr).style.opacity = 1;
		document.getElementById(tr).style.zIndex = 1;
		Object.keys(child).forEach(function(c){

				child[c].visuallyUpdateChild();
			
		});

	}

	this.iCanBuy = function(num){
		return parents.realDollars.gte(num);
	}




}

var Child1 = new ChildUpgradeable(new Decimal(5),new Decimal(5),new Decimal(5),new Decimal(0),0,new Decimal(1),"one",true);

var Child2 = new ChildUpgradeable(new Decimal(5),new Decimal(5),new Decimal(5),new Decimal(0),0,new Decimal(2),"two",true);

var Child3 = new ChildUpgradeable(new Decimal(5),new Decimal(5),new Decimal(5),new Decimal(0),0,new Decimal(3),"three",true);

var Child4 = new ChildUpgradeable(new Decimal(5),new Decimal(5),new Decimal(5),new Decimal(0),0,new Decimal(4),"four",false);

function upgradeChildCost(startCost,upgradeCount,completedExams,currentYear){
	
	return startCost.multiply(new Decimal(1.75).pow(upgradeCount.minus(completedExams))).multiply(new Decimal(2).pow(completedExams))

	//return startCost.pow(completedExams).add(startCost.pow(completedExams).multiply(getPerTermCost(upgradeCount-1)));

	//return startCost.multiply(upgradeCount.minus(1)).multiply(completedExams.multiply(2)).multiply(new Decimal(4).pow(currentYear)).add(startCost.multiply(upgradeCount));

}

function getPerTermCost(upgradeCount){

	var value = -0.25;

	for(var i = 0; i < upgradeCount;i++){
		
		value += 0.25*Math.pow(2,Math.floor(i/5));

	}
	return value;
}

function upgradeChildProduction(startProd,upgradeCount,completedExams){

	return startProd.multiply(new Decimal(1.5).pow(upgradeCount.minus(completedExams))).multiply(examLobbyingUpgradeable.current.pow(completedExams))
	
	//return startProd.pow(completedExams).add(startProd.pow(completedExams).multiply(getPerTermCost(upgradeCount-1)));

	//return startProd.plus(1).multiply(upgradeCount.minus(1)).multiply(examLobbyingUpgradeable.current.multiply(completedExams.multiply(2))).add(startProd.plus(1).multiply(upgradeCount.minus(1)));

}


var child = new function(){

	this.one = Child1;

	this.two = Child2;

	this.three = Child3;

	this.four = Child4;



}

var childLoader = new function (){

	this.load = function(childobject){

		Object.keys(child).forEach(function(c){

			Object.keys(childobject[c]).forEach(function(k){


					child[c][k] = childobject[c][k];
					if(!isNaN(new Decimal(child[c][k]))
						&&typeof(child[c][k])!=='boolean')child[c][k] = new Decimal(child[c][k]);



			});

			if(child[c].purchased)child[c].newChildInIntro();

			child[c].visuallyUpdateChild();

		});
		
	}

}

var iq = new function(){
	
	this.points = new Decimal(0);

	this.ps = new Decimal(0);

	this.highestPoints = new Decimal(0);

	this.highestiqps = new Decimal(0);

	this.updateTotal = function(){

		var total = new Decimal(0);
		Object.keys(child).forEach(function(c){
			total = total.add(child[c].currentProd);
		});
		this.ps = total;

	}

	this.update = function(){

		this.points = this.points.add(this.ps.div(tickSpeed).multiply(tickRate));

		if(this.points.gte(this.highestPoints)) this.highestPoints = this.points;
		if(this.ps.gte(this.highestiqps)) this.highestiqps = this.ps;

	}
}

var iqLoader = new function(){

	this.load = function(iqobject){
		Object.keys(iqobject).forEach(function(c){
			iq[c] = iqobject[c];
			if(!isNaN(new Decimal(iq[c]))) iq[c] = new Decimal(iq[c]);
		});
		child.one.visuallyUpdateChild();
	}

}