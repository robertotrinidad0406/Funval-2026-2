import { Router } from "express";
import {
    createCustomer,
    deleteCustomerController,
    getCustomer,
    getCustomers,
    updateCustomerController,
} from "../controllers/customer.controller.js";
import { validateCustomer } from "../middlewares/validate-customer.js";

const customerRouter: Router = Router();

customerRouter.get(
    "/",
    /* #swagger.tags = ['Customers']
       #swagger.summary = 'Lista todos los clientes'
       #swagger.responses[200] = { description: 'Lista de clientes' }
       #swagger.responses[500] = { description: 'Error al consultar los clientes' } */
    getCustomers,
);
customerRouter.get(
    "/:id",
    /* #swagger.tags = ['Customers']
       #swagger.summary = 'Obtiene un cliente por su id'
       #swagger.responses[404] = { description: 'Cliente no encontrado' } */
    getCustomer,
);
customerRouter.post(
    "/",
    validateCustomer,
    /* #swagger.tags = ['Customers']
       #swagger.summary = 'Crea un cliente'
       #swagger.parameters['body'] = { in: 'body', required: true, schema: { $first_name: 'Ana', $last_name: 'Pérez', $email: 'ana@example.com', $phone: '555-0101', $address: 'Calle 1' } }
       #swagger.responses[201] = { description: 'Cliente creado' }
       #swagger.responses[400] = { description: 'El cuerpo no es válido' } */
    createCustomer,
);
customerRouter.put(
    "/:id",
    validateCustomer,
    /* #swagger.tags = ['Customers']
       #swagger.summary = 'Actualiza un cliente'
       #swagger.parameters['body'] = { in: 'body', required: true, schema: { $first_name: 'Ana', $last_name: 'Pérez', $email: 'ana@example.com', $phone: '555-0101', $address: 'Calle 1' } }
       #swagger.responses[404] = { description: 'Cliente no encontrado' } */
    updateCustomerController,
);
customerRouter.delete(
    "/:id",
    /* #swagger.tags = ['Customers']
       #swagger.summary = 'Elimina un cliente'
       #swagger.responses[204] = { description: 'Cliente eliminado' }
       #swagger.responses[404] = { description: 'Cliente no encontrado' } */
    deleteCustomerController,
);

export default customerRouter;
