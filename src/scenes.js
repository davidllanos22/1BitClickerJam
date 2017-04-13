var sceneTitle = {
    entities: [],
    tiles: [],
    creditsX: null,
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
            WIZARD.scene.setCurrent("house", 1000, wiz);
        }

    },
    render: function(wiz){
        var x = wiz.width / 2;
        var y = wiz.height / 2;

        var title = "LIMBO";
        var click = " Haz click \npara empezar";
        var credits = "Credits: David Llanos, Martin Perez, Sara Pascual";

        wiz.drawText(title, x - (title.length * 8) / 2, y - 16, "font");
        wiz.drawText(" Haz click \npara empezar", x - (12 * 8) / 2 + 4, y + 8, "font");
        wiz.drawText(credits, this.creditsX, wiz.height - 8, "font");
    },
    onExit: function(wiz){
    }
};

var sceneHouse = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
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

var sceneRoadLake = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
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

var sceneInstitute = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
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

var sceneRoadIns = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
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

var sceneForest = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
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

var sceneLake = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
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


