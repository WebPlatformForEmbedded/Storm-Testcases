import baseTest from './WifiControl_Connect_001.test'
import { connectWifi, scanWifi } from '../../commonMethods/wificontrol'

export default {
  ...baseTest,
  title: 'Wifi Control - Connect 004',
  description: 'Connect to the Wifi Network when Scanning is in progress and validate the result',
  steps: baseTest.steps.map((step, index) => {
    if (index === 6) {
      return {
        description: 'Connect to the Wifi when scanning is in progress',
        sleep: 20,
        test() {
          scanWifi.call(this)
          return connectWifi.call(this, this.$data.read('selectedWifi'))
        },
        validate(res) {
          if (res === null) {
            return true
          } else {
            throw new Error(`Wifi could not be connected and error is ${res}`)
          }
        },
      }
    }
    return step
  }),
}
