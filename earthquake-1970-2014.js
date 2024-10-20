function EarthquakeTimeSeries()
{
    //Name for visualisation to appear on menu bar
    this.name = 'Earthquake: 1970 - 2014';
    
    //Each visualisation must have a unique ID with no special characters
    this.id = 'earthquake-timeseries';
    
    //Title to display above the plot
    this.title = 'Earthquake: 1970 - 2014';
    
    //Property to represent whether data has been loaded
    this.loaded = false;
    
    //Initialise variables
    var mapimg;
    var years = [];
    var data = [];
    var zoom = 1;
    
    //Preload the data. This function is called automatically by the gallery when visualisation is added
    this.preload = function()
    {
        //Load static map 
        mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/0,0,1,0,0/1034x720?access_token=pk.eyJ1Ijoia2VudDEzIiwiYSI6ImNsczl6dm8yOTBkbGcybHBjc2p5eWI1M3gifQ.cLN8Fa0aDQV4gPzYjovsAA");
        
        var self = this;
        this.data = loadTable('./data/earthquake/earthquakes1970-2014.csv', 'csv', 'header',
                              //Callback function to set the value this.loaded to true
                              function(table)
                              {
            self.loaded = true;
        }
                             );
    };
    
    this.destroy = function()
    {
        this.select.remove();
    }
    
    this.draw = function()
    {
        //Draw title
        if(darkmode == false)
        {
            fill(0);
        }
        else if(darkmode == true)
        {
            fill(255);
        }
        textSize(25);
        textAlign(LEFT);
        text("Earthquakes: 1970 - 2014", 400, 100);
        textSize(15);
        
        //Ensure map is at the center of the canvas
        translate(width / 2, height / 2);
        imageMode(CENTER);
        image(mapimg, 50, 0);
        
        //Traverse through the array
        for(var i = 0; i < data.length; i++)
        {
            //Translate the starting points according to the position of the map
            push();
            translate(50, 0);
            //Draw the dots
            fill(255, 0, 0, 200);
            ellipse(data[i].x, data[i].y, data[i].z);
            pop();
        }
    };
    
    this.setup = function()
    {
        //Initialise years to an empty array
        years = [];
        
        //Get number of years and push it into array
        var year = this.data.getColumn(0);
        for(var i  = 0; i < year.length; i++)
        {
            //Check for repeating years before pushing it into array
            if(year[i] != year[i-1])
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
        
        //Call the data set up function
        this.data_setup();
    };
    
    this.data_setup = function()
    {
        //Initialise data to an empty array
        data = [];
        
        //Retrieve all values in year column
        var year = this.data.getColumn(0);
        //Traverse through year array
        for(var i = 0; i < year.length; i++)
        {
            //Get mercator for central latitude and longitude
            var cx = this.mercatorX(0);
            var cy = this.mercatorY(0);
            //Check if selected year and value in year column match
            if(this.select.value() == year[i])
            {
                //Get longitude from data
                var lon = this.data.get(i, "Longitude");
                //Get x position
                var px = this.mercatorX(lon) - cx;
                //Get latitude from data
                var lat = this.data.get(i, "Latitude");
                //Get y position
                var py = this.mercatorY(lat) - cy;
                //Get magnitude from data
                var mag = this.data.get(i, "Magnitude");
                //Get size of ellipse
                var size = this.mapMag(mag);
                //Create object to store values
                var earthquake = {x: px, y: py, z: size};
                //Push it into data array
                data.push(earthquake);
            }
        }
    };
    
    this.mercatorX = function(lon)
    {
        //Convert longitude to radians
        lon = radians(lon);
        //Formula to get mercatorX
        var x = (256 / PI) * pow(2, zoom);
        var y = lon + PI;
        return x * y;
    };
    
    this.mercatorY = function(lat)
    {
        //Convert latitude to radians
        lat = radians(lat);
        //Formula to get mercatorY
        var x = (256 / PI) * pow(2, zoom);
        var y = tan(PI / 4 + lat / 2);
        var z = PI - log(y);
        return x * z;
    };
    
    this.mapMag = function(mag)
    {
        //Formula to map magnitude of earthquake
        var x = exp(mag / 1.01 - 0.13) * 1000;
        var magmax = exp(10 / 1.01 - 0.13) * 1000;
        var size = map(x, 0, magmax, 0, 190);
        return size;
    };
    
    this.changeYear = function(currentYear)
    {
        //Initialise data to an empty array
        data = [];
        
        //Retrieve all values in year column
        var year = this.data.getColumn(0);
        //Traverse through year array
        for(var i = 0; i < year.length; i++)
        {
            //Get mercator for central latitude and longitude
            var cx = this.mercatorX(0);
            var cy = this.mercatorY(0);
            //Check if current year and value in year column match
            if(currentYear == year[i])
            {
                //Get longitude from data
                var lon = this.data.get(i, "Longitude");
                //Get x position
                var px = this.mercatorX(lon) - cx;
                //Get latitude from data
                var lat = this.data.get(i, "Latitude");
                //Get y position
                var py = this.mercatorY(lat) - cy;
                //Get magnitude from data
                var mag = this.data.get(i, "Magnitude");
                //Get size of ellipse
                var size = this.mapMag(mag);
                //Create object to store values
                var earthquake = {x: px, y: py, z: size};
                //Push it into data array
                data.push(earthquake);
            }
        }
    };
}