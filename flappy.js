// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;
var label_score;
var player;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("pikachu1","assets/pika_start1.png");
    game.load.image("pikachu2","assets/pika_happy.png");

    game.load.audio("sound1", "assets/pikachu.wav");
    game.load.audio("sound2", "assets/pika_cry.wav");
    game.load.audio("sound3", "assets/pika_depre.wav");
    game.load.audio("sound4", "assets/pika.wav");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.stage.setBackgroundColor ("#006600");game.add.text(280, 160, "Pikachu!",
        {font: "40px Wingdings", fill: "#FF00FF"});
    player = game.add.sprite(350, 150, "pikachu1");
    label_score = game.add.text(20, 20, score.toString());

    game.input.onDown.add(clickHandler);

    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);
    game.input
        .keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);
    game.input
        .keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);
    game.input
        .keyboard.addKey(Phaser.Keyboard.UP)
        .onDown.add(moveUp);
    game.input
        .keyboard.addKey(Phaser.Keyboard.DOWN)
        .onDown.add(moveDown);
}

function changeScore (){
    score = score + 1;
    label_score.setText(score.toString());
    if(score > 4) {
        player.loadTexture("pikachu2");
    }
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    
}

function clickHandler (event) {
    //alert(event.button);
    game.add.sprite(event.x, event.y, "superman");
}

function spaceHandler (event) {
    changeScore();
}
function moveLeft (){
    player.x = player.x - 20;
    game.sound.play("sound2");
}
function moveRight (){
    player.x = player.x + 20;
    game.sound.play("sound4");
}
function moveUp () {
    player.y = player.y - 50;
    game.sound.play("sound1");
}
function moveDown () {
    player.y = player.y + 50;
    game.sound.play("sound3");
}