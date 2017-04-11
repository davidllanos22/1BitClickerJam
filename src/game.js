var memory = 0;
var speedMemory = 0.1;

var incrementMemory = function(){
    memory += speedMemory;
};

var incrementSpeed = function () {
    speedMemory *= 1.2;
};


var scrollingText = {
    textToShow: "",
    count: 0,
    show: function(text, x, y, wiz){
        var speed = 50;
        var thiz = this;
        WIZARD.time.createTimer("scrollingText", speed, function(){
            //wiz.playSound("talk");
            thiz.textToShow = text.substr(0, thiz.count );
            thiz.count++;
        }, text.length + 1, false);
        wiz.drawText(thiz.textToShow, x, y, "font");

    },
    reset: function(){
        this.textToShow = "";
        this.count = 0;
        if(WIZARD.timers["scrollingText"] != null) delete WIZARD.timers["scrollingText"];
    }
};



