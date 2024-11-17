import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment/payment.module';
import { CustomRedisModule } from '@app/redis';

@Module({
    imports: [
        PaymentModule,
        CustomRedisModule.register([
            {
                namespace: 'client1',
                host: 'localhost',
                port: 6379,
                password: '789',
            },
            {
                namespace: 'client2',
                host: 'localhost',
                port: 6379,
                password: '123',
            },
        ]),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
