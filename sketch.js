
// Global variable to store the gallery object. The gallery object is
// a container for all the visualisations.
var gallery;
//Create global variable for dark/light mode
var dark;
var light;
var darkmode = false;

function setup() 
{
    // Create a canvas to fill the content div from index.html.
    canvasContainer = select('#app');
    var c = createCanvas(1024, 1024);
    c.parent('app');

    // Create a new gallery object.
    gallery = new Gallery();

    // Add the visualisation objects here.
    gallery.addVisual(new TechDiversityRace());
    gallery.addVisual(new TechDiversityGender());
    gallery.addVisual(new PayGapByJob2017());
    gallery.addVisual(new PayGapTimeSeries());
    gallery.addVisual(new ClimateChange());
    gallery.addVisual(new GSTTimeSeries());
    gallery.addVisual(new RemandPopulationAgeGroupWaffleChart());
    gallery.addVisual(new EarthquakeTimeSeries());
    
    //Create button for light or dark mode
    dark = createButton('Dark');
    dark.position(1350, 35);
    light = createButton('Light');
    light.position(1400, 35);
}

function draw() 
{   
    if(darkmode == false)
    {
        background(255);
    }
    else if(darkmode == true)
    {
        background(36, 37, 38);
    }
    
    if (gallery.selectedVisual != null) 
    {
        gallery.selectedVisual.draw();
    }
    
    //Function when light button is clicked
    light.mousePressed(() => 
    {
        //Initialise dark mode flag to false
        darkmode = false;
        //Change style of container div
        var container = select("#app")
        container.style('background-color', "white");
        container.style('color', "black");
    });
    
    //Function when dark button is clicked
    dark.mousePressed(() =>
    {
        //Initialise dark mode flag to true
        darkmode = true;
        //Change style of container div
        var container = select("#app")
        var colour = color(36, 37, 38);
        container.style('background-color', colour);
        container.style('color', "white");
    });
}
