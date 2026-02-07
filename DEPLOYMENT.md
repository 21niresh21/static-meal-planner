# Quick Deployment Guide for Vercel

## Prerequisites
- Git repository (GitHub, GitLab, or Bitbucket)
- Vercel account (free tier works perfectly)

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to Git
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Meal Planner app"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/meal-planner.git

# Push
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub/GitLab/Bitbucket
3. Click "Add New..." → "Project"
4. Import your `meal-planner` repository
5. Vercel will auto-detect Next.js settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
6. Click "Deploy"
7. Wait 1-2 minutes for build to complete
8. Your app is live! 🎉

### Step 3: Get Your URL
- Vercel provides a URL like: `https://meal-planner-xyz.vercel.app`
- You can customize this in Project Settings → Domains

## Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - What's your project's name? meal-planner
# - In which directory is your code located? ./
# - Want to override settings? No

# Your app will be deployed!
```

## Method 3: Deploy to Production

```bash
# Deploy to production domain
vercel --prod
```

## Automatic Deployments

Once connected to Git:
- **Every push to main branch** → Automatic production deployment
- **Every push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

## Environment Variables (If Needed Later)

Currently, the app doesn't need any environment variables. If you add them later:

1. Go to Project Settings → Environment Variables
2. Add your variables
3. Redeploy

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel handles SSL automatically

## Updating Your Deployed App

### To Add New Recipes:
1. Edit `app/data/recipes.ts` locally
2. Commit and push:
   ```bash
   git add app/data/recipes.ts
   git commit -m "Add new recipes"
   git push
   ```
3. Vercel automatically rebuilds and deploys
4. Changes live in ~2 minutes

### To Update Styling:
1. Edit theme or component files
2. Commit and push
3. Automatic deployment

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally to test

### App Not Loading
- Check browser console for errors
- Verify deployment completed successfully
- Check Vercel function logs

### LocalStorage Not Working
- LocalStorage works automatically in browser
- No server-side configuration needed
- Each user's order is stored in their browser

## Performance Tips

Your app is already optimized:
- ✅ Static generation (super fast)
- ✅ Image optimization via Unsplash CDN
- ✅ Code splitting (Next.js automatic)
- ✅ No API calls (no latency)

## Monitoring

Vercel provides:
- **Analytics**: Project → Analytics tab
- **Logs**: Project → Deployments → View Function Logs
- **Performance**: Automatic Web Vitals tracking

## Cost

- **Free tier includes**:
  - Unlimited deployments
  - 100GB bandwidth/month
  - Automatic HTTPS
  - Preview deployments
  - Analytics

This app will easily fit in the free tier! 🎉

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**That's it!** Your meal planner is now live and accessible worldwide. Share the URL with friends and family! 🚀
