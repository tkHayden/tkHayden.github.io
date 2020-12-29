
let userScore = 0;
let computerScore = 0;
let round = 1;
let firstTime = false;
document.getElementById('userScore').innerHTML = userScore;
document.getElementById('compScore').innerHTML = computerScore;
let choice = ['Rock', 'Paper', 'Scissor'];

//box-shadow style for hovering over rock/paper/scissor choices
const images = document.querySelectorAll('img');
images.forEach((image) => {
    image.addEventListener('mouseover', () => {
        image.style.boxShadow = "5px 5px 5px 5px gray"
    });
    image.addEventListener('mouseout', () => {
        image.style.boxShadow = "0px 0px 0px 0px";
    });
});

//click event for rock/paper/scissor
const userImages = document.querySelectorAll('.userPick');
userImages.forEach((userImage) => {
    userImage.addEventListener('click', function (e) {
        getUser(e.target.id);
    });
});

//new game button
const button = document.querySelector('button');
button.addEventListener('click',newGame);

//gets the users choice from their click and starts the round
function getUser(id) {
    clearHighlights();
    document.getElementById(id).classList.add('clicked');
    playRound(id);

}

// clear css style on old rock,paper,scissor that was clicked
function clearHighlights() {
    images.forEach((image) => {
        if (image.classList.contains('clicked')){
            image.classList.remove('clicked');
        }
    })
}

// randomly generate the computers choice
function computerPlay() {
    let num = Math.floor((Math.random() * 3));
    console.log(choice[num]);
    let id = "comp" + choice[num];
    console.log(id);
    document.getElementById(id).classList.add('clicked');   //highlight computers choice on page
    return choice[num];
}

// creates div that will display the result after each round
function createDisplay() {
    const content = document.querySelector('body');
    const newDiv = document.createElement('div');
    content.appendChild(newDiv);
    newDiv.classList.add('display');
}

// updates the div that displays the results after each round
function changeDisplay(message, result) {
    let newDiv = document.querySelector('.display');
    
    newDiv.innerHTML = message;
    if (result == 1) {
        newDiv.setAttribute('id', 'winner');
        newDiv.classList.add('result')

    }
    if (result == 0) {
        newDiv.setAttribute('id', 'draw');
        newDiv.classList.add('result')
    }
    if (result == -1) {
        newDiv.setAttribute('id', 'loser');
        newDiv.classList.add('result')
    }
}

//updates the score on the web page
function scoreUpdater(id, score) {
    document.getElementById(id).innerHTML = score
}

// Function for handling the web page display when the game has finished
function gameFinish(user, computer) {

    // hides the divs that are used for playing rock paper scissors/ displaying each rounds results
    let contents = document.getElementById('container').children;
    document.querySelector(".display").style.display = 'none';
    for (i = 0; i < 2; i++) {
        contents[i].style.display = 'none';
    }

    // displays div that will contain results of game
    document.getElementById("gameOver").style.display = "inline";
    if (user > computer) {
        document.getElementById('gameResult').innerHTML = "Congtats! You have beat the Computer by a score of " + user + " to " + computer;
    } else if (computer > user ){
        document.getElementById('gameResult').innerHTML = "Sorry! You have lost to the Computer by a score of " + user + " to " + computer;
    }
    else{
        document.getElementById('gameResult').innerHTML = "You and the computer tied with a score of " + user + " to " + computer;
    }
    

}

// Resets the web page display to how it was when the user first loads the page
function newGame(){
    let contents = document.getElementById('container').children;
    
    //displays the divs that were hidden in gameFinish()
    for (i = 0; i < 2; i++) {
        contents[i].style.display = 'flex';
    }
    document.getElementById("gameOver").style.display = "none";     //hides the div that shows final results of game
    round =1;
    userScore = computerScore = 0;
    scoreUpdater('userScore',userScore);
    scoreUpdater("compScore",computerScore);
    clearHighlights();
}

// The logic behind the rock paper scissor game for each round
function playRound(user,) {
    if (firstTime == false) {       // if user has just entered the page, create the div that displays the results each round
        createDisplay();
        firstTime = true;
    }

    // Checks to make sure the div with results will display when a new game has been start by the user
    if(round == 1){
        document.querySelector(".display").style.display = 'flex';
    }

    //game has ended. Display results
    if (round == 7) {
        gameFinish(userScore, computerScore);
    }
    let computer = computerPlay();
    let result = "You picked an invalid choice";
    if (user.localeCompare(choice[0]) == 0) {        // user chose rock

        if (user.localeCompare(computer) == 0) {
            result = "Its a draw! You both chose " + user + ".";
            changeDisplay(result, 0);
        }
        if (computer.localeCompare(choice[1]) == 0) {
            console.log(computer);
            result = "You lost! " + computer + " beats " + user + ".";
            scoreUpdater("compScore", ++computerScore);
            changeDisplay(result, -1);
        }
        if (computer.localeCompare(choice[2]) == 0) {
            result = "You won! " + user + " beats " + computer + ".";
            scoreUpdater("userScore", ++userScore);
            changeDisplay(result, 1);

        }
    }
    if (user.localeCompare(choice[1]) == 0) {        // user chose paper
        if (user.localeCompare(computer) == 0) {
            result = "Its a draw! You both chose " + user + ".";
            changeDisplay(result, 0);
        }
        if (computer.localeCompare(choice[2]) == 0) {
            result = "You lost! " + computer + " beats " + user + ".";
            scoreUpdater("compScore", ++computerScore);
            changeDisplay(result, -1);
        }
        if (computer.localeCompare(choice[0]) == 0) {
            result = "You won! " + user + " beats " + computer + ".";
            changeDisplay(result, 1);
            scoreUpdater("userScore", ++userScore);
        }
    }
    if (user.localeCompare(choice[2]) == 0) {        // user chose scissors
        if (user.localeCompare(computer) == 0) {
            result = "Its a draw! You both chose " + user + ".";
            changeDisplay(result, 0);
        }
        if (computer.localeCompare(choice[0]) == 0) {
            result = "You lost! " + computer + " beats " + user + ".";
            scoreUpdater("compScore", ++computerScore);
            changeDisplay(result, -1);
        }
        if (computer.localeCompare(choice[1]) == 0) {
            result = "You won! " + user + " beats " + computer + ".";
            scoreUpdater("userScore", ++userScore);
            changeDisplay(result, 1);
        }
    }
    round++;
}



