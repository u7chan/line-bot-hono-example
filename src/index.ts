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

app.post("/api/webhook", async (c) => {
	const contentType = c.req.header("Content-Type");
	if (contentType !== "application/json") {
		c.status(400);
		return c.text("Bad Request");
	}
	const data = await c.req.json();
	console.log("#", data);
	return c.text("OK");
});

export default app;
