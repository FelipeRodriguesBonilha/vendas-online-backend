import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.development.local'],
  }), 
  TypeOrmModule.forRoot({ //configura a conexão com o banco utilizando TypeORM
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: [`${__dirname}/**/*.entity{.js,.ts}`], //comando para passar as entity's ao TypeORM, busca todas
  }),
  UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
