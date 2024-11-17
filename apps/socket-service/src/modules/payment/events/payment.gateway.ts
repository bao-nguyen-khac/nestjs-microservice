import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';

@WebSocketGateway({
    namespace: 'payment',
    cors: {
        origin: '*',
    },
    allowEIO3: true,
    allowEIO2: true,
    transports: ['websocket', 'polling'],
})
export class PaymentGateway {
    @WebSocketServer()
    wss: Namespace;

    @SubscribeMessage('connection')
    async handleConnection(@ConnectedSocket() socket: Socket) {
        console.log('🤖 ~ PaymentGateway ~ handleConnection ~ socket.id:', socket.id);
        console.log('🤖 ~ PaymentGateway ~ handleConnection ~ socket.handshake:', socket.handshake);
        // socket.emit()
        this.wss.emit('connection', {
            socketId: socket.id,
            query: socket.handshake.query,
        });
    }

    @SubscribeMessage('qrcode')
    qrCodeEvent(@MessageBody() data: any): WsResponse<unknown> {
        console.log('🤖 ~ PaymentGateway ~ qrCodeEvent ~ data:', data);
        const event = 'qrcode';
        return data;
    }

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
        console.log('🤖 ~ PaymentGateway ~ identity ~ data:', data);
        return data;
    }
}
