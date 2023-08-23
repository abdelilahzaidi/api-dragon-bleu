import { IsBoolean, IsDate, IsEmail, IsIn, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { UserGender } from "src/common/enums/gender.enum";
import { UserStatus } from "src/common/enums/status.enum";

export class UserCreateDTO{
    @IsNotEmpty()
    first_name: string;
  
    @IsNotEmpty()
    last_name: string;
  
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct email address' })
    email: string;   
  
    @IsNotEmpty()
    @IsIn(['member', 'admin'], { message: 'Invalid status' }) // Utilisation de @IsIn pour vérifier les valeurs autorisées
    status: UserStatus;


    @IsNotEmpty()
    @IsIn(['male', 'female'], { message: 'Invalid gender' }) // Utilisation de @IsIn pour vérifier les valeurs autorisées   
    gender: UserGender;
  
    @IsNotEmpty()
    birthDate: Date;
  
    @IsNotEmpty()
    adress: string;
  
    @IsNotEmpty()
    @IsBoolean()
    actif: boolean; 
    
  
    @IsNotEmpty()
    gsm: string;

    constructor() {
        this.status = UserStatus.MEMBER; // Valeur par défaut "member"
    }
}


