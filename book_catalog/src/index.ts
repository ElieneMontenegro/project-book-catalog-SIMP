import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";
import { createConnection } from "typeorm";

const app = express();
createConnection();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(
    "Your app is listening on port localhost:" + listener.address().port
  );
});
