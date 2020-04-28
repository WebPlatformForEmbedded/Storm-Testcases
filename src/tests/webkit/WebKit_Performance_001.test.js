import {
  setWebKitUrl,
  calcAvgFPS,
  pluginActivate,
  pluginDeactivate,
} from '../../commonMethods/commonFunctions'
import { fetchWebKitFPS } from '../../commonMethods/webKitPerformanceCommonFunctions'
import constants from '../../commonMethods/constants'

let listener

export default {
  context: {
    minFPS: 30,
    url: 'https://webkit.org/blog-files/3d-transforms/poster-circle.html',
  },
  setup() {
    this.$data.write('samples', [])
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => setWebKitUrl.call(this, 'about:blank'),
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
    setWebKitUrl.call(this, constants.blankUrl)
    listener.dispose()
  },
  title: 'WPEWebkit performance poster circle',
  description: 'Loads the Poster Circle CSS3 animation and measures its performance',
  steps: [
    {
      description: 'Navigating to Poster Circle URL',
      test() {
        this.$log('Setting url: ', this.$context.read('url'))
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
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (this.$data.read('currentUrl') === this.$context.read('url')) {
              clearInterval(interval)
              setTimeout(resolve, 5000) //give it some time to load
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('URL not loaded within time limit')
            }
          }, 1000)
        })
      },
    },
    {
      description: 'Fetch FPS',
      repeat: 11,
      test: fetchWebKitFPS,
    },
    {
      description: 'Calculate average FPS',
      test: calcAvgFPS,
    },
  ],
  validate() {
    let average = this.$data.read('average')
    this.$log('Average FPS ' + average)
    return this.$expect(Math.ceil(average)).to.be.greaterThan(this.$context.read('minFPS'))
  },
}
