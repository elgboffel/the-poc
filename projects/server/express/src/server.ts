import express, { Request, Response } from "express";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import swaggerJsdoc, { Options } from "swagger-jsdoc";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import swaggerUi from "swagger-ui-express";

const app = express();
const port = 3000;

// Swagger setup
const swaggerOptions: Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Express API with Swagger",
			version: "1.0.0",
		},
	},
	apis: ["**/*.ts"], // Specify the file(s) where your API routes are defined
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Define your API routes
app.get("/api", (req: Request, res: Response) => {
	res.send("Hello from Express API!");
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
