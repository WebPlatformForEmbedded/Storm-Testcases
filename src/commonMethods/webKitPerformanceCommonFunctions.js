/**
 * This function fetches the FPS value
 * @returns {Samples Array}
 */
export const fetchWebKitFPS = function() {
  this.$thunder.api.WebKitBrowser.fps()
    .then(result => {
      if (isNaN(result) === false) {
        let samples = this.$data.read('samples')
        samples.push(result)
        this.$data.write('samples', samples)
      }
    })
    .catch(err => err)
}
