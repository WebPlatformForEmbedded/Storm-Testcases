/**
 * This function is used to Activate DHCP server interface
 * @param interfaceName
 * @returns {Promise<T>}
 */
export const dhcpInterfaceActivate = function(interfaceName) {
  return this.$thunder.api.DHCPServer.activate({ interface: interfaceName })
    .then(result => result)
    .catch(err => err)
}

/**
 * This function is used to Deactivate DHCP server
 * @param interfaceName
 * @returns {Promise<T>}
 */
export const dhcpInterfaceDeactivate = function(interfaceName) {
  return this.$thunder.api.DHCPServer.deactivate({ interface: interfaceName })
    .then(result => result)
    .catch(err => err)
}
/**
 * This function is used to know status of DHCP server
 * * @params - servername
 * @returns {Promise<unknown<any>>}
 */
export const getDhcpStatus = function(servername) {
  let status = 'status@' + servername
  return this.$thunder.api.DHCPServer[status]()
    .then(result => result)
    .catch(err => err)
}
