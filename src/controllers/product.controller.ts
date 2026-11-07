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

function parseQueryNumber(value: unknown): number | null {
    if (typeof value !== "string" || value.trim() === "") {
        return null;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

function parsePositiveInteger(value: unknown): number | null {
    const parsed = parseQueryNumber(value);
    return parsed !== null && Number.isSafeInteger(parsed) && parsed > 0
        ? parsed
        : null;
}

export async function getMenu(req: Request, res: Response): Promise<void> {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Lista productos con filtro y paginación'
      #swagger.parameters['maxPrice'] = { in: 'query', type: 'number', required: false }
      #swagger.parameters['page'] = { in: 'query', type: 'integer', required: false }
      #swagger.parameters['limit'] = { in: 'query', type: 'integer', required: false } */
    let maxPrice: number | undefined;
    if (req.query.maxPrice !== undefined) {
        const parsedMaxPrice = parseQueryNumber(req.query.maxPrice);
        if (parsedMaxPrice === null || parsedMaxPrice < 0) {
            res.status(400).json({
                error: "maxPrice debe ser un número no negativo",
            });
            return;
        }
        maxPrice = parsedMaxPrice;
    }

    const page =
        req.query.page === undefined ? 1 : parsePositiveInteger(req.query.page);
    const limit =
        req.query.limit === undefined
            ? 10
            : parsePositiveInteger(req.query.limit);

    if (
        page === null ||
        limit === null ||
        !Number.isSafeInteger((page - 1) * limit)
    ) {
        res.status(400).json({
            error: "page y limit deben ser enteros positivos con un offset válido",
        });
        return;
    }

    try {
        const products = await getAllProducts(maxPrice, page, limit);
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
    req: Request<Record<string, never>, unknown, ProductInput>,
    res: Response,
): Promise<void> {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Crea un producto' */
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
    req: Request<{ id: string }, unknown, ProductInput>,
    res: Response,
): Promise<void> {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Actualiza un producto' */
    const id = parseProductId(req.params.id);
    if (id === null) {
        res.status(400).json({ error: "El id debe ser un entero positivo" });
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
