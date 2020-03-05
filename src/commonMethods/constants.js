import config from '../../../../config'

export default {
  //Plugin Names
  monitorPlugin: 'Monitor',
  controllerPlugin: 'Controller',
  webKitBrowserPlugin: 'WebKitBrowser',
  bluetoothControlPlugin: 'BluetoothControl',
  webKitImplementation: 'WebKitImplementation',
  deviceInfo: 'DeviceInfo',
  youTubePlugin: 'Cobalt',
  netFlixPlugin: 'Netflix',
  ocdmPlugin: 'OCDM',
  timeSyncPlugin: 'TimeSync',
  locationSyncPlugin: 'LocationSync',
  ocdmImplementation: 'OCDMImplementation',
  snapshotPlugin: 'Snapshot',
  webServerPlugin: 'WebServer',
  webServerImplementation: 'WebServerImplementation',
  netflixImplementation: 'NetflixImplementation',
  provisioningPlugin: 'Provisioning',
  WPEProcess: 'WPEProcess',
  remoteControlPlugin: 'RemoteControl',
  youtubeImplementation: 'CobaltImplementation',
  invalidAddress: 'invalidstring',

  //Plugin states
  activate: 'activate',
  deactivate: 'deactivate',
  resume: 'resumed',
  suspend: 'suspended',
  WPEFramework: 'WPEFramework',
  blankUrl: 'about:blank',
  host: config.thunder.host,
}
