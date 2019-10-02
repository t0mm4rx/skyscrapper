const TILE_SIZE = 40;
const TILE_GAP = 5;
const MARGIN = 100;

var grid;

function preload() {}

function setup() {
    createCanvas(800, 800);
    grid = new Grid(4);
}

function draw() {
    background(0);
    grid.draw();
}

function mousePressed()
{
    grid.mouse_event(mouseX, mouseY);
}

class Grid {

    constructor(n) {
        this.grid = new Array(n).fill().map(() => new Array(n).fill(0));
        this.top = new Array(n).fill(0);
        this.right = new Array(n).fill(0);
        this.bottom = new Array(n).fill(0);
        this.left = new Array(n).fill(0);
        this.dim = n;
    }

    draw() {
        /* GRID */
        for (let x = 0; x < this.dim; x++)
        {
            for (let y = 0; y < this.dim; y++)
            {
                fill(255);
                rect(x * (TILE_SIZE + TILE_GAP) + MARGIN, y * (TILE_SIZE + TILE_GAP) + MARGIN, TILE_SIZE, TILE_SIZE);
                textAlign(CENTER);
                fill(0);
                textSize(18);
                text(this.grid[x][y] + 1, x * (TILE_SIZE + TILE_GAP) + MARGIN + 20, y * (TILE_SIZE + TILE_GAP) + MARGIN + 24);
            }
        }
        /* INSTRUCTIONS */
        for (let i = 0; i < this.dim; i++)
        {
            fill(255);
            text(this.left[i],
                 MARGIN - 20,
                 MARGIN + i *(TILE_SIZE + TILE_GAP) + 25);
            text(this.right[i],
                 MARGIN + 15 + this.dim * (TILE_SIZE + TILE_GAP),
                 MARGIN + i *(TILE_SIZE + TILE_GAP) + 25);
            text(this.top[i],
                 MARGIN + i *(TILE_SIZE + TILE_GAP) + 20,
                 MARGIN - 20
             );
            text(this.bottom[i],
                 MARGIN + i *(TILE_SIZE + TILE_GAP) + 20,
                 MARGIN + 20 + this.dim * (TILE_SIZE + TILE_GAP)
             );
        }
    }

    mouse_event(mx, my)
    {
        for (let x = 0; x < this.dim; x++)
        {
            for (let y = 0; y < this.dim; y++)
            {
                let rx = x * (TILE_SIZE + TILE_GAP) + MARGIN;
                let ry = y * (TILE_SIZE + TILE_GAP) + MARGIN;
                if (mx >= rx && mx <= rx + TILE_SIZE && my >= ry && my <= ry + TILE_SIZE)
                {
                    this.grid[x][y]++;
                    this.grid[x][y] = this.grid[x][y] % this.dim;
                }
            }
        }
    }

}
