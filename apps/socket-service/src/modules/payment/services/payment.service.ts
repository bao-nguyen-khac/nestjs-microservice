import { RedisBaseService } from '@app/redis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
    constructor(private readonly redisBase: RedisBaseService) {}

    async index() {
        const redis1 = this.redisBase.getClient('client1');
        const data1 = await redis1.get('member_info_4178809');
        console.log('🤖 ~ PaymentService ~ index ~ data1:', data1);
        const redisCore1 = this.redisBase.getCoreClient('client1');
        const dataCore1 = await redisCore1.get('member_info_4178809');
        console.log('🤖 ~ PaymentService ~ index ~ dataCore1:', dataCore1);
        const redis2 = this.redisBase.getClient('client2');
        const data2 = await redis2.get('package_reminder_12689601');
        console.log('🤖 ~ PaymentService ~ index ~ data2:', data2);
        const redisCore2 = this.redisBase.getCoreClient('client2');
        const dataCore2 = await redisCore2.get('package_reminder_12689601');
        console.log('🤖 ~ PaymentService ~ index ~ dataCore1:', dataCore2);
    }
}
