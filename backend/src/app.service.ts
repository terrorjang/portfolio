import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Cache } from '@nestjs/cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getHello(): Promise<string> {
    const password = 'password123';
    const hashed = await bcrypt.hash(password, 10);
    const match = await bcrypt.compare(password, hashed);

    return match ? `✅ Password match: ${hashed}` : '❌ Password mismatch';
  }

  async getCachedDataWithInterceptor(): Promise<{
    message: string;
    timestamp: number;
    source: string;
  }> {
    // Simulate a delay for data fetching
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      message: 'This data is fetched from the service (not cache).',
      timestamp: Date.now(),
      source: 'Service',
    };
  }
}
