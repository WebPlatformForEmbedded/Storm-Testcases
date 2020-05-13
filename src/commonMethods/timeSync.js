/**
 * This function is used to get current time
 * @returns {Promise<AxiosResponse<any>>}
 */
export const setTime = function(time) {
  return this.$thunder.api.TimeSync.time(time)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to synchronize time
 * @returns {Promise<AxiosResponse<any>>}
 */
export const syncTime = function() {
  return this.$thunder.api.TimeSync.synchronize()
    .then(result => result)
    .catch(err => err)
}
/**
 * This function is used to get latest synchronized time
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLatestSyncTime = function() {
  return this.$thunder.api.TimeSync.synctime()
    .then(result => result)
    .catch(err => err)
}
/**
 * This function is used to get current time
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getCurrentTime = function() {
  return this.$thunder.api.TimeSync.time()
    .then(result => result)
    .catch(err => err)
}
