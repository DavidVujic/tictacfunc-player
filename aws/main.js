import { parseGame } from './parser.js'
import { play } from './play.js'

/**
 * @param {event} event
 * @returns {coordinate}
 */
function run (event) {
  const game = parseGame(event)

  return play(game.grid, game.val)
}

function handler (event, context, callback) {
  const result = run(event) || ''

  callback(null, {
    move: result,
    callback: event.params.querystring.callback
  })
}

export { handler }
