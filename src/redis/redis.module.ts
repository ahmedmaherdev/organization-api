import { Module, Global } from '@nestjs/common';
import * as redis from 'redis';
import { RedisService } from './redis.service';

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (error) => console.error(`Redis error: ${error}`));

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useValue: redisClient,
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
