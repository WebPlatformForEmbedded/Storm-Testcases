import {
  getPluginConfiguration,
  pluginActivate,
  pluginDeactivate,
  setPluginConfiguration,
} from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'

export default {
  title: 'Framework Controller Configuration - 005',
  description: 'Set the plugin configuration when plugin is active and validate the result',
  plugin: [constants.controllerPlugin, constants.webKitBrowserPlugin, constants.uxplugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //cycle the browser
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => setWebKitUrl.call(this, 'about:blank'),
      () => {
        return this.$thunder.api.call('WebKitBrowser', 'state', 'resumed')
      },
    ])
  },
  steps: [
    {
      description: 'Get WebKit Plugin Configuration and validate the result',
      test() {
        return getPluginConfiguration.call(this, constants.webKitBrowserPlugin)
      },
      validate(res) {
        this.$data.write('webkitconfig', res)
        if (res !== undefined && res !== null) {
          return true
        } else {
          throw new Error('Configuration not available')
        }
      },
    },
    {
      description: 'Set Plugin Configuration and validate the result',
      sleep: 5,
      test() {
        return setPluginConfiguration.call(
          this,
          constants.webKitBrowserPlugin,
          this.$data.read('webkitconfig')
        )
      },
      validate(res) {
        if (res.code == '1' && res.message === 'ERROR_GENERAL') {
          return true
        } else {
          throw new Error(
            `Error message is improper when setting active plugin configuration and Error: {code: ${res.code}, message:${res.message}}`
          )
        }
      },
    },
  ],
}
