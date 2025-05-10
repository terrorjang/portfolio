import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcryptjs';
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

  async cacheExample(): Promise<string> {
    const key = 'example-key';
    const value = 'Hello from Redis!';

    // Check if the value already exists
    const existing = await this.cacheManager.get<string>(key);

    if (!existing) {
      // Set the value with 60 seconds TTL only if it does not exist
      await this.cacheManager.set(key, value, 60000);
    }

    const cached = await this.cacheManager.get<string>(key);

    return cached ? `🔁 Cached value: ${cached}` : '⚠️ No cached value found';
  }
}
