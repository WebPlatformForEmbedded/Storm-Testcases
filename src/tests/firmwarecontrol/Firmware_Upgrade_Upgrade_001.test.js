import { firmwareUpgrade, upgradeStatus } from '../../commonMethods/firmwarecontrol'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

let listener

export default {
  title: 'Firmware Upgrade - 001',
  description: 'Check the Upgrade of the device to the specified firmware',
  context: {
    state: 'completed',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.firmwareUpgradePlugin),
      () => pluginActivate.call(this, constants.firmwareUpgradePlugin),
      () => {
        listener = this.$thunder.api.FirmwareControl.on(
          'upgradeprogress',
          data => {
            this.$data.write('upgradeStatus', data.status)
          },
          e => {
            this.$log('Error subscribing to upgradeprogress: ', e)
          }
        )
        return true
      },
    ])
  },
  steps: [
    {
      description: 'Upgrade the firmware and check whether it is completed',
      sleep: 5,
      test() {
        //TODO - Update the test to enter the 'name', 'location', 'type', 'progressinterval', 'hmac' through User prompt
        return firmwareUpgrade.call(this, 'name', 'location', 'type', 'progressinterval', 'hmac')
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error(`FirmwareUpgrade is not invoked properly and the result is ${res}`)
        }
      },
    },
    {
      description: 'Sleep until Completed event is detected',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'upgradeprogress' response from the listener
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (this.$data.read('upgradeStatus') === this.$context.read('state')) {
              clearInterval(interval)
              setTimeout(resolve, 5000) //give it some time to load
            } else if (attempts > 100) {
              clearInterval(interval)
              reject('Upgrade Not completed')
            }
          }, 1000)
        })
      },
    },
    {
      description: 'Get Upgrade Status and validate the result',
      test() {
        return upgradeStatus.call(this)
      },
      validate(res) {
        if (res == 'completed') {
          return true
        } else {
          throw new Error('Firmware upgrade not completed successfully')
        }
      },
    },
  ],
}
