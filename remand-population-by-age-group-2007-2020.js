//start of code written personally
function RemandPopulationAgeGroupWaffleChart()
{
    //Name this visualisation to appear in the menu
    this.name = 'Remand Population Age Group: 2007 - 2020';
    
    //Each visualisation must have a special id with no special characters
    this.id = 'remand-population';
    
    //Property to represent whether data has been loaded 
    this.loaded = false;
    
    this.waffles = [];
    
    var years = [];
    var info = [];
    
    //Preload the data. This function is automatically called by the gallery when a visualisation is added
    this.preload = function()
    {
        var self = this;
        this.data = loadTable('./data/remand-population/RemandPopulationbyAgeGroup20062020.csv', 'csv', 'header',
                              //Callback function to set the value this.loaded to true
                              function(table)
                              {
                                  self.loaded = true;
                              }
                             );
    };
    
    this.setup = function()
    {
        //initialise to empty array
        years = [];
        
        //Get number of years and push it into an array
        var year = this.data.getColumn(0);
        for(var i = 0; i < year.length; i++)
        {
            if(year[i] != year[i-1])
            {
                years.push(year[i]);
            }
        }
        
        //Create a select DOM element
        this.select = createSelect();
        this.select.position(350,40);
        
        //Fill the option with all the years
        for(var i = 0; i < years.length; i++)
        {
            this.select.option(years[i]);
        }
        
        //Call the change year function when select option is changed
        this.select.changed(() =>
                            {
                                this.changeYear(this.select.value());
                            });
        
        this.data_setup();
    };
    
    this.data_setup = function()
    {   
        //Initialise data to an empty array
        info = [];
        
        //Retrieve values from year column
        var year = this.data.getColumn(0)
        for(var i = 0; i < year.length; i++)
        {
            if(this.select.value() == year[i])
            {
                //Get category
                var category = this.data.getString(i, "population_by_age_group");
                //Get population 
                var population = this.data.getNum(i, "number_of_population");
                var row = {x:category, y:population};
                info.push(row);
            }
        }
        
        //Get the total amount of boxes need
        var population = 0;
        for(var i = 0; i < info.length; i++)
        {
            population += info[i].y;
        }
        //square root it to find width and height
        var boxes = ceil(sqrt(population));
        
        var w_x = this.layout.startX;
        var w_y = this.layout.startY;
        var w_height = this.layout.waffleHeight;
        var w_width = this.layout.waffleWidth;
        //Create new waffle with variables
        var w = new Waffle(w_x, w_y, w_width, w_height, boxes, boxes, info, this.select.value());
        //Push w into this.waffles array
        this.waffles.push(w);
    };
    
    this.changeYear = function(currentYear)
    {
        //Initialise data to an empty array
        info = [];
        //Ensure w = null
        var w = null;
        
        //Retrieve values from year column
        var year = this.data.getColumn(0)
        for(var i = 0; i < year.length; i++)
        {
            if(currentYear == year[i])
            {
                //Get category
                var category = this.data.getString(i, "population_by_age_group");
                //Get population 
                var population = this.data.getNum(i, "number_of_population");
                var row = {x:category, y:population};
                info.push(row);
            }
        }
        
        //Get the total amount of boxes need
        var population = 0;
        for(var i = 0; i < info.length; i++)
        {
            population += info[i].y;
        }
        //square it to find width and height
        var boxes = ceil(sqrt(population));
        
        var w_x = this.layout.startX;
        var w_y = this.layout.startY;
        var w_height = this.layout.waffleHeight;
        var w_width = this.layout.waffleWidth;
        //Create new waffle with variables
        var w = new Waffle(w_x, w_y, w_width, w_height, boxes, boxes, info, this.select.value());
        //Push w into this.waffles array
        this.waffles.push(w);
    };
    
    this.destroy = function()
    {
        this.select.remove();
    };
    
    this.draw = function()
    {
        if(!this.loaded)
        {
            console.log("Data not loaded yet");
            return;
        }
        
        //Draw waffle chart
        stroke(0);
        for(var i = 0; i < this.waffles.length; i++)
        {
            var w = this.waffles[i];
            w.draw();
        }
        
        //Check for mouseOver
        for(var i = 0; i < this.waffles.length; i++)
        {
            var w = this.waffles[i];
            w.checkMouse(mouseX, mouseY);
        }
        
        //Heading
        if(darkmode == false)
        {
            fill(0);
        }
        else if(darkmode == true)
        {
            fill(255);
        }
        textSize(25);
        text("Remand Population By Age(2007 - 2020)", this.layout.startX + 200, this.layout.startY - 30);
    };
    
    this.layout = 
    {
        startX: 50,
        startY: 120,
        waffleWidth: 700,
        waffleHeight: 500,
    }
}
//end of code written personally