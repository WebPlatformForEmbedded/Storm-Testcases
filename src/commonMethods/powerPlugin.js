/**
 * This function sets the Power state
 * @param powerState
 * @param timeOut
 * @returns {Promise<T>}
 */
export const setPowerState = function(powerState, timeOut) {
  return this.$thunder.api.Power.set({ powerstate: powerState, timeout: timeOut })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function gets the Power state
 * @returns {Promise<T>}
 */
export const getPowerState = function() {
  return this.$thunder.api.Power.state()
    .then(result => result)
    .catch(err => err)
}
