import { Router } from "express";
import {
    createCustomer,
    getCustomer,
    getCustomers,
    updateCustomerController,
} from "../controllers/customer.controller.js";
import { validateCustomer } from "../libs/validate-customer.js";

const customerRouter: Router = Router();

customerRouter.get(
    "/customers",
    /* #swagger.tags = ['Customers']
       #swagger.summary = 'Lista todos los clientes'
       #swagger.responses[500] = { description: 'Error al consultar los clientes' } */
    getCustomers,
);
customerRouter.get(
    "/customers/:id",
    /* #swagger.tags = ['Customers']
       #swagger.summary = 'Obtiene un cliente por su id'
       #swagger.responses[200] = { description: 'Cliente encontrado' }
       #swagger.responses[400] = { description: 'El id no es válido' }
       #swagger.responses[404] = { description: 'Cliente no encontrado' }
       #swagger.responses[500] = { description: 'Error al consultar el cliente' } */
    getCustomer,
);
customerRouter.post(
    "/customers",
    /* #swagger.tags = ['Customers']
       #swagger.summary = 'Crea un cliente'
       #swagger.parameters['body'] = {
           in: 'body',
           required: true,
           schema: {
               first_name: 'Ana',
               last_name: 'Lopez',
               email: 'ana@example.com',
               phone: '555-1234',
               address: 'Calle 1'
           }
       }
       #swagger.responses[201] = { description: 'Cliente creado' }
       #swagger.responses[400] = { description: 'El cuerpo no es válido' }
       #swagger.responses[500] = { description: 'Error al crear el cliente' } */
    validateCustomer,
    createCustomer,
);
customerRouter.put(
    "/customers/:id",
    /* #swagger.tags = ['Customers']
       #swagger.summary = 'Actualiza un cliente'
       #swagger.parameters['body'] = {
           in: 'body',
           required: true,
           schema: {
               first_name: 'Ana',
               last_name: 'Lopez',
               email: 'ana@example.com',
               phone: '555-1234',
               address: 'Calle 1'
           }
       }
       #swagger.responses[200] = { description: 'Cliente actualizado' }
       #swagger.responses[400] = { description: 'El id o el cuerpo no son válidos' }
       #swagger.responses[404] = { description: 'Cliente no encontrado' }
       #swagger.responses[500] = { description: 'Error al actualizar el cliente' } */
    validateCustomer,
    updateCustomerController,
);

export default customerRouter;