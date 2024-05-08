import { Hono } from "hono";

const app = new Hono();

app.get("/api/health_check", (c) => {
	return c.text("OK");
});

app.get("/api/json_example", (c) => {
	return c.json({
		ok: true,
		message: "Hello Hono!",
	});
});

export default app;
