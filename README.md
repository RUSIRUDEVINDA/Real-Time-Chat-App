# 🕵️‍♂️ Private Chat - Next.js Real-Time Application

A secure, ephemeral chat application built with **Next.js 16**, **Elysia**, and **Upstash Redis**. Designed for privacy and simplicity, featuring anonymous identities and self-destructing rooms that disappear after 10 minutes.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Upstash](https://img.shields.io/badge/Upstash-00E9A3?style=for-the-badge&logo=redis&logoColor=white)

## ✨ Features

- **🔐 Privacy First**: No sign-ups or personal data collection.
- **🕵️ Anonymous Identities**: Users are automatically assigned unique, fun anonymous IDs (e.g., `anonymous-Wolf-k92lx`).
- **⏳ Ephemeral Rooms**: Every chat room inherently self-destructs after **10 minutes** (TTL), ensuring no history is left behind.
- **⚡ Real-Time**: Built for speed using Upstash Redis.
- **🔗 Type-Safe API**: End-to-end type safety between frontend and backend using **Elysia** and **Eden**.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend API**: [Elysia](https://elysiajs.com/) (running via Next.js API Routes)
- **Database & Realtime**: [Upstash Redis](https://upstash.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+ installed.
- An [Upstash](https://upstash.com/) account for Redis.

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add your Upstash credentials:

```env
# Get these from your Upstash Console
UPSTASH_REDIS_REST_URL="your-upstash-redis-rest-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-rest-token"
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

