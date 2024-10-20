function PieChart(x, y, outerDiameter, innerDiameter) {

    this.x = x;
    this.y = y;
    this.outerDiameter = outerDiameter;
    this.innerDiameter = innerDiameter;
    this.labelSpace = 30;

    this.get_radians = function(data) {
        var total = sum(data);
        var radians = [];

        for (let i = 0; i < data.length; i++) {
            radians.push((data[i] / total) * TWO_PI);
        }

        return radians;
    };

    this.draw = function(data, labels, colours, title) {

        // Test that data is not empty and that each input array is the
        // same length.
        if (data.length == 0) {
            alert('Data has length zero!');
        } else if (![labels, colours].every((array) => {
            return array.length == data.length;
        })) {
            alert(`Data (length: ${data.length})
Labels (length: ${labels.length})
Colours (length: ${colours.length})
Arrays must be the same length!`);
        }

        // https://p5js.org/examples/form-pie-chart.html

        var angles = this.get_radians(data);
        var lastAngle = 0;
        var colour;

        for (var i = 0; i < data.length; i++) {
            if (colours) {
                colour = colours[i];
            } else {
                colour = map(i, 0, data.length, 0, 255);
            }

            fill(colour);
            stroke(0);
            strokeWeight(1);

            //Outer circle
            noStroke();
            arc(this.x, this.y,
                this.outerDiameter, this.outerDiameter,
                lastAngle, lastAngle + angles[i] + 0.001); // Hack for 0!
            
            //start of code written personally
            //Draw inner circle to give it a donut effect
            noStroke();
            fill(255);
            arc(this.x, this.y,
                this.innerDiameter, this.innerDiameter,
                lastAngle, lastAngle + angles[i] + 0.001); // Hack for 0!
            stroke(0);
            //end of code written personally

            if (labels) {
                this.makeLegendItem(labels[i], i, colour);
            }

            lastAngle += angles[i];
        }

        if (title) {
            noStroke();
            textAlign('center', 'center');
            textSize(24);
            text(title, this.x, this.y - this.outerDiameter * 0.65);
        }
    };

    this.makeLegendItem = function(label, i, colour) {
        var x = this.x + 80 + this.outerDiameter / 2;
        var y = this.y + (this.labelSpace * i) - this.outerDiameter / 3;
        var boxWidth = this.labelSpace / 2;
        var boxHeight = this.labelSpace / 2;

        fill(colour);
        rect(x, y, boxWidth, boxHeight);

        if(darkmode == false)
        {
            fill('black');
        }
        else if(darkmode == true)
        {
            fill('white');
        }
        noStroke();
        textAlign('left', 'center');
        textSize(12);
        text(label, x + boxWidth + 10, y + boxWidth / 2);
        
    };
    
    //start of code written personally
    //Create mouseover function to show percentage
    this.mouseOver = function(data, colours)
    {
        var angles = this.get_radians(data);
        var lastAngle = 0;
        var colour;
        
        for(var i = 0; i < data.length; i++)
        {
            //Get distance between mouse and circle
            var d = dist(mouseX, mouseY, this.x, this.y);
            //Check if mouse is on donut chart
            if(d < outerDiameter / 2 && d > innerDiameter / 2)
            {
                //Get angle of mouse respective to centre of donut chart
                var mouseAngle = atan2(mouseY - this.y, mouseX - this.x);
                //Normalise angle to 0, 2PI
                mouseAngle = (mouseAngle + TWO_PI) % TWO_PI;
                var endAngle = lastAngle + angles[i] + 0.001;
                //Check angle of mouse is within section
                if(mouseAngle > lastAngle && mouseAngle < endAngle)
                {
                    //Map colour accordingly
                    if(colours) 
                    {
                        colour = colours[i];
                    } else 
                    {
                        colour = map(i, 0, data.length, 0, 255);
                    }
                    //Show percentages
                    var percentage = round(data[i]);
                    fill(colour);
                    stroke(0);
                    textSize(20);
                    if(percentage != 0)
                    {
                       text(percentage +"%", this.x + cos(lastAngle + angles[i] / 2) * (this.outerDiameter / 1.8),
                       this.y + sin(lastAngle + angles[i] / 2) * (this.outerDiameter / 1.75));
                    }
                }
            }
            lastAngle += angles[i];
        }
    };
    //end of code written personally
}
