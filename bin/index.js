const express = require("express");
const app = express();
const routes = require("../src/routes");
const db = require("../src/models");

app.use(express.json());
app.use("/api", routes);

const port = process.env.PORT || "3018";
app.set("port", port);

// db.sequelize.sync({ force: false, alter: false });

const server = app.listen(port);

server.on("error", onError);
server.on("listening", onListening);

function onError(error) {
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}
