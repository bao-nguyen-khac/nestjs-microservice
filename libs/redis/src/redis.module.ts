import { Module, DynamicModule } from '@nestjs/common';
import { RedisModule, RedisClientOptions, RedisModuleOptions } from '@liaoliaots/nestjs-redis';

export let REDIS_TYPE = [];

@Module({})
export class CustomRedisModule {
    public static register(clientConnections: RedisClientOptions[]): DynamicModule {
        const redisModuleOptions: RedisModuleOptions = {
            config: clientConnections,
            commonOptions: {
                commandTimeout: 500,
            },
        };
        console.log('🤖 ~ CustomRedisModule ~ register ~ redisModuleOptions:', redisModuleOptions);
        for (const item of clientConnections) {
            REDIS_TYPE.push(item.namespace);
        }
        return {
            module: CustomRedisModule,
            imports: [RedisModule.forRoot(redisModuleOptions)],
        };
    }
}
