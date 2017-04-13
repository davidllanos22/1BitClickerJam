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
    textArray: [""],
    arrayIndex: 0,
    textToShow: "",
    count: 0,
    showingAllText: false,
    fullText: "",
    showing: false,
    blinkTime: 0,
    showBlink: true,
    update: function(){
        this.blinkTime++;
        if(this.blinkTime > 100){
            this.showBlink = !this.showBlink;
            this.blinkTime = 0;
        }
        if(this.showing && pressed){
            if(this.showingAllText) {
                if(this.arrayIndex < this.textArray.length - 1){
                    this.arrayIndex++;
                }else{
                    this.showing = false;
                }
                this.reset();
            }else{
                this.showAllText();
            }
        }
    },
    show: function(text, x, y, wiz){
        this.fullText = text;
        var speed = 50;
        var instance = this;
        WIZARD.time.createTimer("scrollingText", speed, function(){
            if(instance.showingAllText) return;
            //wiz.playSound("talk");
            instance.textToShow = text.substr(0, instance.count );
            instance.count++;
            if(instance.count == text.length + 1){
                instance.showingAllText = true;
            }
        }, text.length + 1, false);
        wiz.drawText(instance.textToShow, x, y, "font");
    },
    reset: function(){
        this.fullText = "";
        this.showingAllText = false;
        this.textToShow = "";
        this.count = 0;
        if(WIZARD.timers["scrollingText"] != null) delete WIZARD.timers["scrollingText"];
    },
    showAllText: function(){
        this.showingAllText = true;
        this.count = this.textToShow.length;
        this.textToShow = this.fullText;
    },
    render: function (wiz) {
        var y =  WIZARD.camera.y + wiz.height - 24;

        if(this.showing){
            wiz.drawAABB({x:0, y:y, w: wiz.width, h: 24}, "#000", true);
            this.show(this.textArray[this.arrayIndex], WIZARD.camera.x, y, wiz);
        }

        if(this.showingAllText && this.showBlink){
            var x = WIZARD.camera.x + wiz.width - 8;
            wiz.drawSprite("font", x, y + 14, 15, 2);
        }
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



