var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg, bg_image;
var platform, platform_img, platformGroup;
var player, player_img;
var ground;
var restart, restart_img;
var bullet, bullet_img, bulletGroup
var monster, monster_img, monsterGroup;
var score;
var gameover, gameover_img;

function preload(){
    bg_image = loadImage("Images/Background.jpeg");
    platform_img = loadImage("Images/platform.png");
    player_img = loadImage("Images/PC Boy.png");
    restart_img = loadImage("Images/restart.png");
    bullet_img = loadImage("Images/bullet.png");
    monster_img = loadImage("Images/monster.png");
    gameover_img = loadImage("Images/gameover.png");
}

function setup(){
    createCanvas(1200, 700);
    bg = createSprite(1000, 350);
    bg.addImage(bg_image);
    bg.scale = 2.0;

    platformGroup = new Group;
    bulletGroup = new Group;
    monsterGroup = new Group;

    player = createSprite(50, 500);
    player.addImage(player_img);
    player.scale = 0.5;
    player.debug = true;

    
    
    player.setCollider("rectangle", 0,100,0,10)

    ground = createSprite(600, 700, 1200, 20);
    ground.visible = false;

    restart = createSprite(50, 50);
    restart.addImage(restart_img);
    restart.visible = false;
    restart.scale = 0.2;

    score = 0;
    stroke("red");
    fill("red");
    textSize(20);    

    gameover = createSprite(600, 350);
    gameover.addImage(gameover_img);
    gameover.scale = 0.8;
    
    
    

}

function draw(){
    background(0);
    
  


    if(gameState === PLAY){
        player.visible = true;
        gameover.visible = false;
        

        bg.velocityX = -3;

        if(bg.x < 200){
            bg.x = bg.width/2;
    
        }

        if (keyDown("UP_ARROW") && player.y>= 450 ) {
            player.velocityY = -12  
          }
          if (keyDown("RIGHT_ARROW")) {
              player.x+=1;
            }
          if (keyDown("LEFT_ARROW")) {
              player.x-=3;
          } 


          console.log(player.y)
    player.velocityY = player.velocityY +0.5;

    if(platformGroup.isTouching(player)){
        player.velocityY = -0.01;
        if (keyDown("UP_ARROW") && player.y >= 450-platform.y) {
            player.velocityY = -12  
        }
        
        

    
    }

    shoot();
    if(bulletGroup.overlap(monsterGroup)){
       monsterGroup[0].destroy();
       bulletGroup[0].destroy();
       
       score = score+1;
        
    }


    if(player.collide(ground)){
        player.velocityY = 0.0;
        player.visible = false;
        player.y = 350;
        /*bg.velocityX = 0;
        platformGroup.setVelocityXEach(0); 
        platformGroup.setVelocityYEach(0); 
        
        platformGroup.setVisibleEach(false);*/

        gameState = END;

    }

    if(monsterGroup.collide(player)){
        player.velocityY = 0.0;
        player.visible = false;
        player.y = 350;
        /*bg.velocityX = 0;
        platformGroup.setVelocityXEach(0); 
        platformGroup.setVelocityYEach(0); 
        
        platformGroup.setVisibleEach(false);*/

        gameState = END;
    }
    
    }

    else if (gameState === END) {

        restart.visible = true;
        gameover.visible = true;
        text("Please reload your screen to play again", 600, 50);
        

        if(mousePressedOver(restart)) {
            reset();
          }

          bg.velocityX = 0;
          platformGroup.setVelocityXEach(0); 
          platformGroup.setVelocityYEach(0); 
          
          platformGroup.setVisibleEach(false)
          bulletGroup.setVelocityXEach(0); 
          bulletGroup.setVelocityYEach(0); 
          
          bulletGroup.setVisibleEach(false);
          monsterGroup.setVelocityXEach(0); 
          monsterGroup.setVelocityYEach(0); 
          
          monsterGroup.setVisibleEach(false);

    }

    /*if(keyDown("UP_ARROW") && player.y >= 500){
        player.y = player.y-40;
        
    }

    if( player.y <= 630){
        player.y = player.y+30;
    }*/

    


 
    spawnMonsters();
    spawnPlatforms();
    drawSprites();
    text("Score: "+score, 250, 50);
    text("Please reload your screen to play again", 600, 50);

}

function reset(){

    gameState = PLAY;
    restart.visible = false; 
    score = 0;
    
    

    
}




function spawnPlatforms(){
    
    if(World.frameCount % 100 === 0){
        platform = createSprite(1200, 600);
        platform.y = Math.round(random(600, 400));
        platform.addImage(platform_img);
        platform.velocityX = -3;
        platformGroup.add(platform);
        platform.scale = 0.25;
    }

    
    
}


function shoot(){
    if(keyDown("space")){
        if(frameCount % 10 == 0){
        //bulletGroup[0].visible
        bullet = createSprite(player.x, player.y);
        bullet.addImage(bullet_img);
        bullet.velocityX = 9;
        bulletGroup.add(bullet);
        bullet.scale = 0.05;
        bullet.lifetime = 100;
        }

    }
}

function spawnMonsters(){
    if(frameCount % 500 == 0){
        monster = createSprite(platform.x, platform.y - 50);
        monster.addImage(monster_img);
        monster.velocityX = -3;
        monsterGroup.add(monster);
        monster.scale = 0.3;
        monster.debug = true;
        

    }

}