var sceneTitle = {
    entities: [],
    tiles: [],
    creditsX: null,
    strings: [strings.getString("title"), strings.getString("start"), strings.getString("credits")],
    onEnter: function(wiz){
        this.creditsX = wiz.width;
        fadeScreen(FADE_COLOR.DARK, FADE_COLOR.NONE, 600);
    },
    update: function(wiz){
        this.creditsX -= 0.2;
        var len = "Credits: David Llanos, Martin Perez, Sara Pascual".length * 8;
        if(this.creditsX < -len) this.creditsX = wiz.width;
        if(pressed) {
            fadeScreen(FADE_COLOR.NONE, FADE_COLOR.DARK, 600);
            WIZARD.scene.setCurrent(progress.scene || "house", 1000, wiz);
        }

    },
    render: function(wiz){
        var x = wiz.width / 2;
        var y = wiz.height / 2;

        wiz.drawText(this.strings[0], x - (this.strings[0].length * 8) / 2, y - 16, "font");
        wiz.drawText(this.strings[1], x - (12 * 8) / 2 + 4, y + 8, "font");
        wiz.drawText(this.strings[2], this.creditsX, wiz.height - 8, "font");
    },
    onExit: function(wiz){
    }
};

var sceneHouse = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
        progress.scene = WIZARD.scene.current.name;
        fadeScreen(FADE_COLOR.DARK, FADE_COLOR.NONE, 600);
        easystar.setGrid(this.collisions);
        console.log(this.name);
    },
    update: function(wiz){
        WIZARD.scene.updateEntities(this, wiz);
    },
    render: function(wiz){
        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
        wiz.drawText("Mem:" + Math.floor(memory) + "%", WIZARD.camera.x, WIZARD.camera.y, "font");
    },
    onExit: function(wiz){
    }
};

var sceneTown = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
        fadeScreen(FADE_COLOR.DARK, FADE_COLOR.NONE, 600);
        easystar.setGrid(this.collisions);
        progress.scene = WIZARD.scene.current.name;
    },
    update: function(wiz){
        WIZARD.scene.updateEntities(this, wiz);
    },
    render: function(wiz){
        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
        wiz.drawText("Mem:" + Math.floor(memory) + "%", WIZARD.camera.x, WIZARD.camera.y, "font");
    },
    onExit: function(wiz){
    }
};

var sceneRoadLake = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
        fadeScreen(FADE_COLOR.DARK, FADE_COLOR.NONE, 600);
        easystar.setGrid(this.collisions);
        progress.scene = WIZARD.scene.current.name;
        console.log(this.name);
    },
    update: function(wiz){
        WIZARD.scene.updateEntities(this, wiz);
    },
    render: function(wiz){
        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
        wiz.drawText("Mem:" + Math.floor(memory) + "%", WIZARD.camera.x, WIZARD.camera.y, "font");
    },
    onExit: function(wiz){
    }
};

var sceneInstitute = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
        fadeScreen(FADE_COLOR.DARK, FADE_COLOR.NONE, 600);
        easystar.setGrid(this.collisions);
        progress.scene = WIZARD.scene.current.name;
        console.log(this.name);
    },
    update: function(wiz){
        WIZARD.scene.updateEntities(this, wiz);
    },
    render: function(wiz){
        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
        wiz.drawText("Mem:" + Math.floor(memory) + "%", WIZARD.camera.x, WIZARD.camera.y, "font");
    },
    onExit: function(wiz){
    }
};

var sceneRoadIns = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
        fadeScreen(FADE_COLOR.DARK, FADE_COLOR.NONE, 600);
        easystar.setGrid(this.collisions);
        progress.scene = WIZARD.scene.current.name;
        console.log(this.name);
    },
    update: function(wiz){
        WIZARD.scene.updateEntities(this, wiz);
    },
    render: function(wiz){
        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
        wiz.drawText("Mem:" + Math.floor(memory) + "%", WIZARD.camera.x, WIZARD.camera.y, "font");
    },
    onExit: function(wiz){
    }
};

var sceneForest = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
        fadeScreen(FADE_COLOR.DARK, FADE_COLOR.NONE, 600);
        easystar.setGrid(this.collisions);
        progress.scene = WIZARD.scene.current.name;
        console.log(this.name);
    },
    update: function(wiz){
        WIZARD.scene.updateEntities(this, wiz);
    },
    render: function(wiz){
        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
        wiz.drawText("Mem:" + Math.floor(memory) + "%", WIZARD.camera.x, WIZARD.camera.y, "font");
    },
    onExit: function(wiz){
    }
};

var sceneLake = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
        fadeScreen(FADE_COLOR.DARK, FADE_COLOR.NONE, 600);
        easystar.setGrid(this.collisions);
        progress.scene = WIZARD.scene.current.name;
        console.log(this.name);
    },
    update: function(wiz){
        WIZARD.scene.updateEntities(this, wiz);
    },
    render: function(wiz){
        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
        wiz.drawText("Mem:" + Math.floor(memory) + "%", WIZARD.camera.x, WIZARD.camera.y, "font");
    },
    onExit: function(wiz){
    }
};

var scenePuzzle2 = {
    pieces: null,
    scene: null,
    exit: false,
    onEnter: function(wiz, params){
        fadeScreen(FADE_COLOR.DARK, FADE_COLOR.NONE, 600);
        this.scene = params.lastScene;
        var x = 48;
        var y = 24;
        this.exit = false;
        this.pieces = this.createPieces(x, y);
        WIZARD.camera.setPosition(0,0);
    },
    update: function(wiz){
        if(pressed && !this.isCompleted()){
            for(var i = 0; i < this.pieces.length; i++) {
                var piece = this.pieces[i];
                if (WIZARD.physics.intersects(bodyMouse, piece.body)){
                    piece.angle += 90;
                    piece.angle %= 360;
                }
            }
        }

        if(this.isCompleted() && !this.exit){
            this.exit = true;
            WIZARD.scene.setCurrent(this.scene, 2000);
        }
    },
    render: function(wiz){
        wiz.drawText("Puzzle 2", 0, 0, "font");
        for(var i = 0; i < this.pieces.length; i++){
            var piece = this.pieces[i];
            wiz.drawImageRot("puzzle2", piece.body.x, piece.body.y, piece.angle, 0.5, 0.5, piece.xx, piece.yy, false);
        }

        if(this.isCompleted()){
            wiz.drawText("Completed!", 0, 8, "font");
        }
    },
    onExit: function(wiz){
        fadeScreen(FADE_COLOR.NONE, FADE_COLOR.DARK, 600);
    },

    isCompleted: function(){
        return (this.pieces[0].angle + this.pieces[1].angle + this.pieces[2].angle + this.pieces[3].angle) == 0;
    },

    createPieces: function(x, y){
        var pieces = [];
        for(var i = 0; i < 2; i++){
            for(var j = 0; j < 2; j++){
                pieces.push({
                    body: WIZARD.physics.createAABB(x + i * 32, y + j * 32, 32, 32),
                    angle: 90 * WIZARD.math.randomInt(0, 4),
                    xx: i,
                    yy: j
                });
            }
        }
        return pieces;
    },

};