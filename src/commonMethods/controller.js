import constants from './constants'
import { deviceIP } from './commonFunctions'

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
 * This function stores the configuration to persistent memory.
 * @returns {Promise<T>}
 */
export const storeconfig = function() {
  return this.$thunder.api.Controller.storeconfig()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get plugins status
 * @returns {Promise<T>}
 */
export const getPluginsStatus = function() {
  return this.$thunder.api.Controller.status()
    .then(res => res)
    .catch(err => err)
}

/**
 * This function starts the discovery process
 * @param ttl
 * @returns {Promise<T>}
 */
export const startDiscovery = function(ttl) {
  return this.$thunder.api.Controller.startdiscovery(ttl)
    .then(result => result)
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
 * This function is used to get Controller Environment info
 * @param envName
 * @returns {Promise<T>}
 */
export const getControllerEnvironment = function(envName) {
  let methodName = 'environment@' + envName
  return this.$thunder.api.Controller[methodName]()
    .then(res => res)
    .catch(err => err)
}

/**
 * This function is used to get plugin status
 * @param pluginName
 * @returns {Promise<T>}
 */
export const getPluginStatus = function(pluginName) {
  let methodName = 'status@' + pluginName
  return this.$thunder.api.Controller[methodName]()
    .then(res => res)
    .catch(err => err)
}

/**
 * This function is used to get Plugin Configuration
 * @param pluginName
 * @returns {Promise<T>}
 */
export const getPluginConfiguration = function(pluginName) {
  const methodName = 'configuration@' + pluginName
  return this.$thunder.api.Controller[methodName]()
    .then(res => res)
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
 * This function is used to get Controller plugin data
 * @returns {Promise<any> | Thenable<any> | PromiseLike<any>}
 */
export const getControllerPluginData = function() {
  return this.$thunder.api.Controller.status()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to reboot the device
 * @returns {Promise<T>}
 */
export const harakiri = function() {
  return this.$thunder.api.Controller.harakiri()
    .then(res => res)
    .catch(err => err)
}

/**
 * This function is used to get Controller discovery results
 * @returns {Promise<T>}
 */
export const getDiscoveryResults = function() {
  return this.$thunder.api.Controller.discoveryresults()
    .then(res => res)
    .catch(err => err)
}

/**
 * This function is used to set Plugin Configuration
 * @param pluginName
 * @returns {Promise<T>}
 */
export const setPluginConfiguration = function(pluginName, params) {
  const methodName = 'configuration@' + pluginName
  return this.$thunder.api.Controller[methodName](params)
    .then(res => res)
    .catch(err => err)
}
