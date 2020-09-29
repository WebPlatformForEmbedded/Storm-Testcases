import baseTest from './WifiControl_Connect_001.test'
import { disconnectWifi } from '../../commonMethods/wificontrol'

export default {
  ...baseTest,
  ...{
    title: 'Wifi Control - Disconnect 004',
    description: 'Disconnect to the already connected wifi and validate the result',
    steps: [
      baseTest,
      {
        description: 'Disconnect to the already connected Wifi and validate the result',
        sleep: 5,
        test() {
          return disconnectWifi.call(this, this.$data.read('selectedWifi'))
        },
        validate(res) {
          if (res === null) {
            return true
          } else {
            throw new Error(`Proper message is not shown and the error is ${res}`)
          }
        },
      },
    ],
  },
}
