var val = 'X';

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

function play(grid) {
    var emptySlots = findEmptySlots(grid);

    if (emptySlots.length === 0) {
        return;
    }

    var slotIndex = getRandomIntInclusive(0, emptySlots.length - 1);

    var cell = emptySlots[slotIndex];

    cell.state = val;

    return cell;
}

function parseGrid(jsonData) {
    var grid;

    if (!jsonData.grid) {
        return [];
    }

    grid = jsonData.grid;

    if (!grid.forEach) {
        return [];
    }

    return grid;
}

function run(jsonData) {
    var grid = parseGrid(jsonData);

    var cell = play(grid);

    return cell;
}

exports.handler = (event, context, callback) => {
    var result = JSON.stringify(run(event)) || '';

    callback(null, result);
};
