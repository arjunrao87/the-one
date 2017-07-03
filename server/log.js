var logger = require('winston');
logger.add(logger.transports.File, { filename: "../logs/server.log" });
module.exports=logger;
