# UPIVOT - Full Stack Authentication Platform

A modern full-stack web application with authentication features including Google OAuth, built with Node.js/Express backend and React/Next.js frontend running on a single port.

## 📋 Table of Contents

* [Quick Start](#quick-start)
* [OAuth Setup](#oauth-setup)
* [Environment Variables](#environment-variables)
* [Test Commands](#test-commands)
* [Performance Testing with k6](#performance-testing-with-k6)
* [Tech Stack](#tech-stack)

## 🚀 Quick Start

### Prerequisites

* Docker & Docker Compose
* Git
* Google OAuth credentials
* k6 (optional, for performance testing)

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd upivot-project
```

2. Create a `.env` file in the root directory (see [Environment Variables](#environment-variables)).

3. Build and start the application:

```bash
docker-compose up --build
```

4. Access the application:

* Full Application: [http://localhost:4000](http://localhost:4000)
* MongoDB: `mongodb://localhost:27017/upivot`

## 🔐 OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/) and create a project.
2. Enable Google+ API and create OAuth credentials (Web application).
3. Set:

   * **Authorized JavaScript origins:** `http://localhost:4000`
   * **Authorized redirect URIs:** `http://localhost:4000/auth/google/callback`
4. Add **Client ID** and **Client Secret** to your `.env` file.

## 🔧 Environment Variables

```bash
PORT=4000
MONGO_URI=mongodb://mongo:27017/upivot
JWT_SECRET=your_super_secret_jwt_key
SESSION_COOKIE_NAME=upivot_sid
NODE_ENV=development

GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback

VITE_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

## 🧪 Test Commands

* Health check:

```bash
curl http://localhost:4000/health
```

## 🚀 Performance Testing with k6

Run performance tests (make sure to replace the drill ID in the script):

> Hit `http://localhost:4000/api/drills` in your browser, copy any drill `_id`, and replace it in `k6/script.js`

```bash
k6 run k6/script.js
```

## 📚 Tech Stack

### Backend

* Node.js, Express.js, MongoDB, Passport.js, JWT

### Frontend

* React, Next.js, Vite, Axios, Tailwind CSS

### Infrastructure

* Docker & Docker Compose, MongoDB containerized, Single port configuration

### Testing

* k6 for performance, cURL for API testing

### OAuth Integration

* Google OAuth 2.0 (Authorization Code Flow)
