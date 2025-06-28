# Deployment Guide for Python Learning Platform

This guide will help you deploy your Python Learning Platform on Render.

## Project Structure

- **Frontend**: React/TypeScript app (python-learning-platform/)
- **Backend**: Flask API (backend/)

## Prerequisites

1. A Render account (free tier available)
2. Your code pushed to a Git repository (GitHub, GitLab, etc.)

## Step 1: Deploy the Backend (Flask API)

### 1.1 Create a new Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Web Service"
3. Connect your Git repository
4. Configure the service:

**Basic Settings:**
- **Name**: `python-learning-backend` (or your preferred name)
- **Environment**: `Python 3`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)

**Build Settings:**
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app:app`

**Environment Variables:**
- `ALLOWED_ORIGINS`: `https://your-frontend-app-name.onrender.com` (we'll add this after frontend deployment)

### 1.2 Deploy the Backend

1. Click "Create Web Service"
2. Render will automatically build and deploy your backend
3. Note the URL provided (e.g., `https://python-learning-backend.onrender.com`)

## Step 2: Deploy the Frontend (React App)

### 2.1 Create a new Static Site on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Static Site"
3. Connect your Git repository
4. Configure the service:

**Basic Settings:**
- **Name**: `python-learning-frontend` (or your preferred name)
- **Environment**: `Static Site`
- **Region**: Same as backend
- **Branch**: `main` (or your default branch)

**Build Settings:**
- **Build Command**: `cd python-learning-platform && npm install && npm run build`
- **Publish Directory**: `python-learning-platform/dist`

**Environment Variables:**
- `VITE_API_BASE_URL`: `https://your-backend-app-name.onrender.com` (use the backend URL from Step 1)

### 2.2 Deploy the Frontend

1. Click "Create Static Site"
2. Render will automatically build and deploy your frontend
3. Note the URL provided (e.g., `https://python-learning-frontend.onrender.com`)

## Step 3: Update CORS Configuration

### 3.1 Update Backend CORS

1. Go back to your backend service on Render
2. Go to "Environment" tab
3. Add/Update the environment variable:
   - `ALLOWED_ORIGINS`: `https://your-frontend-app-name.onrender.com`
4. Click "Save Changes"
5. Render will automatically redeploy with the new configuration

## Step 4: Test Your Deployment

1. Visit your frontend URL
2. Try running some Python code in the code editor
3. Check that the backend API is working correctly

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure `ALLOWED_ORIGINS` includes your frontend URL
2. **Build Failures**: Check the build logs in Render dashboard
3. **API Connection Issues**: Verify the `VITE_API_BASE_URL` is correct
4. **Timeout Issues**: The free tier has limitations, consider upgrading for production

### Environment Variables Reference:

**Backend:**
- `ALLOWED_ORIGINS`: Comma-separated list of allowed frontend URLs
- `PORT`: Port number (Render sets this automatically)

**Frontend:**
- `VITE_API_BASE_URL`: Your backend service URL

## Cost Considerations

- **Free Tier**: Limited to 750 hours/month, services sleep after 15 minutes of inactivity
- **Paid Plans**: Start at $7/month for always-on services

## Security Notes

1. The current setup uses the Piston API for code execution
2. Consider implementing rate limiting for production use
3. Add authentication if needed
4. Use HTTPS (Render provides this automatically)

## Next Steps

1. Set up a custom domain (optional)
2. Configure monitoring and logging
3. Set up CI/CD for automatic deployments
4. Add authentication and user management
5. Implement database for storing user progress

## Support

If you encounter issues:
1. Check Render's documentation: https://render.com/docs
2. Review build logs in the Render dashboard
3. Check the application logs for runtime errors 