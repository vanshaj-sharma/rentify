import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify, sign } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  //dbconnection
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    //checking if user already present
    const userPresent = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (userPresent) {
      c.status(411);
      return c.json({
        Message: "Email already in use",
      });
    }

    //new user creation
    const user = await prisma.user.create({
      data: {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: body.password,
        phonenumber: parseInt(body.phonenumber),
        userType: body.userType,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ jwt });
  } catch (e) {
    console.log(e);
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
});

userRouter.post("/signin", async (c) => {
  //dbconnection
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    //checking if user already present
    const userPresent = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!userPresent) {
      c.status(411);
      return c.json({
        Message: "User not present please sign up",
      });
    }
    const jwt = await sign({ id: userPresent.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    c.status(403);
    return c.json({ error: "error while signing in" });
  }
});

userRouter.get("/buyerorseller", async (c) => {
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];

  //dbconnection
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      c.status(401);
      return c.json({ error: "unauthorized token" });
    }

    const seller = await prisma.user.findFirst({
      where: {
        id: Number(payload.id),
      },
    });

    if (seller?.userType != "seller") {
      return c.json({ userType: "buyer" });
    }
    return c.json({ userType: "seller" });
  } catch (err) {
    c.status(403);
    return c.json({ Message: "Unauthorized user detected" });
  }
});
