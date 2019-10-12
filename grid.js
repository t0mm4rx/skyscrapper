class Grid {

    constructor(n) {
        // nxn grid filled with 0 creation
        this.grid = new Array(n).fill().map(() => new Array(n).fill(0));
        // n grid creation
        this.top = new Array(n).fill(0);
        this.right = new Array(n).fill(0);
        this.bottom = new Array(n).fill(0);
        this.left = new Array(n).fill(0);

        // test data
        this.top = [1, 2, 4, 2];
        this.right = [2, 3, 1, 2];
        this.bottom = [4, 2, 1, 2];
        this.left = [1, 2, 3, 3];

        this.dim = n;
    }

    // function called every frame (60 times/second)
    draw() {
        // grid
        for (let x = 0; x < this.dim; x++) {
            for (let y = 0; y < this.dim; y++) {
                fill(255);
                rect(x * (TILE_SIZE + TILE_GAP) + MARGIN, y * (TILE_SIZE + TILE_GAP) + MARGIN, TILE_SIZE, TILE_SIZE);
                textAlign(CENTER);
                fill(0);
                textSize(18);
                text(this.grid[x][y] + 1, x * (TILE_SIZE + TILE_GAP) + MARGIN + 20, y * (TILE_SIZE + TILE_GAP) + MARGIN + 24);
            }
        }
        // instructions on the side of the grid
        for (let i = 0; i < this.dim; i++) {
            fill(255);
            text(this.left[i],
                MARGIN - 20,
                MARGIN + i * (TILE_SIZE + TILE_GAP) + 25);
            text(this.right[i],
                MARGIN + 15 + this.dim * (TILE_SIZE + TILE_GAP),
                MARGIN + i * (TILE_SIZE + TILE_GAP) + 25);
            text(this.top[i],
                MARGIN + i * (TILE_SIZE + TILE_GAP) + 20,
                MARGIN - 20
            );
            text(this.bottom[i],
                MARGIN + i * (TILE_SIZE + TILE_GAP) + 20,
                MARGIN + 20 + this.dim * (TILE_SIZE + TILE_GAP)
            );
        }
    }

    // event when the canvas is clicked
    mouse_event(mx, my) {
        // if a tile if clicked, we increase its value
        for (let x = 0; x < this.dim; x++) {
            for (let y = 0; y < this.dim; y++) {
                let rx = x * (TILE_SIZE + TILE_GAP) + MARGIN;
                let ry = y * (TILE_SIZE + TILE_GAP) + MARGIN;
                if (mx >= rx && mx <= rx + TILE_SIZE && my >= ry && my <= ry + TILE_SIZE) {
                    this.grid[x][y]++;
                    // value of the tile cannot be greater than n
                    this.grid[x][y] = this.grid[x][y] % this.dim;
                }
            }
        }
        this.check();
    }

    check() {
        return (this.check_left() &&
            this.check_right() &&
            this.check_top() &&
            this.check_bottom());
    }

    check_left() {
        for (let i = 0; i < this.dim; i++) {
            let max = -1;
            let max_changed = 0;
            for (let j = 0; j < this.dim; j++) {
                if (this.grid[j][i] > max) {
                    max = this.grid[j][i];
                    max_changed++;
                }
            }
            if (max_changed != this.left[i])
                return false;
        }
        return true;
    }

    check_right() {
        for (let i = 0; i < this.dim; i++) {
            let max = -1;
            let max_changed = 0;
            for (let j = this.dim - 1; j >= 0; j--) {
                if (this.grid[j][i] > max) {
                    max = this.grid[j][i];
                    max_changed++;
                }
            }
            if (max_changed != this.right[i])
                return false;
        }
        return true;
    }

    check_bottom() {
        for (let i = 0; i < this.dim; i++) {
            let max = -1;
            let max_changed = 0;
            for (let j = this.dim - 1; j >= 0; j--) {
                if (this.grid[i][j] > max) {
                    max = this.grid[i][j];
                    max_changed++;
                }
            }
            if (max_changed != this.bottom[i])
                return false;
        }
        return true;
    }

    check_top() {
        for (let i = 0; i < this.dim; i++) {
            let max = -1;
            let max_changed = 0;
            for (let j = 0; j < this.dim; j++) {
                if (this.grid[i][j] > max) {
                    max = this.grid[i][j];
                    max_changed++;
                }
            }
            if (max_changed != this.top[i])
                return false;
        }
        return true;
    }
}
