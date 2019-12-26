import {
  setWebKitUrl,
  webKitBrowserStartAndResume,
  pluginDeactivate,
  pluginActivate,
} from '../../commonMethods/commonFunctions'
import fs from 'fs'
import constants from '../../commonMethods/constants'

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
    ])
  },
  teardown() {
    listener.dispose()
  },
  context: {
    url: 'http://cdn.metrological.com/static/testbot/v1/key_app.html',
  },
  steps: [
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
      description: 'Sleep until URL is loaded',
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
