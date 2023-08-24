import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { BdModule } from './BD/bd.modules';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { LevelModule } from './modules/level/level.module';
import { ProgramModule } from './modules/program/program.module';



@Module({
  imports: [BdModule,UserModule,AuthModule, RoleModule, LevelModule, ProgramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
