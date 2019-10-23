var colorList = [
  '#F87893',
  '#FFC162',
  '#ECECA0',
  '#B0DE4A',
  '#B199EB',
  '#8DDED8',
  '#29ABE2'
];
var currentColor;
var graphic;
var myBackground;
var marshmallow = [];
var eye = [];
var arm = [];
var leg = [];
var mouth = [];
var bodyPart = [];

function preload() {
  for (var i = 0; i < 5; i++) {
    eye[i] = loadImage('assets/eyes0' + i + '.png');
  }
  for (var i = 0; i < 4; i++) {
    arm[i] = loadImage('assets/arms0' + i + '.png');
  }
  for (var i = 0; i < 4; i++) {
    leg[i] = loadImage('assets/legs0' + i + '.png');
  }
  for (var i = 0; i < 6; i++) {
    mouth[i] = loadImage('assets/mouth0' + i + '.png');
  }
  myBackground = loadImage('assets/background.png');
  marshmallow = loadImage('assets/body00.png');
}


function setup() {

  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);


  currentColor = colorList[floor(random(0, colorList.length))];
  var b = new Body(width / 2, height / 2, marshmallow, marshmallow.width / 2, marshmallow.height / 2);
  bodyPart.push(b);
  console.log('New Marshmallow');


  var eyeZero = new Body(180, 180, eye[0], eye[0].width / 2, eye[0].height / 2);
  var eyeOne = new Body(250, 180, eye[1], eye[1].width / 2, eye[1].height / 2);
  var eyeTwo = new Body(180, 220, eye[2], eye[2].width / 2, eye[2].height / 2);
  var eyeThree = new Body(250, 220, eye[3], eye[3].width / 2, eye[3].height / 2);
  var eyeFour = new Body(215, 260, eye[4], eye[4].width / 2, eye[4].height / 2);

  var mouthZero = new Body(170, 375, mouth[0], mouth[0].width / 2, mouth[0].height / 2);
  var mouthOne = new Body(220, 375, mouth[1], mouth[1].width / 2, mouth[1].height / 2);
  var mouthTwo = new Body(270, 375, mouth[2], mouth[2].width / 2, mouth[2].height / 2);
  var mouthThree = new Body(170, 410, mouth[3], mouth[3].width / 2, mouth[3].height / 2);
  var mouthFour = new Body(220, 410, mouth[4], mouth[4].width / 2, mouth[4].height / 2);
  var mouthFive = new Body(270, 410, mouth[5], mouth[5].width / 2, mouth[5].height / 2);

  var legZero = new Body(460, 550, leg[0], leg[0].width / 2, leg[0].height / 2);
  var legOne = new Body(560, 550, leg[1], leg[1].width / 2, leg[1].height / 2);
  var legTwo = new Body(660, 550, leg[2], leg[2].width / 2, leg[2].height / 2);
  var legThree = new Body(760, 550, leg[3], leg[3].width / 2, leg[3].height / 2);

  var armZero = new Body(1045, 180, arm[0], arm[0].width / 2, arm[0].height / 2);
  var armOne = new Body(1045, 260, arm[1], arm[1].width / 2, arm[1].height / 2);
  var armTwo = new Body(1045, 320, arm[2], arm[2].width / 2, arm[2].height / 2);
  var armThree = new Body(1045, 400, arm[3], arm[3].width / 2, arm[3].height / 2);

  bodyPart.push(eyeZero);
  bodyPart.push(eyeOne);
  bodyPart.push(eyeTwo);
  bodyPart.push(eyeThree);
  bodyPart.push(eyeFour);
  bodyPart.push(mouthZero);
  bodyPart.push(mouthOne);
  bodyPart.push(mouthTwo);
  bodyPart.push(mouthThree);
  bodyPart.push(mouthFour);
  bodyPart.push(mouthFive);
  bodyPart.push(legZero);
  bodyPart.push(legOne);
  bodyPart.push(legTwo);
  bodyPart.push(legThree);
  bodyPart.push(armZero);
  bodyPart.push(armOne);
  bodyPart.push(armTwo);
  bodyPart.push(armThree);

}

function draw() {
  background(currentColor);
  image(myBackground, width / 2, height / 2, width - 200, height - 120);
  for (let i = 0; i < bodyPart.length; i++) {
    bodyPart[i].show();
  }

}

class Body {
  constructor(x, y, graphic, width, height) {
    this.x = x;
    this.y = y;
    this.img = graphic;
    this.width = width;
    this.height = height;
    this.size = 20;
    this.hover = false;
    this.active = false;
    this.intersect = false;
    this.xoffset = 0;
    this.yoffset = 0;

  }
  show() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.width, this.height);
    if (mouseX > this.x - this.size && mouseX < this.x + this.size &&
      mouseY > this.y - this.size && mouseY < this.y + this.size) {
      this.hover = true;
      cursor('GRAB');
    } else {
      this.hover = false;
      cursor(ARROW);
    }
  }
  intersects(other) {
    var d = dist(this.x, this.y, other.x, other.y);
    if (d < this.size + other.size) {
      return true;
    } else {
      return false;
    }
  }
}

function mousePressed() {
  for (var i = 0; i < bodyPart.length; i++) {
    if (bodyPart[i].hover == true) {
      bodyPart[i].active = true;
    } else {
      bodyPart[i].active = false;
    }
    bodyPart[i].xoffset = mouseX - bodyPart[i].x;
    bodyPart[i].yoffset = mouseY - bodyPart[i].y
  }

  return false;
}

function mouseDragged() {
  for (var i = 0; i < bodyPart.length; i++) {
    if (bodyPart[i].active) {
      bodyPart[i].x = mouseX - bodyPart[i].xoffset;
      bodyPart[i].y = mouseY - bodyPart[i].yoffset;
    }
  }
}

function mouseReleased() {
  for (var i = 0; i < bodyPart.length; i++) {
    bodyPart[i].active = false;
    for (let j = 0; j < bodyPart.length; j++) {
      if (i != j && bodyPart[i].intersects(bodyPart[j])) {
        bodyPart[i].intersect = true;
      } else {
        bodyPart[i].intersect = false;
      }
    }
    if (bodyPart[i].intersect) {
      compliment = wordList[floor(random(0, wordList.length))]
      bodyPart[i].intersect = false;
    }
  }
}

function keyPressed() {
  currentColor = colorList[floor(random(0, colorList.length))];
  imageMode(CENTER);
  image(myBackground, width / 2, height / 2, width - 200, height - 120);
}
