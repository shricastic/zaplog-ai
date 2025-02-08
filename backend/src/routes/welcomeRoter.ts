import { Hono } from "hono";

const welcomeRouter = new Hono();

welcomeRouter.get("", (c) => {
    return c.json({message: "Welcome to Zaplog!"});
})

export default welcomeRouter;