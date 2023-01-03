const container = document.getElementById('container');
const grid = document.getElementById('grid');

function createGrid(rows = 16, columns = 16) {
  // Clear existing grid squares
  grid.innerHTML = '';

  const containerWidth = container.offsetWidth;
  const squareSize = containerWidth / columns;

  // Generate new grid squares
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const div = document.createElement('div');
      div.style.width = `${squareSize}px`;
      div.style.height = `${squareSize}px`;

      div.addEventListener('mousedown', function(event) {
        event.target.style.backgroundColor = 'black';
      });
      
      div.addEventListener('mousemove', function(event) {
        if (event.buttons === 1) {
          event.target.style.backgroundColor = 'black';
        }
      });
      grid.appendChild(div);
    }
  }

  // Update grid dimensions
  grid.style.gridTemplateColumns = `repeat(${columns}, ${squareSize}px)`;
  grid.style.gridTemplateRows = `repeat(${rows}, ${squareSize}px)`;
  grid.style.width = `${columns * squareSize}px`;
  grid.style.height = `${rows * squareSize}px`;
}


let currentSetting;

function updateGridSize(setting) {
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

document.getElementById('clear').addEventListener('click', function() {
  createGrid(currentSetting.rows, currentSetting.cols);
});


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


updateGridSize('setting-1');

