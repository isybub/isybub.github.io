var override = 0;
function updateBasedOnProgress(){
	switch(discoverProgress){
		case -2:
			if(mathematica.highestMathematica.gte(2)||override){
				document.getElementById("story1").style.opacity = 1;
				document.getElementById("story1").style.zIndex = 1;
				if(!override||override>discoverProgress){
					discoverProgress++;
				}else{
					override = 0;
				}
			}
			break;
		case -1:
			if(mathematica.highestMathematica.gte(4)||override){
				if(lobUps.parentsAutobuyer.upgradeCount!=25){
					document.getElementById("story3").style.opacity = 1;
					document.getElementById("story3").style.zIndex = 1;
				}
				if(document.body.offsetWidth<1592)document.body.scrollTop = 140;
				if(document.body.offsetWidth<938)document.body.scrollTop = 600;
				if(!override||override>discoverProgress){
					discoverProgress++;
				}else{
					override = 0;
				}
			}
			break;
		case 0:
			if(mathematica.highestMathematica.gte(6)||override){
				if(lobUps.parentsAutobuyer.upgradeCount!=25){
					document.getElementById("story4").style.opacity = 1;
					document.getElementById("story4").style.zIndex = 1;
					document.getElementById("story3").style.opacity = 0;
					document.getElementById("story3").style.zIndex = -1;
				}
				if(!override||override>discoverProgress){
					discoverProgress++;
				}else{
					override = 0;
				}
			}
			break;
		case 1:
			if(parents.highestRealDollars.gte(10)||override&&child.one.purchased){
				if(!override||override>discoverProgress){
					discoverProgress+=childschoolingstory()
				}else{
					override = 0;
				}
				if(override>discoverProgress) {
					unlockFirstChild();
				}
			}
			break;
		case 2:
			if(iq.highestiqps.gte(6)||override){
				document.getElementById("u1x").style.opacity = 1;
				document.getElementById("u1x").style.zIndex = 1;

				if(!override||override>discoverProgress){
					discoverProgress++;
				}else{
					override = 0;
				}

			}
			break;
		case 3:
			/*if(iq.highestiqps.gte(4.5)){
				document.getElementById("u1Alg").style.opacity = 1;
				document.getElementById("u1Alg").style.zIndex = 1;
				document.getElementById("u1Alg").innerHTML = "MPS * 1.2 <br />Cost:<span id=u1Algc>10.0</span>IQ Points";*/
				if(!override||override>discoverProgress){
					discoverProgress++;
				}else{
					override = 0;
				}
			//}
			break;
		case 4:
			if(iq.highestiqps.gte(6)||override){
				document.getElementById("lobbyreveal").style.opacity = 1;
				document.getElementById("lobbyreveal").style.zIndex = 1;
					document.getElementById("sacrifice").style.opacity = 1;
					document.getElementById("sacrifice").style.zIndex = 1;
				if(!override||override>discoverProgress){
					discoverProgress++;
				}else{
					override = 0;
				}
			}
			break;
		case 5:
			/*if(iq.highestPoints.gte(60)){
				document.getElementById("u2Alg").style.opacity = "1";
				document.getElementById("u2Alg").style.zIndex = "1";*/
				if(iq.highestiqps.gte(50.6)||override){
					lobbying.openable = true;
					var lob = document.getElementById("lobbyreveal");
					lob.innerHTML = "<h4>Lobby the government.</h4>";
					lob.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--good');
					lob.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--good');
					document.getElementById("story20").style.opacity = 1;
					document.getElementById("story20").style.zIndex = 1;
				document.getElementById("sacrifice").innerHTML = "<h4>Sacrifice the children. <br /> <span id=lobbyinggain>0</span> Lobbying Dollars Earned</h4>";
				
				lobbying.updateTotals();
					if(!override||override>discoverProgress){
						discoverProgress++;
					}else{
						override = 0;
					}

				}
			//}
			break;

		case 6:
			if(override){
				if(!override||override>discoverProgress){
					discoverProgress++;
				}else{
					override = 0;
				}

			}
			break;

		case 9:
		/*case 1:
			if(highestMathematica.gte(20)){
				document.getElementById("u2Alg").style.opacity = "1";
				document.getElementById("u2Alg").style.zIndex = "1";
				discoverProgress++;
			}
		break;
		case 2:
			if(highestMathematica.gte(100)){
				document.getElementById("u2Alg").innerHTML = "Cost / 1.2 <br />Cost: <span id=u2Algc>10</span>";
				discoverProgress++;
			}
		break;
		case 3:
			if(highestMathematica.gte(500)){
				document.getElementById("auto1").style.opacity = "1";
				document.getElementById("auto1").style.zIndex = "1";
				discoverProgress++;
			}
		break;
		case 4:
			if(highestMathematica.gte(1000)){
				document.getElementById("auto1").innerHTML = "x increment autobuyer <br />Cost: <span id=auto1c>1000</span>";
				discoverProgress++;
			}
		break;*/ //this needs to be IQ not mathematica.
	}
}
var schoolstoryprogress = 0;
function childschoolingstory(){
	if(override) {
		return 1;
	}
	if(parents.highestRealDollars.gte(10+(schoolstoryprogress)*4)){
		if(schoolstoryprogress){
			document.getElementById("prechild"+schoolstoryprogress).style.opacity = "0";
			document.getElementById("prechild"+schoolstoryprogress).style.fontSize = "0";
		}
		if(++schoolstoryprogress<5) document.getElementById("prechild"+ schoolstoryprogress).style.opacity = "1";
	}
	if(schoolstoryprogress===6){
		document.getElementById("child1buy").style.opacity = "1";
		return 1;
	} 
	return 0;
}