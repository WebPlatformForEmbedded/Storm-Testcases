import baseTest from './WebKit_Performance_001.test.js'
import { setWebKitUrl } from './commonMethods/commonFunctions'

const URL = 'http://www.smashcat.org/av/canvas_test/'

export default {
  ...baseTest,
  ...{
    title: 'WPEWebkit performance smashcat',
    description: 'Loads the smashcat Canvas animation and measures its performance',
    steps: baseTest.steps.map((step, index) => {
      if (index === 1) {
        return {
          description: 'Navigating to smashcat Canvas',
          test: setWebKitUrl,
          params: URL,
          assert: URL,
        }
      }
      if (index === 2) {
        return {
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
        }
      }
      return step
    }),
  },
}
