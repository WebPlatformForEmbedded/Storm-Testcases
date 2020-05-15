/**
 * This function is used to get available Bluetooth devices
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBluetoothDevices = function() {
  return this.$thunder.api.BluetoothControl.devices()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get available Bluetooth adapters
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBluetoothAdapters = function() {
  return this.$thunder.api.BluetoothControl.adapters()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get info of particular Bluetooth adapters
 * @param adaptername
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBluetoothAdapterInfo = function(adaptername) {
  return this.$thunder.api.BluetoothControl.adapter(adaptername)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get info of particular Bluetooth device
 * @param devicemac
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getBluetoothDeviceInfo = function(devicemac) {
  return this.$thunder.api.BluetoothControl.adapter(devicemac)
    .then(result => result)
    .catch(err => err)
}
