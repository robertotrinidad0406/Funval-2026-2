import express, { type Request, type Response } from "express";
import swaggerRoutes from "./routes/swagger.router.js";
import productosRoutes from "./routes/product.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import cors from "cors"

const port = Number(process.env.PORT ?? 3000);
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/docs", swaggerRoutes);
app.use("/api", productosRoutes);
app.use("/api", customerRoutes);

app.get("/", (req: Request, res: Response) => {
    /*#swagger.tags = ['Tests']*/
    res.json({
        status: "Server online",
        version: "1.0.0"
    });
});
app.listen(port, () => {
    console.log(`URL: http://localhost:${port}`);
});