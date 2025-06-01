import fs from 'fs';
import path from 'path';
import { logger } from './logger';

export const ensureDirs = () => {
  const dirs = [
    path.join(process.cwd(), 'logs'),
    path.join(process.cwd(), 'dist'),
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir, { recursive: true });
        logger.info(`Created directory: ${dir}`);
      } catch (error) {
        logger.error(`Failed to create directory ${dir}:`, error);
        process.exit(1);
      }
    }
  });
}; 