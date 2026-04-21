# Deploy Guide

This project is easiest to share publicly with:

- frontend on Vercel
- backend on Render

This is good for demos because:

- Vercel is simple for Next.js
- Render supports Python web services
- both provide free options for hobby/demo use

## 1. Put code on GitHub

Create a new GitHub repository and push this project.

You need the repository online because:

- Vercel pulls frontend code from GitHub
- Render pulls backend code from GitHub

## 2. Deploy backend on Render

Create a new Web Service on Render.

Use these settings:

- Root Directory: `backend`
- Runtime: `Python 3`
- Build Command: `pip install -r requirements.txt`
- Start Command: `gunicorn run:app`

After deploy, your backend URL will look like:

`https://your-backend-name.onrender.com`

Test:

- `/health`
- `/api/setup/seed`
- `/api/visitors?society_id=1`

Example:

`https://your-backend-name.onrender.com/health`

Important note:

- Render free web services can sleep after inactivity
- the first request after sleep can take some time

## 3. Deploy frontend on Vercel

Import the same GitHub repository into Vercel.

Use these settings:

- Framework Preset: `Next.js`
- Root Directory: `frontend`

Add this environment variable in Vercel:

`NEXT_PUBLIC_API_BASE_URL=https://your-backend-name.onrender.com`

Then deploy.

Your frontend URL will look like:

`https://your-project-name.vercel.app`

## 4. Seed demo data after backend deploy

After backend deploy, call:

`POST https://your-backend-name.onrender.com/api/setup/seed`

This creates the sample society, units, and users used in the demo form.

## 5. Demo flow

Once both are deployed:

1. open your Vercel frontend URL
2. go to `/resident/dashboard`
3. submit the visitor invite form
4. check visitors from the backend API

## 6. Important warning about database

Right now the backend can fall back to local SQLite.

That is okay for local learning, but not ideal for public hosting because:

- hosted filesystems may reset
- data may disappear on restart

For a more stable public demo, use a hosted PostgreSQL database and set:

`DATABASE_URL=your_postgres_connection_string`

## 7. Best beginner public demo path

Fastest:

- deploy backend on Render
- deploy frontend on Vercel
- use the app as a short demo

Better:

- deploy backend on Render
- use hosted Postgres
- deploy frontend on Vercel

## 8. What to show your friend

Share these links:

- frontend app URL
- resident dashboard URL
- admin dashboard URL

Example:

- `https://your-project-name.vercel.app/`
- `https://your-project-name.vercel.app/resident/dashboard`
- `https://your-project-name.vercel.app/admin/dashboard`
