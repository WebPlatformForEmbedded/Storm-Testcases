import { pluginActivate, pluginDeactivate, storeconfig } from '../../commonMethods/controller'
import {
  connectWifi,
  getWifiNetworks,
  getWifiStatus,
  scanWifi,
  setWifiConfig,
} from '../../commonMethods/wificontrol'
import constants from '../../commonMethods/constants'

let wifiNetworks
export default {
  title: 'Wifi Control - Connect 001',
  description: 'Connect to a valid Wifi network',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.wifiControlPlugin),
      () => pluginActivate.call(this, constants.wifiControlPlugin),
    ])
  },
  steps: [
    {
      description: 'Scan and validate the result',
      sleep: 5,
      test() {
        return scanWifi.call(this)
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          this.$log(`Proper error message is not shown and is ${res.message}, ${res.code}`)
          return false
        }
      },
    },
    {
      description: 'Get wifi networks available',
      sleep: 5,
      test() {
        return getWifiNetworks.call(this)
      },
      validate(res) {
        this.$data.write('wifiNetworks', res)
        wifiNetworks = this.$data.read('wifiNetworks')
        if (typeof wifiNetworks === 'object') {
          return true
        } else {
          throw new Error('Wifi network data is not an Object')
        }
      },
    },
    {
      description: 'Display list of wifi to select',
      sleep: 15,
      test() {
        return this.$prompt.selectChoices(
          'Select from the list of Wifi Networks',
          wifiNetworks.map(ssid => ssid.ssid),
          20
        )
      },
      validate(res) {
        this.$data.write('selectedWifi', res[0])
        console.log(this.$data.read('selectedWifi'))
        return true
      },
    },
    {
      description: 'Enter password for Wifi',
      test() {
        return this.$prompt.enterText('Enter Password for the wifi network', 20)
      },
      validate(res) {
        this.$data.write('wifiPassword', res)
        console.log('WifiPwd is', this.$data.read('wifiPassword'))
        return true
      },
    },
    {
      description: 'Set Configuration for the selected Wifi',
      test() {
        return setWifiConfig.call(
          this,
          this.$data.read('selectedWifi'),
          false,
          false,
          this.$data.read('wifiPassword')
        )
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error(`Wifi Config could not be set and error is ${res}`)
        }
      },
    },
    {
      description: 'Store Configuration for the selected Wifi',
      test() {
        return storeconfig.call(this)
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error(`Wifi Config could not be stored error is ${res}`)
        }
      },
    },
    {
      description: 'Connect to the WIfi',
      sleep: 20,
      test() {
        console.log('Selected Wifi is', this.$data.read('selectedWifi'))
        return connectWifi.call(this, this.$data.read('selectedWifi'))
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error(`Wifi could not be connected and error is ${res.code}, ${res.message}`)
        }
      },
    },
    {
      description: 'Gets Wifi Status when  Wifi is connected and validates the result',
      sleep: 5,
      test() {
        return getWifiStatus.call(this)
      },
      validate(res) {
        if (res.connected === this.$data.read('selectedWifi')) {
          return true
        } else {
          throw new Error(`Wifi status is improper and the error is ${res}`)
        }
      },
    },
  ],
}
