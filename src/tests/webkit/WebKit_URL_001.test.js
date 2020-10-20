import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import {
  getWebKitBrowserUrl,
  setWebKitBrowserUrl,
  setWebKitUrl,
} from '../../commonMethods/webKitBrowser'
import constants from '../../commonMethods/constants'

export default {
  title: 'Webkit URL - 001',
  description: 'Loads valid URL and check the webkit behavior',
  plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => setWebKitUrl.call(this, constants.blankUrl),
      () => {
        return this.$thunder.api.call('WebKitBrowser', 'state', 'resumed')
      },
    ])
  },
  context: {
    url: 'http://cdn.metrological.com/static/testbot/v1/images_app.html',
  },
  steps: [
    {
      description: 'Load URL and check the response',
      test() {
        return setWebKitBrowserUrl.call(this, this.$context.read('url'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Proper error message is not shown')
        }
      },
    },
    {
      description: 'Get the Loaded URL',
      test() {
        return getWebKitBrowserUrl.call(this)
      },
      validate(res) {
        if (res === this.$context.read('url')) {
          return true
        } else {
          throw new Error('Proper error message is not shown')
        }
      },
    },
  ],
}
