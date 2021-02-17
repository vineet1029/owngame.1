
var house,houseImg;
var bg,bgImg;
var santa,santaImg;
var gift,gif1,gif2,gif3;
var roof1;
var bat;
var giftCount=0;
var reset,resetimg
var gameState="play"
var timer=60;
var img1,img1Img;
var tree,treeImg;
var chistclaus;
var info,infoImg;
var doc,docImg;

function preload(){
  house1=loadImage("housem1.png")
  house2=loadImage("housem3.png")
  house3=loadImage("House5.png")
  house4=loadImage("house6.png")
  house5=loadImage("house7.png")
  santaImg=loadAnimation("Santa3-removebg-preview.png","santa2__2_-removebg-preview.png","santa 4.png","santa 5.png","santa 6.png");
  bgImg=loadImage("night bg.jpg")
  gif1=loadImage("gift6.png")
  gif2=loadImage("gift2.png")
  gif3=loadImage("gift3.png")
  batImg=loadAnimation("bat1.png","bat3.png");
  resetImg=loadImage("reset.png");
  img1Img=loadImage("image1.png");
  treeImage=loadImage("tree.png");
  infoImg=loadImage("i.png");
  chistclaus=loadSound("santa claus.mp3")
  docImg=loadImage("instru.png")
}

function setup(){
  createCanvas(700,500)
  bg=createSprite(350,150);
  bg.addImage(bgImg);
  bg.velocityX=-3;
    
  santa=createSprite(350,130);
  santa.addAnimation("santa",santaImg)
  
  reset=createSprite(350,180,700,500);       reset.addImage(resetImg)
  reset.visible=false;
  reset.scale=1.4;
  
  img1=createSprite(250,100);
  img1.visible=false;
  img1.addImage(img1Img)
  
  tree=createSprite(250,400);
  tree.addImage(treeImage);
  tree.visible=false;
  
  info=createSprite(50,50);
  info.addImage(infoImg);
  info.scale=0.08
  
 
  
  doc=createSprite(290,200);
  doc.addImage(docImg);
  doc.visible=false;
  doc.scale=0.7;
  
  chistclaus.loop();
  giftsGroup=new Group();
  roofGroup=new Group();
  batGroup=new Group();
  houseGroup=new Group();
}

function draw(){
  background("black");
  santa.visible=true;
  bg.visible=true;
  info.visible=true;
  doc.visible=false;
  
  
  if(gameState==="play"){
  if(bg.x<50){
    bg.x=350
  }
  santa.velocityY=0;
 
//  if(gift.y>700){
  //  gift.y=santa.y;
//  }
 
  if(mouseIsOver(info)){
    doc.visible=true;
    santa.velocityY=0;
    batGroup.destroyEach();
    giftsGroup.visible=false;
    giftsGroup.setVelocityYEach(0);
    bg.velocityX=0;
    houseGroup.destroyEach();
  //  timer=timer-0;
   }
    else{
      if(keyWentDown("space")){
    
    giftmaking();
  }
    //  timer=timer-1;
      spawnBats();
  spawnHouse();
      bg.velocityX=-3;
      if(frameCount%60===0){
      timer=timer-1;
    }
 //     batGroup.visible=true;
 //     houseGroup.visible=true;
       if(santa.y>50){
    if(keyDown(UP_ARROW)){
      santa.velocityY=-2;
    }
    
  }
  if(santa.y<250){
    if(keyDown(DOWN_ARROW)){
      santa.velocityY=2;
    }
  }
  
    }
     
  if(giftsGroup.isTouching(roofGroup)){
    giftsGroup.destroyEach();
    giftCount=giftCount+1;
  }
//  timer=millis();
//  console.log(timer)
    
  
  
   drawSprites();

  fill("white")
  textSize(25);
  textFont("Ink free");
  text("Timeleft: "+timer,500,70);
    
  if(batGroup.isTouching(santa)||timer===0){
    gameState="end";
  }
    
}
  if(gameState==="end"){
    reset.visible=true;
   // img1.visible=true;
    tree.visible=true;
    info.visible=false;
    //hide.visible=false;
    background("black");
    fill("white")
    textSize(25);
    textFont("freestyle script");
    text("Gifts collected "+giftCount,500,70);
    
    if(mousePressedOver(reset)){
      gameState="play";
      reset.visible=false;
      tree.visible=false;
      timer=60;
      
     restart();
      drawSprites();
      
    }
    santa.visible=false;
    batGroup.destroyEach();
    houseGroup.destroyEach();
    roofGroup.destroyEach();
    bg.visible=false;
    giftsGroup.destroyEach();
    
    drawSprites();
  }
  

}
function spawnHouse(){
  if(frameCount%100===0){
    house=createSprite(700,450);
    var rand=Math.round(random(1,5))
    roof1=createSprite(700,500,house.width,5);
    roof1.shapeColor="white";
    
    switch(rand){
      case 1: house.addImage(house1);
         roof1.y=345;     
       
              break;
      case 2: house.addImage(house2);
        roof1.y=355; 
              break;
      case 3: house.addImage(house3);
        roof1.y=400; 
              break;
      case 4: house.addImage(house4);
        roof1.y=370; 
              break;
      case 5: house.addImage(house5);
        roof1.y=380; 
              break;
      default: break;
    }
     
    
    
    house.scale=0.4;
    house.velocityX=-3;
    house.lifetime=245;
    houseGroup.add(house);
    roofGroup.add(roof1)
    roof1.velocityX=house.velocityX;
    roof1.lifetime=245;
    roof1.visible=false;
  }
  
}
function giftmaking(){
  gift=createSprite(350,santa.y);
  gift.velocityY=3;
  gift.scale=0.2;
  var gif=Math.round(random(1,3))
  if(gif===1){
    gift.addImage(gif1)
  }
  if(gif===2){
    gift.addImage(gif2)
  }
  if(gif===3){
    gift.addImage(gif3)
  }
  giftsGroup.add(gift);
}

function spawnBats(){
  if(frameCount%300===0){
    bat=createSprite(700,Math.round(random(15,310)));
    bat.addAnimation("bat",batImg);
    bat.velocityX=-3;
    if(timer===timer-1){
      bat.velocityX=bat.velocityX-0.02;
    }
    bat.scale=1.2;
    batGroup.add(bat);
  }
  
}
function restart(){
  santa.y=180;
  
}