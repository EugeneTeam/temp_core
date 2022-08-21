import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';


@Injectable()
export class MailerService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'mailer',
      protoPath: join(__dirname, 'mailer.proto'),
    },
  })
  private client: ClientGrpc;

  private service: any;

  onModuleInit(): any {
    this.service = this.client.getService<any>('MailerService');
  }

  async test(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.SendEmail({ text: 'hello' }).subscribe((val) => {
        resolve(val);
      });
    });
  }
}
