import {
  setWebKitUrl,
  startHttpServer,
  matchIpRange,
  webKitBrowserStartAndResume,
  pluginDeactivate,
  pluginActivate,
} from '../commonMethods/commonFunctions'
import fs from 'fs'
import constants from '../commonMethods/constants'

var keysArray = ['ok', 'left', 'up', 'right', 'down']
var counter = 0
let listener
let data

export default {
  title: 'Remote control keys test',
  description: 'Sends and verifies key through the remote control plugin',
  setup() {
    return this.$sequence([
      () => webKitBrowserStartAndResume.call(this),
      () =>
        (listener = this.$thunder.api.WebKitBrowser.on('urlchange', data => {
          this.$data.write('currentUrl', data.url)
        })),
      () => (
        (data = fs.readFileSync('./testcases/Storm-Testcases/src/resources/key_app.html')),
        this.$data.write('app', data)
      ),
    ])
  },
  teardown() {
    listener.dispose()
  },
  steps: [
    {
      description: 'Start http server',
      test: startHttpServer,
      validate() {
        let port = this.$data.read('port')
        if (port === null || port === undefined) return false
        return true
      },
    },
    {
      description: 'Determine IP to use',
      test: matchIpRange,
      validate(response) {
        if (response === undefined) return false
        this.$data.write('server', response)

        return true
      },
    },
    {
      description: 'Load the app on WPEWebkit',
      test() {
        this.$log('URL loaded is', `http://${this.$data.read('server')}:${this.$data.read('port')}`)
        return setWebKitUrl.call(
          this,
          `http://${this.$data.read('server')}:${this.$data.read('port')}`
        )
      },
      validate(res) {
        return res === `http://${this.$data.read('server')}:${this.$data.read('port')}/`
      },
    },
    {
      description: 'Sleep until URL is loaded',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (
              this.$data.read('currentUrl') ===
              `http://${this.$data.read('server')}:${this.$data.read('port')}/`
            ) {
              clearInterval(interval)
              resolve()
            }
            reject('URL not loaded within time limit')
          }, 1000)
        })
      },
    },
    {
      description: 'Deactivate Remote Control plugin',
      test: pluginDeactivate,
      params: constants.remoteControlPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate Remote Control plugin',
      test: pluginActivate,
      params: constants.remoteControlPlugin,
      assert: 'activated',
    },
    {
      description: 'Press keys from Remote Control',
      repeat: 4,
      test() {
        let currCount = counter
        counter++
        return this.$thunder.remoteControl.key(keysArray[currCount])
      },
      validate(res) {
        if (res === null) return true
        else return false
      },
    },
  ],
}
