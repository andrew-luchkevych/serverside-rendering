"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
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
//# sourceMappingURL=index.js.map