var memory = 0;
var speedMemory = 0.1;

var incrementMemory = function(){
    memory += speedMemory;
    progress.memory = memory;
};

var saveGame = function(){
    WIZARD.progress.save("limbo", progress);
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
    callback: null,
    update: function(){
        if(this.showing && pressed){
            if(this.showingAllText) {
                if(this.arrayIndex < this.textArray.length - 1){
                    this.arrayIndex++;
                }else{
                    if(this.callback)this.callback();
                    this.callback = null;
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
            instance.textToShow = text.substr(0, instance.count);
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
            wiz.fillRect(WIZARD.camera.x, y, wiz.width, 24, "#000");
            this.show(this.textArray[this.arrayIndex], WIZARD.camera.x, y, wiz);
        }

        if(this.showingAllText){
            var x = WIZARD.camera.x + wiz.width - 8;
            wiz.drawAnimation("font", "dialogue_blink", x, y + 14);
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
    if(navigator.userAgent.indexOf("Firefox") != -1) return;
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

var progress = {
    memory: 25,
    estadoManzana: true,
    scene: "house",
    x: 4,
    y: 8,
};

var strings = {
    getString: function(name){
        var l = WIZARD.utils.getLanguage();
        if(l == "ca" || l == "ca-ca" || l == "es-es" || l == "es") l = "es";
        else l = "en";
        return this[l][name];
    },
    "es":{
        "title" : "LIMBO",
        "start": " Haz click \npara empezar",
        "credits": "Credits: David Llanos, Martin Perez, Sara Pascual",
        "load": "cargar",

        "book": ["¿Un libro que habla?", "¡Deberia dejar de  \ntomar drogas!"],

        "girl": ["He perdido a \nmi perro...", "Me encantaria \nencontrarlo :("],

        "apple": ["Mmmh, ¡una manzana!", "Alguien se ha comido \nya esta manzana."],
    },
    "en":{
        "title" : "LIMBO",
        "start": "  Do click\n for start",
        "credits": "Credits: David Llanos, Martin Perez, Sara Pascual",
        "load": "load game",

        "book": ["A book that speaks?", "I should stop \ntaking drugs!"],

        "girl": ["I miss my dog.", "I wonder where it\nis :("],

        "apple": ["Mmmh, an apple!", "Someone eats \nthis apple."],
    }
};


