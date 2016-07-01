var app = {

    NUM_PARTICLES:100,

    particleArray:[],
    stage:null,

    init: function () {

        app.setupStage();
        app.setupTicker();
        app.createParticles();

    },
    setupStage: function () {

        var $canvas = $('#snow-canvas');

        app.stage = new createjs.Stage($canvas[0]);
        
    },
    setupTicker:function () {

        /*
        * if this is true
        * the execution will stop
        * */
        if(!app.stage) throw new Error('Stage is not defined');

        /*
         * render function
         * */
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener('tick', app.stage);

    },
    createParticles:function () {

        while(app.NUM_PARTICLES--){

            var snow = new Snow();

            app.particleArray.push(snow);

        }

    }
    
};

app.init();