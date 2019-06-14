const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (request, response) => {  
  const debounceTime = process.env.DEBOUNCE || 5000;
  let currentTime = null;
  const intervalId = setInterval(() => {
    currentTime = new Date().toUTCString();
    console.log(currentTime);
  });

  setTimeout(() => {
    console.log('Time is over');
    clearInterval(intervalId);
    response.end(currentTime);
  }, debounceTime);
});

app.listen(port, (err) => {
  if (err) {
    return console.log('Something went wrong', err);
  }
  console.log('Server Started');
})