/**
 * This function is used to get the keycode details
 * @param device
 * @param code
 * @returns {Promise<T>}
 */
export const getKeyCodeDetails = function(device, code) {
  return this.$thunder.api.RemoteControl.key({ device: device, code: code })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to send the key to a device
 * @param device
 * @param code
 * @returns {Promise<T>}
 */
export const sendKeyCodeToDevice = function(device, code) {
  return this.$thunder.api.RemoteControl.send({ device: device, code: code })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to press the key
 * @param device
 * @param code
 * @returns {Promise<T>}
 */
export const pressKeyCodeToDevice = function(device, code) {
  return this.$thunder.api.RemoteControl.press({ device: device, code: code })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get the available remote control devices
 * @returns {Promise<T>}
 */
export const getRemoteControlDevices = function() {
  return this.$thunder.api.RemoteControl.devices()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get the metadta of remote control device
 * @param deviceName
 * @returns {Promise<T>}
 */
export const getMetadataofRemoteControlDevice = function(deviceName) {
  const methodName = 'device@' + deviceName
  return this.$thunder.api.RemoteControl[methodName]()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to release the key on to a device
 * @param device
 * @param code
 * @returns {Promise<T>}
 */
export const releaseKey = function(device, code) {
  return this.$thunder.api.RemoteControl.release({ device: device, code: code })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to delete remote control key from table
 * @param device
 * @param code
 * @returns {Promise<T>}
 */
export const deleteRemoteControlKey = function(device, code) {
  return this.$thunder.api.RemoteControl.delete({ device: device, code: code })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to add remote control key from table
 * @param device
 * @param code
 * @returns {Promise<T>}
 */
export const addRemoteControlKey = function(device, code, keyvalue) {
  return this.$thunder.api.RemoteControl.add({ device: device, code: code, key: keyvalue })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to modify existing remote control key from table
 * @param device
 * @param code
 * @param keyvalue
 * @returns {Promise<T>}
 */
export const modifyRemoteControlKey = function(device, code, keyvalue, modifiers) {
  return this.$thunder.api.RemoteControl.modify({
    device: device,
    code: code,
    key: keyvalue,
    modifiers: modifiers,
  })
    .then(result => result)
    .catch(err => err)
}
