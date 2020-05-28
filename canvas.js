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

//------Function to resolve 2-D collison (elastic)
function rotate(velocity,angle){ //function to chnage 2D to 1D and vice versa depending to angle input
  const rotatedvelocity = {
    x : velocity.x*Math.cos(angle) - velocity.y*Math.sin(angle) ,
    y : velocity.x*Math.sin(angle) + velocity.y*Math.cos(angle)
  }
  return rotatedvelocity;
}
function resolve(a,b){
  const  xVelocityDiff= a.v.x - b.v.x;
  const  yVelocityDiff= a.v.y - b.v.y;
  const  xDist = b.x - a.x;
  const  yDist = b.y - a.y;
  if(xVelocityDiff*xDist+yVelocityDiff*yDist>=0){  //final Safety check for collison
    const angle = -Math.atan2(b.y-a.y,b.x-a.x);
    const ma=a.m; const mb=b.m;
    const ua=rotate(a.v,angle); //Intial velocity converted to 1-D using above rotate function
    const ub=rotate(b.v,angle);
    const va={x: ua.x*(ma-mb)/(ma+mb)+ub.x*2*mb/(ma+mb) , y : ua.y} //1-D collison formula
    const vb={x: ub.x*(ma-mb)/(ma+mb)+ua.x*2*ma/(ma+mb) , y : ub.y} //1-D collison formula
    const vFinala=rotate(va,-angle);
    const vFinalb=rotate(vb,-angle); //final velocities reverted back to 2D by rotating reverse direction
    a.v.x=vFinala.x; a.v.y=vFinala.y;
    b.v.x=vFinalb.x; b.v.y=vFinalb.y; //Assigning new Velocity values to our each particle
  }

}
//------Elastic collison function over



let particles=[]


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

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
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
  //update position vector function

    this.draw()
  }
}

// Implementation

function init() {
  particles = [] //------ReInitializing object array to null to avoid overlap appending

  for (let i = 0; i < 400; i++) {
    const r=5;
    let x=
    let y=
    let color = randomColor(colors);

  // appending new singular objects to entire object array
        let aparticle = new particle(x,y,r,color)
        particles.push(aparticle)
      }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
   particles.forEach(particle => {
   particle.update() //----each object in object array calling their  individual update function
   })
}

init()
 animate()
