/**
 * This function is used to suspend or resume UX Plugin
 * @param state
 * @returns {Promise<unknown>}
 */
export const suspendOrResumeUxPlugin = function(state) {
  return this.$thunder.api.UX.state(state)
    .then(result => result)
    .catch(err => err)
}
