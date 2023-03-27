import * as Router from "koa-router";

const router = new Router();

router.get("/", async(ctx, next) => {
  ctx.body = { msg: "Hello World!" };

  await next();
});

export default router;