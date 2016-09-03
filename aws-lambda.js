function findEmptySlots(grid) {
    var cells = [];
    grid.forEach(function(row) {
        row.forEach(function(cell) {
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

function parseGame(event) {
    var game;

    if (!event.params.querystring.game) {
        return [];
    }

    game = JSON.parse(decodeURIComponent(event.params.querystring.game));

    return game || [];
}

function run(event) {
    var game = parseGame(event);

    return play(game.grid, game.val);
}

exports.handler = function(event, context, callback) {
    var result = run(event) || '';

    callback(null, {
        "move": result,
        "callback": event.params.querystring.callback
    });
};
