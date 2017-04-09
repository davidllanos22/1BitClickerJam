var entityChris = function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16, 16);
    var targetX = params.x;
    var targetY = params.y;

    this.render = function(wiz){
        wiz.drawSprite("tiles", this.body.x, this.body.y,0,1);
        wiz.drawAABB(this.body, "#d3d3d3");
    };

    this.update = function(wiz){
        if(WIZARD.input.mouseJustPressed(0)){
            targetX = WIZARD.input.x / wiz.scale;
            targetY = WIZARD.input.y / wiz.scale;
        }
        this.body.x = WIZARD.math.lerp(this.body.x, targetX, 0.01);
        this.body.y = WIZARD.math.lerp(this.body.y, targetY, 0.01);
    };
};

