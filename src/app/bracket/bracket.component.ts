import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})
export class BracketComponent implements OnInit {
 	

  constructor() { }

  public advance(pick) {
  // 	 var replaceAt = function(index, replacement) {
	 //    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
		// }
		var noTeamChosenSrc = 'src/img/bracket/nba/Solid_white.svg';
  	var numberOfRounds = 4;
  	var teamClasses = pick.parentNode.className;
  	var roundElement = pick.parentNode.parentNode;
  	var roundClasses = pick.parentNode.parentNode.className;
  	var roundNumber = roundClasses.substring(roundClasses.indexOf('toGo')-1).charAt(0);
  	var gameNumber = Number(teamClasses.substring(teamClasses.indexOf('game')).charAt(4));
  	var teamNumber = Number(teamClasses.substring(teamClasses.indexOf('team')).charAt(4));
  	var competingTeamNumber = teamNumber % 2 + 1;
  	var competingTeamClass = 'game' + gameNumber + ' team' + competingTeamNumber;
  	var competingTeam;
  	var competingTeamSrc;

	  var roundToCheckCompetingTeamIsNotIn = roundNumber - 2;
	  if (roundToCheckCompetingTeamIsNotIn >=0) {
	  	for (var i = 0; i < roundElement.childNodes.length; i++) {
	  		if (roundElement.childNodes[i].className &&
	  			roundElement.childNodes[i].className.includes(competingTeamClass)) {
	  			competingTeam = roundElement.childNodes[i];
	  			break;
	  		}
	  	}

	  	//Find picture from competing team
	  	for (var i = 0; i < competingTeam.childNodes.length; i++) {
	  		if (competingTeam.childNodes[i].tagName == 'DIV') {
	  			var teamLogoHolder = competingTeam.childNodes[i];
		  		for (var i = 0; i < teamLogoHolder.childNodes.length; i++) {
		  			if (teamLogoHolder.childNodes[i].tagName == 'IMG'){
		  				competingTeamSrc = teamLogoHolder.childNodes[i].src;
		  				break;
		  			}
		  		}
	  		}
	  	}

	  	//Check if the competing team is in any future rounds
	  	var newRoundClasses;
	  	var roundIndex;
	  	var roundClassIndex;
	  	var newGameNumber;
	  	var newTeamNumber;
	  	var futureGameNumber;
	  	var futureTeamNumber;
	  	var newClass;
	  	var futureTeam;
	  	var needToCheckNextRound = true;
		  var roundToCheckCompetingTeamIsNotIn = roundNumber - 2;
		  newGameNumber = Math.round(gameNumber/2);
		  Math.round(gameNumber/2) !== gameNumber/2 ? newTeamNumber = 1 : newTeamNumber = 2;

	  	while (needToCheckNextRound && roundToCheckCompetingTeamIsNotIn >=0) {
		  	needToCheckNextRound = false;
		  	if (roundToCheckCompetingTeamIsNotIn > 0) {
		  		roundIndex = roundClasses.indexOf(('toGo'))-1;
		  		newRoundClasses = roundClasses.substring(0,roundIndex) + 
		  			roundToCheckCompetingTeamIsNotIn +
		  			roundClasses.substring(roundIndex + 1);
		  		roundClassIndex = newRoundClasses.indexOf('round');
		  		newRoundClasses = newRoundClasses.substring(0,roundClassIndex) +
		  			newRoundClasses.substring(roundClassIndex + 7);
		  		futureGameNumber = Math.round(newGameNumber/2);
		  		Math.round(newGameNumber/2) !== newGameNumber/2 ? futureTeamNumber = 1 : futureTeamNumber = 2;
		  		if (newRoundClasses.indexOf('east') >= 0 && roundToCheckCompetingTeamIsNotIn === 1) { 
		  			futureTeamNumber = 2;
		  		}
		  		newGameNumber = futureGameNumber;
		  		newTeamNumber = futureTeamNumber;
		  		newClass = "game" + futureGameNumber + " team" + futureTeamNumber;
		  	} else {
		  		newRoundClasses = '0toGo';
		  		newClass = "champion";
		  	}

	  		var newRoundElement = document.getElementsByClassName(newRoundClasses)[0];
	  		futureTeam = null;
	  		for (var i = 0; i < newRoundElement.childNodes.length; i++) {
		  		if (newRoundElement.childNodes[i]['className'] &&
		  			newRoundElement.childNodes[i]['className'].includes(newClass)) {
		  			futureTeam = newRoundElement.childNodes[i];
		  			break;
		  		}
		  	}

		  	if(!futureTeam) { console.log('no future team found'); }

		  	//Find picture from competing team
		  	for (var i = 0; i < futureTeam.childNodes.length; i++) {
		  		if (futureTeam.childNodes[i].tagName == 'DIV') {
		  			var teamLogoHolder = futureTeam.childNodes[i];
			  		for (var i = 0; i < teamLogoHolder.childNodes.length; i++) {
			  			if (teamLogoHolder.childNodes[i].tagName == 'IMG'){
			  				if (teamLogoHolder.childNodes[i].src === competingTeamSrc) {
			  					teamLogoHolder.childNodes[i].src = noTeamChosenSrc;
			  					roundToCheckCompetingTeamIsNotIn--;
			  					needToCheckNextRound = true;
			  				}
			  				break;
			  			}
			  		}
		  		}
		  	}
		  }
		}
  };


  ngOnInit() {
  	var i,
        j,
        newMatchups,
        curRound = 1,
        NUM_ROUNDS = 4,
        sides = ['east', 'west'],
        matchups = [["1", "8"], ["4", "5"], ["2", "7"], ["3", "6"], ["1", "8"], ["4", "5"], ["2", "7"], ["3", "6"]],
        roundX,
        team1,
        team2,
        winSlot,
        allInputs = document.getElementsByTagName("input"),
        setTeamOnClick,
        verifyInput;
    
    // Takes an li and sets the child img onclick
    setTeamOnClick = function (curSlot, nextSlot) {
        var img = curSlot.getElementsByTagName("img")[0],
            nextImg = nextSlot.getElementsByTagName("img")[0];
        
        img.onclick = function (event) {
            nextImg.src = img.src;
        };
    };
    
    // Validates input in series scoring
    verifyInput = function (e) {
        e = e || window.event;
        var keyChar = String.fromCharCode(e.keyCode),
            input = e.target || e.srcElement;
        
        if (keyChar < '0' || keyChar > '4') {
            return false;
        } else {
            input.value = "";
        }
    };
    
    // Set up onClicks for all images
    while (curRound <= NUM_ROUNDS) {
        // Go through east and west
        for (i = 0; i < sides.length; i += 1) {
            roundX = document.getElementsByClassName(sides[i] + " round" + curRound)[0];
            
            // Go through each matchup
            for (j = 0; j < matchups.length / 2; j += 1) {
                team1 = roundX.getElementsByClassName("seed" + matchups[j][0])[0];
                team2 = roundX.getElementsByClassName("seed" + matchups[j][1])[0];

                if (curRound < 4) {
                    winSlot = document.getElementsByClassName(sides[i] + " round" + (curRound + 1))[0];
                } else {
                    winSlot = document.getElementsByClassName("champion")[0];
                }

                setTeamOnClick(team1, winSlot.getElementsByClassName("seed" + matchups[j][0] + "-" + matchups[j][1])[0]);
                setTeamOnClick(team2, winSlot.getElementsByClassName("seed" + matchups[j][0] + "-" + matchups[j][1])[0]);
            }
        }

        // Merge
        if (curRound < 4) {
            newMatchups = [];
            for (i = 0; i < matchups.length; i += 2) {
                matchups[i][0] = matchups[i][0] + "-" + matchups[i][1];
                matchups[i][1] = matchups[i + 1][0] + "-" + matchups[i + 1][1];
                newMatchups.push(matchups[i]);
            }
            matchups = newMatchups;
        }
        
        curRound += 1;
    }
    
    // Setup text listeners for all inputs
    for (i = 0; i < allInputs.length; i += 1) {
        allInputs[i].onkeypress = verifyInput;
    }

  }

  public submitBracket(event) {
  	var images = document.getElementsByTagName('img');
  	var allTeamsPicked = true;
  	var playoffTeams = [];
  	var yourFirstRoundPicks = [];
  	var yourConferenceFinalPicks = [];
  	var yourConferenceChampPicks = [];
  	var yourFinalsChampPick;
  	var currentTeamImg;
  	var currentTeam;
  	for(var i = 0; i < images.length; i++) {
  		currentTeamImg = images[i].src
  		if(currentTeamImg.indexOf("src/img/bracket/nba/Solid_white.svg")>=0) {
  			alert("SORREY!!!!\nYou can only submit a bracket once a team is picked for every matchup.\nPlease make a choice between the remaining matchups");
  			allTeamsPicked = false;
  			break;
  		}
  		else if(currentTeamImg.indexOf("/nba/")>=0) {
  			currentTeam = currentTeamImg.substring(currentTeamImg.indexOf("nba")+4,currentTeamImg.indexOf("."));
			if(!playoffTeams.includes(currentTeam)){
  				playoffTeams.push(currentTeam);
  			} else if(!yourFirstRoundPicks.includes(currentTeam)){
  				yourFirstRoundPicks.push(currentTeam);
  			} else if(!yourConferenceFinalPicks.includes(currentTeam)){
  				yourConferenceFinalPicks.push(currentTeam);
  			} else if(!yourConferenceChampPicks.includes(currentTeam)){
  				yourConferenceChampPicks.push(currentTeam);
  			} else {
  				yourFinalsChampPick = currentTeam;
  			}
  		}
  	}
  	if (allTeamsPicked) {
  		alert("SORREY!!!!\nThis site is not able to save your brackets yet..\nBut it's next on my To Do list!!");
  	}
  }

}
