import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User, UserDocument } from './entity/user.entity';
import { decriptPassword, encriptPassword } from '../security/hash';
import { UpdateUserPasswordDTO } from './dto/update-user-password.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async create(createUserDto: CreateUserDTO): Promise<User> {
        const user = await this.findByEmail(createUserDto.email);
        if(user)
            throw new BadRequestException(`${user.email} already exist!`);
        try{
            createUserDto.password = await encriptPassword(createUserDto.password);
            const createUser = new this.userModel(createUserDto);
            await createUser.save();
            return await this.find(createUser._id.toString());
        }catch(e){
            throw new BadRequestException(e.message);
        }
    }

    async deleteById(_id) {
        try{
            return await this.userModel.deleteOne({_id});
        }catch(e){
            throw new BadRequestException(e.message);
        }
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find({},{password: 0}).exec();
    }

    async find(_id): Promise<User> {
        return await this.userModel.findById(_id, {password: 0});
    }

    async update(updateUserDto: UpdateUserDTO, _id): Promise<User> {
        try{
            return await this.userModel.findOneAndUpdate({_id}, updateUserDto, { new: true });
        }catch(e){
            throw new BadRequestException(e.message);
        }
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({email});
    }

    async updatePassword(updateUserPasswordDto: UpdateUserPasswordDTO, _id, requestUser): Promise<User> {
        const user = await this.findByEmail(updateUserPasswordDto.email);
        if(!user)
            throw new BadRequestException(`${user.email} not exist!`)

        if(user.email != requestUser.username && !requestUser.roles.includes("Admin"))
            throw new BadRequestException(`${user.email} not match with the profile logged in!`)

        if(!requestUser.roles.includes("Admin")){
            if(!updateUserPasswordDto.password)
                throw new BadRequestException(`password must be a string`);

            const decriptCurrentPassword = await decriptPassword(updateUserPasswordDto.password, user.password);
            if(!decriptCurrentPassword){
                throw new UnauthorizedException();
            }
        }

        try{
            const encriptNewPassword = await encriptPassword(updateUserPasswordDto.newPassword);
            const payload = { password: encriptNewPassword };
            return await this.userModel.findOneAndUpdate({_id}, payload, {projection: {password: 0}});
        }catch(e){
            throw new BadRequestException(e.message)
        }
    }
}
