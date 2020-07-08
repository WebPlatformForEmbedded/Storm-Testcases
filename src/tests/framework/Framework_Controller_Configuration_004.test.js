import {
  getPluginConfiguration,
  pluginDeactivate,
  setPluginConfiguration,
} from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Framework Controller Configuration - 004',
  description: 'Set the plugin configuration and check whether it is set or not',
  steps: [
    {
      description: 'Get Plugin Configuration and validate the result',
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
      description: 'Deactivate Webkit Browser',
      test() {
        let newConfig = this.$data.read('webkitconfig')
        newConfig.fps = 'hello'
        pluginDeactivate.call(this, constants.webKitBrowserPlugin)
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
        if (res === null) {
          return true
        } else {
          throw new Error('Configuration not updated')
        }
      },
    },
    {
      description: 'Get Plugin Configuration and get the same and validate the result',
      test() {
        return getPluginConfiguration.call(this, constants.webKitBrowserPlugin)
      },
      validate(res) {
        if (res.fps == 'hello') {
          return true
        } else {
          throw new Error('Configuration not available')
        }
      },
    },
    {
      description: 'Set Plugin Configuration to previous and get the same and validate the result',
      sleep: 5,
      test() {
        let oldConfig = this.$data.read('webkitconfig')
        oldConfig.fps = true
        return setPluginConfiguration.call(
          this,
          constants.webKitBrowserPlugin,
          this.$data.read('webkitconfig')
        )
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Configuration not updated')
        }
      },
    },
    {
      description: 'Get Plugin Configuration and get the same and validate the result',
      test() {
        return getPluginConfiguration.call(this, constants.webKitBrowserPlugin)
      },
      validate(res) {
        if (res.fps === true) {
          return true
        } else {
          throw new Error('Configuration not available')
        }
      },
    },
  ],
}
