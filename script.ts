const EASY: any = {   numberOfCard: 6,  frtColor: "url('1.png')",timer: 20,   dif:"easy"  };
const NORMAL: any = { numberOfCard: 10, frtColor: "url('7.png')",timer: 25,   dif:"normal"};
const HARD: any = {   numberOfCard: 14, frtColor: "url('9.png')",timer: 30,   dif:"hard"  };
const HARDER: any = { numberOfCard: 20, frtColor: "url('8.png')",timer: 30,   dif:"harder" };
const IDTIMER: string = "timer";

var party: any;
var cardPlayed:Array<Card> = [];
var clicktimeOut:any;
var time:number;
var timer:any;
var htmlTimer: HTMLElement;
var button:HTMLElement;
var firstPlay:boolean = true;

var tabMotif:Array<string> = ["data/1.png",
                              "data/2.png",
                              "data/3.png",
                              "data/4.png",
                              "data/5.png",
                              "data/6.png",
                              "data/7.png",
                              "data/8.png",
                              "data/9.png",
                              "data/10.png",
                              "data/11.png",
                              "data/12.png",
                              "data/13.png",
                              "data/14.png",
                              "data/15.png",
                              "data/16.png",
                              "data/17.png",
                              "data/18.png",
                              ];
const TIMEOFCLICK: number = 4000;//temps pour retourner la deuximee carte

class Card{
    constructor(public id: number, public value: boolean, public color: string, public htmlele: HTMLElement, public image:any){
      this.id = id;
      this.value = value || false;
      this.color = color;
      this.htmlele = htmlele;
      this.image = image;
    }
}

class Game{
    backColor: string;
    numberOfCard: number;
    listOfCard: Array<Card>;

    constructor(public difficulty: any){
      var plateau: any = document.createElement('div');
      plateau.className = "plateau";
      var body:HTMLElement = document.getElementsByTagName('body')[0];
      button = buttonMenu();
      body.appendChild(button);
      body.appendChild(plateau);

      this.difficulty = difficulty;
      this.numberOfCard = difficulty.numberOfCard;
      this.listOfCard = [];
      var tabColor: Array<any> = [];
      htmlTimer = createhtmlTimer();
      tabColor = generateTabColor(this.numberOfCard);

      plateau.appendChild(htmlTimer);
      for(var i  =0 ; i < this.numberOfCard; i++){
        var indexColor = rand(tabColor.length);

        var color = tabColor[indexColor].color;
        var sourceImage = tabColor[indexColor].img;
        tabColor.splice(indexColor,1);

        var htmlCard = createHTMLCard(difficulty, color, sourceImage, i);
        var temp = new Card(i, false, color, htmlCard.div, htmlCard.img);
        this.listOfCard.push(temp);
        plateau.appendChild(temp.htmlele);
      }
    }
}

function startGame(difficulty: any){
    party = new Game(difficulty);
    var choix:any = document.getElementsByClassName('choixdif')[0];
    choix.style.display = 'none';

    time = difficulty.timer;

    htmlTimer.innerText = time.toString();

    return party;
}

function createHTMLCard(dif: any, backColor: string, srcImages: string, id: number){
  var div = document.createElement('div');
  var img = document.createElement('img');
  div.className += "card";
  if(dif.numberOfCard > 10){
      div.className += " hardCard";
      img.className += "hardCard";
  }else{
      div.className += " easyCard";
      img.className += "easyCard";
  }
  div.addEventListener("click", play);
  // div.style.backgroundColor = dif.frtColor;
  div.id = id.toString();

  if(dif == EASY){
      div.style.backgroundImage = dif.frtColor;
  }else if(dif == NORMAL){
      div.style.backgroundImage = dif.frtColor;
  }else if(dif == HARD){
      div.style.backgroundImage = dif.frtColor;
  }else if(dif == HARDER){
      div.style.backgroundImage = dif.frtColor;
  }

  img.src = srcImages;
  img.style.opacity = "0";
  div.appendChild(img);

  return {div: div,img: img};
}

function generateTabColor(numberOfCard: number){
  var tab = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
  var numberOfColor = numberOfCard/2;
  var returnTab:Array<any> = [];
  var tabImgtemp:Array<string> = [];
  tabImgtemp = tabMotif;

  console.log(tabImgtemp);
  for(var i = 0 ; i < numberOfColor; i++){
      var str:Array<any> = [];
      str.push('#');
      for(var j = 0; j < 6; j++){
          str.push(tab[rand(tab.length)]);
      }
      var temp = str.join('');
      var index = rand(tabImgtemp.length);
      var imageRandom = tabImgtemp[index];
      tabImgtemp.splice(index,1);

      returnTab.push({color: temp, img: imageRandom});
      returnTab.push({color: temp, img: imageRandom});

  }
  return returnTab;
}

function createhtmlTimer(){
    var div = document.createElement('div');
    div.id = IDTIMER;
    return div;
}

function buttonMenu(){
  var input = document.createElement('input');
  input.value = "Menu";
  input.addEventListener("click", reset);
  input.id = "buttonMenu";
  return input;
}

function play(event:any){
    if(firstPlay){
      firstPlay = false;
      timer = setInterval(countdown, 1000);
    }
    event.preventDefault();
    if(cardPlayed.length < 2){
        var element = event.target;
        var id = element.id;
        var card = party.listOfCard[id];

        card.value = true;
        card.htmlele.removeEventListener("click",play);
        cardPlayed.push(card);
        setTimeout(function(){
          card.htmlele.style.background = "none";
          card.image.style.opacity = "1";
          card.htmlele.style.backgroundColor = card.color;
        }, 150);
        card.htmlele.style.transform = "rotate3d(0,0,0,0deg)";
        if(cardPlayed.length == 1){
            clicktimeOut = setTimeout(timeout, TIMEOFCLICK);
        }
    }
    if(cardPlayed.length == 2){
        verifCard();
        return ;
    }
    return "erreur cardPlayed overflow";
}

function timeout(){
    for(var i = 0; i < cardPlayed.length; i++){
        cardPlayed[i].htmlele.addEventListener("click",play);
        cardPlayed[i].value = false;

        var temp = cardPlayed;
        setTimeout(function(){
            for(var i = 0 ; i < temp.length; i++){
              temp[i].htmlele.style.backgroundImage = party.difficulty.frtColor;
              temp[i].image.style.opacity = "0";
              temp[i].htmlele.style.transform = "rotate3d(0,180,0,180deg)";

            }
        }, 500);
    }
    cardPlayed = [];
}

function verifCard(){
    if(cardPlayed[0].color == cardPlayed[1].color){
        clearTimeout(clicktimeOut);
    }else{
      clearTimeout(clicktimeOut);
      timeout();
    }
    cardPlayed = [];
    verifParty();
}

function verifParty(){//verify the state of party, reset if all cards are played or time is over
    var tab:Array<Card> = party.listOfCard;
    var compteur:number = 0;
    for(var i = 0; i < tab.length; i++){
      if(tab[i].value){
        compteur++;
      }
    }
    if(compteur == tab.length || time == 0){
        window.clearInterval(timer);
        setTimeout(reset,1200);
    }
}

function reset(){
    var plateau = party.listOfCard[0].htmlele.parentElement;
    var body = plateau.parentElement;
    body.removeChild(plateau);
    body.removeChild(button);
    window.clearInterval(timer);
    firstPlay = true;

    // TODO: ajoutez ecarn de fin 

    setTimeout(function(){
      var choix:any = document.getElementsByClassName('choixdif')[0];
      choix.style.display = 'flex';
    }, 2000);
    party = null;
    cardPlayed = [];
    tabMotif = ["data/1.png",
                "data/2.png",
                "data/3.png",
                "data/4.png",
                "data/5.png",
                "data/6.png",
                "data/7.png",
                "data/8.png",
                "data/9.png",
                "data/10.png",
                "data/11.png",
                "data/12.png",
                "data/13.png",
                "data/14.png",
                "data/15.png",
                "data/16.png",
                "data/17.png",
                "data/18.png",
              ];
}

function countdown(){
    time--;
    htmlTimer.innerText = time.toString();
    verifParty();
}

function endingParty(){



}

function rand(a:number){
    return Math.floor(Math.random()*a);
}
