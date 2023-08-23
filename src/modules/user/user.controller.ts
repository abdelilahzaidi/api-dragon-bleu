import { UserService } from './user.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserCreateDTO } from 'src/common/dto/user/user-create.dto';
import { UserEntity } from 'src/common/entities/user';
import { UserStatus } from 'src/common/enums/status.enum';
import { JwtAuthGuard } from 'src/shared/security/jwt-auth.guard';
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

}
