import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleCreateDTO } from 'src/common/dto/role/role-create.dto';
import { RoleEntity } from 'src/common/entities/role';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity) private readonly roleRepository :Repository<RoleEntity> 
    ){}





    async getAllRoles(): Promise<RoleEntity[]> {
        return this.roleRepository.find();
    }

    async createRole(roleDto: RoleCreateDTO): Promise<RoleEntity | null> {
        const newRole = this.roleRepository.create(roleDto);
        return this.roleRepository.save(newRole);
    }
}
