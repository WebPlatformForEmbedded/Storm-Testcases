import constants from './constants'
const Client = require('ssh2').Client

/**
 * This function activates a given plugin
 * @param plugin_name
 * @returns current state of given plugin
 */
export const pluginActivate = function(plugin_name) {
  return this.$thunder.api.Controller.activate({ callsign: plugin_name })
    .then(() =>
      this.$thunder.api.call(constants.controllerPlugin, 'status').then(
        result =>
          result.filter(p => {
            return p.callsign === plugin_name
          })[0].state
      )
    )
    .catch(err => err)
}

/**
 * This function deactivates a given plugin
 * @param plugin_name
 * @returns current state of given plugin
 */
export const pluginDeactivate = function(plugin_name) {
  return this.$thunder.api.Controller.deactivate({ callsign: plugin_name })
    .then(() =>
      this.$thunder.api.call(constants.controllerPlugin, 'status').then(
        result =>
          result.filter(p => {
            return p.callsign === plugin_name
          })[0].state
      )
    )
    .catch(err => err)
}

/**
 * This function is used to get Plugin information
 * @param plugin_name
 * @returns {!ManagedPromise<R>|PromiseLike<any>|Promise<any>}
 */
export const getPluginState = function(plugin_name) {
  return this.$thunder.api.call(constants.controllerPlugin, 'status').then(result => {
    let value = result.filter(p => {
      if (p.callsign === plugin_name) {
        return true
      }
    })
    return value[0].state
  })
}

/**
 * This function resumes or suspends WebKitBrowser plugin
 * @param action
 */
export const webKitBrowserActions = function(action) {
  return this.$thunder.api.WebKitBrowser.state(action)
    .then(() => {
      return this.$thunder.api.call(constants.controllerPlugin, 'status').then(
        result =>
          result.filter(p => {
            return p.callsign === 'WebKitBrowser'
          })[0].state
      )
    })
    .catch(err => err)
}

/**
 * This function sets the URL
 * @param URL
 * @returns URL
 */
export const setWebKitUrl = function(URL) {
  return this.$thunder.api.WebKitBrowser.url(URL)
    .then(() => this.$thunder.api.WebKitBrowser.url().then(url => url))
    .catch(err => err)
}

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
        host: constants.host,
        port: 22,
        username: 'root',
        password: 'root',
      })
    conn.on('timeout', function(e) {
      throw new Error(`{opts.cmd}: Timeout while connecting to ${constants.host}`)
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
 * This function is used to stop the process
 * @param process
 */
export const stopProcess = function(process) {
  return exec({ cmd: `killall ${process}` }, () => {
    return true
  })
}

/**
 * This function starts WPEFramework
 * @returns {Promise<any>}
 */
export const startFramework = function() {
  return exec({ cmd: 'nohup WPEFramework WPEProcess -b &', cbWhenStarted: true })
}
/**
 * This function performs below operations on WebKitBrowser Plugin
 *  - Deactivate
 *  - Activate
 *  - Resume
 */
export const webKitBrowserStartAndResume = function() {
  return this.$sequence([
    () => pluginDeactivate.call(this, constants.webKitBrowserPlugin),
    () => pluginActivate.call(this, constants.webKitBrowserPlugin),
    () => webKitBrowserActions.call(this, constants.resume),
  ])
}

/**
 * This function is used to get Controller plugin data
 * @returns {Promise<any> | Thenable<any> | PromiseLike<any>}
 */
export const getControllerPluginData = function() {
  return this.$thunder.api.Controller.status()
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
