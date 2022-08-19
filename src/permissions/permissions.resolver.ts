import { Query, Resolver } from '@nestjs/graphql';
import { PermissionType } from './types/permission.type';
import { OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TestRes } from './types/test.res';

@Resolver(() => PermissionType)
export class PermissionsResolver implements OnModuleInit {
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

  @Query(() => TestRes)
  async test(): Promise<TestRes> {
    return new Promise((resolve, reject) => {
      this.service.SendEmail({ text: 'hello' }).subscribe((val) => {
        resolve(val);
      });
    });
  }
}
