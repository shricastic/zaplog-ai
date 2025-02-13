import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "../utils/validator";
import { googleAuth } from "@hono/oauth-providers/google";

const userRouter = new Hono<{
  Bindings: {
    DB_POOL_URL: string;
    JWT_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_REDIRECT_URI: string;
    FRONTEND_REDIRECT_URI: string;
  };
}>();

type UserInfo = { 
  name: string;
  email: string;
  picture: string;
}

userRouter.get("/signin/google/callback", async (c) => {
  const { code } = c.req.query();
  if (!code) {
    return c.text("Invalid request", 400);
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: c.env.GOOGLE_CLIENT_ID,
      client_secret: c.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: c.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  console.log("tokenResponse:::", JSON.stringify(tokenResponse));

  const tokens = await tokenResponse.json();

  if (!tokenResponse.ok) {
    console.error("Token exchange failed:", tokens);
    return c.text("Authentication failed", 401);
  }

  const userInfoResponse = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    },
  );

  const userInfo: UserInfo = await userInfoResponse.json();

  console.log("userInfo::::", JSON.stringify(userInfo));

  if (!userInfoResponse.ok) {
    console.error("Failed to fetch user info:", userInfo);
    return c.text("Failed to fetch user info", 401);
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DB_POOL_URL,
  }).$extends(withAccelerate());

  let user = await prisma.user.findUnique({
    where: {
      username: userInfo.email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        username: userInfo.email,
        name: userInfo.name, 
        avatar: userInfo.picture,
        password: "", 
      },
    });
  }

  const jwt = await sign(
    {
      id: user.id, 
    },
    c.env.JWT_SECRET,
  );

  return c.redirect(`${c.env.FRONTEND_REDIRECT_URI}?token=${jwt}`);
});

userRouter.get("/profile", async (c) => {
  const token = c.req.header("Authorization") || "";
  let userId= await verify(token, c.env.JWT_SECRET);

  if (!userId) {
    c.status(403);
    return c.json({
      message: "You are not logged in homie!",
    });
  }

  console.log(":::::::user:::::::", userId)

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DB_POOL_URL,
  }).$extends(withAccelerate());

  try {
      const user = await prisma.user.findFirst({
      where: { id: userId?.id },
      select: {
        name: true,
        avatar: true,
        username: true,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({ message: "Blog not found" });
    }

    c.status(200);
    return c.json({ message: "Here you go Homie!", user });
  } catch (e) {
    c.status(500);
    return c.json({ message: "Something went wrong homie, check!" });
  }
});


userRouter.post("/signin", async (c) => {
  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: "Please provide correct inputs" });
  }

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
      return c.text("Invalid credentials");
    }

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET,
    );

    c.status(200);
    return c.json({ message: "Logged in successfully!", jwt });
  } catch (error) {
    c.status(411);
    return c.text("Invalid");
  }
});

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: "Please provide correct inputs" });
  }

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

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET,
    );

    c.status(200);
    return c.json({ message: "Account created successfully!", jwt });
  } catch (error) {
    c.status(411);
    return c.text("Invalid");
  }
});



export default userRouter;
