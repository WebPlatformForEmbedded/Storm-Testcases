import constants from './constants'
import moment from 'moment'
const _http = require('http')
const Client = require('ssh2').Client
const URL = require('url')
const http = require('http')
const os = require('os')
const path = require('path')
const httpServer = require('http-server')
const fs = require('fs')
const httpclient = require('httpclient')

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
 * This function is used to get screenshot
 * @returns {Promise<void>}
 */
export const screenshot = async function() {
  let url = `http://${constants.host}:80/Service/Snapshot/Capture?${moment().valueOf()}`
  // create a new promise inside of the async function
  let bufferData = new Promise((resolve, reject) => {
    _http
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

export const startHttpServer = function(requestFunction) {
  let data = this.$data.read('app')
  let server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(data)
    res.end()
  })
  server.listen(() => {
    this.$data.write('port', server.address().port)
  })
}

export const matchIpRange = function() {
  let ip = constants.host
  let localInterfaces = os.networkInterfaces()
  let parsedIp = ip.split('.')
  let interfaceList = Object.keys(localInterfaces)
  for (var i = 0; i < interfaceList.length; i++) {
    var interface1 = localInterfaces[interfaceList[i]]

    for (var k = 0; k < interface1.length; k++) {
      if (interface1[k].family === 'IPv6') continue //not supporting IPv6, this shouldn't be called in IPv6 mode as there is no need for private/lan ranges anymore
      if (interface1[k].address !== undefined) {
        var parsedLocalIp = interface1[k].address.split('.')

        if (
          parsedIp[0] === parsedLocalIp[0] &&
          parsedIp[1] === parsedLocalIp[1] &&
          parsedIp[2] === parsedLocalIp[2]
        ) {
          return interface1[k].address
        }
      }
    }
    if (i === interfaceList.length - 1)
      throw new Error('Could not determine IP network of the server that belongs to: ' + ip)
  }
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
 * This function performs below operations on WebKitBrowser Plugin
 *  - Deactivate
 *  - Activate
 *  - Resume
 */
export const webKitBrowserOps = function() {
  return this.$sequence([
    () => pluginDeactivate.call(this, constants.webKitBrowserPlugin),
    () => pluginActivate.call(this, constants.webKitBrowserPlugin),
    () => webKitBrowserActions.call(this, constants.resume),
  ])
}

/**
 * This function is used to get Plugin Info
 * @param plugin
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPluginInfo = function(plugin) {
  return this.$http
    .get(`http://${constants.host}:80/Service/${plugin}`)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get the controller UI
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getControllerUI = function() {
  return this.$http
    .get(`http://${constants.host}:80/Service/Controller/UI`)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get CpuLoad
 * @returns {Promise<T>}
 */
export const getCpuLoad = function() {
  this.$thunder.api.DeviceInfo.systeminfo()
    .then(result => {
      this.$data.write('cpuload', result.cpuload)
    })
    .catch(err => err)
}

/**
 * This function is used to get Controller plugin data
 * @returns {Promise<any> | Thenable<any> | PromiseLike<any>}
 */
export const getControllerPluginData = function() {
  return this.$thunder.api.Controller.status().then(result => result)
}

/**
 * This function is used to put request
 * @param plugin
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putRequestForPlugin = function() {
  return this.$http
    .put(`http://${constants.host}:80/Service/Provisioning`)
    .then(result => result)
    .catch(err => err)
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
 * This function is used to get response from URL based on the Method type
 * @param methodType
 * @param url
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getResponseForURLRequest = function(methodType, url) {
  if (methodType === 'GET') {
    return getReqURL.call(this, url)
  } else if (methodType === 'PUT') {
    return putReqURL.call(this, url)
  }
}

/**
 * This function is used to perform {PUT} request operation on the URL
 * @returns {Promise<AxiosResponse<any>>}
 */
export const putReqURL = function(URL) {
  return this.$http
    .put(URL)
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
