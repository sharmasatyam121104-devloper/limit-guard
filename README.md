# Limit Guard

### Redis-Powered API Rate Limiting & Traffic Monitoring Platform

Limit Guard is a full-stack API rate limiting platform built to demonstrate how **Redis-based rate limiting, authentication, request tracking, analytics, and API monitoring** work together in a production-style application.

The platform provides an authenticated dashboard where users can monitor their API traffic, test protected APIs through an API Playground, inspect rate-limit status, analyze endpoint usage, and review activity logs.

> **Core idea:** MongoDB stores persistent user information, while Redis handles high-frequency, time-sensitive rate-limiting and traffic data.

---

## Features

### Authentication & User Management

* User signup and login
* JWT-based authentication
* HTTP-only cookie-based access token handling
* Protected dashboard routes
* Persistent authentication state using Zustand
* Profile management
* Secure logout flow
* Automatic access-token refresh
* Centralized authentication error handling

### API Playground

The API Playground allows authenticated users to test dummy APIs directly from the dashboard.

Available endpoints include:

```text
GET /play-ground/product
GET /play-ground/movie
GET /play-ground/book
GET /play-ground/student
GET /play-ground/employee
```

These dummy APIs are intentionally protected by the rate limiter so users can observe rate limiting behavior in real time.

For example:

```text
5 requests / minute
```

After reaching the limit, additional requests are rejected with:

```http
429 Too Many Requests
```

---

## Rate Limiting

Limit Guard currently implements a **Sliding Window Log** rate limiting algorithm using Redis Sorted Sets.

### Current Configuration

```text
Window Size: 60 seconds
Maximum Requests: 5
```

The rate limit is applied per authenticated user.

### How it works

Each user's requests are stored in a Redis Sorted Set:

```text
rate:{userId}
```

The request timestamp is used as the Redis score.

Before processing a new request, expired timestamps are removed:

```text
Current Time
     │
     ▼
Remove requests older than 60 seconds
     │
     ▼
Count remaining requests
     │
     ├── Count >= 5
     │       │
     │       ▼
     │   HTTP 429
     │
     └── Count < 5
             │
             ▼
        Store new request
             │
             ▼
        Allow request
```

This provides a more accurate rolling-window limit than a simple fixed-window counter.

### Redis implementation

The rate limiter uses:

* `ZREMRANGEBYSCORE` — remove expired requests
* `ZCARD` — count requests inside the current window
* `ZADD` — store the current request
* `EXPIRE` — automatically clean up inactive keys
* `TTL` — calculate remaining reset time

Example Redis key:

```text
rate:USER_ID
```

This design keeps rate-limit operations in Redis instead of performing frequent database writes.

---

# Rate Limit Monitor

The dashboard provides a real-time view of the current rate-limit state.

Example:

```text
Rate Limit Monitor

Status
Active

Rate Limit
5 / minute

Remaining
5

Reset In
0 sec
```

The monitor helps users understand:

* Current rate-limit status
* Maximum allowed requests
* Requests remaining
* Window reset time

---

# API Usage Analytics

The Usage page provides aggregated information about API traffic.

Example:

```text
API Usage Analytics

Total Requests
43

Blocked Requests
2

Avg Latency
1ms

Top Endpoints

/play-ground/product       22 requests
/play-ground/movie          8 requests
/play-ground/book           6 requests
/play-ground/student        4 requests
/play-ground/employee       3 requests
```

The analytics page calculates:

* Total requests
* Blocked requests
* Average latency
* Most frequently used endpoints
* Endpoint request distribution

This demonstrates how request-level data can be transformed into useful API observability metrics.

---

# Activity Logs

Limit Guard records API activity so users can inspect their request history.

Example:

```text
Activity Logs

Recent Events

API Request: /api-list
41 minutes ago
success

API Request: /product
41 minutes ago
success

API Request: /api-list
41 minutes ago
success
```

Activity logs provide visibility into:

* API requests
* Request status
* Endpoint information
* Request timestamps
* Successful and blocked requests

---

# Dashboard

The main dashboard combines the most important information in one place:

* Current rate-limit status
* API usage statistics
* Most-used API
* Recent activity
* API Playground shortcuts
* Server/Redis connectivity status

The goal is to give users a quick overview without requiring them to inspect individual pages.

---

# Architecture

Limit Guard follows a modular full-stack architecture.

```text
                    ┌─────────────────────┐
                    │     React Client    │
                    │                     │
                    │  Dashboard          │
                    │  API Playground     │
                    │  Usage Analytics    │
                    │  Activity Logs      │
                    │  Profile            │
                    │  Rate Limit Monitor │
                    └──────────┬──────────┘
                               │
                            Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Express Server   │
                    │                     │
                    │ Authentication      │
                    │ Rate Limiting       │
                    │ Usage Tracking      │
                    │ Activity Logging    │
                    │ Playground APIs     │
                    └───────┬───────┬─────┘
                            │       │
                 ┌──────────┘       └──────────┐
                 ▼                             ▼
          ┌──────────────┐              ┌──────────────┐
          │   MongoDB    │              │    Redis     │
          │              │              │              │
          │ User Data    │              │ Rate Limits  │
          │ Profiles     │              │ Counters     │
          │ Persistent   │              │ Time Windows │
          │ Information  │              │ Fast Data    │
          └──────────────┘              └──────────────┘
```

---

# Why MongoDB + Redis?

The project intentionally uses different storage systems based on the nature of the data.

### MongoDB

MongoDB is used for persistent user information such as:

* User accounts
* Profile information
* Authentication-related persistent data

MongoDB is suitable here because this information needs to survive beyond individual request windows.

### Redis

Redis is used for high-frequency and time-sensitive operations such as:

* Rate-limit request timestamps
* Rate-limit counters
* Expiration windows
* Fast request tracking
* Temporary traffic information

Rate limiting is a high-frequency operation, so using Redis avoids putting unnecessary load on MongoDB.

This separation follows the principle of choosing storage based on workload rather than using one database for everything.

---

# Authentication Flow

Limit Guard uses JWT-based authentication with HTTP-only cookies.

```text
Login
  │
  ▼
Validate credentials
  │
  ▼
Generate access token
  │
  ▼
Store token in HTTP-only cookie
  │
  ▼
Authenticated request
  │
  ▼
Auth Middleware
  │
  ▼
Validate token
  │
  ▼
Attach user information to request
```

### Token failure handling

The backend returns structured authentication error codes.

Example:

```json
{
  "success": false,
  "code": "AUTH_TOKEN_MISSING",
  "message": "Access token not found"
}
```

or:

```json
{
  "success": false,
  "code": "AUTH_TOKEN_INVALID",
  "message": "Invalid access token"
}
```

The frontend interceptor handles these cases centrally.

If the access token is invalid but the refresh token is still valid:

```text
API Request
     │
     ▼
401 AUTH_TOKEN_INVALID
     │
     ▼
Refresh Token
     │
     ▼
New Access Token
     │
     ▼
Retry Original Request
```

If the refresh operation fails:

```text
Refresh Failed
     │
     ▼
Clear Zustand Auth State
     │
     ▼
Redirect to Login
```

This prevents stale client-side authentication state.

---

# Technology Stack

## Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Zustand
* Axios
* Lucide React
* Sonner
* Moment.js

## Backend

* Node.js
* Express 5
* TypeScript
* MongoDB
* Mongoose
* Redis
* ioredis
* JWT
* bcrypt
* Zod
* Cookie Parser
* CORS

---

# Frontend Structure

```text
limit-guard-client/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── skeletons/
│   │   ├── ProtectedRoute.tsx
│   │   └── PublicRoutes.tsx
│   │
│   ├── interfaces/
│   │
│   ├── layouts/
│   │   └── UserDashboardLayout.tsx
│   │
│   ├── pages/
│   │   ├── auth/
│   │   └── dashboard/
│   │       ├── Activity.tsx
│   │       ├── ApiPlayground.tsx
│   │       ├── Dashboard.tsx
│   │       ├── Notification.tsx
│   │       ├── Profile.tsx
│   │       ├── RateLimit.tsx
│   │       └── Usage.tsx
│   │
│   ├── routes/
│   ├── store/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
```

---

# Backend Structure

```text
limit-guard-server/
│
├── src/
│   ├── config/
│   │   ├── cors.config.ts
│   │   ├── db.config.ts
│   │   └── redis.config.ts
│   │
│   ├── middleware/
│   │   ├── asyncHandler.ts
│   │   ├── authMiddleware.ts
│   │   ├── dtoMiddleware.ts
│   │   ├── errorHandler.ts
│   │   └── notFound.ts
│   │
│   ├── module/
│   │   ├── activity/
│   │   ├── playGround/
│   │   ├── rateLimit/
│   │   ├── usage/
│   │   └── user/
│   │
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
└── Rate_Limiter_Algorithms_Basics.md
```

The backend is organized by feature/module rather than putting all controllers, services, and routes into global folders.

For example:

```text
module/
└── rateLimit/
    ├── rateLimit.controller.ts
    ├── rateLimit.routes.ts
    └── rateLimit.service.ts
```

This keeps individual business domains isolated and easier to maintain.

---

# API Flow

A protected Playground request follows this flow:

```text
Client
  │
  ▼
Axios Request
  │
  ▼
Authentication Middleware
  │
  ▼
Rate Limiter
  │
  ├── Limit exceeded ──────► 429
  │
  └── Request allowed
           │
           ▼
      Controller
           │
           ▼
        Service
           │
           ▼
      Dummy Response
```

Request tracking can then record information such as:

```text
Endpoint
Status
Status Code
Latency
Timestamp
User
```

---

# Rate Limiting Response

When the limit is reached, the API returns:

```http
429 Too Many Requests
```

Example response:

```json
{
  "success": false,
  "message": "Too many requests",
  "data": {
    "status": "Blocked",
    "limit": 5,
    "used": 5,
    "remaining": 0,
    "resetIn": 42
  }
}
```

This information is used by the dashboard to display the current rate-limit state.

---

# Local Development

## Prerequisites

Make sure you have installed:

* Node.js
* MongoDB
* Redis

---

## Clone the repository

```bash
git clone <your-repository-url>
cd limit-guard
```

---

## Backend Setup

```bash
cd limit-guard-server
npm install
```

Create a `.env` file:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

REDIS_URL=your_redis_connection_string

ACCESS_SECRET=your_access_token_secret

REFRESH_SECRET=your_refresh_token_secret

CLIENT_URL=http://localhost:5173
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

---

## Frontend Setup

```bash
cd limit-guard-client
npm install
```

Create a `.env` file:

```env
VITE_SERVER_URL=http://localhost:8000
```

Run the frontend:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

# NPM Scripts

## Client

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Server

```bash
npm run dev
npm run build
npm start
```

---

# Engineering Highlights

This project was built to explore practical backend engineering concepts rather than only implementing CRUD operations.

### Redis-based rate limiting

Implemented a rolling-window rate limiter using Redis Sorted Sets.

### Authentication

Implemented JWT authentication, HTTP-only cookies, refresh-token handling, protected routes, and centralized auth error handling.

### Modular backend

Backend functionality is divided into independent modules such as:

```text
User
Rate Limit
Usage
Activity
Playground
```

### API observability

The platform tracks request information and converts raw API traffic into:

* Usage statistics
* Endpoint rankings
* Average latency
* Blocked request counts
* Activity logs

### Client-side state management

Zustand is used for authentication state with persistence.

### Centralized HTTP handling

Axios interceptors handle:

* Authentication failures
* Token refresh
* Request retry
* Session cleanup

### Responsive dashboard

The frontend is designed to work across desktop and mobile screen sizes with reusable loading skeletons and responsive layouts.

---

# What I Learned Building Limit Guard

Building Limit Guard helped me understand how a real API gateway/rate-limiting system can be designed around fast in-memory data structures.

Key concepts explored:

* Redis Sorted Sets
* Sliding Window Log rate limiting
* JWT authentication
* Refresh token flow
* HTTP-only cookies
* Axios interceptors
* API request tracking
* Latency measurement
* Redis TTL
* MongoDB/Mongoose
* Modular Express architecture
* Protected routes
* Centralized error handling
* Client-side authentication state
* API observability

---

# Future Improvements

The current implementation is intentionally focused on understanding the core rate-limiting architecture. Possible future improvements include:

* Configurable rate limits per user
* API-key based authentication
* Per-endpoint rate limits
* Role-based rate limits
* Token Bucket algorithm
* Leaky Bucket algorithm
* Redis Lua scripts for atomic rate-limit operations
* Distributed rate limiting across multiple server instances
* Real-time traffic charts
* WebSocket-based live monitoring
* Admin dashboard
* Advanced alerting and notifications
* Rate-limit configuration UI
* Dockerized deployment
* Horizontal backend scaling

---

# Project Goal

Limit Guard was built as a practical exploration of how modern backend systems handle **high-frequency API traffic, rate limiting, authentication, caching, and observability**.

Rather than treating rate limiting as a simple counter, the project uses Redis Sorted Sets to implement a rolling time window and provides a complete dashboard around the system so that the behavior can be observed and tested interactively.

---

## Author

**Satyam Sharma**

Full-Stack Developer

Built with:

```text
React + TypeScript
Node.js + Express
MongoDB
Redis
JWT
Tailwind CSS
Zustand
```

---
