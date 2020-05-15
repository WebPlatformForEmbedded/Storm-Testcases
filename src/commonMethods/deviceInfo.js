/**
 * This function is used to get System Info of Device Ingo Plugin
 * @param plugin
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getDeviceInfo = function() {
  return this.$thunder.api.DeviceInfo.systeminfo()
    .then(result => {
      this.$data.write('systeminfo', result)
    })
    .catch(err => err)
}

/**
 * This function is used to get Addresses Info of Device Info Plugin
 * @param plugin
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getAddressesInfo = function() {
  return this.$thunder.api.DeviceInfo.addresses()
    .then(result => {
      this.$data.write('addressinfo', result)
      return result
    })
    .catch(err => err)
}

/**
 * This function is used to get CpuLoad
 * @returns {Promise<T>}
 */
export const getCpuLoad = function() {
  this.$thunder.api.DeviceInfo.systeminfo()
    .then(result => {
      this.$data.write('cpuload', result.cpuload)
      return result
    })
    .catch(err => err)
}
