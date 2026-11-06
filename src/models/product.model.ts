import pool from "../config/db.js";
export interface Product {
    id: number;
    name: string;
    description: string | null;
    price: string;
}
export interface ProductInput {
    name: string;
    description: string | null;
    price: number;
}
export async function getAllProducts(): Promise<Product[]> {
    const result = await pool.query<Product>("SELECT * FROM products");
    return result.rows;
}
export async function getProductById(id: number): Promise<Product | null> {
    const result = await pool.query<Product>(
        "SELECT * FROM products WHERE id = $1",
        [id],
    );
    return result.rows[0] ?? null;
}
export async function insertProduct(
    name: string,
    description: string | null,
    price: number,
): Promise<Product> {
    const result = await pool.query<Product>(
        "INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *",
        [name, description, price],
    );
    return result.rows[0]!;
}
export async function updateProduct(
    id: number,
    name: string,
    description: string | null,
    price: number,
): Promise<Product | null> {
    const result = await pool.query<Product>(
        "UPDATE products SET name = $2, description = $3, price = $4 WHERE id = $1 RETURNING *",
        [id, name, description, price],
    );
    return result.rows[0] ?? null;
}
