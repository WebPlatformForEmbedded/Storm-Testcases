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
