import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { LocationsModule } from './locations/locations.module';
import { SalesModule } from './sales/sales.module';
import { StockModule } from './stock/stock.module';
import { SalesHistoryModule } from './sales-history/sales-history.module';
import { ProductsModule } from './products/products.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('CARNICERIA_DB_HOST'),
        port: config.get<number>('CARNICERIA_DB_PORT'),
        username: config.get<string>('CARNICERIA_DB_USER'),
        password: config.get<string>('CARNICERIA_DB_PASS'),
        database: config.get<string>('CARNICERIA_DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    LocationsModule,
    SalesModule,
    StockModule,
    SalesHistoryModule,
    ProductsModule, 
  ],
})
export class AppModule {}
