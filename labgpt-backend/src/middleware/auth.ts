import { Request, Response, NextFunction } from 'express';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Extend Express Request type to include auth property from Clerk and a user property
declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string | null;
        sessionId: string | null;
        /* add other Clerk auth properties you expect */
      };
      user?: {
        id: string;
        email?: string;
        // Add other user properties you might need from Clerk's user object
      };
    }
  }
}

export const requireAuth = ClerkExpressRequireAuth(); 