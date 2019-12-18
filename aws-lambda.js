function findEmptySlots(grid) {
    const cells = [];
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
    const emptySlots = findEmptySlots(grid);

    if (emptySlots.length === 0) {
        return;
    }

    const slotIndex = getRandom(0, emptySlots.length - 1);

    const cell = emptySlots[slotIndex];

    cell.state = val;

    return cell;
}

function parseGame(event) {
    if (!event.params.querystring.game) {
        return [];
    }

    const game = JSON.parse(decodeURIComponent(event.params.querystring.game));

    return game || [];
}

function run(event) {
    const game = parseGame(event);

    return play(game.grid, game.val);
}

exports.handler = function(event, context, callback) {
    const result = run(event) || '';

    callback(null, {
        "move": result,
        "callback": event.params.querystring.callback
    });
};
