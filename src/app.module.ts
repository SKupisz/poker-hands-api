import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HandsModule } from './hands/hands.module';

@Module({
  imports: [HandsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
