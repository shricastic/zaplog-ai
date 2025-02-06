import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { CreateblogInput, UpdateBlogInput } from "../utils/validator";

const blogRouter = new Hono<{
  Bindings: {
    DB_POOL_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("Authorization") || "";
  const user = await verify(token, c.env.JWT_SECRET);

  if (user) {
    c.set("userId", String(user.id));
    await next();
  } else {
    c.status(403);
    return c.json({
      message: "You are not logged in homie!",
    });
  }
});

blogRouter.get("", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DB_POOL_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: { id: body.blogId },
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    c.status(201);
    return c.json({ message: "Here you go Homie, here is you blog!", blog });
  } catch (e) {
    c.status(404);
    return c.json({ message: "Something went wrong homie, check!" });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("blogId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DB_POOL_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: { id: id },
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    c.status(201);
    return c.json({ message: "Here you go Homie, here is you blog!", blog });
  } catch (e) {
    c.status(404);
    return c.json({ message: "Something went wrong homie, check!" });
  }
});

blogRouter.post("", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");

  const { success } = CreateblogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: "Please provide correct inputs" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DB_POOL_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    c.status(201);
    return c.json({
      message: "Your blog posted successfully!",
      blogId: String(blog.id),
    });
  } catch (e) {
    c.status(404);
    return c.json({ message: "Something went wrong homie, check!" });
  }
});

blogRouter.put("", async (c) => {
  const body = await c.req.json();

  const { success } = UpdateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.text("wrong inputs");
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DB_POOL_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.update({
      where: {
        id: body.blogId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    c.status(201);
    return c.json({ message: "I updated your blog, well done!", blog });
  } catch (e) {
    c.status(404);
    return c.json({ message: "Something went wrong homie, check!" });
  }
});

// TODO: add pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DB_POOL_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    console.log("blogs:", blogs);

    c.status(201);
    return c.json({ message: "Get your all blogs, I dont want 'em!", blogs });
  } catch (e) {
    c.status(404);
    return c.json({ message: "Something went wrong homie, check!" });
  }
});

export default blogRouter;
