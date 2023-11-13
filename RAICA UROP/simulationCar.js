class Car{
    constructor(x, y, width, height, player)
    {
        this.x = x;           // x position of car
        this.y = y;           // y position of car  
        this.width = width;   // width of car
        this.height = height; // height of car
        this.player = player; // boolean value indicating if car is player or not

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 4;
        this.friction = 0.1;
        this.angle = 0;

        this.controls = new Controls();
    }

    movePosition(){
        document.write("I am in the car move position method javascript");
        if (this.controls.forward)
        {
            this.y-=2;
            // this.speed += this.acceleration;
        }

        if (this.controls.right)
        {
            this.x+=2;
        }

        if (this.controls.backward)
        {
            this.y+=2;
            // this.speed -= this.acceleration;
        }

        if (this.controls.left)
        {
            this.x-=2;
        }
        
        // upper bound speed of car
        if (this.speed > this.maxSpeed)
        {
            this.speed = this.maxSpeed;
        }

        if (this.speed < -this.maxSpeed/2)
        {
            this.speed = -this.maxSpeed/2
        }

        if (this.speed > 0)
        {
            this.speed-= this.friction;
        }

        if (this.speed < 0)
        {
            this.speed += this.friction;
        }

        if (Math.abs(this.speed) < this.friction)
        {
            this.speed = 0;
        }
    }

    draw(ctx)
    {
        // ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.fillRect(this.x - this.width,
        //          this.y - this.height,
        //          this.width,
        //          this.height);
        // ctx.fillrE();
    }

}