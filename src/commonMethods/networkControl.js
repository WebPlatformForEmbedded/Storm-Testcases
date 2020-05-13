/**
 * This function is used to reload network adapters
 * @param networkinterface
 * @returns {Promise<AxiosResponse<any>>}
 */
export const reloadNetworkAdapter = function(networkinterface) {
  return this.$thunder.api.NetworkControl.reload(networkinterface)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to reload Non-static network adapters
 * @param networkinterface
 * @returns {Promise<AxiosResponse<any>>}
 */
export const requestNetworkAdapter = function(networkinterface) {
  return this.$thunder.api.NetworkControl.request(networkinterface)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to reload static network adapters
 * @param networkinterface
 * @returns {Promise<AxiosResponse<any>>}
 */
export const assignNetworkAdapter = function(networkinterface) {
  return this.$thunder.api.NetworkControl.assign(networkinterface)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to flush network adapters
 * @param networkinterface
 * @returns {Promise<AxiosResponse<any>>}
 */
export const flushNetworkAdapter = function(networkinterface) {
  return this.$thunder.api.NetworkControl.flush(networkinterface)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get Network Information
 * @param networkinterface
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getNetworkInformation = function(networkinterface) {
  return this.$thunder.api.NetworkControl.network(networkinterface)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to check the Network up status
 * @param networkinterface
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getNetworkStatus = function(networkinterface) {
  return this.$thunder.api.NetworkControl.network(networkinterface)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to check the Network up status
 * @param networkinterface
 * @param state
 * @returns {Promise<AxiosResponse<any>>}
 */
export const setNetworkStatus = function(networkinterface, state) {
  return this.$thunder.api.NetworkControl.network(networkinterface, state)
    .then(result => result)
    .catch(err => err)
}
