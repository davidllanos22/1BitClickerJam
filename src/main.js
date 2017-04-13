var vs =    `
attribute vec2 a_position;
uniform sampler2D u_image;
varying vec2 f_texcoord;
//varying vec4 v_color;
 
void main(void){
  vec2 zeroToOne = a_position;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace * vec2(1, -1), 0.0, 1.0);
  f_texcoord = (clipSpace + 1.0) / 2.0;
}
`;

var fs2 = `
precision mediump float;

#define CRT_CURVE_AMNTx 0.2
#define CRT_CURVE_AMNTy 0.2
#define CRT_CASE_BORDR 0.8
#define SCAN_LINE_MULT 400.0

//varying vec4 v_color;
varying vec2 f_texcoord;

uniform sampler2D u_image;
uniform sampler2D u_texture;
uniform float u_time;
uniform vec4 u_swapColorLight;
uniform vec4 u_swapColorDark;

uniform float u_fadeDirection;
uniform float u_fadeAmount;


float random(in vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123) + 0.3;
}

void main() {
    vec2 tc = vec2(f_texcoord.x, f_texcoord.y);
    
    // Edge displacement
    
    float dx = abs(0.5 - tc.x);
    float dy = abs(0.5 - tc.y);

    dx *= dx;
    dy *= dy;

    tc.x -= 0.5;
    tc.x *= 1.0 + (dy * CRT_CURVE_AMNTx);
    tc.x += 0.5;

    tc.y -= 0.5;
    tc.y *= 1.0 + (dx * CRT_CURVE_AMNTy);
    tc.y += 0.5;
    
    // Cutoff
    if(tc.y > 1.0 || tc.x < 0.0 || tc.x > 1.0 || tc.y < 0.0)
       discard;
    
    // Get texel
    vec4 color = texture2D(u_texture, vec2(tc.x, tc.y));
    
    
    //Replace colors
    if(color.r < 1.0){
        color = u_swapColorLight;
    }else{
        color = u_swapColorDark;
    }
    
    if(u_fadeDirection > 0.0){ // Fade to Light
        color = mix(color, u_swapColorDark, u_fadeAmount);
    }else if(u_fadeDirection < 0.0){ // Fade to Dark
        color = mix(color, u_swapColorLight, u_fadeAmount); 
    }
    
    // Add scanlines
    vec4 cta = color;
    cta.rgb += cos((tc.y - u_time) * SCAN_LINE_MULT) * 0.25;

    // Generate noise
        
    float r = random(tc * u_time);
    vec4 noise = vec4(vec3(r) * 2.0,1.0);
    

    gl_FragColor = (cta * color * noise) ;
}
`;


var time = 1;

var rA = 0;
var gA = 0;
var bA = 0;
var rB = 1;
var gB = 1;
var bB = 1;

var generateColors = function(){
    //Color A:{r: 0.2921388904396145, g: 0.38771675703581976, b: 0.7190860643404482}
    //Color B:{r: 0.528005024206649, g: 0.9435701220295565, b: 0.18140640640489059}
    rA = WIZARD.math.randomBetween(0,1);
    gA = WIZARD.math.randomBetween(0,1);
    bA = WIZARD.math.randomBetween(0,1);
    rB = WIZARD.math.randomBetween(0,1);
    gB = WIZARD.math.randomBetween(0,1);
    bB = WIZARD.math.randomBetween(0,1);

    console.log("Color A:{r: " + rA + ", g: " + gA + ", b: "+ bA +"}");
    console.log("Color B:{r: " + rB + ", g: " + gB + ", b: "+ bB +"}");
};

var player;
var pressed;
var overIcon;

var idEntityText;

var overEntity = false;
var interacting = false;

var easystar = new EasyStar.js();
var easystarPath;
easystar.setAcceptableTiles([0]);
//easystar.enableDiagonals();
//easystar.enableCornerCutting();
easystar.setIterationsPerCalculation(100);

var bodyMouse = WIZARD.physics.createAABB(WIZARD.input.x, WIZARD.input.y, 1,1);

wizard({
    width: 160,
    height: 112,
    scale: 4,
    fillScreen:true,
    pixelArt: true,
    create: function(){
        WIZARD.paths.setImagesPath("./assets/img/");
        WIZARD.paths.setDataPath("./assets/data/");
        WIZARD.paths.setSoundsPath("./assets/sound/");

        this.loadImages("bg.png", "font.png", "tiles.png", "npc.png" ,"player.png", "mouse.png");

        WIZARD.spritesheet.create("player", 16, 16);

        WIZARD.animation.createFrameAnimation("player_idle_down", [[0,0],[1,0], [2,0]], 200);
        WIZARD.animation.createFrameAnimation("player_walk_right", [[0,1], [1,1],[0,1],[2,1]], 200);
        WIZARD.animation.createFrameAnimation("player_walk_left", [[0,2], [1,2],[0,2],[2,2]], 200);
        WIZARD.animation.createFrameAnimation("player_walk_down", [[0,3], [1,3],[0,3],[2,3]], 200);
        WIZARD.animation.createFrameAnimation("player_walk_up", [[0,4], [1,4],[0,4],[2,4]], 200);

        WIZARD.spritesheet.create("font", 8, 8);
        WIZARD.spritesheet.create("player", 16, 16);
        WIZARD.spritesheet.create("tiles", 16, 16);
        WIZARD.spritesheet.create("npc", 16, 16);
        WIZARD.spritesheet.create("mouse", 16, 16);
        WIZARD.shader.create("shader", vs, fs2);
        WIZARD.shader.setCurrent("shader");

        WIZARD.entity.create("player", entityChris);
        WIZARD.entity.create("object", entityObject);
        WIZARD.entity.create("objectObservable", entityObjectObservable);
        WIZARD.entity.create("npc", entityNpc);
        WIZARD.entity.create("portal", entityPortal);
        WIZARD.entity.create("tile", entityTile);

        WIZARD.map.create("town", mapTown);
        WIZARD.map.create("house", mapHouse);
        WIZARD.map.create("road_lake", mapRoadLake);
        WIZARD.map.create("road_ins", mapRoadIns);
        WIZARD.map.create("institute", mapInstitute);
        WIZARD.map.create("lake", mapLake);
        WIZARD.map.create("forest", mapForest);

        WIZARD.scene.create("town", sceneTown);
        WIZARD.scene.create("house", sceneHouse);
        WIZARD.scene.create("road_lake", sceneRoadLake);
        WIZARD.scene.create("road_ins", sceneRoadIns);
        WIZARD.scene.create("institute", sceneInstitute);
        WIZARD.scene.create("lake", sceneLake);
        WIZARD.scene.create("forest", sceneForest);

        WIZARD.map.loadToScene("house", "house", mapLoader);
        WIZARD.map.loadToScene("town", "town", mapLoader);
        WIZARD.map.loadToScene("road_lake", "road_lake", mapLoader);
        WIZARD.map.loadToScene("road_ins", "road_ins", mapLoader);
        WIZARD.map.loadToScene("institute", "institute", mapLoader);
        WIZARD.map.loadToScene("lake", "lake", mapLoader);
        WIZARD.map.loadToScene("forest", "forest", mapLoader);

        WIZARD.scene.setCurrent("house", 0, this);

        WIZARD.time.createTimer("incrementMemory", 1000, incrementMemory,"infinite", false);

    },

    update: function(){
        this.gl.uniform4f(WIZARD.shader.getUniform("shader", "u_swapColorLight"), rA, gA, bA, 1);
        this.gl.uniform4f(WIZARD.shader.getUniform("shader", "u_swapColorDark"), rB, gB, bB, 1);
        this.gl.uniform1f(WIZARD.shader.getUniform("shader", "u_time"), time);
        this.gl.uniform1f(WIZARD.shader.getUniform("shader", "u_fadeDirection"), fadeColor);
        this.gl.uniform1f(WIZARD.shader.getUniform("shader", "u_fadeAmount"), fadeTime);

        time += 0.0001;
        if(time > 2) time = 1;

        bodyMouse.x = WIZARD.input.x / this.scale + WIZARD.camera.x;
        bodyMouse.y =  WIZARD.input.y / this.scale + WIZARD.camera.y;

        pressed = WIZARD.input.mouseJustPressed(0);

        overEntity = overIcon != ICON.DEFAULT;
        overIcon = ICON.DEFAULT;

        WIZARD.scene.current.update(this);

        scrollingText.update();

        if(WIZARD.input.keyJustPressed(WIZARD.keys.ESC)){
            generateColors();
        }
    },
    render: function(){
        this.clear("#000");
        WIZARD.scene.current.render(this);
        this.drawText("Mem:" + Math.floor(memory) + "%", WIZARD.camera.x, WIZARD.camera.y, "font");
        scrollingText.render(this);
        this.drawSprite("mouse", bodyMouse.x, bodyMouse.y, overIcon, 0);
    }
}).play();






