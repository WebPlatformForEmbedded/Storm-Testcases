import baseTest from './WifiControl_Connect_001.test'
import { connectWifi } from '../../commonMethods/wificontrol'

export default {
  ...baseTest,
  ...{
    title: 'Wifi Control - Connect 003',
    description: 'Connect to the already connected wifi and validate the result',
    steps: [
      baseTest,
      {
        description: 'Connect to the already connected Wifi and validate the result',
        sleep: 5,
        test() {
          return connectWifi.call(this)
        },
        validate(res) {
          if (res.code === 9 && res.message === 'ERROR_ALREADY_CONNECTED') {
            return true
          } else {
            throw new Error(`Proper Error message is not shown and the error is ${res}`)
          }
        },
      },
    ],
  },
}
