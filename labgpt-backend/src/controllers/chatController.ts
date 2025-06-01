import { Request, Response, NextFunction } from 'express';
import OpenAI from 'openai';
import { config } from '../config';
import { Conversation } from '../models/Conversation';
import { logger } from '../utils/logger';

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, conversationId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    let conversation;
    if (conversationId) {
      conversation = await Conversation.findOne({ _id: conversationId, userId });
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
    } else {
      // Create new conversation with first message as title
      conversation = new Conversation({
        userId,
        title: message.slice(0, 50) + (message.length > 50 ? '...' : ''),
        messages: [{ role: 'user', content: message, timestamp: new Date() }],
      });
    }

    // Add user message
    conversation.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date(),
    });

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant focused on productivity and task management."
        },
        ...conversation.messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    // Add AI response
    conversation.messages.push({
      role: 'assistant',
      content: aiResponse || 'Sorry, I could not generate a response.',
      timestamp: new Date(),
    });

    // Save conversation
    await conversation.save();

    res.json({
      message: aiResponse,
      conversationId: conversation._id,
    });
  } catch (error) {
    logger.error('Error in sendMessage:', error);
    next(error);
  }
};

export const getConversations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const conversations = await Conversation.find({ userId })
      .select('title createdAt updatedAt')
      .sort({ updatedAt: -1 })
      .limit(50);

    res.json(conversations);
  } catch (error) {
    logger.error('Error in getConversations:', error);
    next(error);
  }
};

export const getConversation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const conversation = await Conversation.findOne({ _id: id, userId });
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json(conversation);
  } catch (error) {
    logger.error('Error in getConversation:', error);
    next(error);
  }
}; 