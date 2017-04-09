var memory;
var speedMemory;
var time;

memory = 0;
time = 1;
speedMemory = 0.1;

var incrementMemory = function(){
    memory += speedMemory;
}



var incrementSpeed = function () {
    speedMemory *= 1.2;
};



