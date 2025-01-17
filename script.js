const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const hitButton = document.getElementById("hitButton");
const resetButton = document.getElementById("resetButton");

let arrowX = 500; // Initial X position of arrow
const arrowY = 200; // Arrow is always in the middle Y position
const circleX = 100; // X position of the circle
const circleY = 200; // Y position of the circle (same as arrow Y)
const circleRadius = 80;
let arrowSpeed = 0; // Arrow speed, initially zero (so it doesn't move)
let circleColor = getRandomColor(); // Random color for the circle

// Function to generate random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to draw the circle
function drawCircle() {
  ctx.beginPath();
  ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
  ctx.fillStyle = circleColor;
  ctx.fill();
  ctx.closePath();
}

// Function to draw the arrow
function drawArrow() {
  const arrowLength = 60;
  const dx = circleX - arrowX;
  const dy = circleY - arrowY;
  angle = Math.atan2(dy, dx); // Calculate the angle between arrow and circle

  // Save the current canvas state before rotating
  ctx.save();

  // Translate to the arrow's location before rotating
  ctx.translate(arrowX, arrowY);
  ctx.rotate(angle);

  // Draw the arrow
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-arrowLength, -20); // Arrowhead line 1
  ctx.lineTo(-arrowLength, 20); // Arrowhead line 2
  ctx.closePath();
  ctx.fillStyle = "black";
  ctx.fill();

  // Restore the canvas to its original state (pre-rotation)
  ctx.restore();
}

// Function to detect collision
function isCollision() {
  return arrowX <= circleX + circleRadius;
}

// Function to reset the canvas to initial state
function reset() {
  arrowX = 500;
  arrowSpeed = 0;
  circleColor = getRandomColor();
  drawScene();
}

// Function to draw the full scene (circle + arrow)
function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  drawCircle();
  drawArrow();
}

// Function to update the position of the arrow
function update() {
  if (isCollision()) {
    arrowSpeed = 0;
    circleColor = getRandomColor(); // Change the circle color
  } else {
    arrowX -= arrowSpeed;
  }
  drawScene();
}

// Animation loop
function animate() {
  update();
  requestAnimationFrame(animate);
}

// Event listener for the Hit button
hitButton.addEventListener("click", () => {
  arrowSpeed = 4; // Set the arrow speed
});

// Event listener for the Reset button
resetButton.addEventListener("click", reset);

// Initial drawing of the scene
drawScene();
animate();
