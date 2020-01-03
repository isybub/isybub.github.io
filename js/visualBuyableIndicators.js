
function updateBuyables(){
	var buttonOn = getComputedStyle(document.documentElement).getPropertyValue('--light'); 
	var buttonOff = "rgba(92,98,112,0.2)";
	var buttonGood = getComputedStyle(document.documentElement).getPropertyValue('--good'); 
	var neuomorphicButtonShadows = "inset 0 0 0px white,inset 0 0 0px rgba(23,24,28,0.5),-6px -6px 16px rgba(92,98,112,0.4),"+
	 "6px 6px 16px rgba(23,24,28,0.7)";
	
	var i = document.getElementById("u1x");
	if(iq.points.gte(mathematica.currentCost)){
		i.style.borderColor = buttonOn;
	}else{	
		i.style.borderColor = buttonOff;
	}
	var i2 = document.getElementById("u1Alg");
	if(iq.points.gte(mathematica.mpsMult.accCost)){
		i2.style.borderColor = buttonOn;
	}else{
		i2.style.borderColor = buttonOff; 	
	}
	var i3 = document.getElementById("u2Alg");
	if(iq.points.gte(mathematica.costDiv.accCost)){
		i3.style.borderColor = buttonOn;
	}else{
		i3.style.borderColor = buttonOff;
	}
	var i4 = document.getElementById("auto1");
	if(parents.realDollars.gte(parents.autobuyerUpgradeCost)){
		i4.style.borderColor = buttonOn;
	}else{
		i4.style.borderColor = buttonOff;
	}
	var bar1 = document.getElementById("child1buy");
	var bar2 = document.getElementById("child2buy");
	var bar3 = document.getElementById("child3buy");
	var bar4 = document.getElementById("child4buy");
	var bars = [bar1,bar2,bar3,bar4]
	var bari = 0;
	Object.keys(child).forEach(function (c){
		if(parents.realDollars.gte(child[c].currentCost)&&!child[c].progressBar){
			bars[bari].style.borderColor = buttonOn;
			bars[bari].style.boxShadow = neuomorphicButtonShadows;
		}else{
			bars[bari].style.borderColor = buttonOff;
		}
		bari += 1;	
	});
	var pab = document.getElementById("parentsAutobuyer");
	if(parents.autobuyingSpeed.equals(10001)){
	}else{
		pab.style.borderColor = buttonGood;
		pab.style.boxShadow = neuomorphicButtonShadows;
	}
	var lob = document.getElementById("sacrifice");
	if(lobbying.lobbyingDollarsLive>2&&lobbying.purchasable){

		lob.style.borderColor = buttonOn;

	}else{

		lob.style.borderColor = buttonOff;

	}
	var lobc1 = document.getElementById("lobc1");
	if(lobbying.lobbyingDollars.gte(examLobbyingUpgradeable.currentCost)){
		lobc1.style.borderColor = buttonOn;

	}else{

		lobc1.style.borderColor = buttonOff;

	}
	var lobp1 = document.getElementById("lobp1");
	if(lobbying.lobbyingDollars.gte(parentsAutobuyerUpgradeable.currentCost)&&parentsAutobuyerUpgradeable.upgradeCount < 25){

		lobp1.style.borderColor = buttonOn;

	}else if(parentsAutobuyerUpgradeable.upgradeCount < 25){

		lobp1.style.borderColor = buttonOff;

	}else{

		lobp1.style.borderColor = buttonGood;

	}
	var lobm1 = document.getElementById("lobm1");
	if(lobbying.lobbyingDollars.gte(unlockMPSMultiplier.currentCost)){
		lobm1.style.borderColor = buttonOn;

	}else{

		lobm1.style.borderColor = buttonOff;

	}
	var lobm2 = document.getElementById("lobm2");
	if(lobbying.lobbyingDollars.gte(unlockCostDivider.currentCost)){
		lobm2.style.borderColor = buttonOn;

	}else{

		lobm2.style.borderColor = buttonOff;

	}
	

}
