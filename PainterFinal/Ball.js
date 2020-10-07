"use strict";

function Ball() {
    ThreeColorGameObject.call(this, sprites.ball_red, sprites.ball_green, sprites.ball_blue);
    this.shooting = false;
    this.reset();
}
var xpos=0;
var ypos=0;
Ball.prototype = Object.create(ThreeColorGameObject.prototype);

Ball.prototype.handleInput = function (delta) {
    if ((Mouse.leftPressed) && !(this.shooting)&&(Mouse.position.y<393)) {
		xpos=Mouse.position.x;
		ypos=Mouse.position.y;
        this.shooting = true;
        this.velocity =Mouse.position.subtract(this.position).multiplyWith(1.2);
        sounds.shoot_paint.play();
		
		
    }
};
Ball.prototype.update = function (delta) {
    if (this.shooting) {
	var speed=25;
		var opposite = Math.abs(this.position.y - ypos);
		var adjacent =Math.abs( xpos - this.position.x);
		var x=Math.atan(opposite/adjacent)*180/Math.PI;
		var id = setInterval(1000, 60);
		if(xpos>=364){
		this.position.x+=Math.cos(x*Math.PI/180)*speed;
		this.position.y-=Math.sin(x*Math.PI/180 )*speed;
		}else{
		this.position.x-=Math.cos(x*Math.PI/180)*speed;
		this.position.y-=Math.sin(x*Math.PI/180 )*speed;
		}
		
    }
    if (Game.gameWorld.isOutsideWorld(this.position))
        this.reset();
};

Ball.prototype.reset = function () {
    this.position = new Vector2(350, 550);
    this.shooting = false;
};