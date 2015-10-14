// JavaScript Document

var COLUMNS = 10;
var ROWS = 20;
var board = [];
var interval;
var current;
var currentX;
var currentY;
var lose;
var points_val = 0;
var point_view = document.getElementById("points");

var shapes = [
	[1, 1, 1, 1],
	[1, 1, 1, 0,
	1],
	[1, 1, 1, 0,
	0, 0, 1,],
	[1, 1, 0, 0,
	1, 1],
	[1, 1, 0, 0,
	0, 1, 1,],
	[0, 1, 1, 0,
	1, 1],
	[0, 1, 0, 0,
	1, 1, 1]
];

var colors = ["cyan", "blue", "orange", "red", "yellow", "green", "purple"];

function newGame()
{
	clearInterval(interval);
	displayPoints();
	init();
	newShape();
	lose = false;
	interval = setInterval(tick, 250); //4 fps (?)
}

newGame();

function init()
{
	for(var i = 0; i < ROWS; ++i)
	{
		board[i] = [];
		for(var j = 0; j < COLUMNS; ++j)
		{
			board[i][j] = 0;	
		}
	}
}

function newShape()
{
	var id = Math.floor( Math.random() * shapes.length );
	var shape = shapes[id];
	
	current = [];
	for(var i = 0; i < 4; ++i)
	{
		current[i] = [];
		for(var j = 0; j < 4; ++j)
		{
			var k = 4 * i + j;
			if(typeof shape[k] != "undefined" && shape[k])
			{
				current[i][j] = id + 1;
			}
			else
			{
				current[i][j] = 0;
			}
		}
	}
	
	currentX = 3;
	currentY = 0;
	
}

function tick()
{
	if(valid(0, 1))
	{
		++currentY;
	}
	else
	{
		solidify();
		clearLines();
		
		if(lose)
		{
			newGame();
			return false;
		}
		
		newShape();
	}
}

function valid(offsetX, offsetY, newCurrent)
{
	offsetX = offsetX || 0;
	offsetY = offsetY || 0;
	offsetX += currentX;
	offsetY += currentY;
	newCurrent = newCurrent || current;
	
	for(var y = 0; y < 4; ++y)
	{
		for(var x = 0; x < 4; ++x)
		{
			if(newCurrent[y][x])
			{
				if(typeof board[y + offsetY] == "undefined"
				|| typeof board[y + offsetY][x + offsetX] == "undefined"
				|| board[y + offsetY][x + offsetX]
				|| x + offsetX < 0
				|| y + offsetY >= ROWS
				|| x + offsetX >= COLUMNS
				) 
				{
					if(offsetY == 1 && offsetX - currentX == 0 && offsetY - currentY == 1)
					{
						console.log("GAME OVER!");
						points_val = 0;
						lose = true;
					}
					return false;
				}
			}
		}
	}
	
	return true;
}

function solidify()
{
	for(var y = 0; y < 4; ++y)
	{
		for(var x = 0; x < 4; ++x)
		{
			if(current[y][x])
			{
				board[y+currentY][x + currentX] = current[y][x];
			}
		}
	}
}

function clearLines()
{
	for(var y = ROWS - 1; y >= 0; --y)
	{
		var rowFilled = true;
		
		for(var x = 0; x < COLUMNS; ++x)
		{
			if(board[y][x] == 0)
			{
				rowFilled = false;
				break;
			}
		}
		
		if(rowFilled)
		{
			points_val += 100;
			displayPoints();
			for(var yy = y; yy > 0; --yy)
			{
				for(var x = 0; x < COLUMNS; ++x)
				{
					board[yy][x] = board[yy - 1][x];
				}
			}
			++y;
		}
	}
	
}

function displayPoints()
{
	var htmlText = "<h1>POINTS=" + points_val + "</h1>";
	console.log(points_val)
	point_view.innerHTML = htmlText;
	//document.getElementById("points").innerHTML = 10;
	
}