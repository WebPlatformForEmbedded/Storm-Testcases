import { getControllerPluginData, getControllerUI, harakiri } from '../../commonMethods/controller'
import { getNetworkStatus } from '../../commonMethods/networkcontrol'

let counter = 1
let pluginDataBeforeReboot = []
let pluginDataAfterReboot = []

const removeStateOfPlugin = pluginData => {
  let indexOfWebKit = pluginData
    .map(function(item) {
      return item.callsign
    })
    .indexOf('WebKitBrowser')
  let indexOfUX = pluginData
    .map(function(item) {
      return item.callsign
    })
    .indexOf('UX')
  delete pluginData[indexOfWebKit].state
  delete pluginData[indexOfUX].state
}
export default {
  title: 'Thunder Controller - Reboot Stress test',
  description: 'Stress tests the Thunder by rebooting 1000 times',
  repeat: 1000,
  steps: [
    {
      description: 'Get controller plugin data before reboot',
      test() {
        return getControllerPluginData.call(this)
      },
      validate(res) {
        for (let i = 0; i < res.length; i++) {
          pluginDataBeforeReboot.push({
            callsign: res[i].callsign,
            state: res[i].state,
            autostart: res[i].autostart,
          })
        }
        removeStateOfPlugin(pluginDataBeforeReboot)
        return this.$expect(res).to.be.object() === true
      },
    },
    {
      description: 'Reboot the device using harakiri',
      sleep: 5,
      test() {
        this.$data.write('currCounter', counter)
        counter++
        return harakiri.call(this)
      },
      validate(res) {
        if (res === null) {
          return true
        } else {
          throw new Error(`Device not rebooted for the ${this.$data.read('currCounter')} time`)
        }
      },
    },
    {
      description: 'Get controller plugin data after reboot',
      sleep: 40,
      test() {
        return getControllerPluginData.call(this)
      },
      validate(res) {
        for (let i = 0; i < res.length; i++) {
          pluginDataAfterReboot.push({
            callsign: res[i].callsign,
            state: res[i].state,
            autostart: res[i].autostart,
          })
        }
        removeStateOfPlugin(pluginDataAfterReboot)
        return true
      },
    },
    {
      description: 'Compare Plugin data before reboot and after reboot',
      test() {
        if (pluginDataBeforeReboot.length === pluginDataAfterReboot.length) {
          for (let i = 0; i < pluginDataBeforeReboot.length; i++) {
            if (
              pluginDataBeforeReboot[i].callsign === pluginDataAfterReboot[i].callsign &&
              pluginDataBeforeReboot[i].state === pluginDataAfterReboot[i].state &&
              pluginDataBeforeReboot[i].autostart === pluginDataAfterReboot[i].autostart
            ) {
              if (i === pluginDataBeforeReboot.length - 1) {
                return true
              }
            } else {
              throw new Error('Plugin Data after reboot Incorrect')
            }
          }
        } else throw new Error('Plugins length incorrect after reboot')
      },
      validate(res) {
        pluginDataBeforeReboot = [] //Set plugin data array before reboot to empty
        pluginDataAfterReboot = [] //Set plugin data array after reboot to empty
        if (res === true) {
          return true
        } else throw new Error('Plugin data incorrect after reboot')
      },
    },
    {
      description: 'Get network status and validate the result',
      test() {
        return getNetworkStatus.call(this, 'eth0')
      },
      validate(res) {
        if (res === true) {
          return true
        } else {
          throw new Error('Network is not up')
        }
      },
    },
    {
      description: 'Get Controller UI',
      test: getControllerUI,
      validate(result) {
        let status = result.status
        if (status === 200) return true
        else throw new Error('Status is not as expected')
      },
    },
  ],
}
