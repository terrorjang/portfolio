import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('data-interceptor')
  @UseInterceptors(CacheInterceptor) // Apply the CacheInterceptor
  @CacheKey('custom_cache_key_for_data') // (Optional) Define a custom cache key
  @CacheTTL(30 * 1000) // (Optional) Override default TTL to 30 seconds (in milliseconds)
  async getCachedDataWithInterceptor() {
    console.log('Executing /data-interceptor endpoint handler...');
    const data = await this.appService.getCachedDataWithInterceptor();
    return data;
  }
}
