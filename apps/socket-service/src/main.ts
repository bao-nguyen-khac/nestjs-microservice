import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './core/redis.adapter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // const redisIoAdapter = new RedisIoAdapter(app);
    // await redisIoAdapter.connectToRedis();

    // app.useWebSocketAdapter(redisIoAdapter);

    app.enableShutdownHooks();
    await app.listen(3001, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
