import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getPluginInfo, screenshot } from '../../commonMethods/commonFunctions'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'

let listener

export default {
  title: 'Framework snapshot test 004',
  description:
    'Tests if the Framework snapshot module works by updating the WPEWebkit and checking if it changed',
  context: {
    metrologicalURL: 'https://www.metrological.com/',
    googleURL: 'https://www.google.com/',
  },
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
      () => {
        listener = this.$thunder.api.WebKitBrowser.on(
          'urlchange',
          data => {
            this.$log('Got urlchange event: ', data.url)
            this.$data.write('currentUrl', data.url)
          },
          e => {
            this.$log('Error subscribing to urlchange: ', e)
          }
        )
        return true
      },
    ])
  },
  teardown() {
    listener.dispose()
  },
  steps: [
    {
      description: 'Deactivating Snapshot Plugin',
      test: pluginDeactivate,
      params: constants.snapshotPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activating Snapshot Plugin',
      test: pluginActivate,
      params: constants.snapshotPlugin,
      assert: 'activated',
    },
    {
      description: 'Get Snapshot Plugin Info',
      sleep: 5, //This sleep is to make sure that Provisioning plugin is activated
      test: getPluginInfo,
      params: constants.snapshotPlugin,
      validate(result) {
        return this.$expect(result).to.be.object() === true
      },
    },
    {
      description: 'Navigating to metrological URL',
      test() {
        this.$log(this.$context.read('metrologicalURL'))
        return setWebKitUrl.call(this, this.$context.read('metrologicalURL'))
      },
      validate(url) {
        return url === this.$context.read('metrologicalURL')
      },
    },
    {
      description: 'Get a screenshot',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (this.$data.read('currentUrl') === this.$context.read('metrologicalURL')) {
              clearInterval(interval)
              resolve()
            }
            reject('URL not loaded within time limit')
          }, 1000)
        })
      },
      test: screenshot,
      validate() {
        let resp = this.$data.read('screenshotResult')
        this.$data.write('screenshot', resp)
        if (resp === undefined || resp.length === 0) {
          throw new Error('Error while reading snapshot from Framework')
        } else {
          return true
        }
      },
    },
    {
      description: 'Navigating to Google URL',
      test() {
        this.$log(this.$context.read('googleURL'))
        return setWebKitUrl.call(this, this.$context.read('googleURL'))
      },
      validate(url) {
        return url === this.$context.read('googleURL')
      },
    },
    {
      description: 'Get another screenshot and check if it changed',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (this.$data.read('currentUrl') === this.$context.read('googleURL')) {
              clearInterval(interval)
              resolve()
            }
            reject('URL not loaded within time limit')
          }, 1000)
        })
      },
      test: screenshot,
      validate() {
        let resp = this.$data.read('screenshotResult')
        let previousResp = this.$data.read('screenshot')
        if (
          previousResp !== undefined &&
          resp !== undefined &&
          resp.length > 0 &&
          previousResp.equals(resp) === false
        ) {
          return true
        } else {
          throw new Error('Screenshot did not change or empty response')
        }
      },
    },
    {
      description: 'Navigating to blank URL',
      test: setWebKitUrl,
      params: constants.blankUrl,
      assert: constants.blankUrl,
    },
    {
      description: 'Get a screenshot',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (this.$data.read('currentUrl') === constants.blankUrl) {
              clearInterval(interval)
              resolve()
            }
            reject('URL not loaded within time limit')
          }, 1000)
        })
      },
      test: screenshot,
      validate() {
        let resp = this.$data.read('screenshotResult')
        this.$data.write('screenshot', resp)
        if (resp === undefined || resp.length === 0) {
          throw new Error('Error while reading snapshot from Framework')
        } else {
          return true
        }
      },
    },
    {
      description: 'Take another screenshot, screen should be the same',
      sleep: 5,
      test: screenshot,
    },
  ],
  validate() {
    let resp = this.$data.read('screenshotResult')
    let previousResp = this.$data.read('screenshot')
    if (
      previousResp !== undefined &&
      resp !== undefined &&
      resp.length > 0 &&
      previousResp.equals(resp) === true
    ) {
      return true
    } else {
      throw new Error('Screenshot changed or empty response')
    }
  },
}
