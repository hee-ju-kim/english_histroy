import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DBService } from './db.service';
import { ConfigModule, ConfigService } from '../index';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('db'),  // DB URI 반환
          onConnectionCreate: (connection: Connection) => {
            connection.on('connected', () => console.log('db connected'))
            return connection;
          },
        };
      },
    }),
  ],
  providers: [DBService],
  exports: [DBService],
})

export class DBModule {
  // console.log('DBModule')
}
