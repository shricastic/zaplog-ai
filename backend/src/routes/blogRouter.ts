import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { CreateblogInput, UpdateBlogInput } from "../utils/validator";
import { GenerateBlogContent } from "../utils/contentGenerator";

const blogRouter = new Hono<{
  Bindings: {
    DB_POOL_URL: string;
    JWT_SECRET: string;
    GROQ_API_KEY: string;
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
            avatar: true,
          },
        },
      },
    });

    if (!blogs.length) {
      c.status(404);
      return c.json({ message: "No blogs found" });
    }

    c.status(200); 
    return c.json({ message: "Here are all your blogs!", blogs });
  } catch (e) {
    c.status(500);
    return c.json({ message: "Something went wrong homie, check!" });
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
            avatar: true
          },
        },
      },
    });

    if (!blog) {
      c.status(404);
      return c.json({ message: "Blog not found" });
    }

    c.status(200);
    return c.json({ message: "Here you go Homie, here is your blog!", blog });
  } catch (e) {
    c.status(500);
    return c.json({ message: "Something went wrong homie, check!" });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

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
            avatar: true
          },
        },
      },
    });

    if (!blog) {
      c.status(404);
      return c.json({ message: "Blog not found" });
    }

    c.status(200); 
    return c.json({ message: "Here you go Homie, here is your blog!", blog });
  } catch (e) {
    c.status(500);
    return c.json({ message: "Something went wrong homie, check!" });
  }
});

blogRouter.post("", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");

  const { success } = CreateblogInput.safeParse(body);

  if (!success) {
    c.status(400);
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
    c.status(500);
    return c.json({ message: "Something went wrong homie, check!" });
  }
});

blogRouter.put("", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId"); 

  const { success } = UpdateBlogInput.safeParse(body);
  if (!success) {
    c.status(400); 
    return c.json({ message: "Please provide correct inputs" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DB_POOL_URL,
  }).$extends(withAccelerate());

  try {
    const existingBlog = await prisma.blog.findFirst({
      where: {
        id: body.blogId,
        authorId: userId
      }
    });

    if (!existingBlog) {
      c.status(404);
      return c.json({ message: "Blog not found or you don't have permission to update it" });
    }

    const blog = await prisma.blog.update({
      where: {
        id: body.blogId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    c.status(200);
    return c.json({ message: "Blog updated successfully!", blog });
  } catch (e) {
    c.status(500);
    return c.json({ message: "Something went wrong homie, check!" });
  }
});

blogRouter.post("/content/generate", async (c) => {
  const body = await c.req.json();
  const apiKey = c.env.GROQ_API_KEY;
  const title = body.title;
  
  try {
    const content = await GenerateBlogContent({title, apiKey});

    c.status(201);
    return c.json({
      message: "Content generated successfully",
      content: content, 
    });
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({ message: "Something went wrong homie, check!" });
  }
});


export default blogRouter;
