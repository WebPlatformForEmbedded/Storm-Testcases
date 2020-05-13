/**
 * This function is used to get DRMS list
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getDRMSList = function() {
  return this.$thunder.api.OCDM.drms()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get DRMS item info
 * @returns {Promise<AxiosResponse<any>>}
 * @param keysystem
 */
export const getDRMKeySystemInfo = function(keysystem) {
  const methodName = 'keysystems@' + keysystem
  return this.$thunder.api.OCDM[methodName]()
    .then(res => res)
    .catch(err => err)
}
