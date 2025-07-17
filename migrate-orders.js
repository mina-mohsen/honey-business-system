import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function migrateOrders() {
  try {
    console.log('Starting order migration...');
    
    // First, get all existing orders
    const existingOrders = await sql`SELECT * FROM orders`;
    console.log(`Found ${existingOrders.length} existing orders to migrate`);
    
    // Create the order_items table
    await sql`
      CREATE TABLE IF NOT EXISTS order_items (
        id TEXT PRIMARY KEY,
        order_id TEXT REFERENCES orders(id),
        product TEXT NOT NULL,
        quantity DECIMAL(10,2) NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        cost_price DECIMAL(10,2) NOT NULL,
        total_sale DECIMAL(10,2) NOT NULL,
        total_cost DECIMAL(10,2) NOT NULL,
        profit DECIMAL(10,2) NOT NULL,
        batch_id TEXT REFERENCES batches(id),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    // Migrate existing orders to new structure
    for (const order of existingOrders) {
      // Create order item for each existing order
      const orderItemId = `ITEM_${order.id}`;
      await sql`
        INSERT INTO order_items (
          id, order_id, product, quantity, unit_price, cost_price, 
          total_sale, total_cost, profit, batch_id, created_at
        )
        VALUES (
          ${orderItemId}, ${order.id}, ${order.product}, ${order.quantity}, 
          ${order.unit_price}, ${order.cost_price}, ${order.total_sale}, 
          ${order.total_cost}, ${order.profit}, ${order.batch_id}, ${order.created_at}
        )
        ON CONFLICT (id) DO NOTHING
      `;
    }
    
    console.log(`Migrated ${existingOrders.length} orders to new structure`);
    
    // Now alter the orders table to remove old columns and add notes
    await sql`
      ALTER TABLE orders 
      DROP COLUMN IF EXISTS product,
      DROP COLUMN IF EXISTS quantity,
      DROP COLUMN IF EXISTS unit_price,
      DROP COLUMN IF EXISTS cost_price,
      DROP COLUMN IF EXISTS batch_id
    `;
    
    await sql`
      ALTER TABLE orders 
      ADD COLUMN IF NOT EXISTS notes TEXT
    `;
    
    console.log('Migration completed successfully!');
    
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

migrateOrders();