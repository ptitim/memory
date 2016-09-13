var EASY = { nmbCard: 6, frtColor: "blue" };
var NORMAL = { nmbCard: 10, frtColor: "orange" };
var HARD = { nmbCard: 14, frtColor: "red" };
var HARDER = { nmbCard: 20, frtColor: "black" };
var party;
var Card = (function () {
    function Card(id, value, color, htmlele) {
        this.id = id;
        this.value = value;
        this.color = color;
        this.htmlele = htmlele;
        this.id = id;
        this.value = value || false;
        this.color = color;
        this.htmlele = htmlele;
    }
    return Card;
}());
var Game = (function () {
    function Game(difficulty) {
        this.difficulty = difficulty;
        var plateau = document.getElementsByClassName('plateau')[0];
        this.difficulty = difficulty;
        this.numberOfCard = difficulty.nmbCard;
        this.listOfCard = [];
        var tabColor = [];
        tabColor = generateColor(this.numberOfCard);
        for (var i = 0; i < this.numberOfCard; i++) {
            var index = rand(tabColor.length); //index of card color
            var color = tabColor[index]; //save if the card color
            tabColor.splice(index, 1); //delete of the used color
            var temp = new Card(i, false, color, createCard(difficulty.frtColor, i)); //creation of a card
            this.listOfCard.push(temp); //add the card to the Array
            plateau.appendChild(this.listOfCard[i].htmlele); //adding the card in the html
        }
    }
    return Game;
}());
function generateCard(difficulty) {
    switch (difficulty) {
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
    console.log("party : ", party);
}
function generateColor(numberOfCard) {
    var tab = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    var numberOfColor = numberOfCard / 2;
    var returnTab = [];
    for (var i = 0; i < numberOfColor; i++) {
        console.log(i);
        var str = [];
        str.push('#');
        for (var j = 0; j < 6; j++) {
            str.push(tab[rand(tab.length)]);
        }
        returnTab.push(str.join(''));
        returnTab.push(str.join(''));
    }
    return returnTab;
}
function createCard(color, id) {
    var div = document.createElement('div');
    div.className += "card";
    div.addEventListener("click", play);
    div.style.backgroundColor = color;
    div.id = id.toString();
    return div;
}
function play(event) {
    var element = event.target;
    var id = element.id;
    var objet = party.listOfCard[id];
    element.style.backgroundColor = objet.color;
}
function rand(a) {
    return Math.floor(Math.random() * a);
}
