var isRightPressed = false;
var isLeftPressed = false;

var playerVelX = 5;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e)
{
    if(e.keyCode == 39)
    {
        isRightPressed = true;
    }
    else if(e.keyCode == 37)
    {
        isLeftPressed = true;
    }
}

function keyUpHandler(e)
{
    if(e.keyCode == 39)
    {
        isRightPressed = false;
    }
    else if(e.keyCode == 37)
    {
        isLeftPressed = false;
    }
}

function eventHandler()
{
    if(isRightPressed && playerX < canvas.width - playerW)
    {
        playerX += playerVelX;
    }
    else if(isLeftPressed && playerX > 0)
    {
        playerX -= playerVelX;
    }
}