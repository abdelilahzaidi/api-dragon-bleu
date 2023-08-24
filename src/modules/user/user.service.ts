import { ConflictException, HttpException, HttpStatus, Injectable, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDTO } from 'src/common/dto/user/user-create.dto';
import { UserEntity } from 'src/common/entities/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository : Repository<UserEntity>
    ){
       
    }
    async all():Promise<UserEntity[]>{
        return await this.userRepository.find();
    }
    async create(data): Promise<UserEntity> {
        return this.userRepository.save(data);
    }

    async update(id: number, data): Promise<any> {
        return this.userRepository.update(id, data)
    }

    async delete(id: number): Promise<any> {
        return this.userRepository.delete(id);
    }

    //Find a user by email
    async findOneByEmail(email : string): Promise<any> {
        return this.userRepository.findOne({where:{email}});
    }
    //Find a user by id
    async findOneById(id : number): Promise<any> {
        return this.userRepository.findOne({where:{id}});
    }

    async createUser(dto :UserCreateDTO):Promise<UserEntity>{ 
          
        console.log("DTO ",dto)
        
    const hashedPassword = await bcrypt.hash("Zah14$01471983", 12);

    try {
        const user = await this.userRepository.save({
            first_name : dto.first_name,
            last_name : dto.last_name,
            email : dto.email,
            birthDate:dto.birthDate,
            actif : dto.actif,
            gsm : dto.gsm,           
            password: hashedPassword,
            attributionDate: new Date(),
            gender:dto.gender,
            //status :dto.status,
            adress : dto.adress
            
        });
        console.log("user ",user)
        return user;
    } catch (error) {
        if (error.code = 11000) {
            throw new ConflictException('Duplicate Email!!');
        }
        throw error;
    }
        
    }

    async findUserStatusByUserId(id: any) {
        const user = await this.userRepository.findOne({where:{id}})
    
        if(!user) {
          throw new HttpException('No user found by Id', HttpStatus.NOT_FOUND)
        }
    
        return user.status
      }




  

    
}
