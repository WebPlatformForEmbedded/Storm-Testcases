export default {
  title: 'Thunder Controller - Test Controller methods',
  description: 'Tests various controller methods',
  steps: [
    {
      description: 'Get loaded plugins',
      test() {
        return this.$thunder.api.call('Controller', 'status').then(result => {
          console.log('Got results')
          this.$data.write('status', result)
          this.$log(`Found ${result.length} plugins`)
          return result
        }).catch( err => err )
        console.log('Whooo')
      },
      validate(result) {
        return this.$expect(result).to.be.array() === true
      },
    },
    {
      description: 'Select a plugin and activate/deactivate it, check if notifications work',
      test() {
        let _plugins = this.$data.read('status')

        const selectedPlugin = _plugins.filter(_p => {
          // pick a relatively low-impact plugin
          if (_p.callsign === 'DeviceInfo' || _p.callsign === 'WebServer' || _p.callsign === 'Dictionary')
            return true
        })[0].callsign

        this.$log(`Selected plugin ${selectedPlugin} for basic activate/deactivate test`)

        return new Promise( (resolve, reject) => {
          this.$thunder.api.on('Controller', 'all', (event) => {
            console.log('Got notification', event);

            if (event.data === undefined)
              return

            let data = event.data;
            if (event.callsign === selectedPlugin && data.state === 'deactivated') {
              this.$log(`Succesfully deactivated plugin ${selectedPlugin}`)
              this.$thunder.api.call('Controller', 'activate', { callsign : selectedPlugin })
                .catch(err => {
                  reject(err)
                })
            }

            if (event.callsign === selectedPlugin && data.state === 'activated')
              resolve(event)
          })

          this.$thunder.api.call('Controller', 'deactivate', { callsign : selectedPlugin })
            .catch( err => {
              reject(err)
            })
        })
      },
      validate(result) {
        return this.$expect(result).to.be.object()
      }
    },
    {
      description: 'Store configuration of the controller',
      test() {
        return this.$thunder.api.call('Controller', 'storeconfig')
        .then(() => true)
        .catch(err => err)
      },
      assert : null
    },
    {
      description: 'Reboot the device using harakiri',
      test() {
        return this.$thunder.api.call('Controller', 'harakiri')
        .then(() => true)
        .catch(err => err)
      },
      assert: true,
    },
    {
      sleep: 60,
      description: 'Check if the device is back online',
      test() {
        return this.$thunder.api.call('Controller', 'status')
          .then(() => true)
          .catch(err => err)
      },
      assert: true
    }
  ],
}
