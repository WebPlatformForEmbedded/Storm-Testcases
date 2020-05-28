import { storeconfig } from '../../commonMethods/controller'

export default {
  title: 'Framework Store Config test - 001',
  description: 'Check Framework Store Config Functionality ',
  steps: [
    {
      description: 'Stores Config and validate the result',
      test() {
        return storeconfig.call(this)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error(`Result is not as expected and is ${res}`)
        }
      },
    },
  ],
}
