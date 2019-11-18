import { setWebKitUrl, calcAvgFPS, webKitBrowserOps } from './commonMethods/commonFunctions'
import { fetchWebKitFPS } from './commonMethods/webKitPerformanceCommonFunctions'
import constants from './commonMethods/constants'

let URL = 'http://webkit.org/blog-files/3d-transforms/poster-circle.html'
let listener

export default {
  setup() {
    this.$data.write('samples', [])
    return this.$sequence([
      () => webKitBrowserOps.call(this),
      () =>
        (listener = this.$thunder.api.WebKitBrowser.on('urlchange', data => {
          this.$data.write('currentUrl', data.url)
        })),
    ])
  },
  teardown() {
    setWebKitUrl.call(this, constants.blankUrl)
    listener.dispose()
  },
  context: {
    minFPS: 40,
  },
  title: 'WPEWebkit performance poster circle',
  description: 'Loads the Poster Circle CSS3 animation and measures its performance',
  steps: [
    {
      description: 'Navigating to Poster Circle URL',
      test: setWebKitUrl,
      params: URL,
      assert: URL,
    },
    {
      description: 'Sleep until URL is loaded',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'url change' response from the listener
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (this.$data.read('currentUrl') === URL) {
              clearInterval(interval)
              resolve()
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
      //Assertion is not required as it is handled in fetchFPS function
    },
    {
      description: 'Calculate average FPS',
      test: calcAvgFPS,
    },
  ],
  validate() {
    let average = this.$data.read('average')
    return this.$expect(Math.ceil(average)).to.be.greaterThan(this.$context.read('minFPS'))
  },
}
