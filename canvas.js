//Utilities functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}
function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}
//------Utilities functions over-------

let particles=[]


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth/2 ,
  y: innerHeight/2
}

const colors = ['#3e64ff', '#ecfcff', '#5edfff', '#b2fcff']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radian=Math.random()*2*Math.PI;
    this.distanceFromCenter = randomIntFromRange(50,130);
    this.velocity=0.04;
    this.lastMosuse = { x : x, y: y};

  }

  draw(lastPosition) {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPosition.x,lastPosition.y);
    c.lineTo(this.x,this.y);
    c.stroke();
    c.closePath();
  }

  update() {
     console.log("i am at updatoo");

    const lastPosition = {  x : this.x , y :this.y  }

    this.radian+=this.velocity;
    this.lastMosuse.x += (mouse.x-this.lastMosuse.x)*0.03;
    this.lastMosuse.y += (mouse.y-this.lastMosuse.y)*0.03;
    this.x = this.lastMosuse.x+ Math.cos(this.radian)*this.distanceFromCenter;
    this.y = this.lastMosuse.y+ Math.sin(this.radian)*this.distanceFromCenter;
this.draw(lastPosition);

  }
}

// Implementation

function init() {
  particles = [] //------ReInitializing object array to null to avoid overlap appending

  for (let i = 0; i < 100; i++) {
    const r=1+(Math.random()*5);
    let x=canvas.width/2;
    let y=canvas.height/2;
    let color = randomColor(colors);

  // appending new singular objects to entire object array
        let aparticle = new particle(x,y,r,color)
        particles.push(aparticle)
        console.log("appending");
      }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle='rgba(255,255,255,0.05)';

  c.fillRect(0,0,canvas.width, canvas.height)
   particles.forEach(particle => {
   particle.update() //----each object in object array calling their  individual update function
   })
}

init()
 animate()
