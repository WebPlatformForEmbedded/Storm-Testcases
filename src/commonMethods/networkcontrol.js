/**
 * This function is used to get network status
 * @param networkName
 * @returns {Promise<T>}
 */
export const getNetworkStatus = function(networkName) {
  let methodName = 'up@' + networkName
  return this.$thunder.api.NetworkControl[methodName]()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to reload network adapters
 * @param networkinterface
 * @returns {Promise<T>}
 */
export const reloadNetworkAdapter = function(networkinterface) {
  return this.$thunder.api.NetworkControl.reload({ device: networkinterface })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to reload Non-static network adapters
 * @param networkinterface
 * @returns {Promise<T>}
 */
export const requestNetworkAdapter = function(networkinterface) {
  return this.$thunder.api.NetworkControl.request({ device: networkinterface })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to reload static network adapters
 * @param networkinterface
 * @returns {Promise<T>}
 */
export const assignNetworkAdapter = function(networkinterface) {
  return this.$thunder.api.NetworkControl.assign({ device: networkinterface })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to flush network adapters
 * @param networkinterface
 * @returns {Promise<T>}
 */
export const flushNetworkAdapter = function(networkinterface) {
  return this.$thunder.api.NetworkControl.flush({ device: networkinterface })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get Network Information
 * @param networkinterface
 * @returns {Promise<T>}
 */
export const getNetworkInformation = function(networkinterface) {
  let methodName = 'network@' + networkinterface
  return this.$thunder.api.NetworkControl[methodName]()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to check the Network up status
 * @param networkinterface
 * @param state
 * @returns {Promise<T>}
 */
export const setNetworkStatus = function(networkinterface, state) {
  return this.$thunder.api.NetworkControl.network(networkinterface, state)
    .then(result => result)
    .catch(err => err)
}
