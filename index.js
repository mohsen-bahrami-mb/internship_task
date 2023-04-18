// handle all errors, insted of "try-catch"
require('express-async-errors');
// require modules
const express = require('express');
const app = express();
const debug = require('debug')('app:main');
const router = require('./src/routes');

// start app with these funcrion modules
require('./startup/config')(app, express);
require('./startup/db')();
require('./startup/login')();

// api routes are in "router" module. "router" module is a divider for routes.
app.use("/", router);

// set port, if does not have PORT in environment variables.
const port = process.env.PORT || 6000;
app.listen(port, ()=>debug(`listening to port ${port}`));