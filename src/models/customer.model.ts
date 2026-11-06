import pool from "../config/db.js";

export interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
}

export interface CustomerInput {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
}

export async function getAllCustomers(): Promise<Customer[]> {
    const result = await pool.query<Customer>("SELECT * FROM customers");
    return result.rows;
}

export async function getCustomerById(id: number): Promise<Customer | null> {
    const result = await pool.query<Customer>(
        "SELECT * FROM customers WHERE id = $1",
        [id],
    );
    return result.rows[0] ?? null;
}

export async function insertCustomer(
    customer: CustomerInput,
): Promise<Customer> {
    const result = await pool.query<Customer>(
        `INSERT INTO customers (first_name, last_name, email, phone, address)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
            customer.first_name,
            customer.last_name,
            customer.email,
            customer.phone,
            customer.address,
        ],
    );
    const insertedCustomer = result.rows[0];
    if (!insertedCustomer) {
        throw new Error("La inserción no devolvió el cliente creado");
    }
    return insertedCustomer;
}

export async function updateCustomer(
    id: number,
    customer: CustomerInput,
): Promise<Customer | null> {
    const result = await pool.query<Customer>(
        `UPDATE customers
         SET first_name = $2, last_name = $3, email = $4, phone = $5, address = $6
         WHERE id = $1
         RETURNING *`,
        [
            id,
            customer.first_name,
            customer.last_name,
            customer.email,
            customer.phone,
            customer.address,
        ],
    );
    return result.rows[0] ?? null;
}