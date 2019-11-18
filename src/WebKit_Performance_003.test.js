import baseTest from './WebKit_Performance_001.test.js'
import { setWebKitUrl } from './commonMethods/commonFunctions'

const URL = 'https://webkit.org/blog-files/leaves/'

export default {
  ...baseTest,
  ...{
    title: 'WPEWebkit performance falling leaves',
    description: 'Loads the falling leaves CSS3 animation and measures its performance',
    steps: baseTest.steps.map((step, index) => {
      if (index === 1) {
        return {
          description: 'Navigating to falling leaves',
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
