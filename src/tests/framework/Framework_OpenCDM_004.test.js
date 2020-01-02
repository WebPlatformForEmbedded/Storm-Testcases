import {
  pluginActivate,
  pluginDeactivate,
  screenshot,
  setWebKitUrl,
  webKitBrowserStartAndResume,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

let listener
let curSameScreenshot = 0
let maxSameScreenshot = 3
export default {
  title: 'OCDM playback test when OCDM is disabled',
  description: 'Start a playready video while OCDM plugin is disabled',
  context: {
    url: 'https://www.websocket.org/demos/racer/run/',
    blankUrl: 'about:blank',
  },
  setup() {
    return this.$sequence([
      () => this.$data.write('prevScreenshot', null),
      () => webKitBrowserStartAndResume.call(this),
      () =>
        (listener = this.$thunder.api.WebKitBrowser.on('urlchange', data => {
          this.$data.write('currentUrl', data.url)
        })),
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
            if (this.$data.read('currentUrl') === this.$context.read('metrologicalURL')) {
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
      repeat: 20,
      test: screenshot,
      validate() {
        let resp = this.$data.read('screenshotResult')
        if (resp !== undefined && resp.length > 0) {
          let prevScreenshot = this.$data.read('prevScreenshot')
          if (
            prevScreenshot === null ||
            (prevScreenshot !== null && prevScreenshot.equals(resp) === false)
          ) {
            this.$data.write('prevScreenshot', resp)
            curSameScreenshot = 0
            return true
          } else {
            if (curSameScreenshot >= maxSameScreenshot) {
              this.$log(
                'Screen is stuck, new screenshot is the same as previous screenshot for ' +
                  curSameScreenshot +
                  ' times.'
              )
              return false
            }
            curSameScreenshot++
            return true
          }
        } else {
          if (curSameScreenshot >= maxSameScreenshot) {
            this.$log('Error screenshot returned is empty for ' + curSameScreenshot + ' times.')
            return false
          }
          curSameScreenshot++
          return true
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