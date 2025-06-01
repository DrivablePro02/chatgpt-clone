# ChatGPT Clone with Clerk Authentication

A pixel-perfect ChatGPT clone built with Next.js, TypeScript, Tailwind CSS, and Clerk authentication.

## Features

- 🔐 **Authentication** - Secure user authentication with Clerk
- 💬 **Chat Interface** - ChatGPT-like conversation interface
- 📱 **Responsive Design** - Works on desktop and mobile
- 🎨 **Dark Theme** - Beautiful dark theme matching ChatGPT
- 👤 **User Profiles** - User avatars and profile information
- 🚪 **Sign In/Out** - Seamless authentication flow

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/DrivablePro02/chatgpt-clone.git
cd chatgpt-clone
```

### 2. Install Dependencies
```bash
bun install
```

### 3. Set Up Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/) and create a new application
2. Copy your API keys from the dashboard
3. Update the `.env.local` file with your Clerk keys:

```env
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Clerk URLs (keep these as-is)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### 4. Run the Development Server
```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main chat page (protected)
│   ├── layout.tsx            # Root layout with ClerkProvider
│   ├── sign-in/              # Clerk sign-in pages
│   └── sign-up/              # Clerk sign-up pages
├── components/
│   ├── chat-area.tsx         # Chat interface component
│   ├── sidebar.tsx           # Sidebar with user profile
│   └── ui/                   # shadcn/ui components
└── middleware.ts             # Clerk authentication middleware
```

## Key Clerk Integration Points

1. **Layout** - `ClerkProvider` wraps the entire app in `layout.tsx`
2. **Protection** - Main page checks authentication status with `useAuth()`
3. **Middleware** - Protects routes using Clerk middleware
4. **User Info** - Sidebar displays user profile using `useUser()`
5. **Sign Out** - Sign out button uses `useClerk().signOut()`

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Package Manager**: Bun

## Authentication Flow

1. User visits the app
2. If not authenticated, shown welcome screen with sign-in link
3. User signs in through Clerk's hosted pages
4. After authentication, redirected to main chat interface
5. User profile and sign-out available in sidebar

## Common Issues

### Environment Variables Not Loading
- Make sure `.env.local` is in the root directory
- Restart the development server after changing environment variables

### Clerk Keys Not Working
- Verify you're using the correct publishable and secret keys from your Clerk dashboard
- Make sure you're using the keys for the correct environment (development/production)

### Sign-in Page Not Found
- Ensure the Clerk sign-in pages are properly set up in the file structure
- Check that middleware is configured correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Please respect OpenAI's terms of service.
