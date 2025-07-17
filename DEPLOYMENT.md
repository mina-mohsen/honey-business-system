# Deploy Your Honey Business App to Free Hosting

## Step-by-Step Deployment Guide

### Step 1: Set Up Your Free Neon Database

1. **Go to Neon**: https://neon.tech
2. **Sign up for free** (use your email or GitHub)
3. **Create a new project**:
   - Name: "honey-business"
   - Database: "honey_db" (or any name you prefer)
   - Region: Choose closest to your location
4. **Get your database URL**:
   - In Neon dashboard, go to "Connection Details"
   - Copy the connection string (it looks like: `postgresql://user:password@hostname/database`)
   - Keep this safe - you'll need it!

### Step 2: Import Your Data to Neon

1. **Set up the database URL as environment variable**:
   ```bash
   # On Windows
   set DATABASE_URL=your_neon_database_url_here
   
   # On Mac/Linux
   export DATABASE_URL=your_neon_database_url_here
   ```

2. **Run the import script**:
   ```bash
   node import-data.js
   ```

   This will:
   - Create all tables in your new Neon database
   - Import all your customers, orders, batches, and agents
   - Keep all your data exactly as it is now

### Step 3: Set Up Vercel for Free Hosting

1. **Go to Vercel**: https://vercel.com
2. **Sign up for free** (use your email or GitHub)
3. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```
4. **Login to Vercel**:
   ```bash
   vercel login
   ```

### Step 4: Deploy Your App

1. **In your project folder, run**:
   ```bash
   vercel
   ```

2. **Follow the prompts**:
   - Link to existing project? **No**
   - What's your project name? **honey-business** (or any name)
   - Which directory? **Leave blank** (press Enter)
   - Want to override settings? **No**

3. **Add your database URL to Vercel**:
   ```bash
   vercel env add DATABASE_URL
   ```
   - When prompted, paste your Neon database URL
   - Choose: **Production, Preview, and Development**

4. **Deploy**:
   ```bash
   vercel --prod
   ```

### Step 5: Your App is Live!

After deployment, Vercel will give you a URL like:
`https://honey-business.vercel.app`

Your app is now:
- ✅ **100% FREE** (no monthly costs)
- ✅ **Always online** (no sleeping)
- ✅ **Fast and reliable**
- ✅ **All your data preserved**
- ✅ **Works on mobile and desktop**

### Troubleshooting

**If deployment fails:**
1. Check that your DATABASE_URL is correctly set
2. Make sure all dependencies are installed: `npm install`
3. Test locally first: `npm run dev`

**If data import fails:**
1. Double-check your DATABASE_URL format
2. Make sure your Neon database is active
3. Check if export files exist in your project folder

**Need help?**
- Vercel docs: https://vercel.com/docs
- Neon docs: https://neon.tech/docs

### Future Updates

To update your app:
1. Make changes to your code
2. Run: `vercel --prod`
3. Your app updates automatically!

### Custom Domain (Optional)

Want your own domain like `mybusiness.com`?
1. Buy a domain from any provider
2. In Vercel dashboard, go to your project settings
3. Add your custom domain
4. Update DNS settings as instructed

---

**Your app is now completely free and will work forever!**