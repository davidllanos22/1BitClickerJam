var sceneHouse = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
        easystar.setGrid(this.collisions);
        for(var i = 0; i < this.collisions.length; i++){
            console.log(i + "__" + this.collisions[i].toString());
        }


    },
    update: function(wiz){

        WIZARD.scene.updateEntities(this, wiz);
    },
    render: function(wiz){

        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
    },
    onExit: function(wiz){
    }
};

var sceneTown = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
        easystar.setGrid(this.collisions);
        console.log(this.name);
    },
    update: function(wiz){
        WIZARD.scene.updateEntities(this, wiz);
    },
    render: function(wiz){
        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
    },
    onExit: function(wiz){
    }
};

var sceneRoadLake = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
        easystar.setGrid(this.collisions);
        console.log(this.name);
    },
    update: function(wiz){
        WIZARD.scene.updateEntities(this, wiz);
    },
    render: function(wiz){
        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
    },
    onExit: function(wiz){
    }
};

var sceneInstitute = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
        easystar.setGrid(this.collisions);
        console.log(this.name);
    },
    update: function(wiz){
        WIZARD.scene.updateEntities(this, wiz);
    },
    render: function(wiz){
        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
    },
    onExit: function(wiz){
    }
};

var sceneRoadIns = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
        easystar.setGrid(this.collisions);
        console.log(this.name);
    },
    update: function(wiz){
        WIZARD.scene.updateEntities(this, wiz);
    },
    render: function(wiz){
        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
    },
    onExit: function(wiz){
    }
};

var sceneForest = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
        easystar.setGrid(this.collisions);
        console.log(this.name);
    },
    update: function(wiz){
        WIZARD.scene.updateEntities(this, wiz);
    },
    render: function(wiz){
        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
    },
    onExit: function(wiz){
    }
};

var sceneLake = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
        easystar.setGrid(this.collisions);
        console.log(this.name);
    },
    update: function(wiz){
        WIZARD.scene.updateEntities(this, wiz);
    },
    render: function(wiz){
        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
    },
    onExit: function(wiz){
    }
};


