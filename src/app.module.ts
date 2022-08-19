import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PermissionsModule } from './permissions/permissions.module';

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
    }),
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        connection: {
          host: process.env.MYSQL_HOST,
          port: Number(process.env.MYSQL_PORT),
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DB,
        },
      },
    }),
    PermissionsModule,
  ],
  controllers: [],
})
export class AppModule {}
