const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.static(path.join(__dirname, "public")));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

const SEED = {
  categories: ["Chicken", "Meat", "Vegetables", "Rice", "Grocery", "Others"],
  items: [
    { id: "c1", name: "Chicken Boneless", category: "Chicken", unit: "kg" },
    { id: "c2", name: "Chicken Karahi", category: "Chicken", unit: "kg" },
    { id: "c3", name: "Chicken Curry Cut", category: "Chicken", unit: "kg" },
    { id: "c4", name: "Chicken Leg Quarter", category: "Chicken", unit: "kg" },
    { id: "c5", name: "Chicken Breast", category: "Chicken", unit: "kg" },
    { id: "c6", name: "Whole Chicken", category: "Chicken", unit: "kg" },
    { id: "c7", name: "Chicken Mince", category: "Chicken", unit: "kg" },
    { id: "i2", name: "Beef", category: "Meat", unit: "kg" },
    { id: "i3", name: "Mutton", category: "Meat", unit: "kg" },
    { id: "i15", name: "Dumba", category: "Meat", unit: "kg" },
    { id: "i4", name: "Potato", category: "Vegetables", unit: "kg" },
    { id: "i5", name: "Onion", category: "Vegetables", unit: "kg" },
    { id: "i6", name: "Tomato", category: "Vegetables", unit: "kg" },
    { id: "i7", name: "Sella Rice", category: "Rice", unit: "kg" },
    { id: "i8", name: "Steam Rice", category: "Rice", unit: "kg" },
    { id: "i9", name: "Basmati", category: "Rice", unit: "kg" },
    { id: "i10", name: "Cooking Oil", category: "Grocery", unit: "ltr" },
    { id: "i11", name: "Flour", category: "Grocery", unit: "kg" },
    { id: "i12", name: "Sugar", category: "Grocery", unit: "kg" },
    { id: "i13", name: "Charcoal", category: "Others", unit: "kg" },
    { id: "i14", name: "Disposables", category: "Others", unit: "pack" },
  ],
  suppliers: [
    { id: "s7", name: "Bilal Chicken", itemIds: ["c1", "c2", "c3", "c4", "c5", "c6", "c7"] },
    { id: "s8", name: "Faisal Chicken", itemIds: ["c1", "c2", "c3", "c4", "c5", "c6", "c7"] },
    { id: "s9", name: "Islam", itemIds: ["i15"] },
    { id: "s10", name: "Najeeb", itemIds: ["i15"] },
    { id: "s1", name: "Fresh Meat Co.", itemIds: ["i2", "i3"] },
    { id: "s3", name: "Green Farms", itemIds: ["i4", "i5", "i6"] },
    { id: "s4", name: "ABC Traders", itemIds: ["i7", "i8", "i9"] },
    { id: "s5", name: "Al Madina Grocers", itemIds: ["i10", "i11", "i12"] },
    { id: "s6", name: "General Supplies", itemIds: ["i13", "i14"] },
  ],
  // Example pricing rules — edit or add more in Admin > Rates.
  // fixed: same rate every time. formula: (offset + today's rate) * multiplier.
  pricing: {
    s9: { i15: { mode: "fixed", rate: 2000, cashOnly: false } },
    s10: { i15: { mode: "fixed", rate: 2300, cashOnly: false } },
    s7: {
      c1: { mode: "formula", offset: 0, multiplier: 1.95, cashOnly: false },
      c2: { mode: "formula", offset: 6, multiplier: 1.65, cashOnly: false },
    },
    s8: {
      c2: { mode: "formula", offset: 0, multiplier: 1.7, cashOnly: true },
    },
  },
  todayRates: {},
  users: [
    { id: "u1", name: "Ali", pin: "1234", permissions: ["purchase", "issue", "ending", "demand", "payment", "reports", "admin"] },
    { id: "u2", name: "Ahmed", pin: "2233", permissions: ["purchase", "issue", "reports"] },
    { id: "u3", name: "Bilal", pin: "3344", permissions: ["ending", "demand"] },
  ],
  purchases: [],
  issues: [],
  endings: [],
  demands: [],
  payments: [],
  log: [],
};

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_state (
      id INT PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  `);
  const { rows } = await pool.query("SELECT id FROM app_state WHERE id = 1");
  if (rows.length === 0) {
    await pool.query("INSERT INTO app_state (id, data) VALUES (1, $1)", [SEED]);
    console.log("Seeded initial data.");
  }
}

// Get the whole app state
app.get("/api/state", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT data FROM app_state WHERE id = 1");
    res.json(rows[0]?.data || SEED);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to load data" });
  }
});

// Save the whole app state (simple last-write-wins, fine for small teams)
app.post("/api/state", async (req, res) => {
  try {
    await pool.query(
      "UPDATE app_state SET data = $1, updated_at = now() WHERE id = 1",
      [req.body]
    );
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to save data" });
  }
});

app.get("/health", (req, res) => res.send("ok"));

const PORT = process.env.PORT || 3000;
init()
  .then(() => app.listen(PORT, () => console.log("StockFlow running on port " + PORT)))
  .catch((e) => {
    console.error("Startup failed:", e);
    process.exit(1);
  });

       
