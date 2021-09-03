import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";
import { createConnection } from "typeorm";
import { env } from "process";

const app = express();
createConnection();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(
    "Your app is listening on port localhost:" + listener.address().port
  );
});
