const arenaEl = document.getElementById('arena');
const arena = arenaEl.getContext('2d');
arena.fillStyle = 'blue';
arena.fillRect(0, 0, arenaEl.width, arenaEl.height);
arena.fillStyle = 'black';
arena.fillRect(5, 5, 640, 480);
arena.clearRect(5, 5, 640, 480);


// arena.strokeStyle = "blue";
// arena.strokeRect(0, 0, 640, 480);

const lazers = [
  {
    color: 'lime',
    x: 7,
    y: 7,
    xDirection: 1,
    yDirection: 0,
    keyUp: 38,
    keyDown: 40,
    keyLeft: 37,
    keyRight: 39,
    isAlive: true,  
  },
  {
    color: 'red',
    x: 642,
    y: 482,
    xDirection: -1,
    yDirection: 0,
    keyUp: 87,
    keyDown: 83,
    keyLeft: 65,
    keyRight: 68,
    isAlive: true,  
  },
]

function changeDirection(lazer, keyPressed) {
  switch(keyPressed) {
    case lazer.keyUp: // up
      if (lazer.xDirection === 0) break;
      lazer.xDirection = 0;
      lazer.yDirection = -1; 
      break;
    case lazer.keyDown: //down
      if (lazer.xDirection === 0) break;
      lazer.xDirection = 0;
      lazer.yDirection = 1; 
      break;
    case lazer.keyLeft: // left
      if (lazer.yDirection === 0) break;
      lazer.xDirection = -1;
      lazer.yDirection = 0; 
      break;
    case lazer.keyRight: //right
      if (lazer.yDirection === 0) break;
      lazer.xDirection = 1;
      lazer.yDirection = 0; 
      break;
    default: 
      //no change was triggered
      return false;
  }
  // a change was triggered
  return true; 
}

function nextSpaceIsOccupied(lazer) {
  const {x, y, xDirection, yDirection} = lazer;

  let space; 
  if (xDirection === 1) space = arena.getImageData(x+2, y, 1, 2);
  if (xDirection === -1) space = arena.getImageData(x-1, y, 1, 2);
  if (yDirection === 1) space = arena.getImageData(x, y+2, 2, 1);
  if (yDirection === -1) space = arena.getImageData(x, y-1, 2, 1);

  let isEmpty = 0;
  space.data.forEach( dataItem => isEmpty += dataItem)
  return Boolean(isEmpty); 
}

setInterval(() => {
  let collisionWasDetected = false; 
  
  lazers.forEach((lazer) => {
    if (lazer.isAlive && nextSpaceIsOccupied(lazer)) {
      lazer.isAlive = false; 
      collisionWasDetected = true;
      console.log(`${lazer.color} is dead`);
    } else if (lazer.isAlive) {
      lazer.x = lazer.x + lazer.xDirection;
      lazer.y = lazer.y + lazer.yDirection; 
      arena.fillStyle = lazer.color;
      arena.fillRect(lazer.x, lazer.y, 2, 2);
    }
  });
}, 25);

document.onkeydown = (event) => {
  lazers.forEach( lazer => {
    const changeWasTriggered = changeDirection(lazer, event.keyCode);
    // if this was a game event then don't trigger any other browser events
    if (changeWasTriggered) event.preventDefault();
  });
};


// function draw(timestamp) {
//   console.log(timestamp);
//   window.requestAnimationFrame(draw); 
// }

// draw(); 
//arena.clearRect(0, 0, 640, 480);
