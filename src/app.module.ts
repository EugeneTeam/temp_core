import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { PermissionModule } from './permissions/permission.module';
import { MailerModule } from './mailer/mailer.module';
import { errorHandler } from './error-handler/error-handler';
import { RoleModule } from './roles/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error) => errorHandler(error),
    }),
    KnexModule.forRoot({
      config: {
        client: 'postgres',
        connection: {
          host: process.env.MYSQL_HOST,
          port: Number(process.env.MYSQL_PORT),
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DB,
        },
      },
    }),
    PermissionModule,
    RoleModule,
    MailerModule,
  ],
  controllers: [],
})
export class AppModule {}
