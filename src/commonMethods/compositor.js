/**
 * This function is used to put the plugin below
 * @param plugin
 * @returns {Promise<unknown>}
 */
export const putBelow = function(plugin, pluginNameToPutBelow) {
  return this.$thunder.api.Compositor.putbelow({ client: plugin, relative: pluginNameToPutBelow })
    .then(result => result)
    .catch(err => err)
}
/**
 * This function is used to put the plugin on the top
 * @param plugin
 * @returns {Promise<unknown>}
 */
export const putOnTop = function(plugin) {
  return this.$thunder.api.Compositor.putontop({ client: plugin })
    .then(result => result)
    .catch(err => err)
}
/**
 * This function is used to get the zorder of the plugins
 * @returns {Promise<unknown>}
 */
export const getZOrder = function() {
  return this.$thunder.api.Compositor.zorder()
    .then(result => {
      this.$data.write('zorder', result)
      return result
    })
    .catch(err => err)
}
/**
 * This function is used to get Compositor Clients
 * @returns {Promise<unknown>}
 */
export const getCompositorClients = function() {
  return this.$thunder.api.Compositor.clients()
    .then(result => result)
    .catch(err => err)
}
/**
 * This function is used to get Compositor Client Geometry
 * @returns {Promise<unknown>}
 */
export const getClientGeometry = function(pluginName) {
  let methodName = 'geometry@' + pluginName
  return this.$thunder.api.Compositor[methodName]()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to sets Compositor Client Geometry
 * @returns {Promise<unknown>}
 */
export const setClientGeometry = function(pluginName, x, y, width, height) {
  let methodName = 'geometry@' + pluginName
  return this.$thunder.api.Compositor[methodName]({ x: x, y: y, width: width, height: height })
    .then(result => result)
    .catch(err => err)
}
/**
 * This function is used to set Client Visibility
 * @param client
 * @param state
 * @returns {Promise<unknown>}
 */
export const setClientVisibility = function(client, state) {
  let methodName = 'visiblity@' + client
  return this.$thunder.api.Compositor[methodName](state)
    .then(result => result)
    .catch(err => err)
}
/**
 * This function is used to set Client Opacity
 * @param client
 * @param value
 * @returns {Promise<unknown>}
 */
export const setClientOpacity = function(client, value) {
  let methodName = 'opacity@' + client
  return this.$thunder.api.Compositor[methodName](value)
    .then(result => result)
    .catch(err => err)
}
/**
 * This function is used to set Compositor resolution
 * @param resolution
 * @returns {Promise<unknown>}
 */
export const setCompositorResolution = function(resolution) {
  return this.$thunder.api.Compositor.resolution(resolution)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get Compositor resolution
 * @returns {Promise<unknown>}
 */
export const getCompositorResolution = function() {
  return this.$thunder.api.Compositor.resolution()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is select a client
 * @param plugin
 * @returns {Promise<unknown>}
 */
export const selectClient = function(plugin) {
  return this.$thunder.api.Compositor.select({ client: plugin })
    .then(result => result)
    .catch(err => err)
}
