export default {
  title: 'Thunder Controller - Duplicate plugins',
  description: 'Gets the list of plugins and validates if there are no duplicate plugins',
  steps: [
    {
      description: 'Get loaded plugins',
      test() {
        return this.$thunder.api
          .call('Controller', 'status')
          .then(result => {
            return result
          })
          .catch(err => err)
      },
      validate(result) {
        const foundPlugins = []
        if (this.$expect(result).to.be.array() === false) {
          return false
        }

        return (
          result.filter(p => {
            if (foundPlugins.indexOf(p.callsign === -1)) {
              foundPlugins.push(p.callsign)
              return false
            } else {
              return true
            }
          }).length === 0
        )
      },
    },
  ],
}
