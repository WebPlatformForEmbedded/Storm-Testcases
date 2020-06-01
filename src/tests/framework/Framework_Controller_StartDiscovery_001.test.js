import { startDiscovery } from '../../commonMethods/controller'

export default {
  title: 'Framework Start Discovery test - 001',
  description: 'Starts Discovery',
  steps: [
    {
      description: 'Start Discovery and validate the result',
      test() {
        return startDiscovery.call(this, 1)
      },
      validate(res) {
        if (res == null) {
          return true
        } else {
          throw new Error(`Result is not as expected in startDiscovery and is ${res}`)
        }
      },
    },
  ],
}
