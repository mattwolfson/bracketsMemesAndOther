import { Component, OnInit } from '@angular/core';
import { Team } from './team.model';
import { Conference } from './conference.model';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})
export class BracketComponent implements OnInit {

	eastTeams: Team[] = [
		new Team(1, 'src/img/bracket/nba/Boston_Celtics.svg', 'nbaEast', 'seed-1 game-1 round-1', 'Boston Celtics'),
		new Team(8, 'src/img/bracket/nba/Chicago_Bulls.svg', 'nbaEast', 'seed-8 game-1 round-1', 'Chicago Bulls'),
		new Team(4, 'src/img/bracket/nba/Washington_Wizards.svg', 'nbaEast', 'seed-4 game-1 round-1', 'Washington Wizards'),
		new Team(5, 'src/img/bracket/nba/Atlanta_Hawks.svg', 'nbaEast', 'seed-5 game-1 round-1', 'Atlanta Hawks'),
		new Team(2, 'src/img/bracket/nba/Cleveland_Cavaliers.svg', 'nbaEast', 'seed-2 game-1 round-1', 'Cleveland Calaliers'),
		new Team(7, 'src/img/bracket/nba/Indiana_Pacers.svg', 'nbaEast', 'seed-7 game-1 round-1', 'Indiana Pacers'),
		new Team(3, 'src/img/bracket/nba/Houston_Rockets.svg', 'nbaEast', 'seed-8 game-1 round-1', 'Houston Rockets'),
		new Team(6, 'src/img/bracket/nba/Oklahoma_City_Thunder.gif', 'nbaEast', 'seed-8 game-1 round-1', 'Oklahoma City Thunder')
	];

	westTeams: Team[] = [
		new Team(1, 'src/img/bracket/nba/Golden_State_Warriors.svg', 'nbaWest', 'seed-1 game-1 round-1', 'Golden State Warriors'),
		new Team(8, 'src/img/bracket/nba/Portland_Trail_Blazers.svg', 'nbaWest', 'seed-8 game-1 round-1', 'Portland Trail Blazers'),
		new Team(4, 'src/img/bracket/nba/Clippers.svg', 'nbaWest', 'seed-4 game-1 round-1', 'Clippers'),
		new Team(5, 'src/img/bracket/nba/Utah_Jazz.svg', 'nbaWest', 'seed-5 game-1 round-1', 'Utah Jazz'),
		new Team(2, 'src/img/bracket/nba/San_Antonio_Spurs.svg', 'nbaWest', 'seed-2 game-1 round-1', 'San Antonio Spurs'),
		new Team(7, 'src/img/bracket/nba/Memphis_Grizzlies.svg', 'nbaWest', 'seed-7 game-1 round-1', 'Memphis Grizzlies'),
		new Team(3, 'src/img/bracket/nba/Houston_Rockets.svg', 'nbaWest', 'seed-8 game-1 round-1', 'Houston Rockets'),
		new Team(6, 'src/img/bracket/nba/Oklahoma_City_Thunder.gif', 'nbaWest', 'seed-8 game-1 round-1', 'Oklahoma City Thunder')
	];

	nbaEast = new Conference('east', 'eastGroup', this.eastTeams, 'basketball', 'NBA');
	nbaWest = new Conference('west', 'westGroup', this.westTeams, 'basketball', 'NBA');
	conferences: Conference[] = [ this.nbaEast, this.nbaWest];

	blankSpotImg = 'src/img/bracket/nba/Solid_white.svg';
	blank = new Team(null, this.blankSpotImg, 'nbaEast');
	totalRounds;

  constructor() { }

	public advanceToNextRound(conferenceName, roundNumber, teamPosition, currentPositionId) {
		const winningTeamPicture = this.getPictureFromTeamElementId(currentPositionId).getAttribute('src');
		const newId = this.findFutureGameId(currentPositionId);
		const winningPictureBox = this.getPictureFromTeamElementId(newId);
		winningPictureBox.setAttribute('src', winningTeamPicture);

		if (newId !== 'champion') {
			const competingTeamPosition = teamPosition % 2 === 0 ? ++teamPosition : --teamPosition;
			const competingTeamId = conferenceName + '-round-' + roundNumber + '-team-' + competingTeamPosition;
			this.clearLoserFromFutureGames(newId, competingTeamId);
		}
	}

	private findFutureGameId(currentPositionId) {
		const idValues = currentPositionId.split('-');
		const conferenceName = idValues[0];
		const roundNumber = Number(idValues[2]);
		const teamPosition = Number(idValues[4]);
		let newId;
		if (this.totalRounds === roundNumber) {
			newId = 'champion';
		} else {
			const newRound = roundNumber + 1;
			const newTeamPosition = Math.floor(teamPosition / 2);
			newId = conferenceName + '-round-' + newRound + '-team-' + newTeamPosition;
		}
		return newId;
	}

	private clearLoserFromFutureGames(futureWinnerId, losingTeamId) {
		const losingTeamPicture = this.getPictureFromTeamElementId(losingTeamId).getAttribute('src');
		if (losingTeamPicture !== this.blankSpotImg) {
			while (futureWinnerId !== 'champion') {
				futureWinnerId = this.findFutureGameId(futureWinnerId);
				let futureWinnerPictureElement = this.getPictureFromTeamElementId(futureWinnerId);
				let futureWinnerPicture = futureWinnerPictureElement.getAttribute('src');
				if (futureWinnerPicture === losingTeamPicture) {
					futureWinnerPictureElement.setAttribute('src', this.blankSpotImg);
				} else {
					break;
				}
			}
		}
	}

	private getPictureFromTeamElementId(id) {
		const team = document.getElementById(id);
		for(let index in team.children) {
			if (team.children[index].className === 'teamPicture') {
				return team.children[index];
			}
		};
	}


  ngOnInit() {
  	const  verifyInput = function (e) {
        e = e || window.event;
        const keyChar = String.fromCharCode(e.keyCode),
            input = e.target || e.srcElement;

        if (keyChar < '0' || keyChar > '4') {
            return false;
        } else {
            input.value = '';
        }
    };
	}

  public checkForUnpickedTeams(enableAlerts) {
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
			if(enableAlerts) {alert("SORREY!!!!\nYou can only submit a bracket once a team is picked for every matchup.\nPlease make a choice between the remaining matchups"); }
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

  	return allTeamsPicked;
  }

  public checkToUpdateSubmitButon() {
  	var allTeamsPicked = this.checkForUnpickedTeams(false);
  	if(allTeamsPicked) {
  		document.getElementById("submitBracket").className="";
  		document.getElementById("bracketNotFullAlert").className="hide";
  	} else {
  		document.getElementById("submitBracket").className="hide";
  		document.getElementById("bracketNotFullAlert").className="";
  	}

  }
  public submitBracket(event) {
  	var allTeamsPicked = this.checkForUnpickedTeams(true);
  	if (allTeamsPicked) {
  		alert("SORREY!!!!\nThis site is not able to save your brackets yet..\nBut it's next on my To Do list!!");
  	}
  }

	public timesToLoop(conferenceTeams, roundNumber) {
		if (roundNumber !== 1) {
			const numberOfTeams = conferenceTeams.length;
			const roundedNumber = Math.ceil(numberOfTeams / (Math.pow(2, roundNumber - 1)));
			 return Array(roundedNumber).fill(0).map((x, i) => i);
		} else {
			return conferenceTeams;
		}
  }

	public numberOfRounds(numberOfTeams) {
		const roundEstimate = Math.log(numberOfTeams) / Math.log(2);
		let rounds;
		if (roundEstimate % 1 === 0) {
			rounds = Array(roundEstimate + 1).fill(0).map((x, i) => i + 1);
		} else {
			//TODO: handle case of byes
			console.log('There needs to be byes');
			rounds = Array(Math.ceil(roundEstimate) + 1).fill(0).map((x, i) => i + 1);
		}
		this.totalRounds = rounds.length;
		return rounds;
	}
}
