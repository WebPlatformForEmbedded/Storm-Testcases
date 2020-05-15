import { pluginActivate, pluginDeactivate } from '../../commonMethods/controller'

export default {
  title: 'Thunder',
  description: 'Testing that we can use the ThunderJS to make calls to a Thunder enabled device',
  setup() {
    return this.$sequence([
      () => pluginDeactivate.call(this, 'WebKitBrowser'), //make sure the browser is turned off
      () => pluginDeactivate.call(this, 'UX'), //make sure UX is turned off
      () => pluginDeactivate.call(this, 'Netflix'), //make sure Netflix is turned off
      () => pluginDeactivate.call(this, 'Cobalt'), //make sure Cobalt is turned off
      () => pluginActivate.call(this, 'WebKitBrowser'),
      () => {
        return this.$thunder.api.call('WebKitBrowser', 'state', 'resumed')
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
          return false
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
