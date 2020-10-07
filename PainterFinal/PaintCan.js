"use strict";

function PaintCan(positionOffset, targetColor) {
    ThreeColorGameObject.call(this, sprites.can_red, sprites.can_green, sprites.can_blue,sprites.bomb);
   
	this.positionOffset = positionOffset;
    this.targetColor = targetColor;
    this.reset();
}

PaintCan.prototype = Object.create(ThreeColorGameObject.prototype);

PaintCan.prototype.reset = function () {
    this.moveToTop();
    this.minVelocity=30;
};

PaintCan.prototype.moveToTop = function () {
    this.position = new Vector2(800, this.positionOffset);
    this.velocity = Vector2.zero;
};
var xpos=0;
var ypos=0;
PaintCan.prototype.update = function (delta) {
    ThreeColorGameObject.prototype.update.call(this, delta);

    if (this.velocity.x === 0 && Math.random() < 0.01) {
        this.velocity = this.calculateRandomVelocity();
        this.color = this.calculateRandomColor();
    }

    // calculate the distance between this can and the ball
    var ball_center = Game.gameWorld.ball.center;
    var ball_position = Game.gameWorld.ball.position;
    var distance = ball_position.add(ball_center).subtractFrom(this.position).subtractFrom(this.center);

    if (Math.abs(distance.x) < this.center.x && Math.abs(distance.y) < this.center.y) {
		xpos=this.position.x;
		ypos=this.position.y;
        Game.gameWorld.ball.reset();
		this.moveToTop();
		if (this.color === Color.red || this.color === Color.blue)
			Game.gameWorld.score+=10;
		else{
			
			Game.gameWorld.lives-=1;
			
		}
		sounds.collect_points.play();
    }

    if (this.position.x<-220) {
            //Game.gameWorld.lives -= 1;
			if (this.color === Color.red || this.color === Color.blue)
			Game.gameWorld.lives-=1;
        this.moveToTop();
    }
    this.minVelocity +=0.05;
    this.rotation = Math.sin(this.position.x / 50) * 0.05;
};

PaintCan.prototype.calculateRandomVelocity = function () {
	
    return new Vector2(-100-this.minVelocity,0);
};

PaintCan.prototype.calculateRandomColor = function () {
    var randomval = Math.floor(Math.random() * 3);
    if (randomval == 0)
        return Color.red;
    else if (randomval == 1)
        return Color.green;
    else
        return Color.blue;
};