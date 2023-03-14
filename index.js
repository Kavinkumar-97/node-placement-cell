const express = require('express');
const app = express();
const port = 8000;

// Configuring Routes
app.use(require('./routes'));

// Listening to the port
app.listen(port, (err) => {
    if (err) { return console.error(err); }

    console.info(`Server Listening to http://localhost:${port}/`);
})