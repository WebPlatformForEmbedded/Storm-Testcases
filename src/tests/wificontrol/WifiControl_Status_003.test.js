import baseTest from './WifiControl_Connect_001.test'
import { connectWifi, getWifiStatus, scanWifi } from '../../commonMethods/wificontrol'

export default {
  ...baseTest,
  title: 'Wifi Control - Status 003',
  description:
    'Gets the status when wifi is connected and scanning in progress and validates the result',
  steps: baseTest.steps.map((step, index) => {
    if (index === 6) {
      return {
        description:
          'Gets Wifi Status when  Wifi is connected and scanning is in progress and validates the result',
        sleep: 20,
        test() {
          scanWifi.call(this)
          return getWifiStatus.call(this)
        },
        validate(res) {
          if (res.connected === this.$data.read('selectedWifi') && res.scanning === true) {
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
