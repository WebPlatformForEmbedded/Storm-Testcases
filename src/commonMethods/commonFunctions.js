import constants from './constants'
import moment from 'moment'
import _http from 'http'
import { Client } from 'ssh2'

import URL from 'url'

/**
 * This function checks if the process is running by getting the process id and comparing it to the number.
 *  - If the process id is a number, then false is returned
 *  - If the process is not a number, then true is returned
 * @param process
 */
export const checkIfProcessIsRunning = function(process) {
  let opts = {
    cmd: `ps w | grep ${process} | grep -v grep | awk ` + "'{printf(" + '"%i \\n\\r", $1)}' + "'",
  }
  exec(opts, res => {
    //parse response as integer
    var processId
    try {
      processId = parseInt(res)
    } catch (e) {
      return e
    }
    //only return true if valid number
    return isNaN(processId) === false ? true : false
  })
}

/**
 * This function is used to connect RbPI
 * @param opts
 * @param cb
 */
export const exec = async function(opts) {
  const hostIP = deviceIP.call(this)
  var conn = new Client()
  let execCmd = new Promise((resolve, reject) => {
    conn
      .on('ready', function() {
        return conn.exec(opts.cmd, function(err, stream) {
          var res = ''
          if (err) reject(err)
          if (opts.cbWhenStarted === true) resolve(true)
          stream
            .on('close', function(code, signal) {
              stream.end()
              conn.end()
              if (opts.cbWhenStarted !== true) resolve(res)
            })
            .on('data', function(data) {
              res += data
            })
            .stderr.on('data', function(data) {})
        })
      })
      .connect({
        host: hostIP,
        port: 22,
        username: 'root',
        password: 'root',
      })
    conn.on('timeout', function(e) {
      throw new Error(`{opts.cmd}: Timeout while connecting to ${hostIP}`)
    })

    conn.on('error', function(err) {
      throw new Error(`${opts.cmd}:  ${err}`)
    })
  })

  let result = await execCmd
  return result
}

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
 * This function is used to kill the process
 * @param process
 */
export const killProcess = function(process) {
  exec({ cmd: `killall -9 ${process}` }, err => {
    return true
  })
}

/**
 * This function is used to stop the process
 * @param process
 */
export const stopProcess = function(process) {
  return exec({ cmd: `killall ${process}` }, () => {
    return true
  })
}

export const startFramework = function() {
  return exec({ cmd: 'nohup WPEFramework WPEProcess -b &', cbWhenStarted: true })
}

/**
 * This function is used to restart the framework
 */
export const restartFramework = function() {
  return this.$sequence([
    () => killProcess('WPEFramework'),
    () => killProcess('WPEProcess'),
    () => startFramework(),
  ])
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
 * This function is used to Suspend or Resume a plugin
 * @param plugin
 * @param action
 * @returns {Promise<unknown>}
 */
export const suspendOrResumePlugin = function(plugin, action) {
  const hostIP = deviceIP.call(this)
  return this.$http
    .post(`http://${hostIP}:80/Service/${plugin}/${action}`)
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
 * This function is used to perform GET request operation on the URL
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getReqURL = function(URL) {
  return this.$http
    .get(URL)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function stops the WPE Framework Process
 * @returns {boolean}
 */
export const stopWPEFramework = function() {
  stopProcess('WPEFramework')
  return true
}
