// JavaScript Document

document.body.onkeydown = function(e)
{
	var keys = {
		37:"left",
		39:"right",
		40:"down",
		38:"rotate"
		};
		
	if(typeof keys[e.keyCode] != "undefined")
	{
		keyPress(keys[e.keyCode]);
		
		render();
	}
};

function keyPress(key)
{
	switch(key)
	{
		case "left":
			if(valid(-1))
				--currentX;
			break;
		case "right":
			if(valid(1))
				++currentX;
			break;
		case "down":
			if(valid(0, 1))
				++currentY;
			break;
		case "rotate":
			var rotated = rotate(current);
			if(valid(0, 0, rotated) )
			{
				current = rotated;
			}
			
			break;
	}
}

function rotate(current)
{
	var newCurrent = [];
	
	for(var i = 0; i < 4; ++i)
	{
		newCurrent[i] = [];
		for(var j = 0; j < 4; ++j)
		{
			newCurrent[i][j] = current[3 - j][i];
		}
	}
	
	return newCurrent;
}