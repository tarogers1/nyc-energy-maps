import * as Koa from "koa";
import * as logger from "koa-logger";
import * as json from "koa-json";
import router from "./router";
import config from "./config";

const app = new Koa(); 

// Middlewares
app.use(json());
app.use(logger());

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port, () => {
  console.log(`Koa server started at port ${config.port}`);
});