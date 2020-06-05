import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'
import constants from '../../commonMethods/constants'

export default {
  title: 'Thunder',
  description: 'Testing that we can use the ThunderJS to make calls to a Thunder enabled device',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, constants.webKitBrowserPlugin), //make sure the browser is turned off
      () => pluginDeactivate.call(this, constants.uxplugin), //make sure UX is turned off
      () => pluginDeactivate.call(this, constants.netFlixPlugin), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, constants.youTubePlugin), //make sure Cobalt is turned off
      () => pluginDeactivate.call(this, constants.deviceInfo),
      () => pluginActivate.call(this, constants.deviceInfo),
      () => pluginActivate.call(this, constants.webKitBrowserPlugin),
      () => {
        return this.$thunder.api.call(constants.webKitBrowserPlugin, 'state', constants.resume)
      },
    ])
  },
  steps: [
    {
      description: 'Getting Device Info',
      test() {
        return this.$thunder.api.DeviceInfo.systeminfo()
      },
      validate(result) {
        console.log(result)
        if (this.$expect(result).to.be.object() !== true) {
          throw new Error('Result is not an object')
        }
        return this.$expect(Object.keys(result)).to.include(
          'version',
          'uptime',
          'totalram',
          'freeram',
          'devicename',
          'cpuload',
          'totalgpuram',
          'freegpuram',
          'serialnumber',
          'deviceid',
          'time'
        )
      },
    },
    {
      description: 'Setting the URL to metrological.com',
      test(url) {
        return this.$thunder.api.WebKitBrowser.url(url)
          .then(() => {
            this.$log('Set url to ' + url)
            return true
          })
          .catch(err => err)
      },
      params: 'http://www.metrological.com',
      assert: true,
    },
    {
      description: 'Confirming the URL is set to metrological.com',
      sleep: 2,
      test() {
        return this.$thunder.api.WebKitBrowser.url()
          .then(result => result)
          .catch(err => err)
      },
      validate(result) {
        return this.$expect(result).to.be.equal('https://www.metrological.com/')
      },
    },
  ],
}
