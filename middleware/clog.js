const clog = () => (req, res, next) => {
    const fgCyan = '\x1b[36m';
  
    const method = req.method;
    const path = req.path;
  
    switch (method) {
      case 'GET':
        console.info(`📗 ${fgCyan}${method} request to ${path}`);
        break;
      case 'POST':
        console.info(`📘 ${fgCyan}${method} request to ${path}`);
        break;
      default:
        console.log(`📙${fgCyan}${method} request to ${path}`);
    }
  
    next();
  };
  
  module.exports = { clog };
  