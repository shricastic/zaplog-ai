import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

const userRouter = new Hono<{
  Bindings: {
    DB_POOL_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DB_POOL_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        name: body.name,
        password: body.password,
      },
    });

    console.log("User created:", user);

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    c.status(200);
    return c.json({ message: "Account created successfuly!", jwt });
  } catch (error) {
    c.status(411);
    return c.text("Invalid");
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DB_POOL_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.text("Don't play with me Homie, Put the right Creds!");
    }

    console.log("User logged in:", user);

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    c.status(200);
    return c.json({ message: "Here we go again, Come on in my G!", jwt });
  } catch (error) {
    c.status(411);
    return c.text("Invalid");
  }
});

export default userRouter;
