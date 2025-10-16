# Deployment Guide - Fuel Cost Calculator NZ

## 🚀 Vercel Deployment

### Prerequisites
- GitHub repository connected to Vercel
- Vercel account (free tier available)

### Steps to Deploy

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import repository: `martingalmarino/FuelCostCalculator`

2. **Configure Build Settings:**
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `out` (for static export)
   - Install Command: `npm install`

3. **Environment Variables (Optional):**
   ```
   NEXT_PUBLIC_SITE_URL=https://fuelcostcalculator.nz
   NEXT_PUBLIC_GA_ID=your-google-analytics-id
   NEXT_PUBLIC_ADSENSE_ID=your-adsense-id
   ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be available at the provided Vercel URL

### Custom Domain (Optional)
- Go to Project Settings > Domains
- Add your custom domain: `fuelcostcalculator.nz`
- Configure DNS records as instructed

## 📊 Features Included
- ✅ 53 static pages pre-generated
- ✅ SEO optimized with metadata
- ✅ Mobile responsive design
- ✅ Fast loading with static export
- ✅ Security headers configured
- ✅ Sitemap and robots.txt ready

## 🔧 Post-Deployment
1. Add Google Analytics (optional)
2. Configure AdSense (optional)
3. Set up custom domain
4. Monitor performance in Vercel dashboard

## 📈 Performance
- Lighthouse Score: 95+ (expected)
- First Contentful Paint: <1.5s
- Time to Interactive: <2.5s
- All pages pre-rendered for SEO

## 🛠️ Maintenance
- Updates automatically deploy on git push
- Monitor in Vercel dashboard
- Analytics available in Vercel Analytics
