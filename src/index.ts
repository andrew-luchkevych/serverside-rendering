import express from 'express';
const app = express();
app.get('/', function (req, res) {
	const resData = `<!doctype html>
    <html>
      <head>
        <title>App</title>
      </head>
      <body>
        <p>Hello, World!</p>
      </body>
    </html>
  `;
	res.send(resData);
});
const port = 3000;
app.listen(port);
console.log(`Listening on port ${port}`);