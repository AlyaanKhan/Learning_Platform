# Railway Deployment Guide for Python Learning Platform

## Prerequisites
1. Railway account (free tier available)
2. Code pushed to Git repository
3. Railway CLI (optional)

## Step 1: Deploy Backend

### Using Railway Dashboard:
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project" → "Deploy from GitHub repo"
3. Set **Root Directory** to `backend`
4. Add environment variable: `ALLOWED_ORIGINS` = `https://python-learning-frontend-production.up.railway.app`
5. Deploy and note the backend URL (e.g., `https://python-learning-backend-production.up.railway.app`)

### Using CLI:
```bash
railway login
railway init
railway service backend
railway up
```

## Step 2: Deploy Frontend

### Using Railway Dashboard:
1. In your project, click "New Service"
2. Set **Root Directory** to `python-learning-platform`
3. Add environment variable: `VITE_API_BASE_URL` = `https://python-learning-backend-production.up.railway.app`
4. Deploy and note the frontend URL (e.g., `https://python-learning-frontend-production.up.railway.app`)

### Using CLI:
```bash
railway service frontend --dir python-learning-platform
railway variables set VITE_API_BASE_URL=https://python-learning-backend-production.up.railway.app
railway up --service frontend
```

## Step 3: Update CORS
1. Go back to backend service
2. Update `ALLOWED_ORIGINS` with your frontend URL: `https://python-learning-frontend-production.up.railway.app`
3. Railway will auto-redeploy

## Environment Variables

**Backend:**
- `ALLOWED_ORIGINS`: `https://python-learning-frontend-production.up.railway.app`
- `PORT`: Auto-set by Railway

**Frontend:**
- `VITE_API_BASE_URL`: `https://python-learning-backend-production.up.railway.app`

## Railway CLI Commands
```bash
railway login          # Login
railway projects       # List projects
railway up            # Deploy
railway logs          # View logs
railway open          # Open in browser
railway variables     # Manage variables
```

## Troubleshooting
1. **CORS Errors**: Check `ALLOWED_ORIGINS` URL
2. **Build Failures**: Check logs in dashboard
3. **API Issues**: Verify `VITE_API_BASE_URL`

## Cost
- **Free**: 500 hours/month, $5 credit
- **Pro**: $20/month unlimited

## Advantages
- Simple Git-based deployment
- Auto-scaling and SSL
- Built-in CI/CD
- Global CDN
- Custom domains included

Your app will be live with automatic deployments! 🚀 