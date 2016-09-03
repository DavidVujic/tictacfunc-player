function findEmptySlots(grid) {
    var cells = [];
    grid.forEach(function (row) {
        row.forEach(function (cell) {
            if (!cell.state) {
                cells.push(cell);
            }
        });
    });

    return cells;
}

// Parses grid into a 9 character string
function parseGrid(grid) {
    var str = '';
    for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
            str = str + (grid[row][col].state ? grid[row][col].state.toLowerCase() : '-')
        }
    }
    return str;
}

// Returns string for winner, or null if no winner
function getWinner(grid) {
    var rgx = /^(?:(?:.{3}){0,3}([xo])\1{2}.*|.{0,2}([xo]).{2}\2.{2}\2.{0,2}|([xo]).{3}\3.{3}\3|.{2}([xo]).\4.\4.{2})$/i;
    var results = parseGrid(grid).match(rgx);
    if (!results)
        return null;
    else
        return results[1] || results[2] || results[3] || results[4];
}

//Mimimax algorithm to determine best move (recursive...)
function mm(player, turn, grid, depth) {
    // 1. Check for winner
    var results = getWinner(grid);
    if (results) { // If winner, return score (positive good, negative bad)
        return results === player ? 10 - depth : depth - 10;
    } else if (depth >= 9) { // If tie, return 0
        return 0;
    }

    // 2. If game isn't over, evaluate each available move
    var cells = findEmptySlots(grid);
    var max = null;

    for (var i = 0; i < cells.length; i++) {
        var newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[cells[i].y][cells[i].x].state = turn;
        var score = mm(player, turn === 'x' ? 'o' : 'x', newGrid, depth + 1);
        if (max === null || score > max) { //if the score is better, update max
            max = score;
        } else if(max === score && Math.random() > .5) { //if the score is the same, randomly choose one of them
            max = score;
        }
    }

    // 3. Return the best score
    return max;
}

function play(grid, val) {
    // 1. Grab empty cells
    var cells = findEmptySlots(grid);

    if (cells.length === 0) {
        return;
    }

    var curr_depth = 10 - parseGrid(grid).split('-').length;

    // 2. Run each available move through Minimax algorithm
    var max = null; var best = null;
    for (var i = 0; i < cells.length; i++) {
        var newGrid = JSON.parse(JSON.stringify(grid));
        newGrid[cells[i].y][cells[i].x].state = val.toLowerCase();
        var score = mm(val.toLowerCase(), val.toLowerCase(), newGrid, curr_depth);
        if (max === null || score > max) {
            max = score; best = cells[i];
        } else if(max === score && Math.random() > .5) {
            max = score; best = cells[i];
        }
        // console.log('score: ' + score + ' - best: ' + JSON.stringify(cells[i]));
    }

    // 3. return the best cell
    best.state = val;
    return best;
}

function parseGame(req) {
    var game;

    if (!req.query.game) {
        return;
    }

    game = JSON.parse(decodeURIComponent(req.query.game));

    return game;
}

function run(req) {
    var game = parseGame(req);

    if (!game) {
        return;
    }

    return play(game.grid, game.val);
}

function toJsonp(req, result) {
    if (!req.query.callback) {
        return;
    }

    const funcName = req.query.callback;

    return `typeof ${funcName} === 'function' && ${funcName}(${JSON.stringify(result)});`;
}

module.exports = function (context, req) {
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);

    var result = run(req);

    context.res = toJsonp(req, result);
    context.done();
};
