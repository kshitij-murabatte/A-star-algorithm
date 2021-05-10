const size = 20;

let rows = size, cols = size;

let grid = new Array(rows);
let vis = new Array(rows);

const dirX = [1, -1, 0, 0];
const dirY = [0, 0, 1, -1];

let openSet = new Set();
let closedSet = new Set();

let w, h;

let start, end;

// cost to get to a node (f)
// h -> heuristic based cost
class cell {

    constructor(i, j) {
        this.i = i;
        this.j = j;

        this.f = 0;
        this.g = 0;
        this.h = 0;

        this.prev = undefined;
    }

    disp(color) {
        fill(color);
        noStroke();
        rect(this.i * w, this.j * h, w - 1, h - 1);
    }
}

function heuristic(point) {
    return abs(point.i - end.i) + abs(point.j - end.j);
}

let current, dummy = new cell(-1, -1);
dummy.f = Infinity;

function setup() {

    createCanvas(400, 400);

    w = width / cols;
    h = height / rows;

    // Create a 2D grid to represent the graph
    for (let i = 0; i < size; ++i) {
        // grid to store cost
        grid[i] = new Array(cols);

        // matrix to keep count of visited cells
        vis[i] = new Array(cols);

        // each grid point now has a cell object
        // and all nodes are marked unvisited
        for (let j = 0; j < cols; ++j) {
            grid[i][j] = new cell(i, j);
            vis[i][j] = false;
        }
    }

    start = grid[0][0];
    end = grid[rows - 1][cols - 1];

    openSet.add(start);
}

function valid(x, y) {
    if (x < 0 || y < 0 || x >= rows || y >= cols) return false;
    if (vis[x][y]) return false;
    
    vis[x][y] = true;
    return true;
}

function draw() {

    if (openSet.size > 0) {

        // get cell minimum f
        current = dummy;

        for (let item of openSet) {
            if (item.f < current.f) {
                current = item;
            }
        }

        if (current === end) {
            noLoop();
            console.log("Ovarida!");
        }

        openSet.delete(current);
        closedSet.add(current);

        let cX = current.i, cY = current.j;

        vis[cX][cY] = true;
    
        for (let i = 0; i < 4; ++i) {

            let _x = cX + dirX[i];
            let _y = cY + dirY[i];

            if (valid(_x, _y)) {
                
                let toGo = grid[_x][_y];
                let update = current.g + 1;
                
                toGo.g = min(toGo.g, update);
                toGo.h = heuristic(toGo);
                toGo.f = toGo.h + toGo.g;
                
                toGo.prev = current;

                openSet.add(toGo);
            }
        }
    }

    background(0);

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            grid[i][j].disp(color(245));
        }
    }

    for (let item of openSet) item.disp(color(50, 200, 50));
    for (let item of closedSet) item.disp(color(200, 50, 50));

    let path = [];
    path.push(current);

    while (current.prev) {
        path.push(current.prev);
        current = current.prev;
    }

    path.forEach(val => {
        val.disp(color(50, 50, 200));
    });
}