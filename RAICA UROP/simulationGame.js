// main javascript file
const canvas = document.getElementById("car_game_design");
const lr_slider = document.getElementById("lr_slider"); // get the learning rate slider
const context = canvas.getContext("2d");

let gameState = "highway";
const WIDTH = 550;
const HEIGHT = 150;
// Cause of error, for some reason the width and height attributes were messing up code
// canvas.width = 500;  // might need to do context.canvas.width = 500;
// canvas.height = 150; // // might need to do context.canvas.height = 150;

// for some reason the image is not being added to the canvas 
var carImage = new Image(); // creates a new image object
carImage.src = 'carAvatar.png';

// MAKE SURE TO CREATE A CLASS OR AN OBJECT WITH A SERIES OF STATES AND ACTIONS
// THAT THE CAR CAN TAKE DURING THE CAR SIMULATION
const HIGHWAY_LINE_WIDTH = 5;
const HIGHWAY_LANE_COUNT = 3;
const CAR_WIDTH = 35;
const CAR_HEIGHT = 15;

// Instantiate Objects for game
const highway = new Road(WIDTH/2, 10, HIGHWAY_LANE_COUNT, "highway", CAR_WIDTH); // instantiates a road instance
const car = new SimulationCar(WIDTH/2+10, HEIGHT/2, CAR_WIDTH, CAR_HEIGHT, true); // put the car in the middle of the page
const traffic = [
    new SimulationCar(WIDTH/2 + 10, -HEIGHT/2, CAR_WIDTH, CAR_HEIGHT, false),
    new SimulationCar(WIDTH/2 + 10, -3*HEIGHT/2, CAR_WIDTH, CAR_HEIGHT, false),
    new SimulationCar(WIDTH/2 + 10, HEIGHT/8, CAR_WIDTH, CAR_HEIGHT, false),
];
// const x_position_middle_lane_start = linear_interpolation(highway.left, highway.right, 1);
// const x_center_position = x_position_middle_lane_start - (WIDTH / highway.number_lanes); 
// document.write(x_position_middle_lane_start);
// const x_center_position = highway.centerOfLane(1);
// const car = new simulationCar(x_center_position, HEIGHT/2, CAR_WIDTH, CAR_HEIGHT, true); // put the car in the middle of the right lane

function animateGame()
{
    context.clearRect(0, 0, context.canvas.width, context.canvas.height) // resets the canvas so the moving objects don't blend into one long line
    
    for(let i = 0; i < traffic.length; i++)
    {
        traffic[i].updateCar(highway.road_boundaries, []);
    }

    car.updateCar(highway.road_boundaries, traffic); // updates the position of the car
    // car.movePosition(highway.road_boundaries, highway.topRoad, highway.bottomRoad); // moves x and y position of car object


    // make the highway seem like it's moving
    context.save();
    context.translate(0, -car.y + 3*HEIGHT / 4); // WEIRD 1 PIXEL HORIZONTAL BLUE LINE FORMS ON THE CANVAS
    // context.translate(0, -car.y + HEIGHT / 2) // LOOKS NORMAL
                                 
    highway.drawHighwayRoad(context);   // draws the highway state for the game
    
    // document.write("highway is drawn")
    for (let j=0; j < traffic.length; j++)
    {
        // document.write("inside the for loop")
        // document.write("this is car object for traffic: ", traffic[j]);
        traffic[j].drawTraffic(context); 
        // document.write("on no!!")
    }
    
    // document.write("I drew all the traffic");
    car.drawPlayer(context);    // redraws the car object on the canvas
    context.restore();
    requestAnimationFrame(animateGame); // repeatedly runs function, to make the game appear animated    
}

animateGame();