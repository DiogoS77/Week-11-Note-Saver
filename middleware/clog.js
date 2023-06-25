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

//This code exports a middleware function named clog that logs the type and path of each request to the server.

//The clog function is defined as an arrow function that returns another arrow function.
//Inside the clog function, the request method (req.method) and path (req.path) are extracted.
//The function uses a switch statement to log the request type and path in different formats based on the method. 
//GET requests are logged with "📗", POST requests with "📘", and other requests with "📙". The fgCyan variable is used to add cyan color to the logs.
//The next() function is invoked to pass control to the next middleware function in the request-response cycle.
//Finally, the clog function is exported as an object with the key clog using module.exports, allowing it to be imported and used in other files as middleware for logging requests.
  