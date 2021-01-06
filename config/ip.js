const os = require('os');
const path = require('path');

/**
 * 获取当前机器的ip地址
 */
function getIpAddress() {
  let ip = "0.0.0.0";
  const networkInterfaces = os.networkInterfaces()
  Object.keys(networkInterfaces).forEach(item => {
    networkInterfaces[item].forEach(({ family, address, internal }) => {
      if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
        ip = address
      }
    })
  });
  return ip
}