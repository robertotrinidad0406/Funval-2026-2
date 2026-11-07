import pool from "../config/db.js";

export interface Sale {
    id: number;
    customer_id: number;
    product_id: number;
    quantity: number;
    total: string;
}

export interface SaleWithCustomer extends Sale {
    customer_name: string;
}

export interface SaleInput {
    customer_id: number;
    product_id: number;
    quantity: number;
    total: number;
}

export async function getAllSales(): Promise<SaleWithCustomer[]> {
    const result = await pool.query<SaleWithCustomer>(
        `SELECT sales.*, CONCAT(customers.first_name, ' ', customers.last_name) AS customer_name
         FROM sales
         INNER JOIN customers ON sales.customer_id = customers.id
         ORDER BY sales.id`,
    );
    return result.rows;
}

export async function getSaleById(id: number): Promise<SaleWithCustomer | null> {
    const result = await pool.query<SaleWithCustomer>(
        `SELECT sales.*, CONCAT(customers.first_name, ' ', customers.last_name) AS customer_name
         FROM sales
         INNER JOIN customers ON sales.customer_id = customers.id
         WHERE sales.id = $1`,
        [id],
    );
    return result.rows[0] ?? null;
}

export async function insertSale(sale: SaleInput): Promise<Sale> {
    const result = await pool.query<Sale>(
        "INSERT INTO sales (customer_id, product_id, quantity, total) VALUES ($1, $2, $3, $4) RETURNING *",
        [sale.customer_id, sale.product_id, sale.quantity, sale.total],
    );
    return result.rows[0]!;
}
