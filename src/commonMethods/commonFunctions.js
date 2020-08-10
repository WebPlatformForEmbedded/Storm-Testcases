import moment from 'moment'
import _http from 'http'

/**
 * This function calculates the average of FPS samples collected in fetchFPS function
 * @returns {results}
 */
export const calcAvgFPS = function() {
  let sum = 0
  let average
  let samples = this.$data.read('samples')
  for (let i = 0; i < samples.length; i++) {
    sum += samples[i]
  }
  average = sum / samples.length
  average = average.toFixed(2)
  this.$data.write('average', average)
}

/**
 * This function is used to get screenshot
 * @returns {Promise<void>}
 */
export const screenshot = async function() {
  const hostIP = deviceIP.call(this)
  let url = `http://${hostIP}:80/Service/Snapshot/Capture?${moment().valueOf()}`
  // create a new promise inside of the async function
  let bufferData = new Promise((resolve, reject) => {
    _http //TODO : Replace _http by using this.$http helper
      .get(url, function(res) {
        if (res.headers['content-length'] === undefined)
          this.$log(
            'Framework did not return a content-length! This will slow down the screenshot module.'
          )
        var buffers = []
        var imageSize = res.headers['content-length']

        res.on('data', function(chunk) {
          buffers.push(Buffer.from(chunk))
        })

        res.on('end', function() {
          return resolve(Buffer.concat(buffers, parseInt(imageSize)))
        })
      })
      .on('error', function(e) {
        return reject(e)
      })
  })

  // wait for the promise to resolve
  let result = await bufferData
  this.$data.write('screenshotResult', result)
  return result
}

/**
 * This function is used to get Plugin Info
 * @param plugin
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPluginInfo = function(plugin) {
  const hostIP = deviceIP.call(this)
  return this.$http
    .get(`http://${hostIP}:80/Service/${plugin}`)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get the HostIP address
 * @returns {*}
 */
export const deviceIP = function() {
  return this.$thunder.api.options.host
}

/**
 * This function is used to Suspend or Resume a plugin
 * @param plugin
 * @param action
 * @returns {Promise<unknown>}
 */
export const suspendOrResumePlugin = function(plugin, action) {
  return this.$thunder.api.call(plugin, 'state', action)
}

/**
 * This function sets the URL
 * @param URL
 * @returns URL
 */
export const setUrl = function(callsign, URL) {
  return this.$thunder.api.call(callsign, 'url', URL).catch(err => err)
}

/**
 * Converts bytes into Mb's
 */
export const bytesToMb = bytes => {
  return (bytes / 1024 / 1024).toFixed(1)
}
