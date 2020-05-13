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
