import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';
import * as fs from 'fs';

// Initialize database connection
const connection = neon(process.env.DATABASE_URL);
const db = drizzle(connection);

async function importData() {
  try {
    console.log('Importing data to new database...');
    
    // Import customers
    const customers = JSON.parse(fs.readFileSync('customers-export.json', 'utf8'));
    for (const customer of customers) {
      await db.execute(sql`
        INSERT INTO customers (id, name, phone, location, created_at, updated_at)
        VALUES (${customer.id}, ${customer.name}, ${customer.phone}, ${customer.location || ''}, ${customer.created_at}, ${customer.updated_at})
        ON CONFLICT (id) DO NOTHING
      `);
    }
    console.log(`Imported ${customers.length} customers`);

    // Import agents
    const agents = JSON.parse(fs.readFileSync('agents-export.json', 'utf8'));
    for (const agent of agents) {
      await db.execute(sql`
        INSERT INTO agents (id, name, egy_phone, uae_phone, passport_number, location_in_egypt, created_at, updated_at)
        VALUES (${agent.id}, ${agent.name}, ${agent.egypt_phone || agent.egyptian_phone || ''}, ${agent.uae_phone || ''}, ${agent.passport_number || ''}, ${agent.location_in_egypt || ''}, ${agent.created_at}, ${agent.updated_at})
        ON CONFLICT (id) DO NOTHING
      `);
    }
    console.log(`Imported ${agents.length} agents`);

    // Import batches
    const batches = JSON.parse(fs.readFileSync('batches-export.json', 'utf8'));
    for (const batch of batches) {
      await db.execute(sql`
        INSERT INTO batches (id, agent_id, arrival_date, flight_details, notes, created_at, updated_at)
        VALUES (${batch.id}, ${batch.agent_id}, ${batch.arrival_date}, ${batch.flight_details}, ${batch.notes || ''}, ${batch.created_at}, ${batch.updated_at})
        ON CONFLICT (id) DO NOTHING
      `);
    }
    console.log(`Imported ${batches.length} batches`);

    // Import batch products
    const batchProducts = JSON.parse(fs.readFileSync('batch-products-export.json', 'utf8'));
    for (const product of batchProducts) {
      await db.execute(sql`
        INSERT INTO batch_products (id, batch_id, product_name, quantity, unit_purchase_cost, unit_shipping_cost, unit_local_cost, total_cost, created_at)
        VALUES (${product.id}, ${product.batch_id}, ${product.product_name || product.product}, ${product.quantity_kg || product.quantity || 0}, ${product.purchase_price_per_kg || product.unit_price || 0}, ${product.shipping_cost || 0}, ${product.local_cost || product.other_costs || 0}, ${product.total_cost || 0}, ${product.created_at})
        ON CONFLICT (id) DO NOTHING
      `);
    }
    console.log(`Imported ${batchProducts.length} batch products`);

    // Import orders and create order items
    const orders = JSON.parse(fs.readFileSync('orders-export.json', 'utf8'));
    for (const order of orders) {
      // Insert order
      await db.execute(sql`
        INSERT INTO orders (id, date, customer_id, total_sale, total_cost, profit, delivery_status, payment_status, notes, created_at, updated_at)
        VALUES (${order.id}, ${order.date}, ${order.customer_id}, ${order.total_sale || 0}, ${order.total_cost || 0}, ${order.profit || 0}, ${order.delivery_status || 'Pending'}, ${order.payment_status || 'Unpaid'}, ${order.notes || ''}, ${order.created_at}, ${order.updated_at})
        ON CONFLICT (id) DO NOTHING
      `);
      
      // Insert order item
      await db.execute(sql`
        INSERT INTO order_items (id, order_id, product, quantity, unit_price, cost_price, total_sale, total_cost, profit, batch_id, created_at)
        VALUES (${order.id + '_item'}, ${order.id}, ${order.product}, ${order.quantity || 1}, ${order.unit_price || 0}, ${order.cost_price || 0}, ${order.total_sale || 0}, ${order.total_cost || 0}, ${order.profit || 0}, ${order.batch_id || null}, ${order.created_at})
        ON CONFLICT (id) DO NOTHING
      `);
    }
    console.log(`Imported ${orders.length} orders with order items`);

    console.log('Data import completed successfully!');
    
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();