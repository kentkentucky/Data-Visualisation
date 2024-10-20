function Checkbox(_name, _female, _male, _lineY, _lineHeight)
{
    this.name = _name;
    this.female = _female;
    this.male = _male;
    this.lineY = _lineY;
    this.lineHeight = _lineHeight;
    
    //Default visualisation colours
    this.femaleColour = color(255, 0, 0);
    this.maleColour = color(0, 255, 0);
    
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
    
    this.draw = function()
    {
        //Create checkbox
        this.checkbox = createCheckbox(this.name, true);
        //Position checkbox
        this.checkbox.position(this.layout.leftMargin + 190, this.lineY + 12);
    };
    
    this.mapPercentToWidth = function(percent)
    {
        return map(percent, 0, 100, 0, this.layout.plotWidth());
    };
    
    this.update = function()
    {
        //Check if checkbox is checked
        if(this.checkbox.checked())
        {
            //Draw female employees rectangle
            fill(this.femaleColour);
            rect(this.layout.leftMargin,
                 this.lineY,
                 this.mapPercentToWidth(this.female),
                 this.lineHeight - this.layout.pad);
            
            if(mouseX >= this.layout.leftMargin && mouseX <= this.layout.leftMargin + this.mapPercentToWidth(this.female) && mouseY >= this.lineY && mouseY <= this.lineY + (this.lineHeight - this.layout.pad))
            {
                if(darkmode == false)
                {
                    fill(0);
                }
                else if(darkmode == true)
                {
                    fill(255);
                }
                text(this.female + "%", mouseX, mouseY);
            }
            
            //Draw male employees rectangle
            fill(this.maleColour);
            rect(this.layout.leftMargin + this.mapPercentToWidth(this.female),
                 this.lineY,
                 this.mapPercentToWidth(this.male),
                 this.lineHeight - this.layout.pad);
            
            if(mouseX >= this.layout.leftMargin + this.mapPercentToWidth(this.female) && mouseX <= this.layout.leftMargin + this.mapPercentToWidth(this.female) + this.mapPercentToWidth(this.male) && mouseY >= this.lineY && mouseY <= this.lineY + (this.lineHeight - this.layout.pad))
            {
                if(darkmode == false)
                {
                    fill(0);
                }
                else if(darkmode == true)
                {
                    fill(255);
                }
                text(this.male + "%", mouseX, mouseY);
            }
        }
        else
        {
            if(darkmode == false)
            {
                fill(255);
            }
            else if(darkmode == true)
            {
                fill(36, 37, 38);
            }
            //Draw empty rectangle
            rect(this.layout.leftMargin,
                 this.lineY,
                 this.layout.plotWidth(),
                 this.lineHeight - this.layout.pad);
        }
    };
}