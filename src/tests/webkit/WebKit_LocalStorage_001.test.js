import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import {
  setlocalstorageenabled,
  getLocalStorageEnabledStatus,
} from '../../commonMethods/webKitBrowser'
import constants from '../../commonMethods/constants'

export default {
  title: 'Webkit Local Storage - 001',
  description: 'Set the Local storage status to true and check whether the same is set or not',
  context: {
    status: true,
  },
  plugin: [constants.webKitBrowserPlugin, constants.youTubePlugin, constants.uxplugin],
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //cycle the browser
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
    ])
  },
  steps: [
    {
      description: 'Set Local storage status and validate the result',
      test() {
        return setlocalstorageenabled.call(this, this.$context.read('status'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error('Error in setting Local storage to true')
        }
      },
    },
    {
      description: 'Get Local Storage status and validate the result',
      test() {
        return getLocalStorageEnabledStatus.call(this)
      },
      validate(result) {
        if (result === this.$context.read('status')) {
          return true
        } else {
          throw new Error('Error in getting local storage status')
        }
      },
    },
  ],
}
