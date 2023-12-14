class Sensor
{
    constructor(car)
    {
        this.car = car; // car object
        this.num_sensors = 5; 
        // this.num_sensors = 3
        // this.num_sensors = 30; 
        this.sensor_length = 40;
        this.sensor_arc = Math.PI/2; // 90 degree angle between sensors
        // this.sensor_arc = Math.PI*2; // 360 degree 
        this.sensor_readings = [];
        this.sensors = [];
    }

    updateSensor(road_x_boundaries)
    {
        this.#createSensor();
        
        this.sensor_readings = [];
        // left road boundary x is 97.5
        // right road boundary x is 452.5
        // document.write("left road boundary x: ", road_x_boundaries[0][0].x); 
        // document.write("right road boundary x: ", road_x_boundaries[1][0].x);

        // will check if the sensor segment has intersected another object
        for(let i=0; i < this.num_sensors; i++)
        {
            const sensor_reading = this.get_sensor_readings(this.sensors[i], road_x_boundaries);
            this.sensor_readings.push(sensor_reading);
            

            // START OF DEBUGGING STATEMENTS!!!
            // if (i %10 === 0)
            // {
            //     document.write("sensor start x: ", this.sensors[i][0].x, " sensor end x: ", this.sensors[i][1].x);
            //     document.write("sensor reading: ", sensor_reading.x);
            // }
            // END OF DEBUGGING STATEMENTS!!!
        }
    }
    #createSensor()
    {
        this.sensors = [];
        
        for(let i=0; i < this.num_sensors; i++)
        {
            const sensorAngle = linear_interpolation(this.sensor_arc/2, -this.sensor_arc/2, i/(this.num_sensors-1)); 
            // const sensorAngle = linear_interpolation(Math.PI, -Math.PI, i/(this.num_sensors-1)); // 360 sensing capability

            const start_sensor_segment = {x: this.car.car_points[0].x - this.car.width/2,
                                          y: this.car.car_points[0].y + this.car.height/2}
            // const start_sensor_segment = {x: this.car.car_points[0].x,
                                        //   y: this.car.car_points[0].y}

            const end_sensor_segment = {x: this.car.car_points[0].x - this.car.width/2- Math.sin(sensorAngle) * this.sensor_length,
            // const end_sensor_segment = {x: this.car.car_points[0].x - Math.sin(sensorAngle) * this.sensor_length,
                                        y: this.car.car_points[0].y + this.car.height/2 - Math.cos(sensorAngle) * this.sensor_length};       
            
            // const start_sensor_segment = {x: this.car.x, y: this.car.y}; // the sensor starts at the car object x and y position
            // const end_sensor_segment = {x: this.car.x - Math.sin(sensorAngle)*this.sensor_length,
            //                             y: this.car.y  - Math.cos(sensorAngle)*this.sensor_length};

            // document.write("start sensor x: ", start_sensor_segment.x, " end sensor x: ", end_sensor_segment.x, "; ")
            this.sensors.push([start_sensor_segment, end_sensor_segment]); // adds the sensor line segment 
        }
    }

    get_sensor_readings(sensor, road_boundaries)
    {
        let all_intersections = [];

        // for(let i=0; i < road_boundaries.length; i++)
        // {
        //     // if no intersections this function will return none
        //     // if there is an intersection then getIntersection returns, object -> x, y, offset
        //     // sensor[0] => start object
        //     // sensor[1] => end object
        //     // road_boundaries[i][0] => left side of road object
        //     // road_boundaries[i][1] => right side of road object

        //     // [top_left_road, bottom_left_road] -> left boundary
        //     // [top_right_road, bottom_right_road] -> right boundary
        //     // document.write("sensors file, get sensor readings method!!!");
        //     // const intersection = carIntersectRoad(sensor, road_boundaries[i][0], road_boundaries[i][1]);
        //     const intersection = getIntersection(sensor[0], sensor[1], road_boundaries[i][0], road_boundaries[i][1]);
        //     // const intersection = objectIntersection(sensor, road_boundaries[i])
            
    
        //     // checks for any intersections
        //     if (intersection)
        //     {
        //         // document.write("car sensor class, get sensor reading method, intersection detected!!!");
        //         // intersection is being detected!!!
        //         all_intersections.push(intersection);
        //     }
        // }
        // document.write("before intersection check!!");
        // const intersection = getIntersection(sensor[0], sensor[1], road_boundaries[0], road_boundaries[1]);
        const intersection = carIntersectRoad(sensor, road_boundaries[0], road_boundaries[1], this.car);
        // document.write("after intersection check!!");
        if (intersection)
        {
            // document.write("car sensor class, get sensor reading method, intersection detected!!!");
            // intersection is being detected!!!
            all_intersections.push(intersection);
        }


        // checks if sensors are intersecting no other objects
        if(all_intersections.length === 0)
        { 
            return null; // no intersections
        }

        else
        {
            let offsets = [];

            // add all the offsets from the sensor to object
            for (let i=0; i < all_intersections.length; i++)
            {
                offsets.push(all_intersections[i].offset); // gets the offset attribute from each intersection object
            }

            // const minimum_offset = Math.min(offsets); // unsure if Math.min can unpack an array if we have to 
            let minimum_offset = 100000;

            // iterate through each offset value and check which is smallest
            for (let i=0; i < offsets.length; i++)
            {
                const offset_value = offsets[i];

                if (offset_value < minimum_offset)
                {
                    minimum_offset = offset_value;
                }
            }

            // finds the closest object that the car is sensing
            const closest_object = all_intersections.find(element => element.offset === minimum_offset);

            // for some reason closest_object is detects one object on the far right and one on the far left
            // document.write("closest object (x, y): ", closest_object.x, " , ", closest_object.y, "\n ");
            // document.write("car (x, y): ", this.car.x, " , ", this.car.y, "\n ")
            // document.write("\n");

            
            
            

            return closest_object
        }
    }

    // draws each of the sensors at an angle pertruding from the car
    drawSensor(ctx)
    {
        for(let i=0; i < this.num_sensors; i++)
        {
            const start = this.sensors[i][0];
            let end = this.sensors[i][1]; // can be modified
            const previous_end = this.sensors[i][1];
            
            if (this.sensor_readings[i])
            {
                // document.write("sensor has read an intersection!!");
                end = this.sensor_readings[i]; // sets end to the object -> x, y, offset
                // document.write("sensor reading, end.x: ", end.x, " end.y: ", end.y);
            }

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(previous_end.x, previous_end.y);
            ctx.stroke();

            // colors the intersection region of sensor red 
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "red";
            ctx.moveTo(previous_end.x, previous_end.y);
            ctx.lineTo(end.x, end.y);
            // ctx.moveTo(end.x, end.y);
            // ctx.lineTo(previous_end.x, previous_end.y);
            ctx.stroke();

        }
    }
}