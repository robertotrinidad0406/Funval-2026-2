import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

const productSchema = z.object({
    name: z.string().trim().min(1),
    description: z.string().trim().min(1),
    price: z.number().positive(),
    cost: z.number().min(0).optional(),
    stock: z.number().int().min(0).optional(),
});

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

    next();
}
