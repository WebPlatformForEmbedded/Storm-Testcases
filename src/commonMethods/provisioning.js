/**
 * This function is used to get Provisioning plugin data
 * @returns {Promise<any> | Thenable<any> | PromiseLike<any>}
 */
export const getProvisioningPluginData = function() {
  return this.$thunder.api.Provisioning.state()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to start Provisioning plugin
 * @returns {Promise<any> | Thenable<any> | PromiseLike<any>}
 */
export const startProvisioning = function() {
  return this.$thunder.api.Provisioning.provision()
    .then(result => result)
    .catch(err => err)
}
