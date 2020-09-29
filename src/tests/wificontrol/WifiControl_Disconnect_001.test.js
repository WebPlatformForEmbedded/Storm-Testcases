import baseTest from './WifiControl_Connect_001.test'
import { getWifiStatus, disconnectWifi } from '../../commonMethods/wificontrol'

export default {
  ...baseTest,
  ...{
    title: 'Wifi Control - Disconnect 001',
    description: 'Disconnect the already connected wifi and validate the result',
    steps: [
      baseTest,
      {
        description: 'Disconnect the connected Wifi and validate the result',
        sleep: 5,
        test() {
          return disconnectWifi.call(this)
        },
        validate(res) {
          if (res === null) {
            return true
          } else {
            throw new Error(`Wifi Not disconnected and the error is ${res}`)
          }
        },
      },
      {
        description: 'Check whether wifi is disconnected',
        sleep: 5,
        test() {
          return getWifiStatus.call(this)
        },
        validate(res) {
          if (res.connected === '') {
            return true
          } else {
            throw new Error(`Wif Not disconnected and the error is ${res}`)
          }
        },
      },
    ],
  },
}
