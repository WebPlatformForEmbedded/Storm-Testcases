/**
 * This function is used to get Display Info
 * @returns {Promise<T>}
 */
export const getDisplayInfo = function() {
  return this.$thunder.api.DisplayInfo.displayinfo()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get Edid Info
 * @param edid
 * @returns {Promise<*>}
 */
export const getEdid = function(edid) {
  return this.$thunder.api.DisplayInfo.edid({ edid: edid })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get totalgpuram
 * @returns {Promise<T>}
 */
export const getTotalGPURam = function() {
  return this.$thunder.api.DisplayInfo.totalgpuram()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get freegpuram
 * @returns {Promise<T>}
 */
export const getFreeGPURam = function() {
  return this.$thunder.api.DisplayInfo.freegpuram()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get Pass through Audio status
 * @returns {Promise<T>}
 */
export const getPassthroughAudioStatus = function() {
  return this.$thunder.api.DisplayInfo.isaudiopassthrough()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get CurrentHDMI Status
 * @returns {Promise<T>}
 */
export const getCurrentHDMIStatus = function() {
  return this.$thunder.api.DisplayInfo.connected()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get Horizontal resolution of TV
 * @returns {Promise<T>}
 */
export const getHorizontalResolution = function() {
  return this.$thunder.api.DisplayInfo.width()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get Vertical resolution of TV
 * @returns {Promise<T>}
 */
export const getVerticalResolution = function() {
  return this.$thunder.api.DisplayInfo.height()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get Vertical Frequency
 * @returns {Promise<T>}
 */
export const getVerticalFrequency = function() {
  return this.$thunder.api.DisplayInfo.verticalfreq()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get HDCP protocol used for transmission.
 * @returns {Promise<T>}
 */
export const getHdcpProtection = function() {
  return this.$thunder.api.DisplayInfo.hdcpprotection()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to set HDCP protocol used for transmission.
 * @param protocol
 * @returns {Promise<*>}
 */
export const setHdcpProtection = function(protocol) {
  return this.$thunder.api.DisplayInfo.hdcpprotection(protocol)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get Video output port on the STB used for connection to TV
 * @returns {Promise<*>}
 */
export const getPortName = function() {
  return this.$thunder.api.DisplayInfo.portname()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get HDR formats supported by TV
 * @returns {Promise<*>}
 */
export const getTvCapabilities = function() {
  return this.$thunder.api.DisplayInfo.tvcapabilities()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get HDR formats supported by TV
 * @returns {Promise<*>}
 */
export const getStbCapabilities = function() {
  return this.$thunder.api.DisplayInfo.stbcapabilities()
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to get HDR format in use
 * @returns {Promise<*>}
 */
export const getHdrSetting = function() {
  return this.$thunder.api.DisplayInfo.hdrsetting()
    .then(result => result)
    .catch(err => err)
}
