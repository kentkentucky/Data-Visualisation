function TechDiversityGender()
{
    //Name for the visualisation to appear in the menu bar
    this.name = 'Tech Diversity: Gender';
    
    //Each visualisation must have a unique ID with no special characters
    this.id = 'tech-diversity-gender';
    
    //initialise variables
    var checkboxes = [];
    
    //Layout objects to store all common plot layout parameters and methods
    this.layout = 
    {
        //Margin positions around the plot. Left and bottom margins are bigger so there is space for axxis and tick labels on the canvas
        leftMargin: 130,
        rightMargin: width,
        topMargin: 30,
        bottomMargin: height,
        pad: 5,
        
        plotWidth: function()
        {
            return this.rightMargin - this.leftMargin;
        },
        
        //Boolean to enable/disable background grid
        grid: true,
        
        //Number of axis ticks labels to draw so that they are not drawn on top of one another
        numXTickLabels: 10,
        numYTickLabels: 8,
    };
    
    //Middle of the plot: for 50% line
    this.midX = (this.layout.plotWidth() / 2) + this.layout.leftMargin;
    
    //Default visualisation colours
    this.femaleColour = color(255, 0, 0);
    this.maleColour = color(0, 255, 0);
    
    //Property to represent whether data has been loaded
    this.loaded = false;
    
    //Preload the data. This function is called automatically by the gallery when a visualisation is added
    this.preload = function()
    {
        var self = this;
        this.data = loadTable('./data/tech-diversity/gender-2018.csv', 'csv', 'header',
                             //Callback function to set the value this.loaded to true.
                             function(table) 
                             {
            self.loaded = true;
        });
    };
    
    this.destroy = function()
    {
        //Traverse checkboxes array
        for(var i = 0; i < checkboxes.length; i++)
        {
            //Remove checkbox
            checkboxes[i].checkbox.remove();
        }
    };
    
    this.setup = function()
    {
        //Call this.data_setup
        this.data_setup();
        
        //Traverse checkboxes array
        for(var i = 0; i < checkboxes.length; i++)
        {
            //Draw checkboxes
            checkboxes[i].draw();
        }
    }
    
    this.data_setup = function()
    {
        //initialise checkboxes to an empty array
        checkboxes = [];
        
        //Font defaults
        textSize(16);
        
        var lineHeight = (height - this.layout.topMargin) / this.data.getRowCount();
        
        //Loop over every row in the data
        for(var i = 0; i < this.data.getRowCount(); i++)
        {
            //Calculate the y position for each company
            var lineY = (lineHeight * i) + this.layout.topMargin;
            //Get name of company
            var name = this.data.getString(i, "company");
            //Get number of female
            var female = this.data.getNum(i, "female");
            //Get number of male
            var male = this.data.getNum(i, "male");
            //Create new checkbox
            var b = new Checkbox(name, female, male, lineY, lineHeight);
            //Push into array
            checkboxes.push(b);
        }
    };
    
    this.draw = function()
    {
        if(!this.loaded)
        {
            console.log('Data not yet loaded');
            return;
        }
        
        //Draw female/male labels at the top of the plot
        this.drawCategoryLabels();
        
        //Traverse through checkboxes array
        for(var i = 0; i < checkboxes.length; i++)
        {
            //Check for updates
            checkboxes[i].update();
        }
        
        //Draw 50% line
        if(darkmode == false)
        {
            stroke(150);
        }
        else if(darkmode == true)
        {
            stroke(255);
        }
        strokeWeight(1);
        line(this.midX, this.layout.topMargin, this.midX, this.layout.bottomMargin);
        
    };
    
    this.drawCategoryLabels = function()
    {
        if(darkmode == false)
        {
            fill(0);
        }
        else if(darkmode == true)
        {
            fill(255);
        }
        
        noStroke();
        textAlign('left', 'top');
        text('Female', this.layout.leftMargin, this.layout.pad);
        textAlign('center', 'top');
        text('50%', this.midX, this.layout.pad);
        textAlign('right', 'top');
        text('Male', this.layout.rightMargin, this.layout.pad);
    };
}