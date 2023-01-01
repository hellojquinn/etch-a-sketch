const grid = document.getElementById('grid');

const initialColumns = 16;
const initialRows = 16;
const squareSize = 25;

for (let row = 0; row < initialRows; row++) {
    for (let col = 0; col < initialColumns; col++) {
        const div = document.createElement('div');
        div.style.width = `${squareSize}px`;
        div.style.height = `${squareSize}px`;
        div.style.border = '1px solid black';
        div.addEventListener('mouseover', function(event) {
            event.target.style.backgroundColor = 'black';
        });
        grid.appendChild(div);
    }
}

grid.style.gridTemplateColumns = `repeat(${initialColumns}, 1fr)`;
grid.style.gridTemplateRows = `repeat(${initialRows}, 1fr)`;
grid.style.width = `${initialColumns * squareSize}px`;
grid.style.height = `${initialRows * squareSize}px`;


