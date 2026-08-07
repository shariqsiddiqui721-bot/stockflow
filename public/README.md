# StockFlow — Setup Guide (from zero)

No coding needed. Just follow these steps in order.

## What you're setting up
- One website your 5–7 staff open on their phone (like an app)
- One free online database that holds all the data
- Total cost: free to start (Railway gives free credit; small cost later if you grow)

---

## Step 1 — Put the code on GitHub (free)

1. Go to https://github.com and make a free account.
2. Click the **+** (top right) → **New repository**.
3. Name it `stockflow` → click **Create repository**.
4. On the new repo page, click **uploading an existing file**.
5. Drag in ALL the files I gave you (`server.js`, `package.json`, `README.md`, and the whole `public` folder with `index.html`, `manifest.json`, `sw.js` inside it).
6. Click **Commit changes**.

## Step 2 — Deploy it on Railway (free)

1. Go to https://railway.app and sign up using your GitHub account.
2. Click **New Project** → **Deploy from GitHub repo** → pick `stockflow`.
3. Railway will start building it automatically. Wait for it to finish.
4. In the same project, click **+ New** → **Database** → **Add PostgreSQL**.
   - Railway connects it automatically — you don't need to configure anything.
5. Click on your `stockflow` service → **Settings** → **Networking** → **Generate Domain**.
   - You'll get a link like `stockflow-production.up.railway.app`. This is your app's address.

## Step 3 — Open it

1. Open that link on your phone.
2. Log in with a starter PIN:
   - Ali → `1234` (admin)
   - Ahmed → `2233`
   - Bilal → `3344`
3. On iPhone: Share button → **Add to Home Screen**.
   On Android: Menu (⋮) → **Add to Home Screen** / **Install app**.
   It now behaves like a real app icon.

## Step 4 — Set it up for your business

1. Log in as Ali (admin) → tap **Admin**.
2. Add/remove Items, Suppliers, Users (with their own PINs) to match your business.
3. Delete the sample data once your real people/items are in.

---

## If something goes wrong
- Blank page / "Could not connect to server": check Railway → your service → **Deployments** tab for a red error, and make sure the Postgres database was added.
- Forgot a PIN: log in as Ali (admin) → Admin → Users, and check the list.
- Anything else: send me the exact error text shown in Railway's Deployments log and I'll fix it.

## Good to know
- All 5–7 people share the same live data — no separate installs needed.
- This uses a simple "last save wins" method, which is fine for a small team entering data one at a time. If two people save the exact same second, tell me and I can add stricter protection.
- Google Sheets / ERP auto-sync is not included yet — once this is live and working the way you want, tell me and I'll add it next.
