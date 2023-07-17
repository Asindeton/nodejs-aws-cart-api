import { Module } from '@nestjs/common';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { Carts } from './cart/entity/Carts';
import { Orders } from './order/entryty/Order';
import { CartItems } from './cart/entity/CartItems';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { User } from './users/entity/User';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_URL ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 5432,
  username: process.env.DB_USER ?? 'test',
  password: process.env.DB_PASSWORD ?? 'test',
  database: process.env.DB_DATABASE ?? 'test',
  synchronize: true,
  logging: true,
  entities: [Carts, CartItems, Orders, User],
  subscribers: [],
  migrations: [],
};

@Module({
  imports: [AuthModule, CartModule, OrderModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
