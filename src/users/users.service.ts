import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User, UserDocument } from './entity/user.entity';
// import { IUser } from './interfaces/user.interface';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async create(createUserDto: CreateUserDTO): Promise<User> {
        const user = await this.findByEmail(createUserDto.email);
        if(user)
            throw new BadRequestException(`${user.email} already exist!`);

        const createUser = new this.userModel(createUserDto);
        try{
            await createUser.save();
            return await this.find(createUser._id.toString())
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
}
