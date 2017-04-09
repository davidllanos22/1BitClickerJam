var sceneHouse = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
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

var sceneTown = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){
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
