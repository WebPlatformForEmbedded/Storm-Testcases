/**
 * This function is used to get the actual trace status information for targeted module and category
 * @param module
 * @param category
 * @returns {Promise<T>}
 */
export const getTraceControlStatus = function(module, category) {
  return this.$thunder.api.TraceControl.status({ module: module, category: category })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to set traces, disables/enables all/select category traces for particular module.
 * @param module
 * @param category
 * @param state
 * @returns {Promise<T>}
 */
export const setTraceForModule = function(module, category, state) {
  return this.$thunder.api.TraceControl.set({ module: module, category: category, state: state })
    .then(result => result)
    .catch(err => err)
}
