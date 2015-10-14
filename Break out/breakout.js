var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//General variables
var lightBlue = "white";

//Player variables
var playerH = 15;
var playerW = 60;
var playerX = (canvas.width * 0.5) - (playerW * 0.5);
var playerY = canvas.height - playerH;

//Ball variables
var ballX = canvas.width * 0.5;
var ballY = canvas.height * 0.5;
var velX = 2;
var velY = 2;
var ballRadius = 10;

//Map variables
var blockW = 55;
var blockH = 20;
var columns = Math.floor(canvas.width / blockW);
var rows = 4;

var map = [];

//init map
function initMap()
{
    for(var i = 0; i < columns; ++i)
    {
        map[i] = [];
        for(var j = 0; j < rows; ++j )
        {
            map[i][j] = 1;
        }
    }
}

function drawBlocks()
{
    for(var i = 0; i < columns; ++i )
    {
        for(var j = 0; j < rows; ++j )
        {
            if(map[i][j] == 1)
            {
                ctx.beginPath();
                ctx.rect((i*blockW)+20, (j*blockH)+20, blockW-5, blockH-5);
                ctx.fillStyle = lightBlue;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function game()
{
    initMap();
    setInterval(draw, 10);
}

//setInterval(draw, 10);
function drawBall()
{
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = lightBlue;
    ctx.fill();
    ctx.closePath();
}

function drawPlayer()
{
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerW, playerH);
    ctx.fillStyle = lightBlue;
    ctx.fill();
    ctx.closePath();
}

function clear()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function borderCol()
{
    if((ballY + velY) < 0 || (ballY + velY) > canvas.height)
    {
        velY*=-1;
    }
    
    if((ballX + velX) < 0 || (ballX + velX) > canvas.width)
    {
        velX*=-1;
    }
}

function blockCol()
{
    for(var i = 0; i < columns; ++i )
    {
        for(var j = 0; j < rows; ++j )
        {
            if(map[i][j] == 1)
            {
                var bx = (i*blockW)+20;
                var by = (j*blockH)+20;
                var bw = bx + blockW-5;
                var bh = by + blockH-5;
                
                if(ballX > bx && ballX < bw && ballY > by && ballY < bh)
                {
                    if(ballY > by && ballY < bh)
                    {
                        velY *= -1;
                    }
                    
                    map[i][j] = 0;
                }
            }
        }
    }
}

function playerCol()
{
    if(ballY > playerY && ballX > playerX && ballX < playerX + playerW)
    {
        velY*=-1;
    }
}

function update()
{   
    ballX += velX;
    ballY += velY;
    borderCol();
    blockCol();
    playerCol();
}

function draw()
{
    eventHandler();
    clear();
    drawBall();
    drawPlayer();
    drawBlocks();
    update();
}


game();

