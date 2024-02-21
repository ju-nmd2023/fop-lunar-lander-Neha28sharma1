function setup() {
  createCanvas(600, 400);
  background(0, 0, 0);
}

//Game Variables & Game states
let lunarLanded;
let landingY = 300;
const screenWidth = 600;
const screenHeight = 400;
let gameIsRunning = true;
let state = "start";
let result;

//Stars sky By Garrit
let stars = [];
let position = { x: 300, y: 600 }; //for surface

for (let i = 0; i < 1000; i++) {
  const star = {
    x: Math.floor(Math.random() * screenWidth),
    y: Math.floor(Math.random() * screenHeight),
    alpha: Math.random(),
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

  pop();
}

function flame(x, y, s) {
  fill(255, 165, 0, 200);
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
}
function startScreen() {
  push();
  background(0, 0, 0);

  fill("lightpink");
  rect(width / 2 - 100, height / 2, 300, 60, 30); // button
  textSize(20);
  fill("white");
  text("Click Here To Start", width / 2 - 30, height / 2 + 35);

  fill(255, 255, 255);
  textSize(50);
  textFont();
  text("LUNAR LANDER", width / 2 - 130, height / 4);

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
    gameInfoSetiings.x - 110,
    gameInfoSetiings.y + 130
  );

  text(
    "controls: arrow-up = thrust, mousebutton = restart",
    gameInfoSetiings.x - 150,
    gameInfoSetiings.y + 150
  );
  pop();
}

function draw() {
  if (state === "start") {
    startScreen();
    gameInfo();
  } else if (state === "game") {
    background(0, 0, 0);

    for (let star of stars) {
      fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
      ellipse(star.x, star.y, 2);
      star.alpha = star.alpha + 0.02;
    }

    fill(128, 128, 128, 240);
    ellipse(position.x, position.y, 600);
    fill(127, 200, 200);

    ellipse(180, 354, 30);
    ellipse(380, 400, 40);
    ellipse(400, 354, 30);
    ellipse(280, 354, 30);
    ellipse(280, 400, 30);
    ellipse(300, 320, 30);

    lunar(lunarSettings.x, lunarSettings.y, lunarSettings.size);

    push();
    fill(255, 255, 255);
    textSize(16);
    textFont();

    text(
      "velocity: " + Math.floor(lunarSettings.velocity * 20) + " km/h", //MULTIPLIED BY 20 TO CHANGE TO KM/H
      30,
      45
    );

    pop();
    if (gameIsRunning) {
      //gravity
      lunarSettings.y = lunarSettings.y + lunarSettings.velocity;
      lunarSettings.velocity =
        lunarSettings.velocity + lunarSettings.acceleration;

      //Rocket stop
      if (lunarSettings.y > landingY && lunarSettings.velocity > 1.5) {
        result = "You Lost";

        lunarLanded = false;
        gameIsRunning = false;
        state = "end";
      } else if (lunarSettings.y > landingY && lunarSettings.velocity < 1.5) {
        result = "great! you landed safely";
        lunarLanded = true;
        gameIsRunning = false;
        state = "end";
      }
      if (keyIsDown(38)) {
        //arrowdown

        lunarSettings.velocity = lunarSettings.velocity - 0.3;
        console.log(lunarSettings.y);
        console.log(lunarSettings.velocity);
        flame(lunarSettings.x, lunarSettings.y, lunarSettings.size);
      }
    }
  } else if (state === "end") {
    noStroke();
    background(0, 0, 0);
    for (let star of stars) {
      fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 255);
      ellipse(star.x, star.y, 2);
      star.alpha = star.alpha + 0.05;
      fill(128, 128, 128, 240);
      ellipse(position.x, position.y, 600);
      fill(127, 200, 200);

      ellipse(180, 354, 30);
      ellipse(380, 400, 40);
      ellipse(400, 354, 30);
      ellipse(280, 354, 30);
      ellipse(280, 400, 30);
      ellipse(300, 320, 30);
    }

    //Game text
    push();
    fill(255, 255, 255);
    textSize(50);
    textAlign(CENTER);
    text("LUNAR LANDER", screenWidth / 2, screenHeight / 3);
    pop();

    //end screen
    push();
    fill(255, 255, 255);
    textSize(16);
    textAlign(CENTER);
    text(result, screenWidth / 2, screenHeight / 3 + 35);
    pop();

    if (lunarLanded === true) {
      lunar(lunarSettings.x, lunarSettings.y, lunarSettings.size);
    }
  }
}

function mouseClicked() {
  if (
    state === "start" &&
    mouseX > 200 &&
    mouseX < 200 + 200 &&
    mouseY > 200 &&
    mouseY < 235 + 60
  ) {
    state = "game";
  }
  if (state === "end") {
    lunarSettings.x = screenWidth / 2; //calling variables again to start game again
    lunarSettings.y = 50;
    lunarSettings.size = 1;
    lunarSettings.velocity = 0.3;
    lunarSettings.acceleration = 0.16;

    state = "game";
    gameIsRunning = true;
  }
}
