import type { Request, Response } from "express";
import {
    getAllProducts,
    getProductById,
    insertProduct,
    updateProduct,
    type ProductInput,
} from "../models/product.model.js";

function parseProductId(value: string): number | null {
    const id = Number(value);
    return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function isProductInput(body: unknown): body is ProductInput {
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
        return false;
    }

    const input = body as Record<string, unknown>;
    return (
        typeof input.name === "string" &&
        input.name.trim().length > 0 &&
        (typeof input.description === "string" || input.description === null) &&
        typeof input.price === "number" &&
        Number.isFinite(input.price)
    );
}

export async function getMenu(_req: Request, res: Response): Promise<void> {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Lista todos los productos' */
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        console.error("Error al consultar los productos:", error);
        res.status(500).json({ error: "No se pudieron obtener los productos" });
    }
}

export async function getProduct(
    req: Request<{ id: string }>,
    res: Response,
): Promise<void> {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Obtiene un producto por su id' */
    const id = parseProductId(req.params.id);
    if (id === null) {
        res.status(400).json({ error: "El id debe ser un entero positivo" });
        return;
    }

    try {
        const product = await getProductById(id);
        if (product === null) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
        }
        res.json(product);
    } catch (error) {
        console.error("Error al consultar el producto:", error);
        res.status(500).json({ error: "No se pudo obtener el producto" });
    }
}

export async function createProduct(
    req: Request,
    res: Response,
): Promise<void> {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Crea un producto' */
    if (!isProductInput(req.body)) {
        res.status(400).json({
            error: "Se requieren name, description, y un price numérico",
        });
        return;
    }

    try {
        const product = await insertProduct(
            req.body.name,
            req.body.description,
            req.body.price,
        );
        res.status(201).json(product);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: "No se pudo crear el producto" });
    }
}

export async function updateProductController(
    req: Request<{ id: string }>,
    res: Response,
): Promise<void> {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Actualiza un producto' */
    const id = parseProductId(req.params.id);
    if (id === null) {
        res.status(400).json({ error: "El id debe ser un entero positivo" });
        return;
    }
    if (!isProductInput(req.body)) {
        res.status(400).json({
            error: "Se requieren name, description, y un price numérico",
        });
        return;
    }

    try {
        const product = await updateProduct(
            id,
            req.body.name,
            req.body.description,
            req.body.price,
        );
        if (product === null) {
            res.status(404).json({ error: "Producto no encontrado" });
            return;
        }
        res.json(product);
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ error: "No se pudo actualizar el producto" });
    }
}
