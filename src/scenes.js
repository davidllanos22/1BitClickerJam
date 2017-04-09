var sceneHouse = {
    entities: [],
    tiles: [],
    onEnter: function(wiz){

    },
    update: function(wiz){
        WIZARD.scene.updateEntities(this, wiz);
    },
    render: function(wiz){
        wiz.clear("#cc4400");
        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
    },
    onExit: function(wiz){
    }
};