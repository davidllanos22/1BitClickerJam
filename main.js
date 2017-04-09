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
uniform vec4 u_swapColorA;
uniform vec4 u_swapColorB;


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
    
    // Replace colors
    if(color.r < 1.0)
        color = u_swapColorA;
    else
        color = u_swapColorB;
    
    // Add scanlines
    vec4 cta = color;
    cta.rgb += cos((tc.y - u_time) * SCAN_LINE_MULT) * 0.25;

    // Generate noise
        
    float r = random(tc * u_time);
    vec4 noise = vec4(vec3(r) * 2.0,1.0);

    gl_FragColor = cta * color * noise;
}
`;

var time = 1;

var rA = WIZARD.math.randomBetween(0,1);
var gA = WIZARD.math.randomBetween(0,1);
var bA = WIZARD.math.randomBetween(0,1);
var rB = WIZARD.math.randomBetween(0,1);
var gB = WIZARD.math.randomBetween(0,1);
var bB = WIZARD.math.randomBetween(0,1);

WIZARD.time.createTimer("swapColor", 1000, function(){
    rA = WIZARD.math.randomBetween(0,1);
    gA = WIZARD.math.randomBetween(0,1);
    bA = WIZARD.math.randomBetween(0,1);
    rB = WIZARD.math.randomBetween(0,1);
    gB = WIZARD.math.randomBetween(0,1);
    bB = WIZARD.math.randomBetween(0,1);
},"infinite", false);

wizard({
    width: 160,
    height: 96,
    scale: 4,
    pixelArt: true,
    create: function(){
        WIZARD.paths.setImagesPath("./");

        this.loadImages("bg.png");
        WIZARD.shader.create("shader", vs, fs2);
        WIZARD.shader.setCurrent("shader");
    },

    update: function(){

        this.gl.uniform1f(WIZARD.shader.getUniform("shader", "u_time"), time);
        this.gl.uniform4f(WIZARD.shader.getUniform("shader", "u_swapColorA"), rA,gA,bA, 1);
        this.gl.uniform4f(WIZARD.shader.getUniform("shader", "u_swapColorB"), rB,gB,bB, 1);
        time += 0.0001;
        if(time > 2) time = 1;
    },
    render: function(){
        this.clear("#686868");
        var w = WIZARD.images["bg"].width;
        var h = WIZARD.images["bg"].height;
        this.drawImage("bg",this.width/2 - w / 2,this.height/2 - h / 2);
    }
}).play();
