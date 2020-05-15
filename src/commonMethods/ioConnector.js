/**
 * This function is used to set the IO Connector pin value
 * @params - pin
 * @returns {Promise<unknown>}
 */
export const setIoConnectorPinValue = function(pin, value) {
  let methodName = 'pin@' + pin
  return this.$thunder.api.IOConnector[methodName](value)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get the IO Connector pin value
 * @returns {Promise<unknown>}
 */
export const getIoConnectorPinValue = function() {
  return this.$thunder.api.IOConnector.pin()
    .then(result => result)
    .catch(err => err)
}
