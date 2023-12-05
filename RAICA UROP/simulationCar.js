class SimulationCar{
    constructor(x, y, width, height, player)
    {
        this.x = x;           // x position of car
        this.y = y;           // y position of car  
        this.width = width;   // width of car
        this.height = height; // height of car
        
        this.player = player; // boolean value indicating if car is player or not
        this.damaged = false;   // confirms whether the car is damaged or not

        this.car_sensors = new Sensor(this); // creates sensor object using car instance
        this.controls = new Controls(player); // no controls for non player cars
                                    
    }

    #createPoints()
    {
        const points = [];

        // let top_left = {x: this.x, y:this.y};
        // let bottom_left = {x: this.x, y: this.y + this.height};
        // let top_right = {x: this.x + this.width, y: this.y};
        // let bottom_right = {x: this.x + this.width, y: this.y + this.height};

        // points.push(top_left);
        // points.push(bottom_left);
        // points.push(top_right);
        // points.push(bottom_right);
        
        // calculates out the points radius of the car
        const radius = Math.hypot(this.width, this.height)/2;
        const angle = Math.atan2(this.width, this.height); 

        //adds objects-> {x, y} to the points array
        points.push({
            x: this.x - Math.sin(-angle)*radius,
            y: this.y - Math.cos(-angle)*radius
        });

        points.push({
            x: this.x - Math.sin(angle)*radius,
            y: this.y - Math.cos(angle)*radius
        });

        points.push({
            x: this.x - Math.sin(Math.PI - angle)*radius,
            y: this.y - Math.cos(Math.PI - angle)*radius
        });

        points.push({
            x: this.x - Math.sin(Math.PI + angle)*radius,
            y: this.y - Math.cos(Math.PI + angle)*radius
        });

        return points
    }

    #isDamaged(road_boundaries)
    {
        // document.write("in is damaged function");
        // checks if car has hit the road borders
        for(let i = 0; i < road_boundaries.length; i++)
        {
            
            if (objectIntersection(this.car_points, road_boundaries[i]))
            {
                return true;
            }

        }
        return false;
    }

    // movePosition(road_boundaries, top, bottom)
    #movePosition()
    {
        // moves the car object's x and y positions
        // bound the carPlayer to the grey road
        // if (this.controls.forward && car.y > 0)
        // if (this.controls.forward && car.y > top)
        if (this.controls.forward)
        {
            if(this.player)
            {
                this.y-=1;
            }

            // makes other car object move at half the speed of player
            else
            {
                this.y-=0.35;
            }
        }

        // bound the carPlayer to the grey road
        // if (this.controls.right && car.x +car.width < (3*WIDTH/4))
        if (this.controls.right)
        {
            this.x+=2;
        }

        // bound the carPlayer to the grey road
        // if (this.controls.backward && car.y + car.height <= bottom)
        if (this.controls.backward)
        {
            this.y+=1;
        }

        // bound the carPlayer to the grey road
        //if (this.controls.left && car.x > (WIDTH/4) + HIGHWAY_LINE_WIDTH)
        //if (this.controls.left && car.x > (WIDTH/4))
        if (this.controls.left)
        {
            this.x-=2;
        }
    }

    updateCar(road_boundaries)
    {
        // stops the car from moving past the road boundaries
        if(!this.damaged)
        {
            this.#movePosition();
            this.car_points = this.#createPoints();
            this.damaged = this.#isDamaged(road_boundaries);
        }

        this.car_sensors.createSensor(road_boundaries)
    }

    drawPlayer(ctx)
    {
        if (this.damaged)
        {
            ctx.fillStyle = "grey";
        }
        else
        {
            ctx.fillStyle = "black";    
        }
        
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.beginPath();
        ctx.moveTo(this.car_points[0].x, this.car_points[0].y);

        for (let i = 1; i < this.car_points.length; i++)
        {
            ctx.lineTo(this.car_points[i].x, this.car_points[i].y);
        }
        ctx.fill();

        this.car_sensors.drawSensor(ctx); // draws on the sensors
    }

    drawTraffic(ctx)
    {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(this.car_points[0].x, this.car_points[0].y);

        for (let i = 1; i < this.car_points.length; i++)
        {
            ctx.lineTo(this.car_points[i].x, this.car_points[i].y);
        }
        ctx.fill();
    }

}