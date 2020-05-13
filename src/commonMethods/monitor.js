/**
 * This function is used to get Monitor Info
 * @param plugin
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getMonitorInfo = function() {
  return this.$thunder.api.Monitor.status()
    .then(result => {
      this.$data.write('monitorinfo', result)
      return result
    })
    .catch(err => err)
}
