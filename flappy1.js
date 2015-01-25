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
var pipes;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("pikachu1","assets/pika_start2.png");
    game.load.image("pikachu2","assets/pika_happy.png");
    game.load.image("pipe1","assets/pipe_mint.png");
    game.load.image("pika_over", "assets/pika_over.jpg");
    game.load.image("background", "assets/background.jpg");

    game.load.audio("sound1", "assets/pikachu.wav");
    game.load.audio("sound2", "assets/pika_cry.wav");
    game.load.audio("sound3", "assets/pika_depre.wav");
    game.load.audio("sound4", "assets/pika.wav");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, "background");
    game.add.text(50, 15, "Pikachu!",
        {font: "30px Comic Sans MS", fill: "#FFFF66"});
    player = game.add.sprite(350, 150, "pikachu1");
    game.physics.arcade.enable(player);
    player.body.velocity.y = -250;
    player.body.gravity.y= 200;
    player.body.collideWorldBounds = true;

    pipe_interval = 2.75;
    game.time.events
        .loop(pipe_interval * Phaser.Timer.SECOND,
        generate_pipe);



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

    pipes = game.add.group();

}

function add_pipe_block(x, y) {
    var pipe = pipes.create(x, y, "pipe1");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -100;
}

function generate_pipe (){
    var gapStart = game.rnd.integerInRange(0, 5);

    for (var count = 0; count <= 7; count++) {
       if(count != gapStart && count != gapStart + 1 && count != gapStart + 2) {
            add_pipe_block(800, count * 50);
        }
    }
    changeScore();

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
    game.physics.arcade.overlap(player, pipes, game_over);

}

function game_over(){
    game.sound.play("sound2");
    game.add.sprite(0, 0, "pika_over");
    game.add.text(200, 100, "Game over :(", {
        font: "50px Comic Sans MS", fill: "#FF0000"});
    //sleep(5);

    game.time.events.add(2* Phaser.Timer.SECOND, resetGame);

}
function resetGame()
{
    location.reload();


}

function clickHandler (event) {
    //alert(event.button);
    game.add.sprite(event.x, event.y, "superman");
}

function spaceHandler (event) {
    player.loadTexture("pikachu2");
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
    player.body.velocity.y = -150;
    game.sound.play("sound1");


}
function moveDown () {
    player.y = player.y + 50;
    game.sound.play("sound3");
}