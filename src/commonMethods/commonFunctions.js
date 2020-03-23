import constants from './constants'
import moment from 'moment'
import _http from 'http'
import { Client } from 'ssh2'

import URL from 'url'

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
 * This function resumes or suspends Youtube plugin
 * @param action
 */
export const youtubeChangeState = function(action) {
  return this.$thunder.api.Cobalt.state(action)
    .then(() => {
      return this.$thunder.api.call(constants.controllerPlugin, 'status').then(
        result =>
          result.filter(p => {
            return p.callsign === 'Cobalt'
          })[0].state
      )
    })
    .catch(err => err)
}

/**
 * This function gets the URL
 * @param URL
 * @returns URL
 */
export const getYoutubeUrl = function(URL) {
  return this.$thunder.api.Cobalt.url(URL)
    .then(() =>
      this.$thunder.api.Cobalt.url().then(url => {
        this.$log('URL is', url)
        return url
      })
    )
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
 * This function performs below operations on Youtube Plugin
 *  - Deactivate
 *  - Activate
 *  - Resume
 */
export const youtubeStartAndResume = function() {
  return this.$sequence([
    () => pluginDeactivate.call(this, constants.youTubePlugin),
    () => pluginActivate.call(this, constants.youTubePlugin),
    () => youtubeChangeState.call(this, constants.resume),
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
 * This function is used to get System Info of Device Ingo Plugin
 * @param plugin
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getDeviceInfo = function() {
  return this.$thunder.api.DeviceInfo.systeminfo()
    .then(result => {
      this.$data.write('systeminfo', result)
    })
    .catch(err => err)
}

/**
 * This function is used to get esn Info of Netflix Plugin
 * @returns {Promise<unknown>}
 */
export const getNetflixPluginEsnInfo = function() {
  return this.$thunder.api.Netflix.esn()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to suspend or resume Info of Netflix Plugin
 * @param state
 * @returns {Promise<unknown>}
 */
export const suspendOrResumeNetflixPlugin = function(state) {
  return this.$thunder.api.Netflix.state(state)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get Addresses Info of Device Info Plugin
 * @param plugin
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAddressesInfo = function() {
  return this.$thunder.api.DeviceInfo.addresses()
    .then(result => {
      this.$data.write('addressinfo', result)
      return result
    })
    .catch(err => err)
}

/**
 * This function is used to get Monitor Info
 * @param plugin
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getMonitorInfo = function() {
  return this.$thunder.api.Monitor.status()
    .then(result => {
      this.$data.write('monitorinfo', result)
      return result
    })
    .catch(err => err)
}

/**
 * This function is used to get the controller UI
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getControllerUI = function() {
  const hostIP = deviceIP.call(this)
  return this.$http
    .get(`http://${hostIP}:80/Service/Controller/UI`)
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
 * This function is used to get CpuLoad
 * @returns {Promise<T>}
 */
export const getCpuLoad = function() {
  this.$thunder.api.DeviceInfo.systeminfo()
    .then(result => {
      this.$data.write('cpuload', result.cpuload)
      return result
    })
    .catch(err => err)
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
 * This function is used to get Provisioning plugin data
 * @returns {Promise<any> | Thenable<any> | PromiseLike<any>}
 */
export const getProvisioningPluginData = function() {
  return this.$thunder.api.Provisioning.state()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to start Provisioning plugin
 * @returns {Promise<any> | Thenable<any> | PromiseLike<any>}
 */
export const startProvisioning = function() {
  return this.$thunder.api.Provisioning.provision()
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
 * This function stops the WPE Framework Process
 * @returns {boolean}
 */
export const stopWPEFramework = function() {
  stopProcess('WPEFramework')
  return true
}

/**
 * This function is used to get available Bluetooth devices
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBluetoothDevices = function() {
  return this.$thunder.api.BluetoothControl.devices()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get available Bluetooth adapters
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBluetoothAdapters = function() {
  return this.$thunder.api.BluetoothControl.adapters()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get info of particular Bluetooth adapters
 * @param adaptername
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBluetoothAdapterInfo = function(adaptername) {
  return this.$thunder.api.BluetoothControl.adapter(adaptername)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get info of particular Bluetooth device
 * @param devicemac
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBluetoothDeviceInfo = function(devicemac) {
  return this.$thunder.api.BluetoothControl.adapter(devicemac)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to sync Location
 * @returns {Promise<AxiosResponse<any>>}
 */
export const syncLocation = function() {
  return this.$thunder.api.LocationSync.sync()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get Location
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLocation = function() {
  return this.$thunder.api.LocationSync.location()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get DRMS list
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getDRMSList = function() {
  return this.$thunder.api.OCDM.drms()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get DRMS item info
 * @returns {Promise<AxiosResponse<any>>}
 * @param keysystem
 */
export const getDRMKeySystemInfo = function(keysystem) {
  return this.$thunder.api.OCDM.keysystems(keysystem)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to scan Info of Bluetooth Control Plugin
 * @param type , timeout
 * @returns {Promise<AxiosResponse<any>>}
 */
export const scanDevices = function(type, timeout) {
  return this.$thunder.api.BluetoothControl.scan(type, timeout)
    .then(result => result)
    .catch(err => err)
}
/**
 * This function is used to get available Bluetooth devices
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBluetoothDevices = function() {
  return this.$thunder.api.BluetoothControl.devices()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to pair with the available Bluetooth devices
 * @param address
 * @returns {Promise<AxiosResponse<any>>}
 */
export const pairBTDevice = function(address) {
  return this.$thunder.api.BluetoothControl.pair(address)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to disconnect with the available Bluetooth devices
 * @param address
 * @returns {Promise<AxiosResponse<any>>}
 */
export const unpairBTDevice = function(address) {
  return this.$thunder.api.BluetoothControl.unpair(address)
    .then(result => result)
    .catch(err => err)
}
