/**
 * This function is used to get esn Info of Netflix Plugin
 * @returns {Promise<unknown>}
 */
export const getNetflixPluginEsnInfo = function() {
  return this.$thunder.api.Netflix.esn()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to suspend or resume Info of Netflix Plugin
 * @param state
 * @returns {Promise<unknown>}
 */
export const suspendOrResumeNetflixPlugin = function(state) {
  return this.$thunder.api.Netflix.state(state)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function sets the state of Netflix
 * @param state
 * @returns state
 */
export const setNetflixState = function(state) {
  return this.$thunder.api.Netflix.state(state)
    .then(state => state)
    .catch(err => err)
}

/**
 * This function sets the visibility of Netflix
 * @param status
 * @returns {Promise<T>}
 */
export const setNetflixVisibility = function(status) {
  return this.$thunder.api.Netflix.visibility(status)
    .then(res => res)
    .catch(err => err)
}
/**
 * This function gets the visibility of Netflix
 * @returns {Promise<T>}
 */
export const getNetflixVisibility = function() {
  return this.$thunder.api.Netflix.visibility()
    .then(res => res)
    .catch(err => err)
}
