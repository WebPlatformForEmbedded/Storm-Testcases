export default {
  title: 'Wifi Connect test',
  description: 'Connect to a wifi on the network',
  // setting the context should be dynamic
  context: {
    wifi: {
      ssid: 'home',
      password: 'password',
      type: 'WPA',
    },
  },
  steps: [
    {
      description: 'Scan for networks',
      repeat: 5, // maybe a bit exagerated?
      sleep: 5,
      test() {
        return this.$thunder.api.WifiControl.scan()
          .then(() => true)
          .catch(err => err)
      },
      validate(res) {
        this.$log('Result of network scan', res)
        return res === true || res.code === 12 // code 12 means scanning is already in progress
      },
    },
    {
      description: 'Confirm wifi network is found',
      sleep: 5, // todo: should change this to sleep until done with scanning
      test() {
        return this.$thunder.api.WifiControl.networks()
          .then(res => res)
          .catch(this.$log)
      },
      validate(networks) {
        this.$log('Networks found', networks)
        const ssid = this.$context.read('wifi.ssid')
        return networks.filter(network => network.ssid === ssid).length > 0
      },
    },
    {
      description: 'Save network configuration',
      test() {
        const methodName = 'config@' + this.$context.read('wifi.ssid')
        return this.$thunder.api.WifiControl[methodName](this.$context.read('wifi'))
          .then(() => true)
          .catch(err => err)
      },
      assert: true,
    },
    {
      description: 'Get network configurations',
      test() {
        return this.$thunder.api.WifiControl.configs()
          .then(configs => configs)
          .catch(this.$log)
      },
      validate(configs) {
        const ssid = this.$context.read('wifi.ssid')
        return configs.filter(config => config.ssid === ssid).length > 0
      },
    },
    {
      description: 'Connect to the network',
      sleep: 5,
      test() {
        return this.$thunder.api.WifiControl.connect({
          ssid: this.$context.read('wifi.ssid'),
        }).catch(this.$log)
      },
      assert: null,
    },
    {
      description: 'Verify we are connected to the wifi network after 5 seconds',
      sleep: 20, // give it a lot of time to connect
      test() {
        return this.$thunder.api.WifiControl.status()
          .then(result => {
            this.$log('wifistatus', result)
            return result.connected
          })
          .catch(this.$log)
      },
      validate(result) {
        return result === this.$context.read('wifi.ssid')
      },
    },
  ],
}
