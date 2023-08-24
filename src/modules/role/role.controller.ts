import { Body, Post, Get, Controller, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleEntity } from 'src/common/entities/role';
import { RoleCreateDTO } from 'src/common/dto/role/role-create.dto';

import { UserStatus } from 'src/common/enums/status.enum';
import { Status } from 'src/shared/security/status.decorator';
import { StatusGuard } from 'src/shared/security/status.guard';


@Controller('role')
export class RoleController {
    constructor(
        private roleService : RoleService
    ){}

    @Get()
    async getAllRoles(): Promise<RoleEntity[]> {
        return this.roleService.getAllRoles();
    }

    @UseGuards(StatusGuard)
    @Status(UserStatus.ADMIN)
    @Post()
    async createRole(@Body() roleDto: RoleCreateDTO): Promise<RoleEntity | null> {
        return this.roleService.createRole(roleDto);
    }
}
