var entityChris = function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16, 16);
    var targetX = params.x;
    var targetY = params.y;

    this.render = function(wiz){
        wiz.drawAnimation("player", "player_idle_down", this.body.x, this.body.y);
    };

    this.update = function(wiz){
        if(pressed){
           targetX = WIZARD.input.x / wiz.scale + WIZARD.camera.x;
           targetY = WIZARD.input.y / wiz.scale + WIZARD.camera.y;
        }
        this.body.x = WIZARD.math.lerp(this.body.x, targetX, 0.01);
        this.body.y = WIZARD.math.lerp(this.body.y, targetY, 0.01);

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
              incrementSpeed();
          }
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
                WIZARD.scene.setCurrent(this.scene, 0, this);
            }
        }
    };
};