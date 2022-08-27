const naborIgrokov = [
    {name: "Павел Чернобай",
    rate: 9,
    age: 31
},
{
    name: "Евгений Федоров",
    rate: 6.8,
    goalkeeper: true,
    age: 32
},
{
    name: "Алексей",
    rate: 7.2,
    age: 19
},
{
    name: "Максим Федоров",
    rate: 6.8,
    age: 38
},
{
    name: "Даниил Игнатенко",
    rate: 5.1,
    age: 18
},
{
    name: "Тимур",
    rate: 8.3,
    age: 31
},
{
    name: "Сергей Федоров",
    rate: 4.7,
    goalkeeper: true,
    age: 62
},
{
    name: "Алик",
    rate: 7,
    goalkeeper: true,
    age: 62
},
{
    name: "Леня",
    rate: 6,
    age: 31
},
{
    name: "Игорь Тихоновский",
    rate: 4.4,
    age: 31
},
{
    name: "Руслан",
    rate: 8,
    age: 31
},
{
    name: "Ярик Кувшинчик",
    rate: 9,
    age: 35
},
{
    name: "Ярик 2",
    rate: 7.5,
    age: 31
},
{
    name: "Дядя Саша",
    rate: 6,
    age: 65
},
{
    name: "Артем Примак",
    rate: 6.8,
    age: 16
},
{
    name: "Вадим Примак",
    rate: 6,
    age: 15
},
{name: "Виктор Биличенко",
    rate: 6,
    age: 19
},
{
    name: "Никита Зинченко",
    rate: 5.5,
    age: 18
},
{
    name: "Семен",
    rate: 6.7,
    goalkeeper: true,
    age: 31
},
{
    name: "Саня",
    rate: 7.5,
    age: 31
},
{
    name: "Ярик малой",
    rate: 6.3,
    age: 31
},
{
    name: "Даниил высокий",
    rate: 5.5,
    age: 31
},
{
    name: "Даниил малой",
    rate: 6.3,
    age: 31
},
{
    name: "Андрей",
    rate: 6,
    age: 31
},
{
    name: "Артем Кошуба",
    rate: 6.2,
    age: 18
},
{
    name: "Роман Шкуратько",
    rate: 4.7,
    goalkeeper: true,
    age: 14
},
{
    name: "Роман Пунишер",
    rate: 5.1,
    age: 21
},
{
    name: "Илья Дектерьов",
    rate: 5.3,
    age: 15
},
{
    name: "Дима",
    rate: 8,
    age: 31
}
];
let resultMassive;
const rangeRate = 0.08;
let kolKomand;
let playersIn;
let averageScorePlayer;
let allTeamMas = [];
let kolVratarey;
let teamComposition;
sortMas(naborIgrokov,'name');

document.getElementById('buttonShuffle').addEventListener('click', () => {
    // document.getElementById('circlLoad').classList.add('circlLoad')
    // document.getElementById('loading').style.zIndex = 1;
    document.getElementById('errorMassage').innerHTML = 'Идет поиск команд'
    
        startShuffle ();
    
    
    
})



function showPlayers () {

    for (let i in naborIgrokov) {
        let playerDiv = document.createElement('div');
        playerDiv.className = "playerDiv";

        let playerCheckBox = document.createElement('input');
        playerCheckBox.type = 'checkbox';
        playerDiv.append(playerCheckBox);
        playerCheckBox.addEventListener('click', ()=> {
            numberOfPlayers()
            
        })

        let playerName = document.createElement('span');
        playerName.innerHTML = naborIgrokov[i].name;
        if (naborIgrokov[i].goalkeeper) {
            playerName.className = 'goalkeeper';
        }
        playerDiv.append(playerName);
        

        
        document.getElementById('players').append(playerDiv);
    }
    
}
function shuffleTeams () {
    
   
   
}
function howPlayersInTeam () {
    
    teamComposition = {
        teamWithPlusPlayer: {
            players: Math.floor(playersIn.length/kolKomand)+1,
            teams: playersIn.length%kolKomand
        },
        teamWithMinusPlayer: {
            players: Math.floor(playersIn.length/kolKomand),
            teams: kolKomand - playersIn.length%kolKomand
        }
    };
}
function randomShuffle () {
    console.log('Полный рандом активирован')
    resultMassive = [];
    let kolCyklov = playersIn.length;
        let teamNumber = 1;
        let averagePlayerTeamRate=0;
        let teamMas = [];
            for(let i=0; i<kolCyklov; i++) {
                let numberPlayerToTheTeam = Math.floor(Math.random()*playersIn.length);
                averagePlayerTeamRate += playersIn[numberPlayerToTheTeam].rate;
                // let player = document.createElement('span');
                // player.className = 'playerName';
                
                // player.innerHTML = playersIn[numberPlayerToTheTeam].name;
                teamMas.push(playersIn[numberPlayerToTheTeam])
                playersIn.splice(numberPlayerToTheTeam,1);
                
                // document.getElementById('team'+teamNumber).append(player);
                teamNumber++;
                if (teamNumber>kolKomand) {
                    console.log(Math.floor(averagePlayerTeamRate*100)/100);
                    resultMassive.push({    
                        teamMassive: teamMas,
                        averagePlayerTeamRate: Math.floor(averagePlayerTeamRate*100)/100,
                        differenceRate: Math.abs(averagePlayerTeamRate - averageScorePlayer)
                    });
                    teamNumber =1 ;
                    averagePlayerTeamRate = 0;
                    teamMas = [];
                    
                }
            }
            showBalanceTeams();
}
function fairShuffle () {
    function getTeam (glubina,startIndex,playersIndex,playersInTeam) {
        
        if (glubina == playersInTeam) {
            
            let teamMas = [];
            let teamRate = 0;
            let playerIndex = '';
            let numberOfGoalkeepers = 0;
            let totalAge = 0;
            for (let i in playersIndex) {
                
                if (playersIndex[i] == '-') {
                    teamRate += playersIn[playerIndex].rate;
                    totalAge +=playersIn[playerIndex].age;
                    if (playersIn[playerIndex].goalkeeper) {
                        numberOfGoalkeepers++;
                    }
                    
                teamMas.push(playersIn[playerIndex])
                    playerIndex = '';
                }
                else {
                    playerIndex += playersIndex[i];
                }
            }
            
            let averagePlayerTeamRate = Math.floor(teamRate*100/playersInTeam)/100;
            if (Math.abs(averagePlayerTeamRate - averageScorePlayer) < rangeRate) {
                if (kolVratarey<=kolKomand && numberOfGoalkeepers>1) {

                }
                else if (kolVratarey>kolKomand && numberOfGoalkeepers == 0) {
                    
                }
                else {
                    
                    allTeamMas.push({
                        teamMassive: teamMas,
                        averagePlayerTeamRate: averagePlayerTeamRate,
                        differenceRate: Math.abs(averagePlayerTeamRate - averageScorePlayer),
                        averageAgeTeam: totalAge/playersInTeam
                });
                }
                
            }
            
            
        }
        else {
            glubina++;
            if (glubina <= playersInTeam) {
    
                for (let i = startIndex; i<playersIn.length; i++) {
                    getTeam (glubina,i+1,(playersIndex +i + '-'),playersInTeam);
                }
                
            }
        }
        
        
    }
    if (playersIn.length%kolKomand == 0) {
        getTeam(0,0,'',playersIn.length/kolKomand);
        }
    else {
        let kolIgrokov= Math.floor(playersIn.length/kolKomand);
        getTeam(0,0,'',kolIgrokov+1);
        getTeam(0,0,'',kolIgrokov);
        
    }
    
    
    
    
    }
  


function startShuffle () {
    
    allTeamMas = [];
    playersIn = [];
    resultMassive = [];
    kolVratarey = 0;
    kolKomand = document.getElementById('kolKomand').querySelector('input').value;
    
    
    for(let i=0; i<document.querySelectorAll('.playerDiv').length; i++) {
        if (document.querySelectorAll('.playerDiv')[i].querySelector('input').checked == true) {
            playersIn.push(naborIgrokov[i]);
            
            if (naborIgrokov[i].goalkeeper) {
                
                kolVratarey++;
            }
        }
        
    }
    playersIn = randomizeMassive (playersIn);
    howPlayersInTeam(); 
    averageScorePlayer = playersIn.reduce(
        (accumulator,currentPlayer) => accumulator + currentPlayer.rate,0
      )/playersIn.length;
  
      if (document.getElementById('randomShuffle').querySelector('input').checked == true) {
        randomShuffle ();
    }
    else {
        
            fairShuffle ();
            sortMas(allTeamMas,'differenceRate');
            getTeamsWithOptions (allTeamMas);
            
      
    }
    

    
}
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
    numberOfPlayers();
})
function sortMas (sortingMas,parametr) {
    sortingMas.sort(function (a, b) {
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
    let teamWithMorePlayers = 0;
    let teamWithLessPlayers = 0;
    
    if (document.getElementById('randomBalance').querySelector('input').checked != true) {
        for (let i in massive) {
            let compare = compareParametrs (massive[i]);
            
            if (i ==0 || compare) {
                if (massive[i].teamMassive.length == teamComposition.teamWithPlusPlayer.players && teamComposition.teamWithPlusPlayer.teams > teamWithMorePlayers) {
                    teamWithMorePlayers++;
                    resultMassive.push(massive[i]);
                    
                }
                else if(massive[i].teamMassive.length == teamComposition.teamWithMinusPlayer.players && teamComposition.teamWithMinusPlayer.teams > teamWithLessPlayers) {
                    teamWithLessPlayers++;
                    resultMassive.push(massive[i]);
                }
            }
            
        }
    }
    else {
       
        function randomBalanceTeam () {
            
let kolCyklov = massive.length;
            for (let i=0; i<kolCyklov; i++) {
                let teamIndex = Math.floor(Math.random()*(massive.length-1));
                let compare = compareParametrs (massive[teamIndex]);
                if (resultMassive.length == 0 || compare) {
                    if (massive[teamIndex].teamMassive.length == teamComposition.teamWithPlusPlayer.players && teamComposition.teamWithPlusPlayer.teams > teamWithMorePlayers) {
                        teamWithMorePlayers++;
                        resultMassive.push(massive[teamIndex]);
                        
                    }
                    else if(massive[teamIndex].teamMassive.length == teamComposition.teamWithMinusPlayer.players && teamComposition.teamWithMinusPlayer.teams > teamWithLessPlayers) {
                        teamWithLessPlayers++;
                        resultMassive.push(massive[teamIndex]);
                    }

                    
                    
                }
                massive.splice(teamIndex,1);
            }

                    
                    
                    
                    
        }
        randomBalanceTeam ();


    }       
    if (kolKomand>resultMassive.length || playersOff()) {
        console.log('Не могу подобрать команды')
        console.log(resultMassive)
        startShuffle ();
    }
    else {  
        showBalanceTeams ();
    }
    
}
function showBalanceTeams () {
    document.getElementById('errorMassage').innerHTML = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('players').style.display = 'none';
    for(let i in resultMassive) {
        let teamDiv = document.createElement('div');
        teamDiv.className = 'teamDiv';
        teamDiv.id = 'team' + (Number(i)+1);
        document.getElementById('result').append(teamDiv);

        let teamName = document.createElement('span');
        teamName.className = 'teamName';
        teamName.innerHTML = 'Team ' + (Number(i)+1);
        teamDiv.append(teamName);
        teamName.innerHTML += ' (' + resultMassive[i].averagePlayerTeamRate + ')';

        let ageSpan = document.createElement('span');
        ageSpan.className = 'ageSpan';
        ageSpan.innerHTML = 'Средний возраст - ' + resultMassive[i].averageAgeTeam;
        teamDiv.append(ageSpan);

        for (let j in resultMassive[i].teamMassive) {
            let player = document.createElement('span');
            player.className = 'playerName';
            if (resultMassive[i].teamMassive[j].goalkeeper) {
                player.className = 'goalkeeper';
            }
            player.innerHTML = resultMassive[i].teamMassive[j].name;
            teamDiv.append(player);
        }
        
    }
    playersOff();
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
function playersOff () {
    let playersOff = false;
     for(let i in playersIn) {
         let playerIn = false;
         
        loop:   for (let j in resultMassive) {
            
            for (let y in resultMassive[j].teamMassive) {
                if (resultMassive[j].teamMassive[y].name == playersIn[i].name) {
                    playerIn = true;
                    break loop;
                }
            }
            
            
        }
        if (!playerIn) {
            playersOff = true;
            console.log(playersIn[i].name)
            
        }
    }
    if(playersOff) {
        return true;
    }
}

function numberOfPlayers () {
    let howManyPlayers = 0;
    for(let i=0; i<document.querySelectorAll('.playerDiv').length; i++) {
        if (document.querySelectorAll('.playerDiv')[i].querySelector('input').checked == true) {
            howManyPlayers++;
            
        }
        
    }
    document.getElementById('playersToday').innerHTML = '(' + howManyPlayers + ' игроков' + ')';
}

showPlayers ();

