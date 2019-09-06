export default function(appStoreUrl) {
  return this.$sequence([
    () =>
      this.$thunder.api.Controller.activate({ callsign: 'WebKitBrowser' })
        .then(() => this.$log('Webkit browser activated'))
        .catch(err => err),
    () =>
      this.$thunder.api.WebKitBrowser.url('about:blank')
        .then(() => this.$log('URL of webkit browser reset'))
        .catch(err => err),
    () =>
      this.$thunder.api.WebKitBrowser.url(appStoreUrl)
        .then(() => this.$log('Navigated to appstore'))
        .catch(err => err),
  ])
}
