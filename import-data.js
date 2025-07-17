import { neon } from '@neondatabase/serverless';
import * as fs from 'fs';

// You'll need to set the DATABASE_URL environment variable to your new Neon database URL
const sql = neon(process.env.DATABASE_URL);

async function importData() {
  try {
    console.log('Importing data to new database...');
    
    // Create tables first (using your existing schema)
    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT,
        location TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS agents (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        egypt_phone TEXT,
        uae_phone TEXT,
        passport_number TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS batches (
        id TEXT PRIMARY KEY,
        agent_id TEXT REFERENCES agents(id),
        flight_details TEXT,
        arrival_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS batch_products (
        id TEXT PRIMARY KEY,
        batch_id TEXT REFERENCES batches(id),
        product_name TEXT NOT NULL,
        quantity_kg DECIMAL,
        purchase_price_per_kg DECIMAL,
        shipping_cost DECIMAL,
        local_cost DECIMAL,
        total_cost DECIMAL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        date TIMESTAMP,
        customer_id TEXT REFERENCES customers(id),
        product TEXT NOT NULL,
        quantity DECIMAL,
        unit_price DECIMAL,
        cost_price DECIMAL,
        total_sale DECIMAL,
        total_cost DECIMAL,
        profit DECIMAL,
        delivery_status TEXT,
        payment_status TEXT,
        batch_id TEXT REFERENCES batches(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // Import customers
    const customers = JSON.parse(fs.readFileSync('customers-export.json', 'utf8'));
    for (const customer of customers) {
      await sql`
        INSERT INTO customers (id, name, phone, location, created_at, updated_at)
        VALUES (${customer.id}, ${customer.name}, ${customer.phone}, ${customer.location}, ${customer.created_at}, ${customer.updated_at})
        ON CONFLICT (id) DO NOTHING
      `;
    }
    console.log(`Imported ${customers.length} customers`);

    // Import agents
    const agents = JSON.parse(fs.readFileSync('agents-export.json', 'utf8'));
    for (const agent of agents) {
      await sql`
        INSERT INTO agents (id, name, egypt_phone, uae_phone, passport_number, created_at, updated_at)
        VALUES (${agent.id}, ${agent.name}, ${agent.egypt_phone}, ${agent.uae_phone}, ${agent.passport_number}, ${agent.created_at}, ${agent.updated_at})
        ON CONFLICT (id) DO NOTHING
      `;
    }
    console.log(`Imported ${agents.length} agents`);

    // Import batches
    const batches = JSON.parse(fs.readFileSync('batches-export.json', 'utf8'));
    for (const batch of batches) {
      await sql`
        INSERT INTO batches (id, agent_id, flight_details, arrival_date, created_at, updated_at)
        VALUES (${batch.id}, ${batch.agent_id}, ${batch.flight_details}, ${batch.arrival_date}, ${batch.created_at}, ${batch.updated_at})
        ON CONFLICT (id) DO NOTHING
      `;
    }
    console.log(`Imported ${batches.length} batches`);

    // Import batch products
    const batchProducts = JSON.parse(fs.readFileSync('batch-products-export.json', 'utf8'));
    for (const product of batchProducts) {
      await sql`
        INSERT INTO batch_products (id, batch_id, product_name, quantity_kg, purchase_price_per_kg, shipping_cost, local_cost, total_cost, created_at, updated_at)
        VALUES (${product.id}, ${product.batch_id}, ${product.product_name}, ${product.quantity_kg}, ${product.purchase_price_per_kg}, ${product.shipping_cost}, ${product.local_cost}, ${product.total_cost}, ${product.created_at}, ${product.updated_at})
        ON CONFLICT (id) DO NOTHING
      `;
    }
    console.log(`Imported ${batchProducts.length} batch products`);

    // Import orders
    const orders = JSON.parse(fs.readFileSync('orders-export.json', 'utf8'));
    for (const order of orders) {
      await sql`
        INSERT INTO orders (id, date, customer_id, product, quantity, unit_price, cost_price, total_sale, total_cost, profit, delivery_status, payment_status, batch_id, created_at, updated_at)
        VALUES (${order.id}, ${order.date}, ${order.customer_id}, ${order.product}, ${order.quantity}, ${order.unit_price}, ${order.cost_price}, ${order.total_sale}, ${order.total_cost}, ${order.profit}, ${order.delivery_status}, ${order.payment_status}, ${order.batch_id}, ${order.created_at}, ${order.updated_at})
        ON CONFLICT (id) DO NOTHING
      `;
    }
    console.log(`Imported ${orders.length} orders`);

    console.log('Data import completed successfully!');
    
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();