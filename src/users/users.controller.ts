import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ){}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDTO): Promise<User> {
        return await this.usersService.create(createUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id){
        return await this.usersService.deleteById(id);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async getUserById(@Param('id') id): Promise<User> {
        return await this.usersService.find(id);
    }

    @Patch(':id')
    async updateUserById(@Param('id') id, @Body() updateUserDto: UpdateUserDTO): Promise<User> {
        return await this.usersService.update(updateUserDto, id);
    }
}
