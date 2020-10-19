//declare all the global variables
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survival_time, score;  

survival_time = 0;

//load all the images
function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}

function setup() {
  
  //create the canvas
  createCanvas(800, 550);

  //create the monkey
  monkey = createSprite(100, 437, 20, 20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.3;

  //create the ground
  ground = createSprite(400, 540, 800, 20);
  ground.shapeColor = "lightyellow";
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  //create all the groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();

  //create the score and survival time variable

  score = 0;
}


function draw() {
  //set a background
  background("lightblue");
  if (keyDown("space")) {
    monkey.velocityY = -7;
  }

  //display the survival time variable
  stroke("black");
  textSize(20);
  fill("black");
  survival_time = Math.ceil(Math.round(frameCount / frameRate()))
  text("Survival Time : " + survival_time, 100, 50);
  
  //create a scrolling ground
  if (ground.x < 500) {
    ground.x = ground.width / 2;
  }

  //create a check that if the monkey is touching the obstacle then execute the code
  if (obstacleGroup.isTouching(monkey)) 
  {
    obstacleGroup.velocityXEach = 0;
    FoodGroup.velocityXEach = 0;
    obstacleGroup.lifetimeEach  = -1;
    FoodGroup.lifetimeEach  = -1;
    console.log("hi");
    textSize(50);
    fill(rgb(9, 9, 77));
    text("Game Over", 250, 200);
    text("Monkey survived for: " + survival_time, 250, 300);
   
    stroke("lightblue");
    strokeWeight(20);
    fill("lightblue");
    rect(10, 30, 800, 50);
    survival_time = 0; 
  }
  
  //or else execute this code
  else
  {
    monkey.velocityY = monkey.velocityY + 0.1;
    monkey.collide(ground);
    create_fruits();
    create_obstacle();
    ground.setCollider("rectangle", 0, 0, ground.width, ground.height);
    ground.debug = false;
    drawSprites();
  }


}

//create a function to create the fruits
function create_fruits() {
  if (frameCount % 80 === 0) {
    fruits = createSprite(790, 120);
    fruits.addImage("fruits", bananaImage);
    fruits.scale = 0.2;
    fruits.lifetime = 220;
    fruits.velocityX = -4;
    fruits.y = Math.round(random(120, 200));
    FoodGroup.add(fruits);
  }
}

//create a function to create the obstacles
function create_obstacle() {
  if (frameCount % 480 === 0) {
    obstacle = createSprite(790, 480);
    obstacle.addImage("obstacle", obstaceImage);
    obstacle.velocityX = -3.5;
    obstacle.scale = 0.3;
    obstacleGroup.add(obstacle);
  }
}
