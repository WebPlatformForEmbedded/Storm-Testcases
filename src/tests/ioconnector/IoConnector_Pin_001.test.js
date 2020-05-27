import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { getIoConnectorPinValue, setIoConnectorPinValue } from '../../commonMethods/ioConnector'

let listener
export default {
  title: 'IO Connector Pin - 001',
  description: 'Sets the Pin value and check whether pin value is set or not',
  context: {
    pin: 169,
    value: '12',
  },
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.ioconnector),
      () => pluginActivate.call(this, constants.ioconnector),
      () =>
        (listener = this.$thunder.api.IOConnector.on('activity', data => {
          this.$data.write('activity', data.value)
        })),
    ])
  },
  teardown() {
    listener.dispose()
  },
  steps: [
    {
      description: 'Set IO Connector pin value',
      test() {
        return setIoConnectorPinValue.call(
          this,
          this.$context.read('pin'),
          this.$context.read('value')
        )
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error('Result is not as expected when we try to set IO connector PIN value')
        }
      },
    },
    {
      description: 'Sleep until IO Connector pin value is set',
      sleep() {
        // Purpose of this sleep is to wait until current step gets 'activity' event from the listener
        return new Promise((resolve, reject) => {
          let attempts = 0
          const interval = setInterval(() => {
            attempts++
            if (this.$data.read('activity') === this.$context.read('value')) {
              clearInterval(interval)
              resolve()
            } else if (attempts > 10) {
              clearInterval(interval)
              reject('Pin Value not set')
            }
          }, 1000)
        })
      },
    },
    {
      description: 'Get IO Connector pin value and validate whether its properly set or not',
      test() {
        return getIoConnectorPinValue.call(this)
      },
      validate(res) {
        if (res == this.$context.read('value')) {
          return true
        } else {
          throw new Error('Pin value not set')
        }
      },
    },
  ],
}
