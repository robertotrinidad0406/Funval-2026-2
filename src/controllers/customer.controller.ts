import type { Request, Response } from "express";
import {
    deleteCustomer,
    getAllCustomers,
    getCustomerById,
    insertCustomer,
    updateCustomer,
    type CustomerInput,
} from "../models/customer.model.js";

function parseCustomerId(value: string): number | null {
    const id = Number(value);
    return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export async function getCustomers(_req: Request, res: Response): Promise<void> {
    /*#swagger.tags = ['Customers']
      #swagger.summary = 'Lista todos los clientes' */
    try {
        res.json(await getAllCustomers());
    } catch (error) {
        console.error("Error al consultar los clientes:", error);
        res.status(500).json({ error: "No se pudieron obtener los clientes" });
    }
}

export async function getCustomer(
    req: Request<{ id: string }>,
    res: Response,
): Promise<void> {
    /*#swagger.tags = ['Customers']
      #swagger.summary = 'Obtiene un cliente por su id' */
    const id = parseCustomerId(req.params.id);
    if (id === null) {
        res.status(400).json({ error: "El id debe ser un entero positivo" });
        return;
    }

    try {
        const customer = await getCustomerById(id);
        if (customer === null) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        res.json(customer);
    } catch (error) {
        console.error("Error al consultar el cliente:", error);
        res.status(500).json({ error: "No se pudo obtener el cliente" });
    }
}

export async function createCustomer(
    req: Request<Record<string, never>, unknown, CustomerInput>,
    res: Response,
): Promise<void> {
    /*#swagger.tags = ['Customers']
      #swagger.summary = 'Crea un cliente' */
    try {
        res.status(201).json(await insertCustomer(req.body));
    } catch (error) {
        console.error("Error al crear el cliente:", error);
        res.status(500).json({ error: "No se pudo crear el cliente" });
    }
}

export async function updateCustomerController(
    req: Request<{ id: string }, unknown, CustomerInput>,
    res: Response,
): Promise<void> {
    /*#swagger.tags = ['Customers']
      #swagger.summary = 'Actualiza un cliente' */
    const id = parseCustomerId(req.params.id);
    if (id === null) {
        res.status(400).json({ error: "El id debe ser un entero positivo" });
        return;
    }

    try {
        const customer = await updateCustomer(id, req.body);
        if (customer === null) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        res.json(customer);
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        res.status(500).json({ error: "No se pudo actualizar el cliente" });
    }
}

export async function deleteCustomerController(
    req: Request<{ id: string }>,
    res: Response,
): Promise<void> {
    /*#swagger.tags = ['Customers']
      #swagger.summary = 'Elimina un cliente' */
    const id = parseCustomerId(req.params.id);
    if (id === null) {
        res.status(400).json({ error: "El id debe ser un entero positivo" });
        return;
    }

    try {
        if (!(await deleteCustomer(id))) {
            res.status(404).json({ error: "Cliente no encontrado" });
            return;
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        res.status(500).json({ error: "No se pudo eliminar el cliente" });
    }
}
