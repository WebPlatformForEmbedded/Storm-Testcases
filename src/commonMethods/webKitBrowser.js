import constants from './constants'
import { pluginActivate, pluginDeactivate } from './controller'

/**
 * This function resumes or suspends WebKitBrowser plugin
 * @param action
 */
export const webKitBrowserActions = function(action) {
  return this.$thunder.api.WebKitBrowser.state(action)
    .then(() => {
      return this.$thunder.api.call(constants.controllerPlugin, 'status').then(
        result =>
          result.filter(p => {
            return p.callsign === 'WebKitBrowser'
          })[0].state
      )
    })
    .catch(err => err)
}

/**
 * This function sets the state of Webkit Browser
 * @param state
 * @returns state
 */
export const setWebKitState = function(state) {
  return this.$thunder.api.WebKitBrowser.state(state)
    .then(state => state)
    .catch(err => err)
}

/**
 * This function gets the state of Webkit Browser
 * @returns state
 */
export const getWebKitState = function() {
  return this.$thunder.api.WebKitBrowser.state()
    .then(state => state)
    .catch(err => err)
}

/**
 * This function sets the URL
 * @param URL
 * @returns URL
 */
export const setWebKitUrl = function(URL) {
  return this.$thunder.api.WebKitBrowser.url(URL)
    .then(() => this.$thunder.api.WebKitBrowser.url().then(url => url))
    .catch(err => err)
}

/**
 * This function sets the URL on WebkitBrowser
 * @param URL
 * @returns URL
 */
export const setWebKitBrowserUrl = function(URL) {
  return this.$thunder.api.WebKitBrowser.url(URL)
    .then(url => url)
    .catch(err => err)
}

/**
 * This function gets the URL on WebKit Browser
 * @returns {Promise<T>}
 */
export const getWebKitBrowserUrl = function() {
  return this.$thunder.api.WebKitBrowser.url()
    .then(url => url)
    .catch(err => err)
}

/**
 * This function gets the visibility of WebkitBrowser
 * @returns {Promise<T>}
 */
export const getWebKitBrowserVisibility = function() {
  return this.$thunder.api.WebKitBrowser.visibility()
    .then(url => url)
    .catch(err => err)
}

/**
 * This function sets the visibility of WebkitBrowser
 * @param status
 * @returns {Promise<T>}
 */
export const setWebKitBrowserVisibility = function(status) {
  return this.$thunder.api.WebKitBrowser.visibility(status)
    .then(url => url)
    .catch(err => err)
}

/**
 * This function performs below operations on WebKitBrowser Plugin
 *  - Deactivate
 *  - Activate
 *  - Resume
 */
export const webKitBrowserStartAndResume = function() {
  return this.$sequence([
    () => pluginDeactivate.call(this, constants.webKitBrowserPlugin),
    () => pluginActivate.call(this, constants.webKitBrowserPlugin),
    () => webKitBrowserActions.call(this, constants.resume),
  ])
}
