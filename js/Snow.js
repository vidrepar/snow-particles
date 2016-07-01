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
    * we won't call _draw from app.js
    * that's why there's _
    * */
    this._draw();

    createjs.Ticker.addEventListener('tick', this._onAnimation.bind(this));
    /*
    * this._onAnimation.bind(this)
    * here we are passing
    * a reference to a function
    * and not calling it
    * */

};

Snow.prototype._draw = function () {

    /*
    * we add shape in particle
    * particle is just an empty container
    * */

    this.particle = new createjs.Container();

    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill('#000000');
    this.shape.graphics.drawRect(0,0,20,20);
    this.shape.graphics.endFill();

    this.particle.addChild(this.shape);

    this.container.addChild(this.particle);

};

Snow.prototype._onAnimation = function () {

    this.particle.y += 1;

};
