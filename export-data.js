import { neon } from '@neondatabase/serverless';
import * as fs from 'fs';

const sql = neon(process.env.DATABASE_URL);

async function exportData() {
  try {
    console.log('Exporting data from current database...');
    
    // Export customers
    const customers = await sql`SELECT * FROM customers`;
    fs.writeFileSync('customers-export.json', JSON.stringify(customers, null, 2));
    console.log(`Exported ${customers.length} customers`);
    
    // Export orders
    const orders = await sql`SELECT * FROM orders`;
    fs.writeFileSync('orders-export.json', JSON.stringify(orders, null, 2));
    console.log(`Exported ${orders.length} orders`);
    
    // Export batches
    const batches = await sql`SELECT * FROM batches`;
    fs.writeFileSync('batches-export.json', JSON.stringify(batches, null, 2));
    console.log(`Exported ${batches.length} batches`);
    
    // Export batch_products
    const batchProducts = await sql`SELECT * FROM batch_products`;
    fs.writeFileSync('batch-products-export.json', JSON.stringify(batchProducts, null, 2));
    console.log(`Exported ${batchProducts.length} batch products`);
    
    // Export agents
    const agents = await sql`SELECT * FROM agents`;
    fs.writeFileSync('agents-export.json', JSON.stringify(agents, null, 2));
    console.log(`Exported ${agents.length} agents`);
    
    console.log('Data export completed successfully!');
    
  } catch (error) {
    console.error('Error exporting data:', error);
  }
}

exportData();