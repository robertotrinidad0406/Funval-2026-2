import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

const saleSchema = z.object({
    customer_id: z.number().int().positive(),
    product_id: z.number().int().positive(),
    quantity: z.number().int().positive(),
    total: z.number().finite().positive(),
});

export type SaleInput = z.infer<typeof saleSchema>;

export function validateSale(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const result = saleSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ errors: result.error.issues });
        return;
    }

    req.body = result.data;
    next();
}
