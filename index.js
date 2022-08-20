const naborIgrokov = [
    {name: "Павло Чернобай",
    rate: 9.5
},
{
    name: "Евгений Федоров",
    rate: 6.5
},
{
    name: "Максим Федоров",
    rate: 6.5
},
{
    name: "Тимур",
    rate: 8
},
{
    name: "Сергей Федоров",
    rate: 4
},
{
    name: "Алик",
    rate: 7
},
{
    name: "Леня",
    rate: 6
},
{
    name: "Игорь Тихоновский",
    rate: 5
},
{
    name: "Руслан",
    rate: 8
},
{
    name: "Ярик Кувшинчик",
    rate: 9
},
{
    name: "Ярик 2",
    rate: 7.5
},
{
    name: "Дядя Саша",
    rate: 6
},
{
    name: "Брат Артем",
    rate: 7
},
{
    name: "Брат Вадик",
    rate: 6
},
{name: "Витя",
    rate: 6
},
{
    name: "Мыкыта",
    rate: 6
},
{
    name: "Семен",
    rate: 7
},
{
    name: "Саня",
    rate: 7
},
{
    name: "Ярик малой",
    rate: 6
},
{
    name: "Даниил высокий",
    rate: 5
},
{
    name: "Даниил малой",
    rate: 6
},
{
    name: "Андрей",
    rate: 6
},
{
    name: "Артем защитник",
    rate: 6
},
{
    name: "Рома",
    rate: 5
}
];
let resultMassive = [];
const rangeRate = 2;

sortMas(naborIgrokov,'name');

function showPlayers () {

    for (let i in naborIgrokov) {
        let playerDiv = document.createElement('div');
        playerDiv.className = "playerDiv";

        let playerCheckBox = document.createElement('input');
        playerCheckBox.type = 'checkbox';
        playerDiv.append(playerCheckBox);
        playerCheckBox.addEventListener('click', ()=> {
            let howManyPlayers = 0;
            for(let i=0; i<document.querySelectorAll('.playerDiv').length; i++) {
                if (document.querySelectorAll('.playerDiv')[i].querySelector('input').checked == true) {
                    howManyPlayers++;
                }
                
            }
            document.getElementById('playersToday').innerHTML = '(' + howManyPlayers + ' игроков' + ')';
        })

        let playerName = document.createElement('span');
        playerName.innerHTML = naborIgrokov[i].name;
        playerDiv.append(playerName);
        

        
        document.getElementById('players').append(playerDiv);
    }
    
}
function shuffleTeams (kolKomand) {
    let playersIn = [];
    for(let i=0; i<document.querySelectorAll('.playerDiv').length; i++) {
        if (document.querySelectorAll('.playerDiv')[i].querySelector('input').checked == true) {
            playersIn.push(naborIgrokov[i]);
        }
        
    }
    
    playersIn = randomizeMassive (playersIn);
    if (document.getElementById('randomShuffle').querySelector('input').checked == true) {
        randomShuffle (kolKomand,playersIn);
    }
    else {
        
        if (playersIn.length%kolKomand == 0) {
            let playersInTeam = playersIn.length/kolKomand;
            fairShuffle (kolKomand,playersIn,playersInTeam);
            
        }
        else {
            console.log('не делится')
        }
    }
}

function randomShuffle (kolKomand,playersIn) {
    console.log('Полный рандом активирован')
    let kolCyklov = playersIn.length;
        let teamNumber = 1;
            for(let i=0; i<kolCyklov; i++) {
                let player = document.createElement('span');
                player.className = 'playerName';
                let numberPlayerToTheTeam = Math.floor(Math.random()*playersIn.length);
                player.innerHTML = playersIn[numberPlayerToTheTeam].name;
                
                playersIn.splice(numberPlayerToTheTeam,1)
                
                document.getElementById('team'+teamNumber).append(player);
                teamNumber++;
                if (teamNumber>kolKomand) {
                    teamNumber =1 ;
                }
            }
            
}
function fairShuffle (kolKomand,playersIn,playersInTeam) {

    
  let allTeamMas = [];

 

  let averageScorePlayer = playersIn.reduce(
    (accumulator,currentPlayer) => accumulator + currentPlayer.rate,0
  )/playersIn.length;
  


    function getTeam (glubina,startIndex,playersIndex) {
        
        if (glubina == playersInTeam) {
            let teamMas = [];
            let teamRate = 0;
            let playerIndex = '';
            for (let i in playersIndex) {
                
                if (playersIndex[i] == '-') {
                    teamRate += playersIn[playerIndex].rate;
                    
                teamMas.push(playersIn[playerIndex])
                    playerIndex = '';
                }
                else {
                    playerIndex += playersIndex[i];
                }
            }

            let averagePlayerTeamRate = teamRate/playersInTeam;
            if (Math.abs(averagePlayerTeamRate - averageScorePlayer) < rangeRate) {
                allTeamMas.push({
                    teamMassive: teamMas,
                    averagePlayerTeamRate: averagePlayerTeamRate,
                    differenceRate: Math.abs(averagePlayerTeamRate - averageScorePlayer)
                });
            }
            
            
        }
        else {
            glubina++;
            if (glubina <= playersInTeam) {
    
                for (let i = startIndex; i<playersIn.length; i++) {
                    getTeam (glubina,i+1,(playersIndex +i + '-'));
                }
                
            }
        }
        
        
    }
    
    getTeam(0,0,'');
    sortMas(allTeamMas,'differenceRate');
    getTeamsWithOptions (allTeamMas,kolKomand);
    
    }
  

document.getElementById('buttonShuffle').addEventListener('click', () => {
    resultMassive = [];
    document.getElementById('result').innerHTML = '';
    document.getElementById('players').style.display = 'none';
    let kolKomand = document.getElementById('kolKomand').querySelector('input').value;
    for (let i=0; i<kolKomand; i++) {
        let teamDiv = document.createElement('div');
        teamDiv.className = 'teamDiv';
        teamDiv.id = 'team' + (i+1);
        document.getElementById('result').append(teamDiv);
        let teamName = document.createElement('span');
        teamName.className = 'teamName';
        teamName.innerHTML = 'Team ' + (i+1);
        teamDiv.append(teamName);
    }
    shuffleTeams (kolKomand);
    
})

function selectAllPlayers () {
    
    if (document.getElementById('selectAll').querySelector('input').checked == true) {
        for (let i=0; i < naborIgrokov.length; i ++) {
            document.querySelectorAll('.playerDiv')[i].querySelector('input').checked = true;
        }
    }
    else {
        for (let i=0; i < naborIgrokov.length; i ++) {
            document.querySelectorAll('.playerDiv')[i].querySelector('input').checked = false;
        }
    }
    
}
document.getElementById('selectAll').querySelector('input').addEventListener('click', () => {
    selectAllPlayers();
})
function sortMas (allTeamMas,parametr) {
    allTeamMas.sort(function (a, b) {
        if (a[parametr] > b[parametr]) {
          return 1;
        }
        if (a[parametr] < b[parametr]) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
}

function getTeamsWithOptions (massive) {
    
    
    if (document.getElementById('randomBalance').querySelector('input').checked != true) {
        console.log('Максимально равные команды')
        for (let i in massive) {
            if (i ==0) {
                resultMassive.push(massive[i]);
                
            }
            else {
                let compare = compareParametrs (massive[i]);
                if (compare) {
                    resultMassive.push(massive[i]);
                }
                
            }
        }
    }
    else {
        console.log('Рандом из равных команд')
       
        function randomBalanceTeam () {
            
            let teamIndex = Math.floor(Math.random()*(massive.length-1));
            if (resultMassive.length == 0) {
                resultMassive.push(massive[teamIndex]);
                massive.splice(teamIndex,1);
                randomBalanceTeam();
            }
            else {
                let compare = compareParametrs (massive[teamIndex]);
                if (compare) {
                    resultMassive.push(massive[teamIndex]);
                }
                massive.splice(teamIndex,1);
                if (massive.length != 0) {
                    randomBalanceTeam();
                }
            }
               
                    
                    
                    
                    
        }
        randomBalanceTeam ();


    }   
    showBalanceTeams ();
}
function showBalanceTeams () {
    for(let i in resultMassive) {
        // document.getElementById('team' + (Number(i)+1)).querySelector('span').innerHTML += ' (' + resultMassive[i].averagePlayerTeamRate + ')';
        for (let j in resultMassive[i].teamMassive) {
            let player = document.createElement('span');
            player.className = 'playerName';
            player.innerHTML = resultMassive[i].teamMassive[j].name;
            document.getElementById('team'+(Number(i)+1)).append(player);
        }
        
    }
}
function compareParametrs (massive) {
    let flag = false;
    breakCykl:  for (let u in massive.teamMassive) { 
        for (let p in resultMassive) { 
            for (let j in resultMassive[p].teamMassive) {
                if (massive.teamMassive[u].name == resultMassive[p].teamMassive[j].name) {
                    flag = true;
                    break breakCykl;
                }
                
            }  
        }
    }
    
    if (!flag) {
        return true;
    
    }
}
function randomizeMassive (massive) {
    let randomMas = [];
    function pushNewElement () { //
        let teamIndex = Math.floor(Math.random()*(massive.length-1));
                randomMas.push(massive[teamIndex])
                massive.splice(teamIndex,1);
                if (massive.length != 0) {
                    pushNewElement();
                }
                
    }
    pushNewElement();
    return randomMas;
}

showPlayers ();

