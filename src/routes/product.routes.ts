import { Router } from "express";
import {
    createProduct,
    getMenu,
    getProduct,
    updateProductController,
} from "../controllers/product.controller.js";
import { validateProduct } from "../middlewares/validate-product.js";

const productRouter: Router = Router();

productRouter.get(
    "/menu",
    /* #swagger.tags = ['Products']
       #swagger.summary = 'Lista productos con filtro y paginación'
       #swagger.parameters['maxPrice'] = { in: 'query', type: 'number', required: false }
       #swagger.parameters['page'] = { in: 'query', type: 'integer', required: false }
       #swagger.parameters['limit'] = { in: 'query', type: 'integer', required: false }
       #swagger.responses[500] = { description: 'Error al consultar los productos' } */
    getMenu,
);
productRouter.get(
    "/menu/:id",
    /* #swagger.tags = ['Products']
       #swagger.summary = 'Obtiene un producto por su id'
       #swagger.responses[200] = { description: 'Producto encontrado' }
       #swagger.responses[400] = { description: 'El id no es válido' }
       #swagger.responses[404] = { description: 'Producto no encontrado' }
       #swagger.responses[500] = { description: 'Error al consultar el producto' } */
    getProduct,
);
productRouter.post(
    "/menu",
    validateProduct,
    /* #swagger.tags = ['Products']
       #swagger.summary = 'Crea un producto'
       #swagger.responses[400] = { description: 'El cuerpo no es válido' }
       #swagger.responses[201] = { description: 'Producto creado' }
       #swagger.responses[500] = { description: 'Error al crear el producto' } */
    validateProduct,
    createProduct,
);
productRouter.put(
    "/menu/:id",
    validateProduct,
    /* #swagger.tags = ['Products']
       #swagger.summary = 'Actualiza un producto'
       #swagger.responses[200] = { description: 'Producto actualizado' }
       #swagger.responses[400] = { description: 'El id o el cuerpo no son válidos' }
       #swagger.responses[404] = { description: 'Producto no encontrado' }
       #swagger.responses[500] = { description: 'Error al actualizar el producto' } */
    updateProductController,
);

export default productRouter;
