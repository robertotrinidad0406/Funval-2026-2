import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

const customerSchema = z.object({
    first_name: z.string().trim().min(1),
    last_name: z.string().trim().min(1),
    email: z.string().trim().email(),
    phone: z.string().trim().min(1),
    address: z.string().trim().min(1),
});

export type CustomerInput = z.infer<typeof customerSchema>;

export function validateCustomer(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const result = customerSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ errors: result.error.issues });
        return;
    }

    req.body = result.data;
    next();
}
