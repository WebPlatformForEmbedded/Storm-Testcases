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
  return this.$thunder.api.WifiControl.connect(ssid)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to disconnect to Wifi network
 * @param ssid
 * @returns {Promise<T>}
 */
export const disconnectWifi = function(ssid) {
  return this.$thunder.api.WifiControl.disconnect(ssid)
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
