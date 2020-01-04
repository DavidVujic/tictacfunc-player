/**
 * @param {event} event
 * @returns {game|*[]}
 */
function parseGame (event) {
  if (!event.params.querystring.game) {
    return []
  }

  const game = JSON.parse(decodeURIComponent(event.params.querystring.game))

  return game || []
}

export { parseGame }
