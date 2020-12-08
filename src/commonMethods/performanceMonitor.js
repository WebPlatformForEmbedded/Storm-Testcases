/**
 * This function clears all the performance data that is collected
 */
export const clearPerformanceData = function() {
  return this.$thunder.api.PerformanceMonitor.clear()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to send the data
 * @param data
 * @param length
 * @returns {Promise<*>}
 */
export const sendData = function(data, length) {
  return this.$thunder.api.PerformanceMonitor.send({ data: data, length: length })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to receive the data
 * @param size
 * @returns {Promise<*>}
 */
export const receiveData = function(size) {
  return this.$thunder.api.PerformanceMonitor.receive(size)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to exchange the data
 * @param data
 * @param length
 * @returns {Promise<*>}
 */
export const exchangeData = function(data, length) {
  return this.$thunder.api.PerformanceMonitor.exchange({ data: data, length: length })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get the measurement data based on the given size
 * @param size
 * @returns {Promise<*>}
 */
export const getMeasurements = function(size) {
  let methodName = 'measurement@' + size
  return this.$thunder.api.PerformanceMonitor[methodName]()
    .then(result => result)
    .catch(err => err)
}
