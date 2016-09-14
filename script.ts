const EASY: any = {   nmbCard: 6,  frtColor: "blue",  dif: "easy"}
const NORMAL: any = { nmbCard: 10, frtColor: "orange",dif: "normal"};
const HARD: any = {   nmbCard: 14, frtColor: "red",   dif: "hard"};
const HARDER: any = { nmbCard: 20, frtColor: "black", dif:"harder"};
var party: any;
var cardPlayed:Array<Card> = [];
var test:any;

const tabMotif:Array<string> = ["data/1.png",
                                "data/2.png",
                                "data/3.png",
                                "data/4.png",
                                "data/5.png",
                                "data/6.png",
                                "data/7.png",
                                "data/8.png",
                                "data/9.png",
                                "data/10.png"]
const TIMEOFCLICK: number = 4000;//temps pour retourner la deuximee carte

class Card{
    constructor(public id: number, public value: boolean, public color: string, public htmlele: HTMLElement){
      this.id = id;
      this.value = value || false;
      this.color = color;
      this.htmlele = htmlele;
    }
}

class Game{
    frontColor: string;
    numberOfCard: number;
    listOfCard: Array<Card>;
    constructor(public difficulty: any){
        var plateau:any = document.getElementsByClassName('plateau')[0];
        this.difficulty = difficulty;
        this.numberOfCard = difficulty.nmbCard;
        this.listOfCard = [];
        var tabColor:Array<string> = [];
        tabColor = generateColor(this.numberOfCard);

        for(var i = 0; i < this.numberOfCard; i++){
          var index = rand(tabColor.length); //index of card color
          var color = tabColor[index]; //save if the card color
          tabColor.splice(index,1);//delete of the used color

          var temp = new Card(i, false, color, createCard(difficulty.frtColor,color , i , difficulty.dif));//creation of a card
          this.listOfCard.push(temp);//add the card to the Array
          plateau.appendChild(this.listOfCard[i].htmlele);//adding the card in the html
        }
    }
}


function generateGame(difficulty: Object){
      switch(difficulty){
        case EASY:
          party = new Game(EASY);
          break;
        case NORMAL:
          party = new Game(NORMAL);
          break;
        case HARD:
          party = new Game(HARD);
          break;
        case HARDER:
          party = new Game(HARDER);
          break;
        default:
          console.log("Error, incorrect input of difficulty (function generateCard)");
          break;
      }
      var choix:any = document.getElementsByClassName('choixdif')[0];
      choix.style.display = 'none';
      console.log("party : ",party);
}

function generateColor(numberOfCard: number){
  // var tab = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
  // var numberOfColor = numberOfCard/2;
  // var returnTab:Array<string> = [];
  //
  // for(var i = 0 ; i < numberOfColor; i++){
  //     var str:Array<any> = [];
  //     str.push('#');
  //     for(var j = 0; j < 6; j++){
  //         str.push(tab[rand(tab.length)]);
  //     }
  //     returnTab.push(str.join(''));
  //     returnTab.push(str.join(''));
  // }
// bonjouit
  // test generation avec image
  var returnTab:Array<string> = [];
  for(var i = 0; i < numberOfCard/2; i++){
      var tmp = tabMotif[rand(tabMotif.length)];
      returnTab.push(tmp);
      returnTab.push(tmp);
  }
  return returnTab;
}

function createCard(color:string, image: string,id:number, dif:string){
    var div = document.createElement('div');
    var img = document.createElement('img');
    img.src = image;
    img.style.opacity = "0";
    if(dif == EASY.dif || dif == NORMAL.dif){
      div.className += "easyCard";
    }else{
      div.className += "hardCard";
    }
    div.appendChild(img);
    div.addEventListener("click", play);
    div.style.backgroundColor = color;
    div.id = id.toString();
    return div;
  }

function play(event:any){
  if(cardPlayed.length < 2){ //2 cards played max
      var element = event.target;
      var imgEle = element.childNodes[0];
      console.log(imgEle);
      var id = element.id;
      var objet = party.listOfCard[id];

      objet.value = true;
      objet.htmlele.removeEventListener("click", play);
      cardPlayed.push(objet);
      imgEle.style.opacity = "1";
      // element.style.backgroundColor = objet.color;

      if(cardPlayed.length == 1)
        test =  setTimeout(timeout , TIMEOFCLICK);
  }
  if(cardPlayed.length == 2){
      verifCard();
      return ;
  }
  return console.log("erreur play cardPLay.length offerflow");
}

function timeout(){
    for(var i = 0; i < cardPlayed.length; i++){
        cardPlayed[i].htmlele.addEventListener("click", play);
        cardPlayed[i].value = false;

        var tmp = cardPlayed
        setTimeout(function(){
                    for(var i = 0 ; i < tmp.length; i++){
                        var test:any = tmp[i].htmlele.childNodes[0];
                        test.style.opacity = "0";
                        // tmp[i].htmlele.style.backgroundColor = party.difficulty.frtColor;//retournement de la carte
                    }
                  }, 500);
    }
    cardPlayed = [];
}

function verifCard(){
  console.log("verification en cours");
  if(cardPlayed[0].color === cardPlayed[1].color){
    clearTimeout(test);
    cardPlayed = [];
  }else{
    clearTimeout(test);
    timeout();
  }
}


//usefull function
function rand(a:number){
    return Math.floor(Math.random()*a);
}
