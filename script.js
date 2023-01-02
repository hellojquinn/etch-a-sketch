const container = document.getElementById('container');
const grid = document.getElementById('grid');

const squareSize = 15.625;

function createGrid(rows, columns) {
  // Clear existing grid squares
  grid.innerHTML = '';

  // Calculate square size based on container size and number of rows and columns
  const squareSize = container.offsetWidth / columns;

  // Generate new grid squares
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const div = document.createElement('div');
      div.style.width = `${squareSize}px`;
      div.style.height = `${squareSize}px`;
      div.style.border = '0.1px solid black';
      div.addEventListener('mouseover', function(event) {
        event.target.style.backgroundColor = 'black';
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

function updateGridSize(setting) {
    switch (setting) {
        case 'setting-1':
            createGrid(16, 16);
            break;
        case 'setting-2':
            createGrid(32, 32);
            break;
        case 'setting-3':
            createGrid(64, 64);
            break;
        case 'setting-4':
            createGrid(128, 128);
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