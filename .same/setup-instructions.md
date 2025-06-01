# ChatGPT Clone Setup Instructions

## Prerequisites
This enhanced ChatGPT clone includes Clerk authentication, database persistence, and API integration.

## 1. Clerk Authentication Setup

### Step 1: Get Clerk Keys
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application or use existing one
3. Go to **API Keys** section
4. Copy your keys

### Step 2: Configure Environment Variables
Update your `.env.local` file with your Clerk keys:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
```

### Step 3: Configure Clerk Settings
In your Clerk dashboard:
1. Go to **User & Authentication** > **Email, Phone, Username**
2. Enable email address as identifier
3. Go to **Paths** and set:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/`
   - After sign-up: `/`

## 2. Database Setup (Neon PostgreSQL)

### Step 1: Create Neon Account
1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project named "chatgpt-clone"
3. Note down your connection string

### Step 2: Run Database Schema
1. Open Neon SQL Editor
2. Copy and run the schema from `src/lib/db.ts` (DATABASE_SCHEMA constant)
3. This will create all necessary tables and indexes

### Step 3: Update Environment
Add your database connection string to `.env.local`:

```bash
DATABASE_URL=postgresql://username:password@hostname/database
```

## 3. Optional: AI Service Integration

### OpenAI Setup (Recommended)
1. Get API key from [OpenAI Platform](https://platform.openai.com/)
2. Add to `.env.local`:
```bash
OPENAI_API_KEY=sk-your_openai_key_here
```

### Alternative: Anthropic Claude
1. Get API key from [Anthropic Console](https://console.anthropic.com/)
2. Add to `.env.local`:
```bash
ANTHROPIC_API_KEY=sk-ant-your_anthropic_key_here
```

## 4. Run the Application

```bash
cd chatgpt-clone
bun install
bun run dev
```

## Features Included

### ✅ Completed
- Clerk authentication with protected routes
- Sign-in/Sign-up pages with custom styling
- User profile integration in sidebar
- API routes for chat and conversations
- Database schema design
- Error handling and loading states

### 🔄 In Progress
- Database integration (requires Neon setup)
- Real AI service integration (requires API keys)

### 📋 Planned
- Conversation persistence
- Chat history management
- Message streaming
- Export functionality
- User preferences

## Troubleshooting

### Authentication Issues
- Ensure Clerk keys are correctly set in `.env.local`
- Check that your Clerk app settings match the configured paths
- Verify your domain is added to Clerk's allowed origins

### Database Issues
- Confirm the DATABASE_URL is correctly formatted
- Ensure the schema has been run in Neon SQL Editor
- Check that your Neon database is not suspended

### API Issues
- Check browser console for detailed error messages
- Verify all required environment variables are set
- Ensure the development server is running on the correct port
