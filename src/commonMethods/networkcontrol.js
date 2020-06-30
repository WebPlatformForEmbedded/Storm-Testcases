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
