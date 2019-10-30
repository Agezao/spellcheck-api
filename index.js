const app = require('./server');

var port = process.env.PORT || 8080;
// Starting server
app.listen(port, 
  () => {
    console.log(`Server started at port :${port}`);
  });
