const os = require('node:os');

console.log(" platform", os.platform());


console.log(" platform", os.userInfo());

// os.tmpdir()#

console.log(" platform", os.tmpdir());
console.log(" platform", os.uptime());
// console.log(" platform", os.userInfo([options]));
console.log(" platform", os.version());
console.log(process.env.HOME)
console.log(process.platform)
console.log(" platform", os.arch());
console.log(" platform", os.homedir());
console.log(" platform", os.hostname());
console.log(" platform", os.networkInterfaces());
console.log(" platform", os.cpus());
console.log(" platform", os.constants.signals.SIGURG);
console.log(" platform", os.type());
