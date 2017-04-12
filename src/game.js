var memory = 0;
var speedMemory = 0.1;

var incrementMemory = function(){
    memory += speedMemory;
};

var incrementSpeed = function () {
    speedMemory *= 1.2;
};

var ICON = {
    DEFAULT: 0,
    HAND: 1,
    DOOR: 2,
    INSPECT: 3,
    TALK: 4
};


var scrollingText = {
    textToShow: "",
    count: 0,
    show: function(text, x, y, wiz){
        var speed = 50;
        var instance = this;
        WIZARD.time.createTimer("scrollingText", speed, function(){
            //wiz.playSound("talk");
            instance.textToShow = text.substr(0, instance.count );
            instance.count++;
        }, text.length + 1, false);
        wiz.drawText(instance.textToShow, x, y, "font");

    },
    reset: function(){
        this.textToShow = "";
        this.count = 0;
        if(WIZARD.timers["scrollingText"] != null) delete WIZARD.timers["scrollingText"];
    }
};



