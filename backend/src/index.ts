import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/user";
import { proutes } from "./routes/property";

const app = new Hono();

app.use("/*", cors());

app.route("/api/v1/user", userRouter);
app.route("/api/v1/properties", proutes);

// app.get("/", (c) => {
//   return c.text("Hello Hono!");
// });

export default app;
