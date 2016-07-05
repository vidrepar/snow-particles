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
var Snow = function (container, wind) {

    /*
    * container is like a movieclip
    * */
    this.container = container;

    this.wind = wind;

    /*
    * adding depth
    * */
    this.distance = Math.random()+0.3;
    this.randomRotation = Math.random();

    this.microWind = {
        force:Math.random()*0.5
    };

    /*
    * we won't call _draw from app.js
    * that's why there's _
    * */
    this._draw();
    this._randomWind();

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
    this.particleContainer = new createjs.Container();

    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill('#000000');
    this.shape.graphics.drawCircle(0,0,5,20);
    this.shape.graphics.endFill();

    this.particle.regX = 7;
    this.particle.rotation = Math.random()*20;

    this.particle.scaleX = this.particle.scaleY = this.distance+0.3;

    this.particleContainer.addChild(this.particle);

    this.particle.addChild(this.shape);

    this.container.addChild(this.particle);

};

Snow.prototype._randomWind = function () {

    var nWind = Math.random()-0.5;

    TweenLite.to(this.microWind, Math.random()*2+1,
        {
            force:nWind,
            delay:Math.random()+1,
            onComplete:this._randomWind.bind(this)
        });

};

Snow.prototype._positionCheck = function () {

    if(this.particle.y > this.container.canvas.clientHeight+10){

        this._reset();

    }

    if(this.particle.x > this.container.canvas.clientWidth+10){

        this.particle.x = -10;

    }

    if(this.particle.x < -10){

        this.particle.x = this.container.canvas.clientWidth+10;

    }

};

Snow.prototype._reset = function () {

    this.distance = Math.random()+0.3;
    this.particle.y = -50;
    this.particle.scaleX = this.particle.scaleY = this.distance+0.3;

};

Snow.prototype._onAnimation = function () {

    /*
    * gravity
    * */
    this.particle.y += (1+this.distance)-this.wind.force/2;
    this.particle.x += (this.wind.force*10)*this.distance+this.microWind.force;

    this.particle.rotation += this.wind.force*this.randomRotation*20;

    this._positionCheck();

};
