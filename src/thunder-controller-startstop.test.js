export default {
  title: 'Thunder Controller - Stability start/stop plugins',
  description: 'Takes a plugin from the controller and start/stops it 100 times',
  setup() {
    return this.$thunder.api.call('Controller', 'status')
    .then(result => {
      const selectedPlugin = result.filter(_p => {
        // pick a relatively low-impact plugin
        if ( (_p.callsign === 'DeviceInfo' || _p.callsign === 'WebServer' || _p.callsign === 'Dictionary'  )
          && _p.state === 'activated')
          return true
      })[0].callsign

    this.$log(`Selected plugin ${selectedPlugin} for activate/deactivate stability test`)
    this.$data.write('selectedPlugin', selectedPlugin)
    return true
    }).catch( err => err )
  },
  repeat: 100,
  steps: [
    {
      description: 'Deactivate plugin',
      test() {
        return new Promise( (resolve, reject) => {
          let _callsign = this.$data.read('selectedPlugin')

          let _checkEvent = (event) => {
            if (event.data === undefined)
              return

            let data = event.data;
            if (event.callsign === _callsign && data.state === 'deactivated') {
              this.$log('Plugin is deactivated')
              listener.dispose()
              resolve(true)
            }
          }

          //check notification for deactivation
          let listener = this.$thunder.api.on('Controller', 'all', _checkEvent)
          this.$thunder.api.call('Controller', 'deactivate', { callsign : _callsign })
            .then( () => true)
            .catch( err => {
              reject(err)
            })
        })
      },
      assert: true
    },
    {
      description: 'Check if plugin deactivated from status',
      test() {
        let _callsign = this.$data.read('selectedPlugin')
        return this.$thunder.api.call('Controller', 'status')
        .then(result => {
            return result.filter(p => {
              if (p.callsign === _callsign && p.state === 'deactivated')
                return true
              else
                return false
            }).length === 1
        })
      },
      assert : true
    },
    {
      description: 'Activate plugin',
      test() {
        return new Promise( (resolve, reject) => {
          let _callsign = this.$data.read('selectedPlugin')

          let _checkEvent = (event) => {
            if (event.data === undefined)
              return

            let data = event.data;
            if (event.callsign === _callsign && data.state === 'activated') {
              this.$log('Plugin is deactivated')
              listener.dispose()
              resolve(true)
            }
          }

          //check notification for deactivation
          let listener = this.$thunder.api.on('Controller', 'all', _checkEvent)
          this.$thunder.api.call('Controller', 'activate', { callsign : _callsign })
            .then( () => true)
            .catch( err => {
              reject(err)
            })
        })
      },
      assert: true
    },
    {
      description: 'Check if plugin activated from status',
      test() {
        let _callsign = this.$data.read('selectedPlugin')
        return this.$thunder.api.call('Controller', 'status')
        .then(result => {
            return result.filter(p => {
              if (p.callsign === _callsign && p.state === 'activated')
                return true
              else
                return false
            }).length === 1
        })
      },
      assert : true
    },
  ],
}
