const container = document.getElementById('container');
const grid = document.getElementById('grid');

const drawButton = document.querySelector('.tool-button[data-tool="draw"]');
const eraseButton = document.querySelector('.tool-button[data-tool="erase"]');
const colorDropperButton = document.querySelector('.tool-button[data-tool="color-dropper"]');

let currentTool = 'draw';

let selectedColor = '#000000';
let colorPicker = document.getElementById('color-picker');


//Buttons within the GUI.
colorPicker.addEventListener('change', function(event) {
  selectedColor = colorPicker.value;  
  currentTool = 'draw';
  drawButton.classList.add('selected');
  eraseButton.classList.remove('selected');
  colorDropperButton.classList.remove('selected');
});

drawButton.addEventListener('click', function() {
  currentTool = 'draw';
  drawButton.classList.add('selected');
  eraseButton.classList.remove('selected');
  colorDropperButton.classList.remove('selected');
});

eraseButton.addEventListener('click', function() {
  currentTool = 'erase';
  eraseButton.classList.add('selected');
  drawButton.classList.remove('selected');
  colorDropperButton.classList.remove('selected');
});

colorDropperButton.addEventListener('click', function() {
  currentTool = 'color-dropper';
  eraseButton.classList.remove('selected');
  drawButton.classList.remove('selected');
  colorDropperButton.classList.add('selected');
});

document.getElementById('clear').addEventListener('click', function() {
  currentTool = 'draw';
  drawButton.classList.add('selected');
  eraseButton.classList.remove('selected');
  colorDropperButton.classList.remove('selected');
  createGrid(currentSetting.rows, currentSetting.cols);
});


//Mouse events to draw.
grid.addEventListener('mousedown', function(event) {
  if (event.target.matches('div')) {
    if (currentTool === 'draw') {
      selectedColor = colorPicker.value;
      event.target.style.backgroundColor = selectedColor;
    } else if (currentTool === 'erase') {
      event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    } else if (currentTool === 'color-dropper') {
      if (event.target.matches('div')) {
        const backgroundColor = event.target.style.backgroundColor;
        if (backgroundColor) {
          const hexColor = rgbToHex(backgroundColor);
          colorPicker.value = hexColor;
        }
      }
    }
  }
});

grid.addEventListener('mousemove', function(event) {
  if (event.buttons === 1) {
    if (event.target.matches('div')) {
      if (currentTool === 'draw') {
        event.target.style.backgroundColor = selectedColor;
      } else if (currentTool === 'erase') {
        event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      } 
    }
  }
});



//Color picker uses RBG output. This function converts it to hexadecimal to allow its b/g color to be changed.
function rgbToHex(rgb) {
  
  const r = parseInt(rgb.match(/\d+/g)[0], 10);
  const g = parseInt(rgb.match(/\d+/g)[1], 10);
  const b = parseInt(rgb.match(/\d+/g)[2], 10);

  
  const hexR = r.toString(16).padStart(2, '0');
  const hexG = g.toString(16).padStart(2, '0');
  const hexB = b.toString(16).padStart(2, '0');

  
  return `#${hexR}${hexG}${hexB}`;
}



//Create grid using div cells of 16x16.
function createGrid(rows = 16, columns = 16) {
  
  grid.classList.remove('fade-in');

  setTimeout(function() {
    //Clear existing grid.
    grid.innerHTML = '';
  

  const squareSize = container.offsetWidth / columns;

  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const div = document.createElement('div');
      div.style.width = `${squareSize}px`;
      div.style.height = `${squareSize}px`;

      grid.appendChild(div);
    }
  }

  grid.style.gridTemplateColumns = `repeat(${columns}, ${squareSize}px)`;
  grid.style.gridTemplateRows = `repeat(${rows}, ${squareSize}px)`;
  grid.style.width = `${columns * squareSize}px`;
  grid.style.height = `${rows * squareSize}px`;

  grid.classList.add('fade-in');
  }, 500);
}


//Update grid size of rows/columns based on which case.
let currentSetting;

function updateGridSize(setting) {

  currentTool = 'draw';
  drawButton.classList.add('selected');
  eraseButton.classList.remove('selected');
  colorDropperButton.classList.remove('selected');


  switch (setting) {
    case 'setting-1':
      currentSetting = { rows: 16, cols: 16 };
      createGrid(currentSetting.rows, currentSetting.cols);
      break;
    case 'setting-2':
      currentSetting = { rows: 32, cols: 32 };
      createGrid(currentSetting.rows, currentSetting.cols);
      break;
    case 'setting-3':
      currentSetting = { rows: 64, cols: 64 };
      createGrid(currentSetting.rows, currentSetting.cols);
      break;
    case 'setting-4':
      currentSetting = { rows: 128, cols: 128 };
      createGrid(currentSetting.rows, currentSetting.cols);
      break;
  }
}


document.getElementById('setting-1').addEventListener('click', function() {
    updateGridSize('setting-1');
});

document.getElementById('setting-2').addEventListener('click', function() {
  updateGridSize('setting-2');
});

document.getElementById('setting-3').addEventListener('click', function() {
  updateGridSize('setting-3');
});

document.getElementById('setting-4').addEventListener('click', function() {
  updateGridSize('setting-4');
});


//Save functionality for both white and transparent background by converting the grid to canvas.
const backgroundRadioButtons = document.querySelectorAll('input[name="background"]');

let selectedBackground = 'white';

backgroundRadioButtons.forEach(function(radioButton) {
  radioButton.addEventListener('change', function(event) {
    selectedBackground = event.target.value;
  });
});


function saveImage(transparentBackground) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  
  canvas.width = grid.clientWidth;
  canvas.height = grid.clientHeight;

  
  if (transparentBackground) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  } else {
    ctx.fillStyle = '#ffffff';
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  
  Array.from(grid.children).forEach(square => {
    const x = square.offsetLeft;
    const y = square.offsetTop;
    const width = square.offsetWidth;
    const height = square.offsetHeight;
    const color = square.style.backgroundColor;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  });

  
  const dataURL = canvas.toDataURL();

  
  const a = document.createElement('a');
  a.download = 'pixelpad.png';
  a.href = dataURL;
  a.click();
}

document.getElementById('save-button').addEventListener('click', function() {
  const radioValue = document.querySelector('input[name="background"]:checked').value;
  const backgroundColor = radioValue === 'white' ? '#ffffff' : 'rgba(0, 0, 0, 0)';

  html2canvas(grid, {
    backgroundColor: backgroundColor,
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'pixelpad.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});

//Default settings on page load.
drawButton.classList.add('selected');
updateGridSize('setting-1');

