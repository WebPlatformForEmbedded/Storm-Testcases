import constants from './constants'
import { pluginActivate, pluginDeactivate } from './controller'

/**
 * This function resumes or suspends Youtube plugin
 * @param action
 */
export const youtubeChangeState = function(action) {
  return this.$thunder.api.Cobalt.state(action)
    .then(() => {
      return this.$thunder.api.call(constants.controllerPlugin, 'status').then(
        result =>
          result.filter(p => {
            return p.callsign === 'Cobalt'
          })[0].state
      )
    })
    .catch(err => err)
}

/**
 * This function gets the URL
 * @param URL
 * @returns URL
 */
export const getYoutubeUrl = function(URL) {
  return this.$thunder.api.Cobalt.url(URL)
    .then(() =>
      this.$thunder.api.Cobalt.url().then(url => {
        this.$log('URL is', url)
        return url
      })
    )
    .catch(err => err)
}

/**
 * This function performs below operations on Youtube Plugin
 *  - Deactivate
 *  - Activate
 *  - Resume
 */
export const youtubeStartAndResume = function() {
  return this.$sequence([
    () => pluginDeactivate.call(this, constants.youTubePlugin),
    () => pluginActivate.call(this, constants.youTubePlugin),
    () => youtubeChangeState.call(this, constants.resume),
  ])
}

/**
 * This function sets the state of Cobalt
 * @param state
 * @returns state
 */
export const setCobaltState = function(state) {
  return this.$thunder.api.Cobalt.state(state)
    .then(state => state)
    .catch(err => err)
}

/**
 * This function gets the state of Cobalt
 * @returns state
 */
export const getCobaltState = function() {
  return this.$thunder.api.Cobalt.state()
    .then(state => state)
    .catch(err => err)
}
/**
 * This function sets the URL on Cobalt
 * @param URL
 * @returns URL
 */
export const setCobaltUrl = function(URL) {
  return this.$thunder.api.Cobalt.url(URL)
    .then(url => url)
    .catch(err => err)
}
/**
 * This function gets the URL on Cobalt
 * @returns {Promise<T>}
 */
export const getCobaltUrl = function() {
  return this.$thunder.api.Cobalt.url()
    .then(url => url)
    .catch(err => err)
}

/**
 * This function sets the visibility of Cobalt
 * @param status
 * @returns {Promise<T>}
 */
export const setCobaltVisibility = function(status) {
  return this.$thunder.api.Cobalt.visibility(status)
    .then(res => res)
    .catch(err => err)
}
/**
 * This function gets the visibility of Cobalt
 * @returns {Promise<T>}
 */
export const getCobaltVisibility = function() {
  return this.$thunder.api.Cobalt.visibility()
    .then(res => res)
    .catch(err => err)
}

/**
 * This function is used to suspend or resume UX Plugin
 * @param state
 * @returns {Promise<unknown>}
 */
export const suspendOrResumeCobaltPlugin = function(state) {
  return this.$thunder.api.Cobalt.state(state)
    .then(result => result)
    .catch(err => err)
}

/**
 * This function deletes the content from persistent storage
 * @param status
 * @returns {Promise<T>}
 */
export const deleteFromDirectory = function(status) {
  return this.$thunder.api.Cobalt.visibility(status)
    .then(res => res)
    .catch(err => err)
}
