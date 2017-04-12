var entityChris = function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16, 16);
    var animation = "player_idle_down";

    var currentTileX = Math.floor(this.body.x / 16);
    var currentTileY = Math.floor(this.body.y / 16);
    var targetTileX = currentTileX;
    var targetTileY = currentTileY;
    this.nextTileX = currentTileX;
    this.nextTileY = currentTileY;

    this.render = function(wiz){
        wiz.drawAnimation("player", animation, this.body.x, this.body.y);
    };

    this.update = function(wiz){
        currentTileX = Math.floor((this.body.x + 0.5) / 16);
        currentTileY = Math.floor((this.body.y + 0.5) / 16);

        if(pressed){
            targetTileX = Math.floor((WIZARD.input.x / wiz.scale + WIZARD.camera.x) / 16);
            targetTileY = Math.floor((WIZARD.input.y / wiz.scale + WIZARD.camera.y) / 16);

            if( targetTileX >= WIZARD.scene.current.collisions[0].length ||
                targetTileY >= WIZARD.scene.current.collisions.length ||
                targetTileX < 0 ||
                targetTileY < 0) return;

            var p = this;

            cancelPath();
            try {
                easystarPath = easystar.findPath(currentTileX, currentTileY, targetTileX, targetTileY, function (path) {
                    if (path === null) {
                        //console.log("Path was not found.");
                    } else {
                        var count = 0;
                        p.nextTileX = path[count].x;
                        p.nextTileY = path[count].y;
                        count++;
                        WIZARD.time.createTimer("easystar_" + p.id, 200, function () {
                            if (path[count] == null || easystarPath == null) return;

                            p.nextTileX = path[count].x;
                            p.nextTileY = path[count].y;

                            count++;
                        }, path.length-1, true);
                    }
                });
            }catch(e){
                console.log(e);
            }

            easystar.calculate();
        }


        if(this.nextTileX < currentTileX && this.nextTileY == currentTileY){ // Camino a la izquierda
            animation = "player_walk_left";
        }else if(this.nextTileX > currentTileX && this.nextTileY == currentTileY){ // Camino a la derecha
            animation = "player_walk_right";
        }else if(this.nextTileY > currentTileY && this.nextTileX == currentTileX){ // Camino abajo
            animation = "player_walk_down";
        }else if(this.nextTileY < currentTileY && this.nextTileX == currentTileX){ // Camino arriba
            animation = "player_walk_up";
        }else if(targetTileX == currentTileX && targetTileY == currentTileY){ // Reset
            animation = "player_idle_down";
        }

        this.body.x = WIZARD.math.lerp(this.body.x, this.nextTileX * 16, 0.04);
        this.body.y = WIZARD.math.lerp(this.body.y, this.nextTileY * 16, 0.04);

        WIZARD.camera.setPosition(this.body.x - wiz.width / 2, this.body.y - wiz.height / 2);
    };
};

var entityObject =  function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16,16);

    var estado = false;

    this.render = function(wiz){
        if(estado){
            wiz.drawSprite("tiles", this.body.x, this.body.y,1,0);
        }else{
            wiz.drawSprite("tiles", this.body.x, this.body.y,1,1);
        }

    };

    this.update = function(wiz){
        if(pressed){
            if (WIZARD.physics.intersects(this.body,bodyMouse)){
                estado = !estado;
                incrementSpeed();
            }
        }
        if (WIZARD.physics.intersects(this.body,bodyMouse)){
            overIcon = ICON.HAND;
        }
    };
};

var entityObjectObservable =  function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16,16);
    this.render = function(wiz){
        wiz.drawSprite("tiles", this.body.x, this.body.y,3,1);
    };

    this.update = function(wiz){
        if(pressed){
            if(idEntityText == this.id){
                showText=false;
                scrollingText.reset();
            }
            if (WIZARD.physics.intersects(this.body,bodyMouse)){
                showTextEntity(this.id, "Un libro que habla!");
            }
        }
        if (WIZARD.physics.intersects(this.body,bodyMouse)){
            overIcon = ICON.INSPECT;
        }
    };
};

var entityNpc =  function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16,16);

    this.render = function(wiz){
        wiz.drawSprite("npc", this.body.x, this.body.y,0,0);
    };

    this.update = function(wiz){
        if(pressed){
            if(idEntityText == this.id){
                showText=false;
                scrollingText.reset();
            }
            if (WIZARD.physics.intersects(this.body,bodyMouse)){
                showTextEntity(this.id, "Hola, moriras.");
            }
        }
        if (WIZARD.physics.intersects(this.body,bodyMouse)){
            overIcon = ICON.TALK;
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

var entityPortal = function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16,16);
    this.scene = params.scene;
    this.sceneX  = params.sceneX;
    this.sceneY = params.sceneY;
    this.xx = params.xx;
    this.yy = params.yy;

    this.render = function(wiz){
        wiz.drawSprite("tiles", this.body.x, this.body.y, this.xx, this.yy);
    };

    this.update = function(wiz){

        if(pressed) {
            if (WIZARD.physics.intersects(this.body, bodyMouse)) {
                var index = WIZARD.scene.current.entities.indexOf(player);
                cancelPath();
                WIZARD.scene.current.entities.splice(index,1);
                WIZARD.scene.setCurrent(this.scene, 0, this);
                WIZARD.scene.current.entities.push(player);
                player.nextTileX = this.sceneX;
                player.nextTileY = this.sceneY;
                player.body.x = this.sceneX * 16;
                player.body.y = this.sceneY * 16;
            }
        }

        if (WIZARD.physics.intersects(this.body,bodyMouse)){
            overIcon = ICON.DOOR;
        }
    };
};

var showTextEntity = function(id, string){
    if(showText){
        return;
    }
    idEntityText = id;
    indexText++;
    textToShow[indexText] = string;
    showText=true;

};