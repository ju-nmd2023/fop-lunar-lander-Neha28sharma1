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

function startScreen() {
  push();
  background(0, 0, 0);

  fill("lightpink");
  rect(width / 2 - 70, height / 2, 300, 60, 30); // button
  textSize(20);
  fill("white");
  text("Click Here To Start", width / 2, height / 2 + 35);

  fill(255, 255, 255);
  textSize(50);
  textFont();
  text("LUNAR LANDER", width / 2 - 100, height / 4);

  pop();
}

let gameInfoSetiings = {
  x: screenWidth / 2,
  y: screenHeight / 2,
};
function gameInfo() {
  push();

  fill(255, 255, 255);
  textSize(16);

  text(
    "Land with velocity max 30km/h to win",
    gameInfoSetiings.x - 100,
    gameInfoSetiings.y + 130
  );

  text(
    "controls: arrow-down = thrust, spacebar = restart",
    gameInfoSetiings.x - 120,
    gameInfoSetiings.y + 150
  );
  pop();
}

function draw() {
  if (state === "start") {
    startScreen();
    gameInfo();
    if (keyIsPressed === true && keyCode === 32) {
      state = "game";
    }
  } else if (state === "game") {
    background(0, 0, 0);

    for (let star of stars) {
      fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
      ellipse(star.x, star.y, 2);
      star.alpha = star.alpha + 0.02;
    }

    fill("grey");
    rect(position.x, position.y, 600, 200);
    lunar(lunarSettings.x, lunarSettings.y, lunarSettings.size);

    push();
    fill(255, 255, 255);
    textSize(16);
    textFont();

    text(
      "velocity: " + Math.floor(lunarSettings.velocity * 20) + " km/h", //MULTIPLIED BY 20 TO CHANGE TO KM/H
      50,
      75
    );

    pop();
    }}
