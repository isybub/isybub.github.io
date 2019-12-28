
function updateBuyables(){

	
	var i = document.getElementById("u1x");
	if(iq.points.gte(mathematica.currentCost)){
		i.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--light'); 
		i.style.boxShadow = "inset 0 0 20px "+getComputedStyle(document.documentElement).getPropertyValue('--light');
	}else{
		i.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--error'); 		
		i.style.boxShadow = "none";
	}
	var i2 = document.getElementById("u1Alg");
	if(iq.points.gte(mathematica.mpsMult.accCost)){
		i2.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--light'); 
		i2.style.boxShadow = "inset 0 0 20px "+getComputedStyle(document.documentElement).getPropertyValue('--light');
	}else{
		i2.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--error'); 		
		i2.style.boxShadow = "none";
	}
	var i3 = document.getElementById("u2Alg");
	if(iq.points.gte(mathematica.costDiv.accCost)){
		i3.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--light'); 
		i3.style.boxShadow = "inset 0 0 20px "+getComputedStyle(document.documentElement).getPropertyValue('--light');
	}else{
		i3.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--error'); 		
		i3.style.boxShadow = "none";
	}
	var i4 = document.getElementById("auto1");
	if(parents.realDollars.gte(parents.autobuyerUpgradeCost)){
		i4.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--light'); 
		i4.style.boxShadow = "inset 0 0 20px "+getComputedStyle(document.documentElement).getPropertyValue('--light');
	}else{
		i4.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--error'); 		
		i4.style.boxShadow = "none";
	}
	var bar1 = document.getElementById("child1buy");
	var bar2 = document.getElementById("child2buy");
	var bar3 = document.getElementById("child3buy");
	var bar4 = document.getElementById("child4buy");
	var bars = [bar1,bar2,bar3,bar4]
	var bari = 0;
	Object.keys(child).forEach(function (c){
		if(parents.realDollars.gte(child[c].currentCost)&&!child[c].progressBar){
			bars[bari].style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--light'); 
			bars[bari].style.boxShadow = "inset 0 0 20px "+getComputedStyle(document.documentElement).getPropertyValue('--light');
		}else{
			bars[bari].style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--error'); 		
			if(!child[c].progressBar)bars[bari].style.boxShadow = "none";
		}
		bari += 1;	
	});
	var pab = document.getElementById("parentsAutobuyer");
	if(parents.autobuyingSpeed.equals(10001)){
	}else{
		pab.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--good'); 
		//pab.style.boxShadow = "inset 0 0 10px "+getComputedStyle(document.documentElement).getPropertyValue('--good');
	}
	var lob = document.getElementById("sacrifice");
	if(lobbying.lobbyingDollarsLive>2&&lobbying.purchasable){

		lob.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--light'); 
		lob.style.boxShadow = "inset 0 0 20px "+getComputedStyle(document.documentElement).getPropertyValue('--light');

	}else{

		lob.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--error'); 		
		lob.style.boxShadow = "none";

	}
	var lobc1 = document.getElementById("lobc1");
	if(lobbying.lobbyingDollars.gte(examLobbyingUpgradeable.currentCost)){
		lobc1.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--light'); 
		lobc1.style.boxShadow = "inset 0 0 20px "+getComputedStyle(document.documentElement).getPropertyValue('--light');

	}else{

		lobc1.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--error'); 		
		lobc1.style.boxShadow = "none";

	}
	var lobp1 = document.getElementById("lobp1");
	if(lobbying.lobbyingDollars.gte(parentsAutobuyerUpgradeable.currentCost)&&parentsAutobuyerUpgradeable.upgradeCount < 25){

		lobp1.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--light'); 
		lobp1.style.boxShadow = "inset 0 0 20px "+getComputedStyle(document.documentElement).getPropertyValue('--light');

	}else if(parentsAutobuyerUpgradeable.upgradeCount < 25){

		lobp1.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--error'); 		
		lobp1.style.boxShadow = "none";

	}else{

		lobp1.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--good'); 		
		lobp1.style.boxShadow = "none";

	}
	var lobm1 = document.getElementById("lobm1");
	if(lobbying.lobbyingDollars.gte(increaseXUpgradeable.currentCost)){
		lobm1.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--light'); 
		lobm1.style.boxShadow = "inset 0 0 20px "+getComputedStyle(document.documentElement).getPropertyValue('--light');

	}else{

		lobm1.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--error'); 		
		lobm1.style.boxShadow = "none";

	}
	

}
