/**
 * This function is used to upgrade the firmware
 * @param name
 * @param location
 * @param type
 * @param progressinterval
 * @param hmac
 * @returns {Promise<T>}
 */
export const firmwareUpgrade = function(name, location, type, progressinterval, hmac) {
  return this.$thunder.api.FirmwareControl.upgrade({
    name: name,
    location: location,
    type: type,
    progressinterval: progressinterval,
    hmac: hmac,
  })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get the status of firmware upgrade
 * @returns {Promise<T>}
 */
export const upgradeStatus = function() {
  return this.$thunder.api.FirmwareControl.status()
    .then(result => result)
    .catch(err => err)
}
