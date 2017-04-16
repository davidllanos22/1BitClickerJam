var entityChris = function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16, 16);
    var animation = "player_idle_down";

    this.currentTileX = Math.floor(this.body.x / 16);
    this.currentTileY = Math.floor(this.body.y / 16);
    var targetTileX = this.currentTileX;
    var targetTileY = this.currentTileY;
    this.nextTileX = this.currentTileX;
    this.nextTileY = this.currentTileY;

    this.cancelPath = function(){
        this.nextTileX = this.currentTileX;
        this.nextTileY = this.currentTileY;
        targetTileX = this.currentTileX;
        targetTileY = this.currentTileY;
        easystar.cancelPath(easystarPath);
        easystarPath = null;
        WIZARD.time.removeTimer("easystar");
    };

    this.moveTo = function(tileX, tileY, callback){
        if(interacting) return;
        var p = this;
        progress.x = tileX;
        progress.y = tileY;

        this.cancelPath();
        try {
            console.log("current : " + this.currentTileX + " " + this.currentTileY);
            easystarPath = easystar.findPath(this.currentTileX, this.currentTileY, tileX, tileY, function (path) {
                targetTileX = tileX;
                targetTileY = tileY;
                if (path === null) {
                    console.log("Path was not found. From: " + p.currentTileX + "," + p.currentTileY + " to " + tileX + "," + tileY);
                } else {
                    var count = 0;
                    if(path.length == 0 && callback){
                        // Pequeño delay, para que de tiempo a llegar bien al tile
                        WIZARD.time.createTimer("easystarCallbackDelay", 300, function () {
                            callback();
                        }, 1, true);
                    }
                    if (path[count] == null) return;
                    p.nextTileX = path[count].x;
                    p.nextTileY = path[count].y;
                    count++;
                    WIZARD.time.createTimer("easystar", 200, function () {
                        if (path[count] == null) return;
                        p.nextTileX = path[count].x;
                        p.nextTileY = path[count].y;

                        count++;
                        if(count == path.length && callback) {
                            // Pequeño delay, para que de tiempo a llegar bien al tile
                            WIZARD.time.createTimer("easystarCallbackDelay", 300, function () {
                                callback();
                            }, 1, true);
                        }
                    }, path.length - 1, true);
                }
            });
            easystar.calculate();
        }catch(e){
            console.log(e);
        }

    };

    this.render = function(wiz){
        wiz.drawAnimation("player", animation, Math.floor(this.body.x), Math.floor(this.body.y));
    };

    this.update = function(wiz) {
        playerCount++;
        this.currentTileX = Math.floor((this.body.x + 0.5) / 16);
        this.currentTileY = Math.floor((this.body.y + 0.5) / 16);
        if (pressed && !overEntity && !scrollingText.showing) {
            targetTileX = Math.floor((WIZARD.input.x / wiz.scale + WIZARD.camera.x) / 16);
            targetTileY = Math.floor((WIZARD.input.y / wiz.scale + WIZARD.camera.y) / 16);

            if (targetTileX >= WIZARD.scene.current.collisions[0].length ||
                targetTileY >= WIZARD.scene.current.collisions.length ||
                targetTileX < 0 ||
                targetTileY < 0) return;

            this.moveTo(targetTileX, targetTileY);
        }

        if (this.nextTileX < this.currentTileX && this.nextTileY == this.currentTileY) { // Camino a la izquierda
            animation = "player_walk_left";
        } else if (this.nextTileX > this.currentTileX && this.nextTileY == this.currentTileY) { // Camino a la derecha
            animation = "player_walk_right";
        } else if (this.nextTileY > this.currentTileY && this.nextTileX == this.currentTileX) { // Camino abajo
            animation = "player_walk_down";
        } else if (this.nextTileY < this.currentTileY && this.nextTileX == this.currentTileX) { // Camino arriba
            animation = "player_walk_up";
        } else if (targetTileX == this.currentTileX && targetTileY == this.currentTileY) { // Reset
            animation = "player_idle_down";
        }

        this.body.x = WIZARD.math.lerp(this.body.x, this.nextTileX * 16, 0.04);
        this.body.y = WIZARD.math.lerp(this.body.y, this.nextTileY * 16, 0.04);


        //Cogemos ancho y largo segun el mapa.
        var maxMapX = WIZARD.scene.current.collisions[0].length * 16;
        var maxMapY = WIZARD.scene.current.collisions.length * 16;

        // Control de la Camara
        var camX = this.body.x;
        var camY = this.body.y;
        camX = Math.max(0, Math.min(Math.floor(camX - wiz.width / 2), Math.floor(maxMapX - wiz.width)));
        camY = Math.max(0, Math.min(Math.floor(camY - wiz.height / 2), Math.floor(maxMapY - wiz.height)));
        
        WIZARD.camera.setPosition(camX, camY);


    };
};

var entityObject =  function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16,16);
    this.strings = strings.getString("apple");
    this.xx = params.xx;
    this.yy = params.yy;

    var estado = false;
    var instance = this;

    this.interact = function(){
        if(params.interact) params.interact({scene: WIZARD.scene.current.name});
        else {
            if (progress.estadoManzana) showDialogue([instance.strings[1]]);
            else {
                showDialogue([instance.strings[0]], function(){
                    progress.estadoManzana = !progress.estadoManzana;
                    interacting = false;
                });
            }
        }
    };

    this.render = function(wiz){
        if(progress.estadoManzana){
            wiz.drawSprite("tiles", this.body.x, this.body.y,15,2);
        }else{
            wiz.drawSprite("tiles", this.body.x, this.body.y, this.xx, this.yy);
        }

    };

    this.update = function(wiz){
        if (WIZARD.physics.intersects(this.body, bodyMouse)){
            if(pressed) moveToEntityAndInteract(this);
            overIcon = ICON.HAND;
        }
    };
};

var entityObjectObservable =  function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16,16);
    this.strings = strings.getString("book");

    this.interact = function(){
        showDialogue([this.strings[0], this.strings[1]]);
    };

    this.render = function(wiz){
        wiz.drawSprite("tiles", this.body.x, this.body.y,3,1);
    };

    this.update = function(wiz){
        if (WIZARD.physics.intersects(this.body, bodyMouse)){
            if(pressed) moveToEntityAndInteract(this);
            overIcon = ICON.INSPECT;
        }
    };
};

var entityNpc =  function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16,16);
    this.strings = strings.getString("girl");

    this.interact = function(){

        showDialogue([this.strings[0], this.strings[1]]);
    };

    this.render = function(wiz){
        wiz.drawSprite("npc", this.body.x, this.body.y,0,0);
    };

    this.update = function(wiz){
        if (WIZARD.physics.intersects(this.body, bodyMouse)){
            if(pressed) moveToEntityAndInteract(this);
            overIcon = ICON.TALK;
        }
    };
};

var entityPortal = function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16,16);
    this.scene = params.scene;
    this.sceneX  = params.sceneX;
    this.sceneY = params.sceneY;
    this.xx = params.xx;
    this.yy = params.yy;


    this.interact = function(){
        if(interacting) return;
        interacting = true;
        var index = WIZARD.scene.current.entities.indexOf(player);
        player.cancelPath();
        var instance = this;
        var lastScene = WIZARD.scene.current;
        fadeScreen(FADE_COLOR.NONE, FADE_COLOR.DARK, 600);
        WIZARD.scene.setCurrent(this.scene, 1000, this, function(){
            lastScene.entities.splice(index, 1);
            player.nextTileX = instance.sceneX;
            player.nextTileY = instance.sceneY;
            player.currentTileX = instance.sceneX;
            player.currentTileY = instance.sceneY;
            player.body.x = instance.sceneX * 16;
            player.body.y = instance.sceneY * 16;
            WIZARD.scene.current.entities.push(player);
            interacting = false;
        });

    };

    this.render = function(wiz){
        //wiz.drawSprite("tiles", this.body.x, this.body.y, this.xx, this.yy);
    };

    this.update = function(wiz){
        if (WIZARD.physics.intersects(this.body, bodyMouse)) {
            if(pressed) moveToEntityAndInteract(this);
            overIcon = ICON.DOOR;
        }
    };
};

var entityTile = function(params){
    this.x = params.x;
    this.y = params.y;
    this.xx = params.xx;
    this.yy = params.yy;
    this.render = function(wiz){
        wiz.drawSprite("tiles", this.x, this.y, this.xx, this.yy);
    }
};


var moveToEntityAndInteract = function(entity){
    if(scrollingText.showing) return;
    var x = Math.floor(entity.body.x / 16);
    var y = Math.floor(entity.body.y / 16);
    var tile = getSurroundingFreeTile(x, y);
    player.moveTo(tile.x, tile.y, function(){
        entity.interact();
    });
};

var getSurroundingFreeTile = function(centerX, centerY){
    //TODO: Tener en cuenta la posición del player respecto al tile. Para no hacer que se coloque arriba si viene de abajo, por ejemplo.
    var pX = player.currentTileX;
    var pY = player.currentTileY;

    var tile = {x:centerX, y:centerY};
    //
    // if(pX > centerX){ // Viene de la derecha
    //     if(isFreeTile(centerX + 1, centerY)) tile.x += 1;
    // }else if(pX < centerX){ // Viene de la izquierda
    //     if(isFreeTile(centerX - 1, centerY)) tile.x -= 1;
    // }
    //
    // if(pY > centerY){ // Viene de arriba
    //     if(isFreeTile(centerX, centerY - 1)) tile.y -= 1;
    // }else if(pY < centerY){ // Viene de abajo
    //     if(isFreeTile(centerX, centerY + 1)) tile.y += 1;
    // }

    if(isFreeTile(centerX + 1, centerY)) tile.x += 1;
    else if(isFreeTile(centerX - 1, centerY)) tile.x -= 1;
    else if(isFreeTile(centerX, centerY - 1)) tile.y -= 1;
    else if(isFreeTile(centerX, centerY + 1)) tile.y += 1;

    console.log(tile);

    return tile;
};

var showDialogue = function(strings, callback){
    if(scrollingText.showing) return;

    scrollingText.callback = callback;
    scrollingText.arrayIndex = 0;
    scrollingText.textArray = strings;
    scrollingText.showing = true;
};