import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment/payment.module';
import { CustomRedisModule } from '@app/redis';

@Module({
    imports: [
        PaymentModule,
        CustomRedisModule.register([
            {
                namespace: 'client1',
                host: '172.16.240.253',
                port: 6379,
                password: 'Redis6789',
            },
            {
                namespace: 'client2',
                host: '172.16.246.210',
                port: 6379,
                password: 'NhacLich6379',
            },
        ]),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
