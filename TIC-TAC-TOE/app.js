//selectors
const gameGrid = document.querySelector(".game-grid");
const cards= document.querySelectorAll('.card');
const toast = document.querySelector('.toast');
const newGame = document.querySelector('.game-btn');

 document.addEventListener('DOMContentLoaded', reloadGame);
 newGame.addEventListener('click', removeHistory);

 var itemArray;

 //Reloading New game
function reloadGame() {
   
     itemArray = new Array(9).fill('T');
        itemArray.map((item, index) => {
        createCard(item, index);
    });

    function createCard(item, index){

        const ticIcon =document.createElement('li');
        ticIcon.classList.add('ticIcon');
        ticIcon.classList.add(index);
        ticIcon.innerText= item;
        cards[index].appendChild(ticIcon);
        cards[index].addEventListener('click',changeItem);
    
    }
}


//Change item when player clicks
var player = false;
var count=0;
var winner= true;

function changeItem (e) {
    let div = e.target;
    let divChild = div.firstChild;
    let icon = divChild.innerText;
    let index = divChild.classList[1];
    if(icon === "T" && winner){
        count++;
        if(player){
            divChild.innerText = 'O'
            player = false;
            itemArray[index] = 'O';
        } else {
            divChild.innerText = 'X'
            player= true;
            itemArray[index] = 'X';
        }
       
        winMessage(divChild);

    } else if(icon !== "T" && winner){
      toastify('Already filled','toast--alert');
    } else {
        toastify("Game over", 'toast--success');
    }

    if(count===9 && winner){
        toastify('No Winner','toast--alert');
    }
    

}

//Win message if matches the condition

function winMessage(divChild) {
    if(itemArray[0]!=="T" && itemArray[0] === itemArray[1] && itemArray[1] === itemArray[2] ){
        winner= false;
        const win = divChild.innerText;
        // cards.forEach((item) => {
        //     item.firstChild.removeEventListener('click',changeItem);
        // });
        toastify(`${win} is winner`,'toast--success');
        
        
        
    }
    if(itemArray[0]!=="T" && itemArray[0] === itemArray[3] && itemArray[3] === itemArray[6] ){
        winner= false;
        
        toastify(`${divChild.innerText} is winner`,'toast--success');
        
        
    }
    if(itemArray[0]!=="T" && itemArray[0] === itemArray[4] && itemArray[4] === itemArray[8] ){
        winner= false;

        toastify(`${divChild.innerText} is winner`,'toast--success');
        
        
        
    }
    if(itemArray[3]!=="T" && itemArray[3] === itemArray[4] && itemArray[4] === itemArray[5] ){
        winner= false;

        toastify(`${divChild.innerText} is winner`,'toast--success');
        
        
    }
    if(itemArray[6]!=="T" && itemArray[6] === itemArray[7] && itemArray[7] === itemArray[8] ){
        winner= false;

        toastify(`${divChild.innerText} is winner`,'toast--success');
        
        
    }
    if(itemArray[6]!=="T" && itemArray[6] === itemArray[4] && itemArray[4] === itemArray[2] ){
        winner= false;

        toastify(`${divChild.innerText} is winner`,'toast--success');
        
        
    }
    if(itemArray[1]!=="T" && itemArray[1] === itemArray[4] && itemArray[4] === itemArray[7] ){
        winner= false;

        toastify(`${divChild.innerText} is winner`,'toast--success');
        
        
    }
    if(itemArray[2]!=="T" && itemArray[2] === itemArray[5] && itemArray[5] === itemArray[8] ){
        winner= false;

        toastify(`${divChild.innerText} is winner`,'toast--success');
        
        
    }
    
}


//cleaning the history of previous game
function removeHistory(){
     cards.forEach((item) => {
        item.firstChild.remove();
    })
    
    //changing player state to default
    player = false;
    count=0;
    winner= true;

    //reload game
    reloadGame();
};

function toastify(message, state){
    toast.textContent=message;
    toast.classList.add('toast--visible');
    toast.classList.add(state);
    setTimeout(() => {
        toast.classList.remove('toast--visible');
    }, 1500);

}


console.log(cards[0]);