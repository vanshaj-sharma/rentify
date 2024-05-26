import { Hono, Context, Next } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { verify } from "hono/jwt";

export const proutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
//middlewares
//check if any user
async function checkValidBuyerOrUser(c: Context, next: Next) {
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];

  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      c.status(401);
      return c.json({ error: "unauthorized token" });
    }
    c.set("userId", payload.id);
    await next();
  } catch (err) {
    c.status(403);
    return c.json({ Message: "Unauthorized user detected" });
  }
}
//check if buyer
async function checkValidSeller(c: Context, next: Next) {
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
      c.status(401);
      return c.json({ error: "unauthorized token" });
    }
    c.set("userId", payload.id);
    await next();
  } catch (err) {
    c.status(403);
    return c.json({ Message: "Unauthorized user detected" });
  }
}
//-------------------------------------------------------------------------------------
//routes

//bulk view
// Todo: add pagination
proutes.get("/", checkValidBuyerOrUser, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const buildings = await prisma.property.findMany();

  return c.json({
    buildings,
  });
});

//seller's properties
proutes.get("/myproperties", checkValidSeller, async (c) => {
  //   const body = await c.req.json();

  const sellerId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const buildings = await prisma.property.findMany({
    where: {
      ownerId: Number(sellerId),
    },
  });

  return c.json({
    buildings,
  });
});

//seller new properties
proutes.post("/", checkValidSeller, async (c) => {
  const body = await c.req.json();

  const sellerId = c.get("userId");
  //   console.log("sellerId " + sellerId);
  //db
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const building = await prisma.property.create({
      data: {
        address: body.address,
        place: body.place,
        numberOfBedrooms: Number(body.numberOfBedrooms),
        numberOfBathrooms: Number(body.numberOfBathrooms),
        nearbyHospitals: body.nearbyHospitals,
        nearbyColleges: body.nearbyColleges,
        price: Number(body.price),
        description: body.description,
        propertyType: body.propertyType,
        amenities: body.amenities,
        builtYear: Number(body.builtYear),
        ownerId: Number(sellerId),
      },
    });

    return c.json({
      id: building.id,
    });
  } catch (error) {
    console.log(error);
    c.status(422);
    return c.json({ Message: "Error in creating building" });
  }
});
//seller update
proutes.put("/:id", checkValidSeller, async (c) => {
  const body = await c.req.json();
  const buildingId = c.req.param("id");

  //   const sellerId = c.get("userId");
  //db
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const building = await prisma.property.update({
      where: {
        id: buildingId,
      },
      data: {
        address: body.address,
        place: body.place,
        numberOfBedrooms: Number(body.numberOfBedrooms),
        numberOfBathrooms: Number(body.numberOfBathrooms),
        nearbyHospitals: body.nearbyHospitals,
        nearbyColleges: body.nearbyColleges,
        price: Number(body.price),
        description: body.description,
        propertyType: body.propertyType,
        amenities: body.amenities,
        builtYear: Number(body.builtYear),
      },
    });

    return c.json({
      id: building.id,
    });
  } catch (error) {
    c.status(422);
    return c.json({ Message: "Error in updating building" });
  }
});

//seller delete
proutes.delete("/:id", checkValidSeller, async (c) => {
  const delId = c.req.param("id");
  //db
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const delBuild = await prisma.property.delete({
      where: {
        id: delId,
      },
    });

    c.json({
      message: `successfully deleted property with id ${delBuild.id}`,
    });
  } catch (error) {
    console.log(error);
  }
});
