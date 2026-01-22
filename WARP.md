# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Mittal Catering website** - a full-stack Next.js application for a catering service company. The app allows customers to browse menu items, place orders for train delivery, and provides an admin panel for managing categories, menu items, orders, and blog posts.

**Key Business Features:**
- Train-based food ordering (customers provide PNR, coach, seat details)
- Admin dashboard for managing categories, menu items, and orders
- Shopping cart with Redux persistence
- Authentication with JWT stored in HTTP-only cookies
- Image management via Cloudinary

## Commands

### Development
```bash
pnpm dev          # Start development server on http://localhost:3000
pnpm build        # Build production bundle
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Environment Setup
Required environment variables in `.env`:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `NODE_ENV` - development/production
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `NEXT_PUBLIC_APP_URL` - Public app URL

## Architecture

### Tech Stack
- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, TailwindCSS 4, Framer Motion
- **State Management:** Redux Toolkit with redux-persist
- **Database:** MongoDB with Mongoose
- **Auth:** JWT tokens (HTTP-only cookies)
- **Image Storage:** Cloudinary
- **Rich Text Editor:** TipTap

### Project Structure

```
app/
├── api/              # Next.js API routes (route handlers)
│   ├── auth/        # Signup/login endpoints
│   ├── categories/  # Category CRUD
│   ├── menu/        # Menu item CRUD
│   ├── order/       # Order management
│   └── blogs/       # Blog management
├── admin/           # Protected admin dashboard routes
│   ├── categories/  # Category management UI
│   ├── menu-items/  # Menu management UI
│   ├── orders/      # Order management UI
│   └── blogs/       # Blog management UI
├── components/      # Shared UI components (Navbar, Footer, etc.)
└── (public pages)/  # Customer-facing pages (menu, checkout, etc.)

features/            # Redux slices
├── user/           # User authentication state
├── category/       # Category management state
├── menu/           # Admin menu management state
├── menuPublic/     # Public menu browsing state
└── cart/           # Shopping cart state

lib/                # Utility modules
├── dbConnect.ts    # MongoDB connection with caching
├── auth.ts         # Server-side auth helper
├── jwt.ts          # JWT sign/verify
├── cloudinary.ts   # Cloudinary config
└── roles.ts        # Role definitions (SUPER_ADMIN, ADMIN, USER)

models/             # Mongoose schemas
├── user/           # User model
├── category/       # Category model
├── menu/           # Menu item model
├── order/          # Order model with types
└── blog/           # Blog model

middleware.ts       # Route protection (admin routes)
```

### Key Architectural Patterns

#### 1. Authentication Flow
- JWT tokens stored in HTTP-only cookies (`token`)
- Tokens expire in 7 days
- `middleware.ts` protects `/admin/*` routes by checking token and role
- Server-side: Use `getAuthUser()` from `lib/auth.ts` to get current user
- Client-side: User state managed via Redux (`features/user/userSlice`)

#### 2. Database Connection
- `lib/dbConnect.ts` implements connection caching for Next.js serverless
- Always call `await dbConnect()` at the start of API routes
- Models use `models.ModelName || model()` pattern to prevent hot-reload errors

#### 3. Role-Based Access
- Three roles defined in `lib/roles.ts`: `SUPER_ADMIN`, `ADMIN`, `USER`
- Middleware only allows `ADMIN` and `SUPER_ADMIN` to access `/admin/*` routes
- Check `payload.role` in API routes for additional authorization

#### 4. State Management
- Redux store configured with redux-persist
- Cart, user, category, and menu states persist to localStorage
- Provider wrapper in `providers/provider.tsx` with `PersistGate`
- Two menu slices: `menu` (admin) and `menuPublic` (customer browsing)

#### 5. Image Handling
- All images uploaded to Cloudinary
- Admin forms should accept FormData with images
- API routes use `cloudinary.uploader.upload()` for uploads
- Store Cloudinary URLs in MongoDB (not base64 or local paths)

#### 6. Order Management
- Orders contain: customer details (train-specific), items from cart, billing
- Order status: `Placed → Confirm → Dispatch → Delivered` (or `Cancel`)
- Payment status: `Pending → Paid` (or `Failed`)
- Payment methods: `COD` or `ONLINE`

## Development Guidelines

### API Route Pattern
All API routes follow this structure:
```typescript
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    // Optional: Check auth for protected routes
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    // Business logic here
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json({ message: "Error message" }, { status: 500 });
  }
}
```

### Redux Slice Pattern
- Use `createSlice` from Redux Toolkit
- Keep slices focused (one domain per slice)
- Export actions and reducer
- Register in `store/store.ts`

### Model Definition Pattern
```typescript
import { Schema, model, models } from "mongoose";

export interface IModelName {
  // TypeScript interface
}

const ModelSchema = new Schema<IModelName>({ /* ... */ }, { timestamps: true });

const ModelName = models.ModelName || model<IModelName>("ModelName", ModelSchema);
export default ModelName;
```

### Path Aliases
- `@/*` resolves to project root (configured in `tsconfig.json`)
- Use `@/lib/*`, `@/models/*`, `@/features/*`, etc.

### Authentication in Components
- Server components: Use `getAuthUser()` from `lib/auth.ts`
- Client components: Use Redux `useSelector(state => state.user.user)`
- Protected pages should redirect if no user found

### Common Gotchas
- Always `await dbConnect()` before database operations
- Don't forget to hash passwords with bcrypt before storing
- Cookie settings: `httpOnly: true`, `secure: NODE_ENV === "production"`, `path: "/"` (path is critical!)
- Cloudinary uploads return URLs - store these in database
- Redux persist can cause hydration errors - ensure `PersistGate` wraps children
- Order model: Use `delete mongoose.models.Order` before defining to avoid schema conflicts

## Current State

### Completed Features (per mittalProject.md)
- Authentication (login/signup)
- Category management (CRUD with search, pagination, status toggle)
- Menu item management (CRUD with status toggle)
- Protected routes with middleware
- Admin UI for categories and menu items
- Cart functionality

### Pending Features
- Order management completion
- Blog management system
- Payment integration (for ONLINE payment method)
- Order invoice generation/download
