import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'
import { disconnectWifi, getWifiStatus, scanWifi } from '../../commonMethods/wificontrol'

export default {
  title: 'Wifi Control - Status 003',
  description:
    'Gets the status when No wifi is connected and scanning in progress and validates the result',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.wifiControlPlugin),
      () => pluginActivate.call(this, constants.wifiControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Gets Wifi Status and disconnect if already connected',
      sleep: 5,
      test() {
        return getWifiStatus.call(this)
      },
      validate(res) {
        if (res.connected !== '') {
          disconnectWifi.call(this, res.connected)
          return true
        } else if (res.connected === '') {
          return true
        } else {
          throw new Error(`Wifi status is improper and the error is ${res}`)
        }
      },
    },
    {
      description:
        'Gets Wifi Status when no Wifi is connected and scanning is in progress and validates the result',
      sleep: 5,
      test() {
        scanWifi.call(this)
        return getWifiStatus.call(this)
      },
      validate(res) {
        console.log(res)
        if (res.connected === '' && res.scanning === true) {
          return true
        } else {
          throw new Error(`Wifi status is improper and the error is ${res}`)
        }
      },
    },
  ],
}
