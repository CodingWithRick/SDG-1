let btn1, ball, ballImg, paddle, paddleImg, lives, liveImg, fireImg, endImg, gameState, score, bg, edges, hd, block1, block2, block3, g1, g2, g3, breakS, endS;

function preload() {
    ballImg = loadImage("asc/img/ball.png");
    paddleImg = loadImage("asc/img/paddle.png");
    liveImg = loadImage("asc/img/heart.jpg");
    fireImg = loadImage("asc/img/fire.png");
    endImg = loadImage("asc/img/end.png");
    bg = loadImage("asc/img/bg.png");
    breakS = loadSound("asc/sound/break.mp3");
    endS = loadSound("asc/sound/end.mp3");
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    ball = createSprite(700, 550, 20, 20);
    ball.addImage(ballImg);
    ball.velocityY = 6;
    ball.velocityX = 5;
    ball.scale = 0.1;
    paddle = createSprite(700, 600, 100, 20);
    paddle.addImage(paddleImg);
    paddle.scale = 0.2;
    gameState = "START";
    btn1 = createButton("Start");
    btn1.position(windowWidth/2 - 50, windowHeight/2);
    btn1.attribute("class", "st");
    hd = createElement("h2");
    hd.html("Brick Breaker 🚀");
    hd.position(windowWidth/2 - 115, 100);
    hd.style("color", "#fff");
    hd.style("font-family", "Poppins, san-serif");
    hd.style("font-size", "40px");
    hd.style("text-shadow", "3px 3px #000");
    lives = 5;
    btn1.mousePressed(() => {
       hd.hide();
       btn1.hide();
       gameState = "PLAY";
       lives = 5;
       score = 0;
       for(let i = 40; i < windowWidth - 20; i+=40){
           push();
           block1 = createSprite(i, 70, 30, 30);
           block1.shapeColor = rgb(random(0, 255), random(0, 255), random(0, 255));
           g1.add(block1);
           pop();
       }
       for(let i = 150; i < windowWidth - 200; i+=40){
           push();
           block2 = createSprite(i, 110, 30, 30);
           block2.shapeColor = rgb(random(0, 255), random(0, 255), random(0, 255));
           g2.add(block2);
           pop();
       }
       for(let i = 300; i < windowWidth - 300; i+=40){
           push();
           block3 = createSprite(i, 150, 30, 30);
           block3.shapeColor = rgb(random(0, 255), random(0, 255), random(0, 255));
           g3.add(block3);
           pop();
       }
       ball.x = 700;
       ball.y = 550;
       paddle.x = 700;
       paddle.y = 600;
    })
    g1 = new Group();
    g2 = new Group();
    g3 = new Group();
    score = 0;
}
function draw() {
    background(bg);
    if(gameState==="PLAY"){
        drawSprites();
        fill("red");
        textSize(30);
        text("❤", 50, 40);
        fill("#000");
        textSize(22);
        text("x", 90, 35);
        textSize(23);
        text(lives, 110, 37);
        text("Score: " + score, 1150, 35);
    }
    for(let a = 0; a < g1.length; a++){
        if(ball.isTouching(g1.get(a)) && g1.get(a) !== null){
            ball.bounceOff(g1.get(a));
            g1.get(a).destroy();
            breakS.play();
            score++;
        }
    }
    for(let a = 0; a < g2.length; a++){
        if(ball.isTouching(g2.get(a)) && g2.get(a) !== null){
            ball.bounceOff(g2.get(a));
            g2.get(a).destroy();
            breakS.play();
            score++;
        }
    }
    for(let a = 0; a < g3.length; a++){
        if(ball.isTouching(g3.get(a)) && g3.get(a) !== null){
            ball.bounceOff(g3.get(a));
            g3.get(a).destroy();
            breakS.play();
            score++;
        }
    }
    edges = createEdgeSprites();
    ball.bounceOff(edges[0]);
    ball.bounceOff(edges[1]);
    ball.bounceOff(edges[2]);
    paddle.bounceOff(edges[0]);
    paddle.bounceOff(edges[1]);
    ball.bounceOff(paddle);
    if(ball.y > paddle.y && gameState==="PLAY"){
        lives = lives - 1;
        ball.x = 700;
        ball.y = 550;
        paddle.x = 700;
        paddle.y = 600;
        if(lives === 0){
            gameState = "END";
            // endS.play();
        }
    }
    if(keyDown(RIGHT_ARROW)){
        paddle.x = paddle.x + 10;
    }
    if(keyDown(LEFT_ARROW)){
        paddle.x = paddle.x - 10;
    }
    if(keyDown(ENTER) && gameState==="END"){
        gameState = "START";
        btn1.show();
        hd.show();
    }
    if(gameState === "END"){
        background(endImg);
    }
}



