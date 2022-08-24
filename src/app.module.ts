import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HandsModule } from './hands/hands.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HandsModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ".env"
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
