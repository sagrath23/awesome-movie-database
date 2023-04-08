import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './modules/movies/movies.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MoviesModule],
})
export class AppModule {}
