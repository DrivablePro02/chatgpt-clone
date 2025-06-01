// Database types and utilities for the ChatGPT clone

export interface User {
  id: string;
  clerk_user_id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
  message_count?: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: Date;
}

// SQL Schema for reference (to be run in Neon dashboard)
export const DATABASE_SCHEMA = `
-- Users table to link with Clerk authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversations table to store chat sessions
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL DEFAULT 'New Conversation',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table to store individual chat messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON conversations(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER IF NOT EXISTS update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER IF NOT EXISTS update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
`;

// Database connection utility (to be implemented once Neon is connected)
export class Database {
  private connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  // User operations
  async upsertUser(clerkUserId: string, email: string): Promise<User> {
    // TODO: Implement with actual database connection
    throw new Error('Database not connected. Please set up Neon database.');
  }

  async getUser(clerkUserId: string): Promise<User | null> {
    // TODO: Implement with actual database connection
    throw new Error('Database not connected. Please set up Neon database.');
  }

  // Conversation operations
  async createConversation(userId: string, title?: string): Promise<Conversation> {
    // TODO: Implement with actual database connection
    throw new Error('Database not connected. Please set up Neon database.');
  }

  async getUserConversations(userId: string): Promise<Conversation[]> {
    // TODO: Implement with actual database connection
    throw new Error('Database not connected. Please set up Neon database.');
  }

  async updateConversation(conversationId: string, title: string): Promise<void> {
    // TODO: Implement with actual database connection
    throw new Error('Database not connected. Please set up Neon database.');
  }

  async deleteConversation(conversationId: string): Promise<void> {
    // TODO: Implement with actual database connection
    throw new Error('Database not connected. Please set up Neon database.');
  }

  // Message operations
  async createMessage(conversationId: string, role: 'user' | 'assistant', content: string): Promise<Message> {
    // TODO: Implement with actual database connection
    throw new Error('Database not connected. Please set up Neon database.');
  }

  async getConversationMessages(conversationId: string): Promise<Message[]> {
    // TODO: Implement with actual database connection
    throw new Error('Database not connected. Please set up Neon database.');
  }
}

// Export a singleton instance (will be initialized when database is connected)
export let db: Database | null = null;

export function initializeDatabase(connectionString: string) {
  db = new Database(connectionString);
  return db;
}
