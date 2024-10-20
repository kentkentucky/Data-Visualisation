//start of code written personally
function GSTTimeSeries()
{
    //Name for the visualisation to appear in menu bar
    this.name = 'GST by Economic Sector: 2004 - 2022';

    //Each visualisation must have a unique ID with no special characters
    this.id = 'gst-timeseries';

    //Title to display above the plot
    this.title = 'GST by Economic Sector: 2004 - 2022';

    //Property to represent whether data has been loaded
    this.loaded = false;

    var bubbles = [];
    var years = [];
    var data = [];

    //Preload the data. This function is called automatically by the gallery when a visualisation is added
    this.preload = function()
    {
        var self = this;
        this.data = loadTable('./data/gst/GSTByEconomicSector.csv', 'csv', 'header',
                              //Callback function to set the value this.loaded to true
                              function(table)
                              {
            self.loaded = true;
        }
                             );
    };

    this.setup = function()
    {   
        years = [];

        //Get the numbers of years and push it into an array
        var year = this.data.getColumn(0);
        for(var i = 0; i < year.length; i++)
        {
            //Check for repeating years before pushing it into array
            if(year[i] != year[i - 1])
            {
                years.push(year[i]);
            }
        }

        //Create a select DOM element.
        this.select = createSelect();
        this.select.position(350, 40);

        //Fill the options with all the years
        for(var i = 0; i < years.length; i++)
        {
            this.select.option(years[i]);
        }

        //Call the change year function when select option is changed
        this.select.changed(() => 
                            {
            this.changeYear(this.select.value());
        });

        //Call the data setup function
        this.data_setup();
    };

    this.destroy = function()
    {
        this.select.remove();
    };

    this.draw = function()
    {
        if(!this.loaded)
        {
            console.log("Data not loaded yet.");
            return;
        }

        for(var i = 0; i < bubbles.length; i++)
        {
            bubbles[i].update(bubbles);
            bubbles[i].draw();
            bubbles[i].showData(bubbles, data);
        }
        
        fill(0);
        textSize(25);
        text("GST by Economic Sector(2004 - 2022)", 550, 50);
        textSize(15);
    };

    this.data_setup = function()
    {
        //Make sure array is empty at the start
        bubbles = [];
        data = [];

        //Retrieve values from year column
        var year = this.data.getColumn(0);
        //Traverse the year array
        for(var i = 0; i < year.length; i++)
        {
            //Check array against selected value for matching years
            if(this.select.value() == year[i])
            {
                //Get the economic sector
                var sector = this.data.getString(i, "economic_sector");
                //Get percentage of net gst contribution
                var percentage = Number(this.data.get(i, "percentage_of_net_gst_contribution"));
                //Create new bubble
                var b = new Bubble(sector, percentage);
                //Push percentage into setData function
                b.setData(percentage);
                //Push the bubbles into the array
                bubbles.push(b);
                //Get number of businesses
                var businesses = this.data.get(i, "no_of_businesses");
                //Get percentage of businesses in net get refund position
                var refund = this.data.get(i, "percentage_of_businesses_in_net_gst_refund_position");
                //Get net gst contribution
                var contribution = this.data.get(i, "net_gst_contribution");
                //Create an object to store all three values
                var sectordata = {x: businesses, y: refund, z: contribution};
                //Push object into data array
                data.push(sectordata);
                //Push bubbles and data into showData function
                b.showData(bubbles, data);
            }
        }
    };

    this.changeYear = function(currentYear)
    {
        //Ensure bubbles and data array are empty
        bubbles = [];
        data = [];

        //Get the values from the year column
        var year = this.data.getColumn(0);
        //Traverse the year array
        for(var i = 0; i < year.length; i++)
        {
            //Ensure b equals null
            var b = null;
            //Check if values in year array matches selected value
            if(currentYear == year[i])
            {
                //Get economic sector
                var sector = this.data.getString(i, "economic_sector");
                //Get percentage of net gst contribution
                var percentage = Number(this.data.get(i, "percentage_of_net_gst_contribution"));
                //Assign b to a new bubble
                var b = new Bubble(sector, percentage);
                //Push percentage into setData function
                b.setData(percentage);
                //Push new bubble into bubbles array
                bubbles.push(b);
                //Get the number of businesses
                var businesses = this.data.get(i, "no_of_businesses");
                //Get the percentage of businesses in net gst refund position
                var refund = this.data.get(i, "percentage_of_businesses_in_net_gst_refund_position");
                //Get net gst contribution
                var contribution = this.data.get(i, "net_gst_contribution");
                //Create object to store all 3 values
                var sectordata = {x: businesses, y:refund, z:contribution};
                //Push object into data array
                data.push(sectordata);
                //Push bubbles and data into showData function
                b.showData(bubbles, data); 
            }
        }
    };
}
//end of code written personally