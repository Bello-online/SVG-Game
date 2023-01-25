/**
 *  Author: Bello Olaseni.
 * This code adds event listeners to the DOM.
 * Adds events to the svg's and features in html
 * Animate with JavaScript
 * Date: July 27th, 2022.
 */

/** This sets all the variables */
const svgNS = "http://www.w3.org/2000/svg";
const music = new Audio("music.mp3");

const gamesizeX = 700;
const gamesizeY = 450;

let cx = 0;
let cy = 0;


let xspeed = 0;
let yspeed = 0;

let myTimer = null;
let score = 0;

/** Add event and event handlers to the page*/
// ------------------------------------------------------------------------------------------------//
window.addEventListener("load", function () {
  /**Create svg*/
  document.getElementById("begin").addEventListener("click", function () {
    let svg = document.getElementById("game");
    document.getElementById("begin").disabled = true;  // Disable the play button when the game has started
    let ball = myBall();
    svg.prepend(ball);                        // Add the play ball to the svg
    addBallEventListeners();            // Add the listeners that affect the ball

    if (myTimer != null) clearInterval(myTimer);

    myTimer = setInterval(function () {
      // Move the Ball on the screen
      let ball = document.getElementById("ball");
      if (ball != null) {
        cx = cx + xspeed;
        cy = cy + yspeed;
        ball.setAttribute("cx", cx);
        ball.setAttribute("cy", cy);

        let r = Number(ball.getAttribute("r")); // All parameters returned from getatrribute are string
        if (cx + r >= gamesizeX || cx - r <= 0) xspeed = -xspeed;
        if (cy + r >= gamesizeY || cy - r <= 0) yspeed = -yspeed;
      }
    }, 1000 / 30);

    // To start the game
    let start = document.getElementById("begin");
    start.addEventListener("click", myBall);

    let move = document.getElementById("move");
    move.addEventListener("click", moveBall);

    document.getElementById("");

  });
});

// ------------------------------------------------------------------------------------------------//

/** Define the functions to be called */
// ------------------------------------------------------------------------------------------------//

/** 
 * This function plays the music
 */ 
function playMusic() {
  music.play();
  music.loop = true;
}
/** 
 * This functions stops the music
 */ 
function stopMusic() {
  music.pause();
}
/** 
 * This is the function that creates the ball svg.
 */ 
function myBall() {
  let ball = document.createElementNS(svgNS, "circle");
  ball.setAttribute("id", "ball");
// This is the display on which the entire game is played.
  const boardsizeX = gamesizeX;
  const boardsizeY = gamesizeY;

  // Randomioze the ball size and location 
  let radius = 24;
  ball.setAttribute("r", radius);
  cx = Math.floor(Math.random() * (boardsizeX - 2*radius) + radius);
  ball.setAttribute("cx", cx);
  cy = Math.floor(Math.random() * (boardsizeY * 0.75 - 2*radius) + radius);
  ball.setAttribute("cy", cy);

  xspeed = Math.floor(radius / 10);
  yspeed = Math.floor(radius / 10);                         

  // Set the color of the ball so it is visible when the ball is rotated around
  ball.setAttribute("fill", "white");

  // disable play button

  return ball;
}
/** 
 * This is the function that checks if the ball lands within a position and captures it
 * It sets the condition for which a ball is captured.
 * This function also adds up the score and dispalys it in the table
 * @param event
 */ 
function checkCapture(event){
  let rect = event.target;
  
  let vard = setInterval(function(){
    let delta = 30;
    let rectX = rect.getAttribute("x");
    let rectY = rect.getAttribute("y");
    let circX = document.getElementById("ball").getAttribute("cx");
    let circY = document.getElementById("ball").getAttribute("cy");
  
    if( (Math.abs(circX - rectX) < delta && Math.abs(circY - rectY) < delta)){
      score++;
      console.log("You got one more, Score:" + score);
      document.getElementById("score").innerHTML =  score;
    }
  }, 400);

  rect.addEventListener("mouseleave", function(){
    clearInterval(vard);
  });
}
/** 
 * This is the function that allows the movement of the ball around in random positions.
 */ 
function addBallEventListeners(){
  let svg = document.getElementById("game");

  for(let i = 0; i < svg.children.length; i++){
    if(svg.children[i].tagName === "rect"){
      svg.children[i].addEventListener("mouseenter", checkCapture);
    }
  }
}

/** 
 * This is the function that allows the movement of the ball around in random positions.
 * @returns svg element
 */ 
function moveBall() {
  let svg = document.getElementById("game");

  for(let i = 0; i < svg.children.length; i++){
    if(svg.children[i].tagName === "rect"){
      let xRandom = Math.floor(Math.random() * (gamesizeX - 100));
      let yRandom = Math.floor(Math.random() * (gamesizeY - 100));
      svg.children[i].setAttribute("x", xRandom);
      svg.children[i].setAttribute("y", yRandom);
    }
  }
  return svg;
}