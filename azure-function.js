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

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function play(grid, val) {
    var emptySlots = findEmptySlots(grid);

    if (emptySlots.length === 0) {
        return;
    }

    var slotIndex = getRandom(0, emptySlots.length - 1);

    var cell = emptySlots[slotIndex];

    cell.state = val;

    return cell;
}

function parseGame(req) {
    var game;

    if (!req || !req.query || !req.query.game) {
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

module.exports = function (context, req) {
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);

    var result = run(req);

    context.res = result;
    context.done();
};
