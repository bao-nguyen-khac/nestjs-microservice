import { Module } from '@nestjs/common';
import { PaymentGateway } from './events/payment.gateway';
import { RedisBaseService } from '@app/redis';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';

@Module({
    imports: [],
    providers: [PaymentGateway, RedisBaseService, PaymentService],
    controllers: [PaymentController],
})
export class PaymentModule {}
