import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setWebKitUrl } from '../../commonMethods/webKitBrowser'
import { screenshot } from '../../commonMethods/commonFunctions'

let listener
let curSameScreenshot = 0
let maxSameScreenshot = 3
export default {
  title: 'OCDM playback test when OCDM is disabled',
  description: 'Start a playready video while OCDM plugin is disabled',
  context: {
    url: 'http://cdn.metrological.com/static/eme-v3-clean.html',
    blankUrl: 'about:blank',
  },
  plugin: [constants.ocdmPlugin],
  setup() {
    return this.$sequence([
      () => this.$data.write('prevScreenshot', null),
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
      description: 'Deactivate OCDM Plugin',
      test: pluginDeactivate,
      params: constants.ocdmPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Load the app on WPEWebkit',
      test() {
        this.$log(this.$context.read('url'))
        return setWebKitUrl.call(this, this.$context.read('url'))
      },
      validate(url) {
        return url === this.$context.read('url')
      },
    },
    {
      description: 'Wait until URL is loaded',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (this.$data.read('currentUrl') === this.$context.read('url')) {
              clearInterval(interval)
              resolve()
            }
            reject('URL not loaded within time limit')
          }, 1000)
        })
      },
    },
    {
      description: 'Repeat Taking screenshot and compare with prev screenshot',
      repeat: 10,
      test: screenshot,
      validate() {
        let resp = this.$data.read('screenshotResult')
        if (resp !== undefined && resp.length > 0) {
          let prevScreenshot = this.$data.read('prevScreenshot')
          if (
            prevScreenshot === null ||
            (prevScreenshot !== null && prevScreenshot.equals(resp) === true)
          ) {
            prevScreenshot = resp
            curSameScreenshot++
            return true
          } else {
            throw new Error('Screen updated')
          }
        } else {
          if (curSameScreenshot >= maxSameScreenshot) {
            throw new Error(
              'Screen did not update, new screenshot is the same as previous screenshot for ' +
                curSameScreenshot +
                ' times.'
            )
          }
        }
      },
    },
    {
      description: 'Navigating to blank URL',
      test: setWebKitUrl,
      params: constants.blankUrl,
      assert: constants.blankUrl,
    },
  ],
}
