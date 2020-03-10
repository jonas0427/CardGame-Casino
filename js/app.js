
/************************** CLASSES ***********************/
class Card{
    constructor(value, type,color){
        this.value = value;
        this.type= type;
        this.color = color;
        this.img = ("./image/"+this.value + this.color + this.type + ".PNG")
        // console.log(this.img)
    }
}

class Player{
    constructor(name){
        this.name = name;
        this.cardsPlayer = [];
        this.lotOfcard = [];
        this.score = 0;
        this.turn = false;
    }
}

/*********************** ARRAYS***********************/

 var cards=[],
     arr = ["as",2,3,4,5,6,7,8,9,10,"jota", "reina","rey"],
     arrT = ["heart", "diamond","picas","trebol"],
     arrC=  ["red", "black"],
     shuffledCards =[],
     cardsForTable = [],
     ObjectOfPlayes=[];

/**************** normal global variables **************/
var random ;

/*********************** FUNCTIONS ***********************/ 



function color(cardType){// assignment of color
    if( cardType==="heart" || cardType === "diamond" ) {
        return 0
    }
    return 1
}
    
function shufflingCards(){ // shuffling cards
    
            if (cards.length === 0){ 
                while(true){
                    if (shuffledCards.length === 0) {
                        break;
                    }
                    random = Math.floor(Math.random() * shuffledCards.length)
                    cards.push(shuffledCards[random]);
                    shuffledCards.splice(random ,1)
                    
                }
            }
       
            while(true){
                if (cards.length === 0) {
                    break;
                }
                random = Math.floor(Math.random() * cards.length)
                shuffledCards.push(cards[random]);
                cards.splice(random ,1)
                
            }
            for (let index = 0; index < 4; index++) {
                cardsForTable.push(shuffledCards.pop())
                
            }
            //console.log(shuffledCards)
       
    }
    
function deal(numOfPlayer){  //dealing cards
    for (let ind = 0; ind < numOfPlayer.length; ind++) {
        for (let index = 0; index < 4; index++) {
            numOfPlayer[ind].cardsPlayer.push(shuffledCards.pop())
            
        }
    }
}

function MYcreateAttr1(element,attributes,values){
        // const input =    // Get the first <h1> element in the document
        for (let index = 0; index < attributes.length; index++) {
            var att = document.createAttribute(attributes[index]);       // Create a "class" attribute
            if(values[index] != "")
            {
                att.value = values[index];                           // Set the value of the class attribute

            }
            element.setAttributeNode(att); 
            
        }
       
    return element
}



function MYcreateAttr(element, attributes ){

    
    Object.keys(attributes).forEach(key => {
        element.setAttribute(key, attributes[key]);
    });  
    return element
}
 
function nplayer(numOfP){
    const form = MYcreateAttr(document.createElement("form"),
    { 
      
        id :"divs"
    });
    var table = document.querySelector('.table');
    // var btn = document.getElementById('play');
    table.appendChild(form);
    table = document.getElementById("divs");
    for (let index = 0; index < numOfP; index++) {
        const newElement = MYcreateAttr(document.createElement("input"),
        {
            class:"btn_S",
            name:"playersname",
            value:""

        });
        // console.log(newElement);
        table.insertBefore(newElement, null);
         if (index === (numOfP-1)){
             let btn  = document.createElement("button")
             btn.innerText = "Play"
            table.insertBefore(MYcreateAttr(document.
                createElement("br"),{}),null);
             table.insertBefore(MYcreateAttr1(btn,["class","name","onclick"],
                ["btn_S","Play","goPlay()"]),null);
             
         }
         
        
    }
    
}

function deploy(playerObject,element){ // deploy card to the players and the table
    let playerCards;
    
    if (playerObject instanceof Player){ 
        playerCards = playerObject.cardsPlayer;
        var namep = playerObject.name;
        //console.log(obp.name)
    }else{
        playerCards = playerObject
    }
    
    //console.log(playerCards);
    //console.log(playerObject);
    
    //console.log(ob)
    var table = document.querySelector('.table');
    var div ;
    var e = document.getElementById('pla');
    // console.log(e)
    if (e != null){
        e.remove()
    }
    if (element === "player1") {
         
         div =  MYcreateAttr( document.createElement("div"),
         {
            class:"table",id:"pla"
         });
         table.appendChild(div);
         h2 =  MYcreateAttr(document.createElement("h2"),
         {
            class:"playerText"
        });
         //h1 = document.createElement('h1');
         h2.innerText = playerObject.name
         div.appendChild(h2)
         table = document.getElementById('player1');   
        
    }else{
        div  = MYcreateAttr(document.createElement("div"),
        {
            class:'container',id:'container1'
        });
        h2 =  MYcreateAttr(document.createElement("h2"),
        {
            class:"playerText"
        });

        h2.innerText ="Table";
      
        table.appendChild(h2);
        table.appendChild(div);
    }
    //console.log(div) 
    
    for (let index = 0; index < playerCards.length; index++) {
        
        // console.log(ob[index].cardsPlayer[index].img)
        // const div1 = MYcreateAttr(document.createElement("button"), ["class","id","onclick","type",'value'], ["card", "card", "clickOnCard(event)", "button", playerCards[index]]);
        const div1 = MYcreateAttr(document.createElement("button"), {
            class:'card',
            id: 'card',
            onclick: 'clickOnCard(event)',
            type: 'button',
            value: JSON.stringify(playerCards[index])

        });
        div.appendChild(div1);
        const img = MYcreateAttr(document.createElement("img"),
        {
            src:playerCards[index].img,
            alt:"card",
            class:"img"

        });
        div1.appendChild(img);
    }
   
}
function Display(){
    // deploy(ObjectOfPlayes)
    for (let index = 0; index < ObjectOfPlayes.length; index++) {
        if (ObjectOfPlayes[index].turn=== false) {
            ObjectOfPlayes[index].turn= true;
            deploy(ObjectOfPlayes[index],"player1");
            break
        }else{
            if (index === (ObjectOfPlayes.length-1)){
                for (let index = 0; index < ObjectOfPlayes.length; index++){
                    ObjectOfPlayes[index].turn = false;
                }
                Display();
                break
            }
        }
        
    }
}
function clickOnCard(e){
    console.log(JSON.parse(e.toElement.parentElement.value))
    leaveCard(JSON.parse(e.toElement.parentElement.value))
     // menu of options for play
     var table = document.querySelector('.table');
     var leave =  MYcreateAttr(document.createElement('button'),
     {
         class:'btn_S',
         id:'leaveBtn',
         onclick:leaveCard(ObjectOfPlayes)
     });
     var combine =  MYcreateAttr(document.createElement('button'),
     {
         class:'btn_S',
         id:'combineBtn'
     });
     var take =  MYcreateAttr(document.createElement('button'),
     {
         class:'btn_S',
         id:'leaveBtn'
     });
     
     leave.innerText = "Leave"
     combine.innerText = "Combine" // buttons option menu
     take.innerText = "Take"
   
     divOptions = MYcreateAttr(document.createElement("div"),
     {
         class:"playOptions",
         id:"playOptions",

     }); // for play Options
     divOptions.appendChild(leave);
     divOptions.appendChild(combine);
     divOptions.appendChild(take);
     table.appendChild(divOptions);
}
   
        


function leaveCard(playersObject){ // for leave cards on the table
   // console.log(playersObject)
    cardButton = document.querySelectorAll('.card')
  //  console.log(cardButton.length);
    
    for (var i=0; i < cardButton.length; i++){
        console.log(cardButton[i])    
    }
    
    
}

function goPlay(){ 
    
             const namePlayers = document.getElementsByName("playersname");
            //  console.log(namePlayers);
            for (let index = 0; index < namePlayers.length; index++) {
                ObjectOfPlayes.push(new Player(namePlayers[index].value));
            }
            document.getElementById('divs').remove()
            shufflingCards();
            deal(ObjectOfPlayes);

            
            
           
           
           
            deploy(cardsForTable,"container");
            Display();
            // console.log(ObjectOfPlayes);
            
    
}

/********************* main *************************/ 
// creating cards
for (let ind = 0; ind < arr.length; ind++) {
    for (let index = 0; index < arrT.length; index++) {
         cards.push(new  Card(arr[ind],arrT[index],arrC[color(arrT[index])]))
        
    }
}



// get the number of Player
let numOfP=0;
document.getElementById("player")
    .addEventListener('submit', function(e){
        numOfP = (parseInt(document.getElementById("numOfP").value));
     
        if (numOfP > 1 && numOfP < 5) {
            document.getElementById("player").remove();
            nplayer(numOfP);

            //  console.log(document.querySelectorAll("input"))
        }
        
      
        e.preventDefault();
    })






