// JavaScript Document

var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
var width = 300;
var height = 600;
var W_BLOCKS = width / COLUMNS;
var H_BLOCKS = height / ROWS;

function render()
{
	ctx.clearRect(0, 0, width, height);
	ctx.strokeStyle = "black";
	
	for(var i = 0; i < COLUMNS; ++i)
	{
		for(var j = 0; j < ROWS; ++j)
		{
			if(board[j][i] )
			{
				ctx.fillStyle = colors[ board[j][i] - 1];
				drawBlock(i, j);
			}
		}
	}
	
	for(var i = 0; i < 4; ++i)
	{
		for(var j = 0; j < 4; ++j)
		{
			if(current[i][j])
			{
				ctx.fillStyle = colors[current[i][j] - 1];
				drawBlock(currentX + j, currentY + i);
			}
		}
	}
}

setInterval(render, 30);

function drawBlock(x, y)
{
	ctx.fillRect(W_BLOCKS * x, H_BLOCKS * y, W_BLOCKS - 1, H_BLOCKS - 1);
	ctx.strokeRect(W_BLOCKS * x, H_BLOCKS * y, W_BLOCKS - 1, H_BLOCKS - 1);
}