



var ChildUpgradeable = function(startCost, currentCost, startProd, currentProd, upgradeCount, childNum, childNumAsString,firstTimeRound){

	this.startCost = new Decimal(startCost);

	this.currentCost = new Decimal(currentCost);

	this.startProd = new Decimal(startProd);

	this.nextProd = new Decimal(0);

	this.randSeed = Math.random()*0.1+0.05;

	this.currentProd = new Decimal(currentProd);

	this.upgradeCount = new Decimal(upgradeCount);

	this.childNum = childNum;

	this.childNumAsString = childNumAsString;

	this.timeToExam = 5;

	this.currentYear = 1;

	this.progressBar = 0; 

	this.termspeed = 6;

	this.progressbarsStartTime = 0;

	this.completedExams = 0;

	this.purchased = false;

	this.upgradeTime = 0;

	this.upgradingRepresentation = false;

	this.startLeft = "100%";

	this.firstTimeRound = firstTimeRound;

	this.upgrade = function (){

		if(this.iCanBuy(this.currentCost)&&!this.progressBar){

			parents.realDollars = parents.realDollars.subtract(this.currentCost);
			this.upgradeCount = this.upgradeCount.add(1);


			this.progressbarsStartTime = Date.now();
			this.progressBar = 0.01;
			this.update();

		}

	};

	this.reset = function(){
		if(this.purchased){
			this.upgradeCount = new Decimal(1);
			this.currentCost = new Decimal(0);
			this.completedExams = 0;
			this.progressBar = 0;
			this.timeToExam = 6;
			this.currentYear = 0;
			this.finalize();
		}
	}


	this.update = function(){

		if(this.progressBar){

			this.progressBar = 0.01+(Date.now() - this.progressbarsStartTime)/(1000 * (this.termspeed));

			var bar = document.getElementById("child"+this.childNum+"buy");
			bar.style.boxShadow = "inset "+225*this.progressBar+"px 0 0 0 var(--background)";

			if(this.progressBar>=1){

				this.finalize();

			}

		}

		this.visuallyUpdateChild();

		if(this.purchased){
			this.updateRepresentation();
		}

	}

	this.updateRepresentation = function(){

		document.getElementById("child"+this.childNum+"rep").style.left = (47.3*(Math.sin(this.randSeed*Date.now()/500.0)+1))+"%";
		
		document.getElementById("child"+this.childNum+"glow").style.left = (47.3*(Math.sin(this.randSeed*Date.now()/500.0)+1))+"%";
		
		document.getElementById("child"+this.childNum+"glow").style.boxShadow = "0px -"+5*this.currentYear+"px "+20*this.currentYear+"px "+getComputedStyle(document.documentElement).getPropertyValue('--yoga'+this.currentYear);

		document.getElementById("child"+this.childNum+"rep").style.transform = "rotate("+(900*(Math.sin(this.randSeed*Date.now()/500.0)))+"deg)";
		
		if(this.upgradingRepresentation)this.upgradeRepresentation();
	}

	this.upgradeRepresentation = function(){
		var circ = document.getElementById("childupgradecircle");
		var leftamount = document.getElementById("child"+this.childNum+"rep").style.left;
		if(!this.upgradingRepresentation){
			this.upgradingRepresentation = true;
			this.upgradeTime = Date.now();
		}
		if(this.upgradingRepresentation){
			circ.style.width = Math.pow((Date.now() - this.upgradeTime)/20,2);
			circ.style.height = Math.pow((Date.now() - this.upgradeTime)/20,2);
			circ.style.left = document.body.offsetWidth*parseFloat(leftamount)/100 - parseFloat(circ.style.height)/2+"px";
			circ.style.bottom = -1*parseFloat(circ.style.height)/2+"px";
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

		this.progressBar = 0;
		this.currentProd = upgradeChildProduction(this.startProd,this.upgradeCount,this.completedExams);
		var examCostPredictor = this.completedExams;
		if(this.timeToExam==1) examCostPredictor++;
		this.currentCost = upgradeChildCost(this.startCost,this.upgradeCount,examCostPredictor);
		this.nextProd = upgradeChildProduction(this.startProd,this.upgradeCount.add(1),examCostPredictor).subtract(this.currentProd);

		this.displayExamOrTerm();
		iq.updateTotal();
		this.visuallyUpdateChild();

		lobbying.updateTotals(lobbying);

	}


	this.howMuchLongerUntilExam = function(){
		
		this.timeToExam--;
		if(this.timeToExam == 0){
			this.timeToExam = 5;
			this.completedExams++;
			this.upgradeRepresentation();
		}

	}


	this.displayExamOrTerm = function(){

		var num = this.childNum;
		var upgrade = "child"+(num)+"up";

		if(this.timeToExam==1){

			document.getElementById(upgrade).innerHTML = "<a id=child"+num+"buy href=\"javascript:child."+childNumAsString+".upgrade()\"><span id=centertext>End of year exam <br />+<span id=\"child"+num+"iqnext\">1</span> IQ Points<br />$<span id=\"child"+num+"cost\">1</span> Real Dollars</span></a>";

		}else if(this.timeToExam==5){

			this.currentYear++;

			if(this.firstTimeRound){
				this.firstTimeRound = false;
				this.breadcrumbnewchild();
			}

			document.getElementById(upgrade).innerHTML = "<a id=child"+num+"buy href=\"javascript:child."+childNumAsString+".upgrade()\"><span id=centertext>Complete a term <br />+<span id=\"child"+num+"iqnext\">1</span> IQ Points<br />$<span id=\"child"+num+"cost\">1</span> Real Dollars</span></a>";


		}

	}


	this.visuallyUpdateChild = function(){

		document.getElementById("child"+this.childNum+"IQ").innerHTML = this.currentProd.toPrecision(3)+" IQ";
		document.getElementById("child"+this.childNum+"cost").innerHTML = this.currentCost.toPrecision(3);
		document.getElementById("iqps").innerHTML = iq.ps.toPrecision(3);
		if(this.purchased){

			document.getElementById("child"+this.childNum+"iqnext").innerHTML = this.nextProd.toPrecision(3);

			var year = "child"+this.childNum+"year";
			var pic = "child"+this.childNum+"rep";
			document.getElementById(pic).src = "icons/svg/Year "+this.currentYear+".svg";
			if(this.currentYear==1){
				document.getElementById(year).innerHTML = "1st Year";
			}else if(this.currentYear==2){
				document.getElementById(year).innerHTML = "2nd Year";

			}else if(this.currentYear==3){
				document.getElementById(year).innerHTML = "3rd Year";				
			}else{
				document.getElementById(year).innerHTML = this.currentYear+"th Year";
			}
			if(this.timeToExam == 1){
				document.getElementById(year).innerHTML += "<br /> Exam Time";
			}else{
				document.getElementById(year).innerHTML += "<br /> Term "+(6-this.timeToExam);
			}

		}

	}



	this.newChild = function(){
		if(parents.realDollars.gte(this.currentCost)){
			parents.realDollars = parents.realDollars.subtract(this.currentCost);
			this.nextProd = upgradeChildProduction(this.startProd,this.upgradeCount.add(1),this.completedExams).subtract(this.currentProd);
			var num = this.childNum;
			var tr = "child"+num;
			var name = "child"+num+"name";
			var IQ = "child"+num+"IQ";
			var upgrade = "child"+num+"up";
			var year = "child"+num+"year";
			document.getElementById(tr).style.opacity = 1;
			document.getElementById(tr).style.zIndex = 1;

			document.getElementById(name).innerHTML = "Random";
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

		tr = "child"+(this.childNum+1);
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

var Child1 = new ChildUpgradeable(new Decimal(5),new Decimal(5),new Decimal(0.5),new Decimal(0),1,1,"one",true);

var Child2 = new ChildUpgradeable(new Decimal(50),new Decimal(50),new Decimal(5),new Decimal(0),1,2,"two",false);

var Child3 = new ChildUpgradeable(new Decimal(500),new Decimal(500),new Decimal(50),new Decimal(0),1,3,"three",false);

var Child4 = new ChildUpgradeable(new Decimal(5000),new Decimal(5000),new Decimal(500),new Decimal(0),1,4,"four",false);

function upgradeChildCost(startCost,upgradeCount,completedExams){
	
	return startCost.multiply(upgradeCount.minus(1)).multiply(completedExams * 2).add(startCost.multiply(upgradeCount));

}
function upgradeChildProduction(startProd,upgradeCount,completedExams){
	
	return startProd.plus(1).multiply(upgradeCount.minus(1)).multiply(examLobbyingUpgradeable.current.multiply(completedExams * 2)).add(startProd.plus(1).multiply(upgradeCount.minus(1)));

}


var child = new function(){

	this.one = Child1;

	this.two = Child2;

	this.three = Child3;

	this.four = Child4;

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