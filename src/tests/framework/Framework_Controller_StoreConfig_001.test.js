import { storeconfig } from '../../commonMethods/commonFunctions'

export default {
  title: 'Framework Start Discovery test - 001',
  description: 'Starts Discovery',
  steps: [
    {
      description: 'Start Discovery and validate the result',
      test() {
        return storeconfig.call(this)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          this.$log('Result is not as expected')
          return false
        }
      },
    },
  ],
}
