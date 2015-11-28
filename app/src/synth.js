

function getNearestPellet(game, foodGroup, synthSprite) {
  var pellet = null;
  var distance = Number.MAX_VALUE;
  foodGroup.forEach((newPellet) => {
    var newDistance = game.physics.arcade.distanceBetween(synthSprite, newPellet);
    if (newDistance < distance) {
      distance = newDistance;
      pellet = newPellet;
    }
  }, this, true);
  return pellet;
}

export default class {
  constructor(game) {
    this.game = game;
    this.sprite = null;
    this.cursors = null;
  }
  preload() {
    this.game.load.spritesheet('synth', 'assets/bullet.png', 39, 39);
  }
  create() {
    this.sprite = this.game.add.sprite(0, 0, 'synth');
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.bounce.y = 0.2;
    this.sprite.body.gravity.y = 0;
    this.sprite.body.collideWorldBounds = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();
  }
  update(world) {
    var closestPellet = getNearestPellet(this.game, world.food, this.sprite);
    if (closestPellet) {
      this.game.physics.arcade.moveToObject(this.sprite, closestPellet, 50);
    }
    else {
      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = 0;
    }

    if (this.cursors.left.isDown)
    {
        this.sprite.body.velocity.x = -150;
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.body.velocity.x = 150;
    }

    if (this.cursors.up.isDown)
    {
        this.sprite.body.velocity.y = -150;
    }
    else if (this.cursors.down.isDown)
    {
        this.sprite.body.velocity.y = 150;
    }
  }
};
