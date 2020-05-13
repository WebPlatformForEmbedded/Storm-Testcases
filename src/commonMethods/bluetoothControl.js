/**
 * This function is used to connect with the available Bluetooth devices
 * @param address
 * @returns {Promise<AxiosResponse<any>>}
 */
export const connectBTDevice = function(address) {
  return this.$thunder.api.BluetoothControl.connect(address)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to disconnect with the available Bluetooth devices
 * @param address
 * @returns {Promise<AxiosResponse<any>>}
 */
export const disconnectBTDevice = function(address) {
  return this.$thunder.api.BluetoothControl.disconnect(address)
    .then(result => result)
    .catch(err => err)
}

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

/**
 * This function is used to scan Info of Bluetooth Control Plugin
 * @param type , timeout
 * @returns {Promise<AxiosResponse<any>>}
 */
export const scanDevices = function(type, timeout) {
  return this.$thunder.api.BluetoothControl.scan(type, timeout)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to pair with the available Bluetooth devices
 * @param address
 * @returns {Promise<AxiosResponse<any>>}
 */
export const pairBTDevice = function(address) {
  return this.$thunder.api.BluetoothControl.pair(address)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to disconnect with the available Bluetooth devices
 * @param address
 * @returns {Promise<AxiosResponse<any>>}
 */
export const unpairBTDevice = function(address) {
  return this.$thunder.api.BluetoothControl.unpair(address)
    .then(result => result)
    .catch(err => err)
}
