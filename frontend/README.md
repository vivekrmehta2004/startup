# Frontend Starter

This frontend uses Next.js, TypeScript, and Tailwind CSS.

## 1. Install packages

```powershell
npm install
```

## 2. Create your environment file

Copy `.env.local.example` to `.env.local`.

Set:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:5000
```

## 3. Start the dev server

```powershell
npm run dev
```

## 4. Open the app

Visit:

- `/`
- `/resident/dashboard`
- `/guard/dashboard`
- `/admin/dashboard`

## 5. Connect to backend

Before testing the visitor form:

1. start the Flask backend
2. call `POST /api/setup/seed`
3. open `/resident/dashboard`
4. submit the invite form
