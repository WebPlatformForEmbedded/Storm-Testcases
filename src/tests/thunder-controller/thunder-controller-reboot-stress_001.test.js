import { getControllerPluginData, harakiri } from '../../commonMethods/controller'

let counter = 1
export default {
  title: 'Thunder Controller - Reboot Stress test',
  description: 'Stress tests the Thunder by rebooting 1000 times',
  repeat: 1000,
  steps: [
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
      description: 'Check if Device is back online',
      sleep: 40,
      test() {
        return getControllerPluginData.call(this)
      },
      validate(res) {
        return this.$expect(res).to.be.object() === true
      },
    },
  ],
}
