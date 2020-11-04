import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setLanguage, getLanguage, setWebKitUrl } from '../../commonMethods/webKitBrowser'
import constants from '../../commonMethods/constants'

export default {
  title: 'Webkit Languages - 002',
  description: 'Sets the Language of WebKit and validate the same is set or not',
  context: {
    language: 'en-GB',
  },
  plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //cycle the browser
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => setWebKitUrl.call(this, constants.blankUrl),
    ])
  },
  steps: [
    {
      description: 'Set Language and validate the result',
      test() {
        return setLanguage.call(this, this.$context.read('language'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Error in setting language')
        }
      },
    },
    {
      description: 'Get Language and validate the result',
      test() {
        return getLanguage.call(this)
      },
      validate(result) {
        let res = result[0]
        if (res === this.$context.read('language')) {
          return true
        } else {
          throw new Error('Error in getting language')
        }
      },
    },
  ],
}
