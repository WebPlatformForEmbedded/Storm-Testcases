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
