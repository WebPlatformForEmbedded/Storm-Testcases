/**
 * This function is used to get Mute status
 * @returns {Promise<unknown>}
 */
export const getVolumeMuteStatus = function() {
  return this.$thunder.api.VolumeControl.muted()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to set Mute status
 * @param state
 * @returns {Promise<unknown>}
 */
export const setVolumeMuteStatus = function(state) {
  return this.$thunder.api.VolumeControl.muted(state)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to set Volume
 * @param v
 * @returns {Promise<unknown>}
 */
export const setVolume = function(v) {
  return this.$thunder.api.VolumeControl.volume(v)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get Volume
 * @returns {Promise<unknown>}
 */
export const getVolume = function() {
  return this.$thunder.api.VolumeControl.volume()
    .then(result => result)
    .catch(err => err)
}
