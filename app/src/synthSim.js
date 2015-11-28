
import Synth from './synth';

var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var synth = new Synth(game);
var world = {
  walls: null,
  food: null
};

var collected = 0;
var collectedText = "";

function preload() {
  this.game.load.spritesheet('bullet', 'assets/bullet.png', 39, 39);
  synth.preload();
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  world.walls = game.add.group();
  world.walls.enableBody = true;
  for (var i = 0; i < 10; i++) {
    var wall = world.walls.create(
      Math.random() * GAME_WIDTH,
      Math.random() * GAME_HEIGHT, 'bullet');
    wall.frame = 2;
    wall.body.immovable = true;
  }

  world.food = game.add.group();
  world.food.enableBody = true;
  for (var i = 0; i < 100; i++) {
    var pellet = world.food.create(
      Math.random() * GAME_WIDTH,
      Math.random() * GAME_HEIGHT, 'bullet');
    pellet.frame = 1;
  }

  synth.create();

  collectedText = game.add.text(16, 16, 'Collected: 0', { fontSize: '32px', fill: '#fff' });
}

function update() {
  game.physics.arcade.collide(synth.sprite, world.walls);
  game.physics.arcade.overlap(synth.sprite, world.food, function(synthSprite, foodPellet) {
    foodPellet.kill();
    collected++;
    collectedText.text = 'Collected: ' + collected;
  }, null, this);

  synth.update(world);
}

export default game;
