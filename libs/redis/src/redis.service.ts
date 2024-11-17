import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_TYPE } from './redis.module';

@Injectable()
export class RedisBaseService implements OnApplicationBootstrap {
    public redis: Redis;
    public redisClient = {};
    constructor(private readonly redisService: RedisService) {}

    onApplicationBootstrap() {
        for (let item of REDIS_TYPE) {
            const redisClient = new RedisBaseService(this.redisService);
            const redisCore = redisClient.setClient(item);
            this.redisClient[item] = { redisClient, redisCore };
        }
    }

    setClient(redisName: string): Redis {
        try {
            this.redis = this.redisService.getOrThrow(redisName);
            return this.redis;
        } catch (error) {
            console.log('setClient error: ', error.message);
        }
    }

    getClient(redisName: string): RedisBaseService {
        try {
            return this.redisClient[redisName].redisClient;
        } catch (error) {
            console.log('getClient error: ', error.message);
        }
    }

    getCoreClient(redisName: string): Redis {
        try {
            return this.redisClient[redisName].redisCore;
        } catch (error) {
            console.log('getClient error: ', error.message);
        }
    }

    // getRedisInfo = (): Redis => {
    //     return this.redis;
    // };

    // getInfo = async () => {
    //     return await this.redis.info();
    // };

    // async set(key: string, value: any, expire_time?: number): Promise<any> {
    //     try {
    //         console.log('expire_time: ', expire_time);

    //         if (typeof value === 'object') {
    //             value = JSON.stringify(value);
    //         }
    //         let data;
    //         if (expire_time) data = await this.redis.set(key, value, 'EX', expire_time);
    //         else data = await this.redis.set(key, value);
    //         return data;
    //     } catch (error) {
    //         console.log('set redis error: ', error.message);
    //         throw new BadRequestException(new ErrorResponse(error.message, responseMsg.REDIS_ERROR.CODE, HttpStatus.BAD_REQUEST, error));
    //     }
    // }

    async get(key: string): Promise<any> {
        try {
            let value = await this.redis.get(key);
            return JSON.parse(value);
        } catch (error) {
            console.log('get redis error: ', error.message);
        }
    }

    // async keys(prefix: string): Promise<any> {
    //     try {
    //         const keys = await this.redis.keys(prefix + '*');
    //         return keys;
    //     } catch (error) {
    //         console.log('keys redis error: ', error.message);
    //         throw new BadRequestException(new ErrorResponse(error.message, responseMsg.REDIS_ERROR.CODE, HttpStatus.BAD_REQUEST, error));
    //     }
    // }

    // async exists(key: string): Promise<any> {
    //     try {
    //         const status = await this.redis.exists(key);
    //         return status;
    //     } catch (error) {
    //         console.log('exists redis error: ', error.message);
    //         throw new BadRequestException(new ErrorResponse(error.message, responseMsg.REDIS_ERROR.CODE, HttpStatus.BAD_REQUEST, error));
    //     }
    // }

    // async del(key: string): Promise<any> {
    //     try {
    //         return await this.redis.del(key);
    //     } catch (error) {
    //         console.log('del redis error: ', error.message);
    //         throw new BadRequestException(new ErrorResponse(error.message, responseMsg.REDIS_ERROR.CODE, HttpStatus.BAD_REQUEST, error));
    //     }
    // }
}
