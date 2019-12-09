import { setWebKitUrl, calcAvgFPS, webKitBrowserOps } from './commonMethods/commonFunctions'
import { fetchWebKitFPS } from './commonMethods/webKitPerformanceCommonFunctions'
import constants from './commonMethods/constants'

let listener

export default {
  context: {
    minFPS: 40,
    url: 'http://webkit.org/blog-files/3d-transforms/poster-circle.html',
  },
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
  title: 'WPEWebkit performance poster circle',
  description: 'Loads the Poster Circle CSS3 animation and measures its performance',
  steps: [
    {
      description: 'Navigating to Poster Circle URL',
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
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (this.$data.read('currentUrl') === this.$context.read('url')) {
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
