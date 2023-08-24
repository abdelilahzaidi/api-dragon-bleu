import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { UserCreateDTO } from 'src/common/dto/user/user-create.dto';
import { UserEntity } from 'src/common/entities/user';
import { UserStatus } from 'src/common/enums/status.enum';

import { Status } from 'src/shared/security/status.decorator';
import { StatusGuard } from 'src/shared/security/status.guard';

@Controller('user')
export class UserController {
    constructor(
        private userService : UserService
    ){}
    @Get('')
    async all() : Promise<UserEntity[]>{
        return await this.userService.all()
    }
    @Post('')
    async create(@Body() dto : UserCreateDTO):Promise<UserEntity>{

       return  await this.userService.create(dto);
    }

    @UseGuards(StatusGuard)
    @Status(UserStatus.ADMIN)
    @Post('/create')
    async createUser(@Body() dto : UserCreateDTO):Promise<UserEntity>{
        const role=this.userService.findUserStatusByUserId(dto.status)
        console.log('Role user',role)
        console.log('DTO in controler ',dto)
       return  await this.userService.createUser(dto);
    }

    @UseGuards(StatusGuard)
    @Status(UserStatus.ADMIN)    

    @Delete(':id')    
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }


    @Put(':id')    
    async update(
        @Param('id') id: number,
        @Body() body
    ) {
        const { ...data} = body;
        
        await this.userService.update(id, {
            ...data,
           
        });

        return this.userService.findOneById(id);
    }

}
