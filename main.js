const size = 5;

let rows = size;
let cols = size;

let grid = new Array(rows);
let vis = new Array(rows);

let openSet = new Map();
let closedSet = new Map();

// cost to get to a node (f)
// h -> heuristic based cost
class cell {

    constructor() {
        this.f = 0;
        this.g = 0;
        this.h = 0;
    }

    disp() {
        
    }
}

function setup() {

    createCanvas(400, 400);

    // Create a 2D grid to represent the graph
    for (let i = 0; i < size; ++i) {
        // grid to store cost
        grid[i] = new Array(cols);

        // matrix to keep count of visited cells
        vis[i] = new Array(cols);

        // each grid point now has a cell object
        // and all nodes are marked unvisited
        for (let j = 0; j < cols; ++j) {
            grid[i][j] = new cell();
            vis[i][j] = 0;
        }
    }
}

function draw() {




    background(0);

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            grid[i][j].disp();
        }
    }
}