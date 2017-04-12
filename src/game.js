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

var FADE_COLOR = {
    NONE: 0,
    LIGHT: 1,
    DARK: -1,
};

var fading = false;
var fadeColor = FADE_COLOR.NONE;
var fadeTime = 0;

var fadeScreen = function(from, to, time){
    if(fading) return;
    var times = (time / 10);
    var count = 0;
    var inverted = true;
    fading = true;
    fadeColor = to;
    if(to == FADE_COLOR.NONE) fadeColor = from;
    if(from == FADE_COLOR.NONE) inverted = false;
    fadeTime = inverted ? 1 - (count / times) : count / times;

    WIZARD.time.createTimer("fade", 10, function () {
        count++;
        if(count == times){
            fading = false;
        }
        fadeTime = inverted ? 1 - (count / times) : count / times;
    }, times, true);
};



