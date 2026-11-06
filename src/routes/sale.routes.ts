import { Router } from "express";
import {
    createSale,
    getSale,
    getSales,
} from "../controllers/sale.controller.js";
import { validateSale } from "../middlewares/validate-sale.js";

const saleRouter: Router = Router();

saleRouter.get(
    "/",
    /* #swagger.tags = ['Sales']
       #swagger.summary = 'Lista todas las ventas con el nombre del cliente' */
    getSales,
);
saleRouter.get(
    "/:id",
    /* #swagger.tags = ['Sales']
       #swagger.summary = 'Obtiene una venta por id con el nombre del cliente'
       #swagger.responses[404] = { description: 'Venta no encontrada' } */
    getSale,
);
saleRouter.post(
    "/",
    validateSale,
    /* #swagger.tags = ['Sales']
       #swagger.summary = 'Crea una venta'
       #swagger.parameters['body'] = { in: 'body', required: true, schema: { $customer_id: 1, $product_id: 1, $quantity: 2, $total: 25.5 } }
       #swagger.responses[201] = { description: 'Venta creada' }
       #swagger.responses[400] = { description: 'El cuerpo no es válido' } */
    createSale,
);

export default saleRouter;
