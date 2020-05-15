import constants from '../../commonMethods/constants'
import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import { setIoConnectorPinValue } from '../../commonMethods/ioConnector'

export default {
  title: 'IO Connector Pin - 002',
  description: 'Sets the Pin value for invalid pin and check the error',
  context: {
    pin: 'invalidPin',
    value: '1',
  },
  steps: [
    {
      description: 'Deactivate IO Connector Plugin and check deactivated or not',
      test: pluginDeactivate,
      params: constants.ioconnector,
      assert: 'deactivated',
    },
    {
      description: 'Activate IO Connector Plugin and check activated or not',
      test: pluginActivate,
      params: constants.ioconnector,
      assert: 'activated',
    },
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
        if (res.code === 22 && res.message === 'ERROR_UNKNOWN_KEY') {
          return true
        } else {
          this.$log('Proper error message is not shown')
          return false
        }
      },
    },
  ],
}
