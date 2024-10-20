function Box(x, y, width, height, category)
{
    var x = x;
    var y = y;
    var width = width;
    var height = height;
    
    this.category = category;
    
    //Check if the mouse is over this box
    this.mouseOver = function()
    {
        if(mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height)
        {
            return this.category.name;
        }
        return false;
    }
    
    this.draw = function()
    {
        fill(category.colour);
        rect(x, y, width, height);
    }
}