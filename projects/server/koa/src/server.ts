import Koa from "koa";
import koaBodyParser from "koa-bodyparser";
import swaggerUi from "swagger-ui-dist";
import Router from "koa-router";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

interface Book {
	id: string;
	title: string;
	author: string;
}

const app = new Koa();
const router = new Router();

const books: Book[] = [
	{ id: "1", title: "Book 1", author: "Author 1" },
	{ id: "2", title: "Book 2", author: "Author 2" },
];

// Enable CORS
// app.use(import("@koa/cors")());

// Parse request body
app.use(koaBodyParser());

// Configure Swagger
const swaggerOptions = {
	title: "Book API",
	description: "API documentation for managing books",
	version: "1.0.0",
	swaggerHtmlEndpoint: "/swagger-html",
	swaggerJsonEndpoint: "/swagger-json",
	swaggerOptions: {
		url: "/swagger-json",
	},
};

router.get("/api/books", (ctx) => {
	ctx.body = books;
});

router.get("/api/books/:id", (ctx) => {
	const { id } = ctx.params;
	const book = books.find((b) => b.id === id);
	if (book) {
		ctx.body = book;
	} else {
		ctx.status = 404;
		ctx.body = { message: "Book not found" };
	}
});

router.post("/api/books", (ctx) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { title, author } = ctx.request.body;
	const id = String(books.length + 1);
	const newBook: Book = { id, title, author };
	books.push(newBook);
	ctx.status = 201;
	ctx.body = newBook;
});

router.put("/api/books/:id", (ctx) => {
	const { id } = ctx.params;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { title, author } = ctx.request.body;
	const index = books.findIndex((b) => b.id === id);
	if (index !== -1) {
		const updatedBook = { ...books[index], title, author };
		books[index] = updatedBook;
		ctx.body = updatedBook;
	} else {
		ctx.status = 404;
		ctx.body = { message: "Book not found" };
	}
});

router.delete("/api/books/:id", (ctx) => {
	const { id } = ctx.params;
	const index = books.findIndex((b) => b.id === id);
	if (index !== -1) {
		const deletedBook = books.splice(index, 1)[0];
		ctx.body = deletedBook;
	} else {
		ctx.status = 404;
		ctx.body = { message: "Book not found" };
	}
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.use("/api-docs", swaggerUi.serve);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.get("/api-docs", swaggerUi.setup(swaggerOptions));

app;
