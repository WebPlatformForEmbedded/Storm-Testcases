/**
 * This function is used to disconnect to Wifi network
 * @param ssid
 * @returns {Promise<T>}
 */
export const disconnectWifi = function(ssid) {
  return this.$thunder.api.WifiControl.disconnect({ ssid: ssid })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to delete Wifi Config
 * @param ssid
 * @returns {Promise<T>}
 */
export const deleteWifiConfig = function(ssid) {
  return this.$thunder.api.WifiControl.delete(ssid)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get the Wifi Status
 * @param ssid
 * @returns {Promise<T>}
 */
export const getWifiStatus = function() {
  return this.$thunder.api.WifiControl.status()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to store Wifi Config
 * @returns {Promise<T>}
 */
export const storeWifiConfig = function() {
  return this.$thunder.api.WifiControl.store()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to scan Wifi network using Wifi Control Plugin
 * @returns {Promise<AxiosResponse<any>>}
 */
export const scanWifi = function() {
  return this.$thunder.api.WifiControl.scan()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to connect to Wifi network
 * @param ssid
 * @returns {Promise<T>}
 */
export const connectWifi = function(ssid) {
  return this.$thunder.api.WifiControl.connect({ ssid: ssid })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get Wifi Configuration info
 * @param configName
 * @returns {Promise<T>}
 */
export const getWifiConfigInfo = function(configName) {
  const methodName = 'config@' + configName
  return this.$thunder.api.WifiControl[methodName]()
    .then(res => res)
    .catch(err => err)
}

/**
 * This function is used to get available Wifi networks
 * @returns {Promise<T>}
 */
export const getWifiNetworks = function() {
  return this.$thunder.api.WifiControl.networks()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to set the wifi configuration
 * @param ssid
 * @param hidden
 * @param accesspoint
 * @param psk
 * @returns {Promise<*>}
 */
export const setWifiConfig = function(ssid, hidden = false, accesspoint = false, psk) {
  const methodName = 'config@' + ssid
  return this.$thunder.api.WifiControl[methodName](ssid, hidden, accesspoint, psk)
    .then(result => result)
    .catch(err => err)
}
