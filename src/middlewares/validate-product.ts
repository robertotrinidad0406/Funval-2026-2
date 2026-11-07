 feature/filtors-ventas
import type { Request, Response, NextFunction } from "express";

import type { NextFunction, Request, Response } from "express"; main
import { z } from "zod";

const productSchema = z.object({
    name: z.string().trim().min(1),
feature/filtors-ventas
    description: z.string().nullable(),
    price: z.number().finite(),
});

export type ProductInput = z.infer<typeof productSchema>;


    description: z.string().trim().min(1),
    price: z.number().positive(),
    cost: z.number().min(0).optional(),
    stock: z.number().int().min(0).optional(),
});
 main
export function validateProduct(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const result = productSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ errors: result.error.issues });
        return;
    }
 feature/filtors-ventas
    req.body = result.data;
 main
    next();
}
