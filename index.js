const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
