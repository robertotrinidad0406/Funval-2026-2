import type { Request, Response } from "express";
import {
    getAllSales,
    getSaleById,
    insertSale,
    type SaleInput,
} from "../models/sale.model.js";

function parseSaleId(value: string): number | null {
    const id = Number(value);
    return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export async function getSales(_req: Request, res: Response): Promise<void> {
    /*#swagger.tags = ['Sales']
      #swagger.summary = 'Lista todas las ventas con el nombre del cliente' */
    try {
        res.json(await getAllSales());
    } catch (error) {
        console.error("Error al consultar las ventas:", error);
        res.status(500).json({ error: "No se pudieron obtener las ventas" });
    }
}

export async function getSale(
    req: Request<{ id: string }>,
    res: Response,
): Promise<void> {
    /*#swagger.tags = ['Sales']
      #swagger.summary = 'Obtiene una venta por su id con el nombre del cliente' */
    const id = parseSaleId(req.params.id);
    if (id === null) {
        res.status(400).json({ error: "El id debe ser un entero positivo" });
        return;
    }

    try {
        const sale = await getSaleById(id);
        if (sale === null) {
            res.status(404).json({ error: "Venta no encontrada" });
            return;
        }
        res.json(sale);
    } catch (error) {
        console.error("Error al consultar la venta:", error);
        res.status(500).json({ error: "No se pudo obtener la venta" });
    }
}

export async function createSale(
    req: Request<Record<string, never>, unknown, SaleInput>,
    res: Response,
): Promise<void> {
    /*#swagger.tags = ['Sales']
      #swagger.summary = 'Crea una venta' */
    try {
        res.status(201).json(await insertSale(req.body));
    } catch (error) {
        console.error("Error al crear la venta:", error);
        res.status(500).json({ error: "No se pudo crear la venta" });
    }
}
