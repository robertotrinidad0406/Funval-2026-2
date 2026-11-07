import express, { type Request, type Response } from "express";
import swaggerRouter from "./routes/swagger.router.js";
import productosRouter from "./routes/product.routes.js";
import customerRouter from "./routes/customer.routes.js";
import saleRouter from "./routes/sale.routes.js";
import cors from "cors";

const port = Number(process.env.PORT ?? 3000);

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/docs", swaggerRouter);
app.use("/api", productosRouter);
app.use("/api/customers", customerRouter);
app.use("/api/sales", saleRouter);

app.get("/", (req: Request, res: Response) => {
    /*#swagger.tags = ['Tests']*/
    res.json({
        status: "Server online",
        version: "1.0.0",
    });
});

app.listen(port, () => {
    console.log(`URL: http://localhost:${port}`);
});