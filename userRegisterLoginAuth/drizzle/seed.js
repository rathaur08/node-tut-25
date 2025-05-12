// path to a file with schema you want to reset
import { reset, seed } from "drizzle-seed";
import * as schema from "./schema.js";
import { db } from "../config/db.js";



const USER_ID = 13;

// Reset existing data
await reset(db, {
  productTables: schema.productTables,
});

// Seed with 100 rows
await seed(
  db,
  { productTables: schema.productTables },
  { count: 100 }
).refine((f) => ({
  productTables: {
    columns: {
      userId: f.default({ defaultValue: USER_ID }),
      // product_name: f.valuesFromArray({
      //   values: ["mongo", "banana", "apple", "carrot", "lettuce"],
      // }),
      product_value: f.number({ min: 10, max: 1000 }),
    },
  },
}));

console.log("✅ Data seeded successfully.");
process.exit(0);