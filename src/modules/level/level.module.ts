import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from 'src/common/entities/level';

@Module({
  imports:[TypeOrmModule.forFeature([LevelEntity])],
  providers: [LevelService],
  controllers: [LevelController]
})
export class LevelModule {}
