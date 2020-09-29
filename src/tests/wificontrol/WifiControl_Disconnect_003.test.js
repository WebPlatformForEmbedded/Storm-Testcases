import baseTest from './WifiControl_Connect_001.test'
import { disconnectWifi, scanWifi } from '../../commonMethods/wificontrol'

export default {
  ...baseTest,
  title: 'Wifi Control - Disconnect 003',
  description:
    'Disconnect to the Wifi Network when Scanning is in progress and validate the result',
  steps: baseTest.steps.map((step, index) => {
    if (index === 6) {
      return {
        description: 'Disconnect to the Wifi when scanning is in progress',
        sleep: 20,
        test() {
          scanWifi.call(this)
          return disconnectWifi.call(this, this.$data.read('selectedWifi'))
        },
        validate(res) {
          if (res === null) {
            return true
          } else {
            throw new Error(`Wifi could not be disconnected and error is ${res}`)
          }
        },
      }
    }
    return step
  }),
}
