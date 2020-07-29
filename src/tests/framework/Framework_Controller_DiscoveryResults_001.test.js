import { getDiscoveryResults } from '../../commonMethods/controller'

export default {
  title: 'Framework Controller Discovery Results - 001',
  description: 'Get Framework Discovery Results',
  steps: [
    {
      description: 'Get framework Discovery results and validate the results  ',
      test() {
        return getDiscoveryResults.call(this)
      },
      validate(res) {
        let result = res[0]
        if (
          result.locator !== '' &&
          result.latency !== null &&
          result.model !== '' &&
          result.secure !== null
        ) {
          return true
        } else {
          throw new Error('Discovery results are improper')
        }
      },
    },
  ],
}
