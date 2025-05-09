import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const password = 'password123';
    const hashed = await bcrypt.hash(password, 10);
    const match = await bcrypt.compare(password, hashed);

    return match ? `✅ Password match: ${hashed}` : '❌ Password mismatch';
  }
}
