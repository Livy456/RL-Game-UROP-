class Sensor
{
    constructor(car)
    {
        this.car = car; // car object
        //this.num_sensors = 30;
        //this.num_sensors = 20;
        this.num_sensors = 5;
        this.sensor_length = 40;
        this.sensor_arc = Math.PI/4; // 90 degree angle between sensors
        this.sensor_readings = [];
        this.sensors = [];
    }

    createSensor(road_x_boundaries)
    {
        this.sensors = [];
        
        for(let i=0; i < this.num_sensors; i++)
        {
            const sensorAngle = linear_interpolation(this.sensor_arc/1, -this.sensor_arc/1, i/(this.num_sensors-1)); 
            
            const start_sensor_segment = {x: this.car.x+(this.car.width/2), y:this.car.y+(this.car.height/3)}; // the sensor starts at the car object x and y position
            const end_sensor_segment = {x: this.car.x + (this.car.width/2) - Math.sin(sensorAngle)*this.sensor_length,
                                        y: this.car.y +(this.car.height/3) - Math.cos(sensorAngle)*this.sensor_length};

            this.sensors.push([start_sensor_segment, end_sensor_segment]); // adds the sensor line segment 
        }

        this.sensor_readings = [];
         
        // will check if the sensor segment has intersected another object
        for (let i=0; i < this.sensors.length; i++)
        // for(let i=0; i < this.num_sensors; i++)
        {
            const sensor_reading = this.get_sensor_readings(this.sensors[i], road_x_boundaries);
            this.sensor_readings.push(sensor_reading);
        }
    }

    get_sensor_readings(sensor, road_boundaries)
    {
        let all_intersections = [];

        for(let i=0; i < road_boundaries.length; i++)
        {
            // if no intersections this function will return none
            // if there is an intersection then getIntersection returns, object -> x, y, offset
            // sensor[0] => start object
            // sensor[1] => end object
            // road_boundaries[i][0] => left side of road object
            // road_boundaries[i][1] => right side of road object
            const intersection = getIntersection(sensor[0], sensor[1], road_boundaries[i][0], road_boundaries[i][1]);
            
            // checks for any intersections
            if (intersection)
            {
                all_intersections.push(intersection);
            }
        }

        // checks if sensors are intersecting no other objects
        if(all_intersections.length === 0)
        { 
            return null; // no intersections
        }
        else
        {
            let offsets = [];

            for (let i=0; i < all_intersections.length; i++)
            {
                offsets.push(all_intersections[i].offset); // gets the offset attribute from each intersection object
            }

            // find the minimum offset so that you can find the closets object that the car is sensing

            // const minimum_offset = Math.min(offsets); // unsure if Math.min can unpack an array if we have to 
            let minimum_offset = 100000;

            for (let i=0; i < offsets.length; i++)
            {
                const offset_value = offsets[i];

                if (offset_value < minimum_offset)
                {
                    minimum_offset = offset_value;
                }
            }
            // iterate through each minimum_offset value and check which is smallest

            // finds the closest object that the car is sensing
            const closest_object = all_intersections.find(element => element.offset === minimum_offset);
            return closest_object
        }
    }

    // draws each of the sensors at an angle perturding from the car
    drawSensor(ctx)
    {
        for(let i=0; i< this.num_sensors; i++)
        {
            const start = this.sensors[i][0];
            let end = this.sensors[i][1]; // can be modified
            const previous_end = this.sensors[i][1];
            // document.write("In draw Sensor method in sensor class");
            // document.write("In draw Sensor method in sensor class: ", this.readings);
            // checks if this sensor has a reading, i.e. intersecting with another object 
            // document.write("sensor reading for i: ", i, " ", this.sensor_readings[i]);
            // no sensor reading
            if (this.sensor_readings[i])
            {
                end = this.sensor_readings[i]; // sets end to the object -> x, y, offset
            }

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            // ctx.lineTo(previous_end.x, previous_end.y);
            ctx.stroke();

            // THE SENSOR STOPS DETECTING OTHER OBJECTS AFTER A CERTAIN DISTANCE

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "red";
            ctx.moveTo(previous_end.x, previous_end.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }
}