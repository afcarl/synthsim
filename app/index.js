
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var synth, world, food, mod;

var collected = 0;
var collectedText = "";

var cursors;

function preload() {
  game.load.spritesheet('bullet', 'assets/bullet.png', 39, 39);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  world = game.add.group();
  world.enableBody = true;

  synth = game.add.sprite(0, 0, 'bullet');
  game.physics.arcade.enable(synth);
  synth.body.bounce.y = 0.2;
  synth.body.gravity.y = 0;
  synth.body.collideWorldBounds = true;

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
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  game.physics.arcade.collide(synth, world);
  game.physics.arcade.overlap(synth, food, function(synth, food) {
    food.kill();
    collected++;
    collectedText.text = 'Collected: ' + collected;
  }, null, this);


  var closestPellet = getNearestPellet();
  if (closestPellet) {
    game.physics.arcade.moveToObject(synth, closestPellet, 50);
  }
  else {
    synth.body.velocity.x = 0;
    synth.body.velocity.y = 0;
  }

  if (cursors.left.isDown)
  {
      synth.body.velocity.x = -150;
  }
  else if (cursors.right.isDown)
  {
      synth.body.velocity.x = 150;
  }

  if (cursors.up.isDown)
  {
      synth.body.velocity.y = -150;
  }
  else if (cursors.down.isDown)
  {
      synth.body.velocity.y = 150;
  }
}

function getNearestPellet() {
  var pellet, distance = Number.MAX_VALUE;
  food.forEach(function(newPellet) {
    var newDistance = game.physics.arcade.distanceBetween(synth, newPellet);
    if (newDistance < distance) {
      distance = newDistance;
      pellete = newPellet;
    }
  }, this, true);
  return pellete;
}
