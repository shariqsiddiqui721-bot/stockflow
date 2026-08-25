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
  categories: ["Dumba", "Chicken", "Beef", "Ont", "Jhenga", "GS", "Masala", "Gulab Jamun", "Cocacola", "Next", "Water", "Dairy", "Coal", "Gas", "Vegetable", "Disposable", "BBQ", "KE North", "KE FOF", "KE FFH", "KE FK", "KE FW", "RENT North", "RENT FOF", "RENT FFH", "RENT FK"],
  items: [
    { id: "i1", name: "Dumba", nameUr: "دنبہ", category: "Dumba", unit: "kg" },
    { id: "i2", name: "Mutton", nameUr: "مٹن", category: "Dumba", unit: "kg" },
    { id: "i3", name: "Rosh", nameUr: "روش", category: "Dumba", unit: "kg" },
    { id: "i4", name: "Parda", nameUr: "پردہ", category: "Dumba", unit: "kg" },
    { id: "i5", name: "Chakki", nameUr: "چکی", category: "Dumba", unit: "kg" },
    { id: "i6", name: "Kunna", nameUr: "کنہ", category: "Dumba", unit: "kg" },
    { id: "i7", name: "Biryani Chicken", nameUr: "بریانی چکن", category: "Chicken", unit: "kg" },
    { id: "i8", name: "Karahi Chicken", nameUr: "کڑاہی چکن", category: "Chicken", unit: "kg" },
    { id: "i9", name: "BBQ Boneless", nameUr: "بی بی کیو بون لیس", category: "Chicken", unit: "kg" },
    { id: "i10", name: "Handi Boneless", nameUr: "ہانڈی بون لیس", category: "Chicken", unit: "kg" },
    { id: "i11", name: "Mandi Chicken", nameUr: "مانڈی چکن", category: "Chicken", unit: "kg" },
    { id: "i12", name: "Thai Boneless", nameUr: "تھائی بون لیس", category: "Chicken", unit: "kg" },
    { id: "i13", name: "Tikka", nameUr: "ٹکہ", category: "Chicken", unit: "kg" },
    { id: "i14", name: "Tikka leg", nameUr: "ٹکہ لیگ", category: "Chicken", unit: "kg" },
    { id: "i15", name: "Tikka Chest", nameUr: "ٹکہ چیسٹ", category: "Chicken", unit: "kg" },
    { id: "i16", name: "Muqqadam", nameUr: "مقدم", category: "Beef", unit: "kg" },
    { id: "i17", name: "beef kabab", nameUr: "بیف کباب", category: "Beef", unit: "kg" },
    { id: "i18", name: "Beef biryani", nameUr: "بیف بریانی", category: "Beef", unit: "kg" },
    { id: "i19", name: "Beef salan", nameUr: "بیف سالن", category: "Beef", unit: "kg" },
    { id: "i20", name: "Fat", nameUr: "چربی", category: "Beef", unit: "kg" },
    { id: "i21", name: "Ont karhai", nameUr: "اونٹ کڑاہی", category: "Ont", unit: "kg" },
    { id: "i22", name: "Ont BBQ", nameUr: "اونٹ بی بی کیو", category: "Ont", unit: "kg" },
    { id: "i23", name: "Jhenga", nameUr: "جھینگا", category: "Jhenga", unit: "kg" },
    { id: "i24", name: "Oil", nameUr: "تیل", category: "GS", unit: "kg" },
    { id: "i25", name: "ghee", nameUr: "گھی", category: "GS", unit: "kg" },
    { id: "i26", name: "Meda", nameUr: "میدہ", category: "GS", unit: "kg" },
    { id: "i27", name: "fine", nameUr: "باریک آٹا", category: "GS", unit: "kg" },
    { id: "i28", name: "Red atta", nameUr: "لال آٹا", category: "GS", unit: "kg" },
    { id: "i29", name: "Rice", nameUr: "چاول", category: "GS", unit: "kg" },
    { id: "i30", name: "Salt", nameUr: "نمک", category: "GS", unit: "kg" },
    { id: "i31", name: "Cream", nameUr: "کریم", category: "GS", unit: "piece" },
    { id: "i32", name: "Mozerella", nameUr: "موزاریلا", category: "GS", unit: "kg" },
    { id: "i33", name: "happy cow", nameUr: "ہیپی کاؤ", category: "GS", unit: "piece" },
    { id: "i34", name: "cheese slice", nameUr: "چیز سلائس", category: "GS", unit: "piece" },
    { id: "i35", name: "butter", nameUr: "مکھن", category: "GS", unit: "piece" },
    { id: "i36", name: "gulocos", nameUr: "گلوکوز", category: "GS", unit: "kg" },
    { id: "i37", name: "east", nameUr: "خمیر", category: "GS", unit: "kg" },
    { id: "i38", name: "soda", nameUr: "سوڈا", category: "GS", unit: "kg" },
    { id: "i39", name: "cutter zeera", nameUr: "کٹر زیرہ", category: "Masala", unit: "kg" },
    { id: "i40", name: "Phool", nameUr: "پھول", category: "Masala", unit: "kg" },
    { id: "i41", name: "Aloo Bukhara", nameUr: "آلو بخارا", category: "Masala", unit: "kg" },
    { id: "i42", name: "Zeera", nameUr: "زیرہ", category: "Masala", unit: "kg" },
    { id: "i43", name: "kutti mirch", nameUr: "کٹی مرچ", category: "Masala", unit: "kg" },
    { id: "i44", name: "pisi mirch", nameUr: "پسی مرچ", category: "Masala", unit: "kg" },
    { id: "i45", name: "Haldi", nameUr: "ہلدی", category: "Masala", unit: "kg" },
    { id: "i46", name: "jayfal", nameUr: "جائفل", category: "Masala", unit: "kg" },
    { id: "i47", name: "javitri", nameUr: "جاوتری", category: "Masala", unit: "kg" },
    { id: "i48", name: "choti ilaichi", nameUr: "چھوٹی الائچی", category: "Masala", unit: "kg" },
    { id: "i49", name: "bari ilaichi", nameUr: "بڑی الائچی", category: "Masala", unit: "kg" },
    { id: "i50", name: "long", nameUr: "لونگ", category: "Masala", unit: "kg" },
    { id: "i51", name: "Kali mirch", nameUr: "کالی مرچ", category: "Masala", unit: "kg" },
    { id: "i52", name: "dar chini", nameUr: "دار چینی", category: "Masala", unit: "kg" },
    { id: "i53", name: "sonf", nameUr: "سونف", category: "Masala", unit: "kg" },
    { id: "i54", name: "zarda rang", nameUr: "زردہ رنگ", category: "Masala", unit: "kg" },
    { id: "i55", name: "Tezz Patta", nameUr: "تیز پتہ", category: "Masala", unit: "kg" },
    { id: "i56", name: "khopra powder", nameUr: "کھوپرا پاؤڈر", category: "Masala", unit: "kg" },
    { id: "i57", name: "Mandi box", nameUr: "مانڈی باکس", category: "Masala", unit: "piece" },
    { id: "i58", name: "kunna box", nameUr: "کنہ باکس", category: "Masala", unit: "piece" },
    { id: "i59", name: "shan", nameUr: "شان مصالحہ", category: "Masala", unit: "piece" },
    { id: "i60", name: "dacni mirch", nameUr: "دکنی مرچ", category: "Masala", unit: "kg" },
    { id: "i61", name: "badian", nameUr: "بادیان", category: "Masala", unit: "kg" },
    { id: "i62", name: "gulab jamun", nameUr: "گلاب جامن", category: "Gulab Jamun", unit: "kg" },
    { id: "i63", name: "Can coke", nameUr: "کین کوک", category: "Cocacola", unit: "piece" },
    { id: "i64", name: "Buddy coke", nameUr: "بڈی کوک", category: "Cocacola", unit: "piece" },
    { id: "i65", name: "Can Next", nameUr: "کین نیکسٹ", category: "Next", unit: "piece" },
    { id: "i66", name: "buddy next", nameUr: "بڈی نیکسٹ", category: "Next", unit: "piece" },
    { id: "i67", name: "Water small", nameUr: "چھوٹی پانی کی بوتل", category: "Water", unit: "piece" },
    { id: "i68", name: "Water large", nameUr: "بڑی پانی کی بوتل", category: "Water", unit: "piece" },
    { id: "i69", name: "Labor Water", nameUr: "مزدور پانی", category: "Water", unit: "piece" },
    { id: "i70", name: "Kitchen Water", nameUr: "کچن پانی", category: "Water", unit: "piece" },
    { id: "i71", name: "dahi", nameUr: "دہی", category: "Dairy", unit: "kg" },
    { id: "i72", name: "milk", nameUr: "دودھ", category: "Dairy", unit: "kg" },
    { id: "i73", name: "coal", nameUr: "کوئلہ", category: "Coal", unit: "kg" },
    { id: "i74", name: "gas machine", nameUr: "گیس مشین", category: "Gas", unit: "kg" },
    { id: "i75", name: "gas", nameUr: "گیس", category: "Gas", unit: "kg" },
    { id: "i76", name: "Aloo", nameUr: "آلو", category: "Vegetable", unit: "kg" },
    { id: "i77", name: "Piyaaz", nameUr: "پیاز", category: "Vegetable", unit: "kg" },
    { id: "i78", name: "tomato", nameUr: "ٹماٹر", category: "Vegetable", unit: "kg" },
    { id: "i79", name: "Dhaniya", nameUr: "دھنیا", category: "Vegetable", unit: "piece" },
    { id: "i80", name: "Podina", nameUr: "پودینہ", category: "Vegetable", unit: "piece" },
    { id: "i81", name: "Adrak", nameUr: "ادرک", category: "Vegetable", unit: "kg" },
    { id: "i82", name: "Lehsan", nameUr: "لہسن", category: "Vegetable", unit: "kg" },
    { id: "i83", name: "Lemon", nameUr: "لیموں", category: "Vegetable", unit: "kg" },
    { id: "i84", name: "Moti Mirch", nameUr: "موٹی مرچ", category: "Vegetable", unit: "kg" },
    { id: "i85", name: "Hari Mirch", nameUr: "ہری مرچ", category: "Vegetable", unit: "kg" },
    { id: "i86", name: "Kheera", nameUr: "کھیرا", category: "Vegetable", unit: "kg" },
    { id: "i87", name: "papita", nameUr: "پپیتا", category: "Vegetable", unit: "kg" },
    { id: "i88", name: "Chukandar", nameUr: "چقندر", category: "Vegetable", unit: "kg" },
    { id: "i89", name: "Gajjar", nameUr: "گاجر", category: "Vegetable", unit: "kg" },
    { id: "i90", name: "Kari patta", nameUr: "کڑی پتہ", category: "Vegetable", unit: "kg" },
    { id: "i91", name: "Shimla", nameUr: "شملہ مرچ", category: "Vegetable", unit: "kg" },
    { id: "i92", name: "glass", nameUr: "گلاس", category: "Disposable", unit: "piece" },
    { id: "i93", name: "book", nameUr: "بک تھیلا", category: "Disposable", unit: "kg" },
    { id: "i94", name: "rubber band", nameUr: "ربڑ بینڈ", category: "Disposable", unit: "piece" },
    { id: "i95", name: "starow pipe", nameUr: "سٹرا پائپ", category: "Disposable", unit: "piece" },
    { id: "i96", name: "R16", nameUr: "آر 16", category: "Disposable", unit: "piece" },
    { id: "i97", name: "R10", nameUr: "آر 10", category: "Disposable", unit: "piece" },
    { id: "i98", name: "1500 ML", nameUr: "1500 ایم ایل", category: "Disposable", unit: "piece" },
    { id: "i99", name: "750 Ml", nameUr: "750 ایم ایل", category: "Disposable", unit: "piece" },
    { id: "i100", name: "HD shopper", nameUr: "ایچ ڈی شاپر", category: "Disposable", unit: "piece" },
    { id: "i101", name: "aluminium file", nameUr: "المونیم فوائل", category: "Disposable", unit: "piece" },
    { id: "i102", name: "14+18", nameUr: "14+18", category: "Disposable", unit: "piece" },
    { id: "i103", name: "12+16", nameUr: "12+16", category: "Disposable", unit: "piece" },
    { id: "i104", name: "10+14", nameUr: "10+14", category: "Disposable", unit: "piece" },
    { id: "i105", name: "30+50", nameUr: "30+50", category: "Disposable", unit: "piece" },
    { id: "i106", name: "gloves", nameUr: "دستانے", category: "Disposable", unit: "piece" },
    { id: "i107", name: "cling file", nameUr: "کلنگ فوائل", category: "Disposable", unit: "piece" },
    { id: "i108", name: "mask", nameUr: "ماسک", category: "Disposable", unit: "piece" },
    { id: "i109", name: "toothpick", nameUr: "ٹوتھ پک", category: "Disposable", unit: "piece" },
    { id: "i110", name: "Tissu", nameUr: "ٹشو", category: "Disposable", unit: "piece" },
    { id: "i111", name: "safi", nameUr: "صافی", category: "Disposable", unit: "kg" },
    { id: "i112", name: "room spary", nameUr: "روم اسپرے", category: "Disposable", unit: "piece" },
    { id: "i113", name: "dastarkhwan", nameUr: "دسترخوان", category: "Disposable", unit: "piece" },
    { id: "i114", name: "printer Roll", nameUr: "پرنٹر رول", category: "Disposable", unit: "piece" },
    { id: "i115", name: "beef bihari boti", nameUr: "بیف بہاری بوٹی", category: "BBQ", unit: "piece" },
    { id: "i116", name: "Kabab beef", nameUr: "کباب بیف", category: "BBQ", unit: "piece" },
    { id: "i117", name: "chicken kabab", nameUr: "چکن کباب", category: "BBQ", unit: "piece" },
    { id: "i118", name: "malai boti", nameUr: "ملائی بوٹی", category: "BBQ", unit: "piece" },
    { id: "i119", name: "leg tikka", nameUr: "لیگ ٹکہ", category: "BBQ", unit: "piece" },
    { id: "i120", name: "chest tikka", nameUr: "چیسٹ ٹکہ", category: "BBQ", unit: "piece" },
    { id: "i121", name: "dumba kabab", nameUr: "دنبہ کباب", category: "BBQ", unit: "piece" },
    { id: "i122", name: "KE North", nameUr: "کے ای نارتھ", category: "KE North", unit: "pm" },
    { id: "i123", name: "KE FOF", nameUr: "کے ای ایف او ایف", category: "KE FOF", unit: "pm" },
    { id: "i124", name: "KE FFH", nameUr: "کے ای ایف ایف ایچ", category: "KE FFH", unit: "pm" },
    { id: "i125", name: "KE FK", nameUr: "کے ای ایف کے", category: "KE FK", unit: "pm" },
    { id: "i126", name: "KE FW", nameUr: "کے ای ایف ڈبلیو", category: "KE FW", unit: "pm" },
    { id: "i127", name: "RENT NORTH", nameUr: "کرایہ نارتھ", category: "RENT North", unit: "pm" },
    { id: "i128", name: "RENT FOF", nameUr: "کرایہ ایف او ایف", category: "RENT FOF", unit: "pm" },
    { id: "i129", name: "RENT FFH", nameUr: "کرایہ ایف ایف ایچ", category: "RENT FFH", unit: "pm" },
    { id: "i130", name: "RENT FK", nameUr: "کرایہ ایف کے", category: "RENT FK", unit: "pm" },
    { id: "i131", name: "RENT FFH", nameUr: "کرایہ ایف ایف ایچ", category: "RENT FFH", unit: "pm" },
  ],
  suppliers: [
    { id: "s1", name: "Islam", itemIds: ["i1", "i2", "i3", "i4", "i5", "i6"] },
    { id: "s2", name: "Najeeb", itemIds: ["i1", "i2", "i3", "i4", "i5", "i6"] },
    { id: "s3", name: "Faisal", itemIds: ["i7", "i8", "i9", "i10", "i11", "i12", "i13", "i14", "i15"] },
    { id: "s4", name: "Hasnain", itemIds: [] },
    { id: "s5", name: "Ali", itemIds: ["i74", "i75"] },
    { id: "s6", name: "Local Gas", itemIds: ["i74", "i75"] },
    { id: "s7", name: "Umair", itemIds: ["i16", "i17", "i18", "i19", "i20"] },
    { id: "s8", name: "Amir", itemIds: ["i16", "i17", "i18", "i19", "i20"] },
    { id: "s9", name: "Ali Jhenga", itemIds: ["i23"] },
    { id: "s10", name: "Ahmed", itemIds: ["i23"] },
    { id: "s11", name: "Yousuf", itemIds: ["i21", "i22"] },
    { id: "s12", name: "Nasir Masala", itemIds: ["i39", "i40", "i41", "i42", "i43", "i44", "i45", "i46", "i47", "i48", "i49", "i50", "i51", "i52", "i53", "i54", "i55", "i56", "i57", "i58", "i59", "i60", "i61"] },
    { id: "s13", name: "Nasir Oil", itemIds: ["i24", "i25", "i26", "i27", "i28", "i29", "i30", "i31", "i32", "i33", "i34", "i35", "i36", "i37", "i38"] },
    { id: "s14", name: "Zamzam", itemIds: ["i92", "i93", "i94", "i95", "i96", "i97", "i98", "i99", "i100", "i101", "i102", "i103", "i104", "i105", "i106", "i107", "i108", "i109", "i110", "i111", "i112", "i113", "i114"] },
    { id: "s15", name: "Babar", itemIds: ["i65", "i66", "i67", "i68", "i69", "i70"] },
    { id: "s16", name: "Cocacola", itemIds: ["i63", "i64"] },
    { id: "s17", name: "H2O", itemIds: ["i67", "i68", "i69", "i70"] },
    { id: "s18", name: "Local Water", itemIds: ["i67", "i68", "i69", "i70"] },
    { id: "s19", name: "Coal", itemIds: ["i73"] },
    { id: "s20", name: "KE North", itemIds: ["i122"] },
    { id: "s21", name: "Ke Fof", itemIds: ["i123"] },
    { id: "s22", name: "Ke Ffh", itemIds: ["i124"] },
    { id: "s23", name: "Ke Fk", itemIds: ["i125"] },
    { id: "s24", name: "Ke Fw", itemIds: ["i126"] },
    { id: "s25", name: "Rent North", itemIds: ["i127"] },
    { id: "s26", name: "Rent Fof", itemIds: ["i128"] },
    { id: "s27", name: "Rent Ffh", itemIds: ["i129", "i131"] },
    { id: "s28", name: "Rent Fk", itemIds: ["i130"] },
  ],
  // Fill in rates for your suppliers in Admin > Rates (fixed price, or formula off today's rate).
  pricing: {
    s1: { i1: { mode: "fixed", rate: 2000, cashOnly: false } },
    s2: { i1: { mode: "fixed", rate: 2300, cashOnly: false } },
  },
  todayRates: {},
  kitchens: [
    { id: "k1", name: "Kitchen 1", branch: "FB" },
    { id: "k2", name: "Kitchen 2", branch: "FB" },
    { id: "k3", name: "Kitchen 3", branch: "FB" },
    { id: "k4", name: "Kitchen 4", branch: "FB" },
    { id: "k5", name: "Kitchen 1", branch: "North" },
    { id: "k6", name: "Kitchen 2", branch: "North" },
    { id: "k7", name: "Kitchen 3", branch: "North" },
    { id: "k8", name: "Kitchen 4", branch: "North" },
  ],
  users: [
    { id: "u1", name: "Ali", pin: "1234", permissions: ["purchase", "issue", "ending", "demand", "adjustment", "payment", "reports", "admin"], branches: ["Store", "FB", "North"], kitchens: [] },
    { id: "u2", name: "Ahmed", pin: "2233", permissions: ["purchase", "issue", "reports"], branches: ["Store"], kitchens: [] },
    { id: "u3", name: "Bilal", pin: "3344", permissions: ["ending", "demand"], branches: ["FB", "North"], kitchens: [] },
  ],
  purchases: [],
  issues: [],
  endings: [],
  demands: [],
  payments: [],
  adjustments: [],
  demandAdjustments: [],
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
