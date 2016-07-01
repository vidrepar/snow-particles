/*
* prototypes are not attached
* to every instance
* on the other hand
* this.draw is attached to every instance
* */

/**
 * Snow
 * @param container
 * @constructor
 */
var Snow = function (container) {

    /*
    * container is like a movieclip
    * */
    this.container = container;

    /*
    * adding depth
    * */
    this.distance = Math.random()+0.3;

    /*
    * we won't call _draw from app.js
    * that's why there's _
    * */
    this._draw();
    this._startWind();

    createjs.Ticker.addEventListener('tick', this._onAnimation.bind(this));
    /*
    * this._onAnimation.bind(this)
    * here we are passing
    * a reference to a function
    * and not calling it
    * */

};

Snow.prototype._startWind = function () {

    var self = this;

    setInterval(function () {

        var currentX = self.particle.x;
        TweenLite.to(self.particle, 4, { x: currentX+Math.random()*100-50, ease:Sine.easeInOut })

    }, 4000);

};

Snow.prototype._draw = function () {

    /*
    * we add shape in particle
    * particle is just an empty container
    * */

    this.particle = new createjs.Container();

    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill('#000000');
    this.shape.graphics.drawCircle(0,0,5,20);
    this.shape.graphics.endFill();

    this.particle.scaleX = this.particle.scaleY = this.distance+0.3;

    this.particle.addChild(this.shape);

    this.container.addChild(this.particle);

};

Snow.prototype.destroy = function () {

    

};

Snow.prototype.positionCheck = function () {

    if(this.particle.y > this.container.canvas.clientHeight){

        this._reset();

    }

};

Snow.prototype._reset = function () {

    this.distance = Math.random()+0.3;
    this.particle.y = -50;
    this.particle.scaleX = this.particle.scaleY = this.distance+0.3;

};

Snow.prototype._onAnimation = function () {

    this.particle.y += (1+this.distance);

    this.positionCheck();

};
