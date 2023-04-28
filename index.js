const express = require('express'); // import express

const app = express(); // create a new app
require('./db');
const catRoutes = require('./routes/catRoutes');

const logger = () => function (req, res, next) {
  console.log('Host:', req.host);
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  return next();
};

app.use(logger());

app.use(express.json()); // parses request body from a json string then sets it into res.body

app.use('/cats', catRoutes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { status, msg } = err;
  console.log('ERROR:', err);
  res.status(status || 500).send(msg || 'Oops');
});

const server = app.listen(4494, () => console.log('Server successfully started on port', server.address().port));

module.exports = server;
