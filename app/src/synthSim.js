
import Synth from './synth';

var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var synth = new Synth(game);
var world, food, mod;

var collected = 0;
var collectedText = "";

function preload() {
  this.game.load.spritesheet('bullet', 'assets/bullet.png', 39, 39);
  synth.preload();
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  world = game.add.group();
  world.enableBody = true;

  synth.create();

  food = game.add.group();
  food.enableBody = true;
  for (var i = 0; i < 100; i++) {
    var pellet = food.create(
      Math.random() * GAME_WIDTH,
      Math.random() * GAME_HEIGHT, 'bullet');
    pellet.frame = 1;
  }

  mod = world.create(100, 0, 'bullet');
  mod.frame = 2;
  mod.body.immovable = true;

  collectedText = game.add.text(16, 16, 'Collected: 0', { fontSize: '32px', fill: '#fff' });
}

function update() {
  game.physics.arcade.collide(synth.sprite, world);
  game.physics.arcade.overlap(synth.sprite, food, function(synthSprite, food) {
    food.kill();
    collected++;
    collectedText.text = 'Collected: ' + collected;
  }, null, this);

  synth.update(food);
}

export default game;
