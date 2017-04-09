var entityChris = function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16, 16);
    var targetX = params.x;
    var targetY = params.y;

    this.render = function(wiz){
        wiz.drawSprite("tiles", this.body.x, this.body.y,0,1);
    };

    this.update = function(wiz, pressed){
        if(pressed){
           targetX = WIZARD.input.x / wiz.scale;
           targetY = WIZARD.input.y / wiz.scale;
        }
        this.body.x = WIZARD.math.lerp(this.body.x, targetX, 0.01);
        this.body.y = WIZARD.math.lerp(this.body.y, targetY, 0.01);
    };
};

var entityObject =  function(params){
    this.body=WIZARD.physics.createAABB(params.x, params.y, 16,16);
    var body2=WIZARD.physics.createAABB(WIZARD.input.x, WIZARD.input.y, 5,5);

    var estado = false;

    this.render = function(wiz){
        if(estado){
            wiz.drawSprite("tiles", this.body.x, this.body.y,1,0);
        }else{
            wiz.drawSprite("tiles", this.body.x, this.body.y,0,0);
        }
    };

    this.update = function(wiz, pressed){
        if(pressed){
          body2.x = WIZARD.input.x / wiz.scale;
          body2.y = WIZARD.input.y / wiz.scale;
          console.log(body2);

          if (WIZARD.physics.intersects(this.body,body2)){
              estado = !estado;
              console.log("HOLA");
          }
      }

    };
};