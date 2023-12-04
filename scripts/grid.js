const canvas = document.getElementById("grid");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(255, 0, 255, 0.1)";
const gridMaxSize = 120;
const gridMinSize = 2;
const gridResizeStep = 1;
var gridSize = 50;

var mapObjects = [];

var trackMouse = false;

class MapObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    drawRectInGrid(this.x, this.y);
  }
}

function drawLine(startx, starty, endx, endy) {
  ctx.beginPath();
  ctx.moveTo(startx, starty);
  ctx.lineTo(endx, endy);
  ctx.stroke();
}

function drawRect(startx, starty, endx, endy) {
  ctx.beginPath();
  ctx.rect(startx, starty, endx, endy);
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function redrawGrid() {
  clear();
  // drawGrid(gridSize);
  for (let obj of mapObjects) {
    obj.draw();
  }
}

function drawGrid(cellWidth) {
  for (let i = cellWidth; i < canvas.width; i += cellWidth) {
    drawLine(i, 0, i, canvas.height);
  }
  for (let i = cellWidth; i < canvas.height; i += cellWidth) {
    drawLine(0, i, canvas.width, i);
  }
}

function drawBiggerGrid() {
  if (gridSize + gridResizeStep <= gridMaxSize) {
    gridSize += gridResizeStep;
  }
  redrawGrid();
}

function drawSmallerGrid() {
  if (gridSize - gridResizeStep >= gridMinSize) {
    gridSize -= gridResizeStep;
  }
  redrawGrid();
}

// drawGrid(gridSize);

window.addEventListener(
  "wheel",
  function (e) {
    e.preventDefault();
    if (e.deltaY < -50) {
      drawSmallerGrid();
    } else if (e.deltaY > 50) {
      drawBiggerGrid();
    }
  },
  { passive: false }
);

function drawRectInGrid(x, y) {
  var closestX = Math.floor(x / gridSize);
  var closestY = Math.floor(y / gridSize);

  drawRect(closestX * gridSize, closestY * gridSize, gridSize, gridSize);
}

window.addEventListener("mousedown", (e) => {
  trackMouse = true;
});
window.addEventListener("mouseup", (e) => {
  trackMouse = false;
});

window.addEventListener("mousemove", function (e) {
  if (!trackMouse) return;
  var x = e.clientX;
  var y = e.clientY;
  var obj = new MapObject(x, y);
  mapObjects.push(obj);
  obj.draw();
});

function changeColor(r, g, b) {}
