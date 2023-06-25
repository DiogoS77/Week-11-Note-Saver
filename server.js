const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog.js');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','notes.html'));
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
  });
  
  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`);
  });
  
//This code sets up an Express server that listens on a specified port (either the value of process.env.PORT or 3001 if not provided). 
//It includes the necessary middleware and route handlers to serve static files, handle API requests, and handle specific routes.

//The express module is imported and an instance of the application is created.
//Middleware for parsing JSON and URL-encoded data is added to the application.
//The /api route is handled by the api router imported from the ./routes/index.js file.
//The public directory is served as static files using express.static middleware.
//The root route '/' is handled by sending the index.html file located in the public directory.
//The '/notes' route is handled by sending the notes.html file located in the public directory.
//The '*' route is a catch-all route that handles any other routes and sends the 404.html file located in the public directory.
//The server starts listening on the specified port, and a message is logged to the console indicating that the server is running.
//In summary, this code sets up a basic Express server with static file serving, API routes, and specific route handlers for '/', '/notes', and 404 errors.