function setup() {
  createCanvas(600, 400);
  background(0, 0, 0);
}

//Game Variables & Game states
let gameIsActive = true;
let state = "start";
let result;
let lunarLanded;
let landingY = 350;
const screenWidth = 600;
const screenHeight = 400;

//Stars sky By Garrit
let stars = [];
let position = { x: 0, y: 300 }; //for surface

for (let i = 0; i < 1000; i++) {
  const star = {
    x: Math.floor(Math.random() * screenWidth),
    y: Math.floor(Math.random() * screenHeight),
    alpha: Math.random(),
  };
  const planet = {
    x: Math.floor(Math.random() * screenWidth),
    y: Math.floor(Math.random() * screenHeight),
  };
  stars.push(star);
}

//Lunar

let lunarSettings = {
  x: screenWidth / 2,
  y: 50,
  size: 1,
  velocity: 0.5,
  acceleration: 0.1,
};

function lunar(x, y, s) {
  noStroke();
  //   translate(x, y);
  push();
  fill("white");
  triangle(x - 20 * s, y - 50 * s, x, y - 80 * s, x + 20 * s, y - 50 * s);
  fill("red");
  ellipse(x, y - 80 * s, 10 * s);
  rect(x - 20 * s, y - 50 * s, 40 * s, 50 * s);
  noStroke();
  triangle(x - 30 * s, y + 20 * s, x, y - 30 * s, x + 30 * s, y + 20 * s);
  fill("white");
  ellipse(x, y - 20 * s, 30 * s);
  fill("yellow");
  beginShape();
  vertex(x - 20 * s, y + 20 * s);

  bezierVertex(
    x - 20 * s,
    y + 30 * s,
    x + 10 * s,
    y + 35 * s,
    x + 20 * s,
    y + 20 * s
  );

  endShape();
  pop();
}
