import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
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
  ],
})
export class AppModule {}
