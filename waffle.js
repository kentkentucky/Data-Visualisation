function Waffle(x, y, width, height, boxes_across, boxes_down, data, year)
{
    var x = x;
    var y = y;
    var width = width;
    var height = height;
    var boxes_across = boxes_across;
    var boxes_down = boxes_down;
    var data = data;
    var year = year;
    
    //start of code written personally
    //Initialise total poulation to 0
    var totalpopulation = 0;
    
    //Colours for chart
    var colours = ["red", "green", "blue", "purple", "yellow", "orange"];
    
    //Create array for categories and boxes
    var categories = [];
    var boxes = [];
    
    function addCategories()
    {   
        //add data into category
        for(var i = 0; i < data.length; i++)
        {
            var cat = {name: data[i].x, 
                       count: data[i].y, 
                       colour: colours[i % colours.length]
                      };
            categories.push(cat);
        }
        
        //Get the total number of population in remand for that year
        for(var i = 0; i < data.length; i++)
        {
            totalpopulation += data[i].y;
        }
        
        //Iterate over categories and add proportions
        for(var i = 0; i < categories.length; i++)
        {
            categories[i].boxes = round((categories[i].count / totalpopulation) * (boxes_down * boxes_across));
        }
    }
    //end of code written personally
    
    function addBoxes()
    {
        var currentCategory = 0;
        var currentCategoryBox = 0;
        
        var boxWidth = width / boxes_across;
        var boxHeight = height / boxes_down;
        
        for(var i = 0; i < boxes_down; i++)
        {
            boxes.push([]);
            for(var j = 0; j < boxes_across; j++)
            {
                if(currentCategoryBox == categories[currentCategory].boxes)
                {
                    currentCategoryBox = 0;
                    currentCategory++;
                }
                boxes[i].push(new Box((x + j * boxWidth), y + (i * boxHeight), boxWidth, boxHeight, categories[currentCategory]));
                currentCategoryBox++;
            }
        }
    }
    
    //Add categories and boxes
    addCategories();
    addBoxes();
    
    //Draw waffle diagram
    this.draw = function()
    {   
        if(darkmode == false)
        {
            background(255);
            fill(0);
        }
        else if(darkmode == true)
        {
            background(36, 37, 38);
            fill(255);
        }
        textSize(20);
        textAlign(LEFT, BOTTOM);
        text(year, x, y);
        for(var i = 0; i < boxes.length; i++)
        {
            for(var j = 0; j < boxes[i].length; j++)
            {
                if(boxes[i][j].category != undefined)
                {
                    boxes[i][j].draw();
                }
            }
        }
        
        //start of code written personally
        //Draw total population
        if(darkmode == false)
        {
            fill(0);
        }
        else if(darkmode == true)
        {
            fill(255);
        }
        text("Total population: " +totalpopulation, 800, 130);
        
        //Draw statistics at side
        for(var i = 0; i < categories.length; i++)
        {
            fill(categories[i].colour);
            text("Age Group: " +categories[i].name, 800, 165 + (i * 90));
            text("Population: " +categories[i].count, 800, 190 + (i * 90));
            var percentage = round((categories[i].count / totalpopulation) * 100);
            text("Percentage: " +percentage +"%", 800, 215 + (i * 90));
        }
        //end of code written personally
        
    };
    
    this.checkMouse = function()
    {
        for(var i = 0; i < boxes.length; i++)
        {
            for(var j = 0; j < boxes[i].length; j++)
            {
                if(boxes[i][j].category != undefined)
                {
                    var mouseOver = boxes[i][j].mouseOver(mouseX, mouseY);
                    if(mouseOver != false)
                    {
                        push();
                        fill(0);
                        textSize(20);
                        var tWidth = textWidth(mouseOver);
                        textAlign(LEFT, TOP);
                        rect(mouseX, mouseY, tWidth + 20, 40);
                        fill(255);
                        text(mouseOver, mouseX + 10, mouseY + 10);
                        pop();
                        break;
                    }
                }
            }
        }
    };
}