import { Module, DynamicModule } from '@nestjs/common';
import { RedisModule, RedisClientOptions } from '@liaoliaots/nestjs-redis';

import { Provider } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { RedisBaseService } from './redis.service';

// export const createRedisBaseProvider = (redisName: any): Provider => ({
//     provide: `RedisBase_${redisName}`, // Unique token for this instance
//     useFactory: (redisService: RedisService) => new RedisBaseService(redisName, redisService),
//     inject: [RedisService], // Inject dependencies needed by the factory
// });

export let REDIS_TYPE = [];

@Module({})
export class CustomRedisModule {
    public static register(clientConnections: RedisClientOptions[]): DynamicModule {
        const redisModuleOptions = {
            config: clientConnections,
        };
        console.log('🤖 ~ CustomRedisModule ~ register ~ redisModuleOptions:', redisModuleOptions);
        // const providers = [];
        for (const item of clientConnections) {
            REDIS_TYPE.push(item.namespace);
        }
        console.log('🤖 ~ CustomRedisModule ~ register ~ REDIS_TYPE:', REDIS_TYPE);
        return {
            module: CustomRedisModule,
            imports: [RedisModule.forRoot(redisModuleOptions)],
            // providers: providers,
        };
    }
}
