/*GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game*/
var scores, roundScore, activePlayer, dice, dice2, gamePlaying, prevDice, prevDice2, maxScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

    if(gamePlaying) {
        //1. Random number
        dice = Math.floor(Math.random()*6)+1;
        dice2 = Math.floor(Math.random()*6)+1;

        //2. Display the result and the image
        document.querySelector('#current-' + activePlayer).textContent = dice + dice2;
        console.log(dice+dice2)
        var diceDOM1 = document.querySelectorAll('.dice')[0];
        var diceDOM2 = document.querySelectorAll('.dice')[1];
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice + '.png';
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        //3. Update the round score if the dice wasnt a 1
        if((prevDice==6 && dice==6) || (prevDice2==6 && dice2==6)){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer] ;
            nextPlayer();
        }
        else if (dice>1 && dice2>1){
            //Add and show score
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;}
        else{
            //Move to the next player
            nextPlayer();}
        
        prevDice = dice;
        prevDice2 = dice2;
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying) {
        //Add current score to total score of active player and display it
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var input = document.getElementById('max-score').value;
        if (input) maxScore = input;
        else maxScore = 100;

        //If the player wins change the layout and style and set gamePlaying to false
        if(scores[activePlayer] >= maxScore){
            hideDices();
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;}
        //if not then move to next player
        else{
            nextPlayer();}    
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    diceDOM1.style.display = 'none';
    diceDOM2.style.display = 'none';
}

function init(){
    scores = [0,0];
    roundScore  = 0;
    activePlayer = 0;
    gamePlaying = true;
    maxScore = 100;
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    hideDices()

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function hideDices() {
    document.querySelectorAll('.dice')[0].style.display = 'none';
    document.querySelectorAll('.dice')[1].style.display = 'none';
}

//INFORMATIONS

document.querySelector('.info').addEventListener('mouseover', function() {
    document.querySelector('.instruction').style.display = 'block';
    document.querySelector('.wrapper').style.display = 'none';
    
        
});
document.querySelector('.back').addEventListener('mouseover', function() {
    document.querySelector('.instruction').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'block';
    
});
