class Sensor
{
    constructor(car)
    {
        this.car = car; // car object
        //this.num_sensors = 30;
        //this.num_sensors = 20;
        this.num_sensors = 3;
        this.sensor_length = 30;
        this.sensor_arc = Math.PI/2; // 45 degree angle between sensors
        this.sensor_readings = [];
        this.sensors = [];
    }

    createSensor(road_x_boundaries)
    {
        this.sensors = [];
        
        for(let i=0; i < this.num_sensors; i++)
        {
            const sensorAngle = linear_interpolation(this.sensor_arc/2, -this.sensor_arc/2, i/(this.num_sensors-1)); 
            
            const start_sensor_segment = {x: this.car.x+(this.car.width/2), y:this.car.y+(this.car.height/3)}; // the sensor starts at the car object x and y position
            const end_sensor_segment = {x: this.car.x + (this.car.width/2) - Math.sin(sensorAngle)*this.sensor_length,
                                        y: this.car.y +(this.car.height/3) - Math.cos(sensorAngle)*this.sensor_length};

            this.sensors.push([start_sensor_segment, end_sensor_segment]); // adds the sensor line segment 
        }

        this.sensor_readings = [];
         
        // will check if the sensor segment has intersected another object
        for (let i=0; i < this.sensor_length; i++)
        {

        }
    }

    // draws each of the sensors at an angle perturding from the car
    drawSensor(ctx)
    {
        for(let i=0; i< this.num_sensors; i++)
        {
            ctx.beginPath();
            ctx.lineWidth = 2;
            
            ctx.strokeStyle = "yellow";
            ctx.moveTo(this.sensors[i][0].x, this.sensors[i][0].y);
            ctx.lineTo(this.sensors[i][1].x, this.sensors[i][1].y);
            ctx.stroke();
        }
    }
}