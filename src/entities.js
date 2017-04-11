var entityChris = function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16, 16);
    this.targetX = params.x;
    this.targetY = params.y;
    var walking = "player_idle_down";

    this.render = function(wiz){
        wiz.drawAnimation("player", walking, this.body.x, this.body.y);
    };

    this.update = function(wiz){
        if(pressed){
            var tileX = Math.floor((WIZARD.input.x / wiz.scale + WIZARD.camera.x) / 16);
            var tileY = Math.floor((WIZARD.input.y / wiz.scale + WIZARD.camera.y) / 16);

            if( tileX >= WIZARD.scene.current.collisions[0].length ||
                tileY >= WIZARD.scene.current.collisions.length ||
                tileX < 0 ||
                tileY < 0) return;

            var x = Math.floor(this.body.x / 16);
            var y = Math.floor(this.body.y / 16);
            var p = this;

            easystar.findPath(x, y, tileX, tileY, function(path){
                    if (path === null) {
                        console.log("Path was not found.");
                    } else {
                        var count = 0;
                        WIZARD.time.createTimer("easystar_" + p.id, 150, function(){
                            p.targetX = path[count].x * 16;
                            p.targetY = path[count].y * 16;
                            count++;
                        }, path.length, true);
                    }
            });

            easystar.calculate();

           if(this.body.x > this.targetX){ // Camino a la izquierda
               walking = "player_walk_left";
           }else{ // Camino a la derecha
               walking = "player_walk_right";
           }
        }

        if( Math.abs(this.targetX - this.body.x) < 1) { //Si llego a mi destino.
            walking = "player_idle_down";
        }
        
        this.body.x = WIZARD.math.lerp(this.body.x, this.targetX, 0.01);
        this.body.y = WIZARD.math.lerp(this.body.y, this.targetY, 0.01);

        WIZARD.camera.setPosition(this.body.x - wiz.width / 2,this.body.y - wiz.height / 2);
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
            overIcon = 1; //Icono Mano
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
                WIZARD.scene.current.entities.splice(index,1);
                WIZARD.scene.setCurrent(this.scene, 0, this);
                WIZARD.scene.current.entities.push(player);
                player.body.x = player.targetX = this.sceneX * 16;
                player.body.y = player.targetY = this.sceneY * 16;
            }
        }

        if (WIZARD.physics.intersects(this.body,bodyMouse)){
            overIcon = 2; //Icono Puerta
        }
    };
};