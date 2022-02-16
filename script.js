window.addEventListener('resize', resize, false);

var cellSize = 100;
var numHearts = 70;
var sizeRange = 70;
var minSize = 50;
var hearts = [];

var chars = [
  "❤","♡","♥", "❥"
]

function Particle(x, y){
  this.x = x;
  this.y = y;
  this.xSpeed = random()*8 - 4;
  this.ySpeed = random()*8 - 4;
  this.char = chars[floor(random()*chars.length)];
}

Particle.prototype.render = function(){
  this.x += this.xSpeed;
  this.y += this.ySpeed;
  text(this.char, this.x, this.y);
}

function Heart(x, y){
  this.x = x;
  this.y = y;
  this.size = random()*sizeRange + minSize;
  this.hue = (260 + random()*105)%360;
  this.sat = random()*30 + 70;
  this.bal = random()*20 + 80;
  this.speed = this.size/40;
  this.exploding = 1000;
  this.particles = [];
  for (var i = 0; i < 10; i++){
    this.particles.push(new Particle(0, 0));
  }
}

Heart.prototype.render = function(){
  
  if (this.exploding > 100 && dist(this.x, this.y, mouseX, mouseY) < this.size/2){
    this.exploding = 0;
    for (var i = 0; i < this.particles.length; i++){
      var p = this.particles[i];
      p.x = this.x;
      p.y = this.y;
    }
  }
  fill(this.hue, this.sat, this.bal);
  textSize(this.size);
  
  if (this.exploding < 50){
    textSize(this.size/2);
    if (this.exploding > 25){
      var alpha = (50 - this.exploding)/25;
      fill(this.hue, this.sat, this.bal, alpha);
    }
    
    for (var i = 0; i < this.particles.length; i++){
      this.particles[i].render();
    }
  } else {
    if (this.exploding < 100){
      var alpha = (this.exploding-50)/50;
      fill(this.hue, this.sat, this.bal, alpha);
    } 
    text("❤", this.x, this.y);
  }
  
  this.y = (this.y + this.speed);
  if (this.y > height + this.size){
    this.y = 0 - this.size;
  }
  
  this.exploding++;
}
  
function setup(){
  createCanvas();
  colorMode(HSB, 360, 100, 100);
  textAlign(CENTER, CENTER);
  resize();
}

function init(){
  hearts = [];
  
  var gridWidth = floor(width/cellSize);
  var gridHeight = floor(height/cellSize);
  
  for (var i = 0; i < numHearts; i++){
    hearts.push(new Heart(random()*width, random()*height));
  }
  
  hearts.sort(function(a, b){
    return (a.size > b.size);
  })
}

function draw(){
  background(350, 10, 100);
  if (hearts == undefined) return;
  
  noStroke();
  for (var i = 0; i < hearts.length; i++){
    hearts[i].render();
  }
  
  fill(180, 100, 100);
  var size = width/10
  if (height < width) size = (height/10);
  stroke(240, 100, 50);
  textSize(size);
  strokeWeight(size/15);
//   text("", width/2, height*.4);
//   text("b", width/2, height*.5);
//   text("♡", width/2, height*.6);
  
}

function resize(){
  resizeCanvas(window.innerWidth, window.innerHeight);
  init();
}
