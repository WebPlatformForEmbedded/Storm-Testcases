import {
  pluginDeactivate,
  pluginActivate,
  getClientGeometry,
  setClientGeometry,
} from '../../commonMethods/commonFunctions'
import constants from '../../commonMethods/constants'

export default {
  title: 'Compositor Geometry - 001',
  description: 'Sets and gets the Geometry of client',
  steps: [
    {
      description: 'Deactivate Netflix Plugin and check deactivated or not',
      test: pluginDeactivate,
      params: constants.netFlixPlugin,
      assert: 'deactivated',
    },
    {
      description: 'Activate Netflix Plugin and check resumed or not',
      test: pluginActivate,
      params: constants.netFlixPlugin,
      assert: 'resumed',
    },
    {
      description: 'Set Compositor Geometry and validate the result',
      sleep: 20,
      test() {
        return setClientGeometry.call(this, constants.netFlixPlugin, '1', '1', '480', '360')
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Client geometry not set')
          return false
        }
      },
    },
    {
      description: 'Get Client Geometry and validate the result',
      test() {
        return getClientGeometry.call(this, constants.netFlixPlugin)
      },
      validate(res) {
        if (res.x == '1' && res.y == '1' && res.width == '480' && res.height == '360') {
          return true
        } else {
          this.$log('Client Geometry not set correctly')
          return false
        }
      },
    },
  ],
}