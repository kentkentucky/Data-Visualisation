//start of code written personally
function Bubble(_name, _percentage)
{
    this.name = _name;
    this.percentage = _percentage;
    this.size = 20;
    this.pos = createVector(random(100, width - 100), random(100, height - 100));
    this.velocity = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
    this.r = this.size * 0.1;

    this.draw = function()
    {
        textAlign(CENTER);
        noStroke();
        //Draw green bubble for percentages over 0
        if(this.percentage > 0)
        {
            fill(0, 255, 0, 100);
            ellipse(this.pos.x, this.pos.y, this.size);
            fill(200, 200, 200, 150);
            ellipse(this.pos.x, this.pos.y, this.size * 0.9);
            fill(255, 255, 255, 150);
            ellipse(this.pos.x, this.pos.y, this.size * 0.75);
            if(darkmode == false)
            {
                fill(0);
            }
            else if(darkmode == true)
            {
                fill(255);
            }
            text(this.name, this.pos.x, this.pos.y);
            text(this.percentage + "%", this.pos.x, this.pos.y + 20);
        }
        //Draw red bubble for percentages less than 0
        else if(this.percentage < 0)
        {
            fill(255, 0, 0, 100);
            ellipse(this.pos.x, this.pos.y, this.size);
            fill(200, 200, 200, 150);
            ellipse(this.pos.x, this.pos.y, this.size * 0.9);
            fill(255, 255, 255, 150);
            ellipse(this.pos.x, this.pos.y, this.size * 0.75);
            if(darkmode == false)
            {
                fill(0);
            }
            else if(darkmode == true)
            {
                fill(255);
            }
            text(this.name, this.pos.x, this.pos.y);
            text(this.percentage + "%", this.pos.x, this.pos.y + 20);
        }
        //Draw blue bubbles for percentages 0
        else
        {
            fill(0, 0, 255, 100);
            ellipse(this.pos.x, this.pos.y, this.size);
            fill(200, 200, 200, 150);
            ellipse(this.pos.x, this.pos.y, this.size * 0.9);
            fill(255, 255, 255, 150);
            ellipse(this.pos.x, this.pos.y, this.size * 0.75);
            if(darkmode == false)
            {
                fill(0);
            }
            else if(darkmode == true)
            {
                fill(255);
            }
            text(this.name, this.pos.x, this.pos.y);
            text(this.percentage + "%", this.pos.x, this.pos.y + 20);
        }
    };

    this.setData = function(v)
    {
        //Map size for positive percentages
        if(v > 0)
        {
            this.size = map(v, 1, 100, 50, 400);
        }
        //Map size for negative percentages
        else if(v < 0)
        {
            this.size = map(v, -1, -100, 50, 400);
        }
    };

    this.update = function(_bubbles)
    {
        //Update bubbles if it is not paused
        if(paused == false)
        {
            //Traverse bubbles array
            for(var i = 0; i < _bubbles.length; i++)
            {
                //Ensure that the specific bubble is not checking against itself
                if(this.name != _bubbles[i].name)
                {
                    //Distance between 2 bubbles
                    var d = dist(this.pos.x, this.pos.y, _bubbles[i].pos.x, _bubbles[i].pos.y);
                    //Minimum distance
                    var c = this.size / 2 + _bubbles[i].size / 2;
                    //check for bubbles coming in contact with each other
                    if(d < c)
                    {
                        //change the direction of the bubble 
                        this.velocity.mult(-1);
                        _bubbles[i].velocity.mult(-1);
                    }
                }
                //check if bubbles come in contact with left and right wall
                if(_bubbles[i].pos.x > width - _bubbles[i].size / 2 || _bubbles[i].pos.x < _bubbles[i].size)
                {
                    //change the direction of x towards opposite side
                    _bubbles[i].velocity.x *= -1;
                }
                //check if bubble come in contact with top or bottom wall
                if(_bubbles[i].pos.y > height - _bubbles[i].size / 2 || _bubbles[i].pos.y < _bubbles[i].size)
                {
                    //change direction of y
                    _bubbles[i].velocity.y *= -1;
                }
                //add velocity to position
                _bubbles[i].pos.add(_bubbles[i].velocity);
            }
            this.pos.add(this.velocity);
        }  
    };

    this.showData = function(_bubbles, _data)
    {
        //traverse through bubbles array
        for(var i = 0; i < _bubbles.length; i++)
        {
            //check distance between mouse and bubble
            var d = dist(mouseX, mouseY, _bubbles[i].pos.x, _bubbles[i].pos.y);
            //condition for mouse over bubble
            if(d < _bubbles[i].size / 2)
            {
                //check for correct bubble 
                if(_bubbles[i].name == this.name)
                {
                    //display information on the right if bubble is on the left of screen
                    if(this.pos.x < width / 2)
                    {
                        fill(100, 100, 100, 150);
                        rect(this.pos.x + this.size / 2, this.pos.y - 20, 510, 70);
                        if(darkmode == false)
                        {
                            fill(0);
                        }
                        else if(darkmode == true)
                        {
                            fill(255);
                        }
                        textSize(18);
                        textAlign(LEFT);
                        text('No. of Businesses: ' + _data[i].x, this.pos.x + this.size / 2 + 10, this.pos.y);
                        text('Percentage of Businesses in Net GST Refund Position: ' + _data[i].y + '%', this.pos.x + this.size / 2 + 10, this.pos.y + 20);
                        text('Net GST Contributions: $' + _data[i].z, this.pos.x + this.size / 2 + 10, this.pos.y + 40);
                        textSize(15);
                    }
                    //display information on the left if the bubble is on the right of the screen
                    else if(this.pos.x > width / 2)
                    {
                        fill(100, 100, 100, 150);
                        rect(this.pos.x - this.size / 2 - 515, this.pos.y - 20, 510, 70);
                        if(darkmode == false)
                        {
                            fill(0);
                        }
                        else if(darkmode == true)
                        {
                            fill(255);
                        }
                        textSize(18);
                        textAlign(LEFT);
                        text('No. of Businesses: ' + _data[i].x, this.pos.x - this.size / 2 - 500, this.pos.y);
                        text('Percentage of Businesses in Net GST Refund Position: ' + _data[i].y + '%', this.pos.x - this.size / 2 - 500, this.pos.y + 20);
                        text('Net GST Contributions: $' + _data[i].z, this.pos.x - this.size / 2 - 500, this.pos.y + 40);
                        textSize(15);
                    }
                }
            }
        }
    };
    //end of code written personally
    
    this.checkCollision = function(bubble)
    {
        //Get distance between the bubble components
        var distVect = p5.Vector.sub(bubble.pos, this.pos);

        //Calculate magnitude of the vector separating the balls
        var distVectMag = distVect.mag();

        //Minimum distance before they are touching
        var minDist = this.size / 2 + bubble.size / 2;

        if(distVectMag < minDist)
        {
            var distCorrection = (minDist - distVectMag) / 2;
            var d = distVect.copy();
            var correctionVect = d.normalize().mult(distCorrection);
            bubble.pos.add(correctionVect);
            this.pos.sub(correctionVect);

            //Get angle of distanceVect
            var theta = distVect.heading();
            //Precalculate trig values
            var sine = sin(theta);
            var cosine = cos(theta);

            //bTemp will hold rotated ball this.pos
            var bTemp = [new p5.Vector(), new p5.Vector()];

            //this.pos is relative to the other so you can use the vector between them (bVect) as the reference point in the rotation expressions. bTemp[0].this.pos.x and bTemp[0].this.pos.y will intialise automatically to 0, which is what you want since b[1] will rotate around b[0]
            bTemp[1].x = cosine * distVect.x + sine * distVect.y;
            bTemp[1].y = cosine * distVect.y - sine * distVect.x;

            //Rotate temporary velocities
            var vTemp = [new p5.Vector(), new p5.Vector()];

            vTemp[0].x = cosine * this.velocity.x + sine * this.velocity.y;
            vTemp[0].y = cosine * this.velocity.y - sine * this.velocity.x;
            vTemp[1].x = cosine * bubble.velocity.x + sine * bubble.velocity.y;
            vTemp[1].y = cosine * bubble.velocity.y - sine * bubble.velocity.x;

            //Now that velocities are rotated, you can use 1D conservation of momentum equations to calculate the final this.velocity along the x-axis
            var vFinal = [new p5.Vector(), new p5.Vector()];

            //Final rotated this.velocity for b[0]
            vFinal[0].x = ((this.r - bubble.r) * vTemp[0].x + 2 * bubble.r * vTemp[1].x) / (this.r + bubble.r);
            vFinal[0].y = vTemp[0].y;

            vFinal[1].x = ((bubble.r - this.r) * vTemp[1].x + 2 * this.r * vTemp[0].x) / (this.r + bubble.r);

            //Hack to avoid clumping
            bTemp[0].x += vFinal[0].x;
            bTemp[1].x += vFinal[1].x;

            //Rotate ball this.pos and velocities back. Reverse sign in trig expressions to rotate in the opposite direction
            var bFinal = [new p5.Vector(), new p5.Vector()];

            bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
            bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
            bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
            bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

            //Update balls to screen this.pos
            bubble.pos.x = this.pos.x + bFinal[1].x;
            bubble.pos.y = this.pos.y + bFinal[1].y;

            this.pos.add(bFinal[0]);

            //update velocities
            this.velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
            this.velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
            bubble.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
            bubble.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
        }
    };
}

//start of code written personally
//create flag to represent pause
var paused = false;

function keyPressed()
{
    //check if space is clicked
    if(keyCode == 32)
    {
        //check if animation is paused
        if(paused == false)
        {
            //stop the bubbles
            paused = true;
        }
        //check if animation is paused
        else if(paused == true)
        {
            //make the bubbles move again
            paused = false;
        }
    }
}
//end of code written personally