import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const productSchema = z.object({
    name: z.string().trim().min(1),
    description: z.string().nullable(),
    price: z.number().finite(),
});

export type ProductInput = z.infer<typeof productSchema>;

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

    req.body = result.data;
    next();
}
