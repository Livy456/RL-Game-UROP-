class SimulationCar{
    constructor(x, y, width, height, player)
    {
        this.x = x;           // x position of car
        this.y = y;           // y position of car  
        this.width = width;   // width of car
        this.height = height; // height of car
        this.player = player; // boolean value indicating if car is player or not

        this.car_sensors = new Sensor(this); // creates sensor object using car instance

        this.controls = new Controls();
    }

    movePosition(road_x_boundaries, top, bottom)
    {
        // moves the car object's x and y positions
        // bound the carPlayer to the grey road
        // if (this.controls.forward && car.y > 0)
        if (this.controls.forward && car.y > top)
        {
            this.y-=1;
        }

        // bound the carPlayer to the grey road
        // if (this.controls.right && car.x +car.width < (3*WIDTH/4) - HIGHWAY_LINE_WIDTH)
        if (this.controls.right && car.x +car.width < (3*WIDTH/4))
        {
            this.x+=2;
        }

        // bound the carPlayer to the grey road
        // if (this.controls.backward && car.y + car.height <= HEIGHT)
        if (this.controls.backward && car.y + car.height <= bottom)
        {
            this.y+=1;
        }

        // bound the carPlayer to the grey road
        //if (this.controls.left && car.x > (WIDTH/4) + HIGHWAY_LINE_WIDTH)
        if (this.controls.left && car.x > (WIDTH/4))
        {
            this.x-=2;
        }

        // document.write("In move player method in car class");
        this.car_sensors.createSensor(road_x_boundaries)
        // document.write("In move player method in car class");
    }

    drawPlayer(ctx)
    {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        this.car_sensors.drawSensor(ctx); // draws on the sensors
    }

}