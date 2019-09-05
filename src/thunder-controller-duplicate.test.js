export default {
  title: 'Thunder Controller - Duplicate plugins',
  description: 'Gets the list of plugins and validates if there are no duplicate plugins',
  steps: [
    {
      description: 'Get loaded plugins',
      test() {
        return this.$thunder.api.call('Controller', 'status').then(result => {
          return result
        }).catch( err => err )
      },
      validate(result) {
        let _foundPlugins = []
        if (this.$expect(result).to.be.array() === true) {
          return result.filter(p => {
            if (_foundPlugins.indexOf( p.callsign === -1 )) {
              _foundPlugins.push(p.callsign)
              return false
            } else {
              return true
            }
          }).length === 0
        } else {
          return false
        }
      },
    },
  ],
}
