/**
 * @param {[coordinate[]]} grid
 * @returns {[]}
 */
function findEmptySlots (grid) {
  const cells = []
  grid.forEach((row) => {
    row.forEach((cell) => {
      if (!cell.state) {
        cells.push(cell)
      }
    })
  })

  return cells
}

function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * @param {[coordinate[]]} grid
 * @param {string} val
 * @returns {coordinate}
 */
function play (grid, val) {
  const emptySlots = findEmptySlots(grid)

  if (emptySlots.length === 0) {
    return undefined
  }

  const slotIndex = getRandom(0, emptySlots.length - 1)

  const cell = emptySlots[slotIndex]

  cell.state = val

  return cell
}

export { play }
