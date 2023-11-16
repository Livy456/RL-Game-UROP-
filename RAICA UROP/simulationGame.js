// main javascript file
const canvas = document.getElementById("car_game_design");
const lr_slider = document.getElementById("lr_slider"); // get the learning rate slider
const context = canvas.getContext("2d");

let gameState = "highway";
const WIDTH = 550;
const HEIGHT = 150;
// Cause of error, for some reason the width and height attributes were messing up code
// canvas.width = 500;
// canvas.height = 150;


// setting up the default road look
// WILL PUT INTO A METHOD LATER

// for some reason the image is not being added to the canvas 
var carImage = new Image(); // creates a new image object
carImage.src = 'carAvatar.png';

// MAKE SURE TO CREATE A CLASS OR AN OBJECT WITH A SERIES OF STATES AND ACTIONS
// THAT THE CAR CAN TAKE DURING THE CAR SIMULATION
const HIGHWAY_LINE_WIDTH = 5;
const HIGHWAY_LANE_COUNT = 3;
const CAR_WIDTH = 25;
const CAR_HEIGHT = 15;

// Instantiate Objects for game
const highway = new Road(WIDTH/2, 10, HIGHWAY_LANE_COUNT, "highway"); // instantiates a road instance
// const x_position_middle_lane_start = linear_interpolation(highway.left, highway.right, 1);
// const x_center_position = x_position_middle_lane_start - (WIDTH / highway.number_lanes); 
// document.write(x_position_middle_lane_start);
const car = new SimulationCar(WIDTH/2 - 10, HEIGHT/2, CAR_WIDTH, CAR_HEIGHT, true); // put the car in the middle of the page
// document.write("After the highway instantiation")

// const x_center_position = highway.centerOfLane(1);
// const car = new simulationCar(x_center_position, HEIGHT/2, CAR_WIDTH, CAR_HEIGHT, true); // put the car in the middle of the right lane
// document.write("After the car instantiation")

function animateGame()
{
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    // FIGURE OUT HOW TO TRANSLATE THE DASHED LINES SO IT LOOKS LIKE THE HIGHWAY IS MOVING
    // RIGHT NOW THE DASHED LINES TURN INTO SOLID LINES WHEN TRYING TO TRANSLATE THE SCREEN
    // IN RELATION TO THE CAR
    
    oldx = car.x
    oldy = car.y
    
    car.movePosition(highway.road_x_boundaries); // moves x and y position of car object
    // make the highway seem like it's moving
    context.save();
    context.translate(0, -car.y + HEIGHT / 2); // CAR GETS STUCK IN THE MIDDLE OF THE SCREEN SINCE
                                                  // THE CAVAS IS TRANSLATED TO THAT POINT IN THE SCREEN 
    highway.drawHighwayRoad(context);   // draws the highway state for the game
    car.drawPlayer(context);    // redraws the car object on the canvas
    context.restore();
    requestAnimationFrame(animateGame); // repeatedly runs function, to make the game appear animated    
}

animateGame();