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
context.fillStyle = "lime";
context.fillRect(0, 0, WIDTH/4, HEIGHT);
context.fillStyle = "lime";
context.fillRect(0, 0, WIDTH/4, HEIGHT);
context.fillStyle = "lime";
context.fillRect(3*WIDTH/4, 0, WIDTH/4, HEIGHT);
context.fillStyle = "#AFAFAF";
context.fillRect(WIDTH/4, 0, WIDTH/2, HEIGHT);


//document.write(context);
// document.write("Before the car")
document.write("Hello");
// CLASS CAR IS NOT BEING RECOGNIZED, CAN'T INSTANTITATE IT

const car = new Car(WIDTH/2, HEIGHT/2, 15, 10, true); // put the car in the middle of the page
document.write("After the car")

function animateHighway()
{
    document.write("I am in the game animate method javascript");
    car.movePosition();
    car.draw(context);
    //canvas.height = window.innerHeight;
    requestAnimationFrame();
}

animateHighway();

//let car = new Image(); // new Car(100, 100, 30, 50);
//car.src = 'carAvatar.png'; // car.draw(ctx);



// 
// const canvas = document.getElementById("car_game_design");
// const context = canvas.getContext("2d");
// var carImage = new Image(); // creates a new image object
// carImage.src = 'carAvatar.png';
// // var carImage = document.getElementById("car")
// // carImage.innerHTML = moveTo(canvas.width/2 + 15, canvas.height/2 + 10);
// //document.write(document.getElementsByClassName("car_game_design").getContext("2d").height)
// var delayTime = 1000;   // delay for 1 second
// //var gameState = "start";
// var gameState = "highway";
// //var states = map();
// // make a map with the state,action pairs
// height = 600


// // main backdrop for the road
// context.fillStyle = "lime";
// context.fillRect(0, 0, canvas.width/4, height);
// context.fillStyle = "lime";
// context.fillRect(3*canvas.width/4, 0, canvas.width/4, height);
// context.fillStyle = "#AFAFAF";
// context.fillRect(canvas.width/4, 0, canvas.width/2, height);
// context.fillStyle = "";
// //carImage.move(canvas.width/2 + 15, canvas.height/2 + 10)
// carImage.onload = () => {
//     context.drawImage(carImage, canvas.width/2 + 30,
//     canvas.height/2 + 10, 55, 30);    
// }
// // figure out how to rotate image
// //carImage.style.transform = "rotate(180deg)";

// // makes a timeout function to delay animations/actions by one second
// // I can insert a function to be executed after second delay
// setTimeout(function(){}, delayTime);

// //function for game simulation loop
// function game(height, move)
// {
//     // give variable descriptions of everything
//     // make a function to reset the design of the canvas
//     // this will give the animation effect, need to figure out a
//     // time delay so it doesn't look like vertical lines are glitching out
//     //context.clearRect(0, 0, canvas.width, height);

//     // checks what state the game is in
//     if (gameState === "highway")
//     {
//         // performs the animation for the highway game state
//         var loopCount = 0
//         while(gameState === "highway")
//         {
//             loopCount+=1
//             // drawing vertical lines
//             for (var yPos= height; yPos >= 0; yPos--)
//             {
//                 // draw highway dividing lines in center of canvas
//                 // will have to incorporate a shift amount to continually, show
//                 // vertical lines moving
//                 // while also performing the animation will need to check to
//                 // see if the car has crashed, if yes update game state
//                 // and 
//                 //document.write(yPos)
//                 // creates spaces between the white vertical lines
//                 if(yPos%3 === 0 && yPos !== 0)
//                 {
//                     context.fillStyle = "white";
//                     const shift = height - yPos/3;
//                     //var shiftedY = yPos-shift;
//                     //const shiftedY = yPos-shift;
//                     const shiftedY = (yPos - shift)%height; 
//                     // figure out how to make it look like 
//                     // the vertical lines are moving

//                     context.fillRect(canvas.width/2, shiftedY, 2, 3);
                                                
//                 }
                
//                 // do a for loop to initialize the
//             }

//             if (loopCount === 1000)
//             {
//                 break;
//             }
//         }
        
//     } 

//     // changes the animation based on the game state
//     // states of game-> highway, street lights, and construction sight
    
//     requestAnimationFrame(game);
// }

// // Start the car driving game
// // maybe call a one second delay before every call to the game
// game(height, 0);
