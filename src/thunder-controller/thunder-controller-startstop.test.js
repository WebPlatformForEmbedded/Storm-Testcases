export default {
  title: 'Thunder Controller - Stability start/stop plugins',
  description: 'Takes a plugin from the controller and start/stops it 100 times',
  setup() {
    return this.$thunder.api
      .call('Controller', 'status')
      .then(result => {
        const selectedPlugin = result.filter(plugin => {
          // pick a relatively low-impact plugin
          if (
            (plugin.callsign === 'DeviceInfo' ||
              plugin.callsign === 'WebServer' ||
              plugin.callsign === 'Dictionary') &&
            plugin.state === 'activated'
          )
            return true
        })[0].callsign

        this.$log(`Selected plugin ${selectedPlugin} for activate/deactivate stability test`)
        this.$data.write('selectedPlugin', selectedPlugin)
        return true
      })
      .catch(err => err)
  },
  repeat: 100,
  steps: [
    {
      description: 'Deactivate plugin',
      test() {
        return new Promise((resolve, reject) => {
          let callsign = this.$data.read('selectedPlugin')

          let checkEvent = event => {
            if (event.data === undefined) return

            let data = event.data
            if (event.callsign === callsign && data.state === 'deactivated') {
              this.$log('Plugin is deactivated')
              listener.dispose()
              resolve(true)
            }
          }

          //check notification for deactivation
          let listener = this.$thunder.api.on('Controller', 'all', checkEvent)
          this.$thunder.api
            .call('Controller', 'deactivate', { callsign: callsign })
            .then(() => true)
            .catch(err => {
              reject(err)
            })
        })
      },
      assert: true,
    },
    {
      description: 'Check if plugin deactivated from status',
      test() {
        let callsign = this.$data.read('selectedPlugin')
        return this.$thunder.api.call('Controller', 'status').then(result => {
          return (
            result.filter(p => {
              if (p.callsign === callsign && p.state === 'deactivated') return true
              else return false
            }).length === 1
          )
        })
      },
      assert: true,
    },
    {
      description: 'Activate plugin',
      test() {
        return new Promise((resolve, reject) => {
          let callsign = this.$data.read('selectedPlugin')

          let checkEvent = event => {
            if (event.data === undefined) return

            let data = event.data
            if (event.callsign === callsign && data.state === 'activated') {
              this.$log('Plugin is deactivated')
              listener.dispose()
              resolve(true)
            }
          }

          //check notification for deactivation
          let listener = this.$thunder.api.on('Controller', 'all', checkEvent)
          this.$thunder.api
            .call('Controller', 'activate', { callsign: callsign })
            .then(() => true)
            .catch(err => {
              reject(err)
            })
        })
      },
      assert: true,
    },
    {
      description: 'Check if plugin activated from status',
      test() {
        let callsign = this.$data.read('selectedPlugin')
        return this.$thunder.api.call('Controller', 'status').then(result => {
          return (
            result.filter(p => {
              if (p.callsign === callsign && p.state === 'activated') return true
              else return false
            }).length === 1
          )
        })
      },
      assert: true,
    },
  ],
}
