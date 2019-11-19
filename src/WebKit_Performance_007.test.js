import baseTest from './WebKit_Performance_001.test.js'
import { setWebKitUrl } from './commonMethods/commonFunctions'

const URL = 'http://oos.moxiecode.com/js_webgl/particles_morph/'

export default {
  ...baseTest,
  ...{
    title: 'WPEWebkit performance anisotropic',
    description: 'Loads the Particles webGL animation and measures its performance',
    context: {
      minFPS: 20,
    },
    steps: baseTest.steps.map((step, index) => {
      if (index === 0) {
        return {
          description: 'Navigating to Particles webGL',
          test: setWebKitUrl,
          params: URL,
          assert: URL,
        }
      }
      if (index === 1) {
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
