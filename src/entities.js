var entityChris = function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16, 16);
    this.targetX = params.x;
    this.targetY = params.y;
    var walking = 0;

    this.render = function(wiz){
        if(walking==0){
            wiz.drawAnimation("player", "player_idle_down", this.body.x, this.body.y);
        }else if(walking==1){
            wiz.drawAnimation("player","player_walk_left", this.body.x, this.body.y);
        }else if(walking==2){
            wiz.drawAnimation("player","player_walk_right", this.body.x, this.body.y);

        }
    };

    this.update = function(wiz){
        if(pressed){
           this.targetX = WIZARD.input.x / wiz.scale + WIZARD.camera.x;
            this.targetY = WIZARD.input.y / wiz.scale + WIZARD.camera.y;

           if(this.body.x > this.targetX){ // Camino a la izquierda
               walking = 1;
           }else{ // Camino a la derecha
               walking = 2;
           }
        }

        if(walking==2 && this.targetX - this.body.x < 1) { //Si llego a mi destino hacia la derecha
            walking = 0;
        }else if(walking==1 && this.targetX - this.body.x > -1){ //Si llego a mi destino hacia la izquierda
            walking = 0;
        }
        this.body.x = WIZARD.math.lerp(this.body.x, this.targetX, 0.01);
        this.body.y = WIZARD.math.lerp(this.body.y, this.targetY, 0.01);

        WIZARD.camera.setPosition( this.body.x - wiz.width / 2,this.body.y - wiz.height / 2);
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
              overObject = false;
              incrementSpeed();
          }
      }
        if (WIZARD.physics.intersects(this.body,bodyMouse)){
            overObject = true;
        }else{
            //overObject = false;
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
    };
};