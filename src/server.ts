import express from "express";
import routes from "./routes";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log("Server startado na porta 3333");
});
