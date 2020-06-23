/**
 * This function is used to get Display Info
 * @returns {Promise<T>}
 */
export const getDisplayInfo = function() {
  return this.$thunder.api.DisplayInfo.displayinfo()
    .then(result => result)
    .catch(err => err)
}
