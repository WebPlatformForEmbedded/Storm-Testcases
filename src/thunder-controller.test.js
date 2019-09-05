export default {
  title: 'Thunder Controller - Validate basic elements',
  description: 'Retrieves response from Controller and validates results',
  steps: [
    {
      description: 'Get Controller status',
      test() {
        return this.$thunder.api.Controller.status().then(result => {
          this.$data.write('status', result)
          this.$log(`Found ${result.length} plugins`)
          return result
        })
      },
      validate(result) {
        return this.$expect(result).to.be.array() === true
      },
    },
    {
      description: 'Check fields for each plugin',
      test() {
        return this.$data.read('status')
      },
      validate(plugins) {
        const expectedKeys = {
          callsign: 'string',
          locator: 'string',
          //autostart: 'boolean', // deliberately failing this one for demo purposes
          classname: 'string', // deliberately failing this one for demo purposes
          state: 'string',
          processedrequests: 'number',
          processedobjects: 'number',
          observers: 'number',
        }

        // or pass an array if we only care about the key and not the type
        // const expectedKeys = [
        //   'callsign',
        //   'locator',
        //   'autostart',
        //   'classname',
        //   'state',
        //   'processedrequests',
        //   'processedobjects',
        //   'observers',
        // ]

        return (
          plugins.filter(plugin => {
            // skip controller
            if (plugin.callsign === 'Controller') return true

            const pass = this.$expect(plugin).to.have.objectKeys(expectedKeys)
            pass === true
              ? this.$log('Plugin ' + plugin.callsign + ' passed required keys')
              : this.$log(
                  'Plugin ' + plugin.callsign + ' did not pass required keys (' + pass.message + ')'
                )
            return pass === true
          }).length === plugins.length
        )
      },
    },
    {
      description: 'Get Controller link status',
      test() {
        return this.$thunder.api.Controller.links().then(result => {
          this.$data.write('links', result)
          return result
        })
      },
      validate(result) {
        return this.$expect(result).to.be.array() === true
      },
    },
    {
      description: 'Check fields for each link',
      test() {
        return this.$data.read('links')
      },
      validate(links) {
        // mandatory fields for all links
        const expectedKeys = {
          remote: 'string',
          state: 'string',
          activity: 'string',
          id: 'string',
        }

        return (
          links.filter(link => {
            const pass = this.$expect(link).to.have.objectKeys(expectedKeys)
            pass === true
              ? this.$log('Link ' + link.remote + ' passed required keys')
              : this.$log(
                  'Link ' + link.remote + ' did not pass required keys (' + pass.message + ')'
                )

            return pass
          }).length === links.length
        )
      },
    },
    {
      description: 'Get Controller process info',
      test() {
        return this.$thunder.api.Controller.processinfo().then(result => {
          this.$data.write('processinfo', result)
          return result
        })
      },
      validate(result) {
        return this.$expect(result).to.be.object() === true
      },
    },
    {
      description: 'Check fields for processinfo',
      test() {
        return this.$data.read('processinfo')
      },
      validate(data) {
        return (
          this.$expect(data.threads).to.be.array() &&
          this.$expect(data.pending).to.be.number() &&
          this.$expect(data.occupation).to.be.number()
        )
      },
    },
    {
      description: 'Get Controller subsystems',
      test() {
        return this.$thunder.api.Controller.subsystems().then(result => {
          this.$data.write('subsystems', result)
          return result
        })
      },
      validate(result) {
        return this.$expect(result).to.be.array() === true
      },
    },
    {
      description: 'Check fields for subsystems',
      test() {
        return this.$data.read('subsystems')
      },
      validate(data) {
        const expectedKeys = {
          subsystem: 'string',
          active: 'boolean',
        }

        return (
          data.filter(subsystem => {
            const pass = this.$expect(subsystem).to.have.objectKeys(expectedKeys)
            pass === true
              ? this.$log('Subsystem ' + subsystem.subsystem + ' passed required keys')
              : this.$log(
                  'Subsystem ' +
                    subsystem.subsystem +
                    ' did not pass required keys (' +
                    pass.message +
                    ')'
                )

            return pass
          }).length === data.length
        )
      },
    },
  ],
}
