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

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function play(grid, val) {
    var emptySlots = findEmptySlots(grid);

    if (emptySlots.length === 0) {
        return;
    }

    var slotIndex = getRandomIntInclusive(0, emptySlots.length - 1);

    var cell = emptySlots[slotIndex];

    cell.state = val;

    return cell;
}

function parseGame(event) {
    var game;
    var grid;

    if (!event || !event.params || !event.params.querystring) {
        return [];
    }

    if (!event.params.querystring.game) {
        return [];
    }

    game = JSON.parse(decodeURIComponent(event.params.querystring.game));

    if (!game) {
        return [];
    }

    return game;
}

function run(event) {
    var game = parseGame(event);

    var cell = play(game.grid, game.val);

    return cell;
}

exports.handler = (event, context, callback) => {
    var result = JSON.stringify(run(event)) || '';

    callback(null, JSON.stringify(result));
};
