import baseTest from './WebKit_Performance_001.test'
import { setWebKitUrl } from './commonMethods/commonFunctions'

const URL = 'http://helloracer.com/racer-s/'

export default {
  ...baseTest,
  ...{
    title: 'WPEWebkit performance racer-s',
    description: 'Loads the Racer-S WebGL animation and measures its performance',
    context: {
      minFPS: 30,
    },
    steps: baseTest.steps.map((step, index) => {
      if (index === 1) {
        return {
          description: 'Navigating to Racer-S WebGL',
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
    validate() {
      let average = this.$data.read('average')
      return this.$expect(Math.ceil(average)).to.be.greaterThan(this.$context.read('minFPS'))
    },
  },
}
