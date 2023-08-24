import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/common/entities/role';
import { UserModule } from '../user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([RoleEntity]), UserModule],
  providers: [RoleService],
  controllers: [RoleController],
  exports:[RoleService]
})
export class RoleModule {}



